#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../lib/gendiff.js';

const program = new Command();

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => console.log(genDiff(filepath1, filepath2, program.opts()
  .format)))
  .parse(process.argv);
