import coerceToString from 'helper/string/coerce_to_string';

/**
 * Reverses the `subject`.
 *
 * @function reverse
 * @static
 * @since 1.2.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to reverse.
 * @return {string} Returns the reversed string.
 * @example
 * as.reverse('winter');
 * // => 'retniw'
 */
export default function reverse(subject) {
  const subjectString = coerceToString(subject);
  return subjectString.split('').reverse().join('');
}