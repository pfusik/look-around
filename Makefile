run: lookarou.xex lookar16.xex Look_Around.sap
	start $<

lookarou.xex: ifs.asx msx.asx
	xasm -q -d start=\$$6000 -o $@ $<

lookar16.xex: ifs.asx msx.asx
	xasm -q -d start=\$$400 -o $@ $<

Look_Around.sap: msx.asx
	xasm -q -d SAP=1 -o $@ $<

check-msx: msx-dump.txt mpt-dump.txt
	diff -u $^ | less

msx-dump.txt: Look_Around.sap
	asapscan -d $< | head -2000 | cut -c 9- >$@

mpt-dump.txt: pasmo.mpt
	asapscan -d $< | (read; head -2000) | cut -c 9- >$@

clean:
	rm lookarou.xex lookar16.xex Look_Around.sap msx-dump.txt mpt-dump.txt

.PHONY: run check-msx clean

.DELETE_ON_ERROR:
