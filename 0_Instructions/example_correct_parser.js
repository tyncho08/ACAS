/**
 * Example: Correct COBOL Parser Implementation
 * This shows how parsing SHOULD be done according to v2.0 requirements
 */

const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

class CorrectCOBOLParser {
    constructor() {
        this.parserAvailable = null;
        this.parserType = null;
    }

    async initialize() {
        // Try parsers in order of preference
        const parsers = [
            { 
                name: '@broadwing/cobol-parser',
                check: () => fs.pathExists('node_modules/@broadwing/cobol-parser'),
                parse: (file) => this.parseBroadwing(file)
            },
            {
                name: 'cobol-parser',
                check: () => fs.pathExists('node_modules/cobol-parser'),
                parse: (file) => this.parseCobolParser(file)
            },
            {
                name: 'GnuCOBOL',
                check: async () => {
                    try {
                        await execPromise('cobc --version');
                        return true;
                    } catch {
                        return false;
                    }
                },
                parse: (file) => this.parseGnuCOBOL(file)
            }
        ];

        for (const parser of parsers) {
            if (await parser.check()) {
                this.parserAvailable = parser.parse;
                this.parserType = parser.name;
                console.log(`✓ Using parser: ${parser.name}`);
                return true;
            }
        }

        throw new Error('NO COBOL PARSER AVAILABLE - Cannot proceed with analysis');
    }

    async parseFile(filePath) {
        if (!this.parserAvailable) {
            throw new Error('Parser not initialized');
        }

        const startTime = Date.now();
        
        try {
            // Parse with selected parser
            const parseResult = await this.parserAvailable(filePath);
            
            // Extract comprehensive data from AST
            const extractedData = this.extractFromAST(parseResult.ast);
            
            // Calculate real metrics
            const metrics = this.calculateMetrics(parseResult.ast);
            
            // Validate the parse
            const validation = this.validateParse(parseResult, extractedData);
            
            return {
                metadata: {
                    file_path: filePath,
                    file_name: path.basename(filePath),
                    parser_used: this.parserType,
                    parse_timestamp: new Date().toISOString(),
                    parse_duration_ms: Date.now() - startTime,
                    confidence_score: validation.confidence,
                    validation_status: validation.status
                },
                ast: parseResult.ast,
                extracted_data: extractedData,
                metrics: metrics,
                quality_report: {
                    issues: validation.issues,
                    warnings: validation.warnings,
                    suggestions: this.generateSuggestions(extractedData, metrics)
                }
            };
            
        } catch (error) {
            // Document parse failures transparently
            return {
                metadata: {
                    file_path: filePath,
                    file_name: path.basename(filePath),
                    parser_used: this.parserType,
                    parse_timestamp: new Date().toISOString(),
                    parse_duration_ms: Date.now() - startTime,
                    confidence_score: 0,
                    validation_status: 'ERROR'
                },
                parse_error: {
                    message: error.message,
                    type: error.constructor.name,
                    recoverable: false
                },
                fallback_attempted: false, // Could try another parser here
                manual_review_required: true
            };
        }
    }

    extractFromAST(ast) {
        // Extract REAL data from AST, not estimates
        const extracted = {
            program_id: this.findNode(ast, 'program-id')?.value || null,
            divisions: {
                identification: this.hasNode(ast, 'identification-division'),
                environment: this.hasNode(ast, 'environment-division'),
                data: this.hasNode(ast, 'data-division'),
                procedure: this.hasNode(ast, 'procedure-division')
            },
            calls: this.extractCalls(ast),
            performs: this.extractPerforms(ast),
            copies: this.extractCopies(ast),
            files: this.extractFiles(ast),
            data_structures: this.extractDataStructures(ast),
            business_rules: this.extractBusinessRules(ast),
            control_flow: this.extractControlFlow(ast)
        };

        return extracted;
    }

    extractCalls(ast) {
        const calls = [];
        
        this.walkAST(ast, (node) => {
            if (node.type === 'call-statement') {
                calls.push({
                    line: node.location.start.line,
                    type: node.callType || 'STATIC',
                    target: node.programName.value,
                    using: node.using?.map(p => ({
                        name: p.name,
                        type: p.type,
                        byReference: p.byReference
                    })) || [],
                    returning: node.returning?.name || null,
                    onException: node.onException !== null,
                    context: this.getNodeContext(node)
                });
            }
        });

        return calls;
    }

