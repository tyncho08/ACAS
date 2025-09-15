const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const crypto = require('crypto');

/**
 * Single COBOL Parser - One methodology, one source of truth
 * 
 * This parser is THE ONLY place where metrics are calculated.
 * All other modules must use these values without recalculation.
 */
class SingleCOBOLParser {
    constructor(config = {}) {
        this.config = {
            gnucobolPath: config.gnucobolPath || 'cobc',
            validateWithGnuCOBOL: config.validateWithGnuCOBOL !== false,
            includePaths: config.includePaths || [],
            ...config
        };
        
        // Parsing patterns - defined once, used consistently
        this.patterns = {
            programId: /PROGRAM-ID\.\s*([^\s.]+)/i,
            divisions: {
                identification: /IDENTIFICATION\s+DIVISION/i,
                environment: /ENVIRONMENT\s+DIVISION/i,
                data: /DATA\s+DIVISION/i,
                procedure: /PROCEDURE\s+DIVISION/i
            },
            // Control flow patterns that affect McCabe complexity
            complexity: {
                if: /^\s*IF\s+/im,
                evaluate: /^\s*EVALUATE\s+/im,
                when: /^\s*WHEN\s+/im,
                perform: /^\s*PERFORM\s+/im,
                call: /^\s*CALL\s+/im,
                goto: /^\s*GO\s+TO\s+/im,
                until: /\s+UNTIL\s+/i,
                varying: /\s+VARYING\s+/i,
                times: /\s+TIMES/i
            },
            // Dependencies
            dependencies: {
                call: /CALL\s+["']([^"']+)["']/gi,
                copy: /COPY\s+["']?([^\s."']+)["']?/gi,
                perform: /PERFORM\s+([A-Z0-9-]+)/gi
            },
            // Data elements
            data: {
                fd: /^\s*FD\s+([^\s.]+)/im,
                select: /^\s*SELECT\s+([^\s]+)\s+ASSIGN\s+TO\s+([^\s.]+)/im,
                workingStorage: /^\s*WORKING-STORAGE\s+SECTION/im,
                dataItem: /^\s*(\d{2})\s+([^\s.]+)(\s+PIC\s+[^\s.]+)?/gm
            },
            // SQL/CICS
            embedded: {
                sql: /EXEC\s+SQL\s+([\s\S]+?)\s+END-EXEC/gi,
                cics: /EXEC\s+CICS\s+([\s\S]+?)\s+END-EXEC/gi
            }
        };
        
        this.stats = {
            totalFiles: 0,
            successfulParses: 0,
            failedParses: 0,
            totalLines: 0,
            startTime: new Date()
        };
    }

    /**
     * Parse a single COBOL file - this is the main entry point
     */
    async parseFile(filePath) {
        const startTime = Date.now();
        this.stats.totalFiles++;
        
        try {
            // 1. Read and validate file
            const content = await fs.readFile(filePath, 'utf8');
            const lines = content.split('\n');
            this.stats.totalLines += lines.length;
            
            // 2. Initialize AST structure
            const ast = {
                filePath,
                fileName: path.basename(filePath),
                fileHash: this.calculateHash(content),
                timestamp: new Date().toISOString(),
                parseTime: 0,
                lines: {
                    total: lines.length,
                    code: 0,
                    comment: 0,
                    blank: 0
                },
                programId: null,
                divisions: {
                    identification: false,
                    environment: false,
                    data: false,
                    procedure: false
                },
                validation: {
                    gnucobol: null,
                    syntax: true,
                    errors: [],
                    warnings: []
                },
                metrics: {
                    mccabe: 1,  // Base complexity
                    cognitive: 0,
                    halstead: null,
                    maintainability: 0
                },
                dependencies: {
                    calls: [],
                    copies: [],
                    performs: []
                },
                dataElements: {
                    files: [],
                    workingStorage: [],
                    dataItems: []
                },
                sql: {
                    hasSQL: false,
                    statements: []
                },
                cics: {
                    hasCICS: false,
                    commands: []
                }
            };
            
            // 3. Validate with GnuCOBOL if enabled
            if (this.config.validateWithGnuCOBOL) {
                ast.validation.gnucobol = await this.validateWithGnuCOBOL(filePath);
                if (!ast.validation.gnucobol.success) {
                    ast.validation.syntax = false;
                    ast.validation.errors.push(...ast.validation.gnucobol.errors);
                }
            }
            
            // 4. Parse structure and content
            this.parseStructure(content, lines, ast);
            this.parseDependencies(content, lines, ast);
            this.parseDataElements(content, lines, ast);
            this.parseEmbeddedCode(content, lines, ast);
            
            // 5. Calculate metrics - ONLY HERE, NOWHERE ELSE
            this.calculateMetrics(content, lines, ast);
            
            // 6. Count line types
            this.countLineTypes(lines, ast);
            
            // 7. Calculate parse confidence
            ast.parseConfidence = this.calculateConfidence(ast);
            
            // 8. Final validation
            this.validateAST(ast);
            
            ast.parseTime = Date.now() - startTime;
            this.stats.successfulParses++;
            
            return ast;
            
        } catch (error) {
            this.stats.failedParses++;
            throw new Error(`Failed to parse ${filePath}: ${error.message}`);
        }
    }

