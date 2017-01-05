/**
 * Checks whether `subject` is a string primitive type.
 *
 * @function isString
 * @static
 * @since 1.2.0
 * @memberOf Query
 * @param {string} subject The value to verify.
 * @return {boolean} Returns `true` if `subject` is string primitive type or `false` otherwise.
 * @example
 * as.isString('vacation');
 * // => true
 *
 * as.isString(560);
 * // => false
 */
export default function isString(subject) {
  return typeof subject === 'string';
}