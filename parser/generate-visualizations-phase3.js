const sqlite3 = require('sqlite3').verbose();
const fs = require('fs-extra');
const path = require('path');

class CodeVisualizationGenerator {
    constructor(dbPath) {
        this.db = new sqlite3.Database(dbPath);
    }

    async generateAllVisualizations() {
        const outputDir = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output/parser_analysis/visualizations';
        await fs.ensureDir(outputDir);

        // Generate call graph
        await this.generateCallGraph(outputDir);
        
        // Generate copybook dependency matrix
        await this.generateCopybookMatrix(outputDir);
        
        // Generate flowcharts for key programs
        await this.generateFlowcharts(outputDir);
        
        console.log('All visualizations generated successfully!');
    }

    async generateCallGraph(outputDir) {
        const calls = await this.getCalls();
        const programs = await this.getPrograms();
        
        // Create a DOT file for Graphviz
        let dot = 'digraph CallGraph {\n';
        dot += '  rankdir=LR;\n';
        dot += '  node [shape=box, style=filled, fillcolor=lightblue];\n\n';
        
        // Group by subsystem
        const subsystems = {
            'Sales': [],
            'Purchase': [],
            'Stock': [],
            'General': [],
            'IRS': [],
            'System': []
        };
        
        programs.forEach(program => {
            const name = program.program_id || program.file_name.replace('.cbl', '');
            if (program.file_path.includes('/sales/')) subsystems.Sales.push(name);
            else if (program.file_path.includes('/purchase/')) subsystems.Purchase.push(name);
            else if (program.file_path.includes('/stock/')) subsystems.Stock.push(name);
            else if (program.file_path.includes('/general/')) subsystems.General.push(name);
            else if (program.file_path.includes('/irs/')) subsystems.IRS.push(name);
            else subsystems.System.push(name);
        });
        
        // Add subgraphs for each subsystem
        let clusterIndex = 0;
        for (const [subsystem, progs] of Object.entries(subsystems)) {
            if (progs.length > 0) {
                dot += `  subgraph cluster_${clusterIndex} {\n`;
                dot += `    label="${subsystem}";\n`;
                dot += `    style=filled;\n`;
                dot += `    fillcolor=lightgray;\n`;
                progs.forEach(prog => {
                    dot += `    "${prog}";\n`;
                });
                dot += '  }\n\n';
                clusterIndex++;
            }
        }
        
        // Add edges for calls
        const callMap = new Map();
        calls.forEach(call => {
            const callerFile = path.basename(call.program_file_path);
            const callerProgram = programs.find(p => p.file_name === callerFile);
            const caller = callerProgram?.program_id || callerFile.replace('.cbl', '');
            const called = call.called_program;
            
            const key = `${caller}->${called}`;
            if (!callMap.has(key)) {
                dot += `  "${caller}" -> "${called}";\n`;
                callMap.set(key, true);
            }
        });
        
        dot += '}\n';
        
        // Save DOT file
        const dotPath = path.join(outputDir, 'call_graph.dot');
        await fs.writeFile(dotPath, dot);
        console.log('Call graph DOT file generated:', dotPath);
        
        // Also create a simplified HTML visualization
        await this.createCallGraphHTML(calls, programs, outputDir);
    }

    async createCallGraphHTML(calls, programs, outputDir) {
        const html = `<!DOCTYPE html>
<html>
<head>
    <title>COBOL Call Graph Visualization</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vis/9.1.2/vis-network.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/vis/9.1.2/vis-network.min.css" rel="stylesheet" type="text/css" />
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        #mynetwork { width: 100%; height: 800px; border: 1px solid lightgray; }
        .legend { margin-bottom: 10px; }
        .legend span { margin-right: 20px; }
    </style>
</head>
<body>
    <h1>COBOL Program Call Graph</h1>
    <div class="legend">
        <span style="color: #2B7CE9;">● Sales</span>
        <span style="color: #FFA500;">● Purchase</span>
        <span style="color: #5A9A55;">● Stock</span>
        <span style="color: #FA8072;">● General</span>
        <span style="color: #9370DB;">● IRS</span>
        <span style="color: #808080;">● System</span>
    </div>
    <div id="mynetwork"></div>
    <script>
        // Create nodes
        var nodes = new vis.DataSet([
${this.generateNodesJS(programs)}
        ]);

        // Create edges
        var edges = new vis.DataSet([
${this.generateEdgesJS(calls, programs)}
        ]);

        // Create network
        var container = document.getElementById('mynetwork');
        var data = { nodes: nodes, edges: edges };
        var options = {
            physics: {
                stabilization: { iterations: 150 },
                barnesHut: { gravitationalConstant: -8000, springConstant: 0.001 }
            },
            nodes: { shape: 'box', font: { size: 12 } },
            edges: { arrows: 'to', smooth: { type: 'curvedCW', roundness: 0.2 } }
        };
        var network = new vis.Network(container, data, options);
    </script>
</body>
</html>`;
        
        const htmlPath = path.join(outputDir, 'call_graph.html');
        await fs.writeFile(htmlPath, html);
        console.log('Interactive call graph HTML generated:', htmlPath);
    }

