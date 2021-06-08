export default (data1, data2) => {
  const parsedData1 = JSON.parse(data1);
  const parsedData2 = JSON.parse(data2);

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

  console.log(`{\n${reduced}}\n`);
  return `{\n${reduced}}\n`;
};
