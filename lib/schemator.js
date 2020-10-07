'use strict';

const schemator = (data, scheme) => {
  if (typeof scheme === 'function') {
    return scheme(data);
  }
  const result = Array.isArray(scheme) ? [] : {};
  for (const key in scheme) {
    const value = scheme[key];
    if (Array.isArray(value)) {
      const array = [];
      const arrayValuesConstructor = value[0];
      if (data[key] !== null && data[key] !== undefined) {
        for (const item of data[key]) {
          let arrayValue = null;
          if (item !== undefined && item !== null) {
            arrayValue =
              typeof arrayValuesConstructor === 'object'
                ? schemator(item, arrayValuesConstructor)
                : arrayValuesConstructor(item);
          }
          array.push(arrayValue);
        }
      }
      result[key] = array;
    } else if (typeof value === 'object') {
      result[key] = schemator(data[key], value);
    } else {
      result[key] =
        data[key] === undefined || data[key] === null ? null : value(data[key]);
    }
  }
  return result;
};

module.exports = schemator;
