# Stock Control - Functional Specification

## Executive Summary

**Programs Analyzed**: 8 programs
**Main Program**: st000
**Parse Confidence**: 0.94 (based on successful GnuCOBOL validation)

### Discovered Functionality (from AST analysis):
- Validation Rules: 33 validation rules found
- Calculations: 18 calculations found
- Data Transformations: 695 data transformations found
- External Calls: 31 external calls found

### Data Entities Managed:

## Functional Capabilities

### 2.1 ST000 - Program Functions
**Evidence**: st000.cbl, 0 lines, complexity: 4

**Business Rules Found**:

**Rule at line 71**:
```cobol
0071  *> for more details. If it breaks, you own both pieces but I will endeavour
0072  *> to fix it, providing you tell me about the problem.
0073  *>
0074  *> You should have received a copy of the GNU General Public License along
0075  *> with ACAS; see the file COPYING.  If not, write to the Free Software
0076  *> Foundation, 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA.
0077  *>
0078  *>*************************************************************************
0079  *>
0080   environment             division.
0081  *>================================```
### 2.2 ST010 - Stock Master Maintenance
**Evidence**: st010.cbl, 0 lines, complexity: 23

**Business Rules Found**:

**Rule at line 79**:
```cobol
0079  *> 06/06/09 vbc - .22 Added WIP stock to stock-value if in use.
0080  *> 18/06/09 vbc - .24 reversed PA and SA code in report to match input screen
0081  *>                 Swap Stk Abrev and no. around.2 match st030.
0082  *> 16/07/09 vbc - .25 Using ST104 instead of 105, if purchase ledger not setup.
0083  *> 17/07/09 vbc - .26 Abbrev code does not need to pass maps09 as no check digit.
0084  *> 24/07/09 vbc - .27 Force record entry (1) if stockfile not setup
0085  *>                    (file-status (11) not = 1) as per spec/manual.
0086  *> 11/12/11 vbc -     Changed version from 1.00.xx to 3.01.xx, in keeping with
0087  *>                    the rest of ACAS.
0088  *>                .28 Changed usage of Stk-Date-Form to the global field Date-Form
0089  *>                    making former redundent.```

**Rule at line 742**:
```cobol
0742       if       fs-reply not = zero
0743                display ST011            at 0601 with erase eos  *> acas011/StockMT processing
0744                display "Fs-reply = "    at 0701
0745                display fs-reply         at 0712
0746                display "WE-Error = "    at 0801
0747                display WE-Error         at 0812
0748   *>             if      FS-RDBMS-Used
0749   *>                     perform aa020-Rollback
0750   *>             end-if
0751                display ST003 at 1101 with erase eol
0752                accept  Accept-Reply at 1135```

**Rule at line 757**:
```cobol
0757       if       fs-reply not = zero
0758                display ST012            at 0601 with erase eos  *> acas022/PurchMT processing
0759                display "Fs-reply = "    at 0701
0760                display fs-reply         at 0712
0761                display "WE-Error = "    at 0801
0762                display WE-Error         at 0812
0763   *>             if      FS-RDBMS-Used
0764   *>                     perform aa020-Rollback
0765   *>             end-if
0766                display ST003 at 1101 with erase eol
0767                accept  Accept-Reply at 1135```

**Calculations Found**:

**Calculation at line 1004**:
```cobol
1004                   compute Stock-Value = Stock-Value + (Stock-Cost * Stock-Work-in-Progress).
1005  *>
1006       if       WS-Stock-Order-Date not = spaces
1007                move WS-Stock-Order-Date to WS-Test-Date
1008                perform zz050-Validate-Date
1009                if u-bin not = zero
1010                   move u-bin to Stock-Order-Date
1011                   display " " at 1228
1012                else
1013                   display ST005 at line WS-23-lines col 1 with foreground-color 4 highlight
1014                   display "*" at 1228 with foreground-color 4 highlight```
**Formula**: Stock-Value = Stock-Value + (Stock-Cost * Stock-Work-in-Progress)

