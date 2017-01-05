import coerceToString from 'helper/string/coerce_to_string';

/**
 * Counts the characters in `subject`.<br/>
 *
 * @function count
 * @static
 * @since 1.2.0
 * @memberOf Count
 * @param  {string} [subject=''] The string to count characters.
 * @return {number}              Returns the number of characters in `subject`.
 * @example
 * as.count('rain');
 * // => 4
 */
export default function count(subject) {
  return coerceToString(subject).length;
}