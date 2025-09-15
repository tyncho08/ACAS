### Phase 3 - Version 2.0: Real Metrics and Evidence-Based Visualization

# PREREQUISITE VALIDATION
```javascript
// Run this check before starting Phase 3
function validatePrerequisites() {
    assert(database.tables.includes('business_rules'), 'Missing business_rules table');
    assert(database.tables.includes('data_flows'), 'Missing data_flows table');
    assert(database.query('SELECT COUNT(*) FROM programs WHERE parse_confidence < 0.8').count === 0, 
           'Low confidence parses detected');
    assert(fileExists('validation_report.html'), 'Phase 1 validation not complete');
}
```

# Task 3.1: Accurate Code Visualization

## Objective
Generate visualizations that accurately represent the ACTUAL code structure, including all anomalies and technical debt.

## Requirements

### 1. Call Graph Generation - Complete and Accurate
```javascript
function generateCallGraph() {
    // Include ALL program types
    const programs = db.query(`
        SELECT DISTINCT program_id, program_type, file_path 
        FROM programs 
        WHERE validation_status != 'ERROR'
    `);
    
    const calls = db.query(`
        SELECT caller_program_id, called_program_id, call_type, 
               COUNT(*) as call_count, confidence
        FROM program_calls 
        GROUP BY caller_program_id, called_program_id, call_type
    `);
    
    // Generate Graphviz DOT with:
    // - Different shapes for program types (MAIN=box, SUB=ellipse, BATCH=hexagon)
    // - Line thickness based on call frequency
    // - Dashed lines for DYNAMIC calls
    // - Red lines for missing targets
    // - Confidence score as edge label
    
    return {
        dot: generateDot(programs, calls),
        stats: {
            total_programs: programs.length,
            total_calls: calls.length,
            missing_targets: findMissingTargets(calls, programs),
            circular_dependencies: findCircularDeps(calls),
            isolated_programs: findIsolatedPrograms(programs, calls)
        }
    };
}
```

### 2. Control Flow Diagrams - From Real AST
```javascript
function generateControlFlow(programId) {
    const ast = getASTFromDatabase(programId);
    
    // Extract actual control flow
    const flow = {
        sections: extractSections(ast),
        paragraphs: extractParagraphs(ast),
        performs: extractPerforms(ast),
        gotos: extractGotos(ast),
        conditions: extractConditions(ast),
        loops: extractLoops(ast)
    };
    
    // Generate accurate flowchart including:
    // - All PERFORM chains
    // - GOTO statements (marked as technical debt)
    // - Conditional branches with actual conditions
    // - Loop structures with exit conditions
    // - Unreachable code (if any)
    // - Multiple exit points
    
    // Output both Mermaid and PlantUML formats
    return {
        mermaid: generateMermaidFlow(flow),
        plantuml: generatePlantUMLFlow(flow),
        complexity_score: calculateFlowComplexity(flow),
        issues: identifyFlowIssues(flow)
    };
}
```

### 3. Data Dependency Graph
```javascript
function generateDataDependencyGraph() {
    // Query actual data flows from Phase 1
    const dataFlows = db.query(`
        SELECT program_id, source_field, target_field, 
               transformation, line_number, flow_type
        FROM data_flows
        ORDER BY program_id, line_number
    `);
    
    // Build comprehensive data lineage
    const lineage = buildDataLineage(dataFlows);
    
    // Generate visualization showing:
    // - Source to target mappings
    // - Transformation types (MOVE, COMPUTE, REDEFINES)
    // - Data type conversions
    // - Lost precision warnings
    // - Unused variables
    
    return generateDataFlowDiagram(lineage);
}
```

### 4. Copybook Usage Heat Map
```javascript
function generateCopybookHeatMap() {
    const usage = db.query(`
        SELECT c.copybook, p.program_id, p.program_type,
               COUNT(DISTINCT c.line_number) as usage_count
        FROM program_copies c
        JOIN programs p ON c.program_file_path = p.file_path
        GROUP BY c.copybook, p.program_id
    `);
    
    // Generate interactive heat map showing:
    // - Intensity of copybook usage
    // - Clustering of related programs
    // - Unused copybooks
    // - Version conflicts (if any)
    
    return {
        html: generateHeatMapHTML(usage),
        insights: analyzeCopybookUsage(usage)
    };
}
```

## Deliverables
```
visualizations/
├── call_graph_complete.dot      # Full call graph
├── call_graph_complete.svg      # Rendered version
├── call_graph_interactive.html  # D3.js interactive version
├── control_flow/
│   ├── sl010_flow.md           # Mermaid flowchart
│   ├── sl010_flow.puml         # PlantUML version
│   └── ...                     # For each key program
├── data_lineage.html           # Interactive data flow
├── copybook_heatmap.html       # Usage heat map
└── visualization_report.json    # Metrics and issues found
```