    /**
     * Parse program structure
     */
    parseStructure(content, lines, ast) {
        // Extract program ID
        const programIdMatch = content.match(this.patterns.programId);
        if (programIdMatch) {
            ast.programId = programIdMatch[1];
        }
        
        // Check divisions
        for (const [division, pattern] of Object.entries(this.patterns.divisions)) {
            if (pattern.test(content)) {
                ast.divisions[division] = true;
            }
        }
    }

    /**
     * Parse dependencies - calls, copies, performs
     */
    parseDependencies(content, lines, ast) {
        // Extract CALL statements
        let match;
        const callPattern = new RegExp(this.patterns.dependencies.call);
        while ((match = callPattern.exec(content)) !== null) {
            ast.dependencies.calls.push({
                target: match[1],
                line: this.getLineNumber(content, match.index)
            });
        }
        
        // Extract COPY statements
        const copyPattern = new RegExp(this.patterns.dependencies.copy);
        while ((match = copyPattern.exec(content)) !== null) {
            ast.dependencies.copies.push({
                name: match[1],
                line: this.getLineNumber(content, match.index)
            });
        }
        
        // Extract PERFORM targets
        const performPattern = new RegExp(this.patterns.dependencies.perform);
        while ((match = performPattern.exec(content)) !== null) {
            ast.dependencies.performs.push({
                target: match[1],
                line: this.getLineNumber(content, match.index)
            });
        }
    }

    /**
     * Parse data elements
     */
    parseDataElements(content, lines, ast) {
        // Extract file definitions
        let match;
        const fdPattern = new RegExp(this.patterns.data.fd, 'gim');
        while ((match = fdPattern.exec(content)) !== null) {
            ast.dataElements.files.push({
                name: match[1],
                line: this.getLineNumber(content, match.index)
            });
        }
        
        // Check for working storage section
        if (this.patterns.data.workingStorage.test(content)) {
            ast.dataElements.workingStorage.push({
                found: true,
                line: this.getLineNumber(content, content.search(this.patterns.data.workingStorage))
            });
        }
    }

    /**
     * Parse embedded SQL and CICS
     */
    parseEmbeddedCode(content, lines, ast) {
        // Extract SQL statements
        let match;
        const sqlPattern = new RegExp(this.patterns.embedded.sql);
        while ((match = sqlPattern.exec(content)) !== null) {
            ast.sql.hasSQL = true;
            ast.sql.statements.push({
                content: match[1].substring(0, 100) + '...',
                line: this.getLineNumber(content, match.index)
            });
        }
        
        // Extract CICS commands
        const cicsPattern = new RegExp(this.patterns.embedded.cics);
        while ((match = cicsPattern.exec(content)) !== null) {
            ast.cics.hasCICS = true;
            ast.cics.commands.push({
                content: match[1].substring(0, 100) + '...',
                line: this.getLineNumber(content, match.index)
            });
        }
    }

