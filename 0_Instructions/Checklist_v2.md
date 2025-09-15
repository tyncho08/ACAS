# Project Checklist v2.0: Evidence-Based COBOL Analysis

## Pre-Phase Setup and Environment Validation

- [ ] **0.1:** Install real COBOL parser
  - Tool: `@broadwing/cobol-parser` or `GnuCOBOL`
  - Validation: `parser.test('sample.cbl').success === true`
  - Evidence: `parser_test_results.json`
  - Quality Gate: Parser must handle COBOL-85 standard

- [ ] **0.2:** Create enhanced database schema
  - Tables: programs, program_calls, business_rules, data_flows, quality_issues
  - Validation: All foreign keys and constraints active
  - Evidence: `schema_validation.sql` 
  - Quality Gate: Referential integrity enforced

- [ ] **0.3:** Setup validation framework
  - Scripts: `validate_phase1.js`, `validate_phase2.js`, `validate_phase3.js`
  - Validation: Test suite passes on sample data
  - Evidence: `validation_framework_test.log`
  - Quality Gate: 100% test coverage

## Phase 1: Deep Structural Analysis

- [ ] **1.1:** Discover and validate COBOL files
  - Validation: `discoveredFiles.count === 288 && validTextFiles.count === 288`
  - Evidence: `file_discovery_metadata.json` with encoding info
  - Quality Gate: No binary files or encoding issues
  - Confidence Required: 100%

- [ ] **1.2:** Parse files with real AST parser
  - Validation: `parseSuccessRate >= 0.95 && avgConfidence >= 0.85`
  - Evidence: AST JSON files with node counts > 0
  - Quality Gate: No file with confidence < 0.70
  - Failure Handling: Document all parse errors with line numbers

- [ ] **1.3:** Extract comprehensive code metrics
  - Validation: `allMetricsFromAST === true && estimatedMetrics === 0`
  - Evidence: Database records with calculation formulas
  - Quality Gate: Every complexity score traceable to AST nodes
  - Required Metrics: McCabe, Halstead, Cognitive, Technical Debt

- [ ] **1.4:** Map all dependencies with confidence
  - Validation: `unresolvedCalls.percentage < 5`
  - Evidence: `dependency_validation_report.html`
  - Quality Gate: All CALL targets verified or marked as external
  - Cross-Check: Bidirectional dependency validation

- [ ] **1.5:** Generate Phase 1 validation report
  - Validation: `phase1_quality_score >= 0.90`
  - Evidence: `phase1_validation_report.html` 
  - Quality Gate: All critical issues resolved
  - Includes: Parse failures, confidence distribution, missing dependencies

## Phase 2: Evidence-Based Functional Analysis

- [ ] **2.1:** Discover subsystems through clustering
  - Validation: `avgCohesion >= 0.60 && avgCoupling <= 0.30`
  - Evidence: `clustering_analysis.json` with algorithm details
  - Quality Gate: No manual grouping without metrics
  - Required: Adjacency matrix, affinity scores, statistical justification

- [ ] **2.2:** Extract business rules from actual code
  - Validation: `extractedRules.count > 0 && allRulesHaveLineNumbers === true`
  - Evidence: `business_rules_extraction.json` with code snippets
  - Quality Gate: Every rule linked to specific IF/EVALUATE statements
  - Confidence Required: >= 85% per rule

- [ ] **2.3:** Document functionality with code evidence
  - Validation: `statementsWithEvidence >= 0.80 && inferredStatements === 0`
  - Evidence: Markdown files with code line references
  - Quality Gate: "NOT FOUND IN CODE" appears < 5% of statements
  - Required: Actual code snippets, not paraphrases

- [ ] **2.4:** Generate visualizations from parsed data
  - Validation: `allDiagramsFromCode === true && manualDiagrams === 0`
  - Evidence: Source references in each diagram
  - Quality Gate: Every flow/state extracted from AST
  - Required: Confidence scores on all diagrams

