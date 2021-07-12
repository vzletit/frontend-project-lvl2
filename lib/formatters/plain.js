import lodash from 'lodash';

const { isObject } = lodash;

export default (data) => {


const keyObj = '[complex value]';

const strGen = (path, status, ...[value1, value2]) => {

switch (status) {
case 'rem':
case 'add':
case 'upd':
}

// Property ++++ was ++++ from +++ to +++ 

}
  const parse = (obj, path = '') => Object.entries(obj).sort()
    .map(([key, value]) => {
    
      let tmpPath = (path) ? path + '.' + key: key;
      
      if (value.children) {
        
        return parse (value.children, tmpPath);
      } // children

      if ('object' in value) {
      
      if (value.object === 1) {
          if ('value2' in value) {
            string = strGen(keyObj, 'upd', value.value2);
          }
          else {string = strGen(keyObj, 'rem')};
        }

        if (value.object === 2) {
          if ('value1' in value) {
            string = strGen(keyObj, 'add');
          }
          else {string = strGen(key, 'upd', value.value1, keyObj)};
        }
      } else {
        if ('value' in value) {
          string = ``;
        }
        
        if (('value1' in value) && ('value2' in value)) {
          string = strGen(key, 'upd', value.value1, value.value2);
        }
        if ('value1' in value) {
        string = strGen(key, 'rem');
        }
        if ('value2' in value) {
         string = strGen(key, 'add', value.value2);
        }
      }
      return string;
    }).join('');

  return `{\n${parse(data)}}`;
};
