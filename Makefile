run: spring.xex spring16.xex
	cygstart $<

spring.xex: ifs.asx
	xasm -q -d start=\$$6000 -o $@ $<

spring16.xex: ifs.asx
	xasm -q -d start=\$$400 -o $@ $<

clean:
	rm spring.xex

.PHONY: run clean

.DELETE_ON_ERROR:
