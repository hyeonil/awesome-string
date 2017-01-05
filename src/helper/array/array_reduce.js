import isArray from 'helper/array/is_array';
import isFunction from 'helper/func/is_function'
import isNil from 'helper/object/is_nil';

export default function arrayReduce(arr, callback, initialValue) {
  if (! isArray(arr)) {
    throw Error(arr + ' is not an array');
  }
  if (! isFunction(callback)) {
    throw Error(callback + ' is not a function');
  }
  const applyInitial = ! isNil(initialValue);

  if (! applyInitial && arr.length === 0) {
    throw Error('Reduce of empty array with no initial value');
  }

  let reduceVal = applyInitial ? initialValue : arr[0];
  let index = applyInitial ? 0 : 1;

  for (; index < arr.length; index++) {
    reduceVal = callback(reduceVal, arr[index], index, arr);
  }

  return reduceVal;
};