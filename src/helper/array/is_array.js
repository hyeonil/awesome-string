import isNil from 'helper/object/is_nil';

export default function isArray(obj) {
  return ! isNil(obj) && typeof obj.constructor === 'function' && obj.constructor === Array;
}
