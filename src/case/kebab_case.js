import arrayMap from 'helper/array/array_map';
import coerceToString from 'helper/string/coerce_to_string';
import lowerCase from 'case/lower_case';
import words from 'split/words';

/**
 * Converts the `subject` to <a href="https://en.wikipedia.org/wiki/Letter_case#cite_ref-13">kebab case</a>,
 * also called <i>spinal case</i> or <i>lisp case</i>.
 *
 * @function kebabCase
 * @static
 * @since 1.2.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to convert to kebab case.
 * @return {string}              Returns the kebab case string.
 * @example
 * as.kebabCase('goodbye blue sky');
 * // => 'goodbye-blue-sky'
 *
 * as.kebabCase('GoodbyeBlueSky');
 * // => 'goodbye-blue-sky'
 *
 * as.kebabCase('-Goodbye-Blue-Sky-');
 * // => 'goodbye-blue-sky'
 */
export default function kebabCase(subject) {
  const subjectString = coerceToString(subject);
  if (subjectString === '') {
    return '';
  }
  return arrayMap(words(subjectString), lowerCase).join('-');
}