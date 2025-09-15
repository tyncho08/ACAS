const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

class FileDiscovery {
    constructor() {
        this.baseDir = '/Users/MartinGonella/Desktop/Demos/ACAS';
        this.outputDir = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output';
        this.discoveryResults = {
            discovery_timestamp: new Date().toISOString(),
            total_files: 0,
            programs: {
                count: 0,
                types: {
                    main_programs: [],
                    subroutines: [],
                    batch_programs: [],
                    online_programs: [],
                    unknown: []
                }
            },
            copybooks: {
                count: 0,
                files: []
            },
            quality_issues: [],
            directories_scanned: []
        };
    }

    async discoverFiles() {
        console.log('Starting COBOL file discovery...\n');

        // Find all COBOL files
        const findCommand = `find ${this.baseDir} -type f \\( -name "*.cbl" -o -name "*.cpy" -o -name "*.CPY" -o -name "*.cob" -o -name "*.COB" \\) -not -path "*/node_modules/*" -not -path "*/.git/*"`;
        
        try {
            const filesOutput = execSync(findCommand, { encoding: 'utf8' });
            const files = filesOutput.split('\n').filter(f => f.trim());
            
            console.log(`Found ${files.length} potential COBOL files\n`);
            
            // Process each file
            for (const filePath of files) {
                if (filePath.trim()) {
                    await this.analyzeFile(filePath.trim());
                }
            }
            
            this.discoveryResults.total_files = files.length;
            
            // Save results
            await this.saveResults();
            
        } catch (error) {
            console.error('Error during file discovery:', error);
            throw error;
        }
    }

    async analyzeFile(filePath) {
        const fileName = path.basename(filePath);
        const extension = path.extname(filePath).toLowerCase();
        const relativePath = path.relative(this.baseDir, filePath);
        
        // Check if it's a text file
        try {
            const fileCommand = `file -b "${filePath}"`;
            const fileType = execSync(fileCommand, { encoding: 'utf8' }).trim();
            
            if (!fileType.includes('text') && !fileType.includes('ASCII')) {
                this.discoveryResults.quality_issues.push({
                    file: relativePath,
                    issue: 'Non-text file format',
                    details: fileType
                });
                return;
            }
        } catch (error) {
            this.discoveryResults.quality_issues.push({
                file: relativePath,
                issue: 'Cannot determine file type',
                error: error.message
            });
        }

        // Categorize file
        if (extension === '.cpy' || extension === '.copy') {
            this.discoveryResults.copybooks.files.push({
                path: relativePath,
                fileName: fileName,
                absolutePath: filePath
            });
            this.discoveryResults.copybooks.count++;
        } else {
            // It's a program file
            const programType = await this.determineProgramType(filePath);
            this.discoveryResults.programs.types[programType].push({
                path: relativePath,
                fileName: fileName,
                absolutePath: filePath,
                type: programType
            });
            this.discoveryResults.programs.count++;
        }

        // Track directories
        const dir = path.dirname(relativePath);
        if (!this.discoveryResults.directories_scanned.includes(dir)) {
            this.discoveryResults.directories_scanned.push(dir);
        }
    }

    async determineProgramType(filePath) {
        try {
            // Read first 100 lines to determine program type
            const content = await fs.readFile(filePath, 'utf8');
            const lines = content.split('\n').slice(0, 100).join('\n').toUpperCase();
            
            // Check for main program indicators
            if (fileName.match(/^(ACAS|sales|purchase|stock|general|irs)\.cbl$/i)) {
                return 'main_programs';
            }
            
            // Check for batch program indicators
            if (lines.includes('BATCH') || fileName.match(/[0-9]{3}\.cbl$/)) {
                if (parseInt(fileName.match(/([0-9]{3})\.cbl$/)?.[1] || 0) >= 800) {
                    return 'batch_programs';
                }
            }
            
            // Check for subroutine indicators
            if (lines.includes('LINKAGE SECTION') || 
                lines.includes('PROCEDURE DIVISION USING') ||
                fileName.match(/sub|util|lib/i)) {
                return 'subroutines';
            }
            
            // Check for online/CICS programs
            if (lines.includes('EXEC CICS') || lines.includes('DFHCOMMAREA')) {
                return 'online_programs';
            }
            
            // Default categorization based on naming patterns
            if (fileName.match(/^[a-z]{2}[0-9]{3}\.cbl$/i)) {
                const prefix = fileName.substring(0, 2).toLowerCase();
                const number = parseInt(fileName.substring(2, 5));
                
                if (number >= 800) {
                    return 'batch_programs';
                } else if (['sl', 'pl', 'gl', 'st', 'irs'].includes(prefix)) {
                    return 'online_programs';
                }
            }
            
            return 'unknown';
            
        } catch (error) {
            this.discoveryResults.quality_issues.push({
                file: path.relative(this.baseDir, filePath),
                issue: 'Cannot read file for analysis',
                error: error.message
            });
            return 'unknown';
        }
    }

