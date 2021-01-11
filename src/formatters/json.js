import { plainStructure } from './plain.js';

const formatJson = (diff) => {
  const structureDiff = plainStructure(diff);
  const result = `${JSON.stringify(structureDiff)}\n`;
  return result;
};

export default formatJson;
