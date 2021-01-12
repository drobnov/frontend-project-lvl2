import _ from 'lodash';

export const plainStructure = (diff) => {
  let result = [];

  const iter = (diffObject, path) => {
    diffObject.forEach(({
      key, value, type, sort, deph,
    }) => {
      if (!Array.isArray(value) && type === null) {
        result = [...result];
      } else if ((sort === 'no' || sort === 'no analyze') && type !== null) {
        if (!Array.isArray(value)) {
          result = [...result, {
            key, value, type, path: [...path, key].join('.'), deph,
          }];
        } else {
          result = [...result, {
            key, children: value, type, path: [...path, key].join('.'), deph,
          }];
        }
      } else if (type !== null && (sort !== 'no' || sort !== 'no analyze')) {
        const diffAddDel = diffObject.filter((a) => a.key === key);
        const added = _.find(diffAddDel, { type: 'add' });
        const removed = _.find(diffAddDel, { type: 'delete' });
        result = [...result, {
          key, value: { delete: removed.value, add: added.value }, type: 'updated', path: [...path, key].join('.'), deph,
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

const valueOrChildren = (value, children) => (value !== undefined ? value : children);

const buildString = (structure) => {
  const result = [];
  structure.forEach(({
    value, type, path, children,
  }) => {
    if (type === 'delete') {
      const str = `Property '${path}' was removed`;
      result.push(str);
    } else if (type === 'add') {
      const str = `Property '${path}' was added with value: ${constructionValue(valueOrChildren(value, children))}`;
      result.push(str);
    } else if (type === 'updated') {
      const str = `Property '${path}' was updated. From ${constructionValue(value.delete)} to ${constructionValue(value.add)}`;
      result.push(str);
    }
  });
  return `${result.join('\n')}\n`;
};

const plain = (diff) => {
  const buildStructure = plainStructure(diff);
  const str = buildString(buildStructure);
  return str;
};

export default plain;
