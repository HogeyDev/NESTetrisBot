.PHONY: clean

all: compile run

compile:
	tsc

live:
	tsc -w

run:
	electron build/index.js

clean:
	rm build/*.js