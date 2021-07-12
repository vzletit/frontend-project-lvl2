#!/usr/bin/env node
import { Command } from 'commander';
import formatAndCompare from '../lib/formatters/index.js';

const program = new Command();

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action(
    (filepath1, filepath2) => console.log(
      formatAndCompare(filepath1, filepath2, program.opts().format),
    ),
  )
  .parse(process.argv);
