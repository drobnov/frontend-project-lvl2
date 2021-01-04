import fs from 'fs';

const fileDiff = (filePath1, filePath2) => {
  const readFile1 = fs.readFileSync(filePath1, 'utf-8');
  const readFile2 = fs.readFileSync(filePath2, 'utf-8');
  const parseFile1 = JSON.parse(readFile1);
  const parseFile2 = JSON.parse(readFile2);
  const keys1 = Object.keys(parseFile1);
  const keys2 = Object.keys(parseFile2);
  const keysSame = keys1.filter((key) => parseFile2[key] === parseFile1[key])
    .map((key) => [' ', key, parseFile1[key]]);
  const keysDelete = keys1.filter((key) => parseFile2[key] !== parseFile1[key])
    .map((key) => ['-', key, parseFile1[key]]);
  const keysAdd = keys2.filter((key) => parseFile2[key] !== parseFile1[key])
    .map((key) => ['+', key, parseFile2[key]]);
  const sortKeys = [...keysSame, ...keysDelete, ...keysAdd].sort((a, b) => {
    if (a[1] > b[1]) {
      return 1;
    }
    if (a[1] < b[1]) {
      return -1;
    }
    return 0;
  });
  const result = sortKeys.map(([sep, key, value]) => `${sep} ${key}: ${value}`)
    .join('\n  ');
  return `{\n  ${result}\n}`;
};

export default fileDiff;