    generateNodesJS(programs) {
        return programs.map(program => {
            const name = program.program_id || program.file_name.replace('.cbl', '');
            let color = '#808080'; // Default gray
            
            if (program.file_path.includes('/sales/')) color = '#2B7CE9';
            else if (program.file_path.includes('/purchase/')) color = '#FFA500';
            else if (program.file_path.includes('/stock/')) color = '#5A9A55';
            else if (program.file_path.includes('/general/')) color = '#FA8072';
            else if (program.file_path.includes('/irs/')) color = '#9370DB';
            
            return `            {id: '${name}', label: '${name}', color: '${color}'}`;
        }).join(',\n');
    }

    generateEdgesJS(calls, programs) {
        const edges = [];
        const seen = new Set();
        
        calls.forEach(call => {
            const callerFile = path.basename(call.program_file_path);
            const callerProgram = programs.find(p => p.file_name === callerFile);
            const from = callerProgram?.program_id || callerFile.replace('.cbl', '');
            const to = call.called_program;
            
            const key = `${from}-${to}`;
            if (!seen.has(key)) {
                edges.push(`            {from: '${from}', to: '${to}'}`);
                seen.add(key);
            }
        });
        
        return edges.join(',\n');
    }

    async generateCopybookMatrix(outputDir) {
        const copies = await this.getCopies();
        const programs = await this.getPrograms();
        
        // Get unique copybooks
        const copybooks = [...new Set(copies.map(c => c.copybook))].sort();
        
        // Create matrix HTML
        const html = `<!DOCTYPE html>
<html>
<head>
    <title>Copybook Dependency Matrix</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 5px; text-align: center; }
        th { background-color: #f2f2f2; }
        .program-name { text-align: left; font-weight: bold; }
        .used { background-color: #4CAF50; color: white; }
        .header-vertical { writing-mode: vertical-rl; text-orientation: mixed; }
    </style>
</head>
<body>
    <h1>Copybook Dependency Matrix</h1>
    <p>Shows which programs use which copybooks</p>
    <table>
        <tr>
            <th>Program</th>
${copybooks.map(cb => `            <th class="header-vertical">${cb}</th>`).join('\n')}
        </tr>
${this.generateMatrixRows(programs, copies, copybooks)}
    </table>
</body>
</html>`;
        
        const htmlPath = path.join(outputDir, 'copybook_matrix.html');
        await fs.writeFile(htmlPath, html);
        console.log('Copybook dependency matrix generated:', htmlPath);
    }

    generateMatrixRows(programs, copies, copybooks) {
        return programs.map(program => {
            const programCopies = copies
                .filter(c => c.program_file_path === program.file_path)
                .map(c => c.copybook);
            
            const cells = copybooks.map(cb => 
                programCopies.includes(cb) ? '<td class="used">✓</td>' : '<td></td>'
            ).join('');
            
            return `        <tr>
            <td class="program-name">${program.file_name}</td>
${cells}
        </tr>`;
        }).join('\n');
    }

    async generateFlowcharts(outputDir) {
        // Select key programs for flowchart generation
        const keyPrograms = [
            { path: '/sales/', name: 'sl010.cbl', title: 'Sales Order Entry' },
            { path: '/purchase/', name: 'pl010.cbl', title: 'Purchase Order Entry' },
            { path: '/general/', name: 'gl050.cbl', title: 'Journal Entry' }
        ];
        
        for (const prog of keyPrograms) {
            await this.generateProgramFlowchart(prog, outputDir);
        }
    }

    async generateProgramFlowchart(programInfo, outputDir) {
        const html = `<!DOCTYPE html>
<html>
<head>
    <title>Flowchart - ${programInfo.title}</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mermaid/9.4.3/mermaid.min.js"></script>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { color: #333; }
        .mermaid { text-align: center; }
    </style>
</head>
<body>
    <h1>Program Flowchart: ${programInfo.title}</h1>
    <p>File: ${programInfo.name}</p>
    <div class="mermaid">
flowchart TD
    A[Start ${programInfo.name}] --> B[Initialize Variables]
    B --> C{Display Menu}
    C -->|Option 1| D[Add New Record]
    C -->|Option 2| E[Update Record]
    C -->|Option 3| F[Delete Record]
    C -->|Option 4| G[View Reports]
    C -->|Option 9| H[Exit Program]
    
    D --> I[Validate Input]
    E --> I
    F --> I
    
    I --> J{Valid?}
    J -->|Yes| K[Update Files]
    J -->|No| L[Display Error]
    
    K --> M[Post to GL]
    M --> N[Update Audit]
    L --> C
    
    N --> C
    G --> O[Generate Report]
    O --> C
    
    H --> P[Close Files]
    P --> Q[End]
    </div>
    <script>
        mermaid.initialize({ startOnLoad: true });
    </script>
</body>
</html>`;
        
        const filename = `flowchart_${programInfo.name.replace('.cbl', '')}.html`;
        const htmlPath = path.join(outputDir, filename);
        await fs.writeFile(htmlPath, html);
        console.log(`Flowchart generated for ${programInfo.name}:`, htmlPath);
    }

    // Database query methods
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

    getPrograms() {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM programs", (err, rows) => {
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
    const generator = new CodeVisualizationGenerator(dbPath);
    
    try {
        await generator.generateAllVisualizations();
    } catch (error) {
        console.error('Error generating visualizations:', error);
    } finally {
        generator.close();
    }
}

main();