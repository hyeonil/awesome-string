import coerceToString from 'helper/string/coerce_to_string';

/**
 * Extracts from `subject` a string from `start` position a number of `length` characters.
 *
 * @function substr
 * @static
 * @since 1.2.0
 * @memberOf Chop
 * @param  {string} [subject='']                 The string to extract from.
 * @param  {number} start                        The position to start extraction.
 * @param  {number} [length=subject.endOfString] The number of characters to extract. If omitted, extract to the end of `subject`.
 * @return {string}                              Returns the extracted string.
 * @note Uses native `String.prototype.substr()`
 * @example
 * as.substr('infinite loop', 9);
 * // => 'loop'
 *
 * as.substr('dreams', 2, 2);
 * // => 'ea'
 */
export default function substr(subject, start, length) {
  return coerceToString(subject).substr(start, length);
}