import _ from 'lodash';
import parsers from './parsers/parsers.js';

const sortCb = (a, b) => { // call back for sort function
  if (a.key > b.key) {
    return 1;
  }
  if (a.key < b.key) {
    return -1;
  }
  return 0;
};

const addDeph = (data, deph) => { // function for calculating the depth of the element
  if (!_.isPlainObject(data)) {
    return data;
  }
  let a = [];
  const keys = Object.keys(data);
  keys.forEach((key) => {
    a = [...a, {
      key, value: addDeph(data[key], deph + 1), deph: deph + 1, type: null,
    }];
  });
  return a;
};

const fileDiff = (filePath1, filePath2) => {
  const parseFile1 = parsers(filePath1);
  const parseFile2 = parsers(filePath2);

  const genDiffs = (objectFile1, objectFile2, deph = 0) => {
    let result = [];

    const keys1 = Object.keys(objectFile1);
    const keys2 = Object.keys(objectFile2);

    // add keys that are not in the first file
    const keysAdd = [...keys2].filter((key) => !keys1.includes(key));
    keysAdd.forEach((key) => {
      result = [...result, {
        key, value: addDeph(objectFile2[key], deph), type: 'add', deph,
      }];
      result.sort(sortCb);
    });

    keys1.forEach((key) => {
      if (_.isEqual(objectFile1[key], objectFile2[key])) { // add the same data
        result = [...result, {
          key, value: addDeph(objectFile1[key], deph), type: null, deph,
        }];
        result.sort(sortCb);
        // same keys, different data in the keys
      } else if (keys2.includes(key) && (typeof objectFile1[key] !== typeof objectFile2[key]
        || (!_.isPlainObject(objectFile1[key]) || !_.isPlainObject(objectFile2[key])))) {
        result = [...result, {
          key, value: addDeph(objectFile1[key], deph), type: 'delete', deph,
        }];
        result = [...result, {
          key, value: addDeph(objectFile2[key], deph), type: 'add', deph,
        }];
        result.sort(sortCb);
      } else if (!keys2.includes(key)) { // keys are not in the second file
        result = [...result, {
          key, value: addDeph(objectFile1[key], deph), type: 'delete', deph,
        }];
        result.sort(sortCb);
        // identical keys are the data type that are the object
      } else if (keys2.includes(key) && _.isPlainObject(objectFile1[key])) {
        result = [...result, {
          key, value: genDiffs(objectFile1[key], objectFile2[key], deph + 1), type: null, deph,
        }];
        result.sort(sortCb);
      }
    });
    return result;
  };
  return genDiffs(parseFile1, parseFile2);
};

const stylish = (diffs) => {
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
  return `{\n${formater(diffs)}\n}\n`;
};

export { fileDiff, stylish };
