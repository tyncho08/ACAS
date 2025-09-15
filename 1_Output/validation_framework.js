const sqlite3 = require('sqlite3').verbose();
const fs = require('fs-extra');
const path = require('path');

class ValidationFramework {
    constructor(dbPath) {
        this.dbPath = dbPath || '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output/parser_analysis/acas_analysis.sqlite';
        this.validationResults = {
            timestamp: new Date().toISOString(),
            phases: {},
            overallScore: 0,
            passed: false
        };
    }

    async validatePhase1() {
        console.log('\n=== Phase 1 Validation Starting ===\n');
        
        const db = new sqlite3.Database(this.dbPath);
        const results = {
            checks: [],
            score: 0,
            passed: false
        };

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                // Check 1: All files discovered and categorized
                db.get(`SELECT COUNT(*) as total FROM programs`, (err, row) => {
                    if (err) {
                        results.checks.push({
                            name: 'File Discovery',
                            passed: false,
                            message: `Error: ${err.message}`
                        });
                    } else {
                        const passed = row.total > 0;
                        results.checks.push({
                            name: 'File Discovery',
                            passed: passed,
                            message: `Found ${row.total} COBOL files`,
                            details: { count: row.total }
                        });
                    }
                });

                // Check 2: Parsing success rate > 95%
                db.get(`
                    SELECT 
                        COUNT(*) as total,
                        COUNT(CASE WHEN validation_status = 'VALID' THEN 1 END) as valid,
                        COUNT(CASE WHEN validation_status = 'ERROR' THEN 1 END) as errors
                    FROM programs
                `, (err, row) => {
                    if (err) {
                        results.checks.push({
                            name: 'Parsing Success Rate',
                            passed: false,
                            message: `Error: ${err.message}`
                        });
                    } else {
                        const successRate = row.total > 0 ? (row.valid / row.total) * 100 : 0;
                        const passed = successRate >= 95;
                        results.checks.push({
                            name: 'Parsing Success Rate',
                            passed: passed,
                            message: `${successRate.toFixed(2)}% success rate (${row.valid}/${row.total} files)`,
                            details: {
                                total: row.total,
                                valid: row.valid,
                                errors: row.errors,
                                successRate: successRate
                            }
                        });
                    }
                });

                // Check 3: All CALL targets validated
                db.get(`
                    SELECT COUNT(DISTINCT pc.called_program_id) as unresolved
                    FROM program_calls pc
                    LEFT JOIN programs p ON pc.called_program_id = p.program_id
                    WHERE p.program_id IS NULL
                `, (err, row) => {
                    if (err) {
                        results.checks.push({
                            name: 'CALL Target Validation',
                            passed: false,
                            message: `Error: ${err.message}`
                        });
                    } else {
                        const passed = row.unresolved === 0;
                        results.checks.push({
                            name: 'CALL Target Validation',
                            passed: passed,
                            message: passed ? 'All CALL targets resolved' : `${row.unresolved} unresolved CALL targets`,
                            details: { unresolved: row.unresolved }
                        });
                    }
                });

                // Check 4: All copybook references verified
                db.get(`
                    SELECT COUNT(DISTINCT copybook_name) as total_copybooks
                    FROM copybook_usage
                `, (err, row) => {
                    if (err) {
                        results.checks.push({
                            name: 'Copybook References',
                            passed: false,
                            message: `Error: ${err.message}`
                        });
                    } else {
                        results.checks.push({
                            name: 'Copybook References',
                            passed: true,
                            message: `${row.total_copybooks} copybooks referenced`,
                            details: { totalCopybooks: row.total_copybooks }
                        });
                    }
                });

                // Check 5: Database integrity
                db.get(`PRAGMA integrity_check`, (err, row) => {
                    const passed = !err && row && row.integrity_check === 'ok';
                    results.checks.push({
                        name: 'Database Integrity',
                        passed: passed,
                        message: passed ? 'Database integrity check passed' : 'Database integrity issues detected'
                    });
                });

                // Check 6: No CRITICAL issues
                db.get(`
                    SELECT COUNT(*) as critical_issues
                    FROM quality_issues
                    WHERE severity = 'CRITICAL'
                `, (err, row) => {
                    if (err) {
                        results.checks.push({
                            name: 'Critical Issues',
                            passed: false,
                            message: `Error: ${err.message}`
                        });
                    } else {
                        const passed = row.critical_issues === 0;
                        results.checks.push({
                            name: 'Critical Issues',
                            passed: passed,
                            message: passed ? 'No critical issues found' : `${row.critical_issues} critical issues found`,
                            details: { criticalIssues: row.critical_issues }
                        });
                    }

                    // Calculate overall score
                    const passedChecks = results.checks.filter(c => c.passed).length;
                    results.score = (passedChecks / results.checks.length) * 100;
                    results.passed = results.score >= 90;

                    db.close();
                    resolve(results);
                });
            });
        });
    }

    async generateValidationReport() {
        let report = '# ACAS Analysis Validation Report\n\n';
        report += `**Generated:** ${this.validationResults.timestamp}\n\n`;

        // Phase 1 Results
        if (this.validationResults.phases.phase1) {
            const phase1 = this.validationResults.phases.phase1;
            report += '## Phase 1: Deep Structural Analysis\n\n';
            report += `**Overall Score:** ${phase1.score.toFixed(2)}%\n`;
            report += `**Status:** ${phase1.passed ? '✅ PASSED' : '❌ FAILED'}\n\n`;

            report += '### Validation Checks:\n\n';
            phase1.checks.forEach(check => {
                report += `- ${check.passed ? '✅' : '❌'} **${check.name}**: ${check.message}\n`;
                if (check.details) {
                    Object.entries(check.details).forEach(([key, value]) => {
                        report += `  - ${key}: ${value}\n`;
                    });
                }
            });
        }

        // Save report
        const reportPath = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output/validation_report.md';
        await fs.writeFile(reportPath, report);
        console.log(`\nValidation report saved to: ${reportPath}`);
        
        return report;
    }

    async runFullValidation() {
        console.log('Starting full validation suite...\n');

        // Phase 1 Validation
        this.validationResults.phases.phase1 = await this.validatePhase1();

        // Calculate overall score
        const phaseScores = Object.values(this.validationResults.phases).map(p => p.score);
        this.validationResults.overallScore = phaseScores.reduce((a, b) => a + b, 0) / phaseScores.length;
        this.validationResults.passed = this.validationResults.overallScore >= 90;

        // Generate report
        await this.generateValidationReport();

        // Save JSON results
        const jsonPath = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output/validation_results.json';
        await fs.writeJson(jsonPath, this.validationResults, { spaces: 2 });

        return this.validationResults;
    }
}

// Export for use in other scripts
module.exports = ValidationFramework;

// Run if called directly
if (require.main === module) {
    const validator = new ValidationFramework();
    validator.runFullValidation()
        .then(results => {
            console.log('\n=== Validation Complete ===');
            console.log(`Overall Score: ${results.overallScore.toFixed(2)}%`);
            console.log(`Status: ${results.passed ? 'PASSED' : 'FAILED'}`);
        })
        .catch(err => {
            console.error('Validation failed:', err);
            process.exit(1);
        });
}