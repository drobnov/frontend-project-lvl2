import stylish from './stylish.js';
import plain from './plain.js';
import formatJson from './json.js';

const formatters = (format, diff) => {
  if (format === 'stylish') {
    return stylish(diff);
  } if (format === 'plain') {
    return plain(diff);
  } if (format === 'json') {
    return formatJson(diff);
  }
  return null;
};

export default formatters;
