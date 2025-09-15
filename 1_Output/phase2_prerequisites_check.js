const sqlite3 = require('sqlite3').verbose();
const fs = require('fs-extra');
const path = require('path');

async function checkPhase2Prerequisites() {
    console.log('=== Phase 2 Prerequisites Check ===\n');
    
    const dbPath = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output/parser_analysis/acas_analysis.sqlite';
    const phase1Report = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output/PHASE1_COMPLETION_REPORT.md';
    
    let allChecksPassed = true;
    
    // Check 1: Phase 1 validation report exists and shows success
    console.log('1. Checking Phase 1 completion report...');
    if (await fs.pathExists(phase1Report)) {
        const reportContent = await fs.readFile(phase1Report, 'utf8');
        if (reportContent.includes('COMPLETED') && reportContent.includes('✅')) {
            console.log('   ✅ Phase 1 report shows SUCCESS');
        } else {
            console.log('   ❌ Phase 1 report does not show success');
            allChecksPassed = false;
        }
    } else {
        console.log('   ❌ Phase 1 completion report not found');
        allChecksPassed = false;
    }
    
    // Check 2: Database has actual parsed data
    console.log('\n2. Checking database for parsed data...');
    const db = new sqlite3.Database(dbPath);
    
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // Check programs table
            db.get('SELECT COUNT(*) as count FROM programs', (err, row) => {
                if (err) {
                    console.log('   ❌ Error accessing programs table:', err);
                    allChecksPassed = false;
                } else if (row.count > 0) {
                    console.log(`   ✅ Programs table has ${row.count} entries`);
                } else {
                    console.log('   ❌ Programs table is empty');
                    allChecksPassed = false;
                }
            });
            
            // Check program_calls table
            db.get('SELECT COUNT(*) as count FROM program_calls', (err, row) => {
                if (err) {
                    console.log('   ❌ Error accessing program_calls table:', err);
                    allChecksPassed = false;
                } else if (row.count > 0) {
                    console.log(`   ✅ Program calls table has ${row.count} entries`);
                } else {
                    console.log('   ❌ Program calls table is empty');
                    allChecksPassed = false;
                }
            });
            
            // Check business_rules table
            db.get('SELECT COUNT(*) as count FROM business_rules', (err, row) => {
                if (err) {
                    console.log('   ❌ Error accessing business_rules table:', err);
                    allChecksPassed = false;
                } else {
                    console.log(`   ✅ Business rules table ready (${row.count} entries)`);
                }
            });
            
            // Check data_flows table
            db.get('SELECT COUNT(*) as count FROM data_flows', (err, row) => {
                if (err) {
                    console.log('   ❌ Error accessing data_flows table:', err);
                    allChecksPassed = false;
                } else {
                    console.log(`   ✅ Data flows table ready (${row.count} entries)`);
                }
            });
            
            // Check parsed AST files
            console.log('\n3. Checking parsed AST files...');
            fs.readdir('/Users/MartinGonella/Desktop/Demos/ACAS/1_Output/parsed_ast')
                .then(files => {
                    const jsonFiles = files.filter(f => f.endsWith('.json'));
                    if (jsonFiles.length > 400) {
                        console.log(`   ✅ Found ${jsonFiles.length} parsed AST files`);
                    } else {
                        console.log(`   ❌ Only ${jsonFiles.length} AST files found (expected 400+)`);
                        allChecksPassed = false;
                    }
                    
                    // Final result
                    console.log('\n=== Prerequisites Check Result ===');
                    if (allChecksPassed) {
                        console.log('✅ ALL CHECKS PASSED - Ready to proceed with Phase 2');
                    } else {
                        console.log('❌ SOME CHECKS FAILED - Please fix Phase 1 issues first');
                    }
                    
                    db.close();
                    resolve(allChecksPassed);
                })
                .catch(err => {
                    console.log('   ❌ Error checking AST files:', err);
                    db.close();
                    resolve(false);
                });
        });
    });
}

// Run the check
checkPhase2Prerequisites()
    .then(passed => {
        if (passed) {
            console.log('\n✅ Phase 2 can now begin!');
            process.exit(0);
        } else {
            console.log('\n❌ Cannot proceed to Phase 2 - fix issues first');
            process.exit(1);
        }
    })
    .catch(err => {
        console.error('Prerequisites check failed:', err);
        process.exit(1);
    });