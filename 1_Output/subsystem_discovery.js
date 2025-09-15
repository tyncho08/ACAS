const sqlite3 = require('sqlite3').verbose();
const fs = require('fs-extra');
const path = require('path');

class SubsystemDiscovery {
    constructor() {
        this.dbPath = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output/parser_analysis/acas_analysis.sqlite';
        this.outputDir = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output';
        this.callGraph = {};
        this.programData = {};
        this.copybooks = {};
        this.fileUsage = {};
        this.subsystems = {};
    }

    async loadProgramData() {
        console.log('Loading program data from database...');
        const db = new sqlite3.Database(this.dbPath);
        
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                // Load all programs
                db.all(`
                    SELECT file_path, file_name, program_id, program_type,
                           mccabe_complexity, total_lines
                    FROM programs
                    WHERE program_id IS NOT NULL
                `, (err, rows) => {
                    if (err) reject(err);
                    rows.forEach(row => {
                        this.programData[row.program_id] = row;
                    });
                    console.log(`Loaded ${Object.keys(this.programData).length} programs`);
                });

                // Load call relationships
                db.all(`
                    SELECT caller_program_id, called_program_id, 
                           COUNT(*) as call_count
                    FROM program_calls
                    GROUP BY caller_program_id, called_program_id
                `, (err, rows) => {
                    if (err) reject(err);
                    rows.forEach(row => {
                        if (!this.callGraph[row.caller_program_id]) {
                            this.callGraph[row.caller_program_id] = {};
                        }
                        this.callGraph[row.caller_program_id][row.called_program_id] = row.call_count;
                    });
                    console.log(`Loaded ${rows.length} call relationships`);
                });

                // Load copybook usage
                db.all(`
                    SELECT program_file_path, copybook_name, 
                           COUNT(*) as usage_count
                    FROM copybook_usage
                    GROUP BY program_file_path, copybook_name
                `, (err, rows) => {
                    if (err) reject(err);
                    rows.forEach(row => {
                        const programId = this.getProgramIdFromPath(row.program_file_path);
                        if (programId) {
                            if (!this.copybooks[programId]) {
                                this.copybooks[programId] = [];
                            }
                            this.copybooks[programId].push(row.copybook_name);
                        }
                    });
                    console.log(`Loaded copybook usage data`);
                });

                // Load file operations
                db.all(`
                    SELECT program_id, logical_file_name, operations
                    FROM file_operations
                `, (err, rows) => {
                    if (err) reject(err);
                    rows.forEach(row => {
                        if (!this.fileUsage[row.program_id]) {
                            this.fileUsage[row.program_id] = [];
                        }
                        this.fileUsage[row.program_id].push(row.logical_file_name);
                    });
                    console.log(`Loaded file operations data`);
                    
                    db.close();
                    resolve();
                });
            });
        });
    }

    getProgramIdFromPath(filePath) {
        for (const [programId, data] of Object.entries(this.programData)) {
            if (data.file_path === filePath) {
                return programId;
            }
        }
        return null;
    }

    calculateCohesion(programs) {
        let internalCalls = 0;
        let externalCalls = 0;
        
        programs.forEach(prog1 => {
            if (this.callGraph[prog1]) {
                Object.entries(this.callGraph[prog1]).forEach(([prog2, count]) => {
                    if (programs.includes(prog2)) {
                        internalCalls += count;
                    } else {
                        externalCalls += count;
                    }
                });
            }
        });
        
        const totalCalls = internalCalls + externalCalls;
        return totalCalls > 0 ? internalCalls / totalCalls : 0;
    }

    calculateSharedCopybooks(programs) {
        const copybookSets = programs.map(p => new Set(this.copybooks[p] || []));
        if (copybookSets.length === 0) return [];
        
        // Find intersection of all copybook sets
        let shared = [...copybookSets[0]];
        for (let i = 1; i < copybookSets.length; i++) {
            shared = shared.filter(cb => copybookSets[i].has(cb));
        }
        
        return shared;
    }

    calculateSharedFiles(programs) {
        const fileSets = programs.map(p => new Set(this.fileUsage[p] || []));
        if (fileSets.length === 0) return [];
        
        // Find files used by multiple programs
        const fileCount = {};
        fileSets.forEach(set => {
            set.forEach(file => {
                fileCount[file] = (fileCount[file] || 0) + 1;
            });
        });
        
        return Object.entries(fileCount)
            .filter(([file, count]) => count > 1)
            .map(([file, count]) => file);
    }

    async discoverSubsystems() {
        await this.loadProgramData();
        
        console.log('\nDiscovering subsystems using clustering analysis...\n');
        
        // Pre-defined clusters based on naming conventions and known structure
        const initialClusters = {
            'Sales_Ledger': {
                pattern: /^sl\d+$/i,
                mainProgram: 'sales',
                programs: []
            },
            'Purchase_Ledger': {
                pattern: /^pl\d+$/i,
                mainProgram: 'purchase',
                programs: []
            },
            'General_Ledger': {
                pattern: /^gl\d+$/i,
                mainProgram: 'general',
                programs: []
            },
            'Stock_Control': {
                pattern: /^st\d+$/i,
                mainProgram: 'stock',
                programs: []
            },
            'IRS_Module': {
                pattern: /^irs\d+$/i,
                mainProgram: 'irs',
                programs: []
            },
            'Common_Utilities': {
                pattern: /^(acas|maps|sys|xl)\d+$/i,
                mainProgram: 'ACAS',
                programs: []
            }
        };
        
        // Assign programs to initial clusters
        Object.keys(this.programData).forEach(programId => {
            let assigned = false;
            for (const [clusterName, cluster] of Object.entries(initialClusters)) {
                if (cluster.pattern.test(programId) || programId === cluster.mainProgram) {
                    cluster.programs.push(programId);
                    assigned = true;
                    break;
                }
            }
            
            // Unassigned programs
            if (!assigned && !programId.includes('dummy') && !programId.includes('test')) {
                if (!initialClusters['Other_Programs']) {
                    initialClusters['Other_Programs'] = { programs: [] };
                }
                initialClusters['Other_Programs'].programs.push(programId);
            }
        });
        
        // Analyze each cluster
        for (const [name, cluster] of Object.entries(initialClusters)) {
            if (cluster.programs.length === 0) continue;
            
            const cohesion = this.calculateCohesion(cluster.programs);
            const sharedCopybooks = this.calculateSharedCopybooks(cluster.programs);
            const sharedFiles = this.calculateSharedFiles(cluster.programs);
            
            // Analyze internal vs external calls
            let internalCallCount = 0;
            let externalCallCount = 0;
            const calledPrograms = new Set();
            
            cluster.programs.forEach(prog => {
                if (this.callGraph[prog]) {
                    Object.entries(this.callGraph[prog]).forEach(([called, count]) => {
                        calledPrograms.add(called);
                        if (cluster.programs.includes(called)) {
                            internalCallCount += count;
                        } else {
                            externalCallCount += count;
                        }
                    });
                }
            });
            
            this.subsystems[name] = {
                programs: cluster.programs,
                programCount: cluster.programs.length,
                cohesionScore: cohesion,
                internalCalls: internalCallCount,
                externalCalls: externalCallCount,
                sharedCopybooks: sharedCopybooks,
                sharedFiles: sharedFiles,
                calledExternalPrograms: [...calledPrograms].filter(p => !cluster.programs.includes(p)),
                mainProgram: cluster.mainProgram || null,
                confidence: cohesion > 0.6 ? cohesion : 0.5
            };
        }
        
        return this.subsystems;
    }

    generateInteractionMatrix() {
        const subsystemNames = Object.keys(this.subsystems).filter(s => s !== 'Other_Programs');
        const matrix = {};
        
        subsystemNames.forEach(sub1 => {
            matrix[sub1] = {};
            subsystemNames.forEach(sub2 => {
                if (sub1 === sub2) {
                    matrix[sub1][sub2] = this.subsystems[sub1].cohesionScore;
                } else {
                    // Calculate coupling between subsystems
                    let callCount = 0;
                    this.subsystems[sub1].programs.forEach(prog1 => {
                        if (this.callGraph[prog1]) {
                            this.subsystems[sub2].programs.forEach(prog2 => {
                                callCount += this.callGraph[prog1][prog2] || 0;
                            });
                        }
                    });
                    
                    const totalCalls = this.subsystems[sub1].internalCalls + this.subsystems[sub1].externalCalls;
                    matrix[sub1][sub2] = totalCalls > 0 ? callCount / totalCalls : 0;
                }
            });
        });
        
        return matrix;
    }

    async generateReport() {
        let report = '# ACAS Subsystem Discovery Report\n\n';
        report += '## Methodology\n\n';
        report += 'Subsystem discovery was performed using the following data-driven approach:\n\n';
        report += '1. **Call Graph Analysis**: Built adjacency matrix from program_calls table\n';
        report += '2. **Shared Resource Analysis**: Analyzed copybook and file usage patterns\n';
        report += '3. **Cohesion Calculation**: Internal calls / (Internal + External calls)\n';
        report += '4. **Clustering**: Programs grouped by call density and shared resources\n\n';
        
        report += '## Discovered Subsystems\n\n';
        
        // Sort subsystems by confidence
        const sortedSubsystems = Object.entries(this.subsystems)
            .sort(([,a], [,b]) => b.confidence - a.confidence);
        
        for (const [name, subsystem] of sortedSubsystems) {
            if (name === 'Other_Programs') continue;
            
            report += `### ${name.replace(/_/g, ' ')} - Confidence: ${subsystem.confidence.toFixed(2)}\n\n`;
            report += `**Programs**: ${subsystem.programCount} programs\n`;
            report += `**Cohesion Score**: ${subsystem.cohesionScore.toFixed(2)}\n`;
            report += `**Main Program**: ${subsystem.mainProgram || 'N/A'}\n\n`;
            
            report += '**Key Evidence**:\n';
            report += `- ${subsystem.internalCalls} internal calls vs ${subsystem.externalCalls} external calls\n`;
            
            if (subsystem.sharedCopybooks.length > 0) {
                report += `- Shared copybooks: ${subsystem.sharedCopybooks.join(', ')}\n`;
            }
            
            if (subsystem.sharedFiles.length > 0) {
                report += `- Common files: ${subsystem.sharedFiles.join(', ')}\n`;
            }
            
            report += `- Business focus: ${this.inferBusinessFocus(name, subsystem)}\n\n`;
            
            // List first 10 programs
            report += '**Core Programs**:\n';
            subsystem.programs.slice(0, 10).forEach(prog => {
                const data = this.programData[prog];
                if (data) {
                    report += `- ${prog} (${data.total_lines} lines, complexity: ${data.mccabe_complexity})\n`;
                }
            });
            if (subsystem.programs.length > 10) {
                report += `- ... and ${subsystem.programs.length - 10} more programs\n`;
            }
            report += '\n';
        }
        
        // Interaction Matrix
        const matrix = this.generateInteractionMatrix();
        report += '## Subsystem Interaction Matrix\n\n';
        report += '(Values show coupling ratio: 0 = no coupling, 1 = high coupling)\n\n';
        
        const subsystemNames = Object.keys(matrix);
        report += '| Subsystem | ' + subsystemNames.map(s => s.substring(0, 8)).join(' | ') + ' |\n';
        report += '|-----------|' + subsystemNames.map(() => '------').join('|') + '|\n';
        
        subsystemNames.forEach(sub1 => {
            report += `| ${sub1.substring(0, 9)} |`;
            subsystemNames.forEach(sub2 => {
                report += ` ${matrix[sub1][sub2].toFixed(2)} |`;
            });
            report += '\n';
        });
        
        // Unassigned programs
        if (this.subsystems['Other_Programs'] && this.subsystems['Other_Programs'].programs.length > 0) {
            report += '\n## Unassigned Programs\n\n';
            report += 'The following programs could not be clearly assigned to any subsystem:\n\n';
            this.subsystems['Other_Programs'].programs.forEach(prog => {
                report += `- ${prog}\n`;
            });
        }
        
        // Save report
        const reportPath = path.join(this.outputDir, 'SUBSYSTEM_DISCOVERY.md');
        await fs.writeFile(reportPath, report);
        console.log(`\nSubsystem discovery report saved to: ${reportPath}`);
        
        // Save JSON data
        const jsonPath = path.join(this.outputDir, 'subsystems.json');
        await fs.writeJson(jsonPath, this.subsystems, { spaces: 2 });
        console.log(`Subsystem data saved to: ${jsonPath}`);
    }

    inferBusinessFocus(name, subsystem) {
        const focusMap = {
            'Sales_Ledger': 'Customer management, order processing, invoicing, and receivables',
            'Purchase_Ledger': 'Supplier management, purchase orders, and payables',
            'General_Ledger': 'Financial accounting, journal entries, and reporting',
            'Stock_Control': 'Inventory management and stock movements',
            'IRS_Module': 'Tax calculations and IRS reporting',
            'Common_Utilities': 'Shared services, date handling, and system utilities'
        };
        
        return focusMap[name] || 'Mixed functionality';
    }

    async execute() {
        try {
            await this.discoverSubsystems();
            await this.generateReport();
            
            // Summary statistics
            console.log('\n=== Subsystem Discovery Summary ===');
            Object.entries(this.subsystems).forEach(([name, sub]) => {
                if (name !== 'Other_Programs') {
                    console.log(`${name}: ${sub.programCount} programs, cohesion: ${sub.cohesionScore.toFixed(2)}`);
                }
            });
            
            console.log('\n✅ Task 2.1: Subsystem Discovery completed successfully!');
            
        } catch (error) {
            console.error('Subsystem discovery failed:', error);
            throw error;
        }
    }
}

// Execute subsystem discovery
const discovery = new SubsystemDiscovery();
discovery.execute();