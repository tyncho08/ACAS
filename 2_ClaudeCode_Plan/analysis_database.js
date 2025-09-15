const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs-extra');

/**
 * Analysis Database - Simple, efficient data storage
 * 
 * Uses SQLite for reliable, queryable storage without complexity
 */
class AnalysisDatabase {
    constructor(config = {}) {
        this.config = config;
        this.db = null;
    }

    /**
     * Initialize database with simple schema
     */
    async initialize() {
        // Ensure directory exists
        const dbDir = path.dirname(this.config.dbPath);
        await fs.ensureDir(dbDir);
        
        // Open database
        this.db = new Database(this.config.dbPath);
        
        // Create tables
        this.createTables();
        
        // Prepare statements
        this.prepareStatements();
    }

    /**
     * Create simple, focused tables
     */
    createTables() {
        // Analysis runs
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS analysis_runs (
                id TEXT PRIMARY KEY,
                start_time TEXT NOT NULL,
                end_time TEXT,
                status TEXT NOT NULL,
                config TEXT NOT NULL,
                statistics TEXT,
                validation_summary TEXT
            )
        `);
        
        // Programs
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS programs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                run_id TEXT NOT NULL,
                file_path TEXT NOT NULL,
                program_id TEXT,
                file_hash TEXT NOT NULL,
                parse_confidence REAL,
                metrics TEXT NOT NULL,
                dependencies TEXT,
                ast_path TEXT,
                FOREIGN KEY (run_id) REFERENCES analysis_runs(id),
                UNIQUE(run_id, file_path)
            )
        `);
        
