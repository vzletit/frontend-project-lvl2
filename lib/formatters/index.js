import stylish from './stylish.js';
import plain from './plain.js';

export default (data, formatter) => {
  switch (formatter) {
    case 'json':
      return JSON.stringify(data, null, 4);

    case 'plain':
      return plain(data);

    default:
    case 'stylish':
      return stylish(data);
  }
};
