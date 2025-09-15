const sqlite3 = require('sqlite3').verbose();
const fs = require('fs-extra');
const path = require('path');

class SubsystemAnalyzer {
    constructor(dbPath) {
        this.db = new sqlite3.Database(dbPath);
    }

    async analyze() {
        const programs = await this.getPrograms();
        const calls = await this.getCalls();
        const copies = await this.getCopies();
        const files = await this.getFiles();
        
        // Group programs by directory pattern
        const programsByModule = this.groupByModule(programs);
        
        // Analyze connections
        const subsystems = this.identifySubsystems(programsByModule, calls, copies, files);
        
        return subsystems;
    }

    getPrograms() {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM programs", (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    getCalls() {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM program_calls", (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    getCopies() {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM program_copies", (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    getFiles() {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM program_files", (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    groupByModule(programs) {
        const modules = {};
        programs.forEach(program => {
            const pathParts = program.file_path.split('/');
            const module = pathParts[pathParts.length - 2]; // Get directory name
            
            if (!modules[module]) {
                modules[module] = [];
            }
            modules[module].push(program);
        });
        return modules;
    }

    identifySubsystems(programsByModule, calls, copies, files) {
        const subsystems = [];

        // Sales Ledger Subsystem
        if (programsByModule.sales) {
            const slPrograms = programsByModule.sales.filter(p => p.file_name.startsWith('sl'));
            const salesProgram = programsByModule.sales.find(p => p.file_name === 'sales.cbl');
            
            subsystems.push({
                name: 'Sales Ledger Management',
                category: 'Core',
                programs: [...slPrograms, salesProgram].filter(Boolean),
                justification: 'Programs sl000 through sl970 form a cohesive sales ledger system handling customer accounts, invoicing, and receivables. The sales.cbl program serves as the main menu.'
            });
        }

        // Purchase Ledger Subsystem
        if (programsByModule.purchase) {
            const plPrograms = programsByModule.purchase.filter(p => p.file_name.startsWith('pl'));
            const purchaseProgram = programsByModule.purchase.find(p => p.file_name === 'purchase.cbl');
            
            subsystems.push({
                name: 'Purchase Ledger Management',
                category: 'Core',
                programs: [...plPrograms, purchaseProgram].filter(Boolean),
                justification: 'Programs pl000 through pl960 manage supplier accounts, purchase orders, and payables. The purchase.cbl program provides the main menu interface.'
            });
        }

        // Stock Control Subsystem
        if (programsByModule.stock) {
            const stPrograms = programsByModule.stock.filter(p => p.file_name.startsWith('st'));
            const stockProgram = programsByModule.stock.find(p => p.file_name === 'stock.cbl');
            
            subsystems.push({
                name: 'Stock Control System',
                category: 'Core',
                programs: [...stPrograms, stockProgram].filter(Boolean),
                justification: 'Programs st000 through st060 manage inventory levels, stock movements, and warehouse operations. The stock.cbl serves as the main menu.'
            });
        }

        // General Ledger Subsystem
        if (programsByModule.general) {
            const glPrograms = programsByModule.general.filter(p => p.file_name.startsWith('gl'));
            const generalProgram = programsByModule.general.find(p => p.file_name === 'general.cbl');
            
            subsystems.push({
                name: 'General Ledger System',
                category: 'Core',
                programs: [...glPrograms, generalProgram].filter(Boolean),
                justification: 'Programs gl000 through gl120 handle general accounting, journal entries, and financial reporting. The general.cbl provides the main interface.'
            });
        }

        // IRS Reporting Subsystem
        if (programsByModule.irs) {
            const irsPrograms = programsByModule.irs.filter(p => p.file_name.startsWith('irs'));
            
            subsystems.push({
                name: 'IRS Tax Reporting',
                category: 'Supporting',
                programs: irsPrograms,
                justification: 'Programs irs000 through irs090 handle tax reporting and compliance requirements. These support the core accounting functions.'
            });
        }

        // Common Utilities Subsystem
        if (programsByModule.common) {
            // File maintenance utilities
            const fileMaintenancePrograms = programsByModule.common.filter(p => 
                p.file_name.endsWith('LD.cbl') || 
                p.file_name.endsWith('UNL.cbl') || 
                p.file_name.endsWith('RES.cbl') || 
                p.file_name.endsWith('MT.cbl')
            );
            
            subsystems.push({
                name: 'File Maintenance Utilities',
                category: 'Utility',
                programs: fileMaintenancePrograms,
                justification: 'Programs ending in LD/UNL/RES/MT provide file loading, unloading, restore, and maintenance capabilities across all modules.'
            });

            // System utilities
            const systemPrograms = programsByModule.common.filter(p => 
                p.file_name.startsWith('acas') || 
                p.file_name.startsWith('sys') ||
                p.file_name === 'ACAS.cbl'
            );
            
            subsystems.push({
                name: 'System Administration',
                category: 'Utility',
                programs: systemPrograms,
                justification: 'ACAS.cbl and acas000-acas032 programs provide system-wide utilities, configuration, and administration functions.'
            });

            // Conversion utilities
            const conversionPrograms = programsByModule.common.filter(p => 
                p.file_name.includes('convert')
            );
            
            subsystems.push({
                name: 'Data Conversion Tools',
                category: 'Utility',
                programs: conversionPrograms,
                justification: 'Conversion programs (acasconvert1-3, stockconvert2-3) handle data migration and format transformations.'
            });
        }

        return subsystems;
    }

    async generateDiscoveryReport(subsystems) {
        let report = '# SUBSYSTEM DISCOVERY REPORT\n\n';
        report += '## Executive Summary\n\n';
        report += `Total subsystems discovered: ${subsystems.length}\n\n`;
        report += `- Core Subsystems: ${subsystems.filter(s => s.category === 'Core').length}\n`;
        report += `- Supporting Subsystems: ${subsystems.filter(s => s.category === 'Supporting').length}\n`;
        report += `- Utility Subsystems: ${subsystems.filter(s => s.category === 'Utility').length}\n\n`;

        report += '## Discovered Subsystems\n\n';

        for (const subsystem of subsystems) {
            report += `### ${subsystem.name}\n\n`;
            report += `**Category:** ${subsystem.category}\n\n`;
            report += `**Justification:** ${subsystem.justification}\n\n`;
            report += `**Main Programs:**\n`;
            
            subsystem.programs.forEach(program => {
                report += `- ${program.file_name}${program.program_id ? ` (${program.program_id})` : ''}\n`;
            });
            
            report += '\n';
        }

        // Add dependency analysis
        report += '## Cross-Subsystem Dependencies\n\n';
        
        const calls = await this.getCalls();
        const crossSubsystemCalls = this.analyzeCrossSubsystemCalls(subsystems, calls);
        
        for (const [key, value] of Object.entries(crossSubsystemCalls)) {
            report += `### ${key}\n`;
            value.forEach(call => {
                report += `- ${call}\n`;
            });
            report += '\n';
        }

        return report;
    }

    analyzeCrossSubsystemCalls(subsystems, calls) {
        const crossCalls = {};
        
        calls.forEach(call => {
            const callerSubsystem = this.findSubsystemForProgram(call.program_file_path, subsystems);
            const calledProgram = call.called_program;
            
            if (callerSubsystem) {
                const key = callerSubsystem.name;
                if (!crossCalls[key]) {
                    crossCalls[key] = [];
                }
                if (!crossCalls[key].includes(`Calls ${calledProgram}`)) {
                    crossCalls[key].push(`Calls ${calledProgram}`);
                }
            }
        });
        
        return crossCalls;
    }

    findSubsystemForProgram(filePath, subsystems) {
        for (const subsystem of subsystems) {
            if (subsystem.programs.find(p => p.file_path === filePath)) {
                return subsystem;
            }
        }
        return null;
    }

    close() {
        this.db.close();
    }
}

// Main execution
async function main() {
    const dbPath = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output/parser_analysis/database.sqlite';
    const analyzer = new SubsystemAnalyzer(dbPath);
    
    try {
        console.log('Analyzing subsystems...');
        const subsystems = await analyzer.analyze();
        
        console.log('Generating discovery report...');
        const report = await analyzer.generateDiscoveryReport(subsystems);
        
        // Save report
        const reportPath = '/Users/MartinGonella/Desktop/Demos/ACAS/SUBSYSTEM_DISCOVERY.md';
        await fs.writeFile(reportPath, report);
        console.log(`Discovery report saved to: ${reportPath}`);
        
        // Save subsystems data for next tasks
        const subsystemsDataPath = '/Users/MartinGonella/Desktop/Demos/ACAS/subsystems.json';
        await fs.writeJson(subsystemsDataPath, subsystems, { spaces: 2 });
        console.log(`Subsystems data saved to: ${subsystemsDataPath}`);
        
    } catch (error) {
        console.error('Error:', error);
    } finally {
        analyzer.close();
    }
}

main();