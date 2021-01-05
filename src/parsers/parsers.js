import { extname } from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const parsers = (filePath) => {
  const extName = extname(filePath);
  const readFile = fs.readFileSync(filePath, 'utf-8');
  if (extName === '.json') {
    return JSON.parse(readFile);
  } if (extName === '.yml') {
    return yaml.load(readFile);
  }
  return null;
};

export default parsers;
