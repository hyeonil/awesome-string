import coerceToString from 'helper/string/coerce_to_string';
import isFunction from 'helper/func/is_function'
import isNil from 'helper/object/is_nil';

export default function stringReduce(subject, callback, initialValue) {
  if (! isFunction(callback)) {
    throw Error(callback + ' is not a function');
  }
  const applyInitial = ! isNil(initialValue);

  let string = coerceToString(subject);
  let arr = string.split('');
  let length = arr.length;

  if (! applyInitial && length === 0) {
    throw Error('Reduce of empty array with no initial value');
  }

  let reduceVal = applyInitial ? initialValue : arr[length - 1];
  let index = applyInitial ? (length - 1) : (length - 2);

  for (; index >= 0; index--) {
    reduceVal = callback(reduceVal, arr[index], index, arr);
  }

  return reduceVal;
};