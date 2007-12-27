run: ifs.xex
	cygstart $<

%.xex: %.asx
	xasm -q -o $@ $<
