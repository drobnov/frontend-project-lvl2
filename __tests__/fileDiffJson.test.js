import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';
import fileDiff from '..';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);

test('fileDiff', () => {
  const testFilePath = getFixturePath('testFileJson');
  const testFile = fs.readFileSync(testFilePath, 'utf-8');
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  expect(fileDiff(file1Path, file2Path)).toEqual(testFile);
});
