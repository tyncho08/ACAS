const fs = require('fs-extra');
const path = require('path');
const SingleCOBOLParser = require('./single_parser');
const ValidationFramework = require('./validation_framework');
const AnalysisDatabase = require('./analysis_database');
const ReportGenerator = require('./report_generator');

/**
 * Analysis Orchestrator - Coordinates the entire analysis process
 * 
 * This is the main entry point that ensures proper sequencing,
 * validation, and consistency throughout the analysis.
 */
class AnalysisOrchestrator {
    constructor(config = {}) {
        this.config = {
            sourceDir: config.sourceDir,
            outputDir: config.outputDir || './cobol-analysis-output',
            includePaths: config.includePaths || [],
            validateEveryStep: config.validateEveryStep !== false,
            parallelism: config.parallelism || 1,
            ...config
        };
        
        // Initialize components
        this.parser = new SingleCOBOLParser({
            includePaths: this.config.includePaths
        });
        
        this.validator = new ValidationFramework({
            strictMode: true
        });
        
        this.database = new AnalysisDatabase({
            dbPath: path.join(this.config.outputDir, 'analysis.db')
        });
        
        this.reportGenerator = new ReportGenerator({
            outputDir: this.config.outputDir
        });
        
        this.analysisRun = {
            id: this.generateRunId(),
            startTime: new Date().toISOString(),
            config: this.config,
            results: {
                programs: [],
                statistics: {},
                validations: []
            }
        };
    }

    /**
     * Main analysis entry point
     */
    async analyze() {
        console.log('Starting COBOL Analysis...');
        console.log(`Source: ${this.config.sourceDir}`);
        console.log(`Output: ${this.config.outputDir}\n`);
        
        try {
            // 1. Setup
            await this.setup();
            
            // 2. Discovery
            const files = await this.discoverFiles();
            console.log(`Found ${files.length} COBOL files\n`);
            
            // Create checkpoint after discovery
            await this.validator.createCheckpoint('discovery', { files });
            
            // 3. Parse all files
            const parseResults = await this.parseFiles(files);
            
            // Validate parsing consistency
            await this.validateParseResults(parseResults);
            
            // 4. Analyze relationships
            const relationships = await this.analyzeRelationships(parseResults);
            
            // 5. Calculate subsystems
            const subsystems = await this.discoverSubsystems(parseResults, relationships);
            
            // 6. Generate visualizations
            const visualizations = await this.generateVisualizations(
                parseResults, 
                relationships, 
                subsystems
            );
            
            // 7. Final validation
            await this.performFinalValidation();
            
            // 8. Generate reports
            await this.generateReports();
            
            // 9. Cleanup and summary
            await this.complete();
            
            return this.analysisRun;
            
        } catch (error) {
            console.error('Analysis failed:', error);
            this.analysisRun.error = error.message;
            this.analysisRun.status = 'FAILED';
            throw error;
        }
    }

    /**
     * Setup output directory and database
     */
    async setup() {
        // Ensure output directory exists
        await fs.ensureDir(this.config.outputDir);
        await fs.ensureDir(path.join(this.config.outputDir, 'ast'));
        await fs.ensureDir(path.join(this.config.outputDir, 'reports'));
        await fs.ensureDir(path.join(this.config.outputDir, 'visualizations'));
        
        // Initialize database
        await this.database.initialize();
        
        // Create analysis run record
        await this.database.createAnalysisRun(this.analysisRun);
    }

