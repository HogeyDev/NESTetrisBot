.PHONY: clean

all: compile run

compile:
	tsc

live:
	tsc -w

electron:
	electron build/index.js

run:
	node build/index.js

clean:
	rm build/*.js