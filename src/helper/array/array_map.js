import isArray from 'helper/array/is_array';
import isFunction from 'helper/func/is_function';

export default function arrayMap(arr, func) {
  if (! isArray(arr)) {
    return arr;
  }
  if (! isFunction(func)) {
    return arr;
  }

  let map = [];

  for (let i = 0, item; item = arr[i]; i++) {
    let mapItem = func(item, i);
    map.push(mapItem);
  }

  return map
}