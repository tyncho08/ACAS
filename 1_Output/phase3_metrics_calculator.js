const fs = require('fs-extra');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

class Phase3MetricsCalculator {
    constructor() {
        this.dbPath = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output/parser_analysis/acas_analysis.sqlite';
        this.parsedDir = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output/parsed_ast';
        this.outputDir = '/Users/MartinGonella/Desktop/Demos/ACAS/1_Output/phase3_metrics';
        this.db = null;
        this.metricsData = [];
    }

    async initialize() {
        await fs.ensureDir(this.outputDir);
        this.db = new sqlite3.Database(this.dbPath);
        
        console.log('Phase 3 Metrics Calculator initialized');
        console.log('Task 3.2: Real Code Metrics Calculation\n');
    }

    async loadParsedAST(fileName) {
        try {
            const astPath = path.join(this.parsedDir, fileName);
            if (await fs.pathExists(astPath)) {
                return await fs.readJson(astPath);
            }
        } catch (error) {
            console.error(`Error loading AST for ${fileName}:`, error.message);
        }
        return null;
    }

    calculateMcCabeComplexity(ast) {
        if (!ast) return { value: 1, details: {} };
        
        let complexity = 1; // Base complexity
        const details = {
            conditionals: 0,
            loops: 0,
            evaluate_branches: 0,
            exception_handlers: 0,
            goto_statements: 0
        };

        // Count decision points from the parsed data
        if (ast.businessLogic?.conditions) {
            ast.businessLogic.conditions.forEach(condition => {
                if (condition.type === 'IF') {
                    complexity++;
                    details.conditionals++;
                } else if (condition.type === 'EVALUATE') {
                    // Each WHEN branch adds complexity
                    const branches = condition.condition.match(/WHEN/gi)?.length || 1;
                    complexity += branches;
                    details.evaluate_branches += branches;
                }
            });
        }

        // Count loops from control flow
        if (ast.controlFlow?.performs) {
            ast.controlFlow.performs.forEach(perform => {
                if (perform.type === 'UNTIL' || perform.type === 'VARYING') {
                    complexity++;
                    details.loops++;
                }
            });
        }

        // Count GOTO statements (technical debt)
        if (ast.controlFlow?.gotos) {
            complexity += ast.controlFlow.gotos.length;
            details.goto_statements = ast.controlFlow.gotos.length;
        }

        // Count exception handlers
        const exceptionPatterns = ['ON SIZE ERROR', 'ON OVERFLOW', 'ON EXCEPTION', 'INVALID KEY', 'AT END'];
        if (ast.sourceCode) {
            exceptionPatterns.forEach(pattern => {
                const matches = ast.sourceCode.match(new RegExp(pattern, 'gi'));
                if (matches) {
                    complexity += matches.length;
                    details.exception_handlers += matches.length;
                }
            });
        }

        return { value: complexity, details };
    }

