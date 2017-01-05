import words from 'split/words';

/**
 * Counts the number of words in `subject`.
 *
 * @function countWords
 * @static
 * @since 1.2.0
 * @memberOf Count
 * @param {string} [subject=''] The string to split into words.
 * @param {string|RegExp} [pattern] The pattern to watch words. If `pattern` is not RegExp, it is transformed to `new RegExp(pattern, flags)`.
 * @param {string} [flags=''] The regular expression flags. Applies when `pattern` is string type.
 * @return {number} Returns the number of words.
 * @example
 * as.countWords('gravity can cross dimensions');
 * // => 4
 *
 * as.countWords('GravityCanCrossDimensions');
 * // => 4
 *
 * as.countWords('Gravity - can cross dimensions!');
 * // => 4
 *
 * as.words('Earth gravity', /[^\s]+/g);
 * // => 2
 */
export default function countWords(subject, pattern, flags) {
  return words(subject, pattern, flags).length;
}