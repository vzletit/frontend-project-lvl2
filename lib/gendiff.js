import parse from './parse.js';

export default (file1, file2) => { // приходят имена файлов
  const parsedData1 = parse(file1);
  const parsedData2 = parse(file2);
  const errorMessageUnsupported = 'Unknown file type given. Only .json, .yml and .yaml files are supported.';

  if (!parsedData1 || !parsedData2) {
    return errorMessageUnsupported;
  }

  const mergedData = { ...parsedData1, ...parsedData2 };

  const reduced = Object.keys(mergedData)
    .sort()
    .reduce((acc, key) => {
      if (key in parsedData1 && key in parsedData2) {
        if (parsedData1[key] === parsedData2[key]) {
          return `${acc}  ${key}: ${mergedData[key]}\n`;
        }
        return `${acc}- ${key}: ${parsedData1[key]}\n+ ${key}: ${parsedData2[key]}\n`;
      }
      const sign = (key in parsedData1) ? '- ' : '+ ';
      return `${acc}${sign + key}: ${mergedData[key]}\n`;
    }, '');

  return `{\n${reduced}}\n`;
};
