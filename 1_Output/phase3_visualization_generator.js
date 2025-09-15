const fs = require('fs-extra');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const { execSync } = require('child_process');

class Phase3VisualizationGenerator {
    constructor() {
        this.dbPath = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output/parser_analysis/acas_analysis.sqlite';
        this.outputDir = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output/phase3_visualizations';
        this.db = null;
        this.stats = {
            totalPrograms: 0,
            totalCalls: 0,
            missingTargets: [],
            circularDependencies: [],
            isolatedPrograms: []
        };
    }

    async initialize() {
        await fs.ensureDir(this.outputDir);
        await fs.ensureDir(path.join(this.outputDir, 'control_flow'));
        
        this.db = new sqlite3.Database(this.dbPath);
        
        console.log('Phase 3 Visualization Generator initialized');
        console.log('Task 3.1: Accurate Code Visualization\n');
    }

    async generateCallGraph() {
        console.log('1. Generating Complete Call Graph...');
        
        // Get all programs
        const programs = await this.query(`
            SELECT DISTINCT program_id, program_type, file_path, mccabe_complexity
            FROM programs 
            WHERE program_id IS NOT NULL
        `);
        
        // Get all calls with counts
        const calls = await this.query(`
            SELECT caller_program_id, called_program_id, call_type, line_number,
                   COUNT(*) as call_count
            FROM program_calls 
            GROUP BY caller_program_id, called_program_id, call_type
        `);
        
        this.stats.totalPrograms = programs.length;
        this.stats.totalCalls = calls.length;
        
        // Find missing targets
        const programIds = new Set(programs.map(p => p.program_id));
        calls.forEach(call => {
            if (!programIds.has(call.called_program_id)) {
                this.stats.missingTargets.push({
                    target: call.called_program_id,
                    caller: call.caller_program_id,
                    count: call.call_count
                });
            }
        });
        
        // Find circular dependencies
        await this.findCircularDependencies(calls);
        
        // Find isolated programs
        const callers = new Set(calls.map(c => c.caller_program_id));
        const called = new Set(calls.map(c => c.called_program_id));
        programs.forEach(prog => {
            if (!callers.has(prog.program_id) && !called.has(prog.program_id)) {
                this.stats.isolatedPrograms.push(prog.program_id);
            }
        });
        
        // Generate DOT file
        let dot = 'digraph CallGraph {\n';
        dot += '    rankdir=LR;\n';
        dot += '    node [fontname="Arial", fontsize=10];\n';
        dot += '    edge [fontname="Arial", fontsize=8];\n\n';
        
        // Add legend
        dot += '    subgraph cluster_legend {\n';
        dot += '        label="Legend";\n';
        dot += '        style=filled;\n';
        dot += '        color=lightgrey;\n';
        dot += '        node [shape=plaintext];\n';
        dot += '        legend [label=<\n';
        dot += '            <TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">\n';
        dot += '                <TR><TD BGCOLOR="lightblue">MAIN Program</TD></TR>\n';
        dot += '                <TR><TD BGCOLOR="lightgreen">SUB Program</TD></TR>\n';
        dot += '                <TR><TD BGCOLOR="lightyellow">BATCH Program</TD></TR>\n';
        dot += '                <TR><TD BGCOLOR="lightcoral">Missing Target</TD></TR>\n';
        dot += '                <TR><TD>Solid Line = STATIC Call</TD></TR>\n';
        dot += '                <TR><TD>Dashed Line = DYNAMIC Call</TD></TR>\n';
        dot += '            </TABLE>\n';
        dot += '        >];\n';
        dot += '    }\n\n';
        
        // Add nodes with appropriate styling
        programs.forEach(prog => {
            let shape = 'box';
            let style = 'filled';
            let fillcolor = 'lightgray';
            
            if (prog.program_type === 'MAIN') {
                fillcolor = 'lightblue';
            } else if (prog.program_type === 'SUB') {
                shape = 'ellipse';
                fillcolor = 'lightgreen';
            } else if (prog.program_type === 'BATCH' || prog.program_id.match(/^[89]\d{2}/)) {
                shape = 'hexagon';
                fillcolor = 'lightyellow';
            }
            
            // Add complexity to label
            const complexity = prog.mccabe_complexity || 0;
            const label = `${prog.program_id}\\nComplexity: ${complexity}`;
            
            dot += `    "${prog.program_id}" [shape=${shape}, style="${style}", fillcolor="${fillcolor}", label="${label}"];\n`;
        });
        
        // Add missing targets
        const missingSet = new Set(this.stats.missingTargets.map(m => m.target));
        missingSet.forEach(missing => {
            dot += `    "${missing}" [shape=box, style="filled,dashed", fillcolor="lightcoral", label="${missing}\\n(NOT FOUND)"];\n`;
        });
        
        dot += '\n';
        
        // Add edges with styling based on call type and frequency
        calls.forEach(call => {
            const style = call.call_type === 'DYNAMIC' ? 'dashed' : 'solid';
            const width = Math.min(5, Math.max(1, call.call_count / 10));
            const color = missingSet.has(call.called_program_id) ? 'red' : 'black';
            
            dot += `    "${call.caller_program_id}" -> "${call.called_program_id}" [style="${style}", penwidth=${width}, color="${color}", label="${call.call_count}"];\n`;
        });
        
        dot += '}\n';
        
        // Save DOT file
        const dotPath = path.join(this.outputDir, 'call_graph_complete.dot');
        await fs.writeFile(dotPath, dot);
        console.log(`  ✓ Generated: call_graph_complete.dot`);
        
        // Try to generate SVG if graphviz is available
        try {
            execSync(`dot -Tsvg ${dotPath} -o ${dotPath.replace('.dot', '.svg')}`, { stdio: 'ignore' });
            console.log(`  ✓ Generated: call_graph_complete.svg`);
        } catch (e) {
            console.log('  ⚠ Graphviz not available - SVG generation skipped');
        }
        
        // Generate interactive HTML version
        await this.generateInteractiveCallGraph(programs, calls);
        
        return this.stats;
    }

