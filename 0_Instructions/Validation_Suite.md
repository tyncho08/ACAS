# Validation Suite: Automated Quality Assurance

## Overview

This validation suite ensures that all analysis is evidence-based and meets quality standards. Every validation must pass before marking a phase complete.

## Setup Validation Script

```javascript
// validation_suite.js
const fs = require('fs-extra');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class ValidationSuite {
    constructor(projectPath) {
        this.projectPath = projectPath;
        this.dbPath = path.join(projectPath, '1_Output/parser_analysis/database.sqlite');
        this.results = {
            timestamp: new Date().toISOString(),
            phases: {},
            overall: { passed: 0, failed: 0, warnings: 0 }
        };
    }

    async runComplete() {
        console.log('Starting ACAS Analysis Validation Suite...\n');
        
        // Pre-phase validation
        await this.validateSetup();
        
        // Phase validations
        await this.validatePhase1();
        await this.validatePhase2();
        await this.validatePhase3();
        
        // Cross-phase validation
        await this.validateCrossPhase();
        
        // Generate report
        await this.generateReport();
        
        return this.results.overall.failed === 0;
    }
}
```

## Phase 1 Validations

```javascript
async validatePhase1() {
    const phase1 = {
        name: 'Phase 1: Structural Analysis',
        validations: []
    };

    // 1.1 Check parser installation
    phase1.validations.push(await this.checkParserInstalled());
    
    // 1.2 Validate file discovery
    phase1.validations.push(await this.validateFileDiscovery());
    
    // 1.3 Check parse success rate
    phase1.validations.push(await this.validateParseRate());
    
    // 1.4 Verify AST completeness
    phase1.validations.push(await this.validateASTCompleteness());
    
    // 1.5 Check metrics calculation
    phase1.validations.push(await this.validateMetricsFromAST());
    
    // 1.6 Validate dependencies
    phase1.validations.push(await this.validateDependencyMapping());
    
    this.results.phases.phase1 = phase1;
}

async checkParserInstalled() {
    try {
        // Check for real parser
        const hasParser = await fs.pathExists('node_modules/@broadwing/cobol-parser') ||
                         await fs.pathExists('node_modules/cobol-parser');
        
        // Check for GnuCOBOL as fallback
        const hasGnuCobol = await this.exec('which cobc').catch(() => false);
        
        return {
            check: 'Parser Installation',
            passed: hasParser || hasGnuCobol,
            details: hasParser ? 'NPM parser found' : hasGnuCobol ? 'GnuCOBOL found' : 'No parser found',
            severity: 'CRITICAL'
        };
    } catch (error) {
        return {
            check: 'Parser Installation',
            passed: false,
            error: error.message,
            severity: 'CRITICAL'
        };
    }
}

async validateParseRate() {
    const db = new sqlite3.Database(this.dbPath);
    
    return new Promise((resolve) => {
        db.all(`
            SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN parse_confidence >= 0.8 THEN 1 ELSE 0 END) as high_confidence,
                SUM(CASE WHEN parse_confidence < 0.5 THEN 1 ELSE 0 END) as failed,
                AVG(parse_confidence) as avg_confidence
            FROM programs
        `, (err, rows) => {
            db.close();
            
            if (err || !rows[0]) {
                resolve({
                    check: 'Parse Success Rate',
                    passed: false,
                    error: err?.message || 'No data found',
                    severity: 'CRITICAL'
                });
                return;
            }
            
            const stats = rows[0];
            const successRate = (stats.high_confidence / stats.total) * 100;
            
            resolve({
                check: 'Parse Success Rate',
                passed: successRate >= 95,
                details: {
                    total_files: stats.total,
                    high_confidence: stats.high_confidence,
                    failed: stats.failed,
                    success_rate: `${successRate.toFixed(1)}%`,
                    avg_confidence: stats.avg_confidence?.toFixed(3) || 'N/A'
                },
                requirement: '≥95% with confidence ≥0.8',
                severity: successRate >= 90 ? 'WARNING' : 'CRITICAL'
            });
        });
    });
}

async validateASTCompleteness() {
    // Check that we have actual AST data, not regex extractions
    const sampleFile = path.join(this.projectPath, '1_Output/parsed-structures/sl010.cbl.json');
    
    try {
        const data = await fs.readJson(sampleFile);
        
        const hasAST = data.ast && Object.keys(data.ast).length > 0;
        const hasNodeCount = data.ast?.nodeCount > 0;
        const hasRealComplexity = data.extracted_data?.complexity?.details;
        
        return {
            check: 'AST Completeness',
            passed: hasAST && hasNodeCount && hasRealComplexity,
            details: {
                has_ast: hasAST,
                node_count: data.ast?.nodeCount || 0,
                has_real_metrics: hasRealComplexity
            },
            requirement: 'Complete AST with node counts',
            severity: 'CRITICAL'
        };
    } catch (error) {
        return {
            check: 'AST Completeness',
            passed: false,
            error: 'Could not verify AST data',
            severity: 'CRITICAL'
        };
    }
}

async validateMetricsFromAST() {
    const db = new sqlite3.Database(this.dbPath);
    
    return new Promise((resolve) => {
        // Check if metrics contain estimation markers
        db.all(`
            SELECT program_id, mccabe_complexity, cognitive_complexity
            FROM programs 
            WHERE mccabe_complexity IS NOT NULL
            LIMIT 10
        `, (err, rows) => {
            db.close();
            
            if (err || rows.length === 0) {
                resolve({
                    check: 'Metrics Calculation',
                    passed: false,
                    error: 'No metrics found',
                    severity: 'CRITICAL'
                });
                return;
            }
            
            // Check for suspicious patterns indicating estimates
            const suspicious = rows.filter(r => 
                r.mccabe_complexity % 10 === 0 || // Round numbers
                r.mccabe_complexity === r.cognitive_complexity // Unlikely to be equal
            );
            
            resolve({
                check: 'Metrics from AST',
                passed: suspicious.length === 0,
                details: {
                    checked: rows.length,
                    suspicious: suspicious.length,
                    sample: rows.slice(0, 3)
                },
                requirement: 'All metrics calculated from AST nodes',
                severity: 'HIGH'
            });
        });
    });
}
```

