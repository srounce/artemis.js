VERSION = $(shell cat VERSION)

all: bundle

bundle:
	@echo 'Bundling $(VERSION)...'
	@./node_modules/.bin/browserify -e src/artemis.js -o build/artemis-$(VERSION).js -s 'ARTEMIS' && echo 'Bundling successful!'
