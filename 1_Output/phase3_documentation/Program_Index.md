# Program Index - With Calculated Metrics

**Generated**: 2025-09-15T17:29:44.654Z  
**Total Programs**: 277  
**Metrics Source**: AST-based analysis (not estimated)

---

## A

### ACAS.cbl
- **Program Type**: MAIN (identified from STOP RUN)
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: acas000 (1x), maps04 (2x)
  - Called by: None (entry point)
  - Copybooks: must, of, envdiv, sys-params-versioning, wstime, wsfnctn, wsmaps01, wsmaps03, wscall, wssys4, wsdflt, wsfinal, wsnames, wssystem, Test-Data-Flags, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 3 business rules (lines 9-386)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### ACAS-Sysout.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: None
  - Called by: DelFolioLD, PurchaseRES, PurchaseUNL, StockLD, SystemLD, SystemRES, SystemUNL, analLD, analRES, analUNL, auditLD, auditRES, auditUNL, delfolioRES, delfolioUNL, deliveryLD, deliveryRES, deliveryUNL, dfltLD, finalLD, glbatchLD, glbatchRES, glbatchUNL, glpostingLD, invoiceRES, invoiceUNL, irsdfltLD, irsdfltRES, irsdfltUNL, irsfinalLD, irsfinalRES, irsfinalUNL, irsnominalLD, irsnominalRES, irsnominalUNL, irsnominalUNL2, irspostingLD, irspostingRES, irspostingUNL, nominalLD, nominalRES, nominalUNL, otm3LD, otm3RES, otm3UNL, otm5LD, otm5RES, otm5UNL, pInvoiceRES, pInvoiceUNL, paymentsLD, paymentsRES, paymentsUNL, plautogenLD, plautogenRES, plautogenUNL, plinvoiceLD, postingRES, postingUNL, purchLD, salesLD, salesRES, salesUNL, slautogenLD, slautogenRES, slautogenUNL, sldelinvnosLD, sldelinvnosRES, sldelinvnosUNL, slinvoiceLD, slpostingLD, slpostingRES, slpostingUNL, stockRES, stockUNL, sys4LD, valueLD, valueRES, valueUNL
  - Copybooks: of, envdiv
- **Business Functions** (extracted):
  - 1 business rules (lines 60-60)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acas-get-params.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x)
  - Called by: DelFolioLD, StockLD, SystemLD, analLD, auditLD, deliveryLD, dfltLD, finalLD, glbatchLD, glpostingLD, irsdfltLD, irsfinalLD, irsnominalLD, irspostingLD, nominalLD, otm3LD, otm5LD, paymentsLD, plautogenLD, plinvoiceLD, purchLD, salesLD, slautogenLD, sldelinvnosLD, slinvoiceLD, slpostingLD, sys4LD, valueLD
  - Copybooks: of, envdiv
- **Business Functions** (extracted):
  - 1 business rules (lines 21-21)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acas000.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 3
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: fhlogger (1x), systemMT (1x)
  - Called by: ACAS, SystemLD, dfltLD, finalLD, sys4LD
  - Copybooks: *>, of, envdiv, selsys, fdsys, wssystem, wsdflt, wsfinal, wssys4, wsfnctn, wsnames, Test-Data-Flags
- **Business Functions** (extracted):
  - 2 business rules (lines 48-545)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acas004.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 3
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: fhlogger (1x), slautogenMT (1x)
  - Called by: slautogenLD
  - Copybooks: *>, of, envdiv, slSELautogen, slFDautogen, slwsinv, wssystem, wsfnctn, wsnames, Test-Data-Flags
- **Business Functions** (extracted):
  - 3 business rules (lines 93-545)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acas005.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 4
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: fhlogger (1x), nominalMT (1x)
  - Called by: nominalLD
  - Copybooks: *>, of, envdiv, seledger, fdledger, wsledger, wssystem, wsfnctn, wsnames, Test-Data-Flags, the
- **Business Functions** (extracted):
  - 3 business rules (lines 45-650)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acas006.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 4
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: fhlogger (1x), glpostingMT (1x)
  - Called by: glpostingLD
  - Copybooks: *>, of, envdiv, selpost, fdpost, wspost, wssystem, wsfnctn, wsnames, Test-Data-Flags
- **Business Functions** (extracted):
  - 3 business rules (lines 52-641)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acas007.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 4
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: fhlogger (1x), glbatchMT (1x)
  - Called by: glbatchLD
  - Copybooks: *>, of, envdiv, selbatch, fdbatch, wsbatch, wssystem, wsfnctn, wsnames, Test-Data-Flags
- **Business Functions** (extracted):
  - 3 business rules (lines 45-628)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acas008.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 4
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: fhlogger (1x), slpostingMT (1x)
  - Called by: slpostingLD
  - Copybooks: *>, of, envdiv, selpost-irs, fdpost-irs, wspost-irs, wssystem, wsfnctn, wsnames, Test-Data-Flags
- **Business Functions** (extracted):
  - 3 business rules (lines 47-545)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acas010.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 5 (actual)
  - Cognitive Complexity: 5
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: auditMT (1x), fhlogger (1x)
  - Called by: auditLD
  - Copybooks: *>, of, envdiv, selaud, fdaudit, wsaudit, wssystem, wsfnctn, wsnames, Test-Data-Flags
- **Business Functions** (extracted):
  - 4 business rules (lines 44-536)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acas011.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 4
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: fhlogger (1x), stockMT (1x)
  - Called by: StockLD, st060
  - Copybooks: *>, of, envdiv, selstock, fdstock, wsstock, wssystem, wsfnctn, wsnames, Test-Data-Flags, the
- **Business Functions** (extracted):
  - 3 business rules (lines 44-798)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acas012.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 5 (actual)
  - Cognitive Complexity: 5
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: fhlogger (1x), salesMT (1x)
  - Called by: salesLD, takeon-1
  - Copybooks: *>, of, envdiv, selsl, fdsl, wssl, wssystem, wsfnctn, wsnames, Test-Data-Flags, the
- **Business Functions** (extracted):
  - 4 business rules (lines 44-630)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acas013.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 4
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: fhlogger (1x), valueMT (1x)
  - Called by: valueLD
  - Copybooks: *>, of, envdiv, selval, fdval, wsval, wssystem, wsfnctn, wsnames, Test-Data-Flags, the
- **Business Functions** (extracted):
  - 3 business rules (lines 45-628)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acas014.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 4
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: deliveryMT (1x), fhlogger (1x)
  - Called by: deliveryLD
  - Copybooks: *>, of, envdiv, seldel, fddel, wsdel, wssystem, wsfnctn, wsnames, Test-Data-Flags
- **Business Functions** (extracted):
  - 3 business rules (lines 45-626)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acas015.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 4
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: analMT (1x), fhlogger (1x)
  - Called by: analLD
  - Copybooks: ws-PA-Code, *>, of, envdiv, selanal, fdanal, wsanal, wssystem, wsfnctn, wsnames, Test-Data-Flags, the
- **Business Functions** (extracted):
  - 3 business rules (lines 44-626)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acas016.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 3
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: fhlogger (1x), slinvoiceMT (1x)
  - Called by: slinvoiceLD
  - Copybooks: code, *>, of, envdiv, slselinv, slfdinv, slwsinv2, wssystem, wsfnctn, wsnames, Test-Data-Flags
- **Business Functions** (extracted):
  - 3 business rules (lines 133-593)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acas017.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 4
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: fhlogger (1x), sldelinvnosMT (1x)
  - Called by: sldelinvnosLD
  - Copybooks: *>, of, envdiv, seldnos, fddnos, wsdnos, wssystem, wsfnctn, wsnames, Test-Data-Flags
- **Business Functions** (extracted):
  - 3 business rules (lines 46-625)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acas019.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 3
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: fhlogger (1x), otm3MT (1x)
  - Called by: otm3LD
  - Copybooks: code, *>, of, envdiv, slseloi3, slfdoi3, slwsoi, wssystem, wsfnctn, wsnames, Test-Data-Flags, WS
- **Business Functions** (extracted):
  - 3 business rules (lines 128-583)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acas022.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 4
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: fhlogger (1x), purchMT (1x)
  - Called by: purchLD, takeon-2
  - Copybooks: *>, of, envdiv, selpl, fdpl, wspl, wssystem, wsfnctn, wsnames, Test-Data-Flags, the
- **Business Functions** (extracted):
  - 3 business rules (lines 44-631)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acas023.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 4
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: delfolioMT (1x), fhlogger (1x)
  - Called by: DelFolioLD
  - Copybooks: *>, of, envdiv, selpdnos, fddnos, wsdnos, wssystem, wsfnctn, wsnames, Test-Data-Flags
