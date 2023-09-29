SRCFILES = $(shell find src | grep .ts)

.PHONY: clean

all: runTsNode
allJS: compile run
gui: compile electron

profile: compile
	node --trace-ic ./node_modules/typescript/lib/tsc.js --generateCpuProfile profile.cpuprofile -p tsconfig.json

compile: $(SRCFILES)
	tsc

live:
	tsc -w &
	NODE_OPTIONS="--inspect" nodemon build/index.js

electron:
	electron build/index.js

run:
	node build/index.js

runTsNode:
	npx ts-node ./src/index.ts

clean:
	rm build/*.js