## Phase 2 Validations

```javascript
async validatePhase2() {
    const phase2 = {
        name: 'Phase 2: Functional Analysis',
        validations: []
    };

    // 2.1 Check subsystem discovery method
    phase2.validations.push(await this.validateSubsystemClustering());
    
    // 2.2 Verify business rules extraction
    phase2.validations.push(await this.validateBusinessRules());
    
    // 2.3 Check documentation evidence
    phase2.validations.push(await this.validateDocumentationEvidence());
    
    // 2.4 Validate visualizations source
    phase2.validations.push(await this.validateVisualizationSource());
    
    this.results.phases.phase2 = phase2;
}

async validateBusinessRules() {
    const db = new sqlite3.Database(this.dbPath);
    
    return new Promise((resolve) => {
        db.all(`
            SELECT COUNT(*) as total,
                   SUM(CASE WHEN line_number IS NOT NULL THEN 1 ELSE 0 END) as with_line_nums,
                   SUM(CASE WHEN condition_text IS NOT NULL THEN 1 ELSE 0 END) as with_conditions
            FROM business_rules
        `, (err, rows) => {
            db.close();
            
            if (err || !rows[0] || rows[0].total === 0) {
                resolve({
                    check: 'Business Rules Extraction',
                    passed: false,
                    error: 'No business rules found in database',
                    severity: 'CRITICAL'
                });
                return;
            }
            
            const stats = rows[0];
            const lineNumPercentage = (stats.with_line_nums / stats.total) * 100;
            
            resolve({
                check: 'Business Rules Extraction',
                passed: lineNumPercentage >= 95,
                details: {
                    total_rules: stats.total,
                    with_line_numbers: stats.with_line_nums,
                    with_conditions: stats.with_conditions,
                    line_coverage: `${lineNumPercentage.toFixed(1)}%`
                },
                requirement: '≥95% rules with line numbers',
                severity: 'HIGH'
            });
        });
    });
}

async validateDocumentationEvidence() {
    const docsPath = path.join(this.projectPath, '1_Output/SUBSYSTEM_DOCUMENTATION');
    const mdFiles = await fs.readdir(docsPath).then(files => files.filter(f => f.endsWith('.md')));
    
    let totalStatements = 0;
    let evidencedStatements = 0;
    let notFoundStatements = 0;
    
    for (const file of mdFiles) {
        const content = await fs.readFile(path.join(docsPath, file), 'utf8');
        
        // Count evidence markers
        const evidenceMatches = content.match(/Evidence:|Source:|lines? \d+|\.cbl/gi) || [];
        const notFoundMatches = content.match(/NOT FOUND IN CODE|No evidence found/gi) || [];
        const statements = content.split('\n').filter(line => 
            line.trim() && !line.startsWith('#') && line.length > 20
        );
        
        totalStatements += statements.length;
        evidencedStatements += evidenceMatches.length;
        notFoundStatements += notFoundMatches.length;
    }
    
    const evidencePercentage = (evidencedStatements / totalStatements) * 100;
    
    return {
        check: 'Documentation Evidence',
        passed: evidencePercentage >= 80 && notFoundStatements < 10,
        details: {
            files_checked: mdFiles.length,
            total_statements: totalStatements,
            evidenced: evidencedStatements,
            not_found: notFoundStatements,
            evidence_rate: `${evidencePercentage.toFixed(1)}%`
        },
        requirement: '≥80% statements with evidence',
        severity: 'HIGH'
    };
}
```

