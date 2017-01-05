import isArray from 'helper/array/is_array';
import isFunction from 'helper/func/is_function';

export default function arrayMap(arr, func) {
  if (! isArray(arr)) {
    return arr;
  }
  if (! isFunction(func)) {
    return arr;
  }

  const map = [];

  for (let index = 0; index < arr.length; index++) {
    const item = arr[index];
    const mapItem = func(item, index);
    map.push(mapItem);
  }

  return map;
}