- **Business Functions** (extracted):
  - 3 business rules (lines 45-626)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acas026.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 3
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: fhlogger (1x), plinvoiceMT (1x)
  - Called by: plinvoiceLD
  - Copybooks: code, *>, of, envdiv, plselpinv, plfdpinv, plwspinv, wssystem, wsfnctn, wsnames, Test-Data-Flags
- **Business Functions** (extracted):
  - 3 business rules (lines 127-583)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acas029.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 3
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: fhlogger (1x), otm5MT (1x)
  - Called by: otm5LD
  - Copybooks: code, *>, of, envdiv, plseloi5, plfdoi5, plwsoi, wssystem, wsfnctn, wsnames, Test-Data-Flags, WS
- **Business Functions** (extracted):
  - 3 business rules (lines 121-577)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acas030.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 3
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: fhlogger (1x), plautogenMT (1x)
  - Called by: plautogenLD
  - Copybooks: *>, of, envdiv, plSELautogen, plFDautogen, plwspinv, wssystem, wsfnctn, wsnames, Test-Data-Flags
- **Business Functions** (extracted):
  - 3 business rules (lines 92-550)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acas032.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 4
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: fhlogger (1x), paymentsMT (1x)
  - Called by: paymentsLD
  - Copybooks: *>, of, envdiv, selpay, fdpay, wspay, wssystem, wsfnctn, wsnames, Test-Data-Flags
- **Business Functions** (extracted):
  - 3 business rules (lines 45-615)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acasconvert1.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 2
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x), CBL_RENAME_FILE (1x)
  - Called by: None (entry point)
  - Copybooks: of, wsnames, selsys, fdsys
- **Business Functions** (extracted):
  - 3 business rules (lines 47-117)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acasconvert1.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 2
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x), CBL_RENAME_FILE (1x)
  - Called by: None (entry point)
  - Copybooks: of, wsnames, selsys, fdsys
- **Business Functions** (extracted):
  - 3 business rules (lines 47-117)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acasconvert2.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: &, of, selsys, fdsys, wsnames
- **Business Functions** (extracted):
  - 1 business rules (lines 30-30)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acasconvert3.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 2
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_DELETE_FILE (1x), CBL_RENAME_FILE (1x)
  - Called by: None (entry point)
  - Copybooks: &, of, slselinv, slfdinv2, wsnames
- **Business Functions** (extracted):
  - 2 business rules (lines 32-218)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acasirsub1.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 3
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: fhlogger (1x), irsnominalMT (1x)
  - Called by: irsnominalLD
  - Copybooks: for, *>, of, envdiv, irsfdwsnl, irswsnl, wssystem, wsfnctn, wsnames, Test-Data-Flags, the
- **Business Functions** (extracted):
  - 3 business rules (lines 55-739)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acasirsub3.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 2
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: fhlogger (1x), irsdfltMT (1x)
  - Called by: irsdfltLD
  - Copybooks: for, of, envdiv, irswsdflt, wssystem, wsfnctn, wsnames, Test-Data-Flags
- **Business Functions** (extracted):
  - 2 business rules (lines 89-398)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acasirsub4.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 3
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: fhlogger (1x), irspostingMT (1x)
  - Called by: irspostingLD
  - Copybooks: for, of, envdiv, irswspost, wssystem, wsfnctn, wsnames, Test-Data-Flags, the
- **Business Functions** (extracted):
  - 3 business rules (lines 75-519)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### acasirsub5.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 2
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: fhlogger (1x), irsfinalMT (1x)
  - Called by: irsfinalLD
  - Copybooks: for, of, envdiv, irswsfinal, wssystem, wsfnctn, wsnames, Test-Data-Flags
- **Business Functions** (extracted):
  - 2 business rules (lines 80-390)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### analLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acas015 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, wsanal, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 112-112)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### analMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 5
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (5x), MySQL_fetch_record (2x), MySQL_free_result (1x), fhlogger (1x)
  - Called by: acas015
  - Copybooks: *>, ACAS-SQLstate-error-list, of, envdiv, mysql-variables, wsfnctn, Book, book, mysql-procedures
- **Business Functions** (extracted):
  - 3 business rules (lines 33-456)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### analRES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selanal, fdanal, wsanal, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### analUNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selanal, fdanal, wsanal, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### auditLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (2x), MySQL_rollback (2x), acas-get-params (1x), acas010 (2x), fhlogger (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, wsaudit, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files, selaud, fdaudit
- **Business Functions** (extracted):
  - 3 business rules (lines 94-415)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### auditLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (2x), MySQL_rollback (2x), acas-get-params (1x), acas010 (2x), fhlogger (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, wsaudit, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files, selaud, fdaudit
- **Business Functions** (extracted):
  - 3 business rules (lines 94-415)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### auditMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 5
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (6x), MySQL_fetch_record (2x), MySQL_free_result (1x), MySQL_query (1x), fhlogger (1x)
  - Called by: acas010
  - Copybooks: ACAS-SQLstate-error-list, of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, Book, book, mysql-procedures
- **Business Functions** (extracted):
  - 3 business rules (lines 33-464)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### auditRES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selaud, fdaudit, wsaudit, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### auditUNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selaud, fdaudit, wsaudit, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

## C

### CBL_OC_DUMP.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 6 (actual)
  - Cognitive Complexity: 7
  - Halstead Volume: N/A
  - Maintainability Index: N/A 
- **Dependencies**:
  - Calls: C$PARAMSIZE (1x)
  - Called by: None (entry point)
  - Copybooks: None
- **Business Functions** (extracted):
  - 1 business rules (lines 80-80)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### cobdump.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 2
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: COBDUMP (1x)
  - Called by: None (entry point)
  - Copybooks: None
- **Business Functions** (extracted):
  - 1 business rules (lines 12-12)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### create-system-dat.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 1 (actual)
  - Cognitive Complexity: N/A
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: None
- **Business Functions** (extracted):
  - No business rules extracted
- **Technical Debt**:
    - Missing error handler for files: system-file
- **Data Access**:
  - Files: system-file (["OPEN","READ","WRITE","CLOSE"])
  - SQL: None

## D

### DelFolioLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 7 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: N/A 
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acas023 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, wsdnos, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 60-60)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### delfolioMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 5 (actual)
  - Cognitive Complexity: 6
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (6x), MySQL_fetch_record (2x), MySQL_free_result (1x), MySQL_query (1x), fhlogger (1x)
  - Called by: acas023
  - Copybooks: *>, ACAS-SQLstate-error-list, of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, wsdnos, mysql-procedures
- **Business Functions** (extracted):
  - 4 business rules (lines 35-772)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### delfolioRES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpdnos, fddnos, wsdnos, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### delfolioUNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpdnos, fddnos, wsdnos, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### deliveryLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acas014 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, wsdel, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 60-60)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### deliveryMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 5 (actual)
  - Cognitive Complexity: 6
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (6x), MySQL_fetch_record (2x), MySQL_free_result (1x), MySQL_query (1x), fhlogger (1x)
  - Called by: acas014
  - Copybooks: *>, ACAS-SQLstate-error-list, of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, wsdel, mysql-procedures
- **Business Functions** (extracted):
  - 4 business rules (lines 34-773)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### deliveryRES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, seldel, fddel, wsdel, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### deliveryUNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, seldel, fddel, wsdel, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### dfltLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acas000 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, wssystem, wsdflt, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 102-102)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### dfltMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 5 (actual)
  - Cognitive Complexity: 6
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (4x), MySQL_fetch_record (1x), MySQL_free_result (1x), fhlogger (1x)
  - Called by: None (entry point)
  - Copybooks: *>, ACAS-SQLstate-error-list, of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, wsdflt, mysql-procedures
- **Business Functions** (extracted):
  - 4 business rules (lines 33-460)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### dummmy.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: N/A 
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: of, envdiv, wsfnctn, Test-Data-Flags
- **Business Functions** (extracted):
  - 6 business rules (lines 30-30)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### dummmy.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: N/A 
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: of, envdiv, wsfnctn, Test-Data-Flags
- **Business Functions** (extracted):
  - 6 business rules (lines 30-30)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### dummmy.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: N/A 
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: of, envdiv, wsfnctn, Test-Data-Flags
- **Business Functions** (extracted):
  - 6 business rules (lines 30-30)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### dummmy.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: N/A 
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: of, envdiv, wsfnctn, Test-Data-Flags
- **Business Functions** (extracted):
  - 6 business rules (lines 30-30)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### dummmy.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: N/A 
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: of, envdiv, wsfnctn, Test-Data-Flags
- **Business Functions** (extracted):
  - 6 business rules (lines 30-30)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### dummmy.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: N/A 
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: of, envdiv, wsfnctn, Test-Data-Flags
- **Business Functions** (extracted):
  - 6 business rules (lines 30-30)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

## F

### fhlogger.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: None
  - Called by: acas000, acas004, acas005, acas006, acas007, acas008, acas010, acas011, acas012, acas013, acas014, acas015, acas016, acas017, acas019, acas022, acas023, acas026, acas029, acas030, acas032, acasirsub1, acasirsub3, acasirsub4, acasirsub5, analMT, auditLD, auditMT, delfolioMT, deliveryMT, dfltMT, finalMT, glbatchMT, glpostingMT, irsdfltMT, irsfinalMT, irsnominalMT, irspostingMT, nominalMT, otm3MT, otm5MT, paymentsMT, plautogenMT, plinvoiceMT, purchMT, salesMT, slautogenMT, sldelinvnosMT, slinvoiceMT, slpostingMT, stockMT, sys4LD, sys4MT, systemMT, valueMT
  - Copybooks: of, envdiv, wsfnctn, Test-Data-Flags
- **Business Functions** (extracted):
  - 1 business rules (lines 69-69)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### finalLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acas000 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, wssystem, wsfinal, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 102-102)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### finalMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 5 (actual)
  - Cognitive Complexity: 6
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (4x), MySQL_fetch_record (1x), MySQL_free_result (1x), fhlogger (1x)
  - Called by: None (entry point)
  - Copybooks: *>, ACAS-SQLstate-error-list, of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, wsfinal, mysql-procedures
- **Business Functions** (extracted):
  - 4 business rules (lines 33-461)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

## G

### general.cbl
- **Program Type**: MAIN (identified from STOP RUN)
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x), SYSTEM (1x), maps04 (2x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, sys-params-versioning, wsmaps03, wscall, wstime, wsfnctn, wssystem, wssys4, wsdflt, wsfinal, wsnames, Test-Data-Flags, Proc-Get-Env-Set-Files, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 22-22)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### gl000.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: maps01 (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, wsmaps01, wsmaps03, wsfnctn, wscall, wssystem, wsnames
- **Business Functions** (extracted):
  - 1 business rules (lines 80-80)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### gl020.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: maps01 (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, seledger, fdledger, wsfnctn, wsledger, Test-Data-Flags, screenio, wsmaps03, wsmaps01, wscall, wssystem, wsdflt, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 88-88)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### gl030.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 6 (actual)
  - Cognitive Complexity: 7
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (3x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: &, existing, of, envdiv, selprint, fdprint, print-spool-command, wsmaps03, glwspc, wsfnctn, wsledger, Test-Data-Flags, screenio, wscall, wssystem, wsnames, -, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 5 business rules (lines 135-2544)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### gl050.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 2
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: maps04 (2x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, seledger, selbatch, selpost, fdledger, fdbatch, fdpost, wsmaps03, wsfnctn, wsledger, wsbatch, wspost, Test-Data-Flags, screenio, glwspc, glwspint, wscall, wssystem, wsdflt, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 10-10)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### gl051.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 3
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), maps04 (2x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, seledger, selbatch, selpost, selprint, fdledger, fdbatch, fdpost, fdprint, print-spool-command, wsmaps03, wsfnctn, wsledger, wsbatch, wspost, Test-Data-Flags, screenio, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 2 business rules (lines 10-1030)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### gl060.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selprint, selbatch, fdprint, fdbatch, print-spool-command-p, wsmaps03, wsfnctn, wsbatch, Test-Data-Flags, screenio, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 78-78)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### gl070.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpost, selbatch, fdpost, fdbatch, wsmaps03, wsfnctn, wsbatch, wspost, Test-Data-Flags, screenio, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 31-31)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### gl071.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: of, envdiv, wscall, wssystem, wsnames
- **Business Functions** (extracted):
  - 1 business rules (lines 74-74)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### gl072.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, seledger, selbatch, selprint, fdledger, fdbatch, fdprint, print-spool-command, wsfnctn, wsledger, wsbatch, Test-Data-Flags, screenio, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 77-77)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### gl080.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 2
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: of, envdiv, seledger, selbatch, selpost, fdledger, fdbatch, fdpost, wsledger, wsbatch, wspost, Test-Data-Flags, screenio, wsfnctn, wscall, wssystem, wsnames, FileStat-Msgs, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 2 business rules (lines 41-120)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### gl090.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: gl090a (1x), gl090b (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, wscall, wssystem, wsnames
- **Business Functions** (extracted):
  - 1 business rules (lines 32-32)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### gl090a.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x)
  - Called by: gl090
  - Copybooks: of, envdiv, seledger, selprint, fdledger, fdprint, print-spool-command, wsfnctn, wsledger, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 83-83)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### gl090b.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x)
  - Called by: gl090
  - Copybooks: of, envdiv, seledger, selprint, fdledger, fdprint, print-spool-command, wsfnctn, wsledger, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 80-80)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### gl100.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: of, envdiv, wsfnctn, wscall, wssystem, wsnames
- **Business Functions** (extracted):
  - 1 business rules (lines 81-81)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### gl105.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selprint, seledger, fdprint, fdledger, print-spool-command, wsfnctn, wsledger, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 80-80)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### gl120.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selprint, seledger, fdprint, fdledger, print-spool-command, wsmaps03, wsfnctn, wsledger, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 82-82)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### glbatchLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acas007 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, wsbatch, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 59-59)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### glbatchMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 5
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (6x), MySQL_fetch_record (2x), MySQL_free_result (1x), MySQL_query (1x), fhlogger (1x)
  - Called by: acas007
  - Copybooks: *>, ACAS-SQLstate-error-list, of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, wsbatch, mysql-procedures
- **Business Functions** (extracted):
  - 3 business rules (lines 33-457)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### glbatchRES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selbatch, fdbatch, wsbatch, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### glbatchUNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selbatch, fdbatch, wsbatch, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### glpostingLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acas006 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, wspost, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 60-60)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### glpostingMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 5 (actual)
  - Cognitive Complexity: 6
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (6x), MySQL_fetch_record (2x), MySQL_free_result (1x), MySQL_query (1x), fhlogger (1x)
  - Called by: acas006
  - Copybooks: *>, ACAS-SQLstate-error-list, of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, wspost, mysql-procedures
- **Business Functions** (extracted):
  - 4 business rules (lines 33-809)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

## I

### invoiceRES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, slselinv, slfdinv, slwsinv, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### invoiceUNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, slselinv, slfdinv, slwsinv, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irs.cbl
- **Program Type**: MAIN (identified from STOP RUN)
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 3
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x), SYSTEM (3x), irs000 (1x), irs010 (1x), irs020 (1x), irs030 (1x), irs040 (1x), irs050 (1x), irs060 (1x), irs065 (1x), irs070 (1x), irs080 (1x), irs085 (1x), irs090 (1x), maps04 (2x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, sys-params-versioning, screenio, wsmaps03, wscall, wstime, wsfnctn, wssystem, irswssystem, wsnames, Test-Data-Flags, verb, Proc-ZZ100-ACAS-IRS-Calls, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 2 business rules (lines 100-1004)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irs000.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: maps04 (1x)
  - Called by: irs
  - Copybooks: of, envdiv, wsmaps03, wsfnctn, wssystem
- **Business Functions** (extracted):
  - 1 business rules (lines 72-72)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irs010.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 4
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (2x), SYSTEM (1x), irsubn (1x)
  - Called by: irs
  - Copybooks: of, envdiv, irsprint-spool-command-p, wsfnctn, irswsnl, Test-Data-Flags, wsmaps03, screenio, irswssystem, wssystem, wsnames, Proc-ZZ100-ACAS-IRS-Calls
- **Business Functions** (extracted):
  - 3 business rules (lines 92-1322)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irs020.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 3
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), irsubn (1x)
  - Called by: irs
  - Copybooks: of, envdiv, irsprint-spool-command-p, irswsnl, wsfnctn, irswsdflt, irswsfinal, screenio, Test-Data-Flags, irswssystem, wssystem, wsnames, Proc-ZZ100-ACAS-IRS-Calls
- **Business Functions** (extracted):
  - 3 business rules (lines 58-868)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irs030.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 4
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: irsubn (1x), scr_dump (1x)
  - Called by: irs
  - Copybooks: of, envdiv, wsfnctn, irswsnl, irswsdflt, irswspost, wspost-irs, Test-Data-Flags, screenio, irswssystem, wssystem, wsnames, Proc-ZZ100-ACAS-IRS-Calls
