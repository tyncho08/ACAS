# Sales Ledger Management - Visualizations

## 1. Context Diagram

```mermaid
graph TB
    subgraph "External Systems"
        GL[General Ledger]
        SC[Stock Control]
        BANK[Banking System]
    end
    
    subgraph "Users"
        SALES[Sales Staff]
        CREDIT[Credit Controller]
        MGMT[Management]
        CUST[Customers]
    end
    
    subgraph "Sales Ledger System"
        SL[Sales Ledger Core]
    end
    
    SALES -->|Create Orders/Invoices| SL
    CREDIT -->|Manage Credit| SL
    MGMT -->|View Reports| SL
    CUST -->|Statements/Queries| SL
    
    SL -->|Post Transactions| GL
    SL -->|Check Stock| SC
    SL -->|Payment Processing| BANK
    GL -->|Account Balances| SL
    SC -->|Product Info| SL
    BANK -->|Payment Status| SL
```
## 2. Functional Flow Diagram

```mermaid
flowchart TD
    A[Customer Order] --> B{Credit Check}
    B -->|Approved| C[Create Invoice]
    B -->|Rejected| D[Credit Hold]
    C --> E[Update Customer Balance]
    E --> F[Post to GL]
    F --> G[Print/Send Invoice]
    G --> H[Await Payment]
    H --> I{Payment Received?}
    I -->|Yes| J[Apply Payment]
    I -->|No| K[Send Reminder]
    J --> L[Update Balance]
    L --> M[Post Cash to GL]
    K --> H
    D --> N[Credit Review]
    N --> B
```
## 3. Data Flow Diagram

```mermaid
graph LR
    subgraph "Input Data"
        ORD[Order Details]
        PAY[Payment Info]
        CRED[Credit Terms]
    end
    
    subgraph "Sales Ledger Processing"
        VAL[Validation]
        CALC[Calculations]
        POST[Posting]
    end
    
    subgraph "Output Data"
        INV[Invoices]
        STMT[Statements]
        AGE[Aging Reports]
        BAL[GL Postings]
    end
    
    ORD --> VAL
    PAY --> VAL
    CRED --> VAL
    
    VAL --> CALC
    CALC --> POST
    
    POST --> INV
    POST --> STMT
    POST --> AGE
    POST --> BAL
```
## 4. State Transition Diagram

```mermaid
stateDiagram-v2
    [*] --> Draft: Create Invoice
    Draft --> Pending: Submit
    Pending --> Approved: Credit OK
    Pending --> OnHold: Credit Issue
    OnHold --> Pending: Credit Resolved
    Approved --> Sent: Print/Email
    Sent --> PartPaid: Partial Payment
    Sent --> Paid: Full Payment
    PartPaid --> Paid: Final Payment
    Sent --> Overdue: Payment Late
    Overdue --> Paid: Payment Received
    Paid --> Closed: Period End
    Closed --> [*]
```