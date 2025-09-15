const fs = require('fs-extra');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

class Phase3MetricsCalculator {
    constructor() {
        this.dbPath = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output/parser_analysis/acas_analysis.sqlite';
        this.parsedDir = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output/parsed_ast';
        this.outputDir = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output/phase3_metrics';
        this.db = null;
        this.metricsData = [];
    }

    async initialize() {
        await fs.ensureDir(this.outputDir);
        this.db = new sqlite3.Database(this.dbPath);
        
        console.log('Phase 3 Metrics Calculator initialized');
        console.log('Task 3.2: Real Code Metrics Calculation\n');
    }

    async loadParsedAST(fileName) {
        try {
            const astPath = path.join(this.parsedDir, fileName);
            if (await fs.pathExists(astPath)) {
                return await fs.readJson(astPath);
            }
        } catch (error) {
            console.error(`Error loading AST for ${fileName}:`, error.message);
        }
        return null;
    }

    getMcCabeComplexity(ast) {
        // CRITICAL FIX: Use the McCabe value from the AST that was calculated during Phase 1
        // Do NOT recalculate - this ensures consistency across phases
        if (ast.complexity && ast.complexity.mccabe !== undefined) {
            return {
                value: ast.complexity.mccabe,
                details: {
                    conditionals: ast.businessLogic?.conditions?.filter(c => c.type === 'IF').length || 0,
                    loops: ast.controlFlow?.performs?.filter(p => p.type === 'UNTIL' || p.type === 'VARYING').length || 0,
                    evaluate_branches: ast.businessLogic?.evaluates?.reduce((sum, e) => sum + (e.whenCount || 0), 0) || 0,
                    exception_handlers: 0,
                    goto_statements: ast.controlFlow?.gotos?.length || 0
                }
            };
        }
        
        // Fallback if no AST complexity - should not happen
        console.warn('No McCabe complexity in AST, using default');
        return { value: 1, details: {} };
    }

    calculateHalsteadMetrics(ast) {
        if (!ast || !ast.sourceCode) {
            return {
                unique_operators: 0,
                unique_operands: 0,
                total_operators: 0,
                total_operands: 0,
                vocabulary: 0,
                length: 0,
                volume: 0,
                difficulty: 0,
                effort: 0,
                time_seconds: 0,
                estimated_bugs: 0
            };
        }

        // Use Halstead metrics from AST if available
        if (ast.complexity && ast.complexity.halstead) {
            return ast.complexity.halstead;
        }

        // Otherwise calculate from source
        const operators = new Set();
        const operands = new Set();
        let totalOperators = 0;
        let totalOperands = 0;

        // COBOL operators
        const operatorPatterns = [
            /\b(ADD|SUBTRACT|MULTIPLY|DIVIDE|COMPUTE|MOVE|PERFORM|CALL|IF|ELSE|WHEN|EVALUATE|GO TO)\b/gi,
            /(\+|-|\*|\/|=|>|<|>=|<=|NOT)/g
        ];

        // Extract operators
        operatorPatterns.forEach(pattern => {
            const matches = ast.sourceCode.match(pattern) || [];
            matches.forEach(op => {
                operators.add(op.toUpperCase());
                totalOperators++;
            });
        });

        // Extract operands (variables, literals)
        const operandPattern = /\b([A-Z0-9-]+)\b/g;
        const reservedWords = ['ADD', 'SUBTRACT', 'MULTIPLY', 'DIVIDE', 'COMPUTE', 'MOVE', 'PERFORM', 
                               'CALL', 'IF', 'ELSE', 'WHEN', 'EVALUATE', 'GO', 'TO', 'END', 'THEN'];
        
        const matches = ast.sourceCode.match(operandPattern) || [];
        matches.forEach(operand => {
            if (!reservedWords.includes(operand.toUpperCase())) {
                operands.add(operand);
                totalOperands++;
            }
        });

        const n1 = operators.size;
        const n2 = operands.size;
        const N1 = totalOperators;
        const N2 = totalOperands;
        
        const vocabulary = n1 + n2;
        const length = N1 + N2;
        const volume = length * Math.log2(vocabulary || 1);
        const difficulty = (n1 / 2) * (N2 / n2 || 1);
        const effort = difficulty * volume;
        const time_seconds = effort / 18;
        const estimated_bugs = volume / 3000;

        return {
            unique_operators: n1,
            unique_operands: n2,
            total_operators: N1,
            total_operands: N2,
            vocabulary,
            length,
            volume: Math.round(volume),
            difficulty: Math.round(difficulty * 100) / 100,
            effort: Math.round(effort),
            time_seconds: Math.round(time_seconds),
            estimated_bugs: Math.round(estimated_bugs * 1000) / 1000
        };
    }

