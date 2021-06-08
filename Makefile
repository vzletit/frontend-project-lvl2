install:
	npm ci

brain-games:
	node bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	node --experimental-vm-modules "node_modules/.bin/jest" --watch
