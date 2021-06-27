install:
	npm ci

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

testw:
	node --experimental-vm-modules "node_modules/.bin/jest" --watch

test:
	node --experimental-vm-modules "node_modules/.bin/jest"

test-coverage:
	node --experimental-vm-modules "node_modules/.bin/jest" --coverage --coverageProvider=v8

run:
	gendiff ../__fixtures__/file1.json ../__fixtures__/file2.json