---

# Task 3.2: Real Code Metrics Calculation

## Objective
Calculate ACTUAL metrics from parsed AST data, not estimates.

### 1. McCabe Cyclomatic Complexity - Correct Calculation
```javascript
function calculateMcCabeComplexity(ast) {
    let complexity = 1; // Base complexity
    
    // Count actual decision points from AST
    complexity += countNodes(ast, 'IF-STATEMENT');
    complexity += countNodes(ast, 'EVALUATE-STATEMENT') * evaluateBranches(ast);
    complexity += countNodes(ast, 'PERFORM-UNTIL');
    complexity += countNodes(ast, 'PERFORM-VARYING');
    complexity += countNodes(ast, 'SEARCH-STATEMENT');
    complexity += countNodes(ast, 'GO-TO-STATEMENT'); // Include as decision point
    
    // Count exception handlers
    complexity += countNodes(ast, 'ON-SIZE-ERROR');
    complexity += countNodes(ast, 'ON-OVERFLOW');
    complexity += countNodes(ast, 'ON-EXCEPTION');
    complexity += countNodes(ast, 'INVALID-KEY');
    complexity += countNodes(ast, 'AT-END');
    
    return {
        value: complexity,
        details: {
            conditionals: countNodes(ast, 'IF-STATEMENT'),
            loops: countNodes(ast, 'PERFORM-UNTIL') + countNodes(ast, 'PERFORM-VARYING'),
            evaluate_branches: evaluateBranches(ast),
            exception_handlers: countExceptionHandlers(ast),
            goto_statements: countNodes(ast, 'GO-TO-STATEMENT')
        }
    };
}
```

### 2. Halstead Metrics - From Actual AST
```javascript
function calculateHalsteadMetrics(ast) {
    const operators = new Set();
    const operands = new Set();
    const operatorOccurrences = [];
    const operandOccurrences = [];
    
    // Walk AST and collect actual operators and operands
    walkAST(ast, (node) => {
        if (isOperator(node)) {
            operators.add(node.value);
            operatorOccurrences.push(node.value);
        } else if (isOperand(node)) {
            operands.add(node.value);
            operandOccurrences.push(node.value);
        }
    });
    
    const n1 = operators.size;        // Unique operators
    const n2 = operands.size;         // Unique operands
    const N1 = operatorOccurrences.length;  // Total operators
    const N2 = operandOccurrences.length;   // Total operands
    
    const vocabulary = n1 + n2;
    const length = N1 + N2;
    const volume = length * Math.log2(vocabulary);
    const difficulty = (n1 / 2) * (N2 / n2);
    const effort = volume * difficulty;
    const time = effort / 18;
    const bugs = volume / 3000;
    
    return {
        unique_operators: n1,
        unique_operands: n2,
        total_operators: N1,
        total_operands: N2,
        vocabulary,
        length,
        volume,
        difficulty,
        effort,
        time_seconds: time,
        estimated_bugs: bugs,
        operator_list: Array.from(operators),
        operand_sample: Array.from(operands).slice(0, 20)
    };
}
```

### 3. Cognitive Complexity - Including Nesting
```javascript
function calculateCognitiveComplexity(ast) {
    let complexity = 0;
    let nestingLevel = 0;
    
    walkAST(ast, (node, entering) => {
        if (entering) {
            switch (node.type) {
                case 'IF-STATEMENT':
                    complexity += 1 + nestingLevel;
                    nestingLevel++;
                    break;
                case 'EVALUATE-STATEMENT':
                    complexity += 1 + nestingLevel;
                    nestingLevel++;
                    break;
                case 'PERFORM-UNTIL':
                case 'PERFORM-VARYING':
                    complexity += 1 + nestingLevel;
                    nestingLevel++;
                    break;
                case 'NESTED-PROGRAM':
                    complexity += 3; // Nested programs add complexity
                    break;
                case 'GO-TO-STATEMENT':
                    complexity += 5; // GOTO adds significant complexity
                    break;
            }
        } else {
            // Exiting a nesting structure
            if (isNestingStructure(node)) {
                nestingLevel--;
            }
        }
    });
    
    return {
        value: complexity,
        max_nesting_level: findMaxNesting(ast),
        goto_penalty: countNodes(ast, 'GO-TO-STATEMENT') * 5
    };
}
```

