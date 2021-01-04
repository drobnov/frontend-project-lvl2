#!/usr/bin/env node

import { Command } from 'commander';
import fileDiff from '../index.js';

const program = new Command();

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const result = fileDiff(filepath1, filepath2);
    return console.log(result);
  })
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'output format');

program.parse(process.argv);

if (!program.args.length) program.help();
