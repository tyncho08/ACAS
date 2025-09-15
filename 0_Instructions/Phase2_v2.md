### Phase 2 - Version 2.0: Evidence-Based Functional Analysis

# PREREQUISITE CHECK
Before starting Phase 2:
1. Verify Phase 1 validation report shows SUCCESS
2. Confirm database has actual parsed data (not estimates)
3. Load and verify business_rules table has entries
4. If any check fails, DO NOT PROCEED - fix Phase 1 first

# Task 2.1: Data-Driven Subsystem Discovery

## Objective
Use clustering algorithms and dependency analysis to discover REAL subsystems based on actual code relationships, not assumptions.

## Methodology
```javascript
// DO NOT manually group by directory names
// Use actual program relationships:

function discoverSubsystems() {
    // 1. Build adjacency matrix from program_calls
    const callGraph = buildCallGraph();
    
    // 2. Analyze strongly connected components
    const components = findStronglyConnectedComponents(callGraph);
    
    // 3. Analyze shared data usage
    const dataAffinity = analyzeSharedDataStructures();
    
    // 4. Cluster based on:
    //    - Call frequency
    //    - Shared copybooks
    //    - File access patterns
    //    - Business rule similarity
    
    return clusterPrograms(components, dataAffinity);
}
```

## Discovery Criteria 2.0
1. **Quantitative Metrics** (not subjective assessment):
   - Call density between programs > 0.7
   - Shared copybook usage > 60%
   - Common file access patterns
   - Similar business rule patterns from AST

2. **Evidence Requirements**:
   ```json
   {
     "subsystem_name": "Customer Management",  
     "evidence": {
       "programs": ["sl010", "sl020", "sl030"],
       "metrics": {
         "internal_cohesion": 0.85,
         "external_coupling": 0.15,
         "shared_copybooks": ["CUSTMAST", "CUSTBAL"],
         "shared_files": ["CUSTOMER-MASTER", "CUSTOMER-TRANS"],
         "common_calls": ["VALIDATE-CUST", "CALC-BALANCE"],
         "business_rules": [
           {"type": "validation", "pattern": "CUST-STATUS", "count": 15},
           {"type": "calculation", "pattern": "BALANCE|CREDIT", "count": 23}
         ]
       },
       "justification": "Programs form tightly coupled cluster with 85% internal calls"
     }
   }
   ```

3. **Validation**:
   - Each subsystem MUST have cohesion score > 0.6
   - Cross-subsystem coupling MUST be < 0.3
   - Minimum 3 programs per subsystem (except utilities)

## Deliverable Structure
```markdown
# SUBSYSTEM_DISCOVERY.md

## Methodology
[Explain the clustering algorithm used and parameters]

## Discovered Subsystems

### 1. [Name] - Confidence: 0.92
**Programs**: [List with evidence why grouped together]
**Cohesion Score**: 0.85
**Key Evidence**:
- 45 internal calls vs 5 external calls
- Shared copybooks: CUSTMAST (used by 90% of programs)
- Common file: CUSTOMER-MASTER (all programs perform CRUD)
- Business focus: Customer validation rules (found in all programs)

### Subsystem Interaction Matrix
|          | Sub1 | Sub2 | Sub3 |
|----------|------|------|------|
| Sub1     | 0.85 | 0.12 | 0.03 |
| Sub2     | 0.12 | 0.80 | 0.15 |
| Sub3     | 0.03 | 0.15 | 0.78 |

### Unassigned Programs
[List programs that don't clearly belong to any subsystem]
```

---

# Task 2.2: Code-Based Functional Specification

## Objective
Extract ACTUAL functionality from parsed code - no inference, no assumptions.

## CRITICAL RULE
> Every statement in the functional documentation MUST have a code reference.
> If you cannot find code evidence, write "NOT FOUND IN CODE"

## Documentation Template 2.0

### 1. Executive Summary
```markdown
## Executive Summary

**Programs Analyzed**: sl010.cbl, sl020.cbl, sl030.cbl
**Total Lines of Code**: 12,455
**Parse Confidence**: 0.94

### Discovered Functionality (from AST analysis):
- Customer validation: 23 validation rules found
- Credit calculation: 5 calculation routines identified  
- Order processing: 12 state transitions documented

### Data Entities Managed:
- CUSTOMER-MASTER (File: lines 145-167 in sl010.cbl)
- ORDER-HEADER (File: lines 201-234 in sl020.cbl)
- CREDIT-HISTORY (File: lines 89-102 in sl030.cbl)
```

