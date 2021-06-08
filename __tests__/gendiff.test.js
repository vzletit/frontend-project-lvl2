import path from 'path';
import * as fs from 'fs';
import gendiff from '../lib/gendiff';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const file1 = readFile('file1.json');
const file2 = readFile('file2.json');
const correctResult = readFile('gendiff.test.output');

test('compare file1 and file2', () => {
  expect(gendiff(file1, file2)).toMatch(correctResult);
});