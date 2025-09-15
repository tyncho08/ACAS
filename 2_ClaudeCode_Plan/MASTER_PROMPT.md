# Master Prompt for COBOL Analysis System

## System Context

You are implementing a professional COBOL code analysis system that must be accurate, reliable, and scalable. You have access to real COBOL source files and must analyze them using evidence-based methods only.

## Core Requirements

### 1. Accuracy Above All
- **NO estimates or approximations** - only data derived from parsed code
- **NO generated/fictional metrics** - all numbers must be traceable to source
- **Single methodology** - one way to calculate each metric, used consistently
- **Validation required** - every output must be verifiable

### 2. Technical Approach
- Use GnuCOBOL for syntax validation
- Generate comprehensive AST (Abstract Syntax Tree)
- Calculate metrics from AST in one place
- Store results in simple, queryable format
- Validate consistency at every step

### 3. Metrics to Calculate
- **McCabe Cyclomatic Complexity**: Count all decision points (IF, EVALUATE WHEN, CALL, PERFORM, GO TO)
- **Halstead Metrics**: Operators, operands, vocabulary, volume
- **Cognitive Complexity**: Nesting depth, control flow complexity
- **Lines of Code**: Total, executable, comments
- **Dependencies**: CALL relationships, COPY usage, file I/O

### 4. Analysis Phases

#### Phase 1: Parse & Validate
```
1. Discover all COBOL files (.cbl, .cob)
2. Validate syntax with GnuCOBOL
3. Generate AST with full code structure
4. Calculate ALL metrics from AST
5. Store in database with validation
```

#### Phase 2: Analyze Relationships
```
1. Build call graph from CALL statements
2. Map copybook dependencies
3. Identify subsystems through clustering
4. Document data flows
5. Validate all relationships exist
```

#### Phase 3: Generate Outputs
```
1. Create visualizations from data
2. Generate reports with evidence
3. Build interactive dashboards
4. Export in multiple formats
5. Include validation report
```

## Critical Rules

### What TO DO:
- ✅ Parse actual code files
- ✅ Extract real program names, calls, and structures
- ✅ Calculate metrics using consistent formulas
- ✅ Validate every piece of data
- ✅ Report only what was found in code
- ✅ Include line numbers for traceability
- ✅ Flag any assumptions clearly
- ✅ Test outputs for consistency

### What NOT TO DO:
- ❌ Generate fake data or examples
- ❌ Estimate metrics without parsing
- ❌ Use different calculations in different phases
- ❌ Create visualizations without data
- ❌ Report features not found in code
- ❌ Hide parsing failures or errors
- ❌ Overcomplicate the architecture
- ❌ Trust without verification

## Implementation Checklist

### Setup Phase
- [ ] Install GnuCOBOL v3.2.0 or later
- [ ] Create simple database schema (5-7 tables max)
- [ ] Set up validation framework
- [ ] Implement single parser module
- [ ] Create test suite

### Parsing Phase
- [ ] Validate each file with GnuCOBOL
- [ ] Generate complete AST
- [ ] Calculate all metrics in parser
- [ ] Store results with validation
- [ ] Log any parsing failures

### Analysis Phase
- [ ] Extract relationships from AST
- [ ] Build call graph
- [ ] Identify subsystems
- [ ] Map dependencies
- [ ] Cross-validate all findings

### Output Phase
- [ ] Generate reports from data
- [ ] Create visualizations
- [ ] Build summary dashboard
- [ ] Include validation results
- [ ] Document any limitations

## Validation Requirements

Every analysis run must include:
1. **Input validation**: Files exist and are readable
2. **Parse validation**: GnuCOBOL syntax check passes
3. **Metric validation**: Values within expected ranges
4. **Consistency validation**: Same file → same results
5. **Relationship validation**: All CALLs have targets
6. **Output validation**: Reports match database

## Expected Outputs

### 1. Database with:
- Parsed program metadata
- Calculated metrics
- Extracted relationships
- Validation results

### 2. Reports including:
- Executive summary with real numbers
- Program inventory with metrics
- Subsystem analysis
- Quality assessment
- Technical debt evaluation

### 3. Visualizations:
- Call graph (from real CALLs)
- Subsystem diagram (from clustering)
- Complexity distribution
- Dependency matrix

### 4. Validation report:
- Files processed successfully
- Parsing failures and reasons
- Metric calculation details
- Consistency check results
- Known limitations

## Error Handling

When errors occur:
1. Log the specific error with context
2. Continue processing other files
3. Report failures in final summary
4. Never hide or suppress errors
5. Provide actionable error messages

## Quality Gates

Before considering analysis complete:
- ✓ Parse success rate > 95%
- ✓ All metrics validated
- ✓ Consistency checks pass
- ✓ Documentation complete
- ✓ Known issues documented

## Remember

The goal is to provide accurate, reliable COBOL code analysis that helps organizations understand their systems. Every number must be real, every relationship must exist in code, and every visualization must be based on actual data. When in doubt, parse the code and report what you find - nothing more, nothing less.