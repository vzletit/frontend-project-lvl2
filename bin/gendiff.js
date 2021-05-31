#!/usr/bin/env node

const program = require('commander');

program
  .usage('[options] <file>')
  .version('0.0.1')
  .option('-f, --format [type]', 'output format')

  .parse(process.argv);
