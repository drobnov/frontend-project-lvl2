import _ from 'lodash';

export const plainStructure = (diff) => {
  let result = [];

  const iter = (diffObject, path) => {
    diffObject.forEach(({
      key, value, type, sort,
    }) => {
      if (!Array.isArray(value) && type === null) {
        result = [...result];
      } else if (sort === 'no' && type !== null) {
        result = [...result, {
          key, value, type, path: [...path, key].join('.'),
        }];
      } else if (type !== null && sort !== 'no') {
        const diffAddDel = diffObject.filter((a) => a.key === key);
        const added = _.find(diffAddDel, { type: 'add' });
        const removed = _.find(diffAddDel, { type: 'delete' });
        result = [...result, {
          key, value: { delete: removed.value, add: added.value }, type: 'updated', path: [...path, key].join('.'),
        }];
      } else {
        iter(value, [...path, key]);
      }
    });
    return result;
  };
  return _.uniqBy(iter(diff, []), 'key');
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
  const result = [];
  structure.forEach(({
    value, type, path,
  }) => {
    if (type === 'delete') {
      const str = `Property '${path}' was removed`;
      result.push(str);
    } else if (type === 'add') {
      const str = `Property '${path}' was added with value: ${constructionValue(value)}`;
      result.push(str);
    } else if (type === 'updated') {
      const str = `Property '${path}' was updated. From ${constructionValue(value.delete)} to ${constructionValue(value.add)}`;
      result.push(str);
    }
  });
  return `${result.join('\n')}`;
};

const plain = (diff) => {
  const buildStructure = plainStructure(diff);
  const str = buildString(buildStructure);
  return str;
};

export default plain;