## Phase 3 Validations

```javascript
async validatePhase3() {
    const phase3 = {
        name: 'Phase 3: Metrics and Visualization',
        validations: []
    };

    // 3.1 Verify metrics accuracy
    phase3.validations.push(await this.validateMetricAccuracy());
    
    // 3.2 Check visualization completeness
    phase3.validations.push(await this.validateVisualizationCompleteness());
    
    // 3.3 Validate technical documentation
    phase3.validations.push(await this.validateTechnicalDocs());
    
    // 3.4 Check dashboard functionality
    phase3.validations.push(await this.validateDashboard());
    
    this.results.phases.phase3 = phase3;
}

async validateMetricAccuracy() {
    // Spot check a few programs by recalculating their metrics
    const testPrograms = ['sl010.cbl', 'pl010.cbl', 'gl050.cbl'];
    let accurateCount = 0;
    
    for (const prog of testPrograms) {
        const jsonPath = path.join(this.projectPath, `1_Output/parsed-structures/${prog}.json`);
        try {
            const data = await fs.readJson(jsonPath);
            
            // Check if metrics match expected calculations
            if (data.extracted_data?.complexity?.details) {
                const details = data.extracted_data.complexity.details;
                const calculated = details.conditionals + details.loops + 
                                 details.evaluate_branches + details.exception_handlers + 1;
                const stored = data.extracted_data.complexity.value;
                
                if (Math.abs(calculated - stored) <= 1) { // Allow small rounding difference
                    accurateCount++;
                }
            }
        } catch (error) {
            // File not found or parsing error
        }
    }
    
    return {
        check: 'Metric Accuracy',
        passed: accurateCount === testPrograms.length,
        details: {
            tested: testPrograms.length,
            accurate: accurateCount,
            method: 'Spot check recalculation'
        },
        requirement: '100% accuracy on spot checks',
        severity: 'HIGH'
    };
}
```

## Cross-Phase Validations

```javascript
async validateCrossPhase() {
    const crossPhase = {
        name: 'Cross-Phase Validation',
        validations: []
    };

    // Check consistency between phases
    crossPhase.validations.push(await this.validateProgramCountConsistency());
    crossPhase.validations.push(await this.validateCallGraphCompleteness());
    crossPhase.validations.push(await this.validateDocumentationCoverage());
    
    this.results.phases.crossPhase = crossPhase;
}

async validateProgramCountConsistency() {
    const db = new sqlite3.Database(this.dbPath);
    
    return new Promise(async (resolve) => {
        // Check program count across different outputs
        const dbCount = await new Promise((res) => {
            db.get('SELECT COUNT(*) as count FROM programs', (err, row) => {
                res(row?.count || 0);
            });
        });
        
        const jsonFiles = await fs.readdir(path.join(this.projectPath, '1_Output/parsed-structures'))
            .then(files => files.filter(f => f.endsWith('.json')));
        
        const fileListCount = await fs.readFile(path.join(this.projectPath, 'file_list.txt'), 'utf8')
            .then(content => content.split('\n').filter(line => line.trim()).length)
            .catch(() => 0);
        
        db.close();
        
        const allMatch = dbCount === jsonFiles.length && dbCount === fileListCount;
        
        resolve({
            check: 'Program Count Consistency',
            passed: allMatch,
            details: {
                database: dbCount,
                json_files: jsonFiles.length,
                file_list: fileListCount
            },
            requirement: 'Consistent count across all outputs',
            severity: 'CRITICAL'
        });
    });
}
```

