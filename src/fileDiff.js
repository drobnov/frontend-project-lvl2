import _ from 'lodash';
import parsers from './parsers/parsers.js';
import formatters from './formatters/index.js';

const sortCb = (a, b) => {
  if (a.key > b.key) {
    return 1;
  }
  if (a.key < b.key) {
    return -1;
  }
  return 0;
};

const dephElement = (data, deph) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const result = { elements: [] };
  const keys = Object.keys(data);
  keys.forEach((key) => {
    result.elements = [...result.elements, {
      key, value: dephElement(data[key], deph + 1), deph: deph + 1, type: null,
    }];
  });
  return result.elements;
};

const fileDiff = (filePath1, filePath2) => {
  const parseFile1 = parsers(filePath1);
  const parseFile2 = parsers(filePath2);

  const genDiffs = (objectFile1, objectFile2, deph = 0) => {
    const result = { elements: [] };

    const keys1 = Object.keys(objectFile1);
    const keys2 = Object.keys(objectFile2);

    // add keys that are not in the first file
    const keysAdd = [...keys2].filter((key) => !keys1.includes(key));
    keysAdd.forEach((key) => {
      result.elements = [...result.elements, {
        key, value: dephElement(objectFile2[key], deph), type: 'add', deph, sort: 'no',
      }];
      result.elements.sort(sortCb);
    });

    keys1.forEach((key) => {
      if (_.isEqual(objectFile1[key], objectFile2[key])) { // add the same data
        result.elements = [...result.elements, {
          key, value: dephElement(objectFile1[key], deph), type: null, deph,
        }];
        result.elements.sort(sortCb);
        // same keys, different data in the keys
      } else if (keys2.includes(key) && (typeof objectFile1[key] !== typeof objectFile2[key]
        || (!_.isPlainObject(objectFile1[key]) || !_.isPlainObject(objectFile2[key])))) {
        result.elements = [...result.elements, {
          key, value: dephElement(objectFile1[key], deph), type: 'delete', deph,
        }];
        result.elements = [...result.elements, {
          key, value: dephElement(objectFile2[key], deph), type: 'add', deph,
        }];
        result.elements.sort(sortCb);
      } else if (!keys2.includes(key)) { // keys are not in the second file
        result.elements = [...result.elements, {
          key, value: dephElement(objectFile1[key], deph), type: 'delete', deph, sort: 'no',
        }];
        result.elements.sort(sortCb);
        // identical keys are the data type that are the object
      } else if (keys2.includes(key) && _.isPlainObject(objectFile1[key])) {
        result.elements = [...result.elements, {
          key, value: genDiffs(objectFile1[key], objectFile2[key], deph + 1), type: null, deph,
        }];
        result.elements.sort(sortCb);
      }
    });
    return result.elements;
  };
  return genDiffs(parseFile1, parseFile2);
};

const fileDiffFormat = (filePath1, filePath2, formatName = 'stylish') => {
  const fileDiffStructure = fileDiff(filePath1, filePath2);
  const formatDiff = formatters(formatName, fileDiffStructure);
  return formatDiff;
};

export default fileDiffFormat;