    async generateInteractiveCallGraph(programs, calls) {
        const html = `<!DOCTYPE html>
<html>
<head>
    <title>ACAS Call Graph - Interactive</title>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
        #graph { width: 100%; height: 100vh; }
        .node { cursor: pointer; }
        .node circle { stroke: #333; stroke-width: 2px; }
        .node text { font-size: 10px; }
        .link { fill: none; stroke: #999; stroke-opacity: 0.6; }
        .link.dynamic { stroke-dasharray: 5,5; }
        .link.missing { stroke: red; }
        #info { position: absolute; top: 10px; right: 10px; background: white; 
                padding: 10px; border: 1px solid #ccc; border-radius: 5px; }
        .legend { position: absolute; bottom: 10px; left: 10px; background: white; 
                  padding: 10px; border: 1px solid #ccc; border-radius: 5px; }
    </style>
</head>
<body>
    <div id="graph"></div>
    <div id="info">
        <h3>Call Graph Statistics</h3>
        <p>Total Programs: ${programs.length}</p>
        <p>Total Calls: ${calls.length}</p>
        <p>Missing Targets: ${this.stats.missingTargets.length}</p>
        <p>Isolated Programs: ${this.stats.isolatedPrograms.length}</p>
    </div>
    <div class="legend">
        <h4>Legend</h4>
        <svg width="150" height="120">
            <circle cx="10" cy="10" r="8" fill="lightblue" stroke="#333" stroke-width="2"/>
            <text x="25" y="15">MAIN Program</text>
            <circle cx="10" cy="30" r="8" fill="lightgreen" stroke="#333" stroke-width="2"/>
            <text x="25" y="35">SUB Program</text>
            <circle cx="10" cy="50" r="8" fill="lightyellow" stroke="#333" stroke-width="2"/>
            <text x="25" y="55">BATCH Program</text>
            <circle cx="10" cy="70" r="8" fill="lightcoral" stroke="#333" stroke-width="2"/>
            <text x="25" y="75">Missing</text>
            <line x1="5" y1="90" x2="25" y2="90" stroke="#999" stroke-width="2"/>
            <text x="30" y="95">STATIC Call</text>
            <line x1="5" y1="105" x2="25" y2="105" stroke="#999" stroke-width="2" stroke-dasharray="5,5"/>
            <text x="30" y="110">DYNAMIC Call</text>
        </svg>
    </div>
    
    <script>
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        const svg = d3.select("#graph")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
            
        const g = svg.append("g");
        
        // Enable zoom
        const zoom = d3.zoom()
            .scaleExtent([0.1, 10])
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
            });
            
        svg.call(zoom);
        
        // Data
        const nodes = ${JSON.stringify(programs.map(p => ({
            id: p.program_id,
            type: p.program_type || 'UNKNOWN',
            complexity: p.mccabe_complexity || 0
        })))};
        
        const links = ${JSON.stringify(calls.map(c => ({
            source: c.caller_program_id,
            target: c.called_program_id,
            type: c.call_type,
            count: c.call_count
        })))};
        
        // Add missing nodes
        const nodeIds = new Set(nodes.map(n => n.id));
        links.forEach(link => {
            if (!nodeIds.has(link.target)) {
                nodes.push({ id: link.target, type: 'MISSING', complexity: 0 });
                nodeIds.add(link.target);
            }
        });
        
        // Create force simulation
        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(100))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2));
            
        // Create links
        const link = g.append("g")
            .selectAll("line")
            .data(links)
            .enter().append("line")
            .attr("class", d => {
                let cls = "link";
                if (d.type === "DYNAMIC") cls += " dynamic";
                if (nodes.find(n => n.id === d.target && n.type === "MISSING")) cls += " missing";
                return cls;
            })
            .attr("stroke-width", d => Math.min(5, Math.max(1, d.count / 10)));
            
        // Create nodes
        const node = g.append("g")
            .selectAll("g")
            .data(nodes)
            .enter().append("g")
            .attr("class", "node")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
                
        node.append("circle")
            .attr("r", d => 8 + Math.min(10, d.complexity / 10))
            .attr("fill", d => {
                if (d.type === "MAIN") return "lightblue";
                if (d.type === "SUB") return "lightgreen";
                if (d.type === "BATCH") return "lightyellow";
                if (d.type === "MISSING") return "lightcoral";
                return "lightgray";
            });
            
        node.append("text")
            .text(d => d.id)
            .attr("x", 12)
            .attr("y", 3);
            
        node.append("title")
            .text(d => \`\${d.id}\\nType: \${d.type}\\nComplexity: \${d.complexity}\`);
            
        // Update positions
        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
                
            node.attr("transform", d => \`translate(\${d.x},\${d.y})\`);
        });
        
        // Drag functions
        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
        
        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }
        
        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    </script>
</body>
</html>`;
        
        const htmlPath = path.join(this.outputDir, 'call_graph_interactive.html');
        await fs.writeFile(htmlPath, html);
        console.log(`  ✓ Generated: call_graph_interactive.html`);
    }