    calculateCognitiveComplexity(ast) {
        // Use cognitive complexity from AST if available
        if (ast.complexity && ast.complexity.cognitive !== undefined) {
            return {
                value: ast.complexity.cognitive,
                max_nesting_level: 0,
                goto_penalty: ast.controlFlow?.gotos?.length || 0
            };
        }

        // Fallback calculation
        let complexity = 0;
        let currentNesting = 0;
        let maxNesting = 0;

        // Analyze conditions
        if (ast.businessLogic?.conditions) {
            ast.businessLogic.conditions.forEach(condition => {
                complexity++;
                if (condition.type === 'NESTED_IF') {
                    complexity += currentNesting;
                    currentNesting++;
                    maxNesting = Math.max(maxNesting, currentNesting);
                }
            });
        }

        // Analyze loops
        if (ast.controlFlow?.performs) {
            ast.controlFlow.performs.forEach(perform => {
                complexity++;
                if (perform.type === 'NESTED') {
                    complexity += currentNesting;
                }
            });
        }

        // Penalty for GOTO statements (breaks linear flow)
        const gotoPenalty = (ast.controlFlow?.gotos?.length || 0) * 3;
        complexity += gotoPenalty;

        return {
            value: complexity,
            max_nesting_level: maxNesting,
            goto_penalty: gotoPenalty
        };
    }

    calculateTechnicalDebt(ast, metrics) {
        const debt = {
            code_smells: [],
            deprecated_features: [],
            missing_features: [],
            complexity_hotspots: [],
            estimated_hours: 0
        };

        // Code smell: GOTO usage
        if (ast.controlFlow?.gotos && ast.controlFlow.gotos.length > 0) {
            debt.code_smells.push({
                type: 'GOTO_USAGE',
                count: ast.controlFlow.gotos.length,
                locations: ast.controlFlow.gotos.map(g => `line ${g.line}`),
                effort_hours: ast.controlFlow.gotos.length * 2
            });
        }

        // Code smell: Very high complexity
        if (metrics.mccabe.value > 50) {
            debt.complexity_hotspots.push({
                type: 'VERY_HIGH_COMPLEXITY',
                value: metrics.mccabe.value,
                threshold: 50,
                effort_hours: Math.ceil((metrics.mccabe.value - 50) / 10) * 4
            });
        }

        // Missing feature: No error handling for file operations
        if (ast.dataFlow?.files && ast.dataFlow.files.length > 0) {
            const fileOpsWithoutErrorHandling = [];
            ast.dataFlow.files.forEach(file => {
                // Check if there's error handling near the file operation
                const hasErrorHandling = ast.sourceCode && 
                    ast.sourceCode.includes(`${file.logicalName}-STATUS`);
                if (!hasErrorHandling) {
                    fileOpsWithoutErrorHandling.push(file.logicalName);
                }
            });
            
            if (fileOpsWithoutErrorHandling.length > 0) {
                debt.missing_features.push({
                    type: 'FILE_ERROR_HANDLING',
                    files: fileOpsWithoutErrorHandling,
                    effort_hours: fileOpsWithoutErrorHandling.length * 0.5
                });
            }
        }

        // Deprecated features
        const deprecatedPatterns = [
            { pattern: /ALTER\s+/gi, replacement: 'GO TO or PERFORM' },
            { pattern: /EXHIBIT\s+/gi, replacement: 'DISPLAY' },
            { pattern: /EXAMINE\s+/gi, replacement: 'INSPECT' }
        ];

        if (ast.sourceCode) {
            deprecatedPatterns.forEach(dep => {
                const matches = ast.sourceCode.match(dep.pattern);
                if (matches) {
                    debt.deprecated_features.push({
                        feature: matches[0],
                        count: matches.length,
                        replacement: dep.replacement,
                        effort_hours: matches.length * 0.25
                    });
                }
            });
        }

        // Calculate total technical debt
        debt.estimated_hours = 
            debt.code_smells.reduce((sum, smell) => sum + (smell.effort_hours || 0), 0) +
            debt.complexity_hotspots.reduce((sum, hot) => sum + (hot.effort_hours || 0), 0) +
            debt.missing_features.reduce((sum, feat) => sum + (feat.effort_hours || 0), 0) +
            debt.deprecated_features.reduce((sum, dep) => sum + (dep.effort_hours || 0), 0);

        return debt;
    }

