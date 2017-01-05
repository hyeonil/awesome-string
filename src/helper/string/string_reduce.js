import coerceToString from 'helper/string/coerce_to_string';
import isFunction from 'helper/func/is_function';
import isNil from 'helper/object/is_nil';

export default function stringReduce(subject, callback, initialValue) {
  if (! isFunction(callback)) {
    throw Error(callback + ' is not a function');
  }
  const applyInitial = ! isNil(initialValue);

  const string = coerceToString(subject);
  const arr = string.split('');

  if (! applyInitial && arr.length === 0) {
    throw Error('Reduce of empty array with no initial value');
  }

  let reduceVal = applyInitial ? initialValue : arr[0];
  let index = applyInitial ? 0 : 1;

  for (; index < arr.length; index++) {
    reduceVal = callback(reduceVal, arr[index], index, arr);
  }

  return reduceVal;
}