#!/usr/bin/env node

const { program } = require('commander');
const AnalysisOrchestrator = require('./analysis_orchestrator');
const fs = require('fs-extra');
const path = require('path');

/**
 * COBOL Analysis CLI
 * 
 * Simple, reliable command-line interface for COBOL analysis
 */

program
    .name('cobol-analyze')
    .description('Accurate, evidence-based COBOL code analysis')
    .version('1.0.0');

program
    .command('analyze')
    .description('Analyze COBOL source code')
    .requiredOption('-s, --source <path>', 'Source directory containing COBOL files')
    .option('-o, --output <path>', 'Output directory for results', './cobol-analysis-output')
    .option('-i, --include <paths...>', 'Include paths for copybooks')
    .option('--no-validate', 'Skip validation steps (not recommended)')
    .option('-p, --parallel <number>', 'Number of parallel workers', '1')
    .action(async (options) => {
        try {
            console.log('\n🔍 COBOL Analysis Tool v1.0.0\n');
            
            // Validate source directory
            if (!await fs.pathExists(options.source)) {
                console.error(`Error: Source directory not found: ${options.source}`);
                process.exit(1);
            }
            
            // Create orchestrator with configuration
            const orchestrator = new AnalysisOrchestrator({
                sourceDir: path.resolve(options.source),
                outputDir: path.resolve(options.output),
                includePaths: options.include || [],
                validateEveryStep: options.validate,
                parallelism: parseInt(options.parallel) || 1
            });
            
            // Run analysis
            const startTime = Date.now();
            const results = await orchestrator.analyze();
            const duration = (Date.now() - startTime) / 1000;
            
            // Display summary
            console.log('\n' + '='.repeat(60));
            console.log('ANALYSIS SUMMARY');
            console.log('='.repeat(60));
            console.log(`Status: ${results.status}`);
            console.log(`Duration: ${duration.toFixed(1)} seconds`);
            console.log(`Files analyzed: ${results.results.statistics.totalFiles}`);
            console.log(`Successful: ${results.results.statistics.successfulParses}`);
            console.log(`Failed: ${results.results.statistics.failedParses}`);
            console.log(`Success rate: ${results.results.statistics.successRate.toFixed(1)}%`);
            console.log(`Average complexity: ${results.results.statistics.avgComplexity?.toFixed(1) || 'N/A'}`);
            console.log('\nResults saved to:', options.output);
            console.log('='.repeat(60) + '\n');
            
            process.exit(0);
            
        } catch (error) {
            console.error('\n❌ Analysis failed:', error.message);
            process.exit(1);
        }
    });

program
    .command('validate')
    .description('Validate existing analysis results')
    .requiredOption('-d, --dir <path>', 'Analysis output directory to validate')
    .action(async (options) => {
        try {
            console.log('\n🔍 Validating analysis results...\n');
            
            const analysisDir = path.resolve(options.dir);
            
            // Check if directory exists
            if (!await fs.pathExists(analysisDir)) {
                console.error(`Error: Analysis directory not found: ${analysisDir}`);
                process.exit(1);
            }
            
            // Load analysis summary
            const summaryPath = path.join(analysisDir, 'analysis-summary.json');
            if (!await fs.pathExists(summaryPath)) {
                console.error('Error: No analysis summary found');
                process.exit(1);
            }
            
            const summary = await fs.readJson(summaryPath);
            
            // Perform validation checks
            const checks = [];
            
            // Check AST files
            const astDir = path.join(analysisDir, 'ast');
            const astFiles = await fs.readdir(astDir);
            checks.push({
                name: 'AST files present',
                passed: astFiles.length > 0,
                details: `${astFiles.length} AST files found`
            });
            
            // Check reports
            const reportsDir = path.join(analysisDir, 'reports');
            const reportFiles = await fs.readdir(reportsDir);
            checks.push({
                name: 'Reports generated',
                passed: reportFiles.length >= 3,
                details: `${reportFiles.length} report files found`
            });
            
            // Check validation summary
            const validationRate = summary.results?.validationSummary?.successRate || 0;
            checks.push({
                name: 'Validation success rate',
                passed: validationRate >= 90,
                details: `${validationRate.toFixed(1)}% validation success`
            });
            
            // Display results
            console.log('Validation Results:');
            console.log('='.repeat(40));
            
            let allPassed = true;
            checks.forEach(check => {
                const status = check.passed ? '✅' : '❌';
                console.log(`${status} ${check.name}: ${check.details}`);
                if (!check.passed) allPassed = false;
            });
            
            console.log('='.repeat(40));
            console.log(`\nOverall: ${allPassed ? '✅ PASSED' : '❌ FAILED'}\n`);
            
            process.exit(allPassed ? 0 : 1);
            
        } catch (error) {
            console.error('\n❌ Validation failed:', error.message);
            process.exit(1);
        }
    });