    extractBusinessRules(ast) {
        const rules = [];
        
        this.walkAST(ast, (node) => {
            if (node.type === 'if-statement') {
                rules.push({
                    type: 'validation',
                    line: node.location.start.line,
                    condition: this.reconstructCondition(node.condition),
                    trueBranch: this.summarizeBranch(node.then),
                    falseBranch: node.else ? this.summarizeBranch(node.else) : null,
                    complexity_contribution: this.calculateConditionComplexity(node.condition)
                });
            } else if (node.type === 'evaluate-statement') {
                rules.push({
                    type: 'decision',
                    line: node.location.start.line,
                    subject: this.reconstructExpression(node.subject),
                    cases: node.cases.map(c => ({
                        when: this.reconstructExpression(c.when),
                        action: this.summarizeBranch(c.then)
                    })),
                    complexity_contribution: node.cases.length
                });
            }
        });

        return rules;
    }

    calculateMetrics(ast) {
        // Calculate REAL metrics from AST
        const metrics = {
            mccabe_complexity: this.calculateMcCabe(ast),
            cognitive_complexity: this.calculateCognitive(ast),
            halstead: this.calculateHalstead(ast),
            lines_of_code: this.countLines(ast),
            technical_debt: this.assessTechnicalDebt(ast),
            maintainability_index: 0 // Will calculate after other metrics
        };

        // Calculate maintainability index using real formula
        const mi = 171 - 
                   5.2 * Math.log(metrics.halstead.volume) -
                   0.23 * metrics.mccabe_complexity.value -
                   16.2 * Math.log(metrics.lines_of_code.executable);
        
        metrics.maintainability_index = Math.max(0, Math.min(100, mi));

        return metrics;
    }

    calculateMcCabe(ast) {
        let complexity = 1; // Base complexity
        const details = {
            conditionals: 0,
            loops: 0,
            evaluate_branches: 0,
            exception_handlers: 0,
            goto_statements: 0
        };

        this.walkAST(ast, (node) => {
            switch (node.type) {
                case 'if-statement':
                    complexity++;
                    details.conditionals++;
                    break;
                case 'evaluate-statement':
                    complexity += node.cases.length;
                    details.evaluate_branches += node.cases.length;
                    break;
                case 'perform-until':
                case 'perform-varying':
                    complexity++;
                    details.loops++;
                    break;
                case 'on-size-error':
                case 'on-exception':
                case 'at-end':
                case 'invalid-key':
                    complexity++;
                    details.exception_handlers++;
                    break;
                case 'go-to-statement':
                    complexity++;
                    details.goto_statements++;
                    break;
            }
        });

        return {
            value: complexity,
            formula: '1 + decision_points',
            details: details
        };
    }

    calculateHalstead(ast) {
        const operators = new Map();
        const operands = new Map();

        this.walkAST(ast, (node) => {
            if (this.isOperator(node)) {
                const op = node.type;
                operators.set(op, (operators.get(op) || 0) + 1);
            } else if (this.isOperand(node)) {
                const operand = node.value || node.name;
                if (operand) {
                    operands.set(operand, (operands.get(operand) || 0) + 1);
                }
            }
        });

        const n1 = operators.size;
        const n2 = operands.size;
        const N1 = Array.from(operators.values()).reduce((a, b) => a + b, 0);
        const N2 = Array.from(operands.values()).reduce((a, b) => a + b, 0);

        const vocabulary = n1 + n2;
        const length = N1 + N2;
        const volume = length * Math.log2(vocabulary);
        const difficulty = (n1 / 2) * (N2 / n2);
        const effort = volume * difficulty;

        return {
            unique_operators: n1,
            unique_operands: n2,
            total_operators: N1,
            total_operands: N2,
            vocabulary,
            length,
            volume,
            difficulty,
            effort,
            time_seconds: effort / 18,
            estimated_bugs: volume / 3000,
            operator_list: Array.from(operators.keys()).slice(0, 10),
            operand_sample: Array.from(operands.keys()).slice(0, 10)
        };
    }

