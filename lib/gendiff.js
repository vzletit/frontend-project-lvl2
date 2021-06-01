import * as fs from 'fs';

export default (file1, file2) => {
  const getFileData = (file) => fs.readFileSync(file, 'utf8');
  const getParsedJSONData = (file) => JSON.parse(getFileData(file));

  const data1 = getParsedJSONData(file1);
  const data2 = getParsedJSONData(file2);
  const mergedData = { ...data1, ...data2 };

  const reduced = Object.keys(mergedData)
    .sort()
    .reduce((acc, key) => {
      if (key in data1 && key in data2) {
        if (data1[key] === data2[key]) {
          return `${acc}  ${key}: ${mergedData[key]}\n`;
        }
        return `${acc}- ${key}: ${data1[key]}\n+ ${key}: ${data2[key]}\n`;
      }
      const sign = (key in data1) ? '- ' : '+ ';
      return `${acc}${sign + key}: ${mergedData[key]}\n`;
    }, '');

  const result = `{\n${reduced}}\n`;
  console.log(result);
};
