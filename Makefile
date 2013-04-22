VERSION = $(shell cat VERSION)

all: build

build: bundle minify

bundle:
	@echo 'Bundling $(VERSION)...'
	@./node_modules/.bin/browserify -e src/artemis.js -o build/artemis-$(VERSION).js -s 'ARTEMIS' && echo 'Bundling successful!'

minify:
	@echo 'Todo'

.PHONY: bundle minify
