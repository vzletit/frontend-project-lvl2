install:
	npm ci

brain-games:
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
	npm test -- --coverage --coverageProvider=v8

