# Stock Control System - Visualizations

## 1. Context Diagram

```mermaid
graph TB
    subgraph "External Systems"
        SL[Sales Ledger]
        PL[Purchase Ledger]
        GL[General Ledger]
    end
    
    subgraph "Users"
        WHSE[Warehouse Staff]
        PROD[Production]
        MGMT[Management]
    end
    
    subgraph "Stock Control System"
        ST[Stock Control Core]
    end
    
    WHSE -->|Stock Movements| ST
    PROD -->|Work Orders| ST
    MGMT -->|Reports/Analysis| ST
    
    SL -->|Sales Orders| ST
    PL -->|Purchase Orders| ST
    ST -->|Stock Values| GL
    ST -->|Availability| SL
    ST -->|Reorder Info| PL
```
## 2. Functional Flow Diagram

```mermaid
flowchart TD
    A[Stock Receipt] --> B[Update Quantities]
    B --> C{Below Min?}
    C -->|Yes| D[Generate Reorder]
    C -->|No| E[Update Location]
    E --> F[Calculate Value]
    F --> G[Post to GL]
    
    H[Stock Issue] --> I[Check Availability]
    I --> J{Available?}
    J -->|Yes| K[Allocate Stock]
    J -->|No| L[Backorder]
    K --> M[Update Quantities]
    M --> N[Recalculate Value]
    N --> O[Post Movement]
    
    D --> P[Create PO Request]
    L --> Q[Monitor Stock]
    Q --> I
```
## 3. Data Flow Diagram

```mermaid
graph LR
    subgraph "Input Transactions"
        REC[Receipts]
        ISS[Issues]
        ADJ[Adjustments]
    end
    
    subgraph "Stock Processing"
        UPD[Update Quantities]
        VAL[Valuation]
        ALLOC[Allocation]
    end
    
    subgraph "Output Information"
        LEV[Stock Levels]
        MOVE[Movements]
        REORD[Reorders]
        GLVAL[GL Values]
    end
    
    REC --> UPD
    ISS --> UPD
    ADJ --> UPD
    
    UPD --> VAL
    UPD --> ALLOC
    
    VAL --> LEV
    ALLOC --> MOVE
    LEV --> REORD
    VAL --> GLVAL
```
## 4. State Transition Diagram

```mermaid
stateDiagram-v2
    [*] --> Available: Stock Receipt
    Available --> Allocated: Sales Order
    Allocated --> Picked: Pick List
    Picked --> Shipped: Dispatch
    Shipped --> [*]
    
    Available --> Reserved: Transfer Request
    Reserved --> InTransit: Ship Transfer
    InTransit --> Available: Receive Transfer
    
    Available --> Quarantine: Quality Issue
    Quarantine --> Available: QC Pass
    Quarantine --> WriteOff: QC Fail
    WriteOff --> [*]
```