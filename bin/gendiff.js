#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../lib/gendiff.js';
import readFile from '../lib/readFile.js';

const program = new Command();

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => genDiff(readFile(filepath1), readFile(filepath2)))
  .parse(process.argv);