    async findCircularDependencies(calls) {
        // Build adjacency list
        const graph = {};
        calls.forEach(call => {
            if (!graph[call.caller_program_id]) {
                graph[call.caller_program_id] = [];
            }
            graph[call.caller_program_id].push(call.called_program_id);
        });
        
        // DFS to find cycles
        const visited = new Set();
        const recursionStack = new Set();
        const cycles = [];
        
        const findCycles = (node, path = []) => {
            visited.add(node);
            recursionStack.add(node);
            path.push(node);
            
            if (graph[node]) {
                for (const neighbor of graph[node]) {
                    if (!visited.has(neighbor)) {
                        findCycles(neighbor, [...path]);
                    } else if (recursionStack.has(neighbor)) {
                        // Found a cycle
                        const cycleStart = path.indexOf(neighbor);
                        const cycle = path.slice(cycleStart);
                        cycle.push(neighbor);
                        cycles.push(cycle);
                    }
                }
            }
            
            recursionStack.delete(node);
        };
        
        // Check all nodes
        Object.keys(graph).forEach(node => {
            if (!visited.has(node)) {
                findCycles(node);
            }
        });
        
        this.stats.circularDependencies = cycles;
    }

    async generateControlFlowDiagrams() {
        console.log('\n2. Generating Control Flow Diagrams...');
        
        // Get key programs to analyze
        const keyPrograms = await this.query(`
            SELECT DISTINCT p.program_id, p.file_path, p.mccabe_complexity
            FROM programs p
            WHERE p.program_id IS NOT NULL
            AND p.mccabe_complexity > 20
            ORDER BY p.mccabe_complexity DESC
            LIMIT 10
        `);
        
        for (const program of keyPrograms) {
            await this.generateProgramControlFlow(program);
        }
    }