- **Business Functions** (extracted):
  - 3 business rules (lines 28-609)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irs040.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), irsubn (1x)
  - Called by: irs
  - Copybooks: of, envdiv, irsprint-spool-command-p, irswsnl, wsfnctn, Test-Data-Flags, irswssystem, wssystem, wsnames, Proc-ZZ100-ACAS-IRS-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 59-59)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irs050.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (2x), irs055 (1x), irsubn (1x), irsubp (1x)
  - Called by: irs
  - Copybooks: of, envdiv, irsprint-spool-command-p, screenio, Test-Data-Flags, irswspost, wsfnctn, irswsnl, irswsdflt, irswssystem, wssystem, wsnames, Proc-ZZ100-ACAS-IRS-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 57-57)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irs055.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: irsubn (1x)
  - Called by: irs050, irs070
  - Copybooks: of, envdiv, wsfnctn, irswspost, Test-Data-Flags, irswssystem, wssystem, wsnames, Proc-ZZ100-ACAS-IRS-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 80-80)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irs060.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 5 (actual)
  - Cognitive Complexity: 6
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: C$JUSTIFY (2x), SYSTEM (1x), irsubn (1x)
  - Called by: irs
  - Copybooks: of, envdiv, irsprint-spool-command-p, irswsfinal, wsfnctn, irswspost, irswsdflt, irsfdwsnl, irswsnl, Test-Data-Flags, irswssystem, wssystem, wsnames, if, Proc-ZZ100-ACAS-IRS-Calls
- **Business Functions** (extracted):
  - 4 business rules (lines 60-1751)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irs065.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: irsubn (1x)
  - Called by: irs
  - Copybooks: of, envdiv, wsfnctn, irswsnl, Test-Data-Flags, irswssystem, wssystem, wsnames, Proc-ZZ100-ACAS-IRS-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 97-97)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irs070.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 2
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: irs055 (1x), irsubn (1x), irsubp (3x)
  - Called by: irs
  - Copybooks: of, envdiv, wsfnctn, irswsnl, irswsdflt, irswspost, screenio, Test-Data-Flags, irswssystem, wssystem, wsnames, Proc-ZZ100-ACAS-IRS-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 49-49)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irs080.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: irsubn (1x)
  - Called by: irs
  - Copybooks: of, envdiv, irswsnl, wsfnctn, irswsdflt, irswspost, Test-Data-Flags, irswssystem, wssystem, wsnames, Proc-ZZ100-ACAS-IRS-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 60-60)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irs085.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: irsubn (1x)
  - Called by: irs
  - Copybooks: of, envdiv, wsfnctn, irswsdflt, irswspost, Test-Data-Flags, irswssystem, wssystem, wsnames, Proc-ZZ100-ACAS-IRS-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 89-89)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irs090.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x)
  - Called by: irs
  - Copybooks: of, envdiv, irsfdwsnl, irsprint-spool-command, wsfnctn, Test-Data-Flags, irswssystem, wssystem, wsnames, Proc-ZZ100-ACAS-IRS-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 91-91)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irsdfltLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acasirsub3 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, irswsdflt, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 101-101)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irsdfltMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 5 (actual)
  - Cognitive Complexity: 6
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (4x), MySQL_fetch_record (1x), MySQL_free_result (1x), fhlogger (1x)
  - Called by: acasirsub3
  - Copybooks: *>, ACAS-SQLstate-error-list, of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, irswsdflt, mysql-procedures
- **Business Functions** (extracted):
  - 4 business rules (lines 36-471)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irsdfltRES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, irswsdflt, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irsdfltUNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, irswsdflt, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irsfinalLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acasirsub5 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, irswsfinal, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 99-99)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irsfinalMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 3
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (4x), MySQL_fetch_record (1x), MySQL_free_result (1x), fhlogger (1x)
  - Called by: acasirsub5
  - Copybooks: ACAS-SQLstate-error-list, of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, irswsfinal, mysql-procedures
- **Business Functions** (extracted):
  - 3 business rules (lines 79-323)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irsfinalRES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, irswsfinal, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irsfinalUNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, irswsfinal, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irsnominalLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acasirsub1 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 96-96)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irsnominalMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 5 (actual)
  - Cognitive Complexity: 6
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (8x), MySQL_fetch_record (2x), MySQL_free_result (1x), MySQL_query (1x), fhlogger (1x)
  - Called by: acasirsub1
  - Copybooks: ACAS-SQLstate-error-list, of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, mysql-procedures
- **Business Functions** (extracted):
  - 4 business rules (lines 50-793)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irsnominalRES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, irsfdwsnl, irswsnl, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irsnominalUNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, irsfdwsnl, irswsnl, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irsnominalUNL2.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irspostingLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acasirsub4 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, irswspost, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 24-24)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irspostingMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 5 (actual)
  - Cognitive Complexity: 4
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (6x), MySQL_fetch_record (2x), MySQL_free_result (1x), MySQL_query (1x), fhlogger (1x)
  - Called by: acasirsub4
  - Copybooks: ACAS-SQLstate-error-list, of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, irswspost, mysql-procedures
- **Business Functions** (extracted):
  - 4 business rules (lines 50-714)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irspostingRES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, irswspost, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irspostingUNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, irswspost, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### irsubp.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: None
  - Called by: irs050, irs070
  - Copybooks: books, of, envdiv, irswspost, wsfnctn, wsnames
- **Business Functions** (extracted):
  - 1 business rules (lines 24-24)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

## M

### MAKESQLTABLE.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 8 (actual)
  - Cognitive Complexity: 7
  - Halstead Volume: N/A
  - Maintainability Index: N/A 
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: None
- **Business Functions** (extracted):
  - 14 business rules (lines 11-253)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: INPUT-FILE (["OPEN","READ","WRITE","CLOSE"]), OUTPUT-FILE (["OPEN","READ","WRITE","CLOSE"])
  - SQL: None

### MAKESQLTABLE.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 8 (actual)
  - Cognitive Complexity: 7
  - Halstead Volume: N/A
  - Maintainability Index: N/A 
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: None
- **Business Functions** (extracted):
  - 14 business rules (lines 11-253)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: INPUT-FILE (["OPEN","READ","WRITE","CLOSE"]), OUTPUT-FILE (["OPEN","READ","WRITE","CLOSE"])
  - SQL: None

### maps01.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: None
  - Called by: gl000, gl020, pl000, sl000, st000, sys002
  - Copybooks: of, envdiv, wsmaps01
- **Business Functions** (extracted):
  - 1 business rules (lines 58-58)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### maps04.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 2
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: None
  - Called by: ACAS, general, gl000, gl020, gl030, gl050, gl051, gl060, gl070, gl120, irs, irs000, pl000, pl010, pl015, pl020, pl030, pl040, pl050, pl060, pl080, pl085, pl095, pl100, pl120, pl130, pl140, pl160, pl170, pl190, pl900, pl910, pl930, pl940, pl950, purchase, sales, sl000, sl010, sl020, sl050, sl060, sl080, sl085, sl095, sl100, sl110, sl120, sl130, sl140, sl160, sl170, sl180, sl190, sl200, sl810, sl820, sl830, sl910, sl920, sl930, sl940, sl950, sl970, st000, st010, st020, st030, st060, stock, sys002, takeon-1, takeon-2, xl150
  - Copybooks: of, envdiv
- **Business Functions** (extracted):
  - 2 business rules (lines 26-131)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### maps09.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: None
  - Called by: pl010, pl025, sl010, sl960, st010, takeon-1, takeon-2
  - Copybooks: of, envdiv, wsmaps09
- **Business Functions** (extracted):
  - 1 business rules (lines 55-55)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

## N

### nominalLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acas005 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, wsledger, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 97-97)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### nominalMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 5 (actual)
  - Cognitive Complexity: 6
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (5x), MySQL_fetch_record (2x), MySQL_free_result (1x), fhlogger (1x)
  - Called by: acas005
  - Copybooks: *>, ACAS-SQLstate-error-list, of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, wsledger, mysql-procedures
- **Business Functions** (extracted):
  - 3 business rules (lines 33-451)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### nominalRES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, seledger, fdledger, wsledger, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### nominalUNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, seledger, fdledger, wsledger, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

## O

### otm3LD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acas019 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, slwsoi, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 101-101)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### otm3MT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 6 (actual)
  - Cognitive Complexity: 7
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (7x), MySQL_fetch_record (4x), MySQL_free_result (1x), fhlogger (1x)
  - Called by: acas019
  - Copybooks: ACAS-SQLstate-error-list, of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, slwsoi, mysql-procedures
- **Business Functions** (extracted):
  - 5 business rules (lines 36-1149)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### otm3RES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, slseloi3, slfdoi3, slwsoi, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### otm3UNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, slseloi3, slfdoi3, slwsoi, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### otm5LD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acas029 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, plwsoi, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 101-101)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### otm5MT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 6 (actual)
  - Cognitive Complexity: 7
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (7x), MySQL_fetch_record (4x), MySQL_free_result (1x), fhlogger (1x)
  - Called by: acas029
  - Copybooks: ACAS-SQLstate-error-list, of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, plwsoi, mysql-procedures
