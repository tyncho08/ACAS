# Sales Ledger Management System - Functional Documentation

## Executive Summary

The Sales Ledger Management System is a comprehensive customer account management subsystem within the ACAS (Applewood Computers Accounting System) suite. It manages all aspects of customer relationships, including customer master data, sales transactions, invoicing, credit control, payment processing, and customer statements. The system consists of 36 COBOL programs that work together to provide full sales ledger functionality, supporting both traditional file-based and modern relational database backends.

### Key Business Value
- Maintains complete customer account records with credit control
- Automates invoice generation and processing
- Tracks customer payments and applies cash receipts
- Provides aging analysis and credit management
- Generates customer statements and dunning letters
- Integrates with General Ledger for financial reporting

## Functional Capabilities

### 1. Customer Master Data Management
- **Customer Registration** (sl010): Creates and maintains customer accounts with unique 7-character keys
- **Customer Maintenance** (sl020): Updates customer information including:
  - Contact details (name, address, phone, email, fax)
  - Credit terms and limits
  - Discount percentages
  - Payment history tracking
  - Email preferences for invoicing and statements
  - Delivery and notes tags for special handling

### 2. Transaction Processing
- **Invoice Entry** (sl050): Records sales invoices with line-item detail
- **Credit Note Processing** (sl055): Handles returns and adjustments
- **Payment Recording** (sl060): Captures customer payments and cash receipts
- **Payment Allocation** (sl070): Applies payments to specific invoices
- **Batch Invoice Processing** (sl100): Processes multiple invoices in batch mode

### 3. Reporting and Analysis
- **Customer Inquiry** (sl080): Displays customer account details and transaction history
- **Aged Analysis** (sl090): Produces aging reports by customer or summary
- **Statement Generation** (sl095): Creates periodic customer statements
- **Sales Analysis** (sl120): Analyzes sales by customer, period, and product
- **Credit Control Reports** (sl140): Identifies overdue accounts and credit limit violations
- **Transaction Listing** (sl110): Lists all transactions for audit trail

### 4. Period End Processing
- **Daily Processing** (sl000): Start of day initialization and validation
- **Month End** (sl190): Monthly closing procedures and rollover
- **Year End** (sl200): Annual closing and history archival
- **Period Statistics** (sl180): Updates quarterly turnover figures

### 5. Integration Functions
- **General Ledger Posting** (sl170): Posts summarized transactions to GL
- **Stock Integration** (sl800-sl830): Interfaces with inventory for order processing
- **Batch Interfaces** (sl900-sl970): Import/export capabilities for external systems

## Data Domain

### Primary Data Entities

#### 1. Customer Master (Sales-Record)
- **Key**: 7-character customer code (Sales-Key)
- **Attributes**:
  - Customer name (30 chars)
  - Billing address (2 lines × 48 chars)
  - Contact information (phone, extension, email, fax)
  - Account status (active/inactive)
  - Credit terms (days)
  - Credit limit
  - Discount percentage
  - Payment history metrics
  - Quarterly turnover figures
  - Email preferences for documents

#### 2. Transaction Records
- **Invoice Header**: Customer, date, terms, totals
- **Invoice Detail**: Line items with products, quantities, prices
- **Payment Records**: Payment date, amount, reference
- **Credit Notes**: Return/adjustment details
- **Posting Records**: GL account distributions

### Data Volumes and Retention
- Customer records: Typically 1,000-50,000 active accounts
- Transaction volume: 100-10,000 invoices per month
- History retention: Current year plus one prior year online
- Archive strategy: Year-end archival to offline storage

## Interface Contracts

### Internal Interfaces

#### 1. Menu System Interface (sales.cbl)
- **Input**: User menu selection, optional parameters
- **Processing**: Routes to appropriate program module
- **Output**: Called program results, updated system status

#### 2. General Ledger Interface (sl170)
- **Input**: Summarized sales transactions
- **Output**: GL posting records with account distributions
- **Frequency**: Daily or on-demand

#### 3. Stock Control Interface (sl800-sl830)
- **Input**: Product codes, quantities from orders
- **Output**: Product details, availability status
- **Integration**: Real-time lookup during order entry

### External Interfaces

#### 1. Import Interfaces (sl900-sl920)
- **Format**: Fixed-format text files
- **Content**: Customer masters, transactions
- **Validation**: Check digits, reference validation

