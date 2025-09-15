const sqlite3 = require('sqlite3').verbose();
const fs = require('fs-extra');
const path = require('path');

class MetricsCalculator {
    constructor(dbPath) {
        this.db = new sqlite3.Database(dbPath);
    }

    async calculateAllMetrics() {
        const programs = await this.getPrograms();
        const calls = await this.getCalls();
        const performs = await this.getPerforms();
        
        const metrics = [];
        
        for (const program of programs) {
            const programCalls = calls.filter(c => c.program_file_path === program.file_path);
            const programPerforms = performs.filter(p => p.program_file_path === program.file_path);
            
            // Calculate metrics
            const metric = {
                programName: program.file_name,
                programId: program.program_id || 'N/A',
                filePath: program.file_path,
                
                // McCabe Cyclomatic Complexity approximation
                // Based on decision points (performs + calls)
                cyclomaticComplexity: 1 + programPerforms.length + programCalls.length,
                
                // Halstead Metrics approximation
                // Operators: CALL, PERFORM, IF, MOVE, etc.
                // Operands: programs called, sections performed, variables
                uniqueOperators: 10, // Estimated COBOL operators
                uniqueOperands: programCalls.length + programPerforms.length + 20, // Approximation
                totalOperators: programCalls.length * 2 + programPerforms.length * 2 + 50,
                totalOperands: programCalls.length + programPerforms.length + 100,
                
                // Division presence
                hasIdentification: program.has_identification,
                hasEnvironment: program.has_environment,
                hasData: program.has_data,
                hasProcedure: program.has_procedure,
                
                // Dependencies
                callsCount: programCalls.length,
                performsCount: programPerforms.length,
                
                // Error status
                hasErrors: program.error_count > 0
            };
            
            // Calculate Halstead metrics
            const n1 = metric.uniqueOperators;
            const n2 = metric.uniqueOperands;
            const N1 = metric.totalOperators;
            const N2 = metric.totalOperands;
            
            metric.programLength = N1 + N2;
            metric.vocabulary = n1 + n2;
            metric.volume = metric.programLength * Math.log2(metric.vocabulary);
            metric.difficulty = (n1 / 2) * (N2 / n2);
            metric.effort = metric.volume * metric.difficulty;
            metric.time = metric.effort / 18; // seconds
            metric.bugs = metric.volume / 3000;
            
            // Maintainability Index
            // MI = 171 - 5.2 * ln(V) - 0.23 * CC - 16.2 * ln(LOC)
            const estimatedLOC = metric.programLength * 10; // Rough estimate
            metric.maintainabilityIndex = Math.max(0, Math.min(100,
                171 - 5.2 * Math.log(metric.volume) - 
                0.23 * metric.cyclomaticComplexity - 
                16.2 * Math.log(estimatedLOC)
            ));
            
            metrics.push(metric);
        }
        
        return metrics;
    }

