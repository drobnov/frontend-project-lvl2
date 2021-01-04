install: install-deps

run:
	bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json

install-deps:
	npm ci

test:
	 npx -n --experimental-vm-modules jest --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test
