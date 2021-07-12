import lodash from 'lodash';

const { isObject } = lodash;

export default (data) => {
  const tabGen = (lvl = 0) => {
    const tab = '    ';
    return tab.repeat(lvl);
  };

  const formatObject = (object, lev) => Object.entries(object).sort()
    .map(([key, value]) => {
      let result;
      if (isObject(value)) {
        result = `${tabGen(lev + 1)}${key}: {\n${formatObject(value, lev + 1)}${tabGen(lev + 1)}}\n`; // ok
      } else {
        result = `${tabGen(lev + 1)}${key}: ${value}\n`;
      }
      return result;
    }).join('');

  const parse = (obj, level = 0) => Object.entries(obj).sort()
    .map(([key, value]) => {
      let string = '';
      if (value.children) {
        const tempLvl = level + 1;
        string = `${tabGen(tempLvl)}${key}: {\n${parse(value.children, tempLvl)}${tabGen(tempLvl)}}\n`;
      } // если есть дети
      // если кто-то — объект
      if ('object' in value) {
        if (value.object === 1) {
          string = `${tabGen(level)}  - ${key}: {\n${formatObject(value.value1, level + 1)}${tabGen(level + 1)}}`;
          if ('value2' in value) {
            string += `\n${tabGen(level)}  + ${key}: ${value.value2}`;
          }
          return `${string}\n`;
        } // объект - первый

        if (value.object === 2) {
          string = `${tabGen(level)}  + ${key}: {\n${formatObject(value.value2, level + 1)}${tabGen(level + 1)}}`;
          if ('value1' in value) {
            string += `\n${tabGen(level)}  - ${key}: ${value.value1}`;
          }
          return `${string}\n`;
        } // объект - второй
      } else {
        if ('value' in value) {
          string = `${tabGen(level)}    ${key}: ${value.value}`;
          return `${string}\n`;
        }
        if (('value1' in value) && ('value2' in value)) {
          string = `${tabGen(level)}  - ${key}: ${value.value1}`;
          const string2 = `${tabGen(level)}  + ${key}: ${value.value2}`;
          return `${string}\n${string2}\n`;
        }
        if ('value1' in value) {
          string = `${tabGen(level)}  - ${key}: ${value.value1}`;
          return `${string}\n`;
        }
        if ('value2' in value) {
          string = `${tabGen(level)}  + ${key}: ${value.value2}`;
          return `${string}\n`;
        }
      } // если никто не объект
      return string;
    }).join('');

  return `{\n${parse(data)}}`;
};
