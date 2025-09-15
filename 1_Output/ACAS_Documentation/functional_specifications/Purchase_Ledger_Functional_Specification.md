# Purchase Ledger - Functional Specification

## Executive Summary

**Programs Analyzed**: 34 programs
**Main Program**: pl000
**Parse Confidence**: 0.94 (based on successful GnuCOBOL validation)

### Discovered Functionality (from AST analysis):
- Validation Rules: 47 validation rules found
- Calculations: 6 calculations found
- Data Transformations: 1902 data transformations found
- External Calls: 58 external calls found

### Data Entities Managed:

## Functional Capabilities

### 2.1 PL000 - Program Functions
**Evidence**: pl000.cbl, 0 lines, complexity: 4

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
### 2.2 PL010 - Supplier Master Maintenance
**Evidence**: pl010.cbl, 0 lines, complexity: 5

**Business Rules Found**:

**Rule at line 104**:
```cobol
0104  *> for more details. If it breaks, you own both pieces but I will endeavour
0105  *> to fix it, providing you tell me about the problem.
0106  *>
0107  *> You should have received a copy of the GNU General Public License along
0108  *> with ACAS; see the file COPYING.  If not, write to the Free Software
0109  *> Foundation, 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA.
0110  *>
0111  *>*************************************************************************
0112  *>
0113   environment             division.
0114  *>===============================```
### 2.3 PL015 - Program Functions
**Evidence**: pl015.cbl, 0 lines, complexity: 5

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
### 2.4 PL020 - Supplier Inquiry
**Evidence**: pl020.cbl, 0 lines, complexity: 8

**Business Rules Found**:

**Rule at line 58**:
```cobol
0058  *> 08/08/84 Vbc - In Inv-Details Set To 1 If Next-Folio = Zero
0059  *> 08/08/84 Vbc - Open Files After Calling Pl025.
0060  *> 07/01/85 Vbc - Fix Bug In Cr-Notes (Clear Screen).
0061  *> 22/03/09 vbc - Migration to Open Cobol v3.00.00.
0062  *> 04/04/09 vbc - Support for F1 (or NEW) on supplier no. to create new
0063  *>                account.  Added support for deleted folio no. and
0064  *>                deleting record after re-use, matches SL910.
0065  *> 12/12/11 vbc - .07 Error msgs to SLnnn.Support for dates other than UK
0066  *>                    Support for path+filenames.
0067  *>                    Updated version to 3.01.nn
0068  *> 18/04/13 vbc - .08 Clear F1 display after supplier found. Matches sl010.```

**Rule at line 95**:
```cobol
0095  *>                    Above will also happen if using a Del Inv. no as it still
0096  *>                    has to get done. Yes this progran reads and rewrite system
0097  *>                    rec.  Also as done in SL 910.  NEEDS TESTING.
0098  *> 12/04/24 vbc - .17 Remove rem'd out old file access verbs and chg case for 1
0099  *>                    char vars.
0100  *> 16/04/24 vbc       Copyright notice update superseding all previous notices.
0101  *> 23/04/24 vbc   .18 set I = 1 if zero for get-inv-1 as runtime test shows it as 0.
0102  *>                    why has this never shown up before in normal running ?
0103  *>                    Copied over from sl910 - JIC.
0104  *> 05/01/25 vbc   .19 Add in missing read, rewrite system param rec after
0105  *>                    updating Next-Folio.```

**Rule at line 578**:
```cobol
0578       if       I = zero
0579                move  1 to I.
0580       display  I at 1223 with foreground-color 3.
0581       move     zero to cob-crt-status.
0582       perform  Get-Data-1.
0583       if       cob-crt-status = cob-scr-esc
0584                go to Main-Exit.
0585  *>
0586       if       new-screen = 1
0587                go to loop.
0588  *>```
### 2.5 PL025 - Program Functions
**Evidence**: pl025.cbl, 0 lines, complexity: 3

**Business Rules Found**:

**Rule at line 78**:
```cobol
0078  *> for more details. If it breaks, you own both pieces but I will endeavour
0079  *> to fix it, providing you tell me about the problem.
0080  *>
0081  *> You should have received a copy of the GNU General Public License along
0082  *> with ACAS; see the file COPYING.  If not, write to the Free Software
0083  *> Foundation, 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA.
0084  *>
0085  *>*************************************************************************
0086  *>
0087   environment             division.
0088  *>===============================```

