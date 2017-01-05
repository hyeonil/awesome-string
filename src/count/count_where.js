import coerceToString from 'helper/string/coerce_to_string';
import functionBind from 'helper/func/function_bind';
import stringReduce from 'helper/string/string_reduce';

/**
 * Counts the characters in `subject` for which `predicate` returns truthy.
 *
 * @function  countWhere
 * @static
 * @since 1.2.0
 * @memberOf Count
 * @param  {string}   [subject=''] The string to count characters.
 * @param  {Function} predicate    The predicate function invoked on each character with parameters `(character, index, string)`.
 * @param  {Object}   [context]    The context to invoke the `predicate`.
 * @return {number}                Returns the number of characters for which `predicate` returns truthy.
 * @example
 * as.countWhere('hola!', as.isAlpha);
 * // => 4
 *
 * as.countWhere('2022', function(character, index, str) {
 *   return character === '2';
 * });
 * // => 3
 */
export default function countWhere(subject, predicate, context) {
  const subjectString = coerceToString(subject);
  if (subjectString === '' || typeof predicate !== 'function') {
    return 0;
  }
  if (! predicate.prototype.bind) {
    predicate.prototype.bind = functionBind;
  }
  const predicateWithContext = predicate.bind(context);
  return stringReduce(subjectString, function(countTruthy, character, index) {
    return predicateWithContext(character, index, subjectString) ? countTruthy + 1 : countTruthy;
  }, 0);
}