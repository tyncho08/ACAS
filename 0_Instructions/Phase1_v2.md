### Phase 1 - Version 2.0: Deep Structural Analysis with Real Parsing

# CRITICAL SETUP REQUIREMENTS

Before starting Phase 1, you MUST:
1. Install a real COBOL parser: `npm install cobol-parser` or `npm install @broadwing/cobol-parser`
2. If parser fails, install GnuCOBOL and use: `cobc -fsyntax-only -fdiagnostics-plain-output`
3. DO NOT proceed with regex-based parsing under any circumstances

# Task 1.1: Intelligent COBOL File Discovery and Validation

## Objective
Discover, validate, and categorize all COBOL source files with initial quality assessment.

## Specific Instructions
1. **Discovery with Validation**:
   ```bash
   # Find all COBOL files and validate they are text files
   find . -type f \( -name "*.cbl" -o -name "*.cpy" -o -name "*.CPY" \) -exec file {} \; | grep -i "text"
   ```

2. **Initial Quality Check**:
   - Check file encoding (must handle EBCDIC if present)
   - Identify COBOL dialect (COBOL-85, COBOL-2002, GnuCOBOL extensions)
   - Flag files with non-standard extensions or formats

3. **Categorization**:
   - Separate programs (.cbl) from copybooks (.cpy/.CPY)
   - Identify program types: batch, online, subroutine, main program
   - Create metadata file: `file_discovery_metadata.json`

## Deliverable
```json
{
  "discovery_timestamp": "ISO-8601",
  "total_files": 288,
  "programs": {
    "count": 278,
    "types": {
      "main_programs": ["ACAS.cbl", "sales.cbl", ...],
      "subroutines": ["acas005.cbl", ...],
      "batch_programs": ["sl900.cbl", ...]
    }
  },
  "copybooks": {
    "count": 10,
    "files": ["screenio.cpy", ...]
  },
  "quality_issues": [
    {"file": "xyz.cbl", "issue": "Mixed encoding detected"}
  ]
}
```

---

# Task 1.2: Deep COBOL Parsing with AST Generation

## Objective
Parse each COBOL file using a real parser to generate complete Abstract Syntax Trees (AST).

## Parser Selection Hierarchy
1. **Primary**: Use `@broadwing/cobol-parser` with full AST generation
2. **Fallback**: Use GnuCOBOL with `cobc -fsyntax-only -fdiagnostics-json`
3. **Emergency**: If both fail, use ANTLR4 with COBOL grammar
4. **NEVER**: Do not use regex patterns for parsing

## Extraction Requirements

### A. Program Structure (from AST)
```javascript
{
  "program_id": "SL010",
  "nested_programs": ["SL010-VALIDATE", "SL010-CALC"],
  "divisions": {
    "identification": {
      "author": "extracted_value",
      "date_written": "extracted_value",
      "security": "extracted_value"
    },
    "environment": {
      "source_computer": "extracted_value",
      "object_computer": "extracted_value",
      "special_names": {...}
    },
    "data": {
      "file_section": [...],
      "working_storage": [...],
      "local_storage": [...],
      "linkage_section": [...]
    },
    "procedure": {
      "sections": [...],
      "paragraphs": [...]
    }
  }
}
```

### B. Control Flow Analysis
```javascript
{
  "entry_points": ["MAIN", "ALTERNATE-ENTRY"],
  "call_statements": [
    {
      "line": 1250,
      "type": "STATIC|DYNAMIC",
      "target": "ACAS005",
      "using": ["WS-DATE", "WS-FUNCTION"],
      "returning": "WS-RESULT",
      "on_exception": true,
      "context": "DATE-VALIDATION-ROUTINE"
    }
  ],
  "perform_statements": [
    {
      "line": 340,
      "type": "INLINE|PARAGRAPH|SECTION",
      "target": "VALIDATE-CUSTOMER",
      "until_condition": "WS-EOF = 'Y'",
      "varying": {...}
    }
  ],
  "goto_statements": [...],  // Flag as technical debt
  "exit_points": [...]
}
```

### C. Data Flow Analysis
```javascript
{
  "file_operations": [
    {
      "file": "CUSTOMER-FILE",
      "operations": ["OPEN INPUT", "READ", "CLOSE"],
      "record": "CUSTOMER-RECORD",
      "key_fields": ["CUST-ID"],
      "organization": "INDEXED"
    }
  ],
  "data_movements": [
    {
      "line": 445,
      "from": "CUSTOMER-RECORD",
      "to": "WS-CUSTOMER-DATA",
      "type": "MOVE CORRESPONDING"
    }
  ],
  "computations": [
    {
      "line": 890,
      "expression": "WS-TOTAL = WS-AMOUNT * WS-QUANTITY * (1 + WS-TAX-RATE)",
      "variables_used": ["WS-AMOUNT", "WS-QUANTITY", "WS-TAX-RATE"],
      "result": "WS-TOTAL"
    }
  ]
}
```

### D. Business Logic Extraction
```javascript
{
  "conditions": [
    {
      "line": 1100,
      "type": "IF",
      "condition": "CUSTOMER-CREDIT-LIMIT < ORDER-TOTAL AND CUSTOMER-STATUS = 'ACTIVE'",
      "true_branch": ["PERFORM CREDIT-EXCEEDED-ROUTINE"],
      "false_branch": ["PERFORM PROCESS-ORDER"],
      "business_rule": "Credit limit validation for active customers"
    }
  ],
  "evaluate_statements": [
    {
      "line": 2000,
      "subject": "ORDER-TYPE",
      "cases": [
        {"when": "'RUSH'", "action": "MOVE 1 TO PRIORITY"},
        {"when": "'NORMAL'", "action": "MOVE 5 TO PRIORITY"},
        {"when": "OTHER", "action": "MOVE 10 TO PRIORITY"}
      ],
      "business_rule": "Order priority assignment"
    }
  ],
  "validations": [
    {
      "field": "CUSTOMER-ZIP",
      "validation": "NUMERIC AND > 00000 AND < 99999",
      "error_handling": "MOVE 'INVALID-ZIP' TO ERROR-CODE"
    }
  ]
}
```

### E. Complexity Metrics (REAL)
```javascript
{
  "mccabe_complexity": 45,  // Count actual decision points
  "cognitive_complexity": 38,  // Include nesting levels
  "halstead_metrics": {
    "unique_operators": 45,  // FROM AST
    "unique_operands": 234,  // FROM AST
    "total_operators": 1567,  // FROM AST
    "total_operands": 3421   // FROM AST
  },
  "lines_of_code": {
    "total": 3500,
    "executable": 2800,
    "comments": 700
  },
  "technical_debt_indicators": {
    "goto_count": 5,
    "dead_code_sections": ["OBSOLETE-TAX-CALC"],
    "commented_code_blocks": 15,
    "missing_error_handlers": ["FILE-NOT-FOUND", "DUPLICATE-KEY"]
  }
}
```

### F. Dependencies Deep Dive
```javascript
{
  "copybooks": [
    {
      "name": "CUSTMAST",
      "line": 50,
      "used_fields": ["CUST-ID", "CUST-NAME", "CUST-BALANCE"],
      "unused_fields": ["CUST-OLD-CODE"],  // Dead field detection
      "replacing": [
        {"from": "==PREFIX==", "to": "WS"}
      ]
    }
  ],
  "external_calls": [
    {
      "program": "CBL_GET_CSR_POS",
      "type": "SYSTEM",
      "purpose": "Get cursor position"
    }
  ],
  "database_operations": [
    {
      "type": "EMBEDDED_SQL",
      "line": 3400,
      "statement": "SELECT CUST_NAME INTO :WS-CUST-NAME FROM CUSTOMERS WHERE CUST_ID = :WS-CUST-ID",
      "tables": ["CUSTOMERS"],
      "host_variables": ["WS-CUST-NAME", "WS-CUST-ID"]
    }
  ]
}
```

## Validation Requirements
1. **Every parsed file MUST include**:
   - AST node count > 0
   - At least one PROCEDURE DIVISION paragraph
   - Proper program termination (STOP RUN/GOBACK/EXIT PROGRAM)

2. **Quality Checks**:
   - Flag any file that cannot be parsed
   - Report parsing confidence (0.0-1.0)
   - Include parser warnings/errors

## Error Handling
```javascript
{
  "file": "sl010.cbl",
  "parse_status": "PARTIAL",
  "confidence": 0.85,
  "errors": [
    {
      "line": 1234,
      "severity": "WARNING",
      "message": "Unrecognized verb: EXAMINE",
      "suggestion": "Legacy COBOL-74 syntax, consider INSPECT"
    }
  ],
  "parsed_sections": ["IDENTIFICATION", "ENVIRONMENT", "DATA"],
  "failed_sections": ["PROCEDURE"],
  "fallback_parser_used": "GnuCOBOL"
}
```

