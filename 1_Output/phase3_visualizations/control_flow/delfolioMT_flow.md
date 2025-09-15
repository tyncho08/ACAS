```mermaid
flowchart TD
    %% Control Flow - delfolioMT
    %% McCabe Complexity: 31
    %% Sections: 49, PERFORMs: 0

    Start([Start])
    S0["input-output<br/>Lines: 205-null"]:::dead
    S1["Working-Storage<br/>Lines: 207-null"]:::dead
    S2["Linkage<br/>Lines: 286-null"]:::dead
    S3["screen<br/>Lines: 297-null"]:::dead
    S4["ba-ACAS-DAL-Process<br/>Lines: 319-null"]:::dead
    S5["ba010-Initialise<br/>Lines: 330-null"]:::dead
    S6["SQL-State<br/>Lines: 341-null"]:::dead
    S7["end-evaluate<br/>Lines: 372-null"]:::dead
    S8["ba020-Process-Open<br/>Lines: 374-null"]:::dead
    S9["end-string<br/>Lines: 382-null"]:::dead
    S10["end-string<br/>Lines: 386-null"]:::dead
    S11["end-string<br/>Lines: 390-null"]:::dead
    S12["end-string<br/>Lines: 394-null"]:::dead
    S13["end-string<br/>Lines: 398-null"]:::dead
    S14["end-string<br/>Lines: 402-null"]:::dead
    S15["ba030-Process-Close<br/>Lines: 418-null"]:::dead
    S16["ba040-Process-Read-Next<br/>Lines: 433-null"]:::dead
    S17["end-if<br/>Lines: 506-null"]:::dead
    S18["ba041-Reread<br/>Lines: 508-null"]:::dead
    S19["end-if<br/>Lines: 552-null"]:::dead
    S20["end-if<br/>Lines: 558-null"]:::dead
    S21["ba050-Process-Read-Indexed<br/>Lines: 565-null"]:::dead
    S22["end-if<br/>Lines: 589-null"]:::dead
    S23["ba060-Process-Start<br/>Lines: 653-null"]:::dead
    S24["ba070-Process-Write<br/>Lines: 764-null"]:::dead
    S25["end-if<br/>Lines: 788-null"]:::dead
    S26["ba080-Process-Delete<br/>Lines: 791-null"]:::dead
    S27["end-if<br/>Lines: 843-null"]:::dead
    S28["end-if<br/>Lines: 924-null"]:::dead
    S29["ba090-Process-Rewrite<br/>Lines: 928-null"]:::dead
    S30["ba100-Bad-Function<br/>Lines: 973-null"]:::dead
    S31["ba998-Free<br/>Lines: 985-null"]:::dead
    S32["ba999-end<br/>Lines: 997-null"]:::dead
    S33["end-if<br/>Lines: 1002-null"]:::dead
    S34["ba999-exit<br/>Lines: 1004-null"]:::dead
    S35["bb000-HV-Load<br/>Lines: 1007-null"]:::dead
    S36["bb000-Exit<br/>Lines: 1023-null"]:::dead
    S37["exit<br/>Lines: 1024-null"]:::dead
    S38["bb100-UnloadHVs<br/>Lines: 1026-null"]:::dead
    S39["bb100-Exit<br/>Lines: 1040-null"]:::dead
    S40["exit<br/>Lines: 1041-null"]:::dead
    S41["bb200-Insert<br/>Lines: 1043-null"]:::dead
    S42["bb200-Exit<br/>Lines: 1096-null"]:::dead
    S43["exit<br/>Lines: 1097-null"]:::dead
    S44["bb300-Update<br/>Lines: 1099-null"]:::dead
    S45["bb300-Exit<br/>Lines: 1156-null"]:::dead
    S46["exit<br/>Lines: 1157-null"]:::dead
    S47["Ca-Process-Logs<br/>Lines: 1159-null"]:::dead
    S48["ACAS-DAL-Common-data<br/>Lines: 1163-null"]:::dead
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
    S48 --> End([End])

    classDef dead fill:#ffebee,stroke:#f44336
```

**Complexity Analysis:**
- Total Business Rules: 4
- IF Statements: 0
- Complex Conditions: 0
- Decision Logic: 4

**Warning:** 48 potentially dead sections detected
