import coerceToString from 'helper/string/coerce_to_string';
import { REGEXP_DIGIT } from 'helper/reg_exp/const';

/**
 * Checks whether `subject` contains only digit characters.
 *
 * @function isDigit
 * @static
 * @since 1.2.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` contains only digit characters or `false` otherwise.
 * @example
 * as.isDigit('35');
 * // => true
 *
 * as.isDigit('1.5');
 * // => false
 *
 * as.isDigit('ten');
 * // => false
 */
export default function isDigit(subject) {
  const subjectString = coerceToString(subject);
  return REGEXP_DIGIT.test(subjectString);
}