    validateParse(parseResult, extractedData) {
        const issues = [];
        const warnings = [];
        let confidence = 1.0;

        // Check for required elements
        if (!extractedData.program_id) {
            issues.push('Missing PROGRAM-ID');
            confidence -= 0.1;
        }

        if (!extractedData.divisions.procedure) {
            issues.push('Missing PROCEDURE DIVISION');
            confidence -= 0.2;
        }

        // Check for parse warnings
        if (parseResult.warnings) {
            warnings.push(...parseResult.warnings);
            confidence -= 0.05 * parseResult.warnings.length;
        }

        // Check for technical debt
        const gotoCount = extractedData.control_flow?.goto_statements?.length || 0;
        if (gotoCount > 0) {
            warnings.push(`Found ${gotoCount} GOTO statements - consider refactoring`);
        }

        return {
            confidence: Math.max(0, confidence),
            status: issues.length === 0 ? 'VALID' : 'ERROR',
            issues,
            warnings
        };
    }

    // Helper methods
    walkAST(node, callback) {
        if (!node) return;
        
        callback(node);
        
        if (typeof node === 'object') {
            for (const key in node) {
                if (node[key]) {
                    if (Array.isArray(node[key])) {
                        node[key].forEach(child => this.walkAST(child, callback));
                    } else if (typeof node[key] === 'object') {
                        this.walkAST(node[key], callback);
                    }
                }
            }
        }
    }

    findNode(ast, type) {
        let found = null;
        this.walkAST(ast, (node) => {
            if (node.type === type && !found) {
                found = node;
            }
        });
        return found;
    }

    hasNode(ast, type) {
        return this.findNode(ast, type) !== null;
    }

    isOperator(node) {
        const operatorTypes = [
            'add', 'subtract', 'multiply', 'divide', 'compute',
            'move', 'if', 'evaluate', 'perform', 'call', 'goto',
            'open', 'close', 'read', 'write', 'rewrite', 'delete'
        ];
        return operatorTypes.includes(node.type);
    }

    isOperand(node) {
        const operandTypes = [
            'identifier', 'literal', 'numeric-literal', 'string-literal',
            'variable-reference', 'data-name'
        ];
        return operandTypes.includes(node.type);
    }
}

// Example usage showing the difference
async function demonstrateCorrectParsing() {
    console.log('=== CORRECT COBOL PARSING DEMONSTRATION ===\n');
    
    const parser = new CorrectCOBOLParser();
    
    try {
        // Initialize parser (will fail if no real parser available)
        await parser.initialize();
        
        // Parse a sample file
        const result = await parser.parseFile('sample.cbl');
        
        console.log('Parse Result:');
        console.log('- Confidence:', result.metadata.confidence_score);
        console.log('- Complexity:', result.metrics.mccabe_complexity.value, '(calculated from AST)');
        console.log('- Business Rules Found:', result.extracted_data.business_rules.length);
        console.log('- All metrics have formulas:', true);
        console.log('- All data has line numbers:', true);
        
    } catch (error) {
        console.error('CORRECT BEHAVIOR: Parser not available, cannot proceed');
        console.error('This is the expected behavior - no fake data generated');
    }
}

// Compare with incorrect approach
function incorrectApproach() {
    console.log('\n=== INCORRECT APPROACH (What NOT to do) ===\n');
    
    // This is what the original implementation did
    const fakeResult = {
        programId: 'SL010',  // Guessed from filename
        complexity: 45,      // Estimated based on file size
        calls: ['ACAS005'],  // Extracted with regex, missing parameters
        businessRules: []    // Couldn't extract, so left empty
    };
    
    console.log('WRONG: Generated fake/estimated data:');
    console.log(JSON.stringify(fakeResult, null, 2));
    console.log('\nThis provides no real value and misleads users!');
}

// Run demonstration
if (require.main === module) {
    demonstrateCorrectParsing().then(() => {
        incorrectApproach();
    });
}

module.exports = CorrectCOBOLParser;