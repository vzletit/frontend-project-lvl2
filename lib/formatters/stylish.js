import lodash from 'lodash';

const { isObject, sortBy } = lodash;

export default (data) => {
  const tabGen = (lvl = 0) => {
    const tab = '    ';
    return tab.repeat(lvl);
  };

  const formatObject = (object, lev) => sortBy(Object.entries(object))
    .map(([key, value]) => {
      if (isObject(value)) {
        return `${tabGen(lev + 1)}${key}: {\n${formatObject(value, lev + 1)}${tabGen(lev + 1)}}\n`;
      }
      return `${tabGen(lev + 1)}${key}: ${value}\n`;
    }).join('');

  const parse = (obj, level = 0) => sortBy(Object.entries(obj))
    .map(([key, value]) => {
      if (value.children) {
        const tempLvl = level + 1;
        return `${tabGen(tempLvl)}${key}: {\n${parse(value.children, tempLvl)}${tabGen(tempLvl)}}\n`;
      } // если есть дети
      // если кто-то — объект
      if ('object' in value) {
        if (value.object === 1) {
          const secLine = ('value2' in value) ? `${tabGen(level)}  + ${key}: ${value.value2}\n` : '';
          return `${tabGen(level)}  - ${key}: {\n${formatObject(value.value1, level + 1)}${tabGen(level + 1)}}\n${secLine}`;
        } // объект - первый

        if (value.object === 2) {
          const firstLine = ('value1' in value) ? `${tabGen(level)}  - ${key}: ${value.value1}\n` : '';

          return `${firstLine}${tabGen(level)}  + ${key}: {\n${formatObject(value.value2, level + 1)}${tabGen(level + 1)}}\n`;
        } // объект - второй
      } else {
        if ('value' in value) {
          return `${tabGen(level)}    ${key}: ${value.value}\n`;
        }
        if (('value1' in value) && ('value2' in value)) {
          return `${tabGen(level)}  - ${key}: ${value.value1}\n${tabGen(level)}  + ${key}: ${value.value2}\n`;
        }
        if ('value1' in value) {
          return `${tabGen(level)}  - ${key}: ${value.value1}\n`;
        }
        if ('value2' in value) {
          return `${tabGen(level)}  + ${key}: ${value.value2}\n`;
        }
      } // если никто не объект
      return key;
    }).join('');

  return `{\n${parse(data)}}`;
};