    async generateProgramControlFlow(program) {
        console.log(`  Generating control flow for ${program.program_id}...`);
        
        // Get sections and control flow
        const sections = await this.query(`
            SELECT section_name, section_type, start_line, end_line
            FROM code_sections
            WHERE program_id = ?
            ORDER BY start_line
        `, [program.program_id]);
        
        const performs = await this.query(`
            SELECT from_section, to_section, line_number
            FROM perform_relationships pr
            JOIN programs p ON pr.program_file_path = p.file_path
            WHERE p.program_id = ?
        `, [program.program_id]);
        
        const businessRules = await this.query(`
            SELECT rule_type, condition_text, line_number, complexity_contribution
            FROM business_rules
            WHERE program_id = ?
        `, [program.program_id]);
        
        // Generate Mermaid flowchart
        let mermaid = '```mermaid\nflowchart TD\n';
        mermaid += `    %% Control Flow - ${program.program_id}\n`;
        mermaid += `    %% McCabe Complexity: ${program.mccabe_complexity}\n`;
        mermaid += `    %% Sections: ${sections.length}, PERFORMs: ${performs.length}\n\n`;
        
        // Add start
        mermaid += '    Start([Start])\n';
        
        // Add sections with styling
        const sectionMap = {};
        sections.forEach((section, idx) => {
            const id = `S${idx}`;
            sectionMap[section.section_name] = id;
            
            // Check if section is performed
            const isPerformed = performs.some(p => p.to_section === section.section_name);
            const style = isPerformed ? '' : ':::dead';
            
            mermaid += `    ${id}["${section.section_name}<br/>Lines: ${section.start_line}-${section.end_line}"]${style}\n`;
        });
        
        // Add flow connections
        if (sections.length > 0) {
            mermaid += '    Start --> S0\n';
            
            // Sequential flow
            for (let i = 0; i < sections.length - 1; i++) {
                mermaid += `    S${i} --> S${i + 1}\n`;
            }
            
            // PERFORM flow
            performs.forEach(perf => {
                const fromId = sectionMap[perf.from_section];
                const toId = sectionMap[perf.to_section];
                if (fromId && toId) {
                    mermaid += `    ${fromId} -.->|PERFORM| ${toId}\n`;
                }
            });
            
            mermaid += `    S${sections.length - 1} --> End([End])\n`;
        }
        
        // Add styles
        mermaid += '\n    classDef dead fill:#ffebee,stroke:#f44336\n';
        mermaid += '```\n\n';
        
        // Add complexity analysis
        mermaid += '**Complexity Analysis:**\n';
        mermaid += `- Total Business Rules: ${businessRules.length}\n`;
        mermaid += `- IF Statements: ${businessRules.filter(c => c.rule_type === 'VALIDATION').length}\n`;
        mermaid += `- Complex Conditions: ${businessRules.filter(c => c.rule_type === 'CALCULATION').length}\n`;
        mermaid += `- Decision Logic: ${businessRules.filter(c => c.rule_type === 'DECISION').length}\n`;
        
        // Check for dead code
        const deadSections = sections.filter(s => 
            !performs.some(p => p.to_section === s.section_name) && 
            s.section_name !== sections[0]?.section_name
        );
        
        if (deadSections.length > 0) {
            mermaid += `\n**Warning:** ${deadSections.length} potentially dead sections detected\n`;
        }
        
        // Save file
        const flowPath = path.join(this.outputDir, 'control_flow', `${program.program_id}_flow.md`);
        await fs.writeFile(flowPath, mermaid);
        console.log(`    ✓ Generated: ${program.program_id}_flow.md`);
    }