## Data Domain

## Interface Contracts

### Program: pl000
**Evidence**: pl000.cbl

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

### Program: pl010
**Evidence**: pl010.cbl

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
*>   ALL Adjusted left 5 chars 11/12/11
*>
 01  display-02                  background-color cob-color-black
                                 foreground-color cob-color-green.
     03  value "Supplier Nos : ["    line  4 col  1.
*> >>>>>>>> customer no here <<<<<<<
     03  from d24-02          pic x  line  4 col 23.
     03  from d24-03          pic x          col 24.
     03  from d24-check       pic x(15)      col 26.
     03  value "Supplier Name: ["    line  6 col  1.
     03  using Purch-name  pic x(30) line  6 col 17.
     03  value "]"                   line  6 col 47.
     03  value "Addr: ["             line  7 col 10.
     03  using Purch-addr1 pic x(48)         col 17.
     03  value "]"                   line  7 col 65.
     03  value "["                   line  8 col 16.
     03  using Purch-addr2    pic x(48)      col 17.
     03  value "]"                   line  8 col 65.
     03  value "Suppliers Bank Details"
                                     line  9 col  1.
     03  value "Sort Code  : ["      line 10 col  3.
     03  using Purch-SortCode pic 9(6)       col 17.
     03  value "]"                           col 23.
     03  value "Account No : ["      line 11 col  3.
     03  using Purch-AccountNo pic 9(8)      col 17.
     03  value "]"                           col 25.
     03  value "Supplier Note: ["    line 12 col  1.
     03  using a01-Notes-1    pic x(48)      col 17.
     03  value "]"                           col 65.
     03  value "["                   line 13 col 16.
     03  using a01-Notes-2    pic x(48)      col 17.
     03  value "]"                           col 65.
     03  value "Telephone    : ["    line 14 col  1.
     03  using Purch-phone    pic x(13)      col 17.
     03  value "]"                           col 30.
     03  value "Ext: ["                      col 32.
     03  using Purch-ext      pic x(4)       col 38.
     03  value "]"                           col 42.
     03  value "Fax : ["                     col 45.
     03  using Purch-fax      pic x(13)      col 52.
     03  value "]"                           col 65.
     03  value "Email Sales  : ["    line 15 col  1.
     03  using Purch-email    pic x(30)      col 17.
     03  value "]"                           col 47.
     03  value "Credit Period: ["    line 18 col  1.
     03  using Purch-credit   pic 99         col 17.
     03  value "]"                           col 19.
     03  value "Credit limit : ["    line 19 col  1.
     03  using Purch-limit    pic 9(7)       col 17.
     03  value "] Discount : ["              col 24.
     03  using Purch-discount pic 99.99      col 38.
     03  value "]"                           col 43.
     03  value "*******************" line 19 col 56.
     03  value "Unapplied Bal: {"    line 20 col  1.
     03  value "}"                           col 29.
     03  value "* Escape Code ["     line 20 col 56.
*> value entered by individual display
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
     03  value "Supplier File"                             col 34.
     03  from ws-Local-Date   pic x(10)            line  1 col 71.
     03  value "Report Attributes"                 line  3 col 32.
*>
*> Adjusted left 6 chars 11/12/11
*>
     03  value "Supplier Number - ["               line  8 col  3.
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
     03  value "Enter number of orders & operator"       col 33.
     03  value "Average Value   - ["               line 19 col  3.
     03  using average-in pic 9(5)                         col 22.
     03  value "] ["                                       col 27.
     03  using average-op pic x                            col 30.
     03  value "]"                                         col 31.
     03  value "Enter order value & operator"            col 33.
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

### Program: pl015
**Evidence**: pl015.cbl

```cobol
linkage section.
*>**************
*>
 copy "wscall.cob".
 copy "wssystem.cob".
 copy "wsnames.cob".
*>
 01  to-day              pic x(10).
*>
```

## Error Handling Analysis


## Evidence Summary

- Total statements: 10
- Backed by code evidence: 10 (100.0%)
- No evidence found: 0
- **Quality Assessment**: ✅ PASSED
