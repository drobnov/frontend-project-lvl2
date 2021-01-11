import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';
import fileDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => resolve(__dirname, '..', '__fixtures__', filename);

test('format_stylish_json', () => {
  const testFilePath = getFixturePath('test_format_stylish.txt');
  const testFile = fs.readFileSync(testFilePath, 'utf-8');
  const file1Path = getFixturePath('file_tree1.json');
  const file2Path = getFixturePath('file_tree2.json');
  expect(fileDiff(file1Path, file2Path, 'stylish')).toEqual(testFile);
});

test('format_stylish_yml', () => {
  const testFilePath = getFixturePath('test_format_stylish.txt');
  const testFile = fs.readFileSync(testFilePath, 'utf-8');
  const file1Path = getFixturePath('file_tree1.yml');
  const file2Path = getFixturePath('file_tree2.yml');
  expect(fileDiff(file1Path, file2Path, 'stylish')).toEqual(testFile);
});

test('format_plain_json', () => {
  const testFilePath = getFixturePath('test_format_plain.txt');
  const testFile = fs.readFileSync(testFilePath, 'utf-8');
  const file1Path = getFixturePath('file_tree1.json');
  const file2Path = getFixturePath('file_tree2.json');
  expect(fileDiff(file1Path, file2Path, 'plain')).toEqual(testFile);
});

test('format_plain_yml', () => {
  const testFilePath = getFixturePath('test_format_plain.txt');
  const testFile = fs.readFileSync(testFilePath, 'utf-8');
  const file1Path = getFixturePath('file_tree1.yml');
  const file2Path = getFixturePath('file_tree2.yml');
  expect(fileDiff(file1Path, file2Path, 'plain')).toEqual(testFile);
});

test('format_json_json', () => {
  const testFilePath = getFixturePath('test_format_json.json');
  const testFile = fs.readFileSync(testFilePath, 'utf-8');
  const file1Path = getFixturePath('file_tree1.json');
  const file2Path = getFixturePath('file_tree2.json');
  expect(fileDiff(file1Path, file2Path, 'json')).toEqual(testFile);
});

test('format_json_yml', () => {
  const testFilePath = getFixturePath('test_format_json.json');
  const testFile = fs.readFileSync(testFilePath, 'utf-8');
  const file1Path = getFixturePath('file_tree1.yml');
  const file2Path = getFixturePath('file_tree2.yml');
  expect(fileDiff(file1Path, file2Path, 'json')).toEqual(testFile);
});