### 2. Functional Capabilities - WITH CODE EVIDENCE
```markdown
## Functional Capabilities

### 2.1 Customer Validation
**Evidence**: sl010.cbl, lines 1250-1390

```cobol
* Actual code from sl010.cbl:
1250  VALIDATE-CUSTOMER SECTION.
1251      IF CUST-STATUS = 'I' OR 'S'
1252          MOVE 'INVALID-STATUS' TO ERROR-CODE
1253          GO TO VALIDATE-EXIT.
1254      IF CUST-CREDIT-LIMIT < ORDER-TOTAL
1255          PERFORM CHECK-CREDIT-OVERRIDE
1256      END-IF.
```

**Extracted Rules**:
1. Customers with status 'I' (Inactive) or 'S' (Suspended) cannot place orders
2. Orders exceeding credit limit require override check
3. [Continue with ALL found rules...]

### 2.2 Credit Calculations
**Evidence**: sl020.cbl, lines 2300-2450

```cobol
* Actual code from sl020.cbl:
2300  CALCULATE-AVAILABLE-CREDIT.
2301      COMPUTE WS-AVAILABLE-CREDIT = 
2302          CUST-CREDIT-LIMIT - CUST-CURRENT-BALANCE
2303          - CUST-OPEN-ORDERS.
```

**Formula**: Available Credit = Credit Limit - Current Balance - Open Orders
**Variables**:
- CUST-CREDIT-LIMIT: From CUSTOMER-MASTER (PIC 9(7)V99)
- CUST-CURRENT-BALANCE: From CUSTOMER-MASTER (PIC S9(7)V99)
- CUST-OPEN-ORDERS: From CUSTOMER-MASTER (PIC 9(7)V99)
```

### 3. Data Domain - FROM FILE DESCRIPTIONS
```markdown
## Data Domain

### CUSTOMER-MASTER File
**Definition**: sl010.cbl, lines 145-167
**Organization**: INDEXED
**Key**: CUST-ID (PIC X(10))

```cobol
* Actual FD from sl010.cbl:
0145  FD  CUSTOMER-MASTER
0146      LABEL RECORDS ARE STANDARD
0147      BLOCK CONTAINS 0 RECORDS.
0148  01  CUSTOMER-RECORD.
0149      05  CUST-ID           PIC X(10).
0150      05  CUST-NAME         PIC X(35).
0151      05  CUST-STATUS       PIC X.
0152          88  ACTIVE-CUST   VALUE 'A'.
0153          88  INACTIVE-CUST VALUE 'I'.
0154      05  CUST-CREDIT-LIMIT PIC 9(7)V99.
```

### Data Relationships (from PROCEDURE DIVISION)
- CUSTOMER → ORDERS: One-to-Many (Evidence: sl030.cbl line 567)
- CUSTOMER → CREDIT-HISTORY: One-to-Many (Evidence: sl030.cbl line 890)
```

### 4. Interface Contracts - ACTUAL LINKAGE
```markdown
## Interface Contracts

### Program: sl010 - Customer Validation
**Entry Point**: LINKAGE SECTION analysis

```cobol
* From sl010.cbl LINKAGE SECTION:
3500  LINKAGE SECTION.
3501  01  LK-CUSTOMER-ID      PIC X(10).
3502  01  LK-VALIDATION-RESULT.
3503      05  LK-RETURN-CODE  PIC XX.
3504      05  LK-ERROR-MSG    PIC X(50).

3510  PROCEDURE DIVISION USING LK-CUSTOMER-ID
3511                          LK-VALIDATION-RESULT.
```

**Interface**:
- Input: LK-CUSTOMER-ID (PIC X(10))
- Output: LK-RETURN-CODE (PIC XX)
  - '00' = Valid customer
  - '01' = Customer not found
  - '02' = Customer inactive
  - '03' = Credit exceeded
- Output: LK-ERROR-MSG (PIC X(50))
```

### 5. Business Rules Engine - EXTRACTED FROM CONDITIONS
```markdown
## Business Rules (Extracted from AST)

### Rule BR001: Customer Status Validation
**Source**: sl010.cbl, lines 1251-1253
**Type**: Validation
**Implementation**:
```cobol
IF CUST-STATUS = 'I' OR 'S'
    MOVE 'INVALID-STATUS' TO ERROR-CODE
