run: ifs.prg
	cygstart $<

%.prg: %.asx
	xasm /q /p /o:$@ $<