    async generateDataDependencyGraph() {
        console.log('\n3. Generating Data Dependency Graph...');
        
        // Get data flows
        const dataFlows = await this.query(`
            SELECT program_id, source_field, target_field, 
                   flow_type as transformation_type, line_number
            FROM data_flows
            WHERE source_field IS NOT NULL 
            AND target_field IS NOT NULL
            LIMIT 1000
        `);
        
        // Build data lineage
        const lineage = {};
        dataFlows.forEach(flow => {
            if (!lineage[flow.source_field]) {
                lineage[flow.source_field] = {
                    targets: new Set(),
                    programs: new Set(),
                    transformations: new Set()
                };
            }
            lineage[flow.source_field].targets.add(flow.target_field);
            lineage[flow.source_field].programs.add(flow.program_id);
            lineage[flow.source_field].transformations.add(flow.transformation_type);
        });
        
        // Generate interactive HTML visualization
        const html = `<!DOCTYPE html>
<html>
<head>
    <title>ACAS Data Lineage</title>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        #lineage { width: 100%; height: 600px; border: 1px solid #ccc; }
        .stats { margin: 20px 0; padding: 10px; background: #f5f5f5; }
        table { border-collapse: collapse; width: 100%; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #4CAF50; color: white; }
    </style>
</head>
<body>
    <h1>ACAS Data Lineage Analysis</h1>
    
    <div class="stats">
        <h3>Data Flow Statistics</h3>
        <p>Total Data Flows Analyzed: ${dataFlows.length}</p>
        <p>Unique Source Fields: ${Object.keys(lineage).length}</p>
        <p>Transformation Types: ${new Set(dataFlows.map(f => f.transformation_type)).size}</p>
    </div>
    
    <div id="lineage"></div>
    
    <h3>Top Data Sources</h3>
    <table id="sources">
        <tr>
            <th>Source Field</th>
            <th>Target Count</th>
            <th>Program Count</th>
            <th>Transformation Types</th>
        </tr>
    </table>
    
    <script>
        // Prepare data for Sankey diagram
        const nodes = [];
        const links = [];
        const nodeMap = new Map();
        let nodeIndex = 0;
        
        // Add source nodes
        ${JSON.stringify(Object.entries(lineage).slice(0, 50))}.forEach(([source, data]) => {
            if (!nodeMap.has(source)) {
                nodeMap.set(source, nodeIndex);
                nodes.push({ name: source });
                nodeIndex++;
            }
            
            // Add target nodes and links
            Array.from(data.targets).forEach(target => {
                if (!nodeMap.has(target)) {
                    nodeMap.set(target, nodeIndex);
                    nodes.push({ name: target });
                    nodeIndex++;
                }
                
                links.push({
                    source: nodeMap.get(source),
                    target: nodeMap.get(target),
                    value: 1
                });
            });
        });
        
        // Create Sankey diagram
        const trace = {
            type: "sankey",
            orientation: "h",
            node: {
                pad: 15,
                thickness: 20,
                line: { color: "black", width: 0.5 },
                label: nodes.map(n => n.name),
                color: "blue"
            },
            link: {
                source: links.map(l => l.source),
                target: links.map(l => l.target),
                value: links.map(l => l.value)
            }
        };
        
        const layout = {
            title: "Data Flow Lineage (Top 50 Sources)",
            font: { size: 10 }
        };
        
        Plotly.newPlot('lineage', [trace], layout);
        
        // Populate table
        const table = document.getElementById('sources');
        ${JSON.stringify(Object.entries(lineage).slice(0, 20))}.forEach(([source, data]) => {
            const row = table.insertRow();
            row.insertCell(0).textContent = source;
            row.insertCell(1).textContent = data.targets.size;
            row.insertCell(2).textContent = data.programs.size;
            row.insertCell(3).textContent = Array.from(data.transformations).join(', ');
        });
    </script>
</body>
</html>`;
        
        const htmlPath = path.join(this.outputDir, 'data_lineage.html');
        await fs.writeFile(htmlPath, html);
        console.log('  ✓ Generated: data_lineage.html');
    }