### 4. Technical Debt Metrics
```javascript
function calculateTechnicalDebt(ast, program) {
    const debt = {
        code_smells: [],
        deprecated_features: [],
        missing_features: [],
        complexity_hotspots: [],
        estimated_hours: 0
    };
    
    // Identify code smells
    if (countNodes(ast, 'GO-TO-STATEMENT') > 0) {
        debt.code_smells.push({
            type: 'GOTO_USAGE',
            count: countNodes(ast, 'GO-TO-STATEMENT'),
            effort_hours: countNodes(ast, 'GO-TO-STATEMENT') * 2
        });
    }
    
    // Check for deprecated features
    if (hasNode(ast, 'EXAMINE-STATEMENT')) {
        debt.deprecated_features.push({
            feature: 'EXAMINE',
            replacement: 'INSPECT',
            count: countNodes(ast, 'EXAMINE-STATEMENT'),
            effort_hours: countNodes(ast, 'EXAMINE-STATEMENT') * 0.5
        });
    }
    
    // Check for missing error handling
    const fileOps = findFileOperations(ast);
    const unhandledFiles = fileOps.filter(op => !hasErrorHandler(op));
    if (unhandledFiles.length > 0) {
        debt.missing_features.push({
            type: 'FILE_ERROR_HANDLING',
            count: unhandledFiles.length,
            effort_hours: unhandledFiles.length * 1
        });
    }
    
    // Calculate total debt
    debt.estimated_hours = calculateTotalDebtHours(debt);
    
    return debt;
}
```

## Dashboard Requirements 2.0
```html
<!DOCTYPE html>
<html>
<head>
    <title>COBOL Code Metrics Dashboard - Real Metrics</title>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
</head>
<body>
    <!-- Dashboard must show -->
    <!-- 1. Metrics distribution with actual values -->
    <!-- 2. Confidence scores for each metric -->
    <!-- 3. Comparison against industry benchmarks -->
    <!-- 4. Drill-down capability to see calculation details -->
    <!-- 5. Export functionality for reports -->
    
    <div id="summary-cards">
        <!-- Real-time calculated metrics -->
    </div>
    
    <div id="complexity-treemap">
        <!-- Treemap of programs by complexity -->
    </div>
    
    <div id="technical-debt-chart">
        <!-- Stacked bar chart of debt types -->
    </div>
    
    <div id="metrics-table">
        <!-- Sortable, filterable table with:
             - Calculated metrics (not estimates)
             - Confidence scores
             - Drill-down links
             - Comparison to baseline -->
    </div>
</body>
</html>
```

---

# Task 3.3: Evidence-Based Technical Documentation

## Objective
Generate documentation that accurately reflects the codebase reality, including all issues and anomalies.

### 1. System Level Report 2.0
```markdown
# System Level Report - Based on Actual Analysis

## Analysis Metadata
- Parse Completion Rate: 96.5% (279/289 files)
- Average Parse Confidence: 0.92
- Analysis Tool: @broadwing/cobol-parser v2.1.0
- Analysis Date: 2024-03-15

## System Statistics (Calculated, not Estimated)

### Size Metrics
- Total Programs: 289
- Successfully Parsed: 279
- Partially Parsed: 7
- Parse Failures: 3
- Total Lines of Code: 1,234,567 (actual count)
- Executable Lines: 987,654 (from AST)
- Comment Lines: 246,913 (from AST)

### Complexity Distribution
| Complexity Range | Program Count | Percentage |
|-----------------|---------------|------------|
| 1-10 (Simple)   | 45           | 16.1%      |
| 11-20 (Moderate)| 123          | 44.1%      |
| 21-50 (Complex) | 89           | 31.9%      |
| >50 (Very Complex)| 22         | 7.9%       |

### Actual Dependencies (from parsed CALL statements)
- Total CALL statements: 1,547
- Unique call relationships: 743
- Average calls per program: 5.54
- Maximum calls in one program: 47 (program: PL950)
- Orphan programs (no callers): 67
- Missing call targets: 23

## Critical Findings

### 1. Missing Programs
These programs are called but not found in codebase:
- DATECONV (called 45 times)
- SYSLOG (called 23 times)
- [Complete list with call counts]

### 2. Circular Dependencies Detected
- CYCLE: SL010 → SL020 → SL030 → SL010
- CYCLE: GL050 → GL060 → GL050
- [Complete list with remediation priority]

### 3. High-Risk Programs (Multiple factors)
| Program | Complexity | Dependencies | Debt Score | Risk |
|---------|------------|--------------|------------|------|
| PL950   | 87         | 47          | 156        | CRITICAL |
| SL970   | 76         | 34          | 134        | HIGH |
[Continue with all high-risk programs]

### 4. Database Operations Analysis
- Programs with embedded SQL: 45
- Programs with file I/O only: 234
- Hybrid (both SQL and files): 34
- Transaction boundary issues: 12 programs lack proper COMMIT/ROLLBACK
```

### 2. Program Index with Real Metrics
```markdown
# Program Index - With Calculated Metrics

## A

### ACAS.cbl
- **Program Type**: MAIN (identified from STOP RUN)
- **Parse Confidence**: 0.98
- **Metrics**:
  - McCabe Complexity: 23 (actual)
  - Cognitive Complexity: 31
  - Halstead Volume: 4,567
  - Maintainability Index: 67.3
- **Dependencies**:
  - Calls: ACAS005 (12x), ACAS006 (8x), ACAS007 (3x)
  - Called by: None (entry point)
  - Copybooks: SCREENIO.CPY, STATCODES.CPY
- **Business Functions** (extracted):
  - Main menu display (lines 145-234)
  - Module selection (lines 300-456)
  - Security validation (lines 500-567)
- **Technical Debt**:
  - 3 GOTO statements (lines 234, 567, 890)
  - Missing error handler for file operations
- **Data Access**:
  - Files: SYSTEM-PARAMS (READ)
  - SQL: None
```

### 3. Copybook Cross-Reference Matrix
```markdown
# Copybook Usage Analysis - Actual Dependencies

## Usage Statistics
- Total Copybooks: 12
- Actively Used: 10
- Unused: 2 (OLDCUST.CPY, TEMPWORK.CPY)
- Most Used: SCREENIO.CPY (234 programs)
- Least Used: SPECIAL1.CPY (1 program)

## Detailed Usage Matrix

| Copybook | Sales | Purchase | Stock | GL | Common | Total | Fields Used |
|----------|-------|----------|-------|-----|---------|-------|------------|
| SCREENIO.CPY | 34/37 | 30/38 | 10/12 | 15/18 | 45/161 | 134/266 | 45/67 |
| CUSTMAST.CPY | 37/37 | 5/38 | 0/12 | 2/18 | 12/161 | 56/266 | 23/45 |
[Continue with actual usage counts]

## Field-Level Analysis
### CUSTMAST.CPY
- Total Fields: 45
- Used Fields: 23
- Unused Fields: 22 (candidates for removal)
  - CUST-OLD-CODE (never referenced)
  - CUST-TEMP-FLAG (never referenced)
  [Complete list]
```

## Validation Gates
Task 3.3 is complete when:
1. ✓ All metrics are calculated from AST, not estimated
2. ✓ Every finding has specific evidence
3. ✓ Confidence scores included for all analysis
4. ✓ Parse failures documented with reasons
5. ✓ Cross-references validated bidirectionally

---

# Task 3.4: Comprehensive Validation and Quality Assurance

## Automated Validation Suite
```javascript
// validation_suite.js - MUST PASS before project completion

async function runCompleteValidation() {
    const results = {
        phase1: await validatePhase1(),
        phase2: await validatePhase2(), 
        phase3: await validatePhase3(),
        crossPhase: await validateCrossPhase(),
        quality: await validateQuality()
    };
    
    generateValidationReport(results);
    
    if (!results.all_pass) {
        console.error('VALIDATION FAILED - Project incomplete');
        process.exit(1);
    }
}

async function validatePhase3() {
    return {
        metricsAccuracy: await checkMetricsVsAST(),
        visualizationCompleteness: await checkAllProgramsVisualized(),
        documentationEvidence: await checkCodeReferences(),
        deadLinkCheck: await checkAllLinks(),
        dataConsistency: await checkCrossTableConsistency()
    };
}
```

## Final Quality Report Template
```markdown
# ACAS Analysis Quality Report

## Validation Summary
- Phase 1: ✓ PASS (Parse rate: 96.5%)
- Phase 2: ✓ PASS (Evidence rate: 87.3%)
- Phase 3: ✓ PASS (Metric accuracy: 94.2%)
- Cross-validation: ✓ PASS

## Confidence Metrics
- Overall Confidence: 91.7%
- High Confidence Items: 234 (81%)
- Medium Confidence Items: 45 (15.6%)
- Low Confidence Items: 10 (3.4%)

## Known Limitations
1. Unable to parse 3 files due to non-standard syntax
2. 23 external program calls could not be resolved
3. SQL parsing limited to basic EXEC SQL blocks
4. CICS commands not analyzed (if present)

## Data Quality Metrics
- AST completeness: 94.3%
- Business rule extraction: 78.4%
- Data flow mapping: 82.1%
- Call graph accuracy: 96.7%

## Recommendations for Manual Review
1. Programs with parse confidence < 0.7
2. Circular dependency resolution
3. High-complexity program refactoring priorities
4. Missing error handler implementations
```

## Project Completion Criteria
The project is ONLY complete when:
1. ✓ All validation scripts pass
2. ✓ Quality report shows >90% overall confidence
3. ✓ No CRITICAL issues remain unresolved
4. ✓ All deliverables are evidence-based
5. ✓ README accurately describes what was achieved vs. intended