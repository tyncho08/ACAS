const sqlite3 = require('sqlite3').verbose();
const fs = require('fs-extra');
const path = require('path');

class TechnicalDocGenerator {
    constructor(dbPath) {
        this.db = new sqlite3.Database(dbPath);
    }

    async generateAllDocumentation() {
        const outputDir = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output/parser_analysis/docs';
        await fs.ensureDir(outputDir);

        // Get all data
        const programs = await this.getPrograms();
        const calls = await this.getCalls();
        const copies = await this.getCopies();
        const files = await this.getFiles();

        // Generate System Level Report
        await this.generateSystemReport(programs, calls, copies, files, outputDir);
        
        // Generate Program Index
        await this.generateProgramIndex(programs, calls, outputDir);
        
        // Generate Copybook Index
        await this.generateCopybookIndex(copies, outputDir);
        
        console.log('Technical documentation generated successfully!');
    }

    async generateSystemReport(programs, calls, copies, files, outputDir) {
        let report = '# System Level Report\n\n';
        report += `Generated on: ${new Date().toISOString()}\n\n`;
        
        // Executive Summary
        report += '## Executive Summary\n\n';
        report += `The ACAS (Applewood Computers Accounting System) consists of ${programs.length} COBOL programs `;
        report += `organized across multiple functional modules. The system processes business transactions `;
        report += `for sales, purchasing, inventory, and general accounting.\n\n`;
        
        // System Statistics
        report += '## System Statistics\n\n';
        report += `- **Total Programs:** ${programs.length}\n`;
        report += `- **Total CALL Statements:** ${calls.length}\n`;
        report += `- **Total COPY Statements:** ${copies.length}\n`;
        report += `- **Total File Definitions:** ${files.length}\n`;
        report += `- **Programs with Errors:** ${programs.filter(p => p.error_count > 0).length}\n\n`;
        
        // Module Breakdown
        report += '## Module Breakdown\n\n';
        const modules = this.groupProgramsByModule(programs);
        
        for (const [module, progs] of Object.entries(modules)) {
            report += `### ${module}\n`;
            report += `- Programs: ${progs.length}\n`;
            report += `- Key Programs: ${progs.slice(0, 5).map(p => p.file_name).join(', ')}`;
            if (progs.length > 5) report += `, and ${progs.length - 5} more`;
            report += '\n\n';
        }
        
        // Dependency Analysis
        report += '## Dependency Analysis\n\n';
        
        // Most called programs
        const callCounts = {};
        calls.forEach(call => {
            callCounts[call.called_program] = (callCounts[call.called_program] || 0) + 1;
        });
        
        const sortedCalls = Object.entries(callCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
        
        report += '### Most Called Programs\n\n';
        report += '| Program | Call Count | Type |\n';
        report += '|---------|------------|------|\n';
        sortedCalls.forEach(([prog, count]) => {
            const type = this.identifyProgramType(prog);
            report += `| ${prog} | ${count} | ${type} |\n`;
        });
        report += '\n';
        
        // Programs with most dependencies
        const programDeps = {};
        programs.forEach(p => {
            const callCount = calls.filter(c => c.program_file_path === p.file_path).length;
            if (callCount > 0) {
                programDeps[p.file_name] = callCount;
            }
        });
        
        const sortedDeps = Object.entries(programDeps)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
        
        report += '### Programs with Most Dependencies\n\n';
        report += '| Program | Dependencies | Complexity Risk |\n';
        report += '|---------|--------------|----------------|\n';
        sortedDeps.forEach(([prog, count]) => {
            const risk = count > 20 ? 'High' : count > 10 ? 'Medium' : 'Low';
            report += `| ${prog} | ${count} | ${risk} |\n`;
        });
        report += '\n';
        
        // Orphan Programs
        report += '### Orphan Programs (Not Called by Any Other Program)\n\n';
        const calledPrograms = new Set(calls.map(c => c.called_program));
        const orphanPrograms = programs.filter(p => {
            const progId = p.program_id || p.file_name.replace('.cbl', '');
            return !calledPrograms.has(progId) && !p.file_name.includes('.cpy');
        });
        
        report += 'These programs are likely entry points or standalone utilities:\n\n';
        orphanPrograms.slice(0, 20).forEach(p => {
            report += `- **${p.file_name}**${p.program_id ? ` (${p.program_id})` : ''}\n`;
        });
        if (orphanPrograms.length > 20) {
            report += `- ... and ${orphanPrograms.length - 20} more\n`;
        }
        report += '\n';
        
        // Main Entry Points
        report += '### Identified Main Entry Points\n\n';
        const entryPoints = programs.filter(p => 
            p.file_name.match(/^(ACAS|sales|purchase|stock|general|irs)\.cbl$/i) ||
            p.file_name.includes('000.cbl')
        );
        
        report += '| Entry Point | Module | Purpose |\n';
        report += '|-------------|--------|----------|\n';
        entryPoints.forEach(p => {
            const module = this.getModuleForProgram(p);
            const purpose = this.getProgramPurpose(p.file_name);
            report += `| ${p.file_name} | ${module} | ${purpose} |\n`;
        });
        report += '\n';
        
        // Critical Programs
        report += '### Critical Programs\n\n';
        report += 'Programs that are heavily depended upon (called by many others):\n\n';
        
        const criticalThreshold = 5;
        const criticalPrograms = sortedCalls.filter(([prog, count]) => count >= criticalThreshold);
        
        criticalPrograms.forEach(([prog, count]) => {
            report += `- **${prog}**: Called by ${count} programs - `;
            report += `${this.getCriticalityDescription(prog)}\n`;
        });
        
        // Save report
        const reportPath = path.join(outputDir, 'System_Level_Report.md');
        await fs.writeFile(reportPath, report);
        console.log('System level report generated:', reportPath);
    }

    async generateProgramIndex(programs, calls, outputDir) {
        let index = '# Program Index\n\n';
        index += 'Alphabetical index of all COBOL programs in the ACAS system.\n\n';
        
        // Sort programs alphabetically
        const sortedPrograms = [...programs].sort((a, b) => 
            a.file_name.localeCompare(b.file_name)
        );
        
        // Group by first letter
        const grouped = {};
        sortedPrograms.forEach(program => {
            const firstLetter = program.file_name[0].toUpperCase();
            if (!grouped[firstLetter]) {
                grouped[firstLetter] = [];
            }
            grouped[firstLetter].push(program);
        });
        
        // Generate index
        for (const [letter, progs] of Object.entries(grouped)) {
            index += `## ${letter}\n\n`;
            
            progs.forEach(program => {
                const callCount = calls.filter(c => c.program_file_path === program.file_path).length;
                const module = this.getModuleForProgram(program);
                const purpose = this.getProgramPurpose(program.file_name);
                
                index += `### ${program.file_name}\n`;
                index += `- **Program ID:** ${program.program_id || 'N/A'}\n`;
                index += `- **Module:** ${module}\n`;
                index += `- **Purpose:** ${purpose}\n`;
                index += `- **Divisions:** `;
                const divisions = [];
                if (program.has_identification) divisions.push('IDENTIFICATION');
                if (program.has_environment) divisions.push('ENVIRONMENT');
                if (program.has_data) divisions.push('DATA');
                if (program.has_procedure) divisions.push('PROCEDURE');
                index += divisions.join(', ') || 'None detected';
                index += '\n';
                index += `- **Dependencies:** ${callCount} CALL statements\n`;
                index += `- **Status:** ${program.error_count > 0 ? '⚠️ Has parsing errors' : '✓ OK'}\n`;
                index += `- **Analysis:** [View JSON](../../parsed-structures/${program.file_path.replace(/\//g, '_').replace(/\\/g, '_')}.json)\n`;
                index += '\n';
            });
        }
        
        // Save index
        const indexPath = path.join(outputDir, 'Program_Index.md');
        await fs.writeFile(indexPath, index);
        console.log('Program index generated:', indexPath);
    }

    async generateCopybookIndex(copies, outputDir) {
        let index = '# Copybook Index\n\n';
        index += 'Index of all COBOL copybooks and their usage across the system.\n\n';
        
        // Get unique copybooks and their usage
        const copybookUsage = {};
        copies.forEach(copy => {
            if (!copybookUsage[copy.copybook]) {
                copybookUsage[copy.copybook] = [];
            }
            const programName = path.basename(copy.program_file_path);
            if (!copybookUsage[copy.copybook].includes(programName)) {
                copybookUsage[copy.copybook].push(programName);
            }
        });
        
        // Sort copybooks alphabetically
        const sortedCopybooks = Object.keys(copybookUsage).sort();
        
        index += `## Summary\n\n`;
        index += `- **Total Copybooks:** ${sortedCopybooks.length}\n`;
        index += `- **Total Usage References:** ${copies.length}\n`;
        index += `- **Average Usage per Copybook:** ${(copies.length / sortedCopybooks.length).toFixed(1)}\n\n`;
        
        index += '## Copybook Usage Details\n\n';
        
        sortedCopybooks.forEach(copybook => {
            const usage = copybookUsage[copybook];
            const purpose = this.getCopybookPurpose(copybook);
            
            index += `### ${copybook}\n`;
            index += `- **Purpose:** ${purpose}\n`;
            index += `- **Used by ${usage.length} programs:**\n`;
            
            // Sort and list programs
            usage.sort().forEach(prog => {
                index += `  - ${prog}\n`;
            });
            
            index += '\n';
        });
        
        // Most used copybooks
        index += '## Most Used Copybooks\n\n';
        const sortedByUsage = Object.entries(copybookUsage)
            .sort((a, b) => b[1].length - a[1].length)
            .slice(0, 10);
        
        index += '| Copybook | Usage Count | Type |\n';
        index += '|----------|-------------|------|\n';
        sortedByUsage.forEach(([copybook, usage]) => {
            const type = this.getCopybookType(copybook);
            index += `| ${copybook} | ${usage.length} | ${type} |\n`;
        });
        
        // Save index
        const indexPath = path.join(outputDir, 'Copybook_Index.md');
        await fs.writeFile(indexPath, index);
        console.log('Copybook index generated:', indexPath);
    }

    // Helper methods
    groupProgramsByModule(programs) {
        const modules = {
            'Sales': [],
            'Purchase': [],
            'Stock': [],
            'General': [],
            'IRS': [],
            'Common': []
        };
        
        programs.forEach(program => {
            if (program.file_path.includes('/sales/')) modules.Sales.push(program);
            else if (program.file_path.includes('/purchase/')) modules.Purchase.push(program);
            else if (program.file_path.includes('/stock/')) modules.Stock.push(program);
            else if (program.file_path.includes('/general/')) modules.General.push(program);
            else if (program.file_path.includes('/irs/')) modules.IRS.push(program);
            else modules.Common.push(program);
        });
        
        return modules;
    }

    identifyProgramType(programName) {
        if (programName.includes('MT')) return 'Maintenance';
        if (programName.includes('LD')) return 'Load';
        if (programName.includes('UNL')) return 'Unload';
        if (programName.includes('RES')) return 'Restore';
        if (programName.includes('sub')) return 'Subroutine';
        if (programName.match(/^(sl|pl|st|gl|irs)/i)) return 'Business Logic';
        return 'Utility';
    }

    getModuleForProgram(program) {
        if (program.file_path.includes('/sales/')) return 'Sales';
        if (program.file_path.includes('/purchase/')) return 'Purchase';
        if (program.file_path.includes('/stock/')) return 'Stock';
        if (program.file_path.includes('/general/')) return 'General';
        if (program.file_path.includes('/irs/')) return 'IRS';
        return 'Common';
    }

    getProgramPurpose(fileName) {
        const purposes = {
            'ACAS.cbl': 'Main system entry point',
            'sales.cbl': 'Sales module main menu',
            'purchase.cbl': 'Purchase module main menu',
            'stock.cbl': 'Stock control main menu',
            'general.cbl': 'General ledger main menu',
            'irs.cbl': 'IRS reporting main menu'
        };
        
        if (purposes[fileName]) return purposes[fileName];
        
        if (fileName.includes('LD.cbl')) return 'File loading utility';
        if (fileName.includes('UNL.cbl')) return 'File unloading utility';
        if (fileName.includes('RES.cbl')) return 'File restore utility';
        if (fileName.includes('MT.cbl')) return 'File maintenance utility';
        if (fileName.includes('convert')) return 'Data conversion utility';
        
        if (fileName.match(/sl\d{3}\.cbl/)) return 'Sales ledger processing';
        if (fileName.match(/pl\d{3}\.cbl/)) return 'Purchase ledger processing';
        if (fileName.match(/st\d{3}\.cbl/)) return 'Stock control processing';
        if (fileName.match(/gl\d{3}\.cbl/)) return 'General ledger processing';
        if (fileName.match(/irs\d{3}\.cbl/)) return 'IRS reporting processing';
        
        return 'Business processing';
    }

    getCriticalityDescription(programName) {
        const descriptions = {
            'acas005': 'Core date handling routines',
            'acas006': 'System parameter management',
            'acas007': 'File handling utilities',
            'acas008': 'Screen I/O management'
        };
        
        return descriptions[programName] || 'Core system functionality';
    }

    getCopybookPurpose(copybook) {
        const purposes = {
            'screenio.cpy': 'Screen input/output definitions',
            'mysql-variables.cpy': 'MySQL database variables',
            'mysql-procedures.cpy': 'MySQL stored procedure interfaces',
            'MySQL-SQLCA.cpy': 'SQL communication area',
            'FileStat-Msgs.cpy': 'File status message definitions',
            'statcodes.cpy': 'System status code definitions',
            'selprint-2.cpy': 'Report selection and printing',
            'ACCEPTNM.CPY': 'Name acceptance routines'
        };
        
        return purposes[copybook] || 'Common data definitions';
    }

    getCopybookType(copybook) {
        if (copybook.includes('mysql') || copybook.includes('MySQL')) return 'Database';
        if (copybook.includes('screen')) return 'UI';
        if (copybook.includes('stat')) return 'Status';
        if (copybook.includes('print')) return 'Reporting';
        return 'Data';
    }

    // Database methods
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

    close() {
        this.db.close();
    }
}

// Main execution
async function main() {
    const dbPath = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output/parser_analysis/database.sqlite';
    const generator = new TechnicalDocGenerator(dbPath);
    
    try {
        await generator.generateAllDocumentation();
    } catch (error) {
        console.error('Error:', error);
    } finally {
        generator.close();
    }
}

main();