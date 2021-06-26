import lodash from 'lodash';

const { isObject } = lodash;

export default (data) => {
  const formatObject = (object, baseTab = '', tabulator = '    ') => Object.entries(object).sort()
    .map(([key, value]) => {
      let tabObject = tabulator;
      let result;
      if (isObject(value)) {
        result = `${tabObject}${key}: {\n${formatObject(value, baseTab, tabObject += '    ')}${tabObject}}\n`;
      } else {
        result = `${tabObject}${key}: ${value}\n`;
      }
      return baseTab + result;
    }).join('');

  const parse = (obj, tabObject = '') => Object.entries(obj).sort()
    .map(([key, value]) => {
      let tabObj = tabObject;
      const tab = '  ';
      let string = '';
      if (value.children) {
        tabObj += '    ';
        string = `${tabObj}${key}: {\n${parse(value.children, tabObj)}${tabObj}}\n`;
        tabObj = tabObj.slice(0, -4); // -4 последних символа
      } // если есть дети

      if ('object' in value) {
        if (value.object === 1) {
          string = `- ${key}: {\n${formatObject(value.value1, tabObj.repeat(1))}${tabObj.repeat(1)}}`;
          if ('value2' in value) {
            string += `\n${tabObj}${tab}+ ${key}: ${value.value2}`;
          }
          return `${tabObj + tab + string}\n`;
        }

        if (value.object === 2) {
          string = `+ ${key}: {\n${formatObject(value.value2, tabObj.repeat(1))}${tabObj.repeat(1)}}`;
          if ('value1' in value) {
            string += `\n${tabObj}${tab}- ${key}: ${value.value1}`;
          }
          return `${tabObj + tab + string}\n`;
        }
      } else {
        if ('value' in value) {
          string = `  ${key}: ${value.value}`;
          return `${tabObj + tab + string}\n`;
        }
        if (('value1' in value) && ('value2' in value)) {
          string = `- ${key}: ${value.value1}`;
          const string2 = `+ ${key}: ${value.value2}`;
          return `${tabObj + tab + string}\n${tabObj}${tab}${string2}\n`;
        }
        if ('value1' in value) {
          string = `- ${key}: ${value.value1}`;
          return `${tabObj + tab + string}\n`;
        }
        if ('value2' in value) {
          string = `+ ${key}: ${value.value2}`;
          return `${tabObj + tab + string}\n`;
        }
      }
      return string;
    }).join('');

  return `{\n${parse(data)}}`;
};
