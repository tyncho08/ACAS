const fs = require('fs-extra');
const path = require('path');

class VisualizationGenerator {
    async generateAllVisualizations() {
        const subsystems = await fs.readJson('/Users/MartinGonella/Desktop/Demos/ACAS/subsystems.json');
        
        // Generate visualizations for core subsystems
        const coreSubsystems = subsystems.filter(s => s.category === 'Core');
        
        for (const subsystem of coreSubsystems) {
            const visualization = this.generateSubsystemVisualization(subsystem);
            const filename = `Visualizations_${subsystem.name.replace(/\s+/g, '_')}.md`;
            const filepath = path.join('/Users/MartinGonella/Desktop/Demos/ACAS/parser', filename);
            await fs.writeFile(filepath, visualization);
            console.log(`Generated visualization: ${filename}`);
        }
    }

    generateSubsystemVisualization(subsystem) {
        let content = `# ${subsystem.name} - Visualizations\n\n`;
        
        content += `## 1. Context Diagram\n\n`;
        content += this.generateContextDiagram(subsystem);
        
        content += `\n## 2. Functional Flow Diagram\n\n`;
        content += this.generateFunctionalFlow(subsystem);
        
        content += `\n## 3. Data Flow Diagram\n\n`;
        content += this.generateDataFlow(subsystem);
        
        content += `\n## 4. State Transition Diagram\n\n`;
        content += this.generateStateTransition(subsystem);
        
        return content;
    }

    generateContextDiagram(subsystem) {
        if (subsystem.name === 'Sales Ledger Management') {
            return `\`\`\`mermaid
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
\`\`\``;
        }
        
        if (subsystem.name === 'Purchase Ledger Management') {
            return `\`\`\`mermaid
graph TB
    subgraph "External Systems"
        GL[General Ledger]
        SC[Stock Control]
        BANK[Banking System]
    end
    
    subgraph "Users"
        PURCH[Purchasing Staff]
        AP[Accounts Payable]
        MGMT[Management]
        SUPP[Suppliers]
    end
    
    subgraph "Purchase Ledger System"
        PL[Purchase Ledger Core]
    end
    
    PURCH -->|Create Orders| PL
    AP -->|Process Payments| PL
    MGMT -->|Approve/Review| PL
    SUPP -->|Invoices/Queries| PL
    
    PL -->|Post Transactions| GL
    PL -->|Update Stock| SC
    PL -->|Make Payments| BANK
    GL -->|Account Balances| PL
    SC -->|Stock Levels| PL
    BANK -->|Payment Confirmation| PL
\`\`\``;
        }
        
        if (subsystem.name === 'Stock Control System') {
            return `\`\`\`mermaid
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
\`\`\``;
        }
        
        if (subsystem.name === 'General Ledger System') {
            return `\`\`\`mermaid
graph TB
    subgraph "Subsidiary Ledgers"
        SL[Sales Ledger]
        PL[Purchase Ledger]
        ST[Stock Control]
    end
    
    subgraph "Users"
        ACC[Accountants]
        MGMT[Management]
        AUD[Auditors]
    end
    
    subgraph "General Ledger System"
        GL[General Ledger Core]
    end
    
    ACC -->|Journal Entries| GL
    MGMT -->|Financial Reports| GL
    AUD -->|Audit Queries| GL
    
    SL -->|Sales Postings| GL
    PL -->|Purchase Postings| GL
    ST -->|Stock Adjustments| GL
    
    GL -->|Trial Balance| ACC
    GL -->|Financial Statements| MGMT
    GL -->|Audit Trail| AUD
\`\`\``;
        }
        
        return '';
    }

    generateFunctionalFlow(subsystem) {
        if (subsystem.name === 'Sales Ledger Management') {
            return `\`\`\`mermaid
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
\`\`\``;
        }
        
        if (subsystem.name === 'Purchase Ledger Management') {
            return `\`\`\`mermaid
flowchart TD
    A[Purchase Requisition] --> B[Create PO]
    B --> C[Send to Supplier]
    C --> D[Receive Goods]
    D --> E{Match Invoice?}
    E -->|Yes| F[Approve Invoice]
    E -->|No| G[Query Supplier]
    F --> H[Post to GL]
    H --> I[Schedule Payment]
    I --> J{Payment Due?}
    J -->|Yes| K[Generate Payment]
    J -->|No| I
    K --> L[Update Balances]
    L --> M[Send Remittance]
    G --> E
\`\`\``;
        }
        
        if (subsystem.name === 'Stock Control System') {
            return `\`\`\`mermaid
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
\`\`\``;
        }
        
        if (subsystem.name === 'General Ledger System') {
            return `\`\`\`mermaid
flowchart TD
    A[Source Transaction] --> B{Valid?}
    B -->|Yes| C[Create Journal Entry]
    B -->|No| D[Reject/Return]
    C --> E[Validate Accounts]
    E --> F{Balanced?}
    F -->|Yes| G[Post Entry]
    F -->|No| H[Error Report]
    G --> I[Update Balances]
    I --> J[Update Audit Trail]
    J --> K{Period End?}
    K -->|Yes| L[Run Period Close]
    K -->|No| M[Continue Processing]
    L --> N[Generate Reports]
    N --> O[Lock Period]
    H --> D
\`\`\``;
        }
        
        return '';
    }

    generateDataFlow(subsystem) {
        if (subsystem.name === 'Sales Ledger Management') {
            return `\`\`\`mermaid
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
\`\`\``;
        }
        
        if (subsystem.name === 'Purchase Ledger Management') {
            return `\`\`\`mermaid
graph LR
    subgraph "Input Data"
        REQ[Requisitions]
        SINV[Supplier Invoices]
        TERMS[Payment Terms]
    end
    
    subgraph "Purchase Processing"
        MATCH[3-Way Match]
        APP[Approval]
        SCHED[Scheduling]
    end
    
    subgraph "Output Data"
        PO[Purchase Orders]
        PYMT[Payments]
        REM[Remittances]
        POST[GL Postings]
    end
    
    REQ --> MATCH
    SINV --> MATCH
    TERMS --> SCHED
    
    MATCH --> APP
    APP --> SCHED
    
    SCHED --> PO
    SCHED --> PYMT
    SCHED --> REM
    SCHED --> POST
\`\`\``;
        }
        
        if (subsystem.name === 'Stock Control System') {
            return `\`\`\`mermaid
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
\`\`\``;
        }
        
        if (subsystem.name === 'General Ledger System') {
            return `\`\`\`mermaid
graph LR
    subgraph "Source Systems"
        SL[Sales Ledger]
        PL[Purchase Ledger]
        ST[Stock Control]
        MAN[Manual Journals]
    end
    
    subgraph "GL Processing"
        JE[Journal Engine]
        BAL[Balance Update]
        CONS[Consolidation]
    end
    
    subgraph "Financial Outputs"
        TB[Trial Balance]
        BS[Balance Sheet]
        PL2[P&L Statement]
        CF[Cash Flow]
    end
    
    SL --> JE
    PL --> JE
    ST --> JE
    MAN --> JE
    
    JE --> BAL
    BAL --> CONS
    
    CONS --> TB
    CONS --> BS
    CONS --> PL2
    CONS --> CF
\`\`\``;
        }
        
        return '';
    }

    generateStateTransition(subsystem) {
        if (subsystem.name === 'Sales Ledger Management') {
            return `\`\`\`mermaid
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
\`\`\``;
        }
        
        if (subsystem.name === 'Purchase Ledger Management') {
            return `\`\`\`mermaid
stateDiagram-v2
    [*] --> Requisition: Create Request
    Requisition --> PO_Created: Approve
    PO_Created --> Sent: Send to Supplier
    Sent --> Received: Goods Receipt
    Received --> Matched: Invoice Match
    Received --> Disputed: Match Failure
    Disputed --> Matched: Resolved
    Matched --> Approved: Sign Off
    Approved --> Scheduled: Payment Date
    Scheduled --> Paid: Process Payment
    Paid --> Reconciled: Bank Confirm
    Reconciled --> [*]
\`\`\``;
        }
        
        if (subsystem.name === 'Stock Control System') {
            return `\`\`\`mermaid
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
\`\`\``;
        }
        
        if (subsystem.name === 'General Ledger System') {
            return `\`\`\`mermaid
stateDiagram-v2
    [*] --> Open: Period Start
    Open --> Active: First Transaction
    Active --> Closing: Period End Date
    Closing --> Reconciling: Run Reconciliation
    Reconciling --> Adjusting: Post Adjustments
    Adjusting --> Finalizing: Management Review
    Finalizing --> Closed: Approve & Lock
    Closed --> Archived: Retention Period
    Archived --> [*]
    
    Active --> Active: Daily Transactions
    Adjusting --> Reconciling: More Issues
\`\`\``;
        }
        
        return '';
    }
}

// Main execution
async function main() {
    const generator = new VisualizationGenerator();
    try {
        await generator.generateAllVisualizations();
        console.log('All visualizations generated successfully!');
    } catch (error) {
        console.error('Error generating visualizations:', error);
    }
}

main();