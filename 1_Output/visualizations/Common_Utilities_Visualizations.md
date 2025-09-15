# Common Utilities - System Visualizations

**Generated from Code**: 2025-09-15T16:57:46.779Z

## 1. System Context Diagram

```mermaid
graph TB
    %% Context Diagram - Generated from actual CALL analysis
    %% Subsystem: Common_Utilities
    %% Internal Programs: 28
    %% External Dependencies: 25

    classDef internal fill:#e1f5e1,stroke:#4caf50,stroke-width:2px
    classDef external fill:#ffe0e0,stroke:#f44336,stroke-width:2px
    classDef subsystem fill:#e3f2fd,stroke:#2196f3,stroke-width:3px

    subgraph CommonUtilities["Common Utilities"]
        ACAS["ACAS"]
        acas000["ACAS000"]
        acas004["ACAS004"]
        acas005["ACAS005"]
        acas006["ACAS006"]
        more["... and 23 more programs"]
    end

    fhlogger["fhlogger"]:::external
    systemMT["systemMT"]:::external
    slautogenMT["slautogenMT"]:::external
    nominalMT["nominalMT"]:::external
    glpostingMT["glpostingMT"]:::external
    glbatchMT["glbatchMT"]:::external
    slpostingMT["slpostingMT"]:::external
    auditMT["auditMT"]:::external
    stockMT["stockMT"]:::external
    salesMT["salesMT"]:::external
    ACAS --> maps04
    ACAS --> acas000
    acas000 --> systemMT
    acas000 --> fhlogger
    acas004 --> slautogenMT
    acas004 --> fhlogger
    acas005 --> nominalMT
    acas005 --> fhlogger
    acas006 --> glpostingMT
    acas006 --> fhlogger
    acas007 --> glbatchMT
    acas007 --> fhlogger
    acas008 --> slpostingMT
    acas008 --> fhlogger
    acas010 --> auditMT
    acas010 --> fhlogger
    acas011 --> stockMT
    acas011 --> fhlogger
    acas012 --> salesMT
    acas012 --> fhlogger

    class CommonUtilities subsystem
    class ACAS internal
    class acas000 internal
    class acas004 internal
    class acas005 internal
    class acas006 internal
```

**Evidence**: Generated from 50 actual CALL statements in code
**Confidence**: 1.0 (from parsed AST)

## 2. Program Flow Diagrams

### ACAS Flow