    /**
     * Discover COBOL files
     */
    async discoverFiles() {
        const files = [];
        const extensions = ['.cbl', '.cob', '.cobol'];
        
        async function scanDirectory(dir) {
            const entries = await fs.readdir(dir, { withFileTypes: true });
            
            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);
                
                if (entry.isDirectory() && !entry.name.startsWith('.')) {
                    await scanDirectory(fullPath);
                } else if (entry.isFile()) {
                    const ext = path.extname(entry.name).toLowerCase();
                    if (extensions.includes(ext)) {
                        files.push(fullPath);
                    }
                }
            }
        }
        
        await scanDirectory(this.config.sourceDir);
        return files.sort();
    }

    /**
     * Parse all files with progress reporting
     */
    async parseFiles(files) {
        const results = [];
        const batchSize = 10;
        
        console.log('Parsing files...');
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const relativePath = path.relative(this.config.sourceDir, file);
            
            try {
                // Parse the file
                const ast = await this.parser.parseFile(file);
                
                // Validate AST immediately
                if (this.config.validateEveryStep) {
                    const validation = this.validator.validateAST(ast);
                    if (!validation.valid) {
                        console.warn(`Validation issues in ${relativePath}:`, validation.errors);
                    }
                }
                
                // Save AST to file
                const astPath = path.join(
                    this.config.outputDir, 
                    'ast', 
                    `${path.basename(file)}.json`
                );
                await fs.writeJson(astPath, ast, { spaces: 2 });
                
                // Store in database
                await this.database.storeProgram(this.analysisRun.id, ast);
                
                results.push({
                    file: relativePath,
                    success: true,
                    ast
                });
                
            } catch (error) {
                console.error(`Failed to parse ${relativePath}:`, error.message);
                results.push({
                    file: relativePath,
                    success: false,
                    error: error.message
                });
            }
            
            // Progress reporting
            if ((i + 1) % batchSize === 0 || i === files.length - 1) {
                const progress = ((i + 1) / files.length * 100).toFixed(1);
                console.log(`  Progress: ${i + 1}/${files.length} (${progress}%)`);
            }
        }
        
        // Calculate statistics
        const stats = this.parser.getStats();
        this.analysisRun.results.statistics = {
            ...stats,
            totalFiles: files.length,
            successfulParses: results.filter(r => r.success).length,
            failedParses: results.filter(r => !r.success).length
        };
        
        console.log(`\nParsing complete: ${stats.successfulParses}/${files.length} successful\n`);
        
        return results;
    }

    /**
     * Validate parse results for consistency
     */
    async validateParseResults(parseResults) {
        console.log('Validating parse results...');
        
        const validations = [];
        
        // Check for duplicate program IDs
        const programIds = new Map();
        parseResults
            .filter(r => r.success && r.ast.programId)
            .forEach(r => {
                const id = r.ast.programId;
                if (programIds.has(id)) {
                    validations.push({
                        type: 'duplicate_program_id',
                        programId: id,
                        files: [programIds.get(id), r.file]
                    });
                }
                programIds.set(id, r.file);
            });
        
        // Validate metrics are consistent
        const sampleSize = Math.min(10, parseResults.length);
        for (let i = 0; i < sampleSize; i++) {
            const result = parseResults[i];
            if (result.success) {
                // Re-parse and compare
                const ast2 = await this.parser.parseFile(
                    path.join(this.config.sourceDir, result.file)
                );
                
                const consistency = this.validator.validateConsistency(result.ast, ast2);
                if (!consistency.valid) {
                    validations.push({
                        type: 'inconsistent_parsing',
                        file: result.file,
                        errors: consistency.errors
                    });
                }
            }
        }
        
        if (validations.length > 0) {
            console.warn(`Found ${validations.length} validation issues`);
            this.analysisRun.results.validations.push(...validations);
        } else {
            console.log('All validations passed\n');
        }
        
        return validations;
    }

    /**
     * Analyze relationships between programs
     */
    async analyzeRelationships(parseResults) {
        console.log('Analyzing relationships...');
        
        const relationships = {
            calls: new Map(),      // caller -> [called programs]
            copies: new Map(),     // program -> [copybooks]
            calledBy: new Map(),   // called -> [caller programs]
            copiedBy: new Map()    // copybook -> [programs]
        };
        
        // Build relationship maps
        parseResults
            .filter(r => r.success)
            .forEach(r => {
                const programId = r.ast.programId || path.basename(r.file);
                
                // Process calls
                if (r.ast.dependencies.calls) {
                    const targets = r.ast.dependencies.calls.map(c => c.target);
                    relationships.calls.set(programId, targets);
                    
                    // Build reverse map
                    targets.forEach(target => {
                        if (!relationships.calledBy.has(target)) {
                            relationships.calledBy.set(target, []);
                        }
                        relationships.calledBy.get(target).push(programId);
                    });
                }
                
                // Process copies
                if (r.ast.dependencies.copies) {
                    const copybooks = r.ast.dependencies.copies.map(c => c.name);
                    relationships.copies.set(programId, copybooks);
                    
                    // Build reverse map
                    copybooks.forEach(copybook => {
                        if (!relationships.copiedBy.has(copybook)) {
                            relationships.copiedBy.set(copybook, []);
                        }
                        relationships.copiedBy.get(copybook).push(programId);
                    });
                }
            });
        
        // Store in database
        await this.database.storeRelationships(this.analysisRun.id, relationships);
        
        // Create checkpoint
        await this.validator.createCheckpoint('relationships', relationships);
        
        console.log(`Found ${relationships.calls.size} programs with calls`);
        console.log(`Found ${relationships.copies.size} programs with copybooks\n`);
        
        return relationships;
    }

    /**
     * Discover subsystems through clustering
     */
    async discoverSubsystems(parseResults, relationships) {
        console.log('Discovering subsystems...');
        
        // Simple clustering based on shared copybooks and call patterns
        const subsystems = new Map();
        const processed = new Set();
        
        function findCluster(programId, cluster) {
            if (processed.has(programId)) return;
            processed.add(programId);
            cluster.add(programId);
            
            // Add programs that share copybooks
            const copybooks = relationships.copies.get(programId) || [];
            copybooks.forEach(copybook => {
                const users = relationships.copiedBy.get(copybook) || [];
                users.forEach(user => findCluster(user, cluster));
            });
            
            // Add called programs
            const calls = relationships.calls.get(programId) || [];
            calls.forEach(called => {
                if (relationships.calls.has(called)) {
                    findCluster(called, cluster);
                }
            });
        }
        
        // Build clusters
        parseResults
            .filter(r => r.success && r.ast.programId)
            .forEach(r => {
                if (!processed.has(r.ast.programId)) {
                    const cluster = new Set();
                    findCluster(r.ast.programId, cluster);
                    
                    if (cluster.size > 1) {
                        // Name subsystem based on common prefix or size
                        const programs = Array.from(cluster);
                        const prefix = this.findCommonPrefix(programs);
                        const name = prefix || `Subsystem_${subsystems.size + 1}`;
                        
                        subsystems.set(name, {
                            name,
                            programs,
                            size: programs.length
                        });
                    }
                }
            });
        
        console.log(`Discovered ${subsystems.size} subsystems\n`);
        
        return subsystems;
    }

    /**
     * Generate visualizations
     */
    async generateVisualizations(parseResults, relationships, subsystems) {
        console.log('Generating visualizations...');
        
        const visualizations = {
            callGraph: await this.generateCallGraph(relationships),
            subsystemDiagram: await this.generateSubsystemDiagram(subsystems),
            complexityChart: await this.generateComplexityChart(parseResults)
        };
        
        // Save visualizations
        const vizDir = path.join(this.config.outputDir, 'visualizations');
        
        await fs.writeFile(
            path.join(vizDir, 'call-graph.dot'),
            visualizations.callGraph
        );
        
        await fs.writeFile(
            path.join(vizDir, 'subsystems.mmd'),
            visualizations.subsystemDiagram
        );
        
        await fs.writeJson(
            path.join(vizDir, 'complexity-data.json'),
            visualizations.complexityChart,
            { spaces: 2 }
        );
        
        console.log('Visualizations generated\n');
        
        return visualizations;
    }

    /**
     * Generate call graph in DOT format
     */
    async generateCallGraph(relationships) {
        let dot = 'digraph CallGraph {\n';
        dot += '  rankdir=LR;\n';
        dot += '  node [shape=box];\n\n';
        
        relationships.calls.forEach((targets, caller) => {
            targets.forEach(target => {
                dot += `  "${caller}" -> "${target}";\n`;
            });
        });
        
        dot += '}\n';
        return dot;
    }

    /**
     * Generate subsystem diagram in Mermaid format
     */
    async generateSubsystemDiagram(subsystems) {
        let mermaid = 'graph TB\n';
        
        subsystems.forEach((subsystem, name) => {
            mermaid += `  subgraph ${name.replace(/\s/g, '_')}\n`;
            subsystem.programs.slice(0, 5).forEach(prog => {
                mermaid += `    ${prog}\n`;
            });
            if (subsystem.programs.length > 5) {
                mermaid += `    ...[${subsystem.programs.length - 5} more]\n`;
            }
            mermaid += '  end\n';
        });
        
        return mermaid;
    }

    /**
     * Generate complexity chart data
     */
    async generateComplexityChart(parseResults) {
        const data = {
            labels: [],
            mccabe: [],
            cognitive: [],
            loc: []
        };
        
        parseResults
            .filter(r => r.success)
            .sort((a, b) => b.ast.metrics.mccabe - a.ast.metrics.mccabe)
            .slice(0, 20)
            .forEach(r => {
                data.labels.push(r.ast.programId || path.basename(r.file));
                data.mccabe.push(r.ast.metrics.mccabe);
                data.cognitive.push(r.ast.metrics.cognitive);
                data.loc.push(r.ast.lines.code);
            });
        
        return data;
    }

    /**
     * Perform final validation
     */
    async performFinalValidation() {
        console.log('Performing final validation...');
        
        // Validate checkpoints
        const checkpoints = ['discovery', 'relationships'];
        
        for (const checkpoint of checkpoints) {
            const validation = await this.validator.validateCheckpoint(
                checkpoint,
                await this.getCheckpointData(checkpoint)
            );
            
            if (!validation.valid) {
                console.warn(`Checkpoint '${checkpoint}' validation failed`);
            }
        }
        
        // Get validation summary
        const summary = this.validator.getValidationSummary();
        this.analysisRun.results.validationSummary = summary;
        
        console.log(`Validation complete: ${summary.successRate.toFixed(1)}% success rate\n`);
    }

    /**
     * Generate all reports
     */
    async generateReports() {
        console.log('Generating reports...');
        
        // Get all data from database
        const programs = await this.database.getPrograms(this.analysisRun.id);
        const relationships = await this.database.getRelationships(this.analysisRun.id);
        
        // Generate reports
        await this.reportGenerator.generateExecutiveSummary(this.analysisRun);
        await this.reportGenerator.generateDetailedAnalysis(programs, relationships);
        await this.reportGenerator.generateQualityReport(this.analysisRun);
        
        console.log('Reports generated\n');
    }

    /**
     * Complete analysis and cleanup
     */
    async complete() {
        this.analysisRun.endTime = new Date().toISOString();
        this.analysisRun.status = 'COMPLETED';
        
        // Update database
        await this.database.updateAnalysisRun(this.analysisRun);
        
        // Save run summary
        const summaryPath = path.join(this.config.outputDir, 'analysis-summary.json');
        await fs.writeJson(summaryPath, this.analysisRun, { spaces: 2 });
        
        console.log('Analysis complete!');
        console.log(`Results saved to: ${this.config.outputDir}`);
    }

    /**
     * Generate unique run ID
     */
    generateRunId() {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const random = Math.random().toString(36).substring(2, 8);
        return `run-${timestamp}-${random}`;
    }

    /**
     * Find common prefix in program names
     */
    findCommonPrefix(programs) {
        if (programs.length === 0) return '';
        
        let prefix = programs[0];
        for (let i = 1; i < programs.length; i++) {
            while (programs[i].indexOf(prefix) !== 0) {
                prefix = prefix.substring(0, prefix.length - 1);
                if (prefix === '') return '';
            }
        }
        
        // Only return if it's a meaningful prefix
        return prefix.length >= 2 ? prefix : '';
    }

    /**
     * Get checkpoint data for validation
     */
    async getCheckpointData(checkpoint) {
        switch (checkpoint) {
            case 'discovery':
                return { files: await this.discoverFiles() };
            case 'relationships':
                return await this.database.getRelationships(this.analysisRun.id);
            default:
                return null;
        }
    }
}

module.exports = AnalysisOrchestrator;