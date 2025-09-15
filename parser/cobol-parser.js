const fs = require('fs-extra');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

class COBOLParser {
    constructor() {
        this.patterns = {
            programId: /PROGRAM-ID\.\s*([^\s.]+)/i,
            identification: /IDENTIFICATION\s+DIVISION/i,
            environment: /ENVIRONMENT\s+DIVISION/i,
            data: /DATA\s+DIVISION/i,
            procedure: /PROCEDURE\s+DIVISION/i,
            call: /CALL\s+["']([^"']+)["']/gi,
            perform: /PERFORM\s+([^\s.]+)/gi,
            copy: /COPY\s+["']?([^\s."']+)["']?/gi,
            select: /SELECT\s+([^\s]+)\s+ASSIGN\s+TO\s+([^\s.]+)/gi,
            fd: /FD\s+([^\s.]+)/gi,
            workingStorage: /WORKING-STORAGE\s+SECTION/i,
            localStorage: /LOCAL-STORAGE\s+SECTION/i,
            linkageSection: /LINKAGE\s+SECTION/i,
            fileSection: /FILE\s+SECTION/i
        };
    }

    parseFile(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const result = {
                filePath: filePath,
                fileName: path.basename(filePath),
                timestamp: new Date().toISOString(),
                programId: null,
                divisions: {
                    identification: false,
                    environment: false,
                    data: false,
                    procedure: false
                },
                calls: [],
                performs: [],
                copies: [],
                files: [],
                dataStructures: {
                    workingStorage: false,
                    localStorage: false,
                    linkageSection: false,
                    fileSection: false,
                    fileDescriptions: []
                },
                parseErrors: []
            };

            // Extract PROGRAM-ID
            const programIdMatch = content.match(this.patterns.programId);
            if (programIdMatch) {
                result.programId = programIdMatch[1];
            }

            // Check for divisions
            result.divisions.identification = this.patterns.identification.test(content);
            result.divisions.environment = this.patterns.environment.test(content);
            result.divisions.data = this.patterns.data.test(content);
            result.divisions.procedure = this.patterns.procedure.test(content);

            // Extract CALL statements
            let match;
            const callPattern = new RegExp(this.patterns.call);
            while ((match = callPattern.exec(content)) !== null) {
                if (!result.calls.includes(match[1])) {
                    result.calls.push(match[1]);
                }
            }

            // Extract PERFORM statements
            const performPattern = new RegExp(this.patterns.perform);
            while ((match = performPattern.exec(content)) !== null) {
                if (!result.performs.includes(match[1])) {
                    result.performs.push(match[1]);
                }
            }

            // Extract COPY statements
            const copyPattern = new RegExp(this.patterns.copy);
            while ((match = copyPattern.exec(content)) !== null) {
                if (!result.copies.includes(match[1])) {
                    result.copies.push(match[1]);
                }
            }

            // Extract SELECT statements (file assignments)
            const selectPattern = new RegExp(this.patterns.select);
            while ((match = selectPattern.exec(content)) !== null) {
                result.files.push({
                    logicalName: match[1],
                    physicalName: match[2]
                });
            }

            // Extract FD statements
            const fdPattern = new RegExp(this.patterns.fd);
            while ((match = fdPattern.exec(content)) !== null) {
                result.dataStructures.fileDescriptions.push(match[1]);
            }

            // Check for data sections
            result.dataStructures.workingStorage = this.patterns.workingStorage.test(content);
            result.dataStructures.localStorage = this.patterns.localStorage.test(content);
            result.dataStructures.linkageSection = this.patterns.linkageSection.test(content);
            result.dataStructures.fileSection = this.patterns.fileSection.test(content);

            return result;
        } catch (error) {
            return {
                filePath: filePath,
                fileName: path.basename(filePath),
                timestamp: new Date().toISOString(),
                parseErrors: [error.message]
            };
        }
    }

    async processAllFiles(fileListPath) {
        const files = fs.readFileSync(fileListPath, 'utf8').split('\n').filter(f => f.trim());
        const results = [];
        let processedCount = 0;
        let errorCount = 0;

        console.log(`Starting to process ${files.length} COBOL files...`);

        for (const file of files) {
            if (file.trim()) {
                console.log(`Processing ${++processedCount}/${files.length}: ${path.basename(file)}`);
                const result = this.parseFile(file.trim());
                results.push(result);
                if (result.parseErrors && result.parseErrors.length > 0) {
                    errorCount++;
                }
            }
        }

        console.log(`\nProcessing complete. Processed: ${processedCount}, Errors: ${errorCount}`);
        return results;
    }

    async saveResults(results) {
        // Create output directories
        const outputDir = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output';
        const parsedDir = path.join(outputDir, 'parsed-structures');
        const dbDir = path.join(outputDir, 'parser_analysis');

        await fs.ensureDir(parsedDir);
        await fs.ensureDir(dbDir);

        // Save JSON files
        console.log('\nSaving JSON files...');
        let jsonCount = 0;
        for (const result of results) {
            const jsonFileName = result.filePath.replace(/\//g, '_').replace(/\\/g, '_') + '.json';
            const jsonPath = path.join(parsedDir, jsonFileName);
            await fs.writeJson(jsonPath, result, { spaces: 2 });
            jsonCount++;
            if (jsonCount % 50 === 0) {
                console.log(`Saved ${jsonCount} JSON files...`);
            }
        }
        console.log(`Total JSON files saved: ${jsonCount}`);

        // Create SQLite database
        console.log('\nCreating SQLite database...');
        const dbPath = path.join(dbDir, 'database.sqlite');
        const db = new sqlite3.Database(dbPath);

        return new Promise((resolve, reject) => {
            db.serialize(() => {
                // Create tables
                db.run(`CREATE TABLE IF NOT EXISTS programs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    file_path TEXT,
                    file_name TEXT,
                    program_id TEXT,
                    has_identification BOOLEAN,
                    has_environment BOOLEAN,
                    has_data BOOLEAN,
                    has_procedure BOOLEAN,
                    parse_timestamp TEXT,
                    error_count INTEGER
                )`);

                db.run(`CREATE TABLE IF NOT EXISTS program_calls (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    program_file_path TEXT,
                    called_program TEXT
                )`);

                db.run(`CREATE TABLE IF NOT EXISTS program_copies (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    program_file_path TEXT,
                    copybook TEXT
                )`);

                db.run(`CREATE TABLE IF NOT EXISTS program_files (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    program_file_path TEXT,
                    logical_name TEXT,
                    physical_name TEXT
                )`);

                db.run(`CREATE TABLE IF NOT EXISTS program_performs (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    program_file_path TEXT,
                    perform_target TEXT
                )`);

                // Insert data
                const programStmt = db.prepare(`INSERT INTO programs 
                    (file_path, file_name, program_id, has_identification, has_environment, 
                     has_data, has_procedure, parse_timestamp, error_count) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);

                const callStmt = db.prepare(`INSERT INTO program_calls 
                    (program_file_path, called_program) VALUES (?, ?)`);

                const copyStmt = db.prepare(`INSERT INTO program_copies 
                    (program_file_path, copybook) VALUES (?, ?)`);

                const fileStmt = db.prepare(`INSERT INTO program_files 
                    (program_file_path, logical_name, physical_name) VALUES (?, ?, ?)`);

                const performStmt = db.prepare(`INSERT INTO program_performs 
                    (program_file_path, perform_target) VALUES (?, ?)`);

                for (const result of results) {
                    programStmt.run(
                        result.filePath,
                        result.fileName,
                        result.programId,
                        result.divisions?.identification ? 1 : 0,
                        result.divisions?.environment ? 1 : 0,
                        result.divisions?.data ? 1 : 0,
                        result.divisions?.procedure ? 1 : 0,
                        result.timestamp,
                        result.parseErrors ? result.parseErrors.length : 0
                    );

                    // Insert calls
                    if (result.calls) {
                        for (const call of result.calls) {
                            callStmt.run(result.filePath, call);
                        }
                    }

                    // Insert copies
                    if (result.copies) {
                        for (const copy of result.copies) {
                            copyStmt.run(result.filePath, copy);
                        }
                    }

                    // Insert files
                    if (result.files) {
                        for (const file of result.files) {
                            fileStmt.run(result.filePath, file.logicalName, file.physicalName);
                        }
                    }

                    // Insert performs
                    if (result.performs) {
                        for (const perform of result.performs) {
                            performStmt.run(result.filePath, perform);
                        }
                    }
                }

                programStmt.finalize();
                callStmt.finalize();
                copyStmt.finalize();
                fileStmt.finalize();
                performStmt.finalize();

                db.close((err) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log('Database created successfully.');
                        resolve();
                    }
                });
            });
        });
    }

    async generateSummaryReport(results, startTime) {
        const endTime = new Date();
        const duration = (endTime - startTime) / 1000; // in seconds

        let report = '# COBOL Parsing Summary Report\n\n';
        report += `## Processing Statistics\n\n`;
        report += `- **Start Time:** ${startTime.toISOString()}\n`;
        report += `- **End Time:** ${endTime.toISOString()}\n`;
        report += `- **Total Duration:** ${duration.toFixed(2)} seconds\n`;
        report += `- **Files Processed:** ${results.length}\n`;

        const errorFiles = results.filter(r => r.parseErrors && r.parseErrors.length > 0);
        report += `- **Files with Errors:** ${errorFiles.length}\n\n`;

        // Division statistics
        const divisionStats = {
            identification: results.filter(r => r.divisions?.identification).length,
            environment: results.filter(r => r.divisions?.environment).length,
            data: results.filter(r => r.divisions?.data).length,
            procedure: results.filter(r => r.divisions?.procedure).length
        };

        report += `## Division Statistics\n\n`;
        report += `- **IDENTIFICATION DIVISION:** ${divisionStats.identification} files\n`;
        report += `- **ENVIRONMENT DIVISION:** ${divisionStats.environment} files\n`;
        report += `- **DATA DIVISION:** ${divisionStats.data} files\n`;
        report += `- **PROCEDURE DIVISION:** ${divisionStats.procedure} files\n\n`;

        // Dependency statistics
        const totalCalls = results.reduce((sum, r) => sum + (r.calls?.length || 0), 0);
        const totalCopies = results.reduce((sum, r) => sum + (r.copies?.length || 0), 0);
        const totalPerforms = results.reduce((sum, r) => sum + (r.performs?.length || 0), 0);

        report += `## Dependency Statistics\n\n`;
        report += `- **Total CALL statements:** ${totalCalls}\n`;
        report += `- **Total COPY statements:** ${totalCopies}\n`;
        report += `- **Total PERFORM statements:** ${totalPerforms}\n\n`;

        // Error details
        if (errorFiles.length > 0) {
            report += `## Parsing Errors\n\n`;
            for (const file of errorFiles) {
                report += `### ${file.fileName}\n`;
                report += `- **Path:** ${file.filePath}\n`;
                report += `- **Errors:**\n`;
                for (const error of file.parseErrors) {
                    report += `  - ${error}\n`;
                }
                report += '\n';
            }
        }

        // Save report
        const reportPath = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output/parsing_summary.md';
        await fs.writeFile(reportPath, report);
        console.log(`\nSummary report saved to: ${reportPath}`);
    }
}

// Main execution
async function main() {
    const parser = new COBOLParser();
    const startTime = new Date();

    try {
        // Process all files
        const results = await parser.processAllFiles('/Users/MartinGonella/Desktop/Demos/ACAS/file_list.txt');
        
        // Save results
        await parser.saveResults(results);
        
        // Generate summary report
        await parser.generateSummaryReport(results, startTime);
        
        console.log('\n✓ Phase 1 Tasks 1.2 and 1.3 completed successfully!');
    } catch (error) {
        console.error('Error during processing:', error);
    }
}

// Run the parser
main();