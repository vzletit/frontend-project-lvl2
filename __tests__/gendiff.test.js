import * as fs from 'fs';
import { dirname } from 'path';
import * as path from 'path';

import { fileURLToPath } from 'url';
import gendiff from '../lib/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const correctResultStylish = readFile('stylish');
const correctResultJSON = readFile('json');
const correctResultPlain = readFile('plain');

test('compare JSON', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(gendiff(file1, file2)).toEqual(correctResultStylish);
});

test('compare YAML', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');

  expect(gendiff(file1, file2)).toEqual(correctResultStylish);
});

test('with JSON formatter (YML)', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');

  expect(gendiff(file1, file2, 'json')).toMatch(correctResultJSON);
});

test('with JSON formatter (JSON)', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  expect(gendiff(file1, file2, 'json')).toMatch(correctResultJSON);
});

test('compare JSON files (PLAIN formatter)', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(gendiff(file1, file2, 'plain')).toMatch(correctResultPlain);
});

test('compare YAML files (PLAIN formatter)', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');

  expect(gendiff(file1, file2, 'plain')).toMatch(correctResultPlain);
});
