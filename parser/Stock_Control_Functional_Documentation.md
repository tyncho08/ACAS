# Stock Control System - Functional Documentation

## Executive Summary

The Stock Control System is a comprehensive inventory management subsystem within the ACAS (Applewood Computers Accounting System) suite. It manages all aspects of inventory control including stock master data, inventory movements, reorder management, stock valuation, and physical inventory reconciliation. The system consists of 11 COBOL programs that provide complete inventory management functionality, with deep integration to Sales and Purchase Ledger systems.

### Key Business Value
- Real-time inventory tracking and availability
- Automated reorder point management
- Multi-location stock control
- Stock valuation for financial reporting
- Physical inventory count support
- Work-in-progress and kit assembly tracking
- Comprehensive audit trail for all movements

## Functional Capabilities

### 1. Stock Master Data Management
- **Stock Item Creation** (st010): Creates and maintains inventory items with unique 13-character codes
- **Item Maintenance**: Updates stock information including:
  - Item description and specifications
  - Multiple supplier assignments (primary, secondary, backup)
  - Location tracking within warehouse
  - Product and sales analysis codes
  - Service vs. physical item designation
  - Reorder points and quantities
  - Standard costs and retail prices

### 2. Inventory Movement Processing
- **Stock Receipts** (st020): Records inventory additions from purchases
- **Stock Issues** (st030): Processes inventory deductions for sales
- **Stock Transfers**: Moves inventory between locations
- **Stock Adjustments** (st040): Handles physical count adjustments
- **Work-in-Progress**: Tracks items under construction or assembly

### 3. Inventory Control Features
- **Reorder Management**: 
  - Automatic reorder point monitoring
  - Suggested order quantities
  - Lead time tracking
  - Back order management
- **Kit/Bundle Processing**:
  - Bill of materials support
  - Component allocation
  - Assembly tracking
  - Kit explosion for availability

### 4. Reporting and Analysis
- **Stock Status Report** (st020): Current inventory positions
- **Stock Movement Report**: Transaction history by item
- **Reorder Report** (st030): Items below reorder point
- **Stock Valuation** (st040): Inventory value at cost and retail
- **Activity Analysis**: Movement patterns and turnover
- **Physical Count Sheets** (st050): Cycle count documentation

### 5. Period End Processing
- **Daily Processing** (st000): Start of day initialization
- **Month End Closing**: Period movement summaries
- **Year End Processing**: Annual history rollover
- **Stock Take** (st040): Physical inventory reconciliation

### 6. Integration Functions
- **Sales Order Integration**: Real-time availability checking
- **Purchase Order Creation**: Automated reorder generation
- **General Ledger Interface**: Stock valuation postings
- **Data Import** (st060): Bulk item upload capability

## Data Domain

### Primary Data Entities

#### 1. Stock Master (Stock-Record)
- **Key**: 13-character item code (Stock-Key)
- **Secondary Key**: 7-character abbreviated code
- **Attributes**:
  - Description (32 chars)
  - Supplier codes (3 × 7 chars for multiple sources)
  - Location code (10 chars)
  - Analysis codes (PA and SA codes for categorization)
  - Service flag (Y/N)
  - Quantity fields:
    - On-hand quantity
    - On-order quantity
    - Committed/allocated quantity
    - Back-ordered quantity
    - Work-in-progress quantity
    - Held/quarantine quantity
  - Reorder parameters:
    - Reorder point
    - Standard order quantity
  - Valuation:
    - Last actual cost
    - Average cost
    - Retail price
    - Total value
  - Date tracking:
    - Last receipt date
    - Last order date
    - Order due date

#### 2. Movement History
- **Monthly Totals**: Current month movements
  - Additions (receipts)
  - Deductions (issues)
  - WIP additions
  - WIP deductions
- **Annual History**: 12 months of movement data
  - Month-by-month movement tracking
  - Quantity and value tracking

### Data Volumes and Retention
- Stock items: Typically 1,000-100,000 SKUs
- Movement volume: 100-10,000 transactions per day
- History retention: Current year plus 12 months rolling
- Location complexity: Single or multi-warehouse

## Interface Contracts

### Internal Interfaces

#### 1. Menu System Interface (stock.cbl)
- **Input**: User menu selection, optional parameters
- **Processing**: Routes to appropriate program module
- **Output**: Called program results, updated inventory status

#### 2. Sales Integration
- **Availability Check**: Real-time stock availability
- **Allocation**: Commits stock to sales orders
- **Issue Processing**: Deducts stock on shipment
- **Back Order Management**: Tracks unfulfilled demand

#### 3. Purchase Integration
- **Receipt Processing**: Updates stock from purchases
- **Order Generation**: Creates purchase orders
- **Cost Updates**: Maintains current costs
- **Supplier Performance**: Tracks delivery metrics

