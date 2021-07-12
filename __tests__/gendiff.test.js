import * as fs from 'fs';
import { dirname } from 'path';
import * as path from 'path';

import { fileURLToPath } from 'url';
import gendiff from '../lib/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const correctResult = readFile('gendiff.test.output');
const correctResultNoFormatter = readFile('noformatter');
const correctResultPlain = readFile('plain');

let file1;
let file2;

test('compare JSON', () => {
  file1 = getFixturePath('file1.json');
  file2 = getFixturePath('file2.json');
  expect(gendiff(file1, file2)).toMatch(correctResult);
});

test('compare YAML', () => {
  file1 = getFixturePath('file1.yml');
  file2 = getFixturePath('file2.yml');

  expect(gendiff(file1, file2)).toMatch(correctResult);
});

test('Test without formatter (YML)', () => {
  file1 = getFixturePath('file1.yml');
  file2 = getFixturePath('file2.yml');

  expect(gendiff(file1, file2, 'none')).toMatch(correctResultNoFormatter);
});

test('Test without formatter (JSON)', () => {
  file1 = getFixturePath('file1.json');
  file2 = getFixturePath('file2.json');

  expect(gendiff(file1, file2, 'none')).toMatch(correctResultNoFormatter);
});

test('compare JSON PLAIN', () => {
  file1 = getFixturePath('file1.json');
  file2 = getFixturePath('file2.json');
  expect(gendiff(file1, file2, 'plain')).toMatch(correctResultPlain);
});

test('compare YAML PLAIN', () => {
  file1 = getFixturePath('file1.yml');
  file2 = getFixturePath('file2.yml');

  expect(gendiff(file1, file2, 'plain')).toMatch(correctResultPlain);
});