    async generateDashboard(metrics) {
        const outputDir = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output/parser_analysis/dashboard';
        await fs.ensureDir(outputDir);
        
        const html = `<!DOCTYPE html>
<html>
<head>
    <title>COBOL Code Metrics Dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }
        h1 {
            color: #333;
            text-align: center;
        }
        .summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-align: center;
        }
        .stat-value {
            font-size: 2em;
            font-weight: bold;
            color: #2196F3;
        }
        .stat-label {
            color: #666;
            margin-top: 5px;
        }
        .charts {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .chart-container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .table-container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            overflow-x: auto;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #f8f8f8;
            font-weight: bold;
            position: sticky;
            top: 0;
            cursor: pointer;
        }
        tr:hover {
            background-color: #f5f5f5;
        }
        .good { color: #4CAF50; }
        .warning { color: #FF9800; }
        .bad { color: #F44336; }
        .filters {
            margin-bottom: 20px;
            padding: 15px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        input[type="text"] {
            padding: 8px;
            margin-right: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            width: 300px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>COBOL Code Metrics Dashboard</h1>
        
        <div class="summary">
            <div class="stat-card">
                <div class="stat-value">${metrics.length}</div>
                <div class="stat-label">Total Programs</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${Math.round(metrics.reduce((sum, m) => sum + m.maintainabilityIndex, 0) / metrics.length)}</div>
                <div class="stat-label">Avg Maintainability</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${Math.round(metrics.reduce((sum, m) => sum + m.cyclomaticComplexity, 0) / metrics.length)}</div>
                <div class="stat-label">Avg Complexity</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${metrics.filter(m => m.hasErrors).length}</div>
                <div class="stat-label">Programs with Errors</div>
            </div>
        </div>

        <div class="charts">
            <div class="chart-container">
                <h3>Maintainability Distribution</h3>
                <canvas id="maintainabilityChart"></canvas>
            </div>
            <div class="chart-container">
                <h3>Complexity Distribution</h3>
                <canvas id="complexityChart"></canvas>
            </div>
            <div class="chart-container">
                <h3>Top 10 Most Complex Programs</h3>
                <canvas id="topComplexChart"></canvas>
            </div>
            <div class="chart-container">
                <h3>Program Dependencies</h3>
                <canvas id="dependencyChart"></canvas>
            </div>
        </div>

        <div class="filters">
            <input type="text" id="searchInput" placeholder="Search programs..." onkeyup="filterTable()">
            <label>
                Sort by:
                <select id="sortSelect" onchange="sortTable()">
                    <option value="0">Program Name</option>
                    <option value="3">Complexity</option>
                    <option value="4">Maintainability</option>
                    <option value="8">Dependencies</option>
                </select>
            </label>
        </div>

        <div class="table-container">
            <table id="metricsTable">
                <thead>
                    <tr>
                        <th onclick="sortTable(0)">Program Name ↕</th>
                        <th onclick="sortTable(1)">Program ID</th>
                        <th onclick="sortTable(2)">Module</th>
                        <th onclick="sortTable(3)">Complexity ↕</th>
                        <th onclick="sortTable(4)">Maintainability ↕</th>
                        <th onclick="sortTable(5)">Volume</th>
                        <th onclick="sortTable(6)">Difficulty</th>
                        <th onclick="sortTable(7)">Est. Bugs</th>
                        <th onclick="sortTable(8)">Dependencies ↕</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
${metrics.map(m => this.generateTableRow(m)).join('')}
                </tbody>
            </table>
        </div>
    </div>

    <script>
        const metrics = ${JSON.stringify(metrics)};
        
        // Maintainability Distribution
        const maintCtx = document.getElementById('maintainabilityChart').getContext('2d');
        const maintainabilityRanges = {
            'High (70-100)': metrics.filter(m => m.maintainabilityIndex >= 70).length,
            'Medium (40-70)': metrics.filter(m => m.maintainabilityIndex >= 40 && m.maintainabilityIndex < 70).length,
            'Low (0-40)': metrics.filter(m => m.maintainabilityIndex < 40).length
        };
        
        new Chart(maintCtx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(maintainabilityRanges),
                datasets: [{
                    data: Object.values(maintainabilityRanges),
                    backgroundColor: ['#4CAF50', '#FF9800', '#F44336']
                }]
            }
        });
        
        // Complexity Distribution
        const compCtx = document.getElementById('complexityChart').getContext('2d');
        const complexityRanges = {
            'Low (1-10)': metrics.filter(m => m.cyclomaticComplexity <= 10).length,
            'Medium (11-20)': metrics.filter(m => m.cyclomaticComplexity > 10 && m.cyclomaticComplexity <= 20).length,
            'High (21-50)': metrics.filter(m => m.cyclomaticComplexity > 20 && m.cyclomaticComplexity <= 50).length,
            'Very High (>50)': metrics.filter(m => m.cyclomaticComplexity > 50).length
        };
        
        new Chart(compCtx, {
            type: 'bar',
            data: {
                labels: Object.keys(complexityRanges),
                datasets: [{
                    label: 'Number of Programs',
                    data: Object.values(complexityRanges),
                    backgroundColor: ['#4CAF50', '#FFC107', '#FF9800', '#F44336']
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
        
        // Top 10 Most Complex
        const topComplex = [...metrics].sort((a, b) => b.cyclomaticComplexity - a.cyclomaticComplexity).slice(0, 10);
        const topCtx = document.getElementById('topComplexChart').getContext('2d');
        
        new Chart(topCtx, {
            type: 'horizontalBar',
            data: {
                labels: topComplex.map(m => m.programName),
                datasets: [{
                    label: 'Cyclomatic Complexity',
                    data: topComplex.map(m => m.cyclomaticComplexity),
                    backgroundColor: '#2196F3'
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    x: { beginAtZero: true }
                }
            }
        });
        
        // Dependencies
        const depCtx = document.getElementById('dependencyChart').getContext('2d');
        const depRanges = {
            'No Dependencies': metrics.filter(m => m.callsCount === 0).length,
            '1-5 Calls': metrics.filter(m => m.callsCount > 0 && m.callsCount <= 5).length,
            '6-10 Calls': metrics.filter(m => m.callsCount > 5 && m.callsCount <= 10).length,
            '>10 Calls': metrics.filter(m => m.callsCount > 10).length
        };
        
        new Chart(depCtx, {
            type: 'pie',
            data: {
                labels: Object.keys(depRanges),
                datasets: [{
                    data: Object.values(depRanges),
                    backgroundColor: ['#E0E0E0', '#4CAF50', '#FF9800', '#F44336']
                }]
            }
        });
        
        // Table functions
        function filterTable() {
            const input = document.getElementById('searchInput');
            const filter = input.value.toUpperCase();
            const table = document.getElementById('metricsTable');
            const tr = table.getElementsByTagName('tr');
            
            for (let i = 1; i < tr.length; i++) {
                const td = tr[i].getElementsByTagName('td')[0];
                if (td) {
                    const txtValue = td.textContent || td.innerText;
                    tr[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? '' : 'none';
                }
            }
        }
        
        function sortTable(n) {
            const table = document.getElementById('metricsTable');
            let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
            switching = true;
            dir = 'asc';
            
            while (switching) {
                switching = false;
                rows = table.rows;
                
                for (i = 1; i < (rows.length - 1); i++) {
                    shouldSwitch = false;
                    x = rows[i].getElementsByTagName('TD')[n];
                    y = rows[i + 1].getElementsByTagName('TD')[n];
                    
                    const xValue = isNaN(x.innerHTML) ? x.innerHTML.toLowerCase() : parseFloat(x.innerHTML);
                    const yValue = isNaN(y.innerHTML) ? y.innerHTML.toLowerCase() : parseFloat(y.innerHTML);
                    
                    if (dir == 'asc') {
                        if (xValue > yValue) {
                            shouldSwitch = true;
                            break;
                        }
                    } else if (dir == 'desc') {
                        if (xValue < yValue) {
                            shouldSwitch = true;
                            break;
                        }
                    }
                }
                
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                    switchcount++;
                } else {
                    if (switchcount == 0 && dir == 'asc') {
                        dir = 'desc';
                        switching = true;
                    }
                }
            }
        }
    </script>
</body>
</html>`;
        
        const htmlPath = path.join(outputDir, 'index.html');
        await fs.writeFile(htmlPath, html);
        console.log('Metrics dashboard generated:', htmlPath);
    }

