import stylish from './stylish.js';
import plain from './plain.js';

const formatters = (format, diff) => {
  if (format === 'stylish') {
    return stylish(diff);
  } if (format === 'plain') {
    return plain(diff);
  }
  return null;
};

export default formatters;