```mermaid
flowchart TD
    %% Program Flow - ACAS
    %% Generated from PERFORM/GOTO analysis
    %% Sections: 53, PERFORMs: 0

    classDef performed fill:#e8f5e9,stroke:#4caf50
    classDef dead fill:#ffebee,stroke:#f44336
    classDef entry fill:#fff3e0,stroke:#ff9800

    Start([Start]):::entry
    S0["input-output<br/>Line: 221"]:::performed
    S1["working-storage<br/>Line: 227"]:::dead
    S2["ACAS-Main<br/>Line: 347"]:::dead
    S3["Get-Term-Settings<br/>Line: 356"]:::dead
    S4["Open-System<br/>Line: 372"]:::dead
    S5["end-if<br/>Line: 416"]:::dead
    S6["Display-Menu<br/>Line: 428"]:::dead
    S7["Conv-date<br/>Line: 442"]:::dead
    S8["end-if<br/>Line: 461"]:::dead
    S9["conv-date-end<br/>Line: 463"]:::dead
    S10["Display-Go<br/>Line: 466"]:::dead
    S11["accept-loop<br/>Line: 509"]:::dead
    S12["call-system-setup<br/>Line: 528"]:::dead
    S13["file-defs<br/>Line: 537"]:::dead
    S14["overrewrite<br/>Line: 543"]:::dead
    S15["overclose<br/>Line: 545"]:::dead
    S16["goback<br/>Line: 546"]:::dead
    S17["load-it<br/>Line: 548"]:::dead
    S18["loaderror<br/>Line: 569"]:::dead
    S19["load00<br/>Line: 574"]:::dead
    S20["load00-exit<br/>Line: 582"]:::dead
    S21["load01<br/>Line: 586"]:::dead
    S22["load02<br/>Line: 592"]:::dead
    S23["load03<br/>Line: 598"]:::dead
    S24["load04<br/>Line: 604"]:::dead
    S25["load05<br/>Line: 610"]:::dead
    S26["load06<br/>Line: 616"]:::dead
    S27["load07<br/>Line: 622"]:::dead
    S28["load08<br/>Line: 628"]:::dead
    S29["load09<br/>Line: 634"]:::dead
    S30["load23<br/>Line: 638"]:::dead
    S31["loadsr<br/>Line: 643"]:::dead
    S32["loadsr2<br/>Line: 649"]:::dead
    S33["main-exit<br/>Line: 655"]:::dead
    S34["zz060-Convert-Date<br/>Line: 658"]:::dead
    S35["zz060-Exit<br/>Line: 690"]:::dead
    S36["exit<br/>Line: 691"]:::dead
    S37["maps04<br/>Line: 693"]:::dead
    S38["maps04-exit<br/>Line: 698"]:::dead
    S39["exit<br/>Line: 699"]:::dead
    S40["zz100-ACAS-IRS-Calls<br/>Line: 701"]:::dead
    S41["acas000<br/>Line: 709"]:::dead
    S42["end-call<br/>Line: 716"]:::dead
    S43["System-Open<br/>Line: 722"]:::dead
    S44["System-Open-Input<br/>Line: 728"]:::dead
    S45["System-Close<br/>Line: 734"]:::dead
    S46["System-Read-Next<br/>Line: 738"]:::dead
    S47["System-Read-Indexed<br/>Line: 742"]:::dead
    S48["System-Write<br/>Line: 746"]:::dead
    S49["System-Rewrite<br/>Line: 750"]:::dead
    S50["System-Check-4-Errors<br/>Line: 754"]:::dead
    S51["end-if<br/>Line: 759"]:::dead
    S52["goback<br/>Line: 770"]:::dead
    Start --> S0
    S0 --> S1
    S1 --> S2
    S2 --> S3
    S3 --> S4
    S4 --> S5
    S5 --> S6
    S6 --> S7
    S7 --> S8
    S8 --> S9
    S9 --> S10
    S10 --> S11
    S11 --> S12
    S12 --> S13
    S13 --> S14
    S14 --> S15
    S15 --> S16
    S16 --> S17
    S17 --> S18
    S18 --> S19
    S19 --> S20
    S20 --> S21
    S21 --> S22
    S22 --> S23
    S23 --> S24
    S24 --> S25
    S25 --> S26
    S26 --> S27
    S27 --> S28
    S28 --> S29
    S29 --> S30
    S30 --> S31
    S31 --> S32
    S32 --> S33
    S33 --> S34
    S34 --> S35
    S35 --> S36
    S36 --> S37
    S37 --> S38
    S38 --> S39
    S39 --> S40
    S40 --> S41
    S41 --> S42
    S42 --> S43
    S43 --> S44
    S44 --> S45
    S45 --> S46
    S46 --> S47
    S47 --> S48
    S48 --> S49
    S49 --> S50
    S50 --> S51
    S51 --> S52
    S52 --> End([End])
```

**Evidence**: From 53 sections, 0 PERFORM statements
**Warning**: 52 potentially dead code sections detected
### ACAS000 Flow

