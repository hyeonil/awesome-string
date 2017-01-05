import coerceToString from 'helper/string/coerce_to_string';

/**
 * Checks whether `subject` is empty.
 *
 * @function isEmpty
 * @static
 * @since 1.2.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` is empty or `false` otherwise
 * @example
 * as.isEmpty('');
 * // => true
 *
 * as.isEmpty('  ');
 * // => false
 *
 * as.isEmpty('sun');
 * // => false
 */
export default function isEmpty(subject) {
  const subjectString = coerceToString(subject);
  return subjectString.length === 0;
}