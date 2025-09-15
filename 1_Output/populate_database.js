const sqlite3 = require('sqlite3').verbose();
const fs = require('fs-extra');
const path = require('path');

class DatabasePopulator {
    constructor() {
        this.dbPath = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output/parser_analysis/acas_analysis.sqlite';
        this.parsedDir = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output/parsed_ast';
        this.db = null;
        this.stats = {
            programs: 0,
            calls: 0,
            copybooks: 0,
            files: 0,
            sections: 0,
            businessRules: 0,
            dataFlows: 0
        };
    }

    async initialize() {
        console.log('Initializing database population...\n');
        this.db = new sqlite3.Database(this.dbPath);
        
        // Enable foreign keys
        await this.runQuery('PRAGMA foreign_keys = ON');
    }

    runQuery(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function(err) {
                if (err) reject(err);
                else resolve(this);
            });
        });
    }

    async processJsonFile(jsonPath) {
        try {
            const data = await fs.readJson(jsonPath);
            
            // Insert program record
            await this.insertProgram(data);
            
            // Insert related data
            await this.insertCalls(data);
            await this.insertCopybooks(data);
            await this.insertSections(data);
            await this.insertBusinessRules(data);
            await this.insertDataFlows(data);
            await this.insertFileOperations(data);
            
        } catch (error) {
            console.error(`Error processing ${path.basename(jsonPath)}:`, error.message);
        }
    }

    async insertProgram(data) {
        const sql = `
            INSERT OR REPLACE INTO programs (
                file_path, file_name, program_id, program_type,
                parse_confidence, mccabe_complexity, cognitive_complexity,
                maintainability_index, total_lines, executable_lines, comment_lines,
                has_sql, has_cics, parse_timestamp, parser_used,
                validation_status, ast_node_count, has_identification,
                has_environment, has_data, has_procedure
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        const programType = this.determineProgramType(data);
        const astNodeCount = this.calculateAstNodes(data);
        
        await this.runQuery(sql, [
            data.filePath,
            data.fileName,
            data.programId,
            programType,
            data.parseConfidence || 1.0,
            data.complexity?.mccabe || 1,
            data.complexity?.cognitive || 0,
            data.complexity?.maintainabilityIndex || 50,
            data.complexity?.lines?.total || 0,
            data.complexity?.lines?.executable || 0,
            data.complexity?.lines?.comments || 0,
            data.sql?.hasSQL ? 1 : 0,
            data.cics?.hasCICS ? 1 : 0,
            data.timestamp,
            data.parserUsed || 'GnuCOBOL',
            data.validationStatus || 'VALID',
            astNodeCount,
            data.divisions?.identification ? 1 : 0,
            data.divisions?.environment ? 1 : 0,
            data.divisions?.data ? 1 : 0,
            data.divisions?.procedure ? 1 : 0
        ]);
        
        this.stats.programs++;
    }

    async insertCalls(data) {
        if (!data.dependencies?.calls) return;
        
        const sql = `
            INSERT INTO program_calls (
                caller_program_id, caller_file_path, called_program_id,
                call_type, line_number, using_params
            ) VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        for (const call of data.dependencies.calls) {
            await this.runQuery(sql, [
                data.programId,
                data.filePath,
                call.target,
                call.type || 'STATIC',
                call.line,
                JSON.stringify(call.using || [])
            ]);
            this.stats.calls++;
        }
    }

    async insertCopybooks(data) {
        if (!data.dependencies?.copies) return;
        
        const sql = `
            INSERT INTO copybook_usage (
                program_file_path, copybook_name, line_number, replacing_clause
            ) VALUES (?, ?, ?, ?)
        `;
        
        for (const copy of data.dependencies.copies) {
            await this.runQuery(sql, [
                data.filePath,
                copy.name,
                copy.line,
                copy.replacing
            ]);
            this.stats.copybooks++;
        }
    }

    async insertSections(data) {
        if (!data.structure?.sections) return;
        
        const sql = `
            INSERT INTO code_sections (
                program_id, file_path, section_type, section_name,
                start_line, performs_count
            ) VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        for (const section of data.structure.sections) {
            await this.runQuery(sql, [
                data.programId,
                data.filePath,
                'SECTION',
                section.name,
                section.line,
                0
            ]);
            this.stats.sections++;
        }
        
        // Also insert paragraphs
        if (data.structure?.paragraphs) {
            for (const para of data.structure.paragraphs) {
                await this.runQuery(sql, [
                    data.programId,
                    data.filePath,
                    'PARAGRAPH',
                    para.name,
                    para.line,
                    0
                ]);
                this.stats.sections++;
            }
        }
    }

    async insertBusinessRules(data) {
        if (!data.businessLogic?.conditions) return;
        
        const sql = `
            INSERT INTO business_rules (
                program_id, file_path, rule_type, line_number,
                condition_text, complexity_contribution
            ) VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        for (const condition of data.businessLogic.conditions) {
            await this.runQuery(sql, [
                data.programId,
                data.filePath,
                'DECISION',
                condition.line,
                condition.condition,
                1
            ]);
            this.stats.businessRules++;
        }
    }

    async insertDataFlows(data) {
        if (!data.dataFlow?.moves) return;
        
        const sql = `
            INSERT INTO data_flows (
                program_id, file_path, source_field, target_field,
                line_number, flow_type
            ) VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        for (const move of data.dataFlow.moves) {
            await this.runQuery(sql, [
                data.programId,
                data.filePath,
                move.from,
                move.to,
                move.line,
                'MOVE'
            ]);
            this.stats.dataFlows++;
        }
        
        // Also insert computes
        if (data.dataFlow?.computes) {
            for (const compute of data.dataFlow.computes) {
                await this.runQuery(sql, [
                    data.programId,
                    data.filePath,
                    compute.expression,
                    compute.target,
                    compute.line,
                    'COMPUTE'
                ]);
                this.stats.dataFlows++;
            }
        }
    }

    async insertFileOperations(data) {
        if (!data.dataFlow?.files) return;
        
        const sql = `
            INSERT INTO file_operations (
                program_id, file_path, logical_file_name, physical_file_name,
                organization, operations
            ) VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        for (const file of data.dataFlow.files) {
            await this.runQuery(sql, [
                data.programId,
                data.filePath,
                file.logicalName,
                file.physicalName,
                'SEQUENTIAL', // Default, would need more parsing for actual org
                JSON.stringify(['OPEN', 'READ', 'WRITE', 'CLOSE']) // Default ops
            ]);
            this.stats.files++;
        }
    }

    determineProgramType(data) {
        if (data.cics?.hasCICS) return 'ONLINE';
        if (data.fileName.match(/[89]\d{2}\.cbl$/)) return 'BATCH';
        if (data.structure?.entryPoints?.length > 1) return 'SUBROUTINE';
        if (data.fileName.match(/^(sales|purchase|stock|general|irs|ACAS)\.cbl$/)) return 'MAIN';
        return 'SUBROUTINE';
    }

    calculateAstNodes(data) {
        let count = 0;
        if (data.structure?.sections) count += data.structure.sections.length;
        if (data.structure?.paragraphs) count += data.structure.paragraphs.length;
        if (data.dependencies?.calls) count += data.dependencies.calls.length;
        if (data.dependencies?.performs) count += data.dependencies.performs.length;
        return count;
    }

    async populateDatabase() {
        await this.initialize();
        
        // Get all JSON files
        const files = await fs.readdir(this.parsedDir);
        const jsonFiles = files.filter(f => f.endsWith('.json'));
        
        console.log(`Found ${jsonFiles.length} JSON files to process\n`);
        
        // Process each file
        for (let i = 0; i < jsonFiles.length; i++) {
            if (i % 50 === 0) {
                console.log(`Processing: ${i}/${jsonFiles.length} (${(i/jsonFiles.length*100).toFixed(1)}%)`);
            }
            
            const jsonPath = path.join(this.parsedDir, jsonFiles[i]);
            await this.processJsonFile(jsonPath);
        }
        
        console.log(`\nProcessing complete!`);
        console.log('\nDatabase Population Statistics:');
        console.log(`- Programs inserted: ${this.stats.programs}`);
        console.log(`- Call relationships: ${this.stats.calls}`);
        console.log(`- Copybook usages: ${this.stats.copybooks}`);
        console.log(`- Code sections: ${this.stats.sections}`);
        console.log(`- Business rules: ${this.stats.businessRules}`);
        console.log(`- Data flows: ${this.stats.dataFlows}`);
        console.log(`- File operations: ${this.stats.files}`);
        
        // Close database
        this.db.close();
    }
}

// Execute population
const populator = new DatabasePopulator();
populator.populateDatabase()
    .then(() => {
        console.log('\n✅ Database population completed successfully!');
    })
    .catch(err => {
        console.error('Database population failed:', err);
        process.exit(1);
    });