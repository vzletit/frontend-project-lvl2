import * as path from 'path';
import * as fs from 'fs';
import yaml from 'js-yaml';

export default (file) => {
  const fileType = path.extname(file);
  const fileData = fs.readFileSync(file, 'utf8');

  switch (fileType) {
    case '.json':
      return JSON.parse(fileData);
    case '.yml':
    case '.yaml':
      return yaml.load(fileData);
    default:
      return null;
  }
};
