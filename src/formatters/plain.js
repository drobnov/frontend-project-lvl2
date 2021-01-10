import _ from 'lodash';

const plainStructure = (diff) => {
  let result = [];

  const iter = (diffObject, path) => {
    diffObject.forEach(({
      key, value, type, sort,
    }) => {
      if (!Array.isArray(value) && type === null) {
        result = [...result];
      } else if (sort === 'no' && type !== null) {
        result = [...result, {
          key, value, type, path,
        }];
      } else if (type !== null && sort !== 'no') {
        const diffAddDel = diffObject.filter((a) => a.key === key);
        const added = _.find(diffAddDel, { type: 'add' });
        const removed = _.find(diffAddDel, { type: 'delete' });
        result = [...result, {
          key, value: { froms: removed.value, to: added.value }, type: 'updated', path,
        }];
      } else {
        iter(value, [...path, key]);
      }
    });
    return result;
  };
  return _.uniqBy(iter(diff, []), 'key');
};

const constructionPath = (key, path) => {
  if (path.length === 0) {
    return `'${key}'`;
  }
  return `'${path.join('.')}.${key}'`;
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
    key, value, type, path,
  }) => {
    if (type === 'delete') {
      const str = `Property ${constructionPath(key, path)} was removed`;
      result.push(str);
    } else if (type === 'add') {
      const str = `Property ${constructionPath(key, path)} was added with value: ${constructionValue(value)}`;
      result.push(str);
    } else if (type === 'updated') {
      const str = `Property ${constructionPath(key, path)} was updated. From ${constructionValue(value.froms)} to ${constructionValue(value.to)}`;
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
