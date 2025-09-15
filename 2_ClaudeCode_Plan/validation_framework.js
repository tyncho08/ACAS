const crypto = require('crypto');

/**
 * Validation Framework - Ensures consistency and accuracy
 * 
 * This framework validates data at every step to prevent
 * the kind of inconsistencies we encountered in the ACAS analysis.
 */
class ValidationFramework {
    constructor(config = {}) {
        this.config = {
            strictMode: config.strictMode !== false,
            logValidationFailures: config.logValidationFailures !== false,
            ...config
        };
        
        this.validationLog = [];
        this.checkpoints = new Map();
    }

    /**
     * Create a validation checkpoint
     */
    async createCheckpoint(name, data) {
        const checkpoint = {
            name,
            timestamp: new Date().toISOString(),
            dataHash: this.calculateHash(data),
            dataSnapshot: this.config.strictMode ? JSON.parse(JSON.stringify(data)) : null
        };
        
        this.checkpoints.set(name, checkpoint);
        
        return checkpoint;
    }

    /**
     * Validate against a checkpoint
     */
    async validateCheckpoint(name, currentData) {
        const checkpoint = this.checkpoints.get(name);
        if (!checkpoint) {
            throw new Error(`No checkpoint found: ${name}`);
        }
        
        const currentHash = this.calculateHash(currentData);
        const isValid = currentHash === checkpoint.dataHash;
        
        const validation = {
            checkpoint: name,
            timestamp: new Date().toISOString(),
            valid: isValid,
            originalHash: checkpoint.dataHash,
            currentHash,
            drift: null
        };
        
        if (!isValid && checkpoint.dataSnapshot) {
            validation.drift = this.calculateDrift(checkpoint.dataSnapshot, currentData);
        }
        
        this.logValidation(validation);
        
        return validation;
    }

