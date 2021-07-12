import deepCompare from '../gendiff.js';
import stylish from './stylish.js';
import plain from './plain.js';
// import json from './json.js';

export default (file1, file2, format) => {
  switch (format) {
    case 'none':
      return JSON.stringify(deepCompare(file1, file2), null, 4);

    case 'plain':
      return plain(deepCompare(file1, file2));

    case 'json':
      return deepCompare(file1, file2);

    case 'stylish':
      return stylish(deepCompare(file1, file2));

    default: return stylish(deepCompare(file1, file2));
  }
};