    generateTableRow(metric) {
        const module = metric.filePath.split('/').slice(-2, -1)[0] || 'common';
        const maintClass = metric.maintainabilityIndex >= 70 ? 'good' : 
                          metric.maintainabilityIndex >= 40 ? 'warning' : 'bad';
        const compClass = metric.cyclomaticComplexity <= 10 ? 'good' :
                         metric.cyclomaticComplexity <= 20 ? 'warning' : 'bad';
        
        return `
                    <tr>
                        <td>${metric.programName}</td>
                        <td>${metric.programId}</td>
                        <td>${module}</td>
                        <td class="${compClass}">${metric.cyclomaticComplexity}</td>
                        <td class="${maintClass}">${metric.maintainabilityIndex.toFixed(1)}</td>
                        <td>${metric.volume.toFixed(0)}</td>
                        <td>${metric.difficulty.toFixed(1)}</td>
                        <td>${metric.bugs.toFixed(2)}</td>
                        <td>${metric.callsCount + metric.performsCount}</td>
                        <td>${metric.hasErrors ? '<span class="bad">⚠️ Errors</span>' : '<span class="good">✓ OK</span>'}</td>
                    </tr>`;
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

    getPerforms() {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM program_performs", (err, rows) => {
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
    const calculator = new MetricsCalculator(dbPath);
    
    try {
        console.log('Calculating metrics...');
        const metrics = await calculator.calculateAllMetrics();
        
        console.log('Generating dashboard...');
        await calculator.generateDashboard(metrics);
        
        console.log('Metrics dashboard completed successfully!');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        calculator.close();
    }
}

main();