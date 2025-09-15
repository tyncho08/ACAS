# Common Utilities - Functional Specification

## Executive Summary

**Programs Analyzed**: 28 programs
**Main Program**: ACAS
**Parse Confidence**: 0.94 (based on successful GnuCOBOL validation)

### Discovered Functionality (from AST analysis):
- Validation Rules: 85 validation rules found
- Calculations: 2 calculations found
- Data Transformations: 1588 data transformations found
- External Calls: 52 external calls found

### Data Entities Managed:

## Functional Capabilities

### 2.1 ACAS - Program Functions
**Evidence**: ACAS-Sysout.cbl, 0 lines, complexity: 2

**Business Rules Found**:

**Rule at line 60**:
```cobol
0060  *> for more details. If it breaks, you own both pieces but I will endeavour
0061  *> to fix it, providing you tell me about the problem.
0062  *>
0063  *> You should have received a copy of the GNU General Public License along
0064  *> with ACAS; see the file COPYING.  If not, write to the Free Software
0065  *> Foundation, 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA.
0066  *>
0067  *>*************************************************************************
0068  *>
0069  *>
0070   environment division.```
### 2.2 ACAS000 - Program Functions
**Evidence**: acas000.cbl, 0 lines, complexity: 18

**Business Rules Found**:

**Rule at line 48**:
```cobol
0048  *>                      If Cobol Flat files are in use (via the system parameter file settings)
0049  *>                      which is passed via the wsfnctn (via copybook) / File-Access data block
0050  *>                      via the application module and each FH & DAL.
0051  *>                      It will read/write/delete/update/open/close as required and requested.
0052  *>                      NOTE the same fields are used for ALL of the FL and DAL modules so
0053  *>                      checking the error flags have to be done after each call before clearing.
0054  *>
0055  *>                      If RDBMS (Relational DataBase Management Systems) is in use it will call
0056  *>                      the specific module to handle similar processing passing the equivelent
0057  *>                      RDB (Relational DataBase) row as a Cobol file record (01 level) moving
0058  *>                      row by row to the correct Cobol flat file fields as required.```

**Rule at line 545**:
```cobol
0545                         if  Testing-1
0546                             perform Ca-Process-Logs
0547                         end-if
0548                         accept Accept-Reply at 2433
0549                         go to ba-rdbms-exit
0550                end-if
0551  *>
0552  *>  Not a error comparing the length of records so - -
0553  *>  Load up the DB settings from the system record from COBOL file as its not passed on
0554  *>           hopefully once is enough  :)
0555  *>```
### 2.3 ACAS004 - Program Functions
**Evidence**: acas004.cbl, 0 lines, complexity: 26

**Business Rules Found**:

**Rule at line 93**:
```cobol
0093  *>                          SQL-Err  = Error code from RDBMS is set if above 2 are non zero
0094  *>                          SQL-Msg  = Non space providing more info if SQL-Err non '00000'
0095  *>                                     * = FS-Reply = 99.
0096  *>
0097  *>       During testing a log file will be created containing datetime stamp, task and return codes
0098  *>       for both FS-Reply and WE-Error and table used along with the RDB error number and message
0099  *>         In this case for the
0100  *>                Invoice File.
0101  *>
0102  *>       WARNING - This file could get large so needs manually deleting after examination.
0103  *>```

**Rule at line 335**:
```cobol
0335       if       Cobol-File-Eof
0336                move 10 to FS-Reply
0337                           WE-Error
0338                move spaces to Agen-Invoice-Key
0339                               SQL-Err
0340                               SQL-Msg
0341                stop "Cobol File EOF"               *> for testing
0342                go to aa999-main-exit
0343       end-if
0344  *>
0345       read     Agen-Invoice-File next record at end```

**Rule at line 545**:
```cobol
0545                         if  Testing-1
0546                             perform Ca-Process-Logs
0547                         end-if
0548                         accept Accept-Reply at 2433
0549                         go to ba-rdbms-exit
0550                end-if
0551  *>
0552  *>  Not a error comparing the length of records so - -
0553  *>  Load up the DB settings from the system record as its not passed on
0554  *>           hopefully once is enough  :)
0555  *>```
### 2.4 ACAS005 - Program Functions
**Evidence**: acas005.cbl, 0 lines, complexity: 25

**Business Rules Found**:

**Rule at line 45**:
```cobol
0045  *>                      If Cobol Flat files are in use (via the system parameter file settings)
0046  *>                      which is passed via the wsfnctn (via copybook) / File-Access data block
0047  *>                      via the application module and each FH & DAL.
0048  *>                      It will read/write/delete/update/open/close as required and requested.
0049  *>                      NOTE the same fields are used for ALL of the FL and DAL modules so
0050  *>                      checking the error flags have to be done after each call before clearing.
0051  *>
0052  *>                      If RDBMS (Relational DataBase Management Systems) is in use it will call
0053  *>                      the specific module to handle similar processing passing the equivelent
0054  *>                      RDB (Relational DataBase) row as a Cobol file record (01 level) moving
0055  *>                      row by row to the correct Cobol flat file fields as required.```

