# IRS Module - Functional Specification

## Executive Summary

**Programs Analyzed**: 18 programs
**Main Program**: acasirsub1
**Parse Confidence**: 0.94 (based on successful GnuCOBOL validation)

### Discovered Functionality (from AST analysis):
- Validation Rules: 35 validation rules found
- Calculations: 3 calculations found
- Data Transformations: 1186 data transformations found
- External Calls: 40 external calls found

### Data Entities Managed:

## Functional Capabilities

### 2.1 ACASIRSUB1 - Program Functions
**Evidence**: acasirsub1.cbl, 0 lines, complexity: 27

**Business Rules Found**:

**Rule at line 55**:
```cobol
0055  *>                    also give fs-reply to we-error if 47, 48, 49 to try and find error in caller
0056  *>                    that is opening an already open file. Found it in irs030 (SL/PL posting file proc.
0057  *> 23/04/18 vbc - .11 Extra code in open and read indexed.
0058  *> 29/04/18 vbc - .12 Resetting Cobol-File-Status for write,rewrite,delete, start.
0059  *> 07/12/22 vbc - .13 Chgd Vars A & B to pic 999 to keep GC v3.2 happy.
0060  *> 10/12/22 vbc - .14 chg to perform ba-Process-RDBMS 2 remove GC warning msg from latest v3.2 code
0061  *>                    WITH ba-Main-Exit chgd to exit section.
0062  *> 16/04/24 vbc       Copyright notice update superceding all previous notices.
0063  *>**
0064  *>  Module USAGE
0065  *>**************```

**Rule at line 715**:
```cobol
0715                         if  Testing-1
0716                             perform Ca-Process-Logs
0717                         end-if
0718                         accept Accept-Reply at 2433
0719                         go to ba-rdbms-exit
0720                end-if
0721  *>
0722  *>  Not a error comparing the length of records so - -
0723  *>  Load up the DB settings from the system record as its not passed on
0724  *>           hopefully once is enough  :)
0725  *>```

**Rule at line 739**:
```cobol
0739       if       fn-Open
0740          and   fn-Output
0741                perform ba020-Process-Dal
0742                set fn-Delete-All to true
0743       end-if.
0744  *>
0745  *>   HERE we need a CDF [Compiler Directive] to select the correct DAL based
0746  *>     on the pre SQL compiler e.g., JCs or dbpre or Prima conversions <<<<  ? >>>>>
0747  *>        Do this after system testing and pre code release.
0748  *>
0749  *>  NOW SET UP FOR JCs pre-sql compiler system.```
### 2.2 ACASIRSUB3 - Program Functions
**Evidence**: acasirsub3.cbl, 0 lines, complexity: 11

**Business Rules Found**:

**Rule at line 89**:
```cobol
0089  *> for more details. If it breaks, you own both pieces but I will endeavour
0090  *> to fix it, providing you tell me about the problem.
0091  *>
0092  *> You should have received a copy of the GNU General Public License along
0093  *> with ACAS; see the file COPYING.  If not, write to the Free Software
0094  *> Foundation, 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA.
0095  *>
0096  *>**********************************************************************************
0097  *>
0098   environment division.
0099   copy "envdiv.cob".```

**Rule at line 398**:
```cobol
0398                         if  Testing-1
0399                             perform Ca-Process-Logs
0400                         end-if
0401                         accept Accept-Reply at 2433
0402                         go to ba-rdbms-exit
0403                end-if
0404  *>
0405  *>  Not a error comparing the length of records so - -
0406  *>  Load up the DB settings from the system record as its not passed on
0407  *>           hopefully once is enough  :)
0408  *>```
### 2.3 ACASIRSUB4 - Program Functions
**Evidence**: acasirsub4.cbl, 0 lines, complexity: 18

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
0082  *>**********************************************************************************
0083  *>
0084   environment division.
0085   copy "envdiv.cob".```

**Rule at line 495**:
```cobol
0495                         if  Testing-1
0496                             perform Ca-Process-Logs
0497                         end-if
0498                         accept Accept-Reply at 2433
0499                         go to ba-rdbms-exit
0500                end-if
0501  *>
0502  *>  Not a error comparing the length of records so - -
0503  *>  Load up the DB settings from the system record as its not passed on
0504  *>           hopefully once is enough  :)
0505  *>```

**Rule at line 519**:
```cobol
0519       if       fn-Open
0520          and   fn-Output
0521                perform ba020-Process-Dal
0522                set fn-Delete-All to true
0523       end-if.
0524  *>
0525  *>   HERE we need a CDF [Compiler Directive] to select the correct DAL based
0526  *>     on the pre SQL compiler e.g., JCs or dbpre or Prima conversions <<<<  ? >>>>>
0527  *>        Do this after system testing and pre code release.
0528  *>
0529  *>  NOW SET UP FOR JC pre-sql compiler system.```
### 2.4 ACASIRSUB5 - Program Functions
**Evidence**: acasirsub5.cbl, 0 lines, complexity: 11

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
0087  *>**********************************************************************************
0088  *>
0089   environment division.
0090   copy "envdiv.cob".```

