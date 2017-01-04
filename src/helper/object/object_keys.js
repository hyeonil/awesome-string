import isNil from 'helper/object/is_nil';

export function objectKeys(obj) {
  let keys = [];

  if (! isNil(obj) && typeof obj === 'object') {
    for (let key in obj) {
      keys.push(key);
    }
  }

  return keys;
}