    async generateCopybookHeatMap() {
        console.log('\n4. Generating Copybook Usage Heat Map...');
        
        const usage = await this.query(`
            SELECT c.copybook_name as copybook, p.program_id, p.program_type,
                   COUNT(DISTINCT c.line_number) as usage_count
            FROM copybook_usage c
            JOIN programs p ON c.program_file_path = p.file_path
            GROUP BY c.copybook_name, p.program_id
        `);
        
        // Aggregate by copybook
        const copybookStats = {};
        usage.forEach(row => {
            if (!copybookStats[row.copybook]) {
                copybookStats[row.copybook] = {
                    programs: [],
                    totalUsage: 0,
                    programTypes: {}
                };
            }
            copybookStats[row.copybook].programs.push(row.program_id);
            copybookStats[row.copybook].totalUsage += row.usage_count;
            
            if (!copybookStats[row.copybook].programTypes[row.program_type]) {
                copybookStats[row.copybook].programTypes[row.program_type] = 0;
            }
            copybookStats[row.copybook].programTypes[row.program_type]++;
        });
        
        // Generate heat map HTML
        const html = `<!DOCTYPE html>
<html>
<head>
    <title>ACAS Copybook Usage Heat Map</title>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        #heatmap { width: 100%; height: 600px; }
        .insights { margin: 20px 0; padding: 15px; background: #f0f0f0; border-radius: 5px; }
        .insights h3 { margin-top: 0; }
        .warning { color: #ff6b6b; font-weight: bold; }
        .success { color: #51cf66; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <h1>ACAS Copybook Usage Analysis</h1>
        
        <div class="insights">
            <h3>Key Insights</h3>
            <p>Total Copybooks: ${Object.keys(copybookStats).length}</p>
            <p>Most Used: ${Object.entries(copybookStats).sort((a,b) => b[1].programs.length - a[1].programs.length)[0]?.[0]} 
               (${Object.entries(copybookStats).sort((a,b) => b[1].programs.length - a[1].programs.length)[0]?.[1].programs.length} programs)</p>
            <p>Average Programs per Copybook: ${(usage.length / Object.keys(copybookStats).length).toFixed(1)}</p>
        </div>
        
        <div id="heatmap"></div>
        
        <h3>Copybook Usage Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background: #4CAF50; color: white;">
                <th style="padding: 10px; border: 1px solid #ddd;">Copybook</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Program Count</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Total Usage</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Program Types</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Status</th>
            </tr>
            ${Object.entries(copybookStats)
                .sort((a,b) => b[1].programs.length - a[1].programs.length)
                .slice(0, 30)
                .map(([copybook, stats]) => `
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;">${copybook}</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${stats.programs.length}</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${stats.totalUsage}</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${Object.entries(stats.programTypes).map(([t,c]) => `${t}:${c}`).join(', ')}</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">
                            ${stats.programs.length > 50 ? '<span class="warning">High Usage</span>' : 
                              stats.programs.length < 2 ? '<span class="warning">Low Usage</span>' : 
                              '<span class="success">Normal</span>'}
                        </td>
                    </tr>
                `).join('')}
        </table>
        
        <script>
            // Prepare data for heat map
            const copybooks = ${JSON.stringify(Object.keys(copybookStats).slice(0, 30))};
            const programs = ${JSON.stringify([...new Set(usage.map(u => u.program_id))].slice(0, 50))};
            
            // Create matrix
            const z = [];
            copybooks.forEach(copybook => {
                const row = [];
                programs.forEach(program => {
                    const use = ${JSON.stringify(usage)}.find(u => 
                        u.copybook === copybook && u.program_id === program
                    );
                    row.push(use ? use.usage_count : 0);
                });
                z.push(row);
            });
            
            const data = [{
                z: z,
                x: programs,
                y: copybooks,
                type: 'heatmap',
                colorscale: 'Viridis'
            }];
            
            const layout = {
                title: 'Copybook Usage Heat Map (Top 30 Copybooks × Top 50 Programs)',
                xaxis: { title: 'Programs', tickangle: -45 },
                yaxis: { title: 'Copybooks' }
            };
            
            Plotly.newPlot('heatmap', data, layout);
        </script>
    </div>
</body>
</html>`;
        
        const htmlPath = path.join(this.outputDir, 'copybook_heatmap.html');
        await fs.writeFile(htmlPath, html);
        console.log('  ✓ Generated: copybook_heatmap.html');
    }

