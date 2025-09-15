# ACAS Subsystem Discovery Report

## Methodology

Subsystem discovery was performed using a data-driven approach:

1. **Program Analysis**: Analyzed 443 COBOL programs from Phase 1 parsing
2. **Call Graph Construction**: Built dependency matrix from 616 program calls
3. **Resource Sharing Analysis**: Identified shared copybooks and files
4. **Cohesion Metrics**: Calculated internal vs external coupling ratios
5. **Pattern Recognition**: Grouped programs by naming conventions and verified with metrics

## Discovered Subsystems

### Sales Ledger - Confidence: 0.86

**Programs**: 36 programs
**Cohesion Score**: 0.04

**Key Evidence**:
- 4 internal calls vs 108 external calls
- Shared copybooks (65): of, envdiv, slwsinv, slwsinv2, wsanal, ... and 60 more
- External dependencies: 9 programs
- Business focus: Customer management, sales orders, invoicing, receivables tracking

**Core Programs**:
- sales (0 lines, complexity: 7)
- sl000 (0 lines, complexity: 4)
- sl010 (0 lines, complexity: 5)
- sl020 (0 lines, complexity: 5)
- sl050 (0 lines, complexity: 6)
- sl055 (0 lines, complexity: 3)
- sl060 (0 lines, complexity: 8)
- sl070 (0 lines, complexity: 6)
- sl080 (0 lines, complexity: 4)
- sl085 (0 lines, complexity: 3)
- ... and 26 more programs

### Purchase Ledger - Confidence: 0.84

**Programs**: 34 programs
**Cohesion Score**: 0.02

**Key Evidence**:
- 1 internal calls vs 61 external calls
- Shared copybooks (58): of, envdiv, wsmaps03, wsfnctn, wscall, ... and 53 more
- External dependencies: 6 programs
- Business focus: Supplier management, purchase orders, payables processing

**Core Programs**:
- pl000 (0 lines, complexity: 4)
- pl010 (0 lines, complexity: 5)
- pl015 (0 lines, complexity: 5)
- pl020 (0 lines, complexity: 8)
- pl025 (0 lines, complexity: 3)
- pl030 (0 lines, complexity: 4)
- pl040 (0 lines, complexity: 3)
- pl050 (0 lines, complexity: 5)
- pl055 (0 lines, complexity: 3)
- pl060 (0 lines, complexity: 8)
- ... and 24 more programs

### Common Utilities - Confidence: 0.78

**Programs**: 28 programs
**Cohesion Score**: 0.16

**Key Evidence**:
- 9 internal calls vs 46 external calls
- Shared copybooks (62): of, envdiv, sys-params-versioning, wstime, wsfnctn, ... and 57 more
- External dependencies: 25 programs
- Business focus: Shared services, system utilities, date/time functions

**Core Programs**:
- ACAS (0 lines, complexity: 7)
- acas000 (0 lines, complexity: 18)
- acas004 (0 lines, complexity: 26)
- acas005 (0 lines, complexity: 25)
- acas006 (0 lines, complexity: 18)
- acas007 (0 lines, complexity: 18)
- acas008 (0 lines, complexity: 19)
- acas010 (0 lines, complexity: 15)
- acas011 (0 lines, complexity: 28)
- acas012 (0 lines, complexity: 27)
- ... and 18 more programs

### IRS Module - Confidence: 0.68

**Programs**: 18 programs
**Cohesion Score**: 0.25

**Key Evidence**:
- 14 internal calls vs 42 external calls
- Shared copybooks (18): for, of, envdiv, irsfdwsnl, irswsnl, ... and 13 more
- External dependencies: 12 programs
- Business focus: Tax calculations, IRS reporting, compliance

**Core Programs**:
- acasirsub1 (0 lines, complexity: 27)
- acasirsub3 (0 lines, complexity: 11)
- acasirsub4 (0 lines, complexity: 18)
- acasirsub5 (0 lines, complexity: 11)
- irs (0 lines, complexity: 21)
- irs000 (0 lines, complexity: 3)
- irs010 (0 lines, complexity: 8)
- irs020 (0 lines, complexity: 6)
- irs030 (0 lines, complexity: 7)
- irs040 (0 lines, complexity: 4)
- ... and 8 more programs

### General Ledger - Confidence: 0.65

**Programs**: 15 programs
**Cohesion Score**: 0.00

**Key Evidence**:
- 0 internal calls vs 26 external calls
- Shared copybooks (25): of, envdiv, wsmaps03, wscall, wsfnctn, ... and 20 more
- External dependencies: 6 programs
- Business focus: Financial accounting, chart of accounts, journal entries, reporting

**Core Programs**:
- general (0 lines, complexity: 6)
- gl000 (0 lines, complexity: 4)
- gl020 (0 lines, complexity: 4)
- gl030 (0 lines, complexity: 10)
- gl050 (0 lines, complexity: 4)
- gl051 (0 lines, complexity: 6)
- gl060 (0 lines, complexity: 4)
- gl070 (0 lines, complexity: 3)
- gl071 (0 lines, complexity: 2)
- gl072 (0 lines, complexity: 3)
- ... and 5 more programs

### Stock Control - Confidence: 0.58

**Programs**: 8 programs
**Cohesion Score**: 0.00

**Key Evidence**:
- 0 internal calls vs 32 external calls
- Shared copybooks (19): of, envdiv, wsmaps01, wsmaps03, wsfnctn, ... and 14 more
- External dependencies: 10 programs
- Business focus: Inventory management, stock movements, valuations

**Core Programs**:
- st000 (0 lines, complexity: 4)
- st010 (0 lines, complexity: 23)
- st020 (0 lines, complexity: 22)
- st030 (0 lines, complexity: 22)
- st040 (0 lines, complexity: 7)
- st050 (0 lines, complexity: 4)
- st060 (0 lines, complexity: 9)
- stock (0 lines, complexity: 9)

## Subsystem Interaction Matrix

(Diagonal = internal cohesion, Off-diagonal = coupling ratio)

| | Sales_Le | Purchase | General_ | Stock_Co | IRS_Modu | Common_U |
|---|---|---|---|---|---|---|
| Sales_Le | 0.04 | 0.00 | 0.00 | 0.00 | 0.00 | 0.31 |
| Purchase | 0.00 | 0.02 | 0.00 | 0.00 | 0.00 | 0.45 |
| General_ | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.54 |
| Stock_Co | 0.03 | 0.00 | 0.00 | 0.00 | 0.00 | 0.31 |
| IRS_Modu | 0.00 | 0.00 | 0.00 | 0.00 | 0.25 | 0.05 |
| Common_U | 0.00 | 0.00 | 0.00 | 0.00 | 0.00 | 0.16 |

## Other Programs

126 programs with mixed functionality:

- ACAS-Sysout
- CBL_OC_DUMP
- DelFolioLD
- MAKESQLTABLE
- PurchaseRES
- PurchaseUNL
- StockLD
- SystemLD
- SystemRES
- SystemUNL
- acas-get-params
- acasconvert1
- acasconvert2
- acasconvert3
- analLD
- analMT
- analRES
- analUNL
- auditLD
- auditMT
- ... and 106 more

## Validation

Each discovered subsystem meets the following criteria:
- ✅ Minimum 3 programs per subsystem (except utilities)
- ✅ Cohesion scores calculated from actual call data
- ✅ Evidence-based grouping with metrics
