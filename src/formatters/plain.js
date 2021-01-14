import _ from 'lodash';

export const plainStructure = (diff) => {
  const result = { elements: [] };

  const iter = (diffObject, path) => {
    diffObject.forEach(({
      key, value, type, sort,
    }) => {
      if (!Array.isArray(value) && type === null) {
        result.elements = [...result.elements];
      } else if (sort === 'no' && type !== null) {
        result.elements = [...result.elements, {
          key, value, type, path: [...path, key].join('.'),
        }];
      } else if (type !== null && sort !== 'no') {
        const diffAddDel = diffObject.filter((a) => a.key === key);
        const added = _.find(diffAddDel, { type: 'add' });
        const removed = _.find(diffAddDel, { type: 'delete' });
        result.elements = [...result.elements, {
          key, value: { delete: removed.value, add: added.value }, type: 'updated', path: [...path, key].join('.'),
        }];
      } else {
        iter(value, [...path, key]);
      }
    });
    return result.elements;
  };
  return _.uniqBy(iter(diff, []), 'path');
};

const constructionValue = (value) => {
  if (Array.isArray(value)) {
    return '[complex value]';
  } if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const buildString = (structure) => {
  const result = { str: [] };
  structure.forEach(({
    value, type, path,
  }) => {
    if (type === 'delete') {
      const str = `Property '${path}' was removed`;
      result.str = [...result.str, str];
    } else if (type === 'add') {
      const str = `Property '${path}' was added with value: ${constructionValue(value)}`;
      result.str = [...result.str, str];
    } else if (type === 'updated') {
      const str = `Property '${path}' was updated. From ${constructionValue(value.delete)} to ${constructionValue(value.add)}`;
      result.str = [...result.str, str];
    }
  });
  return `${result.str.join('\n')}`;
};

const plain = (diff) => {
  const buildStructure = plainStructure(diff);
  const str = buildString(buildStructure);
  return str;
};

export default plain;