```
**Business Logic**: Inactive or Suspended customers cannot transact

### Rule BR002: Credit Limit Check  
**Source**: sl010.cbl, lines 1254-1256
**Complexity**: Compound condition with override
[Continue with ALL rules found in code...]
```

### 6. Error Handling Patterns - FROM CODE
```markdown
## Error Handling Analysis

### File Error Handling
**Pattern Found**: sl010.cbl lines 445-467
```cobol
0445  OPEN INPUT CUSTOMER-MASTER.
0446  IF WS-FILE-STATUS NOT = '00'
0447      PERFORM FILE-ERROR-ROUTINE
0448      GO TO PROGRAM-EXIT.
```

### Documented Error Codes:
- '00': Successful
- '23': Record not found (Evidence: line 789)
- '35': File not found (Evidence: line 456)
[List ALL error codes found in code]
```

## Validation Requirements
Each functional document MUST:
1. Have >80% statements backed by code references
2. Include actual code snippets (not paraphrased)
3. List all assumptions separately
4. Flag any undocumented behavior

## Quality Check Script
```javascript
function validateFunctionalDoc(doc) {
    const codeReferences = extractCodeReferences(doc);
    const statements = extractStatements(doc);
    
    const backedByCode = statements.filter(s => 
        hasCodeReference(s, codeReferences)
    );
    
    const percentage = (backedByCode.length / statements.length) * 100;
    
    if (percentage < 80) {
        throw new Error(`Only ${percentage}% of statements have code evidence`);
    }
}
```

---

# Task 2.3: Auto-Generated Visualizations from Code

## Objective
Generate diagrams that EXACTLY represent the code structure, not idealized versions.

## Requirements

### 1. Context Diagram - From Actual CALL Analysis
```javascript
// Build from program_calls and external_interfaces tables
function generateContextDiagram(subsystem) {
    const internal = getInternalPrograms(subsystem);
    const externalCalls = getExternalCalls(subsystem);
    const fileTouches = getFileTouches(subsystem);
    
    // Generate Mermaid showing ACTUAL connections
    // Not theoretical connections
}
```

### 2. Flow Diagrams - From PERFORM/GOTO Analysis
```javascript
// Build from actual PERFORM statements and sections
function generateFlowDiagram(program) {
    const sections = getSectionsFromAST(program);
    const performs = getPerformStatements(program);
    const gotos = getGotoStatements(program);
    
    // Create ACTUAL flow, including:
    // - Dead code sections (marked in red)
    // - Circular dependencies
    // - Multiple entry points
}
```

### 3. Data Flow - From MOVE/COMPUTE Statements
```javascript
// Trace actual data movement
function generateDataFlow(program) {
    const moves = getMoveStatements(program);
    const computes = getComputeStatements(program);
    const fileOps = getFileOperations(program);
    
    // Show ACTUAL data transformations
    // Include intermediate variables
}
```

### 4. State Machines - From Business Rules
```javascript
// Extract from IF/EVALUATE conditions
function generateStateMachine(entity) {
    const stateFields = findStateFields(entity);
    const transitions = findStateTransitions(entity);
    
    // Only include states found in code
    // Mark unreachable states
}
```

## Diagram Validation
Each diagram MUST include:
- Source program and line numbers
- Confidence score
- "Generated from code" watermark
- List of assumptions (if any)

---

# Task 2.4: Automated Documentation Assembly

## Requirements
1. **Verify all documents are evidence-based**:
   ```bash
   grep -c "Evidence:" *.md  # Should show high counts
   grep -c "NOT FOUND IN CODE" *.md  # Should be minimal
   ```

2. **Create traceability matrix**:
   ```
   | Statement | Source File | Line Numbers | Confidence |
   |-----------|-------------|--------------|------------|
   | "Credit limit check" | sl010.cbl | 1254-1256 | 1.0 |
   | "Tax calculation" | NOT FOUND | N/A | 0.0 |
   ```

3. **Generate coverage report**:
   - % of programs analyzed
   - % of business rules extracted
   - % of data flows mapped
   - % of interfaces documented

## Final Validation Gate
Phase 2 is complete when:
1. ✓ All subsystems discovered through clustering
2. ✓ >80% of documentation has code evidence  
3. ✓ All diagrams generated from actual code
4. ✓ Traceability matrix complete
5. ✓ No "inferred" or "assumed" functionality without marking