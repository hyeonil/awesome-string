import isNil from 'helper/object/is_nil';

export default function objectKeys(obj) {
  const keys = [];
  if (! isNil(obj) && typeof obj === 'object') {
    for (const key in obj) {
      keys.push(key);
    }
  }

  return keys;
}