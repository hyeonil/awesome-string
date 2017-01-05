import isNil from 'helper/object/is_nil';

export default function isFunction(func) {
  return ! isNil(func) && typeof func === 'function';
}