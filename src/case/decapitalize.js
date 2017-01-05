import coerceToString from 'helper/string/coerce_to_string';

/**
 * Converts the first character of `subject` to lower case.
 *
 * @function decapitalize
 * @static
 * @since 1.2.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to decapitalize.
 * @return {string}              Returns the decapitalized string.
 * @example
 * as.decapitalize('Sun');
 * // => 'sun'
 *
 * as.decapitalize('moon');
 * // => 'moon'
 */
export default function decapitalize(subject) {
  const subjectString = coerceToString(subject);
  if (subjectString === '') {
    return subjectString;
  }
  return subjectString.substr(0, 1).toLowerCase() + subjectString.substr(1);
}