import lodash from 'lodash';

const { sortBy } = lodash;

export default (data) => {
  const parse = (obj, path = '') => sortBy(Object.entries(obj))
    .map(([key, value]) => {
      const tmpPath = (path) ? `${path}.${key}` : key;
      if (value.children) {
        return parse(value.children, tmpPath);
      } // values are objects -> have children -> going deeper

      const resultIntro = `Property '${tmpPath}' was`;

      const isQuotes = (str) => ((typeof (str) === 'string') ? `'${str}'` : str);

      // если value — объект
      if ('object' in value) {
        if (value.object === 1) {
          if ('value2' in value) {
            // complex was updated to VAL2
            return `${resultIntro} updated. From [complex value] to ${isQuotes(value.value2)}\n`;
          }
          // key was removed
          return `${resultIntro} removed\n`;
        } // объект — value 1

        if (value.object === 2) {
          if ('value1' in value) {
            // VAL1 was updated to complex
            return `${resultIntro} updated. From ${isQuotes(value.value1)} to [complex value]\n`;
          }
          // complex  was added
          return `${resultIntro} added with value: [complex value]\n`;
        } // объект — value 2
      } else {
        if ('value' in value) {
          // values same. DO NOTHING
          return '';
        }

        if ('value1' in value && 'value2' in value) {
          // value1 updated to value2
          return `${resultIntro} updated. From ${isQuotes(value.value1)} to ${isQuotes(value.value2)}\n`;
        }
        if ('value1' in value) {
          // key was removed
          return `${resultIntro} removed\n`;
        }
        if ('value2' in value) {
          // value 2 added
          return `${resultIntro} added with value: ${isQuotes(value.value2)}\n`;
        }
      } // value — НЕ объект
      return key;
    }).join('');

  return parse(data).slice(0, -1);
};