#### 2. Export Interfaces (sl930-sl970)
- **Format**: CSV or fixed-format
- **Content**: Customer data, transaction history
- **Frequency**: On-demand or scheduled

### User Interface
- Character-based screen interface using COBOL SCREEN SECTION
- Menu-driven navigation with function key shortcuts
- Field-level validation with immediate error feedback
- Print options for all reports and documents

## Business Rules Engine

### Credit Management Rules
1. **Credit Limit Enforcement**
   - New orders checked against available credit
   - Credit = Limit - Current Balance - Unallocated
   - Override requires authorization code

2. **Payment Terms**
   - Standard terms from customer master
   - Invoice due date = Invoice date + Credit days
   - Late charges applied after grace period

3. **Discount Calculation**
   - Customer discount % applied to invoice lines
   - Early payment discounts tracked separately
   - Discount validation against authorization limits

### Accounting Rules
1. **Invoice Posting**
   - Debit: Customer Account (Sales Ledger)
   - Credit: Sales Account (by product category)
   - Credit: Tax Account (VAT/Sales Tax)

2. **Payment Application**
   - FIFO allocation to oldest invoices first
   - Partial payments allowed with tracking
   - Unapplied amounts held in suspense

3. **Period Closing**
   - No backdated transactions after period close
   - Automatic rollover of balances
   - Audit trail preservation

### Validation Rules
1. **Customer Code**: 6 characters + check digit validation
2. **Date Validation**: Business date range checks
3. **Amount Validation**: Positive amounts, decimal precision
4. **Reference Uniqueness**: Invoice numbers must be unique

## Operational Characteristics

### Performance Requirements
- Customer inquiry: < 2 seconds response time
- Invoice entry: Support 20+ lines per invoice
- Batch processing: 1000+ invoices per hour
- Report generation: Background processing for large reports

### Concurrency and Locking
- Record-level locking for customer updates
- Read locks during inquiry operations
- Batch exclusive mode for period-end processing
- Deadlock detection and retry logic

### Error Handling
- Comprehensive error messages with codes
- Automatic error logging to system files
- Recovery procedures for batch failures
- Transaction rollback capabilities

### Security Features
- User authentication required
- Function-level access control
- Audit trail of all changes
- Sensitive data field masking

## Dependencies

### System Dependencies
1. **COBOL Runtime**: GnuCOBOL 3.0 or higher
2. **File System**: ISAM or compatible indexed file support
3. **Database** (optional): MySQL/MariaDB for RDB mode
4. **Operating System**: Unix/Linux environment

### Application Dependencies
1. **Common Modules**:
   - maps04: Screen handling routines
   - sys002: System parameter management
   - acas000: Parameter file access
   - systemMT: Data access layer

2. **Copybooks**:
   - fdsl.cob: Sales ledger file definition
   - wssl.cob: Working storage definitions
   - selsl.cob: File selection logic
   - wsnames.cob: Program name constants

3. **Integration Dependencies**:
   - General Ledger must be initialized
   - Stock Control for product validation
   - System parameters properly configured

## Quality Attributes

### Reliability
- Transaction atomicity with commit/rollback
- Automatic recovery from system failures
- Data integrity validation at multiple levels
- Backup and restore procedures

### Maintainability
- Modular program design
- Consistent coding standards
- Comprehensive inline documentation
- Separate data access layer for database portability

### Usability
- Intuitive menu structure
- Consistent screen layouts
- Context-sensitive help
- Clear error messages with resolution steps

### Portability
- Platform-independent COBOL code
- Configurable file paths via environment variables
- Database abstraction layer
- Standard COBOL-85 compliance

## Evolution Potential

### Enhancement Opportunities

1. **Modern Integration**
   - REST API layer for web/mobile access
   - EDI capability for B2B transactions
   - Cloud storage integration
   - Real-time dashboard analytics

2. **Functional Enhancements**
   - Multi-currency support
   - Automated credit scoring
   - Customer portal self-service
   - Advanced dunning workflows

3. **Technical Modernization**
   - Microservices architecture migration
   - Event-driven processing
   - NoSQL for unstructured data
   - Container deployment support

### Migration Considerations
- Data model is well-structured for relational database
- Business logic can be extracted to service layer
- Screen definitions convertible to web forms
- Batch processes suitable for job scheduling systems

### Backward Compatibility
- File format compatibility maintained across versions
- Parameter-driven behavior for new features
- Graceful degradation for missing capabilities
- Version checking in file headers