    async saveResults() {
        // Save detailed JSON results
        const jsonPath = path.join(this.outputDir, 'file_discovery_metadata.json');
        await fs.writeJson(jsonPath, this.discoveryResults, { spaces: 2 });
        console.log(`\nFile discovery metadata saved to: ${jsonPath}`);
        
        // Generate file list for parser
        const fileListPath = path.join(this.outputDir, 'cobol_files_list.txt');
        const allPrograms = Object.values(this.discoveryResults.programs.types)
            .flat()
            .map(p => p.absolutePath);
        await fs.writeFile(fileListPath, allPrograms.join('\n'));
        console.log(`File list saved to: ${fileListPath}`);
        
        // Generate summary report
        await this.generateSummaryReport();
    }

    async generateSummaryReport() {
        let report = '# COBOL File Discovery Report\n\n';
        report += `**Discovery Date:** ${this.discoveryResults.discovery_timestamp}\n`;
        report += `**Base Directory:** ${this.baseDir}\n\n`;
        
        report += '## Summary\n\n';
        report += `- **Total Files Found:** ${this.discoveryResults.total_files}\n`;
        report += `- **Programs:** ${this.discoveryResults.programs.count}\n`;
        report += `- **Copybooks:** ${this.discoveryResults.copybooks.count}\n`;
        report += `- **Directories Scanned:** ${this.discoveryResults.directories_scanned.length}\n\n`;
        
        report += '## Program Classification\n\n';
        for (const [type, programs] of Object.entries(this.discoveryResults.programs.types)) {
            report += `### ${type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} (${programs.length})\n\n`;
            if (programs.length > 0) {
                programs.slice(0, 10).forEach(p => {
                    report += `- ${p.fileName} (${p.path})\n`;
                });
                if (programs.length > 10) {
                    report += `- ... and ${programs.length - 10} more\n`;
                }
                report += '\n';
            }
        }
        
        report += '## Copybooks\n\n';
        if (this.discoveryResults.copybooks.files.length > 0) {
            this.discoveryResults.copybooks.files.forEach(c => {
                report += `- ${c.fileName} (${c.path})\n`;
            });
        } else {
            report += 'No copybooks found.\n';
        }
        report += '\n';
        
        if (this.discoveryResults.quality_issues.length > 0) {
            report += '## Quality Issues\n\n';
            this.discoveryResults.quality_issues.forEach(issue => {
                report += `- **${issue.file}**: ${issue.issue}\n`;
                if (issue.details) {
                    report += `  - Details: ${issue.details}\n`;
                }
                if (issue.error) {
                    report += `  - Error: ${issue.error}\n`;
                }
            });
        }
        
        const reportPath = path.join(this.outputDir, 'file_discovery_report.md');
        await fs.writeFile(reportPath, report);
        console.log(`Summary report saved to: ${reportPath}`);
    }
}

// Run discovery
async function main() {
    const discovery = new FileDiscovery();
    try {
        await discovery.discoverFiles();
        console.log('\n✓ Task 1.1: File Discovery completed successfully!');
    } catch (error) {
        console.error('File discovery failed:', error);
        process.exit(1);
    }
}

// Execute if run directly
if (require.main === module) {
    main();
}

module.exports = FileDiscovery;