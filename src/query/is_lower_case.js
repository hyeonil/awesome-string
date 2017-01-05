import coerceToString from 'helper/string/coerce_to_string';
import isAlpha from 'query/is_alpha';

/**
 * Checks whether `subject` has only lower case characters.
 *
 * @function isLowerCase
 * @static
 * @since 1.2.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` is lower case or `false` otherwise.
 * @example
 * as.isLowerCase('motorcycle');
 * // => true
 *
 * as.isLowerCase('John');
 * // => false
 *
 * as.isLowerCase('T1000');
 * // => false
 */
export default function isLowerCase(subject) {
  const valueString = coerceToString(subject);
  return isAlpha(valueString) && valueString.toLowerCase() === valueString;
}