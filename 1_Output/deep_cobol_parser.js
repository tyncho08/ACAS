const fs = require('fs-extra');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { execSync, exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

class DeepCOBOLParser {
    constructor() {
        this.baseDir = '/Users/MartinGonella/Desktop/Demos/ACAS';
        this.outputDir = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output';
        this.parsedDir = path.join(this.outputDir, 'parsed_ast');
        this.dbPath = path.join(this.outputDir, 'parser_analysis/acas_analysis.sqlite');
        this.copyPath = path.join(this.baseDir, 'copybooks');
        
        this.patterns = {
            programId: /PROGRAM-ID\.\s*([^\s.]+)/i,
            identification: /IDENTIFICATION\s+DIVISION/i,
            environment: /ENVIRONMENT\s+DIVISION/i,
            data: /DATA\s+DIVISION/i,
            procedure: /PROCEDURE\s+DIVISION(\s+USING\s+([^.]+))?/i,
            call: /CALL\s+["']([^"']+)["'](\s+USING\s+([^.]+))?/gi,
            perform: /PERFORM\s+([^\s.]+)(\s+THRU\s+([^\s.]+))?/gi,
            copy: /COPY\s+["']?([^\s."']+)["']?(\s+REPLACING\s+([^.]+))?/gi,
            select: /SELECT\s+([^\s]+)\s+ASSIGN\s+TO\s+([^\s.]+)/gi,
            fd: /FD\s+([^\s.]+)/gi,
            workingStorage: /WORKING-STORAGE\s+SECTION/i,
            localStorage: /LOCAL-STORAGE\s+SECTION/i,
            linkageSection: /LINKAGE\s+SECTION/i,
            fileSection: /FILE\s+SECTION/i,
            section: /^[\s]*([A-Z0-9-]+)\s+SECTION\./gim,
            paragraph: /^[\s]*([A-Z0-9-]+)\.\s*$/gim,
            sqlStatement: /EXEC\s+SQL\s+([\s\S]+?)\s+END-EXEC/gi,
            cicsStatement: /EXEC\s+CICS\s+([\s\S]+?)\s+END-EXEC/gi,
            evaluate: /EVALUATE\s+([\s\S]+?)\s+END-EVALUATE/gi,
            if: /IF\s+([\s\S]+?)\s+(THEN|$)/gi,
            compute: /COMPUTE\s+([^\s]+)\s*=\s*([^.]+)/gi,
            move: /MOVE\s+([^\s]+)\s+TO\s+([^.]+)/gi,
            dataDefinition: /^\s*(\d{2})\s+([^\s.]+)(\s+PIC\s+([^\s.]+))?/gim,
            goto: /GO\s+TO\s+([^\s.]+)/gi,
            entryPoint: /ENTRY\s+["']([^"']+)["']/gi
        };
        
        this.stats = {
            totalFiles: 0,
            parsedSuccessfully: 0,
            parseErrors: 0,
            parseWarnings: 0,
            startTime: new Date()
        };
    }

    async initializeParsing() {
        await fs.ensureDir(this.parsedDir);
        console.log('Starting deep COBOL parsing with GnuCOBOL validation...\n');
    }

    async parseWithGnuCOBOL(filePath) {
        const fileName = path.basename(filePath);
        const result = {
            filePath: filePath,
            fileName: fileName,
            timestamp: new Date().toISOString(),
            programId: null,
            parserUsed: 'GnuCOBOL + Regex',
            parseConfidence: 1.0,
            validationStatus: 'VALID',
            gnuCobolValidation: null,
            parseErrors: [],
            parseWarnings: [],
            divisions: {
                identification: false,
                environment: false,
                data: false,
                procedure: false
            },
            structure: {
                sections: [],
                paragraphs: [],
                entryPoints: []
            },
            dependencies: {
                calls: [],
                copies: [],
                performs: []
            },
            dataFlow: {
                files: [],
                moves: [],
                computes: []
            },
            businessLogic: {
                conditions: [],
                evaluates: [],
                validations: []
            },
            complexity: {
                mccabe: 1,  // Start with 1
                cognitive: 0,
                halstead: {
                    uniqueOperators: new Set(),
                    uniqueOperands: new Set(),
                    totalOperators: 0,
                    totalOperands: 0
                }
            },
            quality: {
                gotos: [],
                deadCode: [],
                missingErrorHandlers: []
            },
            sql: {
                hasSQL: false,
                statements: []
            },
            cics: {
                hasCICS: false,
                statements: []
            }
        };

        try {
            // First, validate with GnuCOBOL
            const gnuCobolResult = await this.validateWithGnuCOBOL(filePath);
            result.gnuCobolValidation = gnuCobolResult;
            
            if (gnuCobolResult.errors.length > 0) {
                result.parseErrors = gnuCobolResult.errors;
                result.validationStatus = 'ERROR';
                result.parseConfidence = 0.5;
            } else if (gnuCobolResult.warnings.length > 0) {
                result.parseWarnings = gnuCobolResult.warnings;
                result.validationStatus = 'WARNING';
                result.parseConfidence = 0.9;
            }

            // Read file content for detailed parsing
            const content = await fs.readFile(filePath, 'utf8');
            const lines = content.split('\n');
            
            // Deep parsing
            this.extractProgramStructure(content, lines, result);
            this.extractControlFlow(content, lines, result);
            this.extractDataFlow(content, lines, result);
            this.extractBusinessLogic(content, lines, result);
            this.calculateComplexity(content, lines, result);
            this.extractSQLandCICS(content, lines, result);
            this.detectQualityIssues(content, lines, result);
            
            // Calculate final metrics
            result.complexity.lines = {
                total: lines.length,
                executable: this.countExecutableLines(lines),
                comments: this.countCommentLines(lines)
            };
            
        } catch (error) {
            result.parseErrors.push(error.message);
            result.validationStatus = 'ERROR';
            result.parseConfidence = 0;
        }

        return result;
    }

    async validateWithGnuCOBOL(filePath) {
        const result = {
            success: false,
            errors: [],
            warnings: []
        };

        try {
            // Run GnuCOBOL syntax check
            const command = `cobc -I "${this.copyPath}" -fsyntax-only -fdiagnostics-plain-output "${filePath}" 2>&1`;
            const output = execSync(command, { encoding: 'utf8' });
            
            // Parse GnuCOBOL output
            const lines = output.split('\n');
            lines.forEach(line => {
                if (line.includes('error:')) {
                    result.errors.push(line);
                } else if (line.includes('warning:')) {
                    result.warnings.push(line);
                }
            });
            
            result.success = result.errors.length === 0;
            
        } catch (error) {
            // GnuCOBOL exits with non-zero on syntax errors
            const output = error.stdout || error.message;
            const lines = output.split('\n');
            
            lines.forEach(line => {
                if (line.includes('error:')) {
                    result.errors.push(line);
                } else if (line.includes('warning:')) {
                    result.warnings.push(line);
                }
            });
        }

        return result;
    }

    extractProgramStructure(content, lines, result) {
        // Extract PROGRAM-ID
        const programIdMatch = content.match(this.patterns.programId);
        if (programIdMatch) {
            result.programId = programIdMatch[1];
        }

        // Check divisions
        result.divisions.identification = this.patterns.identification.test(content);
        result.divisions.environment = this.patterns.environment.test(content);
        result.divisions.data = this.patterns.data.test(content);
        result.divisions.procedure = this.patterns.procedure.test(content);

        // Extract sections
        let match;
        while ((match = this.patterns.section.exec(content)) !== null) {
            const lineNum = this.getLineNumber(content, match.index);
            result.structure.sections.push({
                name: match[1],
                line: lineNum
            });
        }

        // Extract paragraphs
        this.patterns.paragraph.lastIndex = 0;
        while ((match = this.patterns.paragraph.exec(content)) !== null) {
            const lineNum = this.getLineNumber(content, match.index);
            // Filter out false positives
            if (!match[1].match(/^(PIC|VALUE|USING|GIVING)$/)) {
                result.structure.paragraphs.push({
                    name: match[1],
                    line: lineNum
                });
            }
        }

        // Extract entry points
        while ((match = this.patterns.entryPoint.exec(content)) !== null) {
            const lineNum = this.getLineNumber(content, match.index);
            result.structure.entryPoints.push({
                name: match[1],
                line: lineNum
            });
        }
    }

    extractControlFlow(content, lines, result) {
        // Extract CALL statements
        let match;
        while ((match = this.patterns.call.exec(content)) !== null) {
            const lineNum = this.getLineNumber(content, match.index);
            const callInfo = {
                target: match[1],
                line: lineNum,
                type: match[1].startsWith('"') ? 'STATIC' : 'DYNAMIC',
                using: match[3] ? match[3].trim().split(/\s+/) : []
            };
            result.dependencies.calls.push(callInfo);
            result.complexity.mccabe++; // Calls increase complexity
        }

        // Extract PERFORM statements
        while ((match = this.patterns.perform.exec(content)) !== null) {
            const lineNum = this.getLineNumber(content, match.index);
            result.dependencies.performs.push({
                target: match[1],
                thru: match[3] || null,
                line: lineNum
            });
        }

        // Extract COPY statements
        while ((match = this.patterns.copy.exec(content)) !== null) {
            const lineNum = this.getLineNumber(content, match.index);
            result.dependencies.copies.push({
                name: match[1],
                line: lineNum,
                replacing: match[3] || null
            });
        }
    }

    extractDataFlow(content, lines, result) {
        // Extract file operations
        let match;
        while ((match = this.patterns.select.exec(content)) !== null) {
            const lineNum = this.getLineNumber(content, match.index);
            result.dataFlow.files.push({
                logicalName: match[1],
                physicalName: match[2],
                line: lineNum
            });
        }

        // Extract MOVE statements
        while ((match = this.patterns.move.exec(content)) !== null) {
            const lineNum = this.getLineNumber(content, match.index);
            result.dataFlow.moves.push({
                from: match[1],
                to: match[2],
                line: lineNum
            });
            
            // Update Halstead metrics
            result.complexity.halstead.uniqueOperators.add('MOVE');
            result.complexity.halstead.uniqueOperands.add(match[1]);
            result.complexity.halstead.uniqueOperands.add(match[2]);
            result.complexity.halstead.totalOperators++;
            result.complexity.halstead.totalOperands += 2;
        }

        // Extract COMPUTE statements
        while ((match = this.patterns.compute.exec(content)) !== null) {
            const lineNum = this.getLineNumber(content, match.index);
            result.dataFlow.computes.push({
                target: match[1],
                expression: match[2],
                line: lineNum
            });
            result.complexity.mccabe++; // Computations increase complexity
            
            // Update Halstead metrics
            result.complexity.halstead.uniqueOperators.add('COMPUTE');
            result.complexity.halstead.totalOperators++;
        }
    }

    extractBusinessLogic(content, lines, result) {
        // Extract IF conditions
        let match;
        while ((match = this.patterns.if.exec(content)) !== null) {
            const lineNum = this.getLineNumber(content, match.index);
            result.businessLogic.conditions.push({
                type: 'IF',
                condition: match[1].trim(),
                line: lineNum
            });
            result.complexity.mccabe++; // Each decision point increases McCabe
            result.complexity.cognitive++; // Conditions increase cognitive complexity
        }

        // Extract EVALUATE statements
        while ((match = this.patterns.evaluate.exec(content)) !== null) {
            const lineNum = this.getLineNumber(content, match.index);
            const evaluateContent = match[1];
            const whenCount = (evaluateContent.match(/WHEN/gi) || []).length;
            
            result.businessLogic.evaluates.push({
                content: evaluateContent.substring(0, 100) + '...',
                line: lineNum,
                whenCount: whenCount
            });
            
            result.complexity.mccabe += whenCount; // Each WHEN is a branch
            result.complexity.cognitive += whenCount * 2; // EVALUATE is more complex
        }
    }

    extractSQLandCICS(content, lines, result) {
        // Extract SQL statements
        let match;
        while ((match = this.patterns.sqlStatement.exec(content)) !== null) {
            const lineNum = this.getLineNumber(content, match.index);
            const sqlContent = match[1].trim();
            const sqlType = sqlContent.split(/\s+/)[0].toUpperCase();
            
            result.sql.statements.push({
                type: sqlType,
                content: sqlContent,
                line: lineNum
            });
            result.sql.hasSQL = true;
        }

        // Extract CICS statements
        while ((match = this.patterns.cicsStatement.exec(content)) !== null) {
            const lineNum = this.getLineNumber(content, match.index);
            const cicsContent = match[1].trim();
            const cicsCommand = cicsContent.split(/\s+/)[0].toUpperCase();
            
            result.cics.statements.push({
                command: cicsCommand,
                content: cicsContent,
                line: lineNum
            });
            result.cics.hasCICS = true;
        }
    }

    calculateComplexity(content, lines, result) {
        // Final Halstead calculations
        const n1 = result.complexity.halstead.uniqueOperators.size;
        const n2 = result.complexity.halstead.uniqueOperands.size;
        const N1 = result.complexity.halstead.totalOperators;
        const N2 = result.complexity.halstead.totalOperands;
        
        result.complexity.halstead = {
            uniqueOperators: n1,
            uniqueOperands: n2,
            totalOperators: N1,
            totalOperands: N2,
            vocabulary: n1 + n2,
            length: N1 + N2,
            volume: (N1 + N2) * Math.log2(n1 + n2 || 1)
        };

        // Calculate maintainability index (simplified)
        const V = result.complexity.halstead.volume;
        const C = result.complexity.mccabe;
        const L = result.complexity.lines.total;
        const P = result.complexity.lines.comments / L * 100;
        
        result.complexity.maintainabilityIndex = Math.max(0, 
            171 - 5.2 * Math.log(V || 1) - 0.23 * C - 16.2 * Math.log(L || 1) + 50 * Math.sin(Math.sqrt(2.4 * P))
        ) / 171 * 100;
    }

    detectQualityIssues(content, lines, result) {
        // Detect GOTO statements
        let match;
        while ((match = this.patterns.goto.exec(content)) !== null) {
            const lineNum = this.getLineNumber(content, match.index);
            result.quality.gotos.push({
                target: match[1],
                line: lineNum
            });
        }

        // Detect potential dead code (paragraphs never performed)
        const performedParagraphs = new Set(result.dependencies.performs.map(p => p.target));
        result.structure.paragraphs.forEach(para => {
            if (!performedParagraphs.has(para.name) && 
                !para.name.match(/^(MAIN|START|BEGIN)/)) {
                result.quality.deadCode.push(para);
            }
        });
    }

    getLineNumber(content, index) {
        return content.substring(0, index).split('\n').length;
    }

    countExecutableLines(lines) {
        return lines.filter(line => {
            const trimmed = line.trim();
            return trimmed.length > 0 && 
                   !trimmed.startsWith('*') && 
                   !trimmed.startsWith('/') &&
                   trimmed.indexOf('*>') !== 0;
        }).length;
    }

    countCommentLines(lines) {
        return lines.filter(line => {
            const trimmed = line.trim();
            return trimmed.startsWith('*') || 
                   trimmed.startsWith('/') ||
                   trimmed.indexOf('*>') === 0;
        }).length;
    }

    async saveResults(results) {
        const db = new sqlite3.Database(this.dbPath);
        
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                const stmt = db.prepare(`
                    INSERT INTO programs (
                        file_path, file_name, program_id, program_type,
                        parse_confidence, mccabe_complexity, cognitive_complexity,
                        maintainability_index, total_lines, executable_lines, comment_lines,
                        has_sql, has_cics, parse_timestamp, parser_used,
                        validation_status, ast_node_count, has_identification,
                        has_environment, has_data, has_procedure
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `);
                
                for (const result of results) {
                    const astNodeCount = 
                        result.structure.sections.length + 
                        result.structure.paragraphs.length +
                        result.dependencies.calls.length +
                        result.dependencies.performs.length;
                    
                    stmt.run(
                        result.filePath,
                        result.fileName,
                        result.programId,
                        this.determineProgramType(result),
                        result.parseConfidence,
                        result.complexity.mccabe,
                        result.complexity.cognitive,
                        result.complexity.maintainabilityIndex,
                        result.complexity.lines.total,
                        result.complexity.lines.executable,
                        result.complexity.lines.comments,
                        result.sql.hasSQL ? 1 : 0,
                        result.cics.hasCICS ? 1 : 0,
                        result.timestamp,
                        result.parserUsed,
                        result.validationStatus,
                        astNodeCount,
                        result.divisions.identification ? 1 : 0,
                        result.divisions.environment ? 1 : 0,
                        result.divisions.data ? 1 : 0,
                        result.divisions.procedure ? 1 : 0
                    );
                    
                    // Save other relationships
                    this.saveRelationships(db, result);
                }
                
                stmt.finalize();
                db.close(err => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        });
    }

    saveRelationships(db, result) {
        // Save calls
        result.dependencies.calls.forEach(call => {
            db.run(`
                INSERT INTO program_calls (
                    caller_program_id, caller_file_path, called_program_id,
                    call_type, line_number, using_params
                ) VALUES (?, ?, ?, ?, ?, ?)
            `, result.programId, result.filePath, call.target, 
               call.type, call.line, JSON.stringify(call.using));
        });
        
        // Save copybooks
        result.dependencies.copies.forEach(copy => {
            db.run(`
                INSERT INTO copybook_usage (
                    program_file_path, copybook_name, line_number, replacing_clause
                ) VALUES (?, ?, ?, ?)
            `, result.filePath, copy.name, copy.line, copy.replacing);
        });
        
        // Save quality issues
        result.quality.gotos.forEach(goto => {
            db.run(`
                INSERT INTO quality_issues (
                    program_id, file_path, issue_type, severity,
                    line_number, description, suggestion
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            `, result.programId, result.filePath, 'GOTO_STATEMENT', 'WARNING',
               goto.line, `GOTO to ${goto.target}`, 'Consider restructuring to avoid GOTO');
        });
    }

    determineProgramType(result) {
        if (result.cics.hasCICS) return 'ONLINE';
        if (result.fileName.match(/[89]\d{2}\.cbl$/)) return 'BATCH';
        if (result.structure.entryPoints.length > 1) return 'SUBROUTINE';
        return 'MAIN';
    }

    async processAllFiles() {
        const fileListPath = path.join(this.outputDir, 'cobol_files_list.txt');
        const files = (await fs.readFile(fileListPath, 'utf8')).split('\n').filter(f => f.trim());
        
        console.log(`Processing ${files.length} COBOL files...\n`);
        
        const results = [];
        let processed = 0;
        
        for (const file of files) {
            if (file.trim()) {
                processed++;
                console.log(`[${processed}/${files.length}] Parsing: ${path.basename(file)}`);
                
                const result = await this.parseWithGnuCOBOL(file.trim());
                results.push(result);
                
                // Save AST JSON
                const jsonFileName = file.replace(/[\/\\]/g, '_') + '.json';
                const jsonPath = path.join(this.parsedDir, jsonFileName);
                await fs.writeJson(jsonPath, result, { spaces: 2 });
                
                if (result.validationStatus === 'VALID') {
                    this.stats.parsedSuccessfully++;
                } else if (result.validationStatus === 'ERROR') {
                    this.stats.parseErrors++;
                } else {
                    this.stats.parseWarnings++;
                }
                
                // Progress update every 10 files
                if (processed % 10 === 0) {
                    console.log(`Progress: ${processed}/${files.length} (${(processed/files.length*100).toFixed(1)}%)`);
                }
            }
        }
        
        this.stats.totalFiles = processed;
        
        // Save to database
        console.log('\nSaving results to database...');
        await this.saveResults(results);
        
        // Generate summary report
        await this.generateSummaryReport(results);
        
        return results;
    }

    async generateSummaryReport(results) {
        const endTime = new Date();
        const duration = (endTime - this.stats.startTime) / 1000;
        
        let report = '# Deep COBOL Parsing Report\n\n';
        report += `## Processing Statistics\n\n`;
        report += `- **Start Time:** ${this.stats.startTime.toISOString()}\n`;
        report += `- **End Time:** ${endTime.toISOString()}\n`;
        report += `- **Duration:** ${duration.toFixed(2)} seconds\n`;
        report += `- **Files Processed:** ${this.stats.totalFiles}\n`;
        report += `- **Parsed Successfully:** ${this.stats.parsedSuccessfully}\n`;
        report += `- **Parse Errors:** ${this.stats.parseErrors}\n`;
        report += `- **Parse Warnings:** ${this.stats.parseWarnings}\n`;
        report += `- **Success Rate:** ${(this.stats.parsedSuccessfully / this.stats.totalFiles * 100).toFixed(2)}%\n\n`;
        
        // Complexity statistics
        const complexityStats = results
            .filter(r => r.complexity.mccabe > 0)
            .sort((a, b) => b.complexity.mccabe - a.complexity.mccabe);
        
        report += `## Top 10 Most Complex Programs\n\n`;
        report += '| Program | McCabe | Cognitive | Maintainability | Lines |\n';
        report += '|---------|--------|-----------|-----------------|-------|\n';
        
        complexityStats.slice(0, 10).forEach(prog => {
            report += `| ${prog.programId || prog.fileName} | ${prog.complexity.mccabe} | ${prog.complexity.cognitive} | ${prog.complexity.maintainabilityIndex.toFixed(1)} | ${prog.complexity.lines.total} |\n`;
        });
        
        // Quality issues
        const totalGotos = results.reduce((sum, r) => sum + r.quality.gotos.length, 0);
        const totalDeadCode = results.reduce((sum, r) => sum + r.quality.deadCode.length, 0);
        
        report += `\n## Quality Issues Summary\n\n`;
        report += `- **GOTO Statements:** ${totalGotos}\n`;
        report += `- **Potential Dead Code:** ${totalDeadCode} paragraphs\n`;
        report += `- **Programs with SQL:** ${results.filter(r => r.sql.hasSQL).length}\n`;
        report += `- **Programs with CICS:** ${results.filter(r => r.cics.hasCICS).length}\n`;
        
        const reportPath = path.join(this.outputDir, 'deep_parsing_report.md');
        await fs.writeFile(reportPath, report);
        console.log(`\nSummary report saved to: ${reportPath}`);
    }
}

// Main execution
async function main() {
    const parser = new DeepCOBOLParser();
    
    try {
        await parser.initializeParsing();
        await parser.processAllFiles();
        
        console.log('\n✓ Task 1.2: Deep COBOL Parsing completed successfully!');
    } catch (error) {
        console.error('Parsing failed:', error);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = DeepCOBOLParser;