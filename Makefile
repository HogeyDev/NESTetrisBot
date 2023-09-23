SRCFILES = $(shell find src | grep .ts)

.PHONY: clean

# all: compile run
all: runTsNode

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