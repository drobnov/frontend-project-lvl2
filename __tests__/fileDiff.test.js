import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';
import { fileDiff, stylish } from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);

test('file_tree_Diff_json', () => {
  const testFilePath = getFixturePath('testFile_tree.txt');
  const testFile = fs.readFileSync(testFilePath, 'utf-8');
  const file1Path = getFixturePath('file_tree1.json');
  const file2Path = getFixturePath('file_tree2.json');
  const diff = fileDiff(file1Path, file2Path);
  expect(stylish(diff)).toEqual(testFile);
});

test('file_tree_Diff_yml', () => {
  const testFilePath = getFixturePath('testFile_tree.txt');
  const testFile = fs.readFileSync(testFilePath, 'utf-8');
  const file1Path = getFixturePath('file_tree1.yml');
  const file2Path = getFixturePath('file_tree2.yml');
  const diff = fileDiff(file1Path, file2Path);
  expect(stylish(diff)).toEqual(testFile);
});
