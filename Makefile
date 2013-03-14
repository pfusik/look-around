run: lookarou.xex lookar16.xex Look_Around.sap
	cygstart $<

lookarou.xex: ifs.asx msx.asx
	xasm -q -d start=\$$6000 -o $@ $<

lookar16.xex: ifs.asx msx.asx
	xasm -q -d start=\$$400 -o $@ $<

Look_Around.sap: msx.asx
	xasm -q -d SAP=1 -o $@ $<

clean:
	rm lookarou.xex lookar16.xex Look_Around.sap

.PHONY: run clean

.DELETE_ON_ERROR:
