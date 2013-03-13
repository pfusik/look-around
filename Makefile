run: spring.xex spring16.xex Spring_Comes.sap
	cygstart $<

spring.xex: ifs.asx msx.asx
	xasm -q -d MSX=1 -d start=\$$6000 -o $@ $<

spring16.xex: ifs.asx msx.asx
	xasm -q -d MSX=1 -d start=\$$400 -o $@ $<

Spring_Comes.sap: msx.asx
	xasm -q -d SAP=1 -o $@ $<

clean:
	rm spring.xex spring16.xex Spring_Comes.sap

.PHONY: run clean

.DELETE_ON_ERROR:
