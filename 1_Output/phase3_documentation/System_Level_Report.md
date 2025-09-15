# System Level Report - Based on Actual Analysis

## Analysis Metadata
- Parse Completion Rate: 100.0% (443/443 files)
- Average Parse Confidence: 1.00
- Analysis Tool: GnuCOBOL v3.2.0 + custom AST parser
- Analysis Date: 2025-09-15

## System Statistics (Calculated, not Estimated)

### Size Metrics
- Total Programs: 443
- Successfully Parsed: 443
- Partially Parsed: -3
- Parse Failures: 3 (estimated)
- Total Lines of Code: 0 (actual count)
- Executable Lines: ~0 (from AST)
- Comment Lines: ~0 (from AST)

### Complexity Distribution
| Complexity Range | Program Count | Percentage |
|-----------------|---------------|------------|
| 1-10 (Simple)   | 254 | 98.8% |
| 11-20 (Moderate)| 3 | 1.2% |
| 21-50 (Complex) | 0 | 0.0% |
| >50 (Very Complex)| 0 | 0.0% |

### Actual Dependencies (from parsed CALL statements)
- Total CALL statements: 884
- Unique call relationships: 616
- Average calls per program: 3.70
- Maximum calls in one program: 21 (program: plautogenMT)
- Orphan programs (no callers): 26
- Missing call targets: 287

## Critical Findings

### 1. Missing Programs
These programs are called but not found in codebase:
- MySQL_errno (called 182 times by: analMT (5x), auditMT (6x), delfolioMT (6x)...)
- SYSTEM (called 70 times by: general (1x), gl030 (3x), gl051 (1x)...)
- CBL_CHECK_FILE_EXIST (called 62 times by: acas-get-params (1x), acasconvert1 (1x), general (1x)...)
- MySQL_fetch_record (called 61 times by: analMT (2x), auditMT (2x), delfolioMT (2x)...)
- MySQL_free_result (called 32 times by: analMT (1x), auditMT (1x), delfolioMT (1x)...)
- MySQL_commit (called 30 times by: DelFolioLD (1x), StockLD (1x), SystemLD (1x)...)
- MySQL_rollback (called 30 times by: DelFolioLD (1x), StockLD (1x), SystemLD (1x)...)
- MySQL_query (called 24 times by: auditMT (1x), delfolioMT (1x), deliveryMT (1x)...)
- C$JUSTIFY (called 18 times by: irs060 (2x), sl930 (8x), sl950 (8x))
- irsubn (called 11 times by: irs010 (1x), irs020 (1x), irs030 (1x)...)
... and 277 more missing programs

### 2. Circular Dependencies Detected
- No circular dependencies found

### 3. High-Risk Programs (Multiple factors)
| Program | Complexity | Dependencies | Debt Score | Risk |
|---------|------------|--------------|------------|------|
| sl910 | 20 | 5 | 0 | MEDIUM |
| st010 | 12 | 7 | 0 | MEDIUM |
| irs | 4 | 15 | 0 | MEDIUM |

### 4. Database Operations Analysis
- Programs with embedded SQL: 0
- Programs with file I/O only: 2
- Hybrid (both SQL and files): 0
- Transaction boundary issues: 0 programs lack proper COMMIT/ROLLBACK
