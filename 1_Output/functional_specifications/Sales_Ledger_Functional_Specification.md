# Sales Ledger - Functional Specification

## Executive Summary

**Programs Analyzed**: 36 programs
**Main Program**: sales
**Parse Confidence**: 0.94 (based on successful GnuCOBOL validation)

### Discovered Functionality (from AST analysis):
- Validation Rules: 102 validation rules found
- Calculations: 19 calculations found
- Data Transformations: 2793 data transformations found
- External Calls: 102 external calls found

### Data Entities Managed:

## Functional Capabilities

### 2.1 SALES - Program Functions
**Evidence**: salesLD.cbl, 0 lines, complexity: 7

**Business Rules Found**:

**Rule at line 110**:
```cobol
0110  *> for more details. If it breaks, you own both pieces but I will endeavour
0111  *> to fix it, providing you tell me about the problem.
0112  *>
0113  *> You should have received a copy of the GNU General Public License along
0114  *> with ACAS; see the file COPYING.  If not, write to the Free Software
0115  *> Foundation, 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA.
0116  *>
0117  *>*************************************************************************
0118  *>
0119  *>
0120   environment division.```
### 2.2 SL000 - Program Functions
**Evidence**: sl000.cbl, 0 lines, complexity: 4

**Business Rules Found**:

**Rule at line 75**:
```cobol
0075  *> for more details. If it breaks, you own both pieces but I will endeavour
0076  *> to fix it, providing you tell me about the problem.
0077  *>
0078  *> You should have received a copy of the GNU General Public License along
0079  *> with ACAS; see the file COPYING.  If not, write to the Free Software
0080  *> Foundation, 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA.
0081  *>
0082  *>*************************************************************************
0083  *>
0084   environment             division.
0085  *>===============================```
### 2.3 SL010 - Customer Master Maintenance
**Evidence**: sl010.cbl, 0 lines, complexity: 5

**Business Rules Found**:

**Rule at line 74**:
```cobol
0074  *> 07/05/84 vbc - In setup-cust, clear for cust-no,displ cust if
0075  *>                exists.
0076  *> 12/07/84 vbc - Move escape box 5 chars right, remove display
0077  *>                  headings from menu-input,clear screen on report
0078  *> 28/02/85 vbc - Support for entry date on report matches.
0079  *> 03/03/09 vbc - Migration to open cobol v3.00.00.
0080  *> 16/03/09 vbc - New field - Notes which goes into del file so all fields
0081  *>                move down one line in display-02. fixes bug 30.4
0082  *> 25/03/09 vbc - Display & accept tidyups that was highlited by pl010.
0083  *> 29/05/09 vbc - Support for Page-Lines instead of fixed number.
0084  *> 07/09/10 vbc - .14 Mod lpr.```
### 2.4 SL020 - Customer Inquiry
**Evidence**: sl020.cbl, 0 lines, complexity: 5

**Business Rules Found**:

**Rule at line 102**:
```cobol
0102  *> for more details. If it breaks, you own both pieces but I will endeavour
0103  *> to fix it, providing you tell me about the problem.
0104  *>
0105  *> You should have received a copy of the GNU General Public License along
0106  *> with ACAS; see the file COPYING.  If not, write to the Free Software
0107  *> Foundation, 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA.
0108  *>
0109  *>*************************************************************************
0110  *>
0111   environment             division.
0112  *>===============================```
### 2.5 SL050 - Order Entry
**Evidence**: sl050.cbl, 0 lines, complexity: 6

**Business Rules Found**:

**Rule at line 47**:
```cobol
0047  *> 01/10/83 Vbc - On Reading Sales Check If Rec Missing.
0048  *> 22/10/83 Vbc - Conversion To Cis Cobol.
0049  *> 11/05/84 Vbc - Report On Vat Codes.
0050  *> 03/03/09 vbc - Migration to Open Cobol v3.00.00.
0051  *> 14/03/09 vbc - Tidy up totals & keep on same page if enough space.
0052  *> 29/05/09 vbc - Support for Page-Lines instead of fixed number.
0053  *> 07/09/10 vbc - .06 Mod lpr.
0054  *> 24/11/11 vbc - .07 Error msgs to SLnnn.Support for dates other than UK
0055  *> 08/12/11 vbc - .08 Support for path+filenames.
0056  *> 09/12/11 vbc -     Updated version to 3.01.nn
0057  *> 11/12/11 vbc - .09 Changed usage of Stk-Date-Form to the global field Date-Form making former redundent.```

**Rule at line 75**:
```cobol
0075  *>                    If called by xl150 do not stop for any errors.
0076  *> 15/06/20 vbc - .15 Extra test for reply when opening sales file JIC not exist.
0077  *> 12/05/23 vbc - .16 Added Msg SL121 and replaced to it for no SL file.
0078  *>                    Chngd to reporting on Proformas & confirm reporting on
0079  *>                    vat rates 4 & 5. Light code clean up.
0080  *> 20/05/23 vbc - .17 To Match sl020 added line item reporting. Is it ok ?
0081  *> 07/08/23 vbc - .18 Nope code moved to analysis-print & use IL data.
0082  *>                WHEN FIXED, UPDATE sl820 & pl820
0083  *> 13/08/23 vbc - .19 Added PA, Vat code & percentage to line items and remove
0084  *>                    analysis line as no longer needed. renove 1 line printed
0085  *>                    from heads, Removed zz050 code - not used.```

## Data Domain

## Interface Contracts

### Program: sl000
**Evidence**: sl000.cbl

```cobol
linkage section.
*>==============
*>
 01  to-day              pic x(10).
 copy "wsnames.cob".
 copy "wscall.cob".
 copy "wssystem.cob".
*>
```

### Program: sl010
**Evidence**: sl010.cbl