---

# Task 1.3: Intelligent Data Persistence with Validation

## Objective
Store parsed data with validation, cross-referencing, and quality metrics.

## Database Schema 2.0
```sql
-- Programs table with quality metrics
CREATE TABLE programs (
    id INTEGER PRIMARY KEY,
    file_path TEXT UNIQUE,
    file_name TEXT,
    program_id TEXT,
    program_type TEXT CHECK(program_type IN ('MAIN', 'SUBROUTINE', 'BATCH', 'ONLINE')),
    parse_confidence REAL CHECK(parse_confidence >= 0 AND parse_confidence <= 1),
    mccabe_complexity INTEGER,
    cognitive_complexity INTEGER,
    maintainability_index REAL,
    total_lines INTEGER,
    executable_lines INTEGER,
    has_sql BOOLEAN,
    has_cics BOOLEAN,
    parse_timestamp TEXT,
    parser_used TEXT,
    validation_status TEXT CHECK(validation_status IN ('VALID', 'WARNING', 'ERROR'))
);

-- Enhanced call graph with metadata
CREATE TABLE program_calls (
    id INTEGER PRIMARY KEY,
    caller_program_id TEXT,
    called_program_id TEXT,
    call_type TEXT CHECK(call_type IN ('STATIC', 'DYNAMIC')),
    line_number INTEGER,
    using_params TEXT,  -- JSON array
    returning_param TEXT,
    on_exception BOOLEAN,
    in_section TEXT,
    confidence REAL,
    FOREIGN KEY (caller_program_id) REFERENCES programs(program_id)
);

-- Business rules table
CREATE TABLE business_rules (
    id INTEGER PRIMARY KEY,
    program_id TEXT,
    rule_type TEXT CHECK(rule_type IN ('VALIDATION', 'CALCULATION', 'DECISION', 'TRANSFORMATION')),
    line_number INTEGER,
    condition_text TEXT,
    action_text TEXT,
    business_description TEXT,
    complexity_contribution INTEGER,
    FOREIGN KEY (program_id) REFERENCES programs(program_id)
);

-- Data lineage
CREATE TABLE data_flows (
    id INTEGER PRIMARY KEY,
    program_id TEXT,
    source_field TEXT,
    target_field TEXT,
    transformation TEXT,
    line_number INTEGER,
    flow_type TEXT CHECK(flow_type IN ('MOVE', 'COMPUTE', 'TRANSFORM', 'AGGREGATE')),
    FOREIGN KEY (program_id) REFERENCES programs(program_id)
);

-- Quality metrics
CREATE TABLE quality_issues (
    id INTEGER PRIMARY KEY,
    program_id TEXT,
    issue_type TEXT,
    severity TEXT CHECK(severity IN ('INFO', 'WARNING', 'ERROR', 'CRITICAL')),
    line_number INTEGER,
    description TEXT,
    suggestion TEXT,
    FOREIGN KEY (program_id) REFERENCES programs(program_id)
);
```

## JSON Output Requirements
Each JSON file MUST include:
```javascript
{
  "metadata": {
    "parser_version": "1.2.3",
    "parse_timestamp": "ISO-8601",
    "parse_duration_ms": 1234,
    "confidence_score": 0.95,
    "validation_status": "VALID"
  },
  "ast": { /* Complete AST from parser */ },
  "extracted_data": { /* All extracted elements */ },
  "quality_report": {
    "issues": [...],
    "metrics": {...},
    "suggestions": [...]
  }
}
```

## Validation Script
Create `validate_phase1.js`:
```javascript
// This script MUST be run before marking Phase 1 complete
function validatePhase1Results() {
    // Check all programs have been parsed
    // Verify all CALL targets exist
    // Validate copybook references
    // Ensure no orphaned dependencies
    // Generate validation_report.html
}
```

## Summary Report 2.0
Must include:
- Parsing success rate (target: >95%)
- Confidence distribution graph
- Top 10 most complex programs with specific metrics
- Unresolved dependencies list
- Technical debt summary
- Recommended immediate actions

## Quality Gates
Phase 1 is ONLY complete when:
1. ✓ All files discovered and categorized
2. ✓ >95% parsing success rate
3. ✓ All CALL targets validated
4. ✓ All copybook references verified
5. ✓ Database integrity constraints pass
6. ✓ Validation script returns SUCCESS
7. ✓ Summary report shows no CRITICAL issues