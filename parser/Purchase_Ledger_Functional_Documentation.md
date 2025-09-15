# Purchase Ledger Management System - Functional Documentation

## Executive Summary

The Purchase Ledger Management System is a comprehensive supplier account management subsystem within the ACAS (Applewood Computers Accounting System) suite. It manages all aspects of supplier relationships, including supplier master data, purchase transactions, invoice processing, payment management, and creditor reporting. The system consists of 34 COBOL programs that provide complete purchase ledger functionality, supporting both traditional file-based and modern relational database backends.

### Key Business Value
- Maintains complete supplier account records with payment tracking
- Manages purchase invoice entry and validation
- Automates payment processing and remittance advice
- Provides aged creditor analysis for cash flow management
- Generates supplier statements and payment reports
- Integrates with General Ledger for financial control

## Functional Capabilities

### 1. Supplier Master Data Management
- **Supplier Registration** (pl010): Creates and maintains supplier accounts with unique 7-character keys
- **Supplier Maintenance** (pl020): Updates supplier information including:
  - Contact details (name, address, phone, email, fax)
  - Banking details (sort code, account number)
  - Payment terms and credit limits
  - Discount agreements
  - Supplier status (active/inactive)
  - Payment history tracking

### 2. Purchase Transaction Processing
- **Purchase Invoice Entry** (pl050): Records supplier invoices with line-item detail
- **Credit Note Processing** (pl055): Handles returns and purchase adjustments
- **Invoice Approval** (pl025): Multi-level invoice authorization workflow
- **Batch Invoice Processing** (pl100): Processes multiple invoices in batch mode
- **Order Matching** (pl030): Matches invoices to purchase orders

### 3. Payment Management
- **Payment Selection** (pl060): Selects invoices for payment based on terms
- **Payment Generation** (pl070): Creates payment batches and remittance advice
- **Manual Payments** (pl040): Records ad-hoc and manual payments
- **Payment Allocation** (pl080): Applies payments to specific invoices
- **Bank Reconciliation Support** (pl085): Matches payments to bank statements

### 4. Reporting and Analysis
- **Supplier Inquiry** (pl090): Displays supplier account details and history
- **Aged Creditor Analysis** (pl095): Produces aging reports for cash flow planning
- **Payment Due Report** (pl115): Lists invoices due for payment by date
- **Supplier Activity Report** (pl120): Analyzes purchase volumes by supplier
- **Outstanding Orders** (pl130): Tracks unmatched purchase orders
- **Supplier Statements** (pl140): Reconciliation statements for suppliers

### 5. Period End Processing
- **Daily Processing** (pl000): Start of day initialization
- **Month End** (pl180): Monthly closing procedures
- **Year End** (pl190): Annual closing and history archival
- **Period Statistics** (pl170): Updates quarterly purchase figures

### 6. Integration Functions
- **General Ledger Posting** (pl160): Posts summarized transactions to GL
- **Automated Payment Interface** (pl165): Electronic payment file generation
- **Import/Export** (pl800-pl960): External system interfaces

## Data Domain

### Primary Data Entities

#### 1. Supplier Master (Purch-Record)
- **Key**: 7-character supplier code (Purch-Key)
- **Attributes**:
  - Supplier name (30 chars)
  - Remittance address (2 lines × 48 chars)
  - Contact information (phone, extension, email, fax)
  - Account status (active/inactive)
  - Payment terms (days)
  - Banking details (sort code, account number)
  - Credit limit from supplier
  - Discount percentage
  - Payment performance metrics
  - Quarterly purchase volumes
  - Notes indicator for special instructions

#### 2. Transaction Records
- **Invoice Header**: Supplier, date, reference, terms, totals
- **Invoice Detail**: Line items with GL distributions
- **Payment Records**: Payment date, method, amount, reference
- **Credit Notes**: Return/adjustment details
- **Posting Records**: GL account distributions

### Data Volumes and Retention
- Supplier records: Typically 500-10,000 active accounts
- Transaction volume: 500-50,000 invoices per month
- Payment runs: Weekly or bi-weekly cycles
- History retention: Current year plus one prior year online
- Archive strategy: Year-end archival with audit trail preservation

## Interface Contracts

### Internal Interfaces

#### 1. Menu System Interface (purchase.cbl)
- **Input**: User menu selection, optional parameters
- **Processing**: Routes to appropriate program module
- **Output**: Called program results, updated system status

#### 2. General Ledger Interface (pl160)
- **Input**: Summarized purchase transactions
- **Output**: GL posting records with account distributions
- **Frequency**: Daily or on-demand
- **Accounts**: Purchase control, VAT, expense accounts

#### 3. Purchase Order Interface (pl030)
- **Input**: Invoice details for matching
- **Output**: Matched/unmatched status, variances
- **Integration**: Real-time validation during entry

### External Interfaces

#### 1. Bank Payment Files (pl165)
- **Format**: BACS, CHAPS, or custom bank formats
- **Content**: Payment instructions, remittance details
- **Security**: Encrypted transmission, audit logging

