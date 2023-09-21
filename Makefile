SRCFILES = $(shell find src | grep .ts)

.PHONY: clean

all: compile run

compile: $(SRCFILES)
	tsc

live:
	tsc -w &
	nodemon build/index.js

electron:
	electron build/index.js

run:
	node build/index.js

clean:
	rm build/*.js