const sqlite3 = require('sqlite3').verbose();
const fs = require('fs-extra');
const path = require('path');

async function initializeDatabase() {
    console.log('Initializing enhanced database schema...');
    
    // Create output directories
    const outputDir = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output';
    const dbDir = path.join(outputDir, 'parser_analysis');
    
    await fs.ensureDir(outputDir);
    await fs.ensureDir(dbDir);
    
    // Create database
    const dbPath = path.join(dbDir, 'acas_analysis.sqlite');
    
    // Remove existing database to start fresh
    if (await fs.pathExists(dbPath)) {
        console.log('Removing existing database...');
        await fs.remove(dbPath);
    }
    
    const db = new sqlite3.Database(dbPath);
    
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Read and execute schema
            const schema = fs.readFileSync(path.join(__dirname, 'enhanced_schema.sql'), 'utf8');
            
            // Split by semicolon and execute each statement
            const statements = schema.split(';').filter(stmt => stmt.trim());
            
            let completed = 0;
            statements.forEach((statement, index) => {
                db.run(statement + ';', (err) => {
                    if (err) {
                        console.error(`Error executing statement ${index + 1}:`, err);
                        reject(err);
                    } else {
                        completed++;
                        if (completed === statements.length) {
                            console.log(`✓ Database initialized with ${statements.length} statements`);
                            db.close((err) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(dbPath);
                                }
                            });
                        }
                    }
                });
            });
        });
    });
}

// Run initialization
initializeDatabase()
    .then(dbPath => {
        console.log(`✓ Database created successfully at: ${dbPath}`);
        console.log('✓ Enhanced database schema initialized');
    })
    .catch(err => {
        console.error('Failed to initialize database:', err);
        process.exit(1);
    });