    calculateMaintainabilityIndex(metrics) {
        // Microsoft's Maintainability Index formula
        // MI = 171 - 5.2 * ln(HV) - 0.23 * CC - 16.2 * ln(LOC)
        // Normalized to 0-100 scale
        
        const HV = metrics.halstead.volume || 1;
        const CC = metrics.mccabe.value || 1;
        const LOC = metrics.lines_of_code || 1;
        
        let MI = 171 - 5.2 * Math.log(HV) - 0.23 * CC - 16.2 * Math.log(LOC);
        MI = Math.max(0, MI * 100 / 171); // Normalize to 0-100
        
        const rating = MI > 85 ? 'Excellent' :
                      MI > 65 ? 'Good' :
                      MI > 45 ? 'Fair' : 'Poor';
        
        return {
            value: Math.round(MI),
            rating
        };
    }

    async calculateMetricsForProgram(programId, fileName, ast) {
        if (!ast) return null;
        
        // CRITICAL: Use McCabe from AST, not recalculate
        const mccabe = this.getMcCabeComplexity(ast);
        const halstead = this.calculateHalsteadMetrics(ast);
        const cognitive = this.calculateCognitiveComplexity(ast);
        
        // Lines of code
        const lines_of_code = ast.complexity?.lines?.total || 0;
        const executable_lines = ast.complexity?.lines?.code || 0;
        const comment_lines = ast.complexity?.lines?.comments || 0;
        
        const metrics = {
            program_id: programId,
            file_name: fileName,
            parse_confidence: ast.parseConfidence || 0,
            lines_of_code,
            executable_lines,
            comment_lines,
            mccabe,
            halstead,
            cognitive
        };
        
        // Calculate maintainability index
        const maintainability = this.calculateMaintainabilityIndex(metrics);
        metrics.maintainability = maintainability;
        
        // Calculate technical debt
        const debt = this.calculateTechnicalDebt(ast, metrics);
        metrics.technical_debt = debt;
        
        return metrics;
    }

    async calculateAllMetrics() {
        // Get all programs from database
        const programs = await this.query(`
            SELECT program_id, file_name, file_path 
            FROM programs 
            WHERE program_id IS NOT NULL
            ORDER BY program_id
        `);
        
        console.log(`\nCalculating metrics for ${programs.length} programs...\n`);
        
        for (const program of programs) {
            // Look for corresponding AST file
            const astFiles = await fs.readdir(this.parsedDir);
            const astFile = astFiles.find(f => 
                f.includes(program.program_id) && f.endsWith('.json')
            );
            
            if (astFile) {
                const ast = await this.loadParsedAST(astFile);
                if (ast) {
                    const metrics = await this.calculateMetricsForProgram(
                        program.program_id,
                        astFile,
                        ast
                    );
                    
                    if (metrics) {
                        this.metricsData.push(metrics);
                        
                        // Show progress
                        if (this.metricsData.length % 50 === 0) {
                            console.log(`  Processed ${this.metricsData.length} programs...`);
                        }
                    }
                }
            }
        }
        
        console.log(`\nMetrics calculated for ${this.metricsData.length} programs.`);
    }

    generateSummaryStatistics() {
        const summary = {
            total_programs: this.metricsData.length,
            total_loc: 0,
            avg_complexity: 0,
            avg_cognitive: 0,
            total_debt_hours: 0,
            high_complexity_programs: 0,
            programs_with_goto: 0
        };

        let totalComplexity = 0;
        let totalCognitive = 0;

        this.metricsData.forEach(metric => {
            summary.total_loc += metric.lines_of_code;
            totalComplexity += metric.mccabe.value;
            totalCognitive += metric.cognitive.value;
            summary.total_debt_hours += metric.technical_debt.estimated_hours;
            
            if (metric.mccabe.value > 50) {
                summary.high_complexity_programs++;
            }
            
            if (metric.mccabe.details.goto_statements > 0) {
                summary.programs_with_goto++;
            }
        });

        summary.avg_complexity = totalComplexity / this.metricsData.length;
        summary.avg_cognitive = totalCognitive / this.metricsData.length;

        return summary;
    }