    /**
     * Calculate all metrics - SINGLE SOURCE OF TRUTH
     * This is the ONLY place where metrics are calculated
     */
    calculateMetrics(content, lines, ast) {
        // Reset to base complexity
        ast.metrics.mccabe = 1;
        ast.metrics.cognitive = 0;
        
        // Count decision points for McCabe complexity
        lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            
            // IF statements
            if (this.patterns.complexity.if.test(trimmedLine)) {
                ast.metrics.mccabe++;
                ast.metrics.cognitive++;
            }
            
            // EVALUATE statements
            if (this.patterns.complexity.evaluate.test(trimmedLine)) {
                ast.metrics.mccabe++;
                ast.metrics.cognitive += 2; // EVALUATE is more complex
            }
            
            // WHEN clauses (each is a branch)
            if (this.patterns.complexity.when.test(trimmedLine)) {
                ast.metrics.mccabe++;
                ast.metrics.cognitive++;
            }
            
            // PERFORM statements
            if (this.patterns.complexity.perform.test(trimmedLine)) {
                // Check for loops
                if (this.patterns.complexity.until.test(line) ||
                    this.patterns.complexity.varying.test(line) ||
                    this.patterns.complexity.times.test(line)) {
                    ast.metrics.mccabe++;
                    ast.metrics.cognitive += 2; // Loops are more complex
                }
            }
            
            // CALL statements
            if (this.patterns.complexity.call.test(trimmedLine)) {
                ast.metrics.mccabe++;
            }
            
            // GO TO statements (high complexity penalty)
            if (this.patterns.complexity.goto.test(trimmedLine)) {
                ast.metrics.mccabe++;
                ast.metrics.cognitive += 5; // GOTO is very complex
            }
        });
        
        // Calculate Halstead metrics
        ast.metrics.halstead = this.calculateHalstead(content);
        
        // Calculate maintainability index
        ast.metrics.maintainability = this.calculateMaintainability(ast);
    }

    /**
     * Calculate Halstead metrics
     */
    calculateHalstead(content) {
        const operators = new Set();
        const operands = new Set();
        let totalOperators = 0;
        let totalOperands = 0;
        
        // COBOL operators
        const operatorKeywords = [
            'ADD', 'SUBTRACT', 'MULTIPLY', 'DIVIDE', 'COMPUTE',
            'MOVE', 'IF', 'ELSE', 'WHEN', 'PERFORM', 'CALL',
            'EVALUATE', 'GO TO', 'STOP', 'EXIT', 'RETURN'
        ];
        
        // Count operators
        operatorKeywords.forEach(op => {
            const regex = new RegExp(`\\b${op}\\b`, 'gi');
            const matches = content.match(regex) || [];
            if (matches.length > 0) {
                operators.add(op);
                totalOperators += matches.length;
            }
        });
        
        // Count operands (simplified - identifiers and literals)
        const identifierRegex = /\b[A-Z][A-Z0-9-]*\b/g;
        const identifiers = content.match(identifierRegex) || [];
        identifiers.forEach(id => {
            if (!operatorKeywords.includes(id.toUpperCase())) {
                operands.add(id);
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
        const difficulty = (n1 / 2) * (N2 / (n2 || 1));
        const effort = difficulty * volume;
        
        return {
            uniqueOperators: n1,
            uniqueOperands: n2,
            totalOperators: N1,
            totalOperands: N2,
            vocabulary,
            length,
            volume: Math.round(volume),
            difficulty: Math.round(difficulty * 100) / 100,
            effort: Math.round(effort),
            timeToProgram: Math.round(effort / 18), // seconds
            deliveredBugs: Math.round(volume / 3000 * 1000) / 1000
        };
    }

    /**
     * Calculate maintainability index
     */
    calculateMaintainability(ast) {
        // Microsoft's Maintainability Index formula
        const volume = ast.metrics.halstead.volume || 1;
        const complexity = ast.metrics.mccabe || 1;
        const loc = ast.lines.code || 1;
        
        // MI = 171 - 5.2 * ln(V) - 0.23 * CC - 16.2 * ln(LOC)
        let mi = 171 - 5.2 * Math.log(volume) - 0.23 * complexity - 16.2 * Math.log(loc);
        
        // Normalize to 0-100
        mi = Math.max(0, Math.min(100, mi * 100 / 171));
        
        return Math.round(mi);
    }

    /**
     * Count line types
     */
    countLineTypes(lines, ast) {
        lines.forEach(line => {
            const trimmed = line.trim();
            
            if (trimmed === '') {
                ast.lines.blank++;
            } else if (trimmed.startsWith('*') || trimmed.startsWith('*>')) {
                ast.lines.comment++;
            } else {
                ast.lines.code++;
            }
        });
    }

    /**
     * Validate with GnuCOBOL
     */
    async validateWithGnuCOBOL(filePath) {
        try {
            const includes = this.config.includePaths.map(p => `-I ${p}`).join(' ');
            const command = `${this.config.gnucobolPath} -fsyntax-only ${includes} "${filePath}" 2>&1`;
            
            const output = execSync(command, { encoding: 'utf8' });
            
            return {
                success: true,
                output: output,
                errors: [],
                warnings: []
            };
        } catch (error) {
            const output = error.stdout || error.message;
            const errors = output.split('\n')
                .filter(line => line.includes('error:'))
                .map(line => line.trim());
            const warnings = output.split('\n')
                .filter(line => line.includes('warning:'))
                .map(line => line.trim());
                
            return {
                success: false,
                output: output,
                errors,
                warnings
            };
        }
    }

    /**
     * Calculate parse confidence based on what was successfully extracted
     */
    calculateConfidence(ast) {
        let score = 0;
        let checks = 0;
        
        // Check program ID
        checks++;
        if (ast.programId) score++;
        
        // Check divisions
        checks++;
        const divisionsFound = Object.values(ast.divisions).filter(v => v).length;
        if (divisionsFound >= 3) score++;
        
        // Check validation
        checks++;
        if (ast.validation.syntax) score++;
        
        // Check metrics
        checks++;
        if (ast.metrics.mccabe > 1) score++;
        
        // Check dependencies
        checks++;
        if (ast.dependencies.calls.length > 0 || 
            ast.dependencies.copies.length > 0) score++;
        
        return score / checks;
    }

    /**
     * Validate AST for consistency
     */
    validateAST(ast) {
        const validationErrors = [];
        
        // Ensure metrics are within reasonable bounds
        if (ast.metrics.mccabe < 1) {
            validationErrors.push('McCabe complexity cannot be less than 1');
        }
        
        if (ast.metrics.mccabe > 1000) {
            validationErrors.push('McCabe complexity seems unreasonably high');
        }
        
        // Ensure line counts add up
        const totalCounted = ast.lines.code + ast.lines.comment + ast.lines.blank;
        if (Math.abs(totalCounted - ast.lines.total) > 1) {
            validationErrors.push('Line counts do not add up correctly');
        }
        
        if (validationErrors.length > 0) {
            ast.validation.errors.push(...validationErrors);
            ast.validation.syntax = false;
        }
        
        return validationErrors.length === 0;
    }

    /**
     * Get line number for a given position in content
     */
    getLineNumber(content, position) {
        return content.substring(0, position).split('\n').length;
    }

    /**
     * Calculate hash of content for change detection
     */
    calculateHash(content) {
        return crypto.createHash('sha256').update(content).digest('hex');
    }

    /**
     * Get parsing statistics
     */
    getStats() {
        const duration = Date.now() - this.stats.startTime;
        return {
            ...this.stats,
            duration,
            successRate: this.stats.totalFiles > 0 
                ? (this.stats.successfulParses / this.stats.totalFiles) * 100 
                : 0,
            avgLinesPerFile: this.stats.totalFiles > 0
                ? Math.round(this.stats.totalLines / this.stats.totalFiles)
                : 0
        };
    }
}

module.exports = SingleCOBOLParser;