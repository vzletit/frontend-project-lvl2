#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../lib/gendiff.js';
import stylish from '../lib/formatters/stylish.js';

const program = new Command();

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => console.log(stylish(genDiff(filepath1, filepath2))))
  .parse(process.argv);