**Rule at line 626**:
```cobol
0626                         if  Testing-1
0627                             perform Ca-Process-Logs
0628                         end-if
0629                         accept Accept-Reply at 2433
0630                         go to ba-rdbms-exit
0631                end-if
0632  *>
0633  *>  Not a error comparing the length of records so - -
0634  *>  Load up the DB settings from the system record as its not passed on
0635  *>           hopefully once is enough  :)
0636  *>```

**Rule at line 650**:
```cobol
0650   *>    if       fn-Open
0651   *>       and   fn-Output
0652   *>             perform ba020-Process-Dal
0653   *>             set fn-Delete-All to true
0654   *>    end-if.
0655  *>
0656  *>   HERE we need a CDF [Compiler Directive] to select the correct DAL based
0657  *>     on the pre SQL compiler e.g., JCs or dbpre or Prima conversions <<<<  ? >>>>>
0658  *>        Do this after system testing and pre code release.
0659  *>
0660  *>  NOW SET UP FOR JC pre-sql compiler system.```
### 2.5 ACAS006 - Program Functions
**Evidence**: acas006.cbl, 0 lines, complexity: 18

**Business Rules Found**:

**Rule at line 52**:
```cobol
0052  *>                      If Cobol Flat files are in use (via the system parameter file settings)
0053  *>                      which is passed via the wsfnctn (via copybook) / File-Access data block
0054  *>                      via the application module and each FH & DAL.
0055  *>                      It will read/write/delete/update/open/close as required and requested.
0056  *>                      NOTE the same fields are used for ALL of the FL and DAL modules so
0057  *>                      checking the error flags have to be done after each call before clearing.
0058  *>
0059  *>                      If RDBMS (Relational DataBase Management Systems) is in use it will call
0060  *>                      the specific module to handle similar processing passing the equivelent
0061  *>                      RDB (Relational DataBase) row as a Cobol file record (01 level) moving
0062  *>                      row by row to the correct Cobol flat file fields as required.```

**Rule at line 617**:
```cobol
0617                         if  Testing-1
0618                             perform Ca-Process-Logs
0619                         end-if
0620                         accept Accept-Reply at 2433
0621                         go to ba-rdbms-exit
0622                end-if
0623  *>
0624  *>  Not a error comparing the length of records so - -
0625  *>  Load up the DB settings from the system record as its not passed on
0626  *>           hopefully once is enough  :)
0627  *>```

**Rule at line 641**:
```cobol
0641       if       fn-Open
0642          and   fn-Output
0643                perform ba020-Process-Dal
0644                set fn-Delete-All to true
0645       end-if.
0646  *>
0647  *>   HERE we need a CDF [Compiler Directive] to select the correct DAL based
0648  *>     on the pre SQL compiler e.g., JCs or dbpre or Prima conversions <<<<  ? >>>>>
0649  *>        Do this after system testing and pre code release.
0650  *>
0651  *>  NOW SET UP FOR JC pre-sql compiler system.```

## Data Domain

## Interface Contracts

### Program: ACAS
**Evidence**: ACAS-Sysout.cbl

```cobol
linkage section.
 01  LS-SO-Print        pic x(160).
*>
```

### Program: acas000
**Evidence**: acas000.cbl

```cobol
Linkage Section.
*>**************
*>
*> Fields renamed as wsssytem also in FD.
*>
 copy "wssystem.cob" replacing System-Record by WS-System-Record
                               File-System-Used        by WS-File-System-Used
                               File-Duplicates-In-Use  by WS-File-Duplicates-In-Use
                               FS-Cobol-Files-Used     by WS-FS-Cobol-Files-Used
                               FS-RDBMS-Used           by WS-FS-RDBMS-Used
                               FS-Duplicate-Processing by WS-FS-Duplicate-Processing
                               RDBMS-Flat-Statuses     by WS-RDBMS-Flat-Statuses.
*>
*> Here are the other three records held as relative, in the system file
*>   OOPS, not actually used here or by a call.
*>
*> copy "wsdflt.cob".
*> copy "wsfinal.cob".
*> copy "wssys4.cob".
*>
 copy "wsfnctn.cob".
*>
 copy "wsnames.cob".
*>
 copy "Test-Data-Flags.cob".  *> set sw-testing to zero to stop logging.
*>
```

### Program: acas004
**Evidence**: acas004.cbl

```cobol
Linkage Section.
*>**************
 copy "slwsinv.cob" replacing SInvoice-Header by WS-Invoice-Record
                              SInvoice-Bodies by WS-Invoice-Bodies.
*>
*> IS ABOVE STILL OK for AUTOgen ?
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

- Total statements: 15
- Backed by code evidence: 15 (100.0%)
- No evidence found: 0
- **Quality Assessment**: ✅ PASSED