```cobol
linkage section.
*>==============
*>
 copy "wscall.cob".
 copy "wssystem.cob".
 copy "wsnames.cob".
*>
 01  to-day              pic x(10).
*>
 screen section.
*>=============
*>
*>   ALL Adjusted left 5 chars 29/11/11
*>
 01  display-02                  background-color cob-color-black
                                 foreground-color cob-color-green
                                                     blank screen.

     03  value "Customer Nos : ["    line  4 col  1.
*> >>>>>>>> customer no here <<<<<<<
     03  from d24-02          pic x  line  4 col 23.
     03  from d24-03          pic x          col 24.
     03  from d24-check       pic x(15)      col 26.
     03  value "Customer Name: ["    line  6 col  1.
     03  using sales-name  pic x(30) line  6 col 17.
     03  value "]"                   line  6 col 47.
     03  value "Addr: ["             line  7 col 10.
     03  using sales-addr1    pic x(48)      col 17.
     03  value "]"                   line  7 col 65.
     03  value "["                   line  8 col 16.
     03  using sales-addr2    pic x(48)      col 17.
     03  value "]"                   line  8 col 65.
     03  value "Delivery name: ["    line  9 col  1.
     03  using A01-deliv-name     pic x(30)      col 17.
     03  value "]"                           col 47.
     03  value "Addr: ["             line 10 col 10.
     03  using A01-deliv-addr1    pic x(48)      col 17.
     03  value "]"                           col 65.
     03  value "["                   line 11 col 16.
     03  using A01-deliv-addr2    pic x(48)      col 17.
     03  value "]"                           col 65.
     03  value "Customer Note: ["    line 12 col  1.
     03  using a01-Notes-1    pic x(48)      col 17.
     03  value "]"                           col 65.
     03  value "["                   line 13 col 16.
     03  using a01-Notes-2    pic x(48)      col 17.
     03  value "]"                           col 65.
     03  value "Telephone    : ["    line 14 col  1.
     03  using sales-phone    pic x(13)      col 17.
     03  value "]"                           col 30.
     03  value "Ext: ["                      col 32.
     03  using sales-ext      pic x(4)       col 38.
     03  value "]"                           col 42.
     03  value "Fax : ["                     col 45.
     03  using sales-fax      pic x(13)      col 52.
     03  value "]"                           col 65.
     03  value "Email Sales  : ["    line 15 col  1.
     03  using sales-email    pic x(30)      col 17.
     03  value "]"                           col 47.
*> added 15/03/24
     03  value "BO Allowed - ["              col 49.
     03  using Sales-Partial-Ship-Flag
                              pic x          col 63.
     03  value "] (Y or N)"                  col 64.
*>
     03  value "Late charges : ["    line 16 col  1.
     03  using a01-late-charg  pic x         col 17.
     03  value "]"                           col 18.
     03  value "Minimum balance before late charge : [" col 26.
     03  using sales-late-min pic 9(4)       col 64.
     03  value "]"                           col 68.
     03  value "Late letters : ["    line 17 col  1.
     03  using a01-dun-letter  pic x         col 17.
     03  value "]"                           col 18.
     03  value "Maximum late charge"         col 26.
     03  value ": ["                         col 61.
     03  using sales-late-max pic 9(4)       col 64.
     03  value "]"                           col 68.
     03  value "Credit period: ["    line 18 col  1.
     03  using sales-credit   pic 99         col 17.
     03  value "]"                           col 19.
     03  value "EMail-Inv:["                 col 26.
     03  using a01-Email-Inv  pic x          col 37.
     03  value "]"                           col 38.
     03  value "Stat: ["                     col 40.
     03  using a01-EMail-Stat pic x          col 47.
     03  value "]"                           col 48.
     03  value "Dun : ["                     col 50.
     03  using a01-EMail-Let  pic x          col 57.
     03  value "]"                           col 58.
     03  value "Credit limit : ["    line 19 col  1.
     03  using sales-limit    pic 9(7)       col 17.
     03  value "] Discount : ["              col 24.
     03  using sales-discount pic 99.99      col 38.
     03  value "]"                           col 43.
     03  value "*******************" line 19 col 56.
     03  value "Unapplied Bal: {"    line 20 col  1.
     03  value "}"                           col 29.
     03  value "* Escape Code ["             col 56.
*> value entered by individual display.
     03  value "] *"                         col 72.
     03  value "Current Bal  : {"    line 21 col  1.
*> value entered by individual display
     03  value "}"                           col 29.
     03  value "* <B> = Back      *"         col 56.
     03  value "Last invoice : {"    line 22 col  1.
*> value entered by individual display
     03  value "}"                           col 27.
     03  value "* <S> = Save      *"         col 56.
     03  value "Last payment : {"    line 23 col  1.
*> value entered by individual display
     03  value "}"                           col 27.
     03  value "* <Q> = Quit      *" line 23 col 56.
     03  value "*******************" line 24 col 56.
*>
 01  display-03                  background-color cob-color-black
                                 foreground-color cob-color-green.
     03  from prog-name  pic x(15)                 line  1 col  1
                                                    blank screen.
     03  value "Customer File"                             col 34.
     03  from ws-Local-Date     pic x(10)          line  1 col 71.
     03  value "Report Attributes"                 line  3 col 32.
*>
*> Adjusted left 6 chars 29/11/11
*>
     03  value "Customer Number - ["               line  8 col  3.
     03  using cust-in   pic x(6)                          col 22.
     03  value "]"                                         col 28.
     03  value "Enter characters in positions to match"    col 33.
     03  value "Status          - ["               line 10 col  3.
     03  using status-in pic x                             col 22.
     03  value "]"                                         col 23.
     03  value "<L> Live;<D> Dormant;< > All"              col 33.
     03  value "Credit Period   - ["               line 12 col  3.
     03  using credit-in pic 99                            col 22.
     03  value "]  ["                                      col 24.
     03  using credit-op pic x                             col 28.
     03  value "]"                                 line 12 col 29.
     03  value "Enter number of days & operator"           col 33.
     03  value "<L>  for credit periods < than"    line 13 col 37.
     03  value "<G>  for credit periods > than"    line 14 col 37.
     03  value "<E>  for credit periods = to"      line 15 col 37.
     03  value "Invoice Activity  ["               line 17 col  3.
     03  using invoice-in pic 9(5)                         col 22.
     03  value "] ["                                       col 27.
     03  using invoice-op pic x                            col 30.
     03  value "]"                                         col 31.
     03  value "Enter number of invoices & operator"       col 33.
     03  value "Average Value   - ["               line 19 col  3.
     03  using average-in pic 9(5)                         col 22.
     03  value "] ["                                       col 27.
     03  using average-op pic x                            col 30.
     03  value "]"                                         col 31.
     03  value "Enter invoice value & operator"            col 33.
     03  value "Overdue A/Cs    - ["               line 21 col  3.
     03  using overdue-in pic 9(5)                         col 22.
     03  value "] ["                                       col 27.
     03  using overdue-op pic x                            col 30.
     03  value "]"                                         col 31.
     03  value "Enter number of days & operator"           col 33.
     03  value "Date Entered-["                    line 23 col  3.
     03  using enter-date-in pic x(10)                     col 17.
     03  value "] ["                                       col 27.
     03  using enter-date-op pic x                         col 30.
     03  value "]"                                         col 31.
     03  value "Enter date & operator"                     col 33.
*>
```

### Program: sl020
**Evidence**: sl020.cbl

```cobol
linkage section.
*>**************
*>
 copy "wscall.cob".
 copy "wssystem.cob".
 copy "wsnames.cob".
 01  to-day              pic x(10).
*>
```

## Error Handling Analysis


## Evidence Summary

- Total statements: 9
- Backed by code evidence: 9 (100.0%)
- No evidence found: 0
- **Quality Assessment**: ✅ PASSED
