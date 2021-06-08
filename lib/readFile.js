import * as fs from 'fs';

export default (file) => fs.readFileSync(file, 'utf8');
