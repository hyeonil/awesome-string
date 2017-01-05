import isArray from 'helper/array/is_array';
import isFunction from 'helper/func/is_function';

export default function arrayForEach(arr, func) {
  if (! isArray(arr)) {
    return arr;
  }
  if (! isFunction(func)) {
    return arr;
  }

  for (const index in arr) {
    const item = arr[index];
    func(item, index, arr);
  }
}