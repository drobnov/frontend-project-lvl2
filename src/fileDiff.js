import parsers from './parsers/parsers.js';

const fileDiff = (filePath1, filePath2) => {
  const parseFile1 = parsers(filePath1);
  const parseFile2 = parsers(filePath2);
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
