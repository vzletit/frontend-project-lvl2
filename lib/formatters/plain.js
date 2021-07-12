export default (data) => {
  const parse = (obj, path = '') => Object.entries(obj).sort()
    .map(([key, value]) => {
      const tmpPath = (path) ? `${path}.${key}` : key;
      if (value.children) {
        return parse(value.children, tmpPath);
      } // values are objects -> have children -> going deeper
      let string = '';
      const resultIntro = `Property '${tmpPath}' was`;

      const isQuotes = (str) => ((typeof (str) === 'string') ? `'${str}'` : str);

      // если value — объект
      if ('object' in value) {
        if (value.object === 1) {
          if ('value2' in value) {
            // complex was updated to VAL2
            string = ` updated. From [complex value] to ${isQuotes(value.value2)}`;
          } else {
            // key was removed
            string = ' removed';
          }
        } // объект — value 1

        if (value.object === 2) {
          if ('value1' in value) {
            // VAL1 was updated to complex
            string = ` updated. From ${isQuotes(value.value1)} to [complex value]`;
          } else {
            // complex  was added
            string = ' added with value: [complex value]';
          }
        } // объект — value 2
      } else {
        if ('value' in value) {
          // values same. DO NOTHING
          return '';
        }

        if ('value1' in value && 'value2' in value) {
          // value1 updated to value2
          string = ` updated. From ${isQuotes(value.value1)} to ${isQuotes(value.value2)}`;
        } else {
          if ('value1' in value) {
            // key was removed
            string = ' removed';
          }
          if ('value2' in value) {
            // value 2 added
            string = ` added with value: ${isQuotes(value.value2)}`;
          }
        }
      } // value — НЕ объект

      return `${resultIntro + string}\n`;
    }).join('');

  return parse(data).slice(0, -1);
};
