# General Ledger System - Functional Documentation

## Executive Summary

The General Ledger System is the central financial accounting subsystem within the ACAS (Applewood Computers Accounting System) suite. It provides comprehensive financial management capabilities including chart of accounts maintenance, journal entry processing, financial reporting, multi-level profit center accounting, and period-end closing procedures. The system consists of 17 COBOL programs designed to handle complex accounting requirements while maintaining simplicity for smaller organizations.

### Key Business Value
- Complete double-entry bookkeeping with automatic balancing
- Multi-level chart of accounts with profit center support
- Comprehensive financial reporting (P&L, Balance Sheet, Trial Balance)
- Automated posting integration from subsidiary ledgers
- Period and year-end closing procedures
- Audit trail maintenance and compliance reporting
- Default accounting to prevent out-of-balance conditions

## Functional Capabilities

### 1. Chart of Accounts Management
- **Account Creation** (gl020): Defines general ledger accounts with hierarchical structure
- **Account Maintenance** (gl030): Updates account information including:
  - Account number (6-digit nominal + 2-digit profit center)
  - Account description and type
  - Account hierarchy and grouping
  - Balance sheet or P&L designation
  - Normal balance (debit/credit)
  - Account status (active/inactive)
  - Report positioning and formatting

### 2. Journal Entry Processing
- **Manual Journal Entry** (gl050): Direct journal entry posting
- **Recurring Journals** (gl051): Template-based recurring entries
- **Automated Postings**: Receives postings from:
  - Sales Ledger (customer transactions)
  - Purchase Ledger (supplier transactions)
  - Stock Control (inventory movements)
  - Payroll systems (if integrated)
- **Journal Approval** (gl060): Multi-level approval workflow
- **Batch Processing** (gl070): High-volume journal processing

### 3. Financial Reporting
- **Trial Balance** (gl080): Lists all accounts with balances
- **Profit & Loss Statement** (gl090): Income and expense reporting
- **Balance Sheet** (gl090a): Assets, liabilities, and equity
- **General Ledger Report** (gl090b): Detailed transaction listing
- **Account Analysis** (gl100): Individual account activity
- **Management Reports** (gl105): Customized financial reports

### 4. Period Management
- **Daily Processing** (gl000): Start of day initialization
- **Period Closing** (gl071): Monthly closing procedures
- **Year End Processing** (gl072): Annual closing and rollover
- **Historical Inquiry** (gl120): Access to archived periods

### 5. Control and Compliance
- **Audit Trail**: Complete transaction history
- **Account Reconciliation**: Bank and control account matching
- **Intercompany Processing**: Multi-entity transactions
- **Budget Management**: Budget vs. actual reporting
- **Compliance Reporting**: Regulatory report generation

## Data Domain

### Primary Data Entities

#### 1. General Ledger Master (Ledger-Record)
- **Key**: 8-digit account code
  - Positions 1-6: Nominal account
  - Positions 7-8: Profit center
- **Attributes**:
  - Account type (Asset, Liability, Income, Expense, Equity)
  - Account level (1-9 for hierarchy)
  - Account name (24 characters)
  - Current balance
  - Prior year balance
  - Quarterly balances (4 periods)
  - Statistical information

#### 2. Journal Transactions
- **Journal Header**:
  - Journal number (system-generated)
  - Journal date
  - Source (manual or system)
  - Description
  - Total debits/credits
  - Posting status
- **Journal Details**:
  - Account number
  - Debit/credit amount
  - Line description
  - Reference information
  - Analysis codes

#### 3. System Control
- **Accounting Periods**: 
  - Current period and year
  - Period open/closed status
  - Cutoff dates
- **Default Accounts**:
  - Retained earnings
  - Suspense account
  - Rounding differences
  - Currency conversion

### Data Volumes and Retention
- Chart of accounts: 100-10,000 accounts typical
- Transaction volume: 1,000-100,000 per month
- Period retention: 2 years online, 7 years archived
- Report retention: Configurable by report type

## Interface Contracts

### Internal Interfaces

#### 1. Menu System Interface (general.cbl)
- **Input**: User menu selection, security credentials
- **Processing**: Routes to appropriate program module
- **Output**: Program results, updated system status

#### 2. Subsidiary Ledger Integration
- **Sales Postings**: Customer invoices, receipts, adjustments
- **Purchase Postings**: Supplier invoices, payments, adjustments
- **Stock Postings**: Inventory movements, valuations
- **Fixed Assets**: Depreciation, additions, disposals

#### 3. System Parameter Interface
- **Configuration**: Account structures, posting rules
- **Security**: User permissions, approval limits
- **Processing**: Batch schedules, closing dates

### External Interfaces

#### 1. Import Interfaces
- **Format**: Fixed-format or CSV
- **Content**: Journal entries, budget data
- **Validation**: Account existence, balance validation

#### 2. Export Interfaces
- **Financial Statements**: PDF, Excel formats
- **Audit Files**: Text or XML format
- **Data Extracts**: For analysis tools

### User Interface
- Character-based menu system
- Screen-based data entry
- Report preview capabilities
- Function key navigation
- Context-sensitive help

## Business Rules Engine

### Accounting Rules

1. **Double Entry Enforcement**
   - Every journal must balance (debits = credits)
   - Automatic balancing entries if needed
   - No unbalanced postings allowed

2. **Period Control**
   - Transactions must be within open periods
   - Prior period adjustments require authorization
   - Future period posting restrictions

3. **Account Validation**
   - Only post to detail-level accounts
   - Account must be active
   - Profit center must be valid

### Closing Rules

1. **Month End**
   - All subsidiary ledgers must be posted
   - Bank reconciliations completed
   - Accruals and prepayments entered
   - Period locked after closing

2. **Year End**
   - P&L accounts closed to retained earnings
   - Balance sheet accounts rolled forward
   - New year periods initialized
   - Audit adjustments finalized

### Control Rules

1. **Segregation of Duties**
   - Entry vs. approval separation
   - Posting vs. reporting access
   - Master file maintenance controls

2. **Audit Trail**
   - All changes tracked with user/date/time
   - Original entries preserved
   - Reversal entries linked
   - Report generation logged

## Operational Characteristics

### Performance Requirements
- Journal posting: < 3 seconds per entry
- Report generation: Background processing
- Inquiry response: < 2 seconds
- Closing process: < 30 minutes typical

### Concurrency and Locking
- Multi-user journal entry
- Exclusive locks during closing
- Read consistency for reporting
- Deadlock prevention

### Error Handling
- Validation at entry point
- Batch error reporting
- Automatic rollback on failure
- Error correction procedures

### Security Features
- User-level access control
- Function-based permissions
- Approval hierarchies
- Audit logging
- Data encryption for sensitive information

## Dependencies

### System Dependencies
1. **COBOL Runtime**: GnuCOBOL 3.0 or higher
2. **File System**: ISAM file support required
3. **Database** (optional): MySQL/MariaDB for RDB mode
4. **Operating System**: Unix/Linux environment

### Application Dependencies
1. **Common Modules**:
   - maps04: Date handling routines
   - sys002: System parameter management
   - acas000: Parameter file access
   - systemMT: Data access layer

2. **Copybooks**:
   - fdledger.cob: Ledger file definition
   - wsledger.cob: Working storage
   - selledger.cob: File selection
   - glwspc.cob: GL-specific working storage
   - wsnames.cob: Program name constants

3. **Integration Requirements**:
   - System parameters configured
   - Chart of accounts defined
   - Opening balances loaded
   - Subsidiary ledgers mapped

## Quality Attributes

### Reliability
- Transaction integrity guaranteed
- Automatic backup procedures
- Recovery mechanisms
- Data validation at multiple levels

### Accuracy
- Penny-perfect balancing
- Rounding rules defined
- Decimal precision maintained
- Cross-validation checks

### Compliance
- Audit trail completeness
- Regulatory report formats
- Data retention policies
- Access control logging

### Flexibility
- Configurable account structures
- Multiple profit centers
- Variable period definitions
- Custom report layouts

## Evolution Potential

### Enhancement Opportunities

1. **Modern Financial Features**
   - Multi-currency support
   - Consolidation capabilities
   - XBRL reporting
   - Real-time analytics
   - Predictive forecasting

2. **Technology Modernization**
   - Web-based interface
   - RESTful APIs
   - Cloud deployment
   - Mobile approvals
   - Business intelligence integration

3. **Advanced Capabilities**
   - Workflow automation
   - AI-powered anomaly detection
   - Automated reconciliation
   - Continuous closing
   - Integrated planning

### Migration Considerations
- Chart of accounts portable to modern GL
- Transaction history preservation
- Balance forward procedures
- Parallel run capabilities
- Data mapping tools

### Integration Opportunities
- ERP suite integration
- Banking system connections
- Tax reporting software
- Audit software interfaces
- Planning and budgeting tools

### Compliance Evolution
- International accounting standards
- Real-time regulatory reporting
- Automated tax calculations
- Multi-GAAP support
- Integrated controls monitoring

### Architecture Modernization
- Microservices design patterns
- Event-driven processing
- Cloud-native deployment
- API-first development
- Containerization support