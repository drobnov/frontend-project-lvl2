import _ from 'lodash';
import parsers from './parsers/parsers.js';
import formatters from './formatters/index.js';

const dephElement = (data, deph) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const keys = Object.keys(data);
  const result = keys.map((key) => ({
    key, value: dephElement(data[key], deph + 1), deph: deph + 1, type: null,
  }));
  return result;
};

const sort = (data1, data2) => {
  const sortElements1 = _.sortBy(data1, (element) => element.key);
  const sortElements2 = _.sortBy(data2, (element) => element.key);
  const result = _.sortBy([...sortElements1, ...sortElements2], (element) => element.key);
  return result;
};

const fileDiff = (filePath1, filePath2) => {
  const parseFile1 = parsers(filePath1);
  const parseFile2 = parsers(filePath2);

  const genDiffs = (objectFile1, objectFile2, deph = 0) => {
    const keys1 = Object.keys(objectFile1);
    const keys2 = Object.keys(objectFile2);
    const keysAdd = [...keys2].filter((key) => !keys1.includes(key));
    const elementsAdd = keysAdd.map((key) => ({ // add keys that are not in the first file
      key, value: dephElement(objectFile2[key], deph), type: 'add', deph, sort: 'no',
    }));
    const elementsDeleteRemove = keys1.map((key) => {
      if (_.isEqual(objectFile1[key], objectFile2[key])) { // add the same data
        return {
          key, value: dephElement(objectFile1[key], deph), type: null, deph,
        };
      } if (keys2.includes(key) && (typeof objectFile1[key] !== typeof objectFile2[key]
        || (!_.isPlainObject(objectFile1[key]) || !_.isPlainObject(objectFile2[key])))) {
        return [{ // same keys, different data in the keys
          key, value: dephElement(objectFile1[key], deph), type: 'delete', deph,
        }, {
          key, value: dephElement(objectFile2[key], deph), type: 'add', deph,
        }];
      } if (!keys2.includes(key)) { // keys are not in the second file
        return {
          key, value: dephElement(objectFile1[key], deph), type: 'delete', deph, sort: 'no',
        };
      }
      return { // identical keys are the data type that are the object
        key, value: genDiffs(objectFile1[key], objectFile2[key], deph + 1), type: null, deph,
      };
    }).flat();
    return sort(elementsAdd, elementsDeleteRemove);
  };
  return genDiffs(parseFile1, parseFile2);
};

const fileDiffFormat = (filePath1, filePath2, formatName = 'stylish') => {
  const fileDiffStructure = fileDiff(filePath1, filePath2);
  const formatDiff = formatters(formatName, fileDiffStructure);
  return formatDiff;
};

export default fileDiffFormat;
