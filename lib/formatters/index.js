import genDiff from '../gendiff.js';
import stylish from './stylish.js';
import plain from './plain.js';

export default (file1, file2, formatter) => {
  switch (formatter) {
    case 'none':
      return JSON.stringify(genDiff(file1, file2), null, 4);

    case 'plain':
      return plain(genDiff(file1, file2));

    default:
    case 'stylish':
      return stylish(genDiff(file1, file2));
  }
};
