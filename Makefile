SRCFILES = $(shell find src | grep .ts)

.PHONY: clean

all: runTsNode
allJS: compile run
gui: compile electron

compile: $(SRCFILES)
	tsc

live:
	tsc -w &
	nodemon build/index.js

electron:
	electron build/index.js

run:
	node build/index.js

runTsNode:
	npx ts-node ./src/index.ts

clean:
	rm build/*.js