**Calculation at line 1296**:
```cobol
1296                   compute Stock-Value = Stock-Value + (Stock-Cost * Stock-Work-in-Progress).
1297  *>
1298       if       WS-Stock-Order-Date not = spaces
1299                move WS-Stock-Order-Date to WS-Test-Date
1300                perform zz050-Validate-Date
1301                if u-bin not = zero
1302                   move u-bin to Stock-Order-Date
1303                   display " " at 1228
1304                else
1305                   display ST005 at line WS-23-lines col 1 with foreground-color 4 highlight
1306                   display "*" at 1228 with foreground-color 4 highlight```
**Formula**: Stock-Value = Stock-Value + (Stock-Cost * Stock-Work-in-Progress)
### 2.3 ST020 - Stock Movements
**Evidence**: st020.cbl, 0 lines, complexity: 22

**Business Rules Found**:

**Rule at line 77**:
```cobol
0077  *> 09/06/09 vbc - .14 Added missing WIP Quantity if any, to stock value.
0078  *> 28/06/09 vbc - .15 Set Stk-Activity-Rep-Run (1) after running reports
0079  *>                    Also increment batch no when clearing down Audit file.
0080  *>                    Reset Stk-Audit-No to 1 on size error (max val = 255).
0081  *> 15/07/09 vbc - .16 Modify menu option 4 subject to value of Stk-Period-Cur.
0082  *>                    Batch no (Stk-Audit-No) used on proof rep and updated after
0083  *>                    running end of period rep and clearing down audit file.
0084  *>                    Amend manuals to reflect s/w changes.
0085  *> 20/07/09 vbc - .17 Added function 5 to replace existing optional data, ie
0086  *>                .18 dates ordered & due, quantities on order and backordered.
0087  *> 19/08/09 vbc - .19 Added Standard and simple barcode processing based on a```

**Rule at line 129**:
```cobol
0129  *>                    if Qty is higher for both manual and barcode input.
0130  *>                .37 If SL-BO flag = "Y" then on stock
0131  *>                    additions / Stock item arrivals to warehouse etc, the BO
0132  *>                    file is looked at and if exists will check if there is a
0133  *>                    item record there and if so, flag it as stock arrived with
0134  *>                    the date.  This can then be read by sl910 invoicing at
0135  *>                    start and offer to process any BO orders with new stock
0136  *>                    for invoice processing for all other than credit notes.
0137  *>                    IT will update all BO records with the same stock #
0138  *>                    providing new qty held is not > BO qty otherwise they are
0139  *>                    ignored.```

**Rule at line 132**:
```cobol
0132  *>                    file is looked at and if exists will check if there is a
0133  *>                    item record there and if so, flag it as stock arrived with
0134  *>                    the date.  This can then be read by sl910 invoicing at
0135  *>                    start and offer to process any BO orders with new stock
0136  *>                    for invoice processing for all other than credit notes.
0137  *>                    IT will update all BO records with the same stock #
0138  *>                    providing new qty held is not > BO qty otherwise they are
0139  *>                    ignored.
0140  *>                    NOTE :  The BO file does NOT have a DB table as yet so no
0141  *>                    FH or DAL has been created.  <<<<<<
0142  *>                    WOULD NEED CODING FOR THIS BUT is a temporary file.```

**Calculations Found**:

**Calculation at line 932**:
```cobol
0932                compute WS-Old-Value = (Stock-Held + Stock-Work-in-Progress) * Stock-Cost
0933       else
0934                move zero to WS-Old-Value.
0935  *>
0936       multiply WS-Qty by WS-Price giving WS-Value.
0937       if       Stk-Audit-Used = 1
0938                move     WS-Value to Audit-Stock-Value-Change.
0939       add      WS-Value WS-Old-Value giving WS-New-Value   on size error
0940                display ST212 at line WS-23-lines col 1 with foreground-color 4 highlight
0941                move 99999999.99 to WS-New-Value.
0942  *>```
**Formula**: WS-Old-Value = (Stock-Held + Stock-Work-in-Progress) * Stock-Cost
     else
              move zero to WS-Old-Value

