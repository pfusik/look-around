run: spring.xex
	cygstart $<

spring.xex: ifs.asx
	xasm -q -o $@ $<

clean:
	rm spring.xex

.PHONY: run clean

.DELETE_ON_ERROR:
