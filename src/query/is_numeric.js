import isNil from 'helper/object/is_nil';

/**
 * Checks whether `subject` is numeric.
 *
 * @function isNumeric
 * @static
 * @since 1.0.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` is numeric or `false` otherwise.
 * @example
 * as.isNumeric('350');
 * // => true
 *
 * as.isNumeric('-20.5');
 * // => true
 *
 * as.isNumeric('1.5E+2');
 * // => true
 *
 * as.isNumeric('five');
 * // => false
 */
export default function isNumeric(subject) {
  const valueNumeric = typeof subject === 'object' && !isNil(subject) ? Number(subject) : subject;
  return (typeof valueNumeric === 'number' || typeof valueNumeric === 'string')
    && !isNaN(valueNumeric - parseFloat(valueNumeric));
}