    calculateHalsteadMetrics(ast) {
        if (!ast || !ast.sourceCode) {
            return {
                unique_operators: 0,
                unique_operands: 0,
                total_operators: 0,
                total_operands: 0,
                vocabulary: 0,
                length: 0,
                volume: 0,
                difficulty: 0,
                effort: 0,
                time_seconds: 0,
                estimated_bugs: 0
            };
        }

        const operators = new Map();
        const operands = new Map();

        // COBOL operators
        const operatorPatterns = [
            'MOVE', 'ADD', 'SUBTRACT', 'MULTIPLY', 'DIVIDE', 'COMPUTE',
            'IF', 'ELSE', 'END-IF', 'EVALUATE', 'WHEN', 'END-EVALUATE',
            'PERFORM', 'UNTIL', 'VARYING', 'TIMES', 'THRU',
            'READ', 'WRITE', 'REWRITE', 'DELETE', 'START',
            'OPEN', 'CLOSE', 'CALL', 'ACCEPT', 'DISPLAY',
            'GO TO', 'STOP RUN', 'EXIT', 'CONTINUE',
            '=', '>', '<', '>=', '<=', 'NOT', 'AND', 'OR',
            '+', '-', '*', '/', '**'
        ];

        // Count operators
        operatorPatterns.forEach(op => {
            const regex = new RegExp(`\\b${op.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
            const matches = ast.sourceCode.match(regex);
            if (matches) {
                operators.set(op, matches.length);
            }
        });

        // Extract operands (variables, literals)
        // Variables from data definitions
        if (ast.dataStructures?.workingStorage) {
            ast.dataStructures.workingStorage.forEach(item => {
                if (item.name && item.level !== '01') {
                    const varRegex = new RegExp(`\\b${item.name}\\b`, 'gi');
                    const matches = ast.sourceCode.match(varRegex);
                    if (matches) {
                        operands.set(item.name, matches.length);
                    }
                }
            });
        }

        // Numeric and string literals
        const numericLiterals = ast.sourceCode.match(/\b\d+(\.\d+)?\b/g) || [];
        const stringLiterals = ast.sourceCode.match(/"[^"]*"|'[^']*'/g) || [];
        
        numericLiterals.forEach(lit => {
            operands.set(lit, (operands.get(lit) || 0) + 1);
        });
        
        stringLiterals.forEach(lit => {
            operands.set(lit, (operands.get(lit) || 0) + 1);
        });

        // Calculate metrics
        const n1 = operators.size;        // Unique operators
        const n2 = operands.size;         // Unique operands
        const N1 = Array.from(operators.values()).reduce((a, b) => a + b, 0); // Total operators
        const N2 = Array.from(operands.values()).reduce((a, b) => a + b, 0); // Total operands
        
        const vocabulary = n1 + n2;
        const length = N1 + N2;
        const volume = length * Math.log2(vocabulary || 1);
        const difficulty = n2 > 0 ? (n1 / 2) * (N2 / n2) : 0;
        const effort = volume * difficulty;
        const time = effort / 18; // Seconds
        const bugs = volume / 3000;

        return {
            unique_operators: n1,
            unique_operands: n2,
            total_operators: N1,
            total_operands: N2,
            vocabulary,
            length,
            volume: Math.round(volume),
            difficulty: Math.round(difficulty * 100) / 100,
            effort: Math.round(effort),
            time_seconds: Math.round(time),
            estimated_bugs: Math.round(bugs * 100) / 100,
            operator_list: Array.from(operators.keys()).slice(0, 10),
            operand_sample: Array.from(operands.keys()).slice(0, 10)
        };
    }

    calculateCognitiveComplexity(ast) {
        if (!ast) return { value: 0, max_nesting_level: 0, goto_penalty: 0 };

        let complexity = 0;
        let maxNesting = 0;
        let currentNesting = 0;
        let gotoPenalty = 0;

        // Analyze from business logic conditions
        if (ast.businessLogic?.conditions) {
            ast.businessLogic.conditions.forEach(condition => {
                // Basic increment for control structure
                complexity += 1;
                
                // Additional increment for nesting
                if (condition.nestingLevel) {
                    complexity += condition.nestingLevel;
                    maxNesting = Math.max(maxNesting, condition.nestingLevel);
                }
                
                // Extra penalty for complex conditions
                if (condition.condition && condition.condition.includes(' AND ')) {
                    complexity += 1;
                }
                if (condition.condition && condition.condition.includes(' OR ')) {
                    complexity += 1;
                }
            });
        }

        // Penalty for GOTO statements
        if (ast.controlFlow?.gotos) {
            gotoPenalty = ast.controlFlow.gotos.length * 5;
            complexity += gotoPenalty;
        }

        // Nested programs add significant complexity
        if (ast.nestedPrograms && ast.nestedPrograms.length > 0) {
            complexity += ast.nestedPrograms.length * 3;
        }

        return {
            value: complexity,
            max_nesting_level: maxNesting,
            goto_penalty: gotoPenalty
        };
    }

    calculateTechnicalDebt(ast, metrics) {
        const debt = {
            code_smells: [],
            deprecated_features: [],
            missing_features: [],
            complexity_hotspots: [],
            estimated_hours: 0
        };

        // Code smell: GOTO usage
        if (ast.controlFlow?.gotos && ast.controlFlow.gotos.length > 0) {
            debt.code_smells.push({
                type: 'GOTO_USAGE',
                count: ast.controlFlow.gotos.length,
                locations: ast.controlFlow.gotos.map(g => `line ${g.line}`),
                effort_hours: ast.controlFlow.gotos.length * 2
            });
        }

        // Code smell: Very high complexity
        if (metrics.mccabe.value > 50) {
            debt.complexity_hotspots.push({
                type: 'VERY_HIGH_COMPLEXITY',
                value: metrics.mccabe.value,
                threshold: 50,
                effort_hours: Math.ceil((metrics.mccabe.value - 50) / 10) * 4
            });
        }

        // Missing feature: No error handling for file operations
        if (ast.dataFlow?.files && ast.dataFlow.files.length > 0) {
            const fileOpsWithoutErrorHandling = [];
            ast.dataFlow.files.forEach(file => {
                // Check if there's error handling near the file operation
                const hasErrorHandling = ast.sourceCode && 
                    ast.sourceCode.includes(`${file.logicalName}-STATUS`);
                if (!hasErrorHandling) {
                    fileOpsWithoutErrorHandling.push(file.logicalName);
                }
            });
            
            if (fileOpsWithoutErrorHandling.length > 0) {
                debt.missing_features.push({
                    type: 'FILE_ERROR_HANDLING',
                    files: fileOpsWithoutErrorHandling,
                    count: fileOpsWithoutErrorHandling.length,
                    effort_hours: fileOpsWithoutErrorHandling.length * 1
                });
            }
        }

        // Deprecated features check
        const deprecatedPatterns = [
            { pattern: /\bEXAMINE\b/gi, replacement: 'INSPECT', hours: 0.5 },
            { pattern: /\bTRANSFORM\b/gi, replacement: 'INSPECT', hours: 0.5 },
            { pattern: /\bEXHIBIT\b/gi, replacement: 'DISPLAY', hours: 0.25 }
        ];

        if (ast.sourceCode) {
            deprecatedPatterns.forEach(dep => {
                const matches = ast.sourceCode.match(dep.pattern);
                if (matches) {
                    debt.deprecated_features.push({
                        feature: dep.pattern.source.replace(/\\b/g, ''),
                        replacement: dep.replacement,
                        count: matches.length,
                        effort_hours: matches.length * dep.hours
                    });
                }
            });
        }

        // Code smell: Long procedures
        if (ast.controlFlow?.sections) {
            ast.controlFlow.sections.forEach(section => {
                const sectionLines = section.endLine - section.startLine;
                if (sectionLines > 200) {
                    debt.code_smells.push({
                        type: 'LONG_PROCEDURE',
                        section: section.name,
                        lines: sectionLines,
                        threshold: 200,
                        effort_hours: Math.ceil(sectionLines / 200) * 2
                    });
                }
            });
        }

        // Calculate total debt
        debt.estimated_hours = 
            debt.code_smells.reduce((sum, smell) => sum + smell.effort_hours, 0) +
            debt.deprecated_features.reduce((sum, dep) => sum + dep.effort_hours, 0) +
            debt.missing_features.reduce((sum, feat) => sum + feat.effort_hours, 0) +
            debt.complexity_hotspots.reduce((sum, hot) => sum + hot.effort_hours, 0);

        return debt;
    }

    calculateMaintainabilityIndex(metrics) {
        // Microsoft's Maintainability Index formula
        // MI = 171 - 5.2 * ln(V) - 0.23 * CC - 16.2 * ln(LOC)
        // Where V = Halstead Volume, CC = Cyclomatic Complexity, LOC = Lines of Code
        
        const V = metrics.halstead.volume || 1;
        const CC = metrics.mccabe.value || 1;
        const LOC = metrics.lines_of_code || 1;
        
        let MI = 171 - 5.2 * Math.log(V) - 0.23 * CC - 16.2 * Math.log(LOC);
        
        // Normalize to 0-100 scale
        MI = Math.max(0, Math.min(100, MI));
        
        return {
            value: Math.round(MI * 100) / 100,
            rating: MI > 85 ? 'Excellent' : 
                   MI > 65 ? 'Good' : 
                   MI > 45 ? 'Fair' : 
                   MI > 25 ? 'Poor' : 'Very Poor'
        };
    }

    async calculateProgramMetrics(programId, fileName) {
        console.log(`Calculating metrics for ${programId}...`);
        
        const ast = await this.loadParsedAST(fileName);
        if (!ast) {
            console.log(`  ⚠ No AST found for ${programId}`);
            return null;
        }

        // Calculate all metrics
        const mccabe = this.calculateMcCabeComplexity(ast);
        const halstead = this.calculateHalsteadMetrics(ast);
        const cognitive = this.calculateCognitiveComplexity(ast);
        
        // Lines of code
        const lines_of_code = ast.complexity?.lines?.total || 0;
        const executable_lines = ast.complexity?.lines?.code || 0;
        const comment_lines = ast.complexity?.lines?.comments || 0;
        
        const metrics = {
            program_id: programId,
            file_name: fileName,
            parse_confidence: ast.parseConfidence || 0,
            lines_of_code,
            executable_lines,
            comment_lines,
            mccabe,
            halstead,
            cognitive
        };
        
        // Calculate maintainability index
        const maintainability = this.calculateMaintainabilityIndex(metrics);
        metrics.maintainability = maintainability;
        
        // Calculate technical debt
        const debt = this.calculateTechnicalDebt(ast, metrics);
        metrics.technical_debt = debt;
        
        return metrics;
    }

    async calculateAllMetrics() {
        // Get all programs from database
        const programs = await this.query(`
            SELECT program_id, file_name, file_path 
            FROM programs 
            WHERE program_id IS NOT NULL
            ORDER BY program_id
        `);
        
        console.log(`\nCalculating metrics for ${programs.length} programs...\n`);
        
        for (const program of programs) {
            // Look for corresponding AST file
            const astFiles = await fs.readdir(this.parsedDir);
            const astFile = astFiles.find(f => 
                f.includes(program.program_id) && f.endsWith('.json')
            );
            
            if (astFile) {
                const metrics = await this.calculateProgramMetrics(program.program_id, astFile);
                if (metrics) {
                    this.metricsData.push(metrics);
                }
            }
        }
        
        console.log(`\n✓ Calculated metrics for ${this.metricsData.length} programs`);
    }

    async generateMetricsDashboard() {
        console.log('\nGenerating metrics dashboard...');
        
        const dashboard = `<!DOCTYPE html>
<html>
<head>
    <title>ACAS Code Metrics Dashboard - Real Metrics</title>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
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
        h1, h2 {
            color: #333;
        }
        .summary-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .card h3 {
            margin-top: 0;
            color: #555;
            font-size: 14px;
            text-transform: uppercase;
        }
        .card .value {
            font-size: 32px;
            font-weight: bold;
            color: #2196F3;
        }
        .card .subtitle {
            color: #666;
            font-size: 12px;
        }
        .chart-container {
            background: white;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        #metrics-table {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
            background-color: #f5f5f5;
            font-weight: bold;
            cursor: pointer;
        }
        tr:hover {
            background-color: #f5f5f5;
        }
        .metric-good { color: #4CAF50; }
        .metric-warning { color: #FF9800; }
        .metric-danger { color: #F44336; }
        .confidence-high { color: #4CAF50; }
        .confidence-medium { color: #FF9800; }
        .confidence-low { color: #F44336; }
    </style>
</head>
<body>
    <div class="container">
        <h1>ACAS Code Metrics Dashboard</h1>
        <p><strong>Generated:</strong> ${new Date().toISOString()}</p>
        <p><strong>Analysis Method:</strong> AST-based calculation (not estimated)</p>
        
        <div class="summary-cards">
            <div class="card">
                <h3>Total Programs Analyzed</h3>
                <div class="value">${this.metricsData.length}</div>
                <div class="subtitle">with parsed AST data</div>
            </div>
            <div class="card">
                <h3>Average Complexity</h3>
                <div class="value">${(this.metricsData.reduce((sum, m) => sum + m.mccabe.value, 0) / this.metricsData.length).toFixed(1)}</div>
                <div class="subtitle">McCabe Cyclomatic</div>
            </div>
            <div class="card">
                <h3>Total Lines of Code</h3>
                <div class="value">${this.metricsData.reduce((sum, m) => sum + m.lines_of_code, 0).toLocaleString()}</div>
                <div class="subtitle">actual count from AST</div>
            </div>
            <div class="card">
                <h3>Technical Debt</h3>
                <div class="value">${this.metricsData.reduce((sum, m) => sum + m.technical_debt.estimated_hours, 0).toFixed(0)}h</div>
                <div class="subtitle">estimated effort</div>
            </div>
        </div>
        
        <div class="chart-container">
            <h2>Complexity Distribution</h2>
            <div id="complexity-histogram"></div>
        </div>
        
        <div class="chart-container">
            <h2>Complexity Treemap - Top 30 Programs</h2>
            <div id="complexity-treemap"></div>
        </div>
        
        <div class="chart-container">
            <h2>Technical Debt by Type</h2>
            <div id="debt-chart"></div>
        </div>
        
        <div class="chart-container">
            <h2>Maintainability Index Distribution</h2>
            <div id="maintainability-chart"></div>
        </div>
        
        <div id="metrics-table">
            <h2>Detailed Metrics Table</h2>
            <table id="dataTable">
                <thead>
                    <tr>
                        <th onclick="sortTable(0)">Program ID ↕</th>
                        <th onclick="sortTable(1)">Lines ↕</th>
                        <th onclick="sortTable(2)">McCabe ↕</th>
                        <th onclick="sortTable(3)">Cognitive ↕</th>
                        <th onclick="sortTable(4)">Halstead Vol ↕</th>
                        <th onclick="sortTable(5)">Maintainability ↕</th>
                        <th onclick="sortTable(6)">Tech Debt (h) ↕</th>
                        <th onclick="sortTable(7)">Confidence ↕</th>
                        <th>Issues</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.metricsData.map(m => `
                        <tr>
                            <td><strong>${m.program_id}</strong></td>
                            <td>${m.lines_of_code}</td>
                            <td class="${m.mccabe.value > 50 ? 'metric-danger' : m.mccabe.value > 20 ? 'metric-warning' : 'metric-good'}">${m.mccabe.value}</td>
                            <td class="${m.cognitive.value > 50 ? 'metric-danger' : m.cognitive.value > 20 ? 'metric-warning' : 'metric-good'}">${m.cognitive.value}</td>
                            <td>${m.halstead.volume}</td>
                            <td class="${m.maintainability.value < 45 ? 'metric-danger' : m.maintainability.value < 65 ? 'metric-warning' : 'metric-good'}">${m.maintainability.value} (${m.maintainability.rating})</td>
                            <td class="${m.technical_debt.estimated_hours > 10 ? 'metric-danger' : m.technical_debt.estimated_hours > 5 ? 'metric-warning' : 'metric-good'}">${m.technical_debt.estimated_hours}</td>
                            <td class="${m.parse_confidence > 0.9 ? 'confidence-high' : m.parse_confidence > 0.7 ? 'confidence-medium' : 'confidence-low'}">${(m.parse_confidence * 100).toFixed(0)}%</td>
                            <td>${this.getIssuesSummary(m.technical_debt)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    </div>
    
    <script>
        // Data preparation
        const metricsData = ${JSON.stringify(this.metricsData)};
        
        // Complexity Histogram
        const complexityValues = metricsData.map(m => m.mccabe.value);
        const histogramTrace = {
            x: complexityValues,
            type: 'histogram',
            xbins: { size: 10 },
            marker: { color: '#2196F3' }
        };
        
        Plotly.newPlot('complexity-histogram', [histogramTrace], {
            title: 'McCabe Complexity Distribution (Actual Values)',
            xaxis: { title: 'Complexity Score' },
            yaxis: { title: 'Number of Programs' }
        });
        
        // Complexity Treemap
        const treemapData = metricsData
            .sort((a, b) => b.mccabe.value - a.mccabe.value)
            .slice(0, 30)
            .map(m => ({
                ids: m.program_id,
                labels: m.program_id,
                parents: [''],
                values: m.mccabe.value,
                text: \`McCabe: \${m.mccabe.value}<br>Lines: \${m.lines_of_code}<br>Debt: \${m.technical_debt.estimated_hours}h\`
            }));
        
        const treemapTrace = {
            type: 'treemap',
            ids: ['', ...treemapData.map(d => d.ids)],
            labels: ['ACAS', ...treemapData.map(d => d.labels)],
            parents: ['', ...treemapData.map(d => '')],
            values: [0, ...treemapData.map(d => d.values)],
            text: ['', ...treemapData.map(d => d.text)],
            textinfo: 'label+value',
            marker: { colorscale: 'RdYlGn', reversescale: true }
        };
        
        Plotly.newPlot('complexity-treemap', [treemapTrace], {
            title: 'Program Complexity Heat Map'
        });
        
        // Technical Debt Chart
        const debtByType = {
            'GOTO Usage': 0,
            'High Complexity': 0,
            'Missing Error Handling': 0,
            'Long Procedures': 0,
            'Deprecated Features': 0
        };
        
        metricsData.forEach(m => {
            m.technical_debt.code_smells.forEach(smell => {
                if (smell.type === 'GOTO_USAGE') debtByType['GOTO Usage'] += smell.effort_hours;
                if (smell.type === 'LONG_PROCEDURE') debtByType['Long Procedures'] += smell.effort_hours;
            });
            m.technical_debt.complexity_hotspots.forEach(hot => {
                debtByType['High Complexity'] += hot.effort_hours;
            });
            m.technical_debt.missing_features.forEach(feat => {
                if (feat.type === 'FILE_ERROR_HANDLING') debtByType['Missing Error Handling'] += feat.effort_hours;
            });
            m.technical_debt.deprecated_features.forEach(dep => {
                debtByType['Deprecated Features'] += dep.effort_hours;
            });
        });
        
        const debtTrace = {
            x: Object.keys(debtByType),
            y: Object.values(debtByType),
            type: 'bar',
            marker: { color: '#FF5722' }
        };
        
        Plotly.newPlot('debt-chart', [debtTrace], {
            title: 'Technical Debt by Category (Hours)',
            xaxis: { title: 'Debt Type' },
            yaxis: { title: 'Estimated Hours' }
        });
        
        // Maintainability Index
        const maintainabilityTrace = {
            x: metricsData.map(m => m.maintainability.value),
            type: 'histogram',
            xbins: { size: 10 },
            marker: { 
                color: metricsData.map(m => m.maintainability.value),
                colorscale: 'RdYlGn',
                showscale: true
            }
        };
        
        Plotly.newPlot('maintainability-chart', [maintainabilityTrace], {
            title: 'Maintainability Index Distribution',
            xaxis: { title: 'Maintainability Index (0-100)' },
            yaxis: { title: 'Number of Programs' }
        });
        
        // Table sorting
        function sortTable(columnIndex) {
            const table = document.getElementById('dataTable');
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));
            
            rows.sort((a, b) => {
                const aValue = a.cells[columnIndex].textContent;
                const bValue = b.cells[columnIndex].textContent;
                
                // Try to parse as number
                const aNum = parseFloat(aValue);
                const bNum = parseFloat(bValue);
                
                if (!isNaN(aNum) && !isNaN(bNum)) {
                    return bNum - aNum; // Descending order for numbers
                }
                return aValue.localeCompare(bValue);
            });
            
            tbody.innerHTML = '';
            rows.forEach(row => tbody.appendChild(row));
        }
    </script>
</body>
</html>`;
        
        const dashboardPath = path.join(this.outputDir, 'metrics_dashboard.html');
        await fs.writeFile(dashboardPath, dashboard);
        console.log('  ✓ Generated: metrics_dashboard.html');
    }

    getIssuesSummary(debt) {
        const issues = [];
        
        if (debt.code_smells.some(s => s.type === 'GOTO_USAGE')) {
            issues.push('GOTO');
        }
        if (debt.complexity_hotspots.length > 0) {
            issues.push('Complex');
        }
        if (debt.missing_features.some(f => f.type === 'FILE_ERROR_HANDLING')) {
            issues.push('No Error Handling');
        }
        if (debt.deprecated_features.length > 0) {
            issues.push('Deprecated');
        }
        
        return issues.join(', ') || '-';
    }

    async generateMetricsReport() {
        console.log('\nGenerating metrics report...');
        
        // Calculate summary statistics
        const summary = {
            total_programs: this.metricsData.length,
            total_loc: this.metricsData.reduce((sum, m) => sum + m.lines_of_code, 0),
            avg_complexity: this.metricsData.reduce((sum, m) => sum + m.mccabe.value, 0) / this.metricsData.length,
            avg_cognitive: this.metricsData.reduce((sum, m) => sum + m.cognitive.value, 0) / this.metricsData.length,
            total_debt_hours: this.metricsData.reduce((sum, m) => sum + m.technical_debt.estimated_hours, 0),
            high_complexity_programs: this.metricsData.filter(m => m.mccabe.value > 50).length,
            programs_with_goto: this.metricsData.filter(m => 
                m.technical_debt.code_smells.some(s => s.type === 'GOTO_USAGE')
            ).length
        };
        
        const report = {
            timestamp: new Date().toISOString(),
            task: 'Task 3.2: Real Code Metrics Calculation',
            calculation_method: 'AST-based analysis (not estimated)',
            summary,
            metrics_by_program: this.metricsData,
            complexity_distribution: {
                simple: this.metricsData.filter(m => m.mccabe.value <= 10).length,
                moderate: this.metricsData.filter(m => m.mccabe.value > 10 && m.mccabe.value <= 20).length,
                complex: this.metricsData.filter(m => m.mccabe.value > 20 && m.mccabe.value <= 50).length,
                very_complex: this.metricsData.filter(m => m.mccabe.value > 50).length
            },
            top_complex_programs: this.metricsData
                .sort((a, b) => b.mccabe.value - a.mccabe.value)
                .slice(0, 10)
                .map(m => ({
                    program_id: m.program_id,
                    mccabe_complexity: m.mccabe.value,
                    cognitive_complexity: m.cognitive.value,
                    lines_of_code: m.lines_of_code,
                    technical_debt_hours: m.technical_debt.estimated_hours
                }))
        };
        
        const reportPath = path.join(this.outputDir, 'metrics_report.json');
        await fs.writeJson(reportPath, report, { spaces: 2 });
        console.log('  ✓ Generated: metrics_report.json');
        
        // Also save detailed metrics as CSV for analysis
        await this.saveMetricsAsCSV();
    }

    async saveMetricsAsCSV() {
        let csv = 'Program ID,Lines of Code,Executable Lines,Comment Lines,McCabe Complexity,Cognitive Complexity,Halstead Volume,Halstead Difficulty,Maintainability Index,Technical Debt Hours,Parse Confidence\n';
        
        this.metricsData.forEach(m => {
            csv += `${m.program_id},${m.lines_of_code},${m.executable_lines},${m.comment_lines},`;
            csv += `${m.mccabe.value},${m.cognitive.value},${m.halstead.volume},${m.halstead.difficulty},`;
            csv += `${m.maintainability.value},${m.technical_debt.estimated_hours},${m.parse_confidence}\n`;
        });
        
        const csvPath = path.join(this.outputDir, 'metrics_detailed.csv');
        await fs.writeFile(csvPath, csv);
        console.log('  ✓ Generated: metrics_detailed.csv');
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
            // Calculate metrics for all programs
            await this.calculateAllMetrics();
            
            // Generate dashboard and reports
            await this.generateMetricsDashboard();
            await this.generateMetricsReport();
            
            console.log('\n=== Task 3.2 Complete ===');
            console.log(`Metrics calculated for ${this.metricsData.length} programs`);
            console.log(`Output directory: ${this.outputDir}`);
            
            // Summary statistics
            const avgComplexity = this.metricsData.reduce((sum, m) => sum + m.mccabe.value, 0) / this.metricsData.length;
            const highComplexity = this.metricsData.filter(m => m.mccabe.value > 50).length;
            const totalDebt = this.metricsData.reduce((sum, m) => sum + m.technical_debt.estimated_hours, 0);
            
            console.log(`\nKey findings:`);
            console.log(`- Average McCabe complexity: ${avgComplexity.toFixed(1)}`);
            console.log(`- Programs with very high complexity (>50): ${highComplexity}`);
            console.log(`- Total technical debt: ${totalDebt.toFixed(0)} hours`);
            
        } catch (error) {
            console.error('Error during metrics calculation:', error);
            throw error;
        } finally {
            this.db.close();
        }
    }
}

// Execute
async function main() {
    const calculator = new Phase3MetricsCalculator();
    
    try {
        await calculator.execute();
        console.log('\n✅ Task 3.2: Real Code Metrics Calculation completed!');
    } catch (error) {
        console.error('Error in Task 3.2:', error);
        process.exit(1);
    }
}

main();