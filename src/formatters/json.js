import { plainStructure } from './plain.js';

const formatJson = (diff) => {
  const structureDiff = plainStructure(diff);
  const result = `${JSON.stringify(structureDiff)}`;
  return result;
};

export default formatJson;
