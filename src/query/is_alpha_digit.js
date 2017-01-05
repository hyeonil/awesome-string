import coerceToString from 'helper/string/coerce_to_string';
import { REGEXP_ALPHA_DIGIT } from 'helper/reg_exp/const_extended';

/**
 * Checks whether `subject` contains only alpha and digit characters.
 *
 * @function isAlphaDigit
 * @static
 * @since 1.2.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` contains only alpha and digit characters or `false` otherwise.
 * @example
 * as.isAlphaDigit('year2020');
 * // => true
 *
 * as.isAlphaDigit('1448');
 * // => true
 *
 * as.isAlphaDigit('40-20');
 * // => false
 */
export default function isAlphaDigit(subject) {
  const subjectString = coerceToString(subject);
  return REGEXP_ALPHA_DIGIT.test(subjectString);
}