- **Business Functions** (extracted):
  - 5 business rules (lines 36-1155)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### otm5RES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, plseloi5, plfdoi5, plwsoi, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### otm5UNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, plseloi5, plfdoi5, plwsoi, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

## P

### PurchaseRES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: N/A 
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpl, fdpl, wspl, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### PurchaseUNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: N/A 
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpl, fdpl, wspl, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pInvoiceRES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: N/A 
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, plselpinv, plfdpinv, plwspinv2, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pInvoiceUNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: N/A 
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, plselpinv, plfdpinv, plwspinv2, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### paymentsLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acas032 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, wspay, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 60-60)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### paymentsMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 6
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (9x), MySQL_fetch_record (3x), MySQL_free_result (1x), MySQL_query (2x), MySQL_sqlstate (1x), fhlogger (1x)
  - Called by: acas032
  - Copybooks: ACAS-SQLstate-error-list, of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, wspay, mysql-procedures
- **Business Functions** (extracted):
  - 3 business rules (lines 42-482)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### paymentsRES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpay, fdpay, plwspay, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### paymentsUNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpay, fdpay, plwspay, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl000.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: maps01 (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, wsmaps01, wsmaps03, wsfnctn, wscall, wssystem, wsnames
- **Business Functions** (extracted):
  - 1 business rules (lines 75-75)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl010.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), maps04 (1x), maps09 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpl, seldel, selprint, fdpl, fddel, fdprint, print-spool-command, wsmaps03, wsfnctn, wsmaps09, screenio, Test-Data-Flags, wspl, wsdel, statement, wscall, wssystem, wsnames, FileStat-Msgs, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 104-104)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl015.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x), SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpinv, selpl, seloi5, selprint, fdpinv2, fdpl, fdoi5, wsfdpinv2, plwspl, plwsoi5B, print-spool-command-p, wsmaps03, wsfnctn, plwsoi, screenio, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 102-102)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl020.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 3
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (2x), maps04 (1x), pl025 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, wsmaps03, wsfnctn, wsanal, wspl, plwsoi5C, wsfdpinv, wspdnos, plwspinv, screenio, Test-Data-Flags, wscall, wssystem, wsnames, FileStat-Msgs, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 3 business rules (lines 58-578)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl025.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: maps09 (1x)
  - Called by: pl020
  - Copybooks: of, envdiv, selpl, seldel, fdpl, fddel, wsfnctn, wsmaps09, wspl, wsdel, screenio, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 78-78)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl030.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selanal, selpl, selpinv, fdanal, fdpl, fdpinv, wsmaps03, wsfnctn, wsanal, wspl, plwsoi5C, wsfdpinv, plwspinv, screenio, Test-Data-Flags, wscall, wssystem, wsnames, FileStat-Msgs, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 71-71)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl040.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpl, selpinv, selpdnos, fdpl, fdpinv, fdpdnos, wsmaps03, wsfnctn, plwspinv, wspl, wsfdpinv, wspdnos, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 45-45)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl050.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x), SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpl, selpinv, selprint, fdpl, fdpinv, fdprint, print-spool-command, wsmaps03, wsfnctn, wspl, wsfdpinv, wspinv, plwspinv, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 54-54)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl055.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selanal, selval, selpinv, seloi4, fdanal, fdval, fdpinv2, fdoi4, plwsoi, wsfnctn, wsval, wsanal, plwspinv2, Test-Data-Flags, wscall, wssystem, wssys4, wsnames, FileStat-Msgs, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 48-48)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl060.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 2
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (3x), CBL_DELETE_FILE (1x), SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, seloi4, selprint, selpl, seloi5, selbatch, selpost, selpost-irs, fdoi4, fdprint, fdpl, fdoi5, fdbatch, fdpost, fdpost-irs, print-spool-command, wsmaps03, wsfnctn, wspl, plwsoi5B, wsbatch, wspost, wspost-irs, plwsoi, plwssoi, Test-Data-Flags, wscall, wssystem, wssys4, wsnames, FileStat-Msgs, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 64-64)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl070.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 3
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x), SYSTEM (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selanal, selval, selprint, fdanal, fdval, print-spool-command-p, wsfnctn, wsanal, wsval, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 3 business rules (lines 45-375)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl080.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpl, seloi5, fdpl, fdoi5, wsmaps03, wsfnctn, wsoi, wspl, plwsoi5B, plwsoi, screenio, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 41-41)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl085.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpl, seloi5, fdpl, fdoi5, wsmaps03, wsfnctn, wsoi, wspl, plwsoi5C, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 80-80)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl090.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 2
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: of, envdiv, seloi5, plselois, fdoi5, plfdois, wsfnctn, plwsoi5C, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 2 business rules (lines 46-200)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl095.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 3
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpl, plselois, selprint, fdpl, plfdois, fdprint, print-spool-command, wsmaps03, wsfnctn, wsoi, wspl, plwsoi5C, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 3 business rules (lines 80-319)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl100.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selprint, selpl, seloi5, selpost, selpost-irs, selval, selbatch, fdprint, fdpl, fdoi5, fdpost, fdpost-irs, fdval, fdbatch, print-spool-command, wsmaps03, wsfnctn, Test-Data-Flags, wsoi, plwsoi5C, wspl, wsbatch, wsval, wspost, wspost-irs, wscall, wssystem, wssys4, wsnames, FileStat-Msgs, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 89-89)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl115.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 2
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, seloi5, plselois, fdoi5, plfdois, wsfnctn, plwsoi5C, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 2 business rules (lines 77-187)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl120.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 3
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x), SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpl, plselois, selprint, fdpl, plfdois, print-spool-command, wsmaps03, wsfnctn, wsoi, plwsoi5C, wspl, Test-Data-Flags, screenio, wscall, wssystem, wssys4, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 3 business rules (lines 38-743)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl130.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selprint, selval, fdprint, fdval, print-spool-command, wsfnctn, wsmaps03, wsval, Test-Data-Flags, wscall, wssystem, wsnames, FileStat-Msgs, Proc-ACAS-Param-Get-Rewrite, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 49-49)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl140.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 2
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpl, selpinv, selprint, fdpl, fdpinv, print-spool-command, wsmaps03, wsfnctn, wspl, plwspinv2, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 2 business rules (lines 48-83)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl160.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 3
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpl, selprint, fdpl, fdprint, print-spool-command, wsfnctn, wsmaps03, wspl, Test-Data-Flags, screenio, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 3 business rules (lines 76-455)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl165.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpl, fdpl, wsfnctn, wspl, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 69-69)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl170.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpl, selprint, fdpl, fdprint, print-spool-command, wsmaps03, wsfnctn, wspl, Test-Data-Flags, screenio, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 75-75)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl180.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: of, envdiv, wsfnctn, Test-Data-Flags, wscall, wssystem, wsnames
- **Business Functions** (extracted):
  - 1 business rules (lines 68-68)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl190.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpl, selprint, fdpl, print-spool-command, wsmaps03, wsfnctn, wspl, Test-Data-Flags, screenio, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 39-39)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl800.cbl
- **Program Type**: BATCH 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: of, envdiv, wsmaps03, wsfnctn, Test-Data-Flags, wscall, wssystem, wsnames
- **Business Functions** (extracted):
  - 1 business rules (lines 42-42)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl900.cbl
- **Program Type**: BATCH 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, wsmaps03, Test-Data-Flags, wscall, wssystem, wsnames
- **Business Functions** (extracted):
  - 1 business rules (lines 71-71)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl910.cbl
- **Program Type**: BATCH 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpl, seloi5, selpay, selprint, fdpl, fdoi5, fdpay, fdprint, print-spool-command, wsmaps03, wsfnctn, plwsoi, wspl, plwsoi5B, plwspay, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 90-90)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl920.cbl
- **Program Type**: BATCH 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpl, selpay, fdpl, fdpay, wsfnctn, plwsoi, wspl, plwspay, Test-Data-Flags, wsmaps03, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 70-70)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl930.cbl
- **Program Type**: BATCH 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpl, selpay, selprint, fdpl, fdpay, fdprint, print-spool-command, wsfnctn, wsoi, plwsoi, wspl, plwspay, Test-Data-Flags, wsmaps03, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 74-74)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl940.cbl
- **Program Type**: BATCH 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpl, selpay, fdpl, fdpay, wsfnctn, wsoi, plwsoi, wspl, plwspay, Test-Data-Flags, wsmaps03, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 18-18)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl950.cbl
- **Program Type**: BATCH 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpl, selpay, seloi5, selpost, selpost-irs, selval, selbatch, selprint, fdpl, fdpay, fdoi5, fdpost, fdpost-irs, fdval, fdbatch, fdprint, print-spool-command-p, wsmaps03, wsfnctn, plwsoi, wspl, plwsoi5B, plwspay, wsbatch, wspost, wspost-irs, wsval, Test-Data-Flags, wscall, wssystem, wsnames, FileStat-Msgs, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 105-105)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### pl960.cbl
- **Program Type**: BATCH 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selprint, fdprint, print-spool-command, wsfnctn, Test-Data-Flags, wscall, wssystem, wsnames
- **Business Functions** (extracted):
  - 1 business rules (lines 71-71)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### plautogenLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acas030 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, plwspinv2, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 96-96)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### plautogenMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 8 (actual)
  - Cognitive Complexity: 8
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (12x), MySQL_fetch_record (3x), MySQL_free_result (2x), MySQL_query (3x), fhlogger (1x)
  - Called by: acas030
  - Copybooks: of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, plwspinv, mysql-procedures
