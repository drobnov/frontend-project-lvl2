import _ from 'lodash';

export const plainStructure = (diff) => {
  const iter = (diffObject, path) => {
    const result = diffObject.map(({
      key, value, type, sort,
    }) => {
      if (!Array.isArray(value) && type === null) {
        return null;
      } if (sort === 'no' && type !== null) {
        return {
          key, value, type, path: [...path, key].join('.'),
        };
      } if (type !== null && sort !== 'no') {
        const diffAddDel = diffObject.filter((a) => a.key === key);
        const added = _.find(diffAddDel, { type: 'add' });
        const removed = _.find(diffAddDel, { type: 'delete' });
        return {
          key, value: { delete: removed.value, add: added.value }, type: 'updated', path: [...path, key].join('.'),
        };
      }
      return iter(value, [...path, key]);
    });
    return _.compact(result.flat());
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
  const result = structure.map(({
    value, type, path,
  }) => {
    if (type === 'delete') {
      return `Property '${path}' was removed`;
    } if (type === 'add') {
      return `Property '${path}' was added with value: ${constructionValue(value)}`;
    } if (type === 'updated') {
      return `Property '${path}' was updated. From ${constructionValue(value.delete)} to ${constructionValue(value.add)}`;
    }
    return null;
  });
  return `${result.join('\n')}`;
};

const plain = (diff) => {
  const buildStructure = plainStructure(diff);
  const str = buildString(buildStructure);
  return str;
};

export default plain;