        // Relationships
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS relationships (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                run_id TEXT NOT NULL,
                source_program TEXT NOT NULL,
                target_program TEXT NOT NULL,
                relationship_type TEXT NOT NULL,
                line_number INTEGER,
                FOREIGN KEY (run_id) REFERENCES analysis_runs(id)
            )
        `);
        
        // Validation results
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS validations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                run_id TEXT NOT NULL,
                validation_type TEXT NOT NULL,
                timestamp TEXT NOT NULL,
                valid BOOLEAN NOT NULL,
                details TEXT,
                FOREIGN KEY (run_id) REFERENCES analysis_runs(id)
            )
        `);
        
        // Create indexes
        this.db.exec(`
            CREATE INDEX IF NOT EXISTS idx_programs_run ON programs(run_id);
            CREATE INDEX IF NOT EXISTS idx_programs_id ON programs(program_id);
            CREATE INDEX IF NOT EXISTS idx_relationships_run ON relationships(run_id);
            CREATE INDEX IF NOT EXISTS idx_relationships_source ON relationships(source_program);
            CREATE INDEX IF NOT EXISTS idx_validations_run ON validations(run_id);
        `);
    }

    /**
     * Prepare reusable statements
     */
    prepareStatements() {
        this.statements = {
            insertRun: this.db.prepare(`
                INSERT INTO analysis_runs (id, start_time, status, config)
                VALUES (?, ?, ?, ?)
            `),
            
            updateRun: this.db.prepare(`
                UPDATE analysis_runs 
                SET end_time = ?, status = ?, statistics = ?, validation_summary = ?
                WHERE id = ?
            `),
            
            insertProgram: this.db.prepare(`
                INSERT INTO programs (
                    run_id, file_path, program_id, file_hash, 
                    parse_confidence, metrics, dependencies, ast_path
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `),
            
            insertRelationship: this.db.prepare(`
                INSERT INTO relationships (
                    run_id, source_program, target_program, 
                    relationship_type, line_number
                ) VALUES (?, ?, ?, ?, ?)
            `),
            
            insertValidation: this.db.prepare(`
                INSERT INTO validations (
                    run_id, validation_type, timestamp, valid, details
                ) VALUES (?, ?, ?, ?, ?)
            `)
        };
    }

    /**
     * Store analysis run
     */
    async createAnalysisRun(run) {
        this.statements.insertRun.run(
            run.id,
            run.startTime,
            run.status || 'IN_PROGRESS',
            JSON.stringify(run.config)
        );
    }

    /**
     * Update analysis run
     */
    async updateAnalysisRun(run) {
        this.statements.updateRun.run(
            run.endTime,
            run.status,
            JSON.stringify(run.results.statistics),
            JSON.stringify(run.results.validationSummary),
            run.id
        );
    }

    /**
     * Store program AST
     */
    async storeProgram(runId, ast) {
        const metrics = {
            mccabe: ast.metrics.mccabe,
            cognitive: ast.metrics.cognitive,
            halstead: ast.metrics.halstead,
            maintainability: ast.metrics.maintainability,
            lines: ast.lines
        };
        
        const dependencies = {
            calls: ast.dependencies.calls,
            copies: ast.dependencies.copies,
            performs: ast.dependencies.performs
        };
        
        this.statements.insertProgram.run(
            runId,
            ast.filePath,
            ast.programId,
            ast.fileHash,
            ast.parseConfidence,
            JSON.stringify(metrics),
            JSON.stringify(dependencies),
            ast.astPath || null
        );
        
        // Store relationships
        for (const call of ast.dependencies.calls || []) {
            this.statements.insertRelationship.run(
                runId,
                ast.programId || path.basename(ast.filePath),
                call.target,
                'CALL',
                call.line
            );
        }
        
        for (const copy of ast.dependencies.copies || []) {
            this.statements.insertRelationship.run(
                runId,
                ast.programId || path.basename(ast.filePath),
                copy.name,
                'COPY',
                copy.line
            );
        }
    }

    /**
     * Store relationships
     */
    async storeRelationships(runId, relationships) {
        const transaction = this.db.transaction(() => {
            // Clear existing relationships for this run
            this.db.prepare('DELETE FROM relationships WHERE run_id = ?').run(runId);
            
            // Insert call relationships
            relationships.calls.forEach((targets, source) => {
                targets.forEach(target => {
                    this.statements.insertRelationship.run(
                        runId, source, target, 'CALL', null
                    );
                });
            });
            
            // Insert copy relationships
            relationships.copies.forEach((copybooks, source) => {
                copybooks.forEach(copybook => {
                    this.statements.insertRelationship.run(
                        runId, source, copybook, 'COPY', null
                    );
                });
            });
        });
        
        transaction();
    }

    /**
     * Store validation result
     */
    async storeValidation(runId, validation) {
        this.statements.insertValidation.run(
            runId,
            validation.type,
            validation.timestamp,
            validation.valid ? 1 : 0,
            JSON.stringify(validation.details || {})
        );
    }

    /**
     * Get all programs for a run
     */
    async getPrograms(runId) {
        const rows = this.db.prepare(`
            SELECT * FROM programs WHERE run_id = ?
        `).all(runId);
        
        return rows.map(row => ({
            ...row,
            metrics: JSON.parse(row.metrics),
            dependencies: JSON.parse(row.dependencies)
        }));
    }

    /**
     * Get relationships for a run
     */
    async getRelationships(runId) {
        const rows = this.db.prepare(`
            SELECT * FROM relationships WHERE run_id = ?
        `).all(runId);
        
        // Reconstruct relationship maps
        const relationships = {
            calls: new Map(),
            copies: new Map(),
            calledBy: new Map(),
            copiedBy: new Map()
        };
        
        rows.forEach(row => {
            if (row.relationship_type === 'CALL') {
                // Forward map
                if (!relationships.calls.has(row.source_program)) {
                    relationships.calls.set(row.source_program, []);
                }
                relationships.calls.get(row.source_program).push(row.target_program);
                
                // Reverse map
                if (!relationships.calledBy.has(row.target_program)) {
                    relationships.calledBy.set(row.target_program, []);
                }
                relationships.calledBy.get(row.target_program).push(row.source_program);
                
            } else if (row.relationship_type === 'COPY') {
                // Forward map
                if (!relationships.copies.has(row.source_program)) {
                    relationships.copies.set(row.source_program, []);
                }
                relationships.copies.get(row.source_program).push(row.target_program);
                
                // Reverse map
                if (!relationships.copiedBy.has(row.target_program)) {
                    relationships.copiedBy.set(row.target_program, []);
                }
                relationships.copiedBy.get(row.target_program).push(row.source_program);
            }
        });
        
        return relationships;
    }

    /**
     * Get analysis statistics
     */
    async getStatistics(runId) {
        const programCount = this.db.prepare(
            'SELECT COUNT(*) as count FROM programs WHERE run_id = ?'
        ).get(runId).count;
        
        const avgComplexity = this.db.prepare(`
            SELECT AVG(json_extract(metrics, '$.mccabe')) as avg
            FROM programs 
            WHERE run_id = ?
        `).get(runId).avg;
        
        const relationshipCount = this.db.prepare(
            'SELECT COUNT(*) as count FROM relationships WHERE run_id = ?'
        ).get(runId).count;
        
        return {
            programCount,
            avgComplexity: avgComplexity || 0,
            relationshipCount
        };
    }

    /**
     * Close database connection
     */
    close() {
        if (this.db) {
            this.db.close();
        }
    }
}

module.exports = AnalysisDatabase;