## Report Generation

```javascript
async generateReport() {
    const reportPath = path.join(this.projectPath, '1_Output/validation_report.html');
    
    // Calculate overall statistics
    for (const phase of Object.values(this.results.phases)) {
        for (const validation of phase.validations) {
            if (validation.passed) {
                this.results.overall.passed++;
            } else if (validation.severity === 'WARNING') {
                this.results.overall.warnings++;
            } else {
                this.results.overall.failed++;
            }
        }
    }
    
    const overallScore = (this.results.overall.passed / 
        (this.results.overall.passed + this.results.overall.failed + this.results.overall.warnings)) * 100;
    
    const html = this.generateHTML(overallScore);
    await fs.writeFile(reportPath, html);
    
    console.log(`\nValidation Report generated: ${reportPath}`);
    console.log(`Overall Quality Score: ${overallScore.toFixed(1)}%`);
    
    if (this.results.overall.failed > 0) {
        console.error(`\n❌ VALIDATION FAILED: ${this.results.overall.failed} critical issues found`);
    } else if (this.results.overall.warnings > 0) {
        console.warn(`\n⚠️  VALIDATION PASSED WITH WARNINGS: ${this.results.overall.warnings} warnings`);
    } else {
        console.log('\n✅ ALL VALIDATIONS PASSED!');
    }
}

generateHTML(overallScore) {
    return `<!DOCTYPE html>
<html>
<head>
    <title>ACAS Analysis Validation Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .header { background: #333; color: white; padding: 20px; border-radius: 8px; }
        .score { font-size: 3em; margin: 20px 0; }
        .phase { background: white; margin: 20px 0; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .validation { margin: 10px 0; padding: 10px; border-left: 4px solid #ddd; }
        .passed { border-color: #4CAF50; background: #f1f8f4; }
        .warning { border-color: #FF9800; background: #fff8f1; }
        .failed { border-color: #F44336; background: #fff1f1; }
        .details { margin-top: 10px; font-size: 0.9em; color: #666; }
        pre { background: #f5f5f5; padding: 10px; overflow-x: auto; }
    </style>
</head>
<body>
    <div class="header">
        <h1>ACAS Analysis Validation Report</h1>
        <div class="score">Quality Score: ${overallScore.toFixed(1)}%</div>
        <p>Generated: ${this.results.timestamp}</p>
    </div>
    
    ${Object.entries(this.results.phases).map(([key, phase]) => `
        <div class="phase">
            <h2>${phase.name}</h2>
            ${phase.validations.map(v => `
                <div class="validation ${v.passed ? 'passed' : v.severity === 'WARNING' ? 'warning' : 'failed'}">
                    <strong>${v.check}</strong> - ${v.passed ? '✅ PASSED' : v.severity === 'WARNING' ? '⚠️ WARNING' : '❌ FAILED'}
                    ${v.requirement ? `<div class="details">Requirement: ${v.requirement}</div>` : ''}
                    ${v.details ? `<div class="details"><pre>${JSON.stringify(v.details, null, 2)}</pre></div>` : ''}
                    ${v.error ? `<div class="details">Error: ${v.error}</div>` : ''}
                </div>
            `).join('')}
        </div>
    `).join('')}
    
    <div class="phase">
        <h2>Summary</h2>
        <p>Passed: ${this.results.overall.passed}</p>
        <p>Warnings: ${this.results.overall.warnings}</p>
        <p>Failed: ${this.results.overall.failed}</p>
    </div>
</body>
</html>`;
}
```

## Usage

```bash
# Run complete validation
node validation_suite.js

# Run specific phase validation
node validation_suite.js --phase 1

# Run with verbose output
node validation_suite.js --verbose

# Generate JSON report
node validation_suite.js --format json
```

## Integration with Phases

Each phase should run validation before marking complete:

```javascript
// At the end of each phase
const validator = new ValidationSuite(projectPath);
const phaseNumber = 1; // or 2, 3

const passed = await validator.validatePhase(phaseNumber);
if (!passed) {
    console.error('Phase validation failed - cannot proceed');
    process.exit(1);
}
```

## Quality Gates

The project is only complete when:
- Overall quality score ≥ 90%
- Zero critical failures
- All phases validated
- Cross-phase consistency verified

Remember: **"Trust, but verify"** - every claim must be validated!