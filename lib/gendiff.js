import lodash from 'lodash';
import parse from './parse.js';

const {
  isObject, reduce, has,
} = lodash;

export default (file1, file2) => { // приходят имена файлов
  const parsedData1 = parse(file1); // уже распарсенный объект
  const parsedData2 = parse(file2);
  const errorMessageUnsupported = 'Unknown file type given. Only .json, .yml and .yaml are supported.';

  if (!parsedData1 || !parsedData2) {
    return errorMessageUnsupported;
  }

  const deepCompare = (obj1, obj2, accum = {}) => {
    const mergedKeys = { ...obj1, ...obj2 };

    return reduce(mergedKeys,
      (acc, value, key) => {
        const valObj1 = obj1[key];
        const valObj2 = obj2[key];
        const val1 = obj1[key];
        const val2 = obj2[key];
        let whoIsObject;
        if (has(obj1, key) && has(obj2, key)) { // ключ есть в обоих объектах
          if (isObject(valObj1) && isObject(valObj2)) { // если оба ключа - объекты
            const children = deepCompare(valObj1, valObj2);
            acc[key] = { children };
            return acc;
          }
          // если хотя бы один ключ - объект (просто загоняяем детей без анализа)
          if (isObject(valObj1) || isObject(valObj2)) {
            whoIsObject = (isObject(valObj1)) ? 1 : 2;
            acc[key] = { object: whoIsObject, value1: valObj1, value2: valObj2 };
            return acc;
          }

          if ((value === val1) && (value === val2)) { // если оба ключа не объекты и равны
            acc[key] = { value: val1 };
            return acc;
          }

          acc[key] = { value1: val1, value2: val2 }; // ключи - не объекты и не равны
          return acc;
        }
        // ключ есть только в одном объекте

        if (isObject(valObj1) || isObject(valObj2)) { // если хотя бы один ключ - объект
          whoIsObject = (isObject(valObj1)) ? 1 : 2;
          acc[key] = (isObject(valObj1))
            ? { object: whoIsObject, value1: valObj1 } : { object: whoIsObject, value2: valObj2 };
          return acc;
        }

        if (has(obj1, key) || has(obj2, key)) { // ключ есть в одном из объектов
          acc[key] = (has(obj1, key)) ? { value1: val1 } : { value2: val2 };
          return acc;
        }
        return acc;
      },
      accum);
  };

  return deepCompare(parsedData1, parsedData2);
};
