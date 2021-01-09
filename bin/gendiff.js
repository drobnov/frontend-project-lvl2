#!/usr/bin/env node

import { Command } from 'commander';
import { fileDiff, stylish } from '../index.js';

const program = new Command();

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const diff = fileDiff(filepath1, filepath2);
    const format = stylish(diff);
    return console.log(format);
  });
program.parse(process.argv);

if (!program.args.length) program.help();