```mermaid
flowchart TD
    %% Program Flow - acas000
    %% Generated from PERFORM/GOTO analysis
    %% Sections: 29, PERFORMs: 0

    classDef performed fill:#e8f5e9,stroke:#4caf50
    classDef dead fill:#ffebee,stroke:#f44336
    classDef entry fill:#fff3e0,stroke:#ff9800

    Start([Start]):::entry
    S0["input-output<br/>Line: 251"]:::performed
    S1["file-control<br/>Line: 252"]:::dead
    S2["file<br/>Line: 257"]:::dead
    S3["working-storage<br/>Line: 261"]:::dead
    S4["Linkage<br/>Line: 281"]:::dead
    S5["ACAS-DAL-Common-data<br/>Line: 313"]:::dead
    S6["aa-Process-Flat-File<br/>Line: 316"]:::dead
    S7["aa010-main<br/>Line: 318"]:::dead
    S8["end-evaluate<br/>Line: 338"]:::dead
    S9["end-evaluate<br/>Line: 383"]:::dead
    S10["aa020-Process-Open<br/>Line: 388"]:::dead
    S11["end-if<br/>Line: 398"]:::dead
    S12["end-if<br/>Line: 428"]:::dead
    S13["aa030-Process-Close<br/>Line: 434"]:::dead
    S14["aa050-Process-Read-Indexed<br/>Line: 451"]:::dead
    S15["aa100-Bad-Function<br/>Line: 485"]:::dead
    S16["aa999-main-exit<br/>Line: 492"]:::dead
    S17["end-if<br/>Line: 495"]:::dead
    S18["aa-main-exit<br/>Line: 497"]:::dead
    S19["aa-Exit<br/>Line: 501"]:::dead
    S20["ba-Process-RDBMS<br/>Line: 504"]:::dead
    S21["ba010-Test-WS-Rec-Size<br/>Line: 513"]:::dead
    S22["ba012-Test-WS-Rec-Size-2<br/>Line: 521"]:::dead
    S23["end-if<br/>Line: 561"]:::dead
    S24["ba015-Test-Ends<br/>Line: 563"]:::dead
    S25["end-evaluate<br/>Line: 593"]:::dead
    S26["ba-rdbms-exit<br/>Line: 597"]:::dead
    S27["exit<br/>Line: 598"]:::dead
    S28["ACAS-DAL-Common-data<br/>Line: 605"]:::dead
    Start --> S0
    S0 --> S1
    S1 --> S2
    S2 --> S3
    S3 --> S4
    S4 --> S5
    S5 --> S6
    S6 --> S7
    S7 --> S8
    S8 --> S9
    S9 --> S10
    S10 --> S11
    S11 --> S12
    S12 --> S13
    S13 --> S14
    S14 --> S15
    S15 --> S16
    S16 --> S17
    S17 --> S18
    S18 --> S19
    S19 --> S20
    S20 --> S21
    S21 --> S22
    S22 --> S23
    S23 --> S24
    S24 --> S25
    S25 --> S26
    S26 --> S27
    S27 --> S28
    S28 --> End([End])
```

**Evidence**: From 29 sections, 0 PERFORM statements
**Warning**: 28 potentially dead code sections detected
## 3. Data Flow Diagram

```mermaid
graph LR
    %% Data Flow Diagram - Common_Utilities
    %% Generated from MOVE/COMPUTE statements and file operations

    classDef file fill:#fff9c4,stroke:#f57f17
    classDef process fill:#e1f5fe,stroke:#0288d1
    classDef data fill:#f3e5f5,stroke:#7b1fa2

    ACAS["ACAS<br/>Process"]:::process
    acas000["ACAS000<br/>Process"]:::process
    acas004["ACAS004<br/>Process"]:::process
    acas005["ACAS005<br/>Process"]:::process
    acas006["ACAS006<br/>Process"]:::process
```

**Evidence**: Generated from 0 file operations in code
**Files**: 0 data files accessed
## 4. Call Hierarchy

```mermaid
graph TD
    %% Call Hierarchy - Common_Utilities
    %% Generated from actual CALL statements

    ACAS["ACAS"]
    maps04["maps04"]
    ACAS --> maps04
    acas000["acas000"]
    ACAS --> acas000
    acas004["acas004"]
    slautogenMT["slautogenMT"]
    acas004 --> slautogenMT
    fhlogger["fhlogger"]
    acas004 --> fhlogger
    acas005["acas005"]
    nominalMT["nominalMT"]
    acas005 --> nominalMT
    acas005 --> fhlogger
```

**Evidence**: 50 CALL relationships analyzed
**Root Programs**: ACAS, acas004, acas005

## Diagram Validation

- ✅ All diagrams generated from actual code analysis
- ✅ Source programs and line numbers traceable
- ✅ "Generated from code" watermark included
- ✅ No assumptions - only documented relationships
