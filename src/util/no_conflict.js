import getGlobalObject from 'helper/object/get_global';

const globalObject = getGlobalObject();
const previousAS = globalObject.as;

/**
 * Restores `as` variable to previous value and returns Awesome String library instance.
 *
 * @function noConflict
 * @static
 * @since 1.0.0
 * @memberOf Util
 * @return {Object} Returns AwesomeString library instance.
 * @example
 * var awesomeString = as.noConflict();
 * awesomeString.isAlpha('Hello');
 * // => true
 */
export default function noConflict() {
  if (this === globalObject.as) {
    globalObject.as = previousAS;
  }
  return this;
}