- **Business Functions** (extracted):
  - 7 business rules (lines 47-2528)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### plautogenRES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, plSELautogen, plFDautogen, plwspinv, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### plautogenUNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, plSELautogen, plFDautogen, plwspinv, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### plinvoiceLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acas026 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, plwspinv2, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 103-103)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### plinvoiceMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 8 (actual)
  - Cognitive Complexity: 8
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (12x), MySQL_fetch_record (3x), MySQL_free_result (2x), MySQL_query (3x), fhlogger (1x)
  - Called by: acas026
  - Copybooks: of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, plwspinv, mysql-procedures
- **Business Functions** (extracted):
  - 7 business rules (lines 46-2470)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### postingRES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpost, fdpost, wspost, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### postingUNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpost, fdpost, wspost, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### purchLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acas022 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, wspl, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 111-111)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### purchMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 5 (actual)
  - Cognitive Complexity: 6
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (6x), MySQL_fetch_record (3x), MySQL_free_result (1x), fhlogger (1x)
  - Called by: acas022
  - Copybooks: of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, Book, book, mysql-procedures
- **Business Functions** (extracted):
  - 4 business rules (lines 33-1013)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### purchase.cbl
- **Program Type**: MAIN (identified from STOP RUN)
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x), SYSTEM (1x), maps04 (2x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, sys-params-versioning, wsmaps03, wscall, wstime, wsfnctn, wssystem, wssys4, wsdflt, wsfinal, wsnames, Test-Data-Flags, Proc-Get-Env-Set-Files, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 2 business rules (lines 71-458)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

## S

### StockLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 7 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: N/A 
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acas011 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, wsstock, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 31-31)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### SystemLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 7 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: N/A 
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acas000 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, wssystem, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 30-30)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### SystemRES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: N/A 
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, wssystem, Test-Data-Flags, wsdflt, wsfinal, wssys4, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 27-27)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### SystemUNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: N/A 
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, wssystem, Test-Data-Flags, wsdflt, wsfinal, wssys4, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 27-27)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sales.cbl
- **Program Type**: MAIN (identified from STOP RUN)
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x), SYSTEM (1x), maps04 (2x)
  - Called by: None (entry point)
  - Copybooks: proc, of, envdiv, sys-params-versioning, wsmaps03, wscall, wstime, wsfnctn, wssystem, wssys4, wsdflt, wsfinal, wsnames, Test-Data-Flags, Proc-Get-Env-Set-Files, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 2 business rules (lines 67-464)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### salesLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acas012 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, wssl, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 110-110)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### salesMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 5 (actual)
  - Cognitive Complexity: 6
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (6x), MySQL_fetch_record (3x), MySQL_free_result (1x), fhlogger (1x)
  - Called by: acas012
  - Copybooks: of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, wssl, mysql-procedures
- **Business Functions** (extracted):
  - 4 business rules (lines 33-998)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### salesRES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsl, fdsl, wssl, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### salesUNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsl, fdsl, wssl, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sendsomemail.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: N/A 
- **Dependencies**:
  - Calls: SYSTEM (1x), system (1x)
  - Called by: None (entry point)
  - Copybooks: None
- **Business Functions** (extracted):
  - 1 business rules (lines 54-54)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sendsomemail.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: N/A
  - Halstead Volume: N/A
  - Maintainability Index: N/A 
- **Dependencies**:
  - Calls: SYSTEM (1x), system (1x)
  - Called by: None (entry point)
  - Copybooks: None
- **Business Functions** (extracted):
  - 1 business rules (lines 54-54)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl000.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: maps01 (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, wsmaps01, wsmaps03, wsfnctn, wsnames, wscall, wssystem
- **Business Functions** (extracted):
  - 1 business rules (lines 75-75)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl010.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 3
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), maps04 (1x), maps09 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selboitm, selprint, fdboitm, fdprint, print-spool-command, wsmaps03, wsfnctn, wsmaps09, wssl, wsdel, Test-Data-Flags, screenio, wscall, wssystem, wsnames, FileStat-Msgs, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 74-74)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl020.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x), SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsl, selinv, seloi3, selprint, fdinv2, fdsl, fdoi3, print-spool-command-p, wsmaps03, wsfnctn, slwsoi3, wssl, slwsinv2, screenio, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 102-102)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl050.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 2
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x), SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selprint, fdprint, print-spool-command, wsmaps03, wsfnctn, slwsinv2, wssl, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 2 business rules (lines 47-75)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl055.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x)
  - Called by: None (entry point)
  - Copybooks: Into, of, envdiv, seloi2, selinv, selval, selanal, fdoi2, slwsoi, fdinv2, fdval, fdanal, wsfnctn, wsval, wsanal, slwsinv2, Test-Data-Flags, wsnames, wscall, wssystem, wssys4, FileStat-Msgs, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 85-85)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl060.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 2
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (3x), CBL_DELETE_FILE (1x), SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, seloi2, selprint, seloi3, selsl, selval, selbatch, selpost, selpost-irs, fdoi2, fdprint, fdoi3, fdsl, fdval, fdbatch, fdpost, fdpost-irs, print-spool-command, wsmaps03, wsfnctn, Test-Data-Flags, wsval, wssl, wsbatch, wspost, wspost-irs, slwsoi3, slwssoi, wsoi, wsnames, wscall, wssystem, wssys4, FileStat-Msgs, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 88-88)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl070.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 3
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x), SYSTEM (1x)
  - Called by: stock
  - Copybooks: of, envdiv, selanal, selval, selprint, fdanal, fdval, print-spool-command-p, wsfnctn, wsanal, wsval, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 3 business rules (lines 46-370)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl080.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsl, seloi3, fdsl, fdoi3, wsmaps03, wsfnctn, wsoi, wssl, slwsoi3, screenio, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 55-55)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl085.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsl, seloi3, fdsl, fdoi3, wsmaps03, wsfnctn, wsoi, wssl, slwsoi3, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 60-60)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl090.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 2
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: of, envdiv, seloi3, slselois, fdoi3, slfdois, wsfnctn, slwsoi3, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 2 business rules (lines 48-197)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl095.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 3
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsl, slselois, selprint, fdsl, slfdois, fdprint, print-spool-command, wsmaps03, wsfnctn, wsoi, wssl, slwsoi3, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 3 business rules (lines 84-324)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl100.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selprint, seloi3, selsl, selpost, selpost-irs, selval, selbatch, fdprint, fdsl, fdoi3, fdpost, fdpost-irs, fdval, fdbatch, print-spool-command, wsmaps03, wsfnctn, Test-Data-Flags, slwsoi3, wsoi, wssl, wsbatch, wsval, wspost, wspost-irs, wscall, wssystem, wssys4, wsnames, FileStat-Msgs, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 49-49)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl110.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 5 (actual)
  - Cognitive Complexity: 4
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x), SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsl, slselois, selprint, fdsl, slfdois, fdprint, print-spool-command-p-dispatch, wsmaps03, wsfnctn, wsoi, slwsoi3, wssl, Test-Data-Flags, OF, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 4 business rules (lines 95-879)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl115.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 2
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, seloi3, slselois, fdoi3, slfdois, wsfnctn, slwsoi3, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 2 business rules (lines 22-192)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl120.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 2
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x), SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsl, slselois, selprint, fdsl, slfdois, fdprint, print-spool-command, wsmaps03, wsfnctn, wsoi, slwsoi3, wssl, Test-Data-Flags, screenio, wscall, wssystem, wssys4, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 2 business rules (lines 50-732)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl130.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selprint, selval, fdval, print-spool-command, wsfnctn, wsmaps03, wsval, Test-Data-Flags, wscall, wssystem, wsnames, FileStat-Msgs, Proc-ACAS-Param-Get-Rewrite, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 49-49)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl140.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 2
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsl, selinv, selprint, fdsl, fdinv, print-spool-command, wsmaps03, wsfnctn, wssl, slwsinv2, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 2 business rules (lines 56-89)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl160.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 3
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsl, seldel, selprint, fdprint, fdsl, fddel, print-spool-command, wsmaps03, wsfnctn, wsmaps09, wssl, wsdel, Test-Data-Flags, screenio, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 3 business rules (lines 21-502)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl165.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsl, fdsl, wsfnctn, wssl, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 71-71)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl170.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 2
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsl, selprint, fdsl, print-spool-command, wsmaps03, wsfnctn, wssl, Test-Data-Flags, screenio, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 42-42)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl180.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsl, selprint, fdsl, print-spool-command, wsmaps03, wsfnctn, wssl, Test-Data-Flags, screenio, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 73-73)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl190.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 6 (actual)
  - Cognitive Complexity: 5
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsl, seloi3, slselois, fdsl, fdoi3, slfdois, wsmaps03, wsfnctn, wsoi, slwsoi3, wssl, Test-Data-Flags, screenio, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 5 business rules (lines 15-555)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl200.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selprint, seldnos, fdprint, fddnos, print-spool-command-p, wsmaps03, wsfnctn, wsdnos, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 5-5)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl800.cbl
- **Program Type**: BATCH 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: of, envdiv, wsmaps03, wsfnctn, Test-Data-Flags, wscall, wssystem, wsnames
- **Business Functions** (extracted):
  - 1 business rules (lines 62-62)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl810.cbl