**Calculation at line 1263**:
```cobol
1263       compute  Audit-Stock-Value-Change = WS-Qty * Stock-Cost * -1.
1264  *>
1265       move     Stk-Audit-No to Audit-No.
1266       if       Stk-Audit-Used = 1
1267                perform  zz900-Read-System-Param  *> 05/01/25
1268                move zero         to Stk-Activity-Rep-Run
1269                perform  zz910-Rewrite-System-Param  *> 05/01/25
1270                move WS-Proc-Date to Audit-Process-Date
1271                perform  Stock-Audit-Write
1272                if    FS-Reply not = zero
1273                      display ST002 at line WS-23-lines col 1 with foreground-color 4 highlight```
**Formula**: Audit-Stock-Value-Change = WS-Qty * Stock-Cost * -1
### 2.4 ST030 - Stock Valuation
**Evidence**: st030.cbl, 0 lines, complexity: 22

**Business Rules Found**:

**Rule at line 52**:
```cobol
0052  *> 19/06/09 vbc - .06 Wip on activity only if used & wip qty or wip history
0053  *>                    nonzero.
0054  *>                .08 Replace trailing spaces on Abrev-To with 'z'.
0055  *> 25/06/09 vbc - .09-10 If range not used force start on Abrev key = 0 to make
0056  *>                    all reads on stock file sequential by Abrev key. Clean up
0057  *>                    positioning of subheadings ie 'All Items' etc, 1 col right.
0058  *> 29/06/09 vbc - .11 Added Stock History report.
0059  *> 22/07/09 vbc - .12/13 Understocked test wrong - Dont ask.
0060  *> 07/09/10 vbc - .14/16 on opt 5 incorrect test for < 0 > 5
0061  *>                    amended lpr to include cpi=12 & Cups printer spool.
0062  *> 11/12/11 vbc -     Changed version from 1.00.xx to 3.01.xx, in keeping with the rest of ACAS```

**Calculations Found**:

**Calculation at line 1845**:
```cobol
1845       compute a = (132 - b + 2) / 2.
1846  *>
1847   ZZ004-Exit.
1848       exit     section.
1849  *>
1850   ZZ006-String-Range        section.
1851  *>********************************
1852  *>
1853  *>      b is set prior to call   <<<<<
1854  *> Insert 'Locations ranging from '
1855  *>```
**Formula**: a = (132 - b + 2) / 2

**Calculation at line 1887**:
```cobol
1887       compute a = (132 - b + 2) / 2.
1888  *>
1889   ZZ006-Exit.
1890       exit     section.
1891  *>
1892   ZZ010-Print-Heads         section.
1893  *>********************************
1894  *>      Valuation
1895  *>
1896       if       Line-Cnt not > WS-Page-Lines
1897                go to ZZ010-Exit.```
**Formula**: a = (132 - b + 2) / 2
### 2.5 ST040 - Program Functions
**Evidence**: st040.cbl, 0 lines, complexity: 7

**Business Rules Found**:

**Rule at line 8**:
```cobol
0008  *>    if day < 05 (last month) or this month if day > 04,     *
0009  *>      i.e., 27+ And/Or current period.                      *
0010  *>                                                            *
0011  *>   Normally when doing Month within yearly totals period    *
0012  *>   would also be done if period = Weekly or Monthly as set  *
0013  *>   in system params under Stock control entries.            *
0014  *>                                                            *
0015  *>  This program can be directly called (via stock) using a   *
0016  *>   Autorun process by giving two params to stock as in :    *
0017  *>    stock NULL st0405n  (5=clear down total values          *
0018  *>   2nd digit n is what to clear 1 = period,                 *```

**Rule at line 84**:
```cobol
0084  *>                    where and taken from todays date, if day < 5 month is last month
0085  *>                    else this month (day > 27).
0086  *>                    Normal usage would run on 1st on month via cron etc.
0087  *> 19/03/18 vbc - .12 Added msg ST403 if CD-Args (7:1) when in autorun not in range 1-3.
0088  *>                    displayed and then job aborted. if autorun via cron with mail set
0089  *>                    then will appear as a msg to ACAS admin user.
0090  *> 08/12/22 vbc - .13 Chgd goto in ba000 to use para -Main 4 GC v3.2 warning.
0091  *> 16/08/23 vbc       Removed old remarked out cobol file verbs.
0092  *> 15/03/24 vbc   .14 Change case of function and (low/upp)er-case.
0093  *> 16/04/24 vbc       Copyright notice update superseding all previous notices.
0094  *> 26/12/24 vbc       For all ACCEPT X use UPPER & remove function upper-case.```

**Rule at line 88**:
```cobol
0088  *>                    displayed and then job aborted. if autorun via cron with mail set
0089  *>                    then will appear as a msg to ACAS admin user.
0090  *> 08/12/22 vbc - .13 Chgd goto in ba000 to use para -Main 4 GC v3.2 warning.
0091  *> 16/08/23 vbc       Removed old remarked out cobol file verbs.
0092  *> 15/03/24 vbc   .14 Change case of function and (low/upp)er-case.
0093  *> 16/04/24 vbc       Copyright notice update superseding all previous notices.
0094  *> 26/12/24 vbc       For all ACCEPT X use UPPER & remove function upper-case.
0095  *>
0096  *>*************************************************************************
0097  *>
0098  *> Copyright Notice.```

## Data Domain

## Interface Contracts

### Program: st000
**Evidence**: st000.cbl

```cobol
linkage section.
*>==============
*>
 copy "wscall.cob".
 copy "wssystem.cob".
 copy "wsnames.cob".
 01  to-day              pic x(10).
*>
```

### Program: st010
**Evidence**: st010.cbl

```cobol
linkage section.
*>***************
*>
 copy "wscall.cob".
 copy "wssystem.cob".
 copy "wsnames.cob".
*>
 01  to-day             pic x(10).
*>
 screen section.
*>**************
*>
 01  display-01                  background-color cob-color-black
                                 foreground-color cob-color-green erase eos.
     03  value "Stock Number     - [" line  4 col  1.
*>   03   using WS-Stock-Key pic x(13) col 21. has an accept verb to get info
     03  value "]"                            col 34.
     03  value "PL Fast key  - ["             col 41.
*>   03   using WS-Stock-Abrev-Key pic x(7) col 57. has an accept verb to get info
     03  value "]"                            col 64.
     03  value "Desc ["               line  5 col  1.
     03  using WS-Stock-Desc pic x(32)        col  7 foreground-color 3.
     03  value "]"                            col 39.
     03  value "Stock Location ["             col 41.
     03  using WS-Stock-Location  pic x(10)   col 57 foreground-color 3.
     03  value "]"                            col 67.
     03  value "Supplier: 1 - ["      line  6 col  1.
     03  using Stock-Supplier-P1 pic x(7)     col 16 foreground-color 3.
     03  value "] : 2 - ["                    col 23.
     03  using Stock-Supplier-P2 pic x(7)     col 32 foreground-color 3.
     03  value "]"                            col 39.
     03  value ": 3 - ["                      col 50.
     03  using Stock-Supplier-P3 pic x(7)     col 57 foreground-color 3.
     03  value "]"                            col 64.
     03  value "Stock Qty        - [" line  7 col  1.
     03  using SS-Stock-Held     pic 9(6)     col 21 foreground-color 3.
     03  value "]"                            col 27.
     03  value "Qty Ordered      - ["         col 41.
     03  using SS-Stock-On-Order pic 9(6)     col 61 foreground-color 3.
     03  value "]"                            col 67.
     03  value "Re-Order Point   - [" line  8 col  1.
     03  using SS-Stock-ReOrder-Pnt pic 9(6)  col 21 foreground-color 3.
     03  value "]"                            col 27.
     03  value "Back Ordered     - ["         col 41.
     03  using SS-Stock-Back-Ordered pic 9(6) col 61 foreground-color 3.
     03  value "]"                            col 67.
     03  value "Re-Order Qty     - [" line  9 col  1.
     03  using SS-Stock-Std-ReOrder pic 9(6)  col 21 foreground-color 3.
     03  value "]"                            col 27.
     03  value "Sales Orders O/S - ["         col 41.
     03  using SS-Stock-Pre-Sales pic 9(6)    col 61 foreground-color 3.
     03  value "]"                            col 67.
     03  value "Sales Anal. Code - [" line 10 col  1.
     03  using Stock-SA-Group pic xx          col 21 foreground-color 3.
     03  value "]"                            col 23.
     03  value "Purch Anal. Code - ["         col 41.
     03  using Stock-PA-Group pic xx          col 61 foreground-color 3.
     03  value "]"                            col 63.
     03  value "Services only Flag [" line 11 col  1.
     03  using Stock-Services-Flag pic x      col 21 foreground-color 3.
     03  value "] (Y/N)"                      col 22.
     03  value "Date Ordered - ["     line 12 col  1.
     03  using WS-Stock-Order-Date pic x(10)  col 17 foreground-color 3.
     03  value "]"                            col 27.
     03  value "Date Due     - ["             col 41.
     03  using WS-Stock-Order-Due pic x(10)   col 57 foreground-color 3.
     03  value "]"                            col 67.
*>
*> Escape function box
*>
     03  value "*******************"  line 18 col 61 erase eol.
     03  value "* Escape Code [ ] *"  line 19 col 61 erase eol.
     03  value "* <B> = Back      *"  line 20 col 61 erase eol.
     03  value "* <S> = Save      *"  line 21 col 61 erase eol.
     03  value "* <Q> = Quit      *"  line 22 col 61 erase eol.
     03  value "*******************"  line 23 col 61 erase eol.
*>
 01  Display-01B                  background-color cob-color-black
                                 foreground-color cob-color-green.   *> Display for accepting money amounts
*> these values from accepts
     03  value "Retail Price - ["     line 13 col  1.
*>     03  using SS-Stock-Retail pic 9(7).99    col 17 foreground-color 3.
     03  value "]"                            col 27.
     03  value "Cost   Price - ["             col 41.
*>     03  using SS-Stock-Cost pic 9(7).9999    col 57 foreground-color 3.
     03  value "]"                            col 69.
     03  value "Stock Value  - ["     line 14 col  1.
*>     03  using SS-Stock-Value pic 9(9).99     col 17 foreground-color 3.
     03  value "]"                            col 29.
*>
 01  Display-01C                  background-color cob-color-black
                                 foreground-color cob-color-green.   *> Display for money amounts (Display Only)
*> these values from accepts
     03  value "Retail Price - ["     line 13 col  1.
     03  using Stock-Retail pic 9(7).99       col 17 foreground-color 3.
     03  value "]"                            col 27.
     03  value "Cost   Price - ["             col 41.
     03  using Stock-Cost pic 9(7).9999       col 57 foreground-color 3.
     03  value "]"                            col 69.
     03  value "Stock Value  - ["     line 14 col  1.
     03  using Stock-Value pic 9(9).99        col 17 foreground-color 3.
     03  value "]"                            col 29.
*>
*> used only if Stk-Manu-Used = 1
*>
 01  display-02                  background-color cob-color-black
                                 foreground-color cob-color-green.
     03  value "Optional - Work In Progress (BOMP) Data"
                                      line 15 col 21 highlight.
     03  value "Construct Bundle - [" line 16 col  1.
     03  using Stock-Construct-Bundle pic 9(6) col 21 foreground-color 3.
     03  value "]"                            col 27.
     03  value "Construction   - ["           col 41.
     03  using Stock-Under-Construction pic 9(6)
                                              col 59 foreground-color 3.
     03  value "]"                            col 65.
     03  value "Work In Progress - [" line 17 col  1.
     03  using Stock-Work-in-Progress  pic 9(6)
                                              col 21 foreground-color 3.
     03  value "]"                            col 27.
     03  value "Construct Item - ["           col 41.
     03  using Stock-Construct-Item pic x(13) col 59 foreground-color 3.
     03  value "]"                            col 72.
*>
 01  Display-F1-Display          background-color cob-color-black
                                 foreground-color cob-color-green.
     03  value "stock # = *  = All stock, one at a time - ESC to quit"
                                      line 23 col 1 foreground-color 3.
*>
```

### Program: st020
**Evidence**: st020.cbl

```cobol
linkage section.
*>***************
*>
 copy "wscall.cob".
 copy "wssystem.cob".
 copy "wsnames.cob".
 01  To-Day             pic x(10).
*>
```

## Error Handling Analysis


## Evidence Summary

- Total statements: 20
- Backed by code evidence: 20 (100.0%)
- No evidence found: 0
- **Quality Assessment**: ✅ PASSED