    generateComplexityDistribution() {
        const distribution = {
            simple: 0,      // 1-10
            moderate: 0,    // 11-20
            complex: 0,     // 21-50
            very_complex: 0 // >50
        };

        this.metricsData.forEach(metric => {
            const complexity = metric.mccabe.value;
            if (complexity <= 10) distribution.simple++;
            else if (complexity <= 20) distribution.moderate++;
            else if (complexity <= 50) distribution.complex++;
            else distribution.very_complex++;
        });

        return distribution;
    }

    async generateReport() {
        const summary = this.generateSummaryStatistics();
        const distribution = this.generateComplexityDistribution();
        
        const report = {
            timestamp: new Date().toISOString(),
            task: 'Task 3.2: Real Code Metrics Calculation',
            calculation_method: 'AST-based analysis (not estimated)',
            summary,
            complexity_distribution: distribution,
            metrics_by_program: this.metricsData
        };

        // Save detailed JSON report
        const jsonPath = path.join(this.outputDir, 'metrics_report.json');
        await fs.writeJson(jsonPath, report, { spaces: 2 });
        
        // Generate CSV for easy analysis
        const csvPath = path.join(this.outputDir, 'metrics_summary.csv');
        const csvHeader = 'program_id,mccabe_complexity,cognitive_complexity,lines_of_code,technical_debt_hours\n';
        const csvData = this.metricsData.map(m => 
            `${m.program_id},${m.mccabe.value},${m.cognitive.value},${m.lines_of_code},${m.technical_debt.estimated_hours}`
        ).join('\n');
        
        await fs.writeFile(csvPath, csvHeader + csvData);
        
        // Generate human-readable report
        let readableReport = `# ACAS Code Metrics Report

Generated: ${report.timestamp}
Method: ${report.calculation_method}

## Summary Statistics

- Total Programs Analyzed: ${summary.total_programs}
- Total Lines of Code: ${summary.total_loc.toLocaleString()}
- Average McCabe Complexity: ${summary.avg_complexity.toFixed(1)}
- Average Cognitive Complexity: ${summary.avg_cognitive.toFixed(1)}
- Total Technical Debt: ${summary.total_debt_hours.toFixed(0)} hours
- High Complexity Programs (>50): ${summary.high_complexity_programs}
- Programs with GOTO: ${summary.programs_with_goto}

## Complexity Distribution

- Simple (1-10): ${distribution.simple} programs (${(distribution.simple/summary.total_programs*100).toFixed(1)}%)
- Moderate (11-20): ${distribution.moderate} programs (${(distribution.moderate/summary.total_programs*100).toFixed(1)}%)
- Complex (21-50): ${distribution.complex} programs (${(distribution.complex/summary.total_programs*100).toFixed(1)}%)
- Very Complex (>50): ${distribution.very_complex} programs (${(distribution.very_complex/summary.total_programs*100).toFixed(1)}%)

## Top 10 Most Complex Programs

`;
        
        // Add top 10 complex programs
        const sortedByComplexity = [...this.metricsData]
            .sort((a, b) => b.mccabe.value - a.mccabe.value)
            .slice(0, 10);
        
        sortedByComplexity.forEach((prog, idx) => {
            readableReport += `${idx + 1}. ${prog.program_id}: McCabe=${prog.mccabe.value}, Cognitive=${prog.cognitive.value}, LOC=${prog.lines_of_code}\n`;
        });
        
        const reportPath = path.join(this.outputDir, 'metrics_report.md');
        await fs.writeFile(reportPath, readableReport);
        
        console.log(`\nReports generated:`);
        console.log(`  - ${jsonPath}`);
        console.log(`  - ${csvPath}`);
        console.log(`  - ${reportPath}`);
    }

    // Database helper
    query(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows || []);
            });
        });
    }

    async execute() {
        await this.initialize();
        
        try {
            await this.calculateAllMetrics();
            await this.generateReport();
            
            console.log('\n=== Task 3.2 Complete ===');
            console.log(`Successfully calculated metrics for ${this.metricsData.length} programs.`);
            
        } catch (error) {
            console.error('Error during metrics calculation:', error);
            throw error;
        } finally {
            this.db.close();
        }
    }
}

// Execute
async function main() {
    const calculator = new Phase3MetricsCalculator();
    
    try {
        await calculator.execute();
        console.log('\n✅ Task 3.2: Real Code Metrics Calculation completed!');
    } catch (error) {
        console.error('Error in Task 3.2:', error);
        process.exit(1);
    }
}

main();