    /**
     * Validate AST consistency
     */
    validateAST(ast) {
        const validations = [];
        
        // 1. Structural validation
        validations.push(this.validateStructure(ast));
        
        // 2. Metric validation
        validations.push(this.validateMetrics(ast));
        
        // 3. Dependency validation
        validations.push(this.validateDependencies(ast));
        
        // 4. Cross-reference validation
        validations.push(this.validateCrossReferences(ast));
        
        const allValid = validations.every(v => v.valid);
        const errors = validations.flatMap(v => v.errors || []);
        
        return {
            valid: allValid,
            validations,
            errors,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Validate AST structure
     */
    validateStructure(ast) {
        const errors = [];
        const requiredFields = [
            'filePath', 'fileName', 'fileHash', 'timestamp',
            'lines', 'programId', 'divisions', 'metrics',
            'dependencies', 'validation'
        ];
        
        // Check required fields
        requiredFields.forEach(field => {
            if (!ast.hasOwnProperty(field)) {
                errors.push(`Missing required field: ${field}`);
            }
        });
        
        // Validate line counts
        if (ast.lines) {
            const totalCounted = (ast.lines.code || 0) + 
                               (ast.lines.comment || 0) + 
                               (ast.lines.blank || 0);
            
            if (Math.abs(totalCounted - ast.lines.total) > 1) {
                errors.push(`Line count mismatch: counted=${totalCounted}, total=${ast.lines.total}`);
            }
        }
        
        // Validate divisions
        if (ast.divisions) {
            const validDivisions = ['identification', 'environment', 'data', 'procedure'];
            Object.keys(ast.divisions).forEach(div => {
                if (!validDivisions.includes(div)) {
                    errors.push(`Invalid division: ${div}`);
                }
            });
        }
        
        return {
            type: 'structure',
            valid: errors.length === 0,
            errors
        };
    }

    /**
     * Validate metrics are reasonable
     */
    validateMetrics(ast) {
        const errors = [];
        
        if (!ast.metrics) {
            errors.push('Missing metrics object');
            return { type: 'metrics', valid: false, errors };
        }
        
        // McCabe complexity validation
        if (typeof ast.metrics.mccabe !== 'number') {
            errors.push('McCabe complexity must be a number');
        } else {
            if (ast.metrics.mccabe < 1) {
                errors.push(`McCabe complexity cannot be less than 1: ${ast.metrics.mccabe}`);
            }
            if (ast.metrics.mccabe > 1000) {
                errors.push(`McCabe complexity unreasonably high: ${ast.metrics.mccabe}`);
            }
        }
        
        // Cognitive complexity validation
        if (typeof ast.metrics.cognitive !== 'number') {
            errors.push('Cognitive complexity must be a number');
        } else {
            if (ast.metrics.cognitive < 0) {
                errors.push(`Cognitive complexity cannot be negative: ${ast.metrics.cognitive}`);
            }
            if (ast.metrics.cognitive > ast.metrics.mccabe * 10) {
                errors.push(`Cognitive complexity seems too high relative to McCabe`);
            }
        }
        
        // Halstead validation
        if (ast.metrics.halstead) {
            const h = ast.metrics.halstead;
            if (h.vocabulary < (h.uniqueOperators + h.uniqueOperands)) {
                errors.push('Halstead vocabulary calculation error');
            }
            if (h.length < (h.totalOperators + h.totalOperands)) {
                errors.push('Halstead length calculation error');
            }
        }
        
        return {
            type: 'metrics',
            valid: errors.length === 0,
            errors
        };
    }

    /**
     * Validate dependencies
     */
    validateDependencies(ast) {
        const errors = [];
        
        if (!ast.dependencies) {
            errors.push('Missing dependencies object');
            return { type: 'dependencies', valid: false, errors };
        }
        
        // Validate calls
        if (ast.dependencies.calls) {
            ast.dependencies.calls.forEach((call, index) => {
                if (!call.target) {
                    errors.push(`Call ${index} missing target`);
                }
                if (typeof call.line !== 'number' || call.line < 1) {
                    errors.push(`Call ${index} has invalid line number`);
                }
            });
        }
        
        // Validate copies
        if (ast.dependencies.copies) {
            ast.dependencies.copies.forEach((copy, index) => {
                if (!copy.name) {
                    errors.push(`Copy ${index} missing name`);
                }
                if (typeof copy.line !== 'number' || copy.line < 1) {
                    errors.push(`Copy ${index} has invalid line number`);
                }
            });
        }
        
        return {
            type: 'dependencies',
            valid: errors.length === 0,
            errors
        };
    }

    /**
     * Validate cross-references
     */
    validateCrossReferences(ast) {
        const errors = [];
        
        // Check that line numbers don't exceed total lines
        const maxLine = ast.lines?.total || 0;
        
        const checkLineNumber = (item, type) => {
            if (item.line && item.line > maxLine) {
                errors.push(`${type} line number ${item.line} exceeds total lines ${maxLine}`);
            }
        };
        
        // Check all line references
        ast.dependencies?.calls?.forEach(call => checkLineNumber(call, 'Call'));
        ast.dependencies?.copies?.forEach(copy => checkLineNumber(copy, 'Copy'));
        ast.dependencies?.performs?.forEach(perf => checkLineNumber(perf, 'Perform'));
        ast.sql?.statements?.forEach(stmt => checkLineNumber(stmt, 'SQL'));
        
        return {
            type: 'cross-references',
            valid: errors.length === 0,
            errors
        };
    }

    /**
     * Validate consistency between two AST objects
     */
    validateConsistency(ast1, ast2) {
        const errors = [];
        
        // Files should have same hash if unchanged
        if (ast1.fileHash !== ast2.fileHash) {
            return {
                valid: true, // File changed, so differences expected
                message: 'File content changed'
            };
        }
        
        // If file unchanged, metrics should be identical
        if (ast1.metrics.mccabe !== ast2.metrics.mccabe) {
            errors.push(`McCabe complexity changed: ${ast1.metrics.mccabe} → ${ast2.metrics.mccabe}`);
        }
        
        if (ast1.metrics.cognitive !== ast2.metrics.cognitive) {
            errors.push(`Cognitive complexity changed: ${ast1.metrics.cognitive} → ${ast2.metrics.cognitive}`);
        }
        
        // Check dependency counts
        if (ast1.dependencies.calls.length !== ast2.dependencies.calls.length) {
            errors.push(`Call count changed: ${ast1.dependencies.calls.length} → ${ast2.dependencies.calls.length}`);
        }
        
        return {
            valid: errors.length === 0,
            errors,
            fileUnchanged: true
        };
    }

    /**
     * Validate analysis results
     */
    validateAnalysisResults(results) {
        const validations = [];
        
        // Check overall statistics
        if (results.statistics) {
            const stats = results.statistics;
            
            if (stats.totalFiles !== stats.successfulParses + stats.failedParses) {
                validations.push({
                    type: 'statistics',
                    valid: false,
                    error: 'File count mismatch in statistics'
                });
            }
            
            if (stats.avgComplexity < 1) {
                validations.push({
                    type: 'statistics', 
                    valid: false,
                    error: 'Average complexity cannot be less than 1'
                });
            }
        }
        
        // Check individual program results
        if (results.programs) {
            const programIds = new Set();
            results.programs.forEach(prog => {
                // Check for duplicate program IDs
                if (programIds.has(prog.programId)) {
                    validations.push({
                        type: 'duplicate',
                        valid: false,
                        error: `Duplicate program ID: ${prog.programId}`
                    });
                }
                programIds.add(prog.programId);
                
                // Validate each program's AST
                const astValidation = this.validateAST(prog);
                if (!astValidation.valid) {
                    validations.push({
                        type: 'program',
                        valid: false,
                        programId: prog.programId,
                        errors: astValidation.errors
                    });
                }
            });
        }
        
        return {
            valid: validations.filter(v => !v.valid).length === 0,
            validations,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Calculate data drift between two objects
     */
    calculateDrift(original, current) {
        const drift = {
            added: [],
            removed: [],
            changed: []
        };
        
        const compareObjects = (path, obj1, obj2) => {
            // Check for added/removed keys
            const keys1 = Object.keys(obj1 || {});
            const keys2 = Object.keys(obj2 || {});
            
            keys2.forEach(key => {
                if (!keys1.includes(key)) {
                    drift.added.push(`${path}.${key}`);
                }
            });
            
            keys1.forEach(key => {
                if (!keys2.includes(key)) {
                    drift.removed.push(`${path}.${key}`);
                } else if (typeof obj1[key] !== typeof obj2[key]) {
                    drift.changed.push({
                        path: `${path}.${key}`,
                        oldType: typeof obj1[key],
                        newType: typeof obj2[key]
                    });
                } else if (typeof obj1[key] === 'object' && obj1[key] !== null) {
                    compareObjects(`${path}.${key}`, obj1[key], obj2[key]);
                } else if (obj1[key] !== obj2[key]) {
                    drift.changed.push({
                        path: `${path}.${key}`,
                        oldValue: obj1[key],
                        newValue: obj2[key]
                    });
                }
            });
        };
        
        compareObjects('', original, current);
        
        return drift;
    }

    /**
     * Calculate hash for data integrity
     */
    calculateHash(data) {
        const content = JSON.stringify(data, Object.keys(data).sort());
        return crypto.createHash('sha256').update(content).digest('hex');
    }

    /**
     * Log validation result
     */
    logValidation(validation) {
        this.validationLog.push(validation);
        
        if (this.config.logValidationFailures && !validation.valid) {
            console.error('Validation failed:', validation);
        }
    }

    /**
     * Get validation summary
     */
    getValidationSummary() {
        const total = this.validationLog.length;
        const failed = this.validationLog.filter(v => !v.valid).length;
        const passed = total - failed;
        
        return {
            total,
            passed,
            failed,
            successRate: total > 0 ? (passed / total) * 100 : 100,
            checkpoints: this.checkpoints.size,
            log: this.validationLog
        };
    }

    /**
     * Clear validation log
     */
    clearLog() {
        this.validationLog = [];
    }

    /**
     * Clear checkpoints
     */
    clearCheckpoints() {
        this.checkpoints.clear();
    }
}

module.exports = ValidationFramework;