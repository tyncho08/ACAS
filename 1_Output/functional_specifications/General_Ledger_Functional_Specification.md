# General Ledger - Functional Specification

## Executive Summary

**Programs Analyzed**: 15 programs
**Main Program**: general
**Parse Confidence**: 0.94 (based on successful GnuCOBOL validation)

### Discovered Functionality (from AST analysis):
- Validation Rules: 21 validation rules found
- Data Transformations: 938 data transformations found
- External Calls: 22 external calls found

### Data Entities Managed:

## Functional Capabilities

### 2.1 GENERAL - Program Functions
**Evidence**: dummy-rdbmsMT.cbl, 0 lines, complexity: 2

**Business Rules Found**:

**Rule at line 30**:
```cobol
0030  *>                        WARNING: If you wish to use rdbms later you will
0031  *>                        need to recompile the ACAS system without this
0032  *>                        module but with all modules names ending in MT.
0033  *>**
0034  *>    Version.            See Prog-Name In Ws.
0035  *>**
0036  *>    Calls:              All entry points are dummies.
0037  *>**
0038  *>    Error messages.     NONE, but all calls return 64.
0039  *>**
0040  *>    Changes.```
### 2.2 GL000 - Program Functions
**Evidence**: gl000.cbl, 0 lines, complexity: 4

**Business Rules Found**:

**Rule at line 80**:
```cobol
0080  *> for more details. If it breaks, you own both pieces but I will endeavour
0081  *> to fix it, providing you tell me about the problem.
0082  *>
0083  *> You should have received a copy of the GNU General Public License along
0084  *> with ACAS; see the file COPYING.  If not, write to the Free Software
0085  *> Foundation, 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA.
0086  *>
0087  *>*************************************************************************
0088  *>
0089   environment             division.
0090  *>===============================```
### 2.3 GL020 - Chart of Accounts Maintenance
**Evidence**: gl020.cbl, 0 lines, complexity: 4

**Business Rules Found**:

**Rule at line 88**:
```cobol
0088  *> for more details. If it breaks, you own both pieces but I will endeavour
0089  *> to fix it, providing you tell me about the problem.
0090  *>
0091  *> You should have received a copy of the GNU General Public License along
0092  *> with ACAS; see the file COPYING.  If not, write to the Free Software
0093  *> Foundation, 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA.
0094  *>
0095  *>*************************************************************************
0096  *>
0097   environment             division.
0098  *>===============================```
### 2.4 GL030 - Journal Entry
**Evidence**: gl030.cbl, 0 lines, complexity: 10

**Business Rules Found**:

**Rule at line 135**:
```cobol
0135  *> for more details. If it breaks, you own both pieces but I will endeavour
0136  *> to fix it, providing you tell me about the problem.
0137  *>
0138  *> You should have received a copy of the GNU General Public License along
0139  *> with ACAS; see the file COPYING.  If not, write to the Free Software
0140  *> Foundation, 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA.
0141  *>
0142  *>*************************************************************************
0143  *>
0144   environment             division.
0145  *>===============================```

**Rule at line 1589**:
```cobol
1589       if       fs-reply not = zero
1590                display GL035 at line ws-lines col 01 with foreground-color 2
1591                go to main-exit.
1592  *>
1593       display  prog-name at 0101 with foreground-color 2 erase eos.
1594       perform  zz070-convert-date.
1595       display  ws-date at 0171 with foreground-color 2.
1596       display  "Chart Of Accounts Alphabetic Print" at 0123 with foreground-color 2.
1597  *>
1598       move     zero  to  truth.
1599       open     output  print-file.```

**Rule at line 1620**:
```cobol
1620       if       WS-TBL-Sub > WS-TBL-Entry-Cnt
1621           or   WS-TBL-Ledger  (WS-TBL-Sub) = high-values
1622                go to End-Report
1623       end-if
1624       move     WS-TBL-Ledger (WS-TBL-Sub)  to WS-Ledger-Key9.
1625       perform  GL-Nominal-Read-Indexed.
1626       if       FS-Reply not = zero            *> cant read a record that should be present ??
1627                go to End-Report.
1628  *>
1629       if       ledger-n = 9999
1630                go to  P-Loop.```
### 2.5 GL050 - Trial Balance
**Evidence**: gl050.cbl, 0 lines, complexity: 4

**Business Rules Found**:

**Rule at line 10**:
```cobol
0010  *>   examined to see if a replacement key should be used *
0011  *> ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ *
0012  *>  THIS WILL APPLY TO OTHER PROGRAMS THAT USE THE       =
0013  *>     POSTING FILE  {gl051 ]                            =
0014  *>********************************************************
0015  *>
0016   identification          division.
0017  *>===============================
0018  *>
0019  *>**
0020        program-id.         gl050.```

## Data Domain

## Interface Contracts

### Program: general
**Evidence**: dummy-rdbmsMT.cbl

```cobol
Linkage Section.
*>**************
*>
 copy "wsfnctn.cob".
*> Turn diags off regardless for this module.
 copy "Test-Data-Flags.cob"
             replacing ==03  SW-Testing               pic 9   value 1. ==
                 by    ==03  SW-Testing               pic 9   value zero. ==.
*>
 01  DUMMY-REC   pic x.
*>
```

### Program: gl000
**Evidence**: gl000.cbl

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
```

### Program: gl020
**Evidence**: gl020.cbl

```cobol
linkage section.
*>---------------
*>
 copy "wscall.cob".
 copy "wssystem.cob".
 copy "wsdflt.cob".
 copy "wsnames.cob".
*>
 01  to-day          pic x(10).
*>
```

## Error Handling Analysis


## Evidence Summary

- Total statements: 10
- Backed by code evidence: 10 (100.0%)
- No evidence found: 0
- **Quality Assessment**: ✅ PASSED