#### 4. General Ledger Interface
- **Stock Valuation**: Period-end inventory values
- **Movement Journals**: Cost of goods sold postings
- **Adjustment Entries**: Physical count variances

### External Interfaces

#### 1. Import Interface (st060)
- **Format**: Customizable based on requirements
- **Content**: Item masters, opening balances
- **Validation**: Duplicate checking, data integrity

#### 2. Barcode Integration
- **Input**: Scanned item codes
- **Processing**: Real-time lookup and validation
- **Output**: Item details for verification

### User Interface
- Character-based screen interface
- Menu-driven navigation
- Function key operations
- Immediate validation feedback
- Print options for all reports

## Business Rules Engine

### Inventory Management Rules

1. **Stock Availability**
   - Available = On-hand - Committed - Held
   - Cannot commit more than available
   - Back orders tracked separately

2. **Reorder Logic**
   - Trigger when: Available + On-order < Reorder point
   - Order quantity = Standard order quantity
   - Consider lead time for scheduling

3. **Cost Calculation**
   - FIFO (First In, First Out) basis
   - Average cost maintained
   - Last cost tracked for reference

### Valuation Rules

1. **Inventory Value**
   - Value = Quantity × Average Cost
   - Separate retail value tracking
   - Lower of cost or market adjustments

2. **Movement Costing**
   - Issues at average cost
   - Receipts update average
   - Variances to GL accounts

### Control Rules

1. **Location Management**
   - Items assigned to specific locations
   - Transfer documentation required
   - Multi-warehouse segregation

2. **Lot/Batch Tracking** (if applicable)
   - FIFO within lots
   - Expiration date monitoring
   - Lot traceability

### Validation Rules
1. **Item Code**: 13-character with validation
2. **Quantities**: Non-negative integers
3. **Costs/Prices**: Positive decimals to 4 places
4. **Dates**: Valid business dates
5. **Suppliers**: Must exist in Purchase Ledger

## Operational Characteristics

### Performance Requirements
- Item inquiry: < 1 second response
- Availability check: Real-time during order entry
- Movement posting: Immediate update
- Report generation: Background for large reports

### Concurrency and Locking
- Record-level locking for updates
- Read consistency for inquiries
- Batch exclusive for physical counts
- Deadlock prevention algorithms

### Error Handling
- Comprehensive error messages
- Automatic error logging
- Recovery procedures
- Transaction integrity maintained

### Security Features
- User authentication required
- Function-level permissions
- Audit trail of all changes
- Cycle count verification

## Dependencies

### System Dependencies
1. **COBOL Runtime**: GnuCOBOL 3.0 or higher
2. **File System**: ISAM file support
3. **Database** (optional): MySQL/MariaDB
4. **Operating System**: Unix/Linux

### Application Dependencies
1. **Common Modules**:
   - maps04: Date handling
   - acas000: System parameters
   - systemMT: Data access layer

2. **Copybooks**:
   - fdstock.cob: Stock file definition
   - wsstock.cob: Working storage
   - selstock.cob: File selection
   - wsnames.cob: Program names

3. **Integration Requirements**:
   - Sales/Purchase ledgers active
   - System parameters configured
   - GL accounts defined

## Quality Attributes

### Reliability
- Transaction integrity
- Automatic recovery
- Data validation
- Backup procedures

### Accuracy
- Decimal precision for quantities
- Rounding rules for calculations
- Audit trail completeness
- Physical count reconciliation

### Maintainability
- Modular design
- Consistent standards
- Comprehensive documentation
- Version control

### Scalability
- Efficient indexing
- Batch processing capability
- Archival procedures
- Performance optimization

## Evolution Potential

### Enhancement Opportunities

1. **Advanced Features**
   - Serial number tracking
   - Lot/batch management
   - Expiration date control
   - Multi-unit of measure
   - Warehouse management system (WMS)

2. **Technology Integration**
   - RFID tag support
   - Mobile device apps
   - Cloud synchronization
   - IoT sensor integration
   - Automated replenishment

3. **Analytics Enhancement**
   - Demand forecasting
   - ABC analysis automation
   - Inventory optimization
   - Predictive reordering
   - Supply chain visibility

### Migration Considerations
- Data model suitable for modern WMS
- Business logic extractable
- API wrapper feasibility
- Microservices architecture
- Cloud deployment ready

### Integration Opportunities
- ERP system modules
- E-commerce platforms
- Supply chain networks
- Business intelligence
- Logistics systems

### Compliance Features
- Traceability requirements
- Regulatory reporting
- Quality control integration
- Recall management
- Chain of custody