- **Program Type**: BATCH 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 9 (actual)
  - Cognitive Complexity: 9
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (6x), maps04 (2x), scr_dump (2x), sl960 (2x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, slwsinv, slwsinv2, wsanal, wsdel, wssl, wsstock, wsmaps03, wsfnctn, screenio, Test-Data-Flags, wscall, wssystem, wsnames, FileStat-Msgs, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 16 business rules (lines 84-942)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl810.cbl
- **Program Type**: BATCH 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 9 (actual)
  - Cognitive Complexity: 9
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (6x), maps04 (2x), scr_dump (2x), sl960 (2x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, slwsinv, slwsinv2, wsanal, wsdel, wssl, wsstock, wsmaps03, wsfnctn, screenio, Test-Data-Flags, wscall, wssystem, wsnames, FileStat-Msgs, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 16 business rules (lines 84-942)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl820.cbl
- **Program Type**: BATCH 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (2x), SYSTEM (2x), maps04 (2x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selprint, fdprint, print-spool-command, wsmaps03, wsfnctn, slwsinv2, wssl, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 2 business rules (lines 77-83)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl820.cbl
- **Program Type**: BATCH 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (2x), SYSTEM (2x), maps04 (2x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selprint, fdprint, print-spool-command, wsmaps03, wsfnctn, slwsinv2, wssl, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 2 business rules (lines 77-83)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl830.cbl
- **Program Type**: BATCH 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 5
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (2x), maps04 (2x)
  - Called by: None (entry point)
  - Copybooks: of, wsmaps03, wsfnctn, wsanal, wsaudit, wsstock, wsdnos, slwsinv, slwsinv2, wsval, Test-Data-Flags, wsnames, wscall, wssystem, FileStat-Msgs, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 6 business rules (lines 30-525)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl830.cbl
- **Program Type**: BATCH 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 5
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (2x), maps04 (2x)
  - Called by: None (entry point)
  - Copybooks: of, wsmaps03, wsfnctn, wsanal, wsaudit, wsstock, wsdnos, slwsinv, slwsinv2, wsval, Test-Data-Flags, wsnames, wscall, wssystem, FileStat-Msgs, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 6 business rules (lines 30-525)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl900.cbl
- **Program Type**: BATCH 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: of, envdiv, wsmaps03, wsfnctn, Test-Data-Flags, wscall, wssystem, wsnames
- **Business Functions** (extracted):
  - 1 business rules (lines 47-47)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl910.cbl
- **Program Type**: BATCH 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 20 (actual)
  - Cognitive Complexity: 22
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (3x), maps04 (1x), scr_dump (1x), sl930 (1x), sl960 (1x)
  - Called by: None (entry point)
  - Copybooks: block, of, envdiv, selboitm, fdboitm, books, wsmaps03, wsfnctn, slwsinv, slwsinv2, slwsoi3, wsanal, wsaudit, wsdel, wsdnos, wssl, wsstock, wsboitm, screenio, Test-Data-Flags, wscall, wssystem, wsnames, FileStat-Msgs, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 19 business rules (lines 3-2981)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl920.cbl
- **Program Type**: BATCH 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 10 (actual)
  - Cognitive Complexity: 9
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (2x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, wsmaps03, wsfnctn, slwsinv, slwsinv2, slwsoi3, wsanal, wsaudit, wsdel, wssl, wsstock, screenio, Test-Data-Flags, wscall, wssystem, wsnames, FileStat-Msgs, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 9 business rules (lines 7-2348)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl930.cbl
- **Program Type**: BATCH 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 9 (actual)
  - Cognitive Complexity: 10
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: C$JUSTIFY (8x), C$SLEEP (1x), SYSTEM (2x), maps04 (1x)
  - Called by: sl910
  - Copybooks: print-spool-command-p, of, envdiv, selinv, selsl, seldel, selprint-2, fdinv, fdsl, fddel, out, print-spool-command-invoice, print-spool-command-p-dispatch, print-spool-command-p-dispatch-2, print-spool-command-p-dispatch-3, to, wsmaps03, wsfnctn, wsinv, slwsinv, slwsinv2, wssl, wsdel, Test-Data-Flags, wscall, wssystem, wsnames, email, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 8 business rules (lines 5-981)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl940.cbl
- **Program Type**: BATCH 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 3
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selinv, selsl, seldel, seldnos, fdinv, fdsl, fddel, fddnos, wsmaps03, wsfnctn, slwsinv, slwsinv2, wssl, wsdel, wsdnos, wsaudit, wsstock, wsanal, Test-Data-Flags, wscall, wssystem, wsnames, FileStat-Msgs, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 2 business rules (lines 106-377)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl950.cbl
- **Program Type**: BATCH 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 6 (actual)
  - Cognitive Complexity: 5
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: C$JUSTIFY (8x), SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selinv, selstock, selsl, seldel, selprint-2, fdinv, fdstock, fdsl, fddel, print-spool-command-invoice, print-spool-command-p-dispatch, print-spool-command-p-dispatch-2, print-spool-command-p-dispatch-3, wsmaps03, wsfnctn, wsinv, slwsinv, slwsinv2, wssl, wsdel, wsstock, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 5 business rules (lines 19-836)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl960.cbl
- **Program Type**: BATCH 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: maps09 (1x)
  - Called by: sl810, sl910
  - Copybooks: of, envdiv, selsl, seldel, fdsl, fddel, wsfnctn, wsmaps09, wssl, wsdel, screenio, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 7-7)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sl970.cbl
- **Program Type**: BATCH 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 3 (actual)
  - Cognitive Complexity: 4
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x), SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selboitm, selprint, fdboitm, fdprint, print-spool-command, wsmaps03, wsfnctn, wssl, wsstock, wsboitm, an-accept, Test-Data-Flags, screenio, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 2 business rules (lines 85-804)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### slautogenLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acas004 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, slwsinv2, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 96-96)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### slautogenMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 8 (actual)
  - Cognitive Complexity: 8
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (12x), MySQL_fetch_record (3x), MySQL_free_result (2x), MySQL_query (3x), fhlogger (1x)
  - Called by: acas004
  - Copybooks: of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, slwsinv, mysql-procedures
- **Business Functions** (extracted):
  - 7 business rules (lines 47-2541)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### slautogenRES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, slSELautogen, slFDautogen, slwsinv, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### slautogenUNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, slSELautogen, slFDautogen, slwsinv, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sldelinvnosLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acas017 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, wsdnos, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 59-59)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sldelinvnosMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 5 (actual)
  - Cognitive Complexity: 6
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (6x), MySQL_fetch_record (2x), MySQL_free_result (1x), MySQL_query (1x), fhlogger (1x)
  - Called by: acas017
  - Copybooks: *>, ACAS-SQLstate-error-list, of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, wsdnos, mysql-procedures
- **Business Functions** (extracted):
  - 4 business rules (lines 35-777)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sldelinvnosRES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, seldnos, fddnos, wsdnos, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sldelinvnosUNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, seldnos, fddnos, wsdnos, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### slinvoiceLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acas016 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, slwsinv2, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 102-102)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### slinvoiceMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 8 (actual)
  - Cognitive Complexity: 8
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (12x), MySQL_fetch_record (3x), MySQL_free_result (2x), MySQL_query (3x), fhlogger (1x)
  - Called by: acas016
  - Copybooks: of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, slwsinv, mysql-procedures
- **Business Functions** (extracted):
  - 7 business rules (lines 46-2503)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### slpostingLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acas008 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, wspost-irs, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 94-94)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### slpostingMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 5 (actual)
  - Cognitive Complexity: 6
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (6x), MySQL_fetch_record (2x), MySQL_free_result (1x), MySQL_query (1x), fhlogger (1x)
  - Called by: acas008
  - Copybooks: *>, ACAS-SQLstate-error-list, of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, wspost-irs, mysql-procedures
- **Business Functions** (extracted):
  - 4 business rules (lines 33-754)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### slpostingRES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpost-irs, fdpost-irs, wspost-irs, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### slpostingUNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selpost-irs, fdpost-irs, wspost-irs, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### st000.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: maps01 (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, wsmaps01, wsmaps03, wsfnctn, wscall, wssystem, wsnames
- **Business Functions** (extracted):
  - 1 business rules (lines 71-71)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### st010.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 12 (actual)
  - Cognitive Complexity: 12
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (2x), MySQL_commit (1x), MySQL_rollback (1x), SYSTEM (1x), maps04 (1x), maps09 (1x), scr_dump (2x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selstock, selpl, selanal, selprint, fdstock, fdpl, fdanal, fdprint, to, print-spool-command, screenio, wsstock, wspl, wsanal, wsfnctn, wsmaps03, wsmaps09, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 11 business rules (lines 79-1728)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### st020.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 10 (actual)
  - Cognitive Complexity: 9
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (3x), SYSTEM (4x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selstock, selaud, selboitm, selprint, fdstock, fdaudit, fdboitm, fdprint, print-spool-command, screenio, wsfnctn, wsstock, wsaudit, wsmaps03, wsmaps09, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-Param-Get-Rewrite, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 9 business rules (lines 77-1978)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### st030.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 3
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x), SYSTEM (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selstock, selprint, fdstock, fdprint, print-spool-command, screenio, wsstock, wsfnctn, wsmaps03, wsmaps09, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 52-52)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### st040.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 6 (actual)
  - Cognitive Complexity: 5
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selstock, fdstock, wsstock, wsfnctn, Test-Data-Flags, wscall, wssystem, wsnames, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 5 business rules (lines 8-286)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### st050.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selstock, fdstock, wsfnctn, wsstock, Test-Data-Flags, wscall, wssystem, wsnames, FileStat-Msgs, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 1 business rules (lines 8-8)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### st060.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 5 (actual)
  - Cognitive Complexity: 5
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (1x), acas011 (1x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, wsstock, wsfnctn, wsmaps03, Test-Data-Flags, wscall, wssystem, wsnames, FileStat-Msgs, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 4 business rules (lines 44-788)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### stock.cbl
- **Program Type**: MAIN (identified from STOP RUN)
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (2x), SYSTEM (1x), maps04 (2x), sl070 (1x)
  - Called by: None (entry point)
  - Copybooks: proc, of, envdiv, selsys, fdsys, sys-params-versioning, wsmaps01, wsmaps03, wscall, wstime, wsfnctn, wsnames, wssystem, Test-Data-Flags, Proc-Get-Env-Set-Files, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 2 business rules (lines 64-439)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### stockMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 4 (actual)
  - Cognitive Complexity: 5
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (5x), MySQL_fetch_record (2x), MySQL_free_result (1x), fhlogger (1x)
  - Called by: acas011
  - Copybooks: *>, ACAS-SQLstate-error-list, of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, Book, mysql-procedures
- **Business Functions** (extracted):
  - 3 business rules (lines 33-637)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### stockRES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selstock, fdstock, wsstock, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### stockUNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selstock, fdstock, wsstock, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### stockconvert2.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: of, fdstock
- **Business Functions** (extracted):
  - 1 business rules (lines 11-11)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### stockconvert3.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: of, fdstock
- **Business Functions** (extracted):
  - 1 business rules (lines 11-11)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sys002.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 6 (actual)
  - Cognitive Complexity: 6
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: SYSTEM (1x), maps01 (2x), maps04 (3x), maps99 (1x)
  - Called by: None (entry point)
  - Copybooks: *>, of, envdiv, selprint, fdprint, sys-params-versioning, print-spool-command, wstime, wsmaps01, wsmaps03, wsfnctn, wssystem, wsfinal, wssys4, wsdflt, screenio, Test-Data-Flags, wscall, wsnames, (Y/N), Proc-Get-Env-Set-Files, Proc-ACAS-Mapser-RDB
- **Business Functions** (extracted):
  - 5 business rules (lines 86-3084)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sys4LD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acas000 (1x), fhlogger (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, wssystem, wssys4, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 59-59)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### sys4MT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 5 (actual)
  - Cognitive Complexity: 6
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (3x), MySQL_fetch_record (1x), MySQL_free_result (1x), fhlogger (1x)
  - Called by: None (entry point)
  - Copybooks: *>, ACAS-SQLstate-error-list, of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, wssys4, mysql-procedures
- **Business Functions** (extracted):
  - 4 business rules (lines 33-487)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### systemMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 5 (actual)
  - Cognitive Complexity: 6
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (3x), MySQL_fetch_record (1x), MySQL_free_result (1x), fhlogger (1x)
  - Called by: acas000
  - Copybooks: *>, ACAS-SQLstate-error-list, of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, wssystem, mysql-procedures
- **Business Functions** (extracted):
  - 4 business rules (lines 33-654)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

## T

### takeon-1.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: acas012 (1x), maps04 (1x), maps09 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, wscall, wssl, wsmaps03, wsmaps09, wsfnctn, wsnames, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 41-41)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### takeon-2.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: acas022 (1x), maps04 (1x), maps09 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, wscall, wspl, wsmaps03, wsmaps09, wsfnctn, wsnames, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 43-43)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

## V

### valueLD.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x), MySQL_commit (1x), MySQL_rollback (1x), acas-get-params (1x), acas013 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, fdsys, Test-Data-Flags, wsval, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 108-108)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### valueMT.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 5 (actual)
  - Cognitive Complexity: 6
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: MySQL_errno (6x), MySQL_fetch_record (2x), MySQL_free_result (1x), MySQL_query (1x), fhlogger (1x)
  - Called by: acas013
  - Copybooks: *>, ACAS-SQLstate-error-list, of, envdiv, mysql-variables, wsfnctn, Test-Data-Flags, mysql-procedures
- **Business Functions** (extracted):
  - 4 business rules (lines 38-816)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### valueRES.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selval, fdval, wsval, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### valueUNL.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: ACAS-Sysout (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selval, fdval, wsval, Test-Data-Flags, wsfnctn, wsnames, wscall, Proc-Get-Env-Set-Files
- **Business Functions** (extracted):
  - 1 business rules (lines 26-26)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

## X

### xl150.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 11 (actual)
  - Cognitive Complexity: 11
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: CBL_CHECK_FILE_EXIST (2x), maps04 (1x)
  - Called by: None (entry point)
  - Copybooks: of, envdiv, slselois, slfdois, fdsl, fdpl, wsmaps03, wsfnctn, wsval, wssl, slwsoi3, slwssoi, slwsinv2, slwsinv, wspl, plwsoi5B, plwssoi, plwspinv2, plwspinv, Test-Data-Flags, wscall, wssystem, wssys4, wsnames, FileStat-Msgs, to, Proc-Get-Env-Set-Files, Proc-ACAS-FH-Calls
- **Business Functions** (extracted):
  - 10 business rules (lines 69-2167)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

### xl160.cbl
- **Program Type**: SUBROUTINE 
- **Parse Confidence**: 100%
- **Metrics**:
  - McCabe Complexity: 2 (actual)
  - Cognitive Complexity: 1
  - Halstead Volume: N/A
  - Maintainability Index: 100 (Excellent)
- **Dependencies**:
  - Calls: None
  - Called by: None (entry point)
  - Copybooks: of, envdiv, selsys, selsys2, selanal, selpost-irs, seldel, selval, selbatch, seledger, selpost, selstock, selsl, seldnos, slselinv, selinv, seloi2, slseloi3, plselpinv, selpl, selpay, selpdnos, seloi4, plseloi5, fdsys, fdanal, fdval, fdpost-irs, fddel, fdbatch, fdledger, fdpost, irsfdwsnl, fdaudit, fdstock, fdsl, fddnos, slfdinv, slfdoi3, plfdpinv, fdpay, fdpl, plfdois, plfdoi5, fdoi2, fdoi4
- **Business Functions** (extracted):
  - 1 business rules (lines 63-63)
- **Technical Debt**:
    - No significant technical debt identified
- **Data Access**:
  - Files: None
  - SQL: None

