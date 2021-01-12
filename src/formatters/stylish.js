const separ = (type, sort) => {
  if (type === 'add' && sort !== 'no analyze') {
    return '+';
  } if (type === 'delete' && sort !== 'no analyze') {
    return '-';
  }
  return ' ';
};

const stylish = (diffs) => {
  const formater = (diff, index = 0) => {
    let str = [];
    diff.forEach(({
      key, value, type, deph, sort,
    }) => {
      if (!Array.isArray(value)) {
        str = [...str, `${' '.repeat(deph + 5 + (index - 3))}${separ(type, sort)} ${key}: ${value}`];
      } else {
        str = [...str, `${' '.repeat(deph + 2 + index)}${separ(type, sort)} ${key}: {\n${formater(value, index + 3)}\n${' '.repeat(deph + 4 + index)}}`];
      }
    });
    return str.join('\n');
  };
  return `{\n${formater(diffs)}\n}\n`;
};

export default stylish;