    async generateVisualizationReport() {
        console.log('\n5. Generating Visualization Report...');
        
        const report = {
            timestamp: new Date().toISOString(),
            task: 'Task 3.1: Accurate Code Visualization',
            statistics: this.stats,
            visualizations: {
                call_graph: {
                    file: 'call_graph_complete.dot',
                    programs_included: this.stats.totalPrograms,
                    calls_mapped: this.stats.totalCalls,
                    missing_targets: this.stats.missingTargets.length,
                    circular_dependencies: this.stats.circularDependencies.length,
                    isolated_programs: this.stats.isolatedPrograms.length
                },
                control_flow: {
                    programs_analyzed: 10,
                    format: 'Mermaid flowcharts',
                    complexity_included: true,
                    dead_code_detection: true
                },
                data_lineage: {
                    file: 'data_lineage.html',
                    flows_analyzed: 1000,
                    visualization_type: 'Sankey diagram'
                },
                copybook_heatmap: {
                    file: 'copybook_heatmap.html',
                    copybooks_analyzed: await this.query('SELECT COUNT(DISTINCT copybook_name) as count FROM copybook_usage').then(r => r[0].count),
                    visualization_type: 'Interactive heat map'
                }
            },
            issues_found: {
                missing_programs: this.stats.missingTargets,
                circular_dependencies: this.stats.circularDependencies.map(cycle => ({
                    cycle: cycle.join(' → '),
                    programs: cycle.length
                })),
                isolated_programs: this.stats.isolatedPrograms
            }
        };
        
        const reportPath = path.join(this.outputDir, 'visualization_report.json');
        await fs.writeJson(reportPath, report, { spaces: 2 });
        console.log('  ✓ Generated: visualization_report.json');
        
        return report;
    }

    // Database query helper
    query(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows || []);
            });
        });
    }

    async execute() {
        await this.initialize();
        
        try {
            // Generate all visualizations
            await this.generateCallGraph();
            await this.generateControlFlowDiagrams();
            await this.generateDataDependencyGraph();
            await this.generateCopybookHeatMap();
            
            // Generate final report
            const report = await this.generateVisualizationReport();
            
            console.log('\n=== Task 3.1 Complete ===');
            console.log(`Visualizations generated in: ${this.outputDir}`);
            console.log(`\nKey findings:`);
            console.log(`- Missing targets: ${report.issues_found.missing_programs.length}`);
            console.log(`- Circular dependencies: ${report.issues_found.circular_dependencies.length}`);
            console.log(`- Isolated programs: ${report.issues_found.isolated_programs.length}`);
            
        } catch (error) {
            console.error('Error during visualization generation:', error);
            throw error;
        } finally {
            this.db.close();
        }
    }
}

// Execute
async function main() {
    const generator = new Phase3VisualizationGenerator();
    
    try {
        await generator.execute();
        console.log('\n✅ Task 3.1: Accurate Code Visualization completed!');
    } catch (error) {
        console.error('Error in Task 3.1:', error);
        process.exit(1);
    }
}

main();