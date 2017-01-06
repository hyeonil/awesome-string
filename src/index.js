import chain from './chain/chain'; // include chain here to resolve af circular reference
import ChainWrapper from './chain/wrapper';
import functions from './functions';
import objectAssign from './helper/object/object_assign';

/**
 * Creates a chain object that wraps `subject`, enabling <i>implicit</i> chain sequences.<br/>
 * A function that returns `number`, `boolean` or `array` type <i>terminates</i> the chain sequence and returns the unwrapped value.
 * Otherwise use `v.prototype.value()` to unwrap the result.
 *
 * @memberOf Chain
 * @since 1.2.0
 * @function as
 * @param {string} subject The string to wrap.
 * @return {Object}  Returns the new wrapper object.
 * @example
 * as('Back to School')
 *  .lowerCase()
 *  .words()
 * // => ['back', 'to', 'school']
 *
 * as(" Back to School ")
 *  .trim()
 *  .truncate(7)
 *  .value()
 * // => 'Back...'
 */
function AwesomeString(subject) {
  return new ChainWrapper(subject, false);
}

if (Array.prototype.forEach) {
  objectAssign(AwesomeString, functions, {
    chain: chain
  });
} else { // old version browser
  AwesomeString = functions;
}

export default AwesomeString;