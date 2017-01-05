import coerceToString from 'helper/string/coerce_to_string';

/**
 * Access a character from `subject` at specified `position`.
 *
 * @function charAt
 * @static
 * @since 1.2.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to extract from.
 * @param  {numbers} position The position to get the character.
 * @return {string} Returns the character at specified position.
 * @example
 * as.charAt('helicopter', 0);
 * // => 'h'
 *
 * as.charAt('helicopter', 1);
 * // => 'e'
 */
export default function charAt(subject, position) {
  const subjectString = coerceToString(subject);
  return subjectString.charAt(position);
}