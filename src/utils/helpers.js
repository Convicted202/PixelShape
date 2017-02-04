export const getType = val => {
  const typeRegExp = /^\[.*\s(.*)\]$/;

  return Object.prototype.toString.call(val).replace(typeRegExp, '$1');
};

export const isObject = val => getType(val) === 'Object';

export const isArray = val => getType(val) === 'Array';

export const copyObj = obj => {
  let clone, value, key;

  if (!isArray(obj) && !isObject(obj)) return obj;

  clone = isArray(obj) ? [] : {};
  for (key in obj) {
    value = obj[key];
    clone[key] = isObject(value) ? copyObj(value) : value;
  }
  return clone;
};