**Rule at line 390**:
```cobol
0390                         if  Testing-1
0391                             perform Ca-Process-Logs
0392                         end-if
0393                         accept Accept-Reply at 2433
0394                         go to ba-rdbms-exit
0395                end-if
0396  *>
0397  *>  Not a error comparing the length of records so - -
0398  *>  Load up the DB settings from the system record as its not passed on
0399  *>           hopefully once is enough  :)
0400  *>```
### 2.5 IRS - Program Functions
**Evidence**: acasirsub1.cbl, 0 lines, complexity: 27

**Business Rules Found**:

**Rule at line 55**:
```cobol
0055  *>                    also give fs-reply to we-error if 47, 48, 49 to try and find error in caller
0056  *>                    that is opening an already open file. Found it in irs030 (SL/PL posting file proc.
0057  *> 23/04/18 vbc - .11 Extra code in open and read indexed.
0058  *> 29/04/18 vbc - .12 Resetting Cobol-File-Status for write,rewrite,delete, start.
0059  *> 07/12/22 vbc - .13 Chgd Vars A & B to pic 999 to keep GC v3.2 happy.
0060  *> 10/12/22 vbc - .14 chg to perform ba-Process-RDBMS 2 remove GC warning msg from latest v3.2 code
0061  *>                    WITH ba-Main-Exit chgd to exit section.
0062  *> 16/04/24 vbc       Copyright notice update superceding all previous notices.
0063  *>**
0064  *>  Module USAGE
0065  *>**************```

**Rule at line 715**:
```cobol
0715                         if  Testing-1
0716                             perform Ca-Process-Logs
0717                         end-if
0718                         accept Accept-Reply at 2433
0719                         go to ba-rdbms-exit
0720                end-if
0721  *>
0722  *>  Not a error comparing the length of records so - -
0723  *>  Load up the DB settings from the system record as its not passed on
0724  *>           hopefully once is enough  :)
0725  *>```

**Rule at line 739**:
```cobol
0739       if       fn-Open
0740          and   fn-Output
0741                perform ba020-Process-Dal
0742                set fn-Delete-All to true
0743       end-if.
0744  *>
0745  *>   HERE we need a CDF [Compiler Directive] to select the correct DAL based
0746  *>     on the pre SQL compiler e.g., JCs or dbpre or Prima conversions <<<<  ? >>>>>
0747  *>        Do this after system testing and pre code release.
0748  *>
0749  *>  NOW SET UP FOR JCs pre-sql compiler system.```

## Data Domain

## Interface Contracts

### Program: acasirsub1
**Evidence**: acasirsub1.cbl

```cobol
Linkage Section.
*>**************
 copy "irswsnl.cob" replacing nl-record by WS-NL-Record.
*>
 copy "wssystem.cob".
*>
 copy "wsfnctn.cob".
*>
 copy "wsnames.cob".
*>
 copy "Test-Data-Flags.cob".  *> set sw-testing to zero to stop logging.
*>
```

### Program: acasirsub3
**Evidence**: acasirsub3.cbl

```cobol
Linkage Section.
*>**************
 copy "irswsdflt.cob" replacing Default-Record by WS-IRS-Default-Record.
*>
 copy "wssystem.cob".
*>
 copy "wsfnctn.cob".
*>
 copy "wsnames.cob".
*>
 copy "Test-Data-Flags.cob".  *> set sw-testing to zero to stop logging.
*>
```

### Program: acasirsub4
**Evidence**: acasirsub4.cbl

```cobol
Linkage Section.
*>**************
 copy "irswspost.cob".
*>
 copy "wssystem.cob".
*>
 copy "wsfnctn.cob".
*>
 copy "wsnames.cob".
*>
 copy "Test-Data-Flags.cob".  *> set sw-testing to zero to stop logging.
*>
```

## Error Handling Analysis


## Evidence Summary

- Total statements: 16
- Backed by code evidence: 16 (100.0%)
- No evidence found: 0
- **Quality Assessment**: ✅ PASSED
