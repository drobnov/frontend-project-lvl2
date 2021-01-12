const separ = (type) => {
  switch (type) {
    case 'add':
      return '+';
    case 'delete':
      return '-';
    default:
      return ' ';
  }
};

const stylish = (diffs) => {
  const formater = (diff, index = 0) => {
    let str = [];
    diff.forEach(({
      key, value, type, deph,
    }) => {
      if (!Array.isArray(value)) {
        str = [...str, `${' '.repeat(deph + 5 + (index - 3))}${separ(type)} ${key}: ${value}`];
      } else {
        str = [...str, `${' '.repeat(deph + 2 + index)}${separ(type)} ${key}: {\n${formater(value, index + 3)}\n${' '.repeat(deph + 4 + index)}}`];
      }
    });
    return str.join('\n');
  };
  return `{\n${formater(diffs)}\n}`;
};

export default stylish;