program
    .command('compare')
    .description('Compare two analysis runs')
    .requiredOption('-b, --baseline <path>', 'Baseline analysis directory')
    .requiredOption('-c, --current <path>', 'Current analysis directory')
    .option('-t, --threshold <number>', 'Maximum allowed change percentage', '10')
    .action(async (options) => {
        try {
            console.log('\n🔍 Comparing analysis runs...\n');
            
            // Load both summaries
            const baseline = await fs.readJson(
                path.join(options.baseline, 'analysis-summary.json')
            );
            const current = await fs.readJson(
                path.join(options.current, 'analysis-summary.json')
            );
            
            // Compare key metrics
            const comparisons = [];
            const threshold = parseFloat(options.threshold);
            
            // Compare file counts
            const baselineFiles = baseline.results.statistics.totalFiles;
            const currentFiles = current.results.statistics.totalFiles;
            const fileChange = ((currentFiles - baselineFiles) / baselineFiles) * 100;
            
            comparisons.push({
                metric: 'Total files',
                baseline: baselineFiles,
                current: currentFiles,
                change: fileChange,
                passed: Math.abs(fileChange) <= threshold
            });
            
            // Compare average complexity
            const baselineComplexity = baseline.results.statistics.avgComplexity || 0;
            const currentComplexity = current.results.statistics.avgComplexity || 0;
            const complexityChange = ((currentComplexity - baselineComplexity) / baselineComplexity) * 100;
            
            comparisons.push({
                metric: 'Average complexity',
                baseline: baselineComplexity.toFixed(1),
                current: currentComplexity.toFixed(1),
                change: complexityChange,
                passed: Math.abs(complexityChange) <= threshold
            });
            
            // Display results
            console.log('Comparison Results:');
            console.log('='.repeat(60));
            console.log('Metric'.padEnd(20) + 'Baseline'.padEnd(12) + 'Current'.padEnd(12) + 'Change'.padEnd(12) + 'Status');
            console.log('-'.repeat(60));
            
            let allPassed = true;
            comparisons.forEach(comp => {
                const status = comp.passed ? '✅' : '❌';
                const changeStr = comp.change >= 0 ? `+${comp.change.toFixed(1)}%` : `${comp.change.toFixed(1)}%`;
                
                console.log(
                    comp.metric.padEnd(20) +
                    comp.baseline.toString().padEnd(12) +
                    comp.current.toString().padEnd(12) +
                    changeStr.padEnd(12) +
                    status
                );
                
                if (!comp.passed) allPassed = false;
            });
            
            console.log('='.repeat(60));
            console.log(`\nThreshold: ±${threshold}%`);
            console.log(`Result: ${allPassed ? '✅ PASSED' : '❌ FAILED'}\n`);
            
            process.exit(allPassed ? 0 : 1);
            
        } catch (error) {
            console.error('\n❌ Comparison failed:', error.message);
            process.exit(1);
        }
    });

// Parse command line arguments
program.parse(process.argv);

// Show help if no command provided
if (!process.argv.slice(2).length) {
    program.outputHelp();
}