- [ ] **2.5:** Create traceability matrix
  - Validation: `allClaimsTraceable === true`
  - Evidence: `traceability_matrix.csv`
  - Quality Gate: 100% of functional claims linked to code
  - Format: Claim | Source File | Line Numbers | Confidence

## Phase 3: Real Metrics and Accurate Visualization

- [ ] **3.1:** Calculate metrics from AST only
  - Validation: `calculatedMetrics === totalMetrics && estimatedMetrics === 0`
  - Evidence: Metrics with calculation details
  - Quality Gate: Every metric shows AST node counts
  - Required: McCabe breakdown, Halstead token lists

- [ ] **3.2:** Generate complete call graphs
  - Validation: `allProgramsInGraph === true && missingNodes === 0`
  - Evidence: `call_graph_complete.dot` with all 288 programs
  - Quality Gate: Orphans and missing targets clearly marked
  - Required: Static vs dynamic calls differentiated

- [ ] **3.3:** Create accurate control flow diagrams
  - Validation: `flowFromAST === true && allPathsCovered === true`
  - Evidence: Diagrams with line number annotations
  - Quality Gate: Dead code and GOTOs highlighted
  - Required: Complexity scores per flow

- [ ] **3.4:** Build technical documentation from data
  - Validation: `allStatsCalculated === true && noEstimates === true`
  - Evidence: Reports with SQL queries used
  - Quality Gate: Every number traceable to source
  - Required: Confidence intervals on all statistics

- [ ] **3.5:** Execute complete validation suite
  - Validation: `allValidationsPassed === true && qualityScore >= 0.90`
  - Evidence: `final_validation_report.html`
  - Quality Gate: No unresolved critical issues
  - Required: Cross-phase consistency checks pass

## Final Deliverables Quality Check

- [ ] **4.1:** Verify evidence-based documentation
  - Validation: `grep -c "Evidence:" *.md >= 100 && grep -c "estimated" *.md === 0`
  - Evidence: `documentation_quality_report.json`
  - Quality Gate: >80% statements have code references
  - Required: Line-by-line traceability

- [ ] **4.2:** Validate all visualizations
  - Validation: `allVisualizationsOpenProperly === true && noDeadLinks === true`
  - Evidence: `visualization_validation.log`
  - Quality Gate: Every diagram has source attribution
  - Required: Interactive elements functional

- [ ] **4.3:** Confirm metric accuracy
  - Validation: `spotCheckMetrics === databaseMetrics`
  - Evidence: `metric_accuracy_audit.xlsx`
  - Quality Gate: 10 random programs manually verified
  - Required: Calculation formulas documented

- [ ] **4.4:** Generate confidence report
  - Validation: `overallConfidence >= 0.90`
  - Evidence: `CONFIDENCE_REPORT.md`
  - Quality Gate: All low-confidence items documented
  - Required: Remediation plan for <0.7 confidence items

- [ ] **4.5:** Create honest README
  - Validation: `achievedGoals.documented === true && limitations.documented === true`
  - Evidence: `README.md` with achievements vs. intentions
  - Quality Gate: No misleading claims
  - Required: Clear statement of what was/wasn't analyzed

## Validation Script

```javascript
// Run this to check if project is complete
async function validateProjectCompletion() {
    const checklist = await loadChecklist();
    const validations = await runAllValidations();
    
    if (!checklist.allItemsChecked || !validations.allPassed) {
        console.error('PROJECT INCOMPLETE');
        showFailedItems(checklist, validations);
        return false;
    }
    
    console.log('✅ All quality gates passed!');
    console.log(`Overall confidence: ${validations.confidence}%`);
    return true;
}
```

## Notes

- **NEVER** mark an item complete without passing its validation
- **ALWAYS** document why if a quality gate cannot be met
- **STOP** and reassess if confidence drops below 85%
- **PRIORITIZE** accuracy over completeness

---

Remember: "Bad data is worse than no data. Incomplete analysis is better than incorrect analysis."