#### 2. Import Interfaces (pl800-pl920)
- **Format**: Fixed-format or CSV files
- **Content**: Supplier masters, invoices, orders
- **Validation**: Supplier validation, duplicate checking

#### 3. Export Interfaces (pl930-pl960)
- **Format**: CSV or XML
- **Content**: Supplier data, payment history
- **Frequency**: On-demand or scheduled

### User Interface
- Character-based screen interface using COBOL SCREEN SECTION
- Menu-driven navigation with numbered options
- Field-level validation with immediate feedback
- Function key shortcuts for common operations
- Print preview and output options

## Business Rules Engine

### Payment Management Rules
1. **Payment Terms Enforcement**
   - Due date = Invoice date + Payment terms
   - Early payment discount calculation
   - Automatic selection for payment on due date

2. **Payment Authorization**
   - Approval limits by user role
   - Two-factor approval for large payments
   - Segregation of duties enforcement

3. **Discount Capture**
   - Automatic calculation of available discounts
   - Discount taken only if payment within terms
   - Lost discount reporting

### Accounting Rules
1. **Invoice Posting**
   - Debit: Expense/Asset Account (by category)
   - Debit: VAT Input Tax (recoverable)
   - Credit: Purchase Control Account

2. **Payment Posting**
   - Debit: Purchase Control Account
   - Debit: Discount Received (if applicable)
   - Credit: Bank Account

3. **Accrual Management**
   - Automatic accrual for goods received not invoiced
   - Reversal on invoice receipt
   - Period-end accrual reporting

### Validation Rules
1. **Supplier Code**: 6 characters + check digit validation
2. **Invoice Reference**: Uniqueness within supplier
3. **Amount Validation**: Positive amounts, variance tolerances
4. **Banking Details**: Sort code and account number validation
5. **Date Validation**: Within accounting period, not future dated

## Operational Characteristics

### Performance Requirements
- Supplier inquiry: < 2 seconds response time
- Invoice entry: Support for multi-line distributions
- Payment run: Process 1000+ payments per hour
- Report generation: Background processing available

### Concurrency and Locking
- Record-level locking for supplier updates
- Batch exclusive mode for payment runs
- Read consistency during reporting
- Deadlock detection and resolution

### Error Handling
- Comprehensive error codes and messages
- Automatic error logging
- Recovery procedures for batch failures
- Transaction rollback on errors
- Duplicate payment prevention

### Security Features
- User authentication and authorization
- Payment approval workflows
- Audit trail of all changes
- Sensitive banking data encryption
- Segregation of duties controls

## Dependencies

### System Dependencies
1. **COBOL Runtime**: GnuCOBOL 3.0 or higher
2. **File System**: ISAM or compatible indexed file support
3. **Database** (optional): MySQL/MariaDB for RDB mode
4. **Operating System**: Unix/Linux environment
5. **Banking Software**: For electronic payment files

### Application Dependencies
1. **Common Modules**:
   - maps04: Screen handling routines
   - sys002: System parameter management
   - acas000: Parameter file access
   - systemMT: Data access layer

2. **Copybooks**:
   - fdpl.cob: Purchase ledger file definition
   - wspl.cob: Working storage definitions
   - selpl.cob: File selection logic
   - wsnames.cob: Program name constants

3. **Integration Dependencies**:
   - General Ledger must be initialized
   - System parameters properly configured
   - Banking details validated
   - Chart of accounts defined

## Quality Attributes

### Reliability
- Payment processing integrity
- Transaction atomicity
- Automatic recovery procedures
- Data validation at multiple levels
- Backup and restore capabilities

### Maintainability
- Modular program design
- Consistent naming conventions
- Comprehensive documentation
- Separate data access layer
- Version control integration

### Usability
- Logical menu structure
- Consistent screen layouts
- Keyboard shortcuts
- Context-sensitive help
- Clear error messages

### Auditability
- Complete audit trail
- Change tracking with user/date/time
- Report archival
- Payment authorization history
- Compliance reporting support

## Evolution Potential

### Enhancement Opportunities

1. **Digital Transformation**
   - Electronic invoice receipt (e-invoicing)
   - OCR/AI for invoice data capture
   - Mobile approval workflows
   - Supplier portal integration
   - Blockchain for supply chain

2. **Process Automation**
   - Automated invoice matching
   - Smart payment optimization
   - Dynamic discounting
   - Predictive cash flow analysis
   - Robotic process automation (RPA)

3. **Advanced Analytics**
   - Spend analysis dashboards
   - Supplier performance scoring
   - Payment pattern analysis
   - Fraud detection algorithms
   - Working capital optimization

### Migration Considerations
- Well-structured for service-oriented architecture
- Business rules extractable to rules engine
- Data model suitable for ERP integration
- APIs can wrap existing functionality
- Cloud-ready with proper abstraction

### Integration Opportunities
- ERP system integration
- Procurement system connectivity
- Banking API integration
- Business intelligence tools
- Workflow management systems

### Compliance Enhancements
- Tax reporting automation
- Regulatory compliance tracking
- Anti-money laundering checks
- Supplier verification services
- Electronic audit file generation