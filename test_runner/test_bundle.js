(function (chai) {
'use strict';

/**
 * Checks if `value` is `null` or `undefined`
 *
 * @ignore
 * @function isNil
 * @param {*} value The object to check
 * @return {boolean} Returns `true` is `value` is `undefined` or `null`, `false` otherwise
 */
function isNil(value) {
  return value === undefined || value === null;
}

function isArray(obj) {
  return !isNil(obj) && typeof obj.constructor === 'function' && obj.constructor === Array;
}

function isFunction(func) {
  return !isNil(func) && typeof func === 'function';
}

function arrayForEach(arr, func) {
  if (!isArray(arr)) {
    return arr;
  }
  if (!isFunction(func)) {
    return arr;
  }

  for (var index in arr) {
    var item = arr[index];
    func(item, index, arr);
  }
}

function arrayMap(arr, func) {
  if (!isArray(arr)) {
    return arr;
  }
  if (!isFunction(func)) {
    return arr;
  }

  var map = [];

  for (var i = 0, item; item = arr[i]; i++) {
    var mapItem = func(item, i);
    map.push(mapItem);
  }

  return map;
}

/**
 * Converts the `value` to a boolean. If `value` is `undefined` or `null`, returns `defaultValue`.
 *
 * @ignore
 * @function toBoolean
 * @param {*} value The value to convert.
 * @param {boolean} [defaultValue=false] The default value.
 * @return {boolean} Returns the coercion to boolean.
 */
function coerceToBoolean(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (isNil(value)) {
    return defaultValue;
  }
  return Boolean(value);
}

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
function isString(subject) {
  return typeof subject === 'string';
}

/**
 * Get the string representation of the `value`.
 * Converts the `value` to string.
 * If `value` is `null` or `undefined`, return `defaultValue`.
 *
 * @ignore
 * @function toString
 * @param {*} value             The value to convert.
 * @param {*} [defaultValue=''] The default value to return.
 * @return {string|null}        Returns the string representation of `value`. Returns `defaultValue` if `value` is
 *                              `null` or `undefined`.
 */
function coerceToString(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (isNil(value)) {
    return defaultValue;
  }
  if (isString(value)) {
    return value;
  }
  return String(value);
}

/**
 * Converts the first character of `subject` to upper case. If `restToLower` is `true`, convert the rest of
 * `subject` to lower case.
 *
 * @function capitalize
 * @static
 * @since 1.2.0
 * @memberOf Case
 * @param  {string}  [subject='']        The string to capitalize.
 * @param  {boolean} [restToLower=false] Convert the rest of `subject` to lower case.
 * @return {string}                      Returns the capitalized string.
 * @example
 * as.capitalize('apple');
 * // => 'Apple'
 *
 * as.capitalize('aPPle', true);
 * // => 'Apple'
 */
function capitalize(subject, restToLower) {
  var subjectString = coerceToString(subject);
  var restToLowerCaseBoolean = coerceToBoolean(restToLower);
  if (subjectString === '') {
    return '';
  }
  if (restToLowerCaseBoolean) {
    subjectString = subjectString.toLowerCase();
  }
  return subjectString.substr(0, 1).toUpperCase() + subjectString.substr(1);
}

/**
 * Converts the `subject` to lower case.
 *
 * @function lowerCase
 * @static
 * @since 1.2.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to convert to lower case.
 * @return {string}              Returns the lower case string.
 * @example
 * as.lowerCase('Green');
 * // => 'green'
 *
 * as.lowerCase('BLUE');
 * // => 'blue'
 */
function lowerCase(subject) {
  var subjectString = coerceToString(subject, '');
  return subjectString.toLowerCase();
}

/**
 * A regular expression string matching digits
 *
 * @type {string}
 * @ignore
 */
var digit = '\\d';

/**
 * A regular expression string matching whitespace
 *
 * @type {string}
 * @ignore
 */
var whitespace = '\\s\\uFEFF\\xA0';

/**
 * A regular expression string matching high surrogate
 *
 * @type {string}
 * @ignore
 */
var highSurrogate = '\\uD800-\\uDBFF';

/**
 * A regular expression string matching low surrogate
 *
 * @type {string}
 * @ignore
 */
var lowSurrogate = '\\uDC00-\\uDFFF';

/**
 * A regular expression string matching diacritical mark
 *
 * @type {string}
 * @ignore
 */
var diacriticalMark = '\\u0300-\\u036F\\u1AB0-\\u1AFF\\u1DC0-\\u1DFF\\u20D0-\\u20FF\\uFE20-\\uFE2F';

/**
 * A regular expression to match the base character for a combining mark
 *
 * @type {string}
 * @ignore
 */
var base = '\\0-\\u02FF\\u0370-\\u1AAF\\u1B00-\\u1DBF\\u1E00-\\u20CF\\u2100-\\uD7FF\\uE000-\\uFE1F\\uFE30-\\uFFFF';

/**
 * Regular expression to match combining marks
 *
 * @see http://unicode.org/faq/char_combmark.html
 * @type {RegExp}
 * @ignore
 */
var REGEXP_COMBINING_MARKS = new RegExp('([' + base + ']|[' + highSurrogate + '][' + lowSurrogate + ']|[' + highSurrogate + '](?![' + lowSurrogate + '])|(?:[^' + highSurrogate + ']|^)[' + lowSurrogate + '])([' + diacriticalMark + ']+)', 'g');

/**
 * Regular expression to match surrogate pairs
 *
 * @see http://www.unicode.org/faq/utf_bom.html#utf16-2
 * @type {RegExp}
 * @ignore
 */
var REGEXP_SURROGATE_PAIRS = new RegExp('([' + highSurrogate + '])([' + lowSurrogate + '])', 'g');

/**
 * Regular expression to match an unicode character
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_UNICODE_CHARACTER = new RegExp('((?:[' + base + ']|[' + highSurrogate + '][' + lowSurrogate + ']|[' + highSurrogate + '](?![' + lowSurrogate + '])|(?:[^' + highSurrogate + ']|^)[' + lowSurrogate + '])(?:[' + diacriticalMark + ']+))|\
([' + highSurrogate + '][' + lowSurrogate + '])|\
([\\n\\r\\u2028\\u2029])|\
(.)', 'g');

/**
 * Regular expression to match whitespaces
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_WHITESPACE = new RegExp('[' + whitespace + ']');

/**
 * Regular expression to match whitespaces from the left side
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_TRIM_LEFT = new RegExp('^[' + whitespace + ']+');

/**
 * Regular expression to match whitespaces from the right side
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_TRIM_RIGHT = new RegExp('[' + whitespace + ']+$');

/**
 * Regular expression to match digit characters
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_DIGIT = new RegExp('^' + digit + '+$');

/**
 * Regular expression to match regular expression special characters
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_SPECIAL_CHARACTERS = /[-[\]{}()*+!<=:?.\/\\^$|#,]/g;

/**
 * Regular expression to match not latin characters
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_NON_LATIN = /[^A-Za-z0-9]/g;

/**
 * Regular expression to match HTML special characters.
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_HTML_SPECIAL_CHARACTERS = /[<>&"'`]/g;

/**
 * Regular expression to match sprintf format string
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_CONVERSION_SPECIFICATION = /(%{1,2})(?:(\d+)\$)?(\+)?([ 0]|'.{1})?(-)?(\d+)?(?:\.(\d+))?([bcdiouxXeEfgGs])?/g;

/**
 * Regular expression to match trailing zeros in a number
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_TRAILING_ZEROS = /\.?0+$/g;

/**
 * Regular expression to match flags from a regular expression.
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_FLAGS = /[gimuy]*$/;

/**
 * Regular expression to match a list of tags.
 *
 * @see https://html.spec.whatwg.org/multipage/syntax.html#syntax-tag-name
 * @type {RegExp}
 * @ignore
 */

var REGEXP_TAG_LIST = /<([A-Za-z0-9]+)>/g;

/**
 * A regular expression to match the General Punctuation Unicode block
 *
 * @type {string}
 * @ignore
 */
var generalPunctuationBlock = '\\u2000-\\u206F';

/**
 * A regular expression to match non characters from from Basic Latin and Latin-1 Supplement Unicode blocks
 *
 * @type {string}
 * @ignore
 */
var nonCharacter = '\\x00-\\x2F\\x3A-\\x40\\x5B-\\x60\\x7b-\\xBF\\xD7\\xF7';

/**
 * A regular expression to match the dingbat Unicode block
 *
 * @type {string}
 * @ignore
 */
var dingbatBlock = '\\u2700-\\u27BF';

/**
 * A regular expression string that matches lower case letters: LATIN
 *
 * @type {string}
 * @ignore
 */
var lowerCaseLetter = 'a-z\\xB5\\xDF-\\xF6\\xF8-\\xFF\\u0101\\u0103\\u0105\\u0107\\u0109\\u010B\\u010D\\u010F\\u0111\\u0113\\u0115\\u0117\\u0119\\u011B\\u011D\\u011F\\u0121\\u0123\\u0125\\u0127\\u0129\\u012B\\u012D\\u012F\\u0131\\u0133\\u0135\\u0137\\u0138\\u013A\\u013C\\u013E\\u0140\\u0142\\u0144\\u0146\\u0148\\u0149\\u014B\\u014D\\u014F\\u0151\\u0153\\u0155\\u0157\\u0159\\u015B\\u015D\\u015F\\u0161\\u0163\\u0165\\u0167\\u0169\\u016B\\u016D\\u016F\\u0171\\u0173\\u0175\\u0177\\u017A\\u017C\\u017E-\\u0180\\u0183\\u0185\\u0188\\u018C\\u018D\\u0192\\u0195\\u0199-\\u019B\\u019E\\u01A1\\u01A3\\u01A5\\u01A8\\u01AA\\u01AB\\u01AD\\u01B0\\u01B4\\u01B6\\u01B9\\u01BA\\u01BD-\\u01BF\\u01C6\\u01C9\\u01CC\\u01CE\\u01D0\\u01D2\\u01D4\\u01D6\\u01D8\\u01DA\\u01DC\\u01DD\\u01DF\\u01E1\\u01E3\\u01E5\\u01E7\\u01E9\\u01EB\\u01ED\\u01EF\\u01F0\\u01F3\\u01F5\\u01F9\\u01FB\\u01FD\\u01FF\\u0201\\u0203\\u0205\\u0207\\u0209\\u020B\\u020D\\u020F\\u0211\\u0213\\u0215\\u0217\\u0219\\u021B\\u021D\\u021F\\u0221\\u0223\\u0225\\u0227\\u0229\\u022B\\u022D\\u022F\\u0231\\u0233-\\u0239\\u023C\\u023F\\u0240\\u0242\\u0247\\u0249\\u024B\\u024D\\u024F';

/**
 * A regular expression string that matches upper case letters: LATIN
 *
 * @type {string}
 * @ignore
 */
var upperCaseLetter = '\\x41-\\x5a\\xc0-\\xd6\\xd8-\\xde\\u0100\\u0102\\u0104\\u0106\\u0108\\u010a\\u010c\\u010e\\u0110\\u0112\\u0114\\u0116\\u0118\\u011a\\u011c\\u011e\\u0120\\u0122\\u0124\\u0126\\u0128\\u012a\\u012c\\u012e\\u0130\\u0132\\u0134\\u0136\\u0139\\u013b\\u013d\\u013f\\u0141\\u0143\\u0145\\u0147\\u014a\\u014c\\u014e\\u0150\\u0152\\u0154\\u0156\\u0158\\u015a\\u015c\\u015e\\u0160\\u0162\\u0164\\u0166\\u0168\\u016a\\u016c\\u016e\\u0170\\u0172\\u0174\\u0176\\u0178\\u0179\\u017b\\u017d\\u0181\\u0182\\u0184\\u0186\\u0187\\u0189-\\u018b\\u018e-\\u0191\\u0193\\u0194\\u0196-\\u0198\\u019c\\u019d\\u019f\\u01a0\\u01a2\\u01a4\\u01a6\\u01a7\\u01a9\\u01ac\\u01ae\\u01af\\u01b1-\\u01b3\\u01b5\\u01b7\\u01b8\\u01bc\\u01c4\\u01c5\\u01c7\\u01c8\\u01ca\\u01cb\\u01cd\\u01cf\\u01d1\\u01d3\\u01d5\\u01d7\\u01d9\\u01db\\u01de\\u01e0\\u01e2\\u01e4\\u01e6\\u01e8\\u01ea\\u01ec\\u01ee\\u01f1\\u01f2\\u01f4\\u01f6-\\u01f8\\u01fa\\u01fc\\u01fe\\u0200\\u0202\\u0204\\u0206\\u0208\\u020a\\u020c\\u020e\\u0210\\u0212\\u0214\\u0216\\u0218\\u021a\\u021c\\u021e\\u0220\\u0222\\u0224\\u0226\\u0228\\u022a\\u022c\\u022e\\u0230\\u0232\\u023a\\u023b\\u023d\\u023e\\u0241\\u0243-\\u0246\\u0248\\u024a\\u024c\\u024e';

/**
 * Regular expression to match Unicode words
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_WORD = new RegExp('(?:[' + upperCaseLetter + '][' + diacriticalMark + ']*)?(?:[' + lowerCaseLetter + '][' + diacriticalMark + ']*)+|\
(?:[' + upperCaseLetter + '][' + diacriticalMark + ']*)+(?![' + lowerCaseLetter + '])|\
[' + digit + ']+|\
[' + dingbatBlock + ']|\
[^' + nonCharacter + generalPunctuationBlock + whitespace + ']+', 'g');

/**
 * Regular expression to match words from Basic Latin and Latin-1 Supplement blocks
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_LATIN_WORD = /[A-Z\xC0-\xD6\xD8-\xDE]?[a-z\xDF-\xF6\xF8-\xFF]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])|\d+/g;

/**
 * Regular expression to match alpha characters
 *
 * @see http://stackoverflow.com/a/22075070/1894471
 * @type {RegExp}
 * @ignore
 */
var REGEXP_ALPHA = new RegExp('^(?:[' + lowerCaseLetter + upperCaseLetter + '][' + diacriticalMark + ']*)+$');

/**
 * Regular expression to match alpha and digit characters
 *
 * @see http://stackoverflow.com/a/22075070/1894471
 * @type {RegExp}
 * @ignore
 */
var REGEXP_ALPHA_DIGIT = new RegExp('^((?:[' + lowerCaseLetter + upperCaseLetter + '][' + diacriticalMark + ']*)|[' + digit + '])+$');

/**
 * Regular expression to match Extended ASCII characters, i.e. the first 255
 *
 * @type {RegExp}
 * @ignore
 */
var REGEXP_EXTENDED_ASCII = /^[\x00-\xFF]*$/;

/**
 * Verifies if `value` is `undefined` or `null` and returns `defaultValue`. In other case returns `value`.
 *
 * @ignore
 * @function nilDefault
 * @param {*} value The value to verify.
 * @param {*} defaultValue The default value.
 * @return {*} Returns `defaultValue` if `value` is `undefined` or `null`, otherwise `defaultValue`.
 */
function nilDefault(value, defaultValue) {
  return value == null ? defaultValue : value;
}

/**
 * Get the string representation of the `value`.
 * Converts the `value` to string.
 *
 * @ignore
 * @function toString
 * @param {*} value             The value to convert.
 * @return {string|null}        Returns the string representation of `value`.
 */
function toString(value) {
  if (isNil(value)) {
    return null;
  }
  if (isString(value)) {
    return value;
  }
  return String(value);
}

/**
 * Splits `subject` into an array of words.
 *
 * @function words
 * @static
 * @since 1.2.0
 * @memberOf Split
 * @param {string} [subject=''] The string to split into words.
 * @param {string|RegExp} [pattern] The pattern to watch words. If `pattern` is not RegExp, it is transformed to `new RegExp(pattern, flags)`.
 * @param {string} [flags=''] The regular expression flags. Applies when `pattern` is string type.
 * @return {Array} Returns the array of words.
 * @example
 * as.words('gravity can cross dimensions');
 * // => ['gravity', 'can', 'cross', 'dimensions']
 *
 * as.words('GravityCanCrossDimensions');
 * // => ['Gravity', 'Can', 'Cross', 'Dimensions']
 *
 * as.words('Gravity - can cross dimensions!');
 * // => ['Gravity', 'can', 'cross', 'dimensions']
 *
 * as.words('Earth gravity', /[^\s]+/g);
 * // => ['Earth', 'gravity']
 */
function words(subject, pattern, flags) {
  var subjectString = coerceToString(subject);
  var patternRegExp = void 0;
  if (isNil(pattern)) {
    patternRegExp = REGEXP_EXTENDED_ASCII.test(subjectString) ? REGEXP_LATIN_WORD : REGEXP_WORD;
  } else if (pattern instanceof RegExp) {
    patternRegExp = pattern;
  } else {
    var flagsString = toString(nilDefault(flags, ''));
    patternRegExp = new RegExp(toString(pattern), flagsString);
  }
  return nilDefault(subjectString.match(patternRegExp), []);
}

/**
 * Transforms the `word` into camel case chunk.
 *
 * @param  {string} word  The word string
 * @param  {number} index The index of the word in phrase.
 * @return {string}       The transformed word.
 * @ignore
 */
function wordToCamel(word, index) {
  return index === 0 ? lowerCase(word) : capitalize(word, true);
}

/**
 * Converts the `subject` to <a href="https://en.wikipedia.org/wiki/CamelCase">camel case</a>.
 *
 * @function camelCase
 * @static
 * @since 1.2.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to convert to camel case.
 * @return {string}              The camel case string.
 * @example
 * as.camelCase('bird flight');
 * // => 'birdFlight'
 *
 * as.camelCase('BirdFlight');
 * // => 'birdFlight'
 *
 * as.camelCase('-BIRD-FLIGHT-');
 * // => 'birdFlight'
 */
function camelCase(subject) {
  var subjectString = coerceToString(subject);
  if (subjectString === '') {
    return '';
  }
  return arrayMap(words(subjectString), wordToCamel).join('');
}

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
function decapitalize(subject) {
  var subjectString = coerceToString(subject);
  if (subjectString === '') {
    return subjectString;
  }
  return subjectString.substr(0, 1).toLowerCase() + subjectString.substr(1);
}

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
function kebabCase(subject) {
  var subjectString = coerceToString(subject);
  if (subjectString === '') {
    return '';
  }
  return arrayMap(words(subjectString), lowerCase).join('-');
}

/**
 * Converts the `subject` to <a href="https://en.wikipedia.org/wiki/Snake_case">snake case</a>.
 *
 * @function snakeCase
 * @static
 * @since 1.2.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to convert to snake case.
 * @return {string}              Returns the snake case string.
 * @example
 * as.snakeCase('learning to fly');
 * // => 'learning_to_fly'
 *
 * as.snakeCase('LearningToFly');
 * // => 'learning_to_fly'
 *
 * as.snakeCase('-Learning-To-Fly-');
 * // => 'learning_to_fly'
 */
function snakeCase(subject) {
  var subjectString = coerceToString(subject);
  if (subjectString === '') {
    return '';
  }
  return arrayMap(words(subjectString), lowerCase).join('_');
}

/**
 * Converts the `subject` to upper case.
 *
 * @function upperCase
 * @static
 * @since 1.2.0
 * @memberOf Case
 * @param  {string} [subject=''] The string to convert to upper case.
 * @return {string}              Returns the upper case string.
 * @example
 * as.upperCase('school');
 * // => 'SCHOOL'
 */
function upperCase(subject) {
  var subjectString = coerceToString(subject);
  return subjectString.toUpperCase();
}

/**
 * Clip the number to interval `downLimit` to `upLimit`.
 *
 * @ignore
 * @function clipNumber
 * @param {number} value The number to clip
 * @param {number} downLimit The down limit
 * @param {number} upLimit The upper limit
 * @return {number} The clipped number
 */
function clipNumber(value, downLimit, upLimit) {
  if (value <= downLimit) {
    return downLimit;
  }
  if (value >= upLimit) {
    return upLimit;
  }
  return value;
}

/**
 * Max save integer value
 *
 * @ignore
 * @type {number}
 */
var MAX_SAFE_INTEGER = 0x1fffffffffffff;

/**
 * Transforms `value` to an integer.
 *
 * @ignore
 * @function toInteger
 * @param {number} value The number to transform.
 * @returns {number} Returns the transformed integer.
 */
function toInteger(value) {
  if (value === Infinity) {
    return MAX_SAFE_INTEGER;
  }
  if (value === -Infinity) {
    return -MAX_SAFE_INTEGER;
  }
  return ~~value;
}

/**
 * Truncates `subject` to a new `length`.
 *
 * @function truncate
 * @static
 * @since 1.2.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to truncate.
 * @param  {int}    length       The length to truncate the string.
 * @param  {string} [end='...']  The string to be added at the end.
 * @return {string}              Returns the truncated string.
 * @example
 * as.truncate('Once upon a time', 7);
 * // => 'Once...'
 *
 * as.truncate('Good day, Little Red Riding Hood', 14, ' (...)');
 * // => 'Good day (...)'
 *
 * as.truncate('Once upon', 10);
 * // => 'Once upon'
 */
function truncate(subject, length, end) {
  var subjectString = coerceToString(subject);
  var lengthInt = isNil(length) ? subjectString.length : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  var endString = coerceToString(end, '...');
  if (lengthInt >= subjectString.length) {
    return subjectString;
  }
  return subjectString.substr(0, length - endString.length) + endString;
}

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
function charAt(subject, position) {
  var subjectString = coerceToString(subject);
  return subjectString.charAt(position);
}

var HIGH_SURROGATE_START = 0xD800;
var HIGH_SURROGATE_END = 0xDBFF;
var LOW_SURROGATE_START = 0xDC00;
var LOW_SURROGATE_END = 0xDFFF;

/**
 * Checks if `codePoint` is a high-surrogate number from range 0xD800 to 0xDBFF.
 *
 * @ignore
 * @param {number} codePoint The code point number to be verified
 * @return {boolean} Returns a boolean whether `codePoint` is a high-surrogate number.
 */
function isHighSurrogate(codePoint) {
  return codePoint >= HIGH_SURROGATE_START && codePoint <= HIGH_SURROGATE_END;
}

/**
 * Checks if `codePoint` is a low-surrogate number from range 0xDC00 to 0xDFFF.
 *
 * @ignore
 * @param {number} codePoint The code point number to be verified
 * @return {boolean} Returns a boolean whether `codePoint` is a low-surrogate number.
 */
function isLowSurrogate(codePoint) {
  return codePoint >= LOW_SURROGATE_START && codePoint <= LOW_SURROGATE_END;
}

/**
 * Get the astral code point number based on surrogate pair numbers.
 *
 * @ignore
 * @param {number} highSurrogate The high-surrogate code point number.
 * @param {number} lowSurrogate The low-surrogate code point number.
 * @return {number} Returns the astral symbol number.
 */
function getAstralNumberFromSurrogatePair(highSurrogate, lowSurrogate) {
  return (highSurrogate - HIGH_SURROGATE_START) * 0x400 + lowSurrogate - LOW_SURROGATE_START + 0x10000;
}

/**
 * Get the number representation of the `value`.
 * Converts the `value` to number.
 * If `value` is `null` or `undefined`, return `defaultValue`.
 *
 * @ignore
 * @function toString
 * @param {*} value             The value to convert.
 * @param {*} [defaultValue=''] The default value to return.
 * @return {number|null}        Returns the number representation of `value`. Returns `defaultValue` if `value` is
 *                              `null` or `undefined`.
 */
function coerceToNumber(value) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (isNil(value)) {
    return defaultValue;
  }
  if (typeof value === 'number') {
    return value;
  }
  return Number(value);
}

/**
 * If `value` is `NaN`, return `defaultValue`. In other case returns `value`.
 *
 * @ignore
 * @function nanDefault
 * @param {*} value The value to verify.
 * @param {*} defaultValue The default value.
 * @return {*} Returns `defaultValue` if `value` is `NaN`, otherwise `defaultValue`.
 */
function nanDefault(value, defaultValue) {
  return value !== value ? defaultValue : value;
}

/**
 * Get the Unicode code point value of the character at `position`. <br/>
 * If a valid UTF-16 <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#24surrogatepairs">
 * surrogate pair</a> starts at `position`, the
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#astralplanes">astral code point</a>
 * value at `position` is returned.
 *
 * @function codePointAt
 * @static
 * @since 1.2.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to extract from.
 * @param  {number} position The position to get the code point number.
 * @return {number} Returns a non-negative number less than or equal to `0x10FFFF`.
 * @example
 * as.codePointAt('rain', 1);
 * // => 97, or 0x0061
 *
 * as.codePointAt('\uD83D\uDE00 is smile', 0); // or '😀 is smile'
 * // => 128512, or 0x1F600
 */
function codePointAt(subject, position) {
  var subjectString = coerceToString(subject);
  var subjectStringLength = subjectString.length;
  var positionNumber = coerceToNumber(position);
  positionNumber = nanDefault(positionNumber, 0);
  if (positionNumber < 0 || positionNumber >= subjectStringLength) {
    return undefined;
  }
  var firstCodePoint = subjectString.charCodeAt(positionNumber);
  var secondCodePoint = void 0;
  if (isHighSurrogate(firstCodePoint) && subjectStringLength > positionNumber + 1) {
    secondCodePoint = subjectString.charCodeAt(positionNumber + 1);
    if (isLowSurrogate(secondCodePoint)) {
      return getAstralNumberFromSurrogatePair(firstCodePoint, secondCodePoint);
    }
  }
  return firstCodePoint;
}

/**
 * Extracts the first `length` characters from `subject`.
 *
 * @function first
 * @static
 * @since 1.2.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to extract from.
 * @param  {int}    [length=1]   The number of characters to extract.
 * @return {string}              Returns the first characters string.
 * @example
 * as.first('helicopter');
 * // => 'h'
 *
 * as.first('vehicle', 2);
 * // => 've'
 *
 * as.first('car', 5);
 * // => 'car'
 */
function first(subject, length) {
  var subjectString = coerceToString(subject);
  var lengthInt = isNil(length) ? 1 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  if (subjectString.length <= lengthInt) {
    return subjectString;
  }
  return subjectString.substr(0, lengthInt);
}

/**
 * Get a grapheme from `subject` at specified `position` taking care of
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#24surrogatepairs">surrogate pairs</a> and
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#25combiningmarks">combining marks</a>.
 *
 * @function graphemeAt
 * @static
 * @since 1.2.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to extract from.
 * @param  {number} position The position to get the grapheme.
 * @return {string} Returns the grapheme at specified position.
 * @example
 * as.graphemeAt('\uD835\uDC00\uD835\uDC01', 0); // or '𝐀𝐁'
 * // => 'A'
 *
 * as.graphemeAt('cafe\u0301', 3); // or 'café'
 * // => 'é'
 */
function graphemeAt(subject, position) {
  var subjectString = coerceToString(subject);
  var positionNumber = coerceToNumber(position);
  var graphemeMatch = void 0;
  var graphemeMatchIndex = 0;
  positionNumber = nanDefault(positionNumber, 0);
  while ((graphemeMatch = REGEXP_UNICODE_CHARACTER.exec(subjectString)) !== null) {
    if (graphemeMatchIndex === positionNumber) {
      REGEXP_UNICODE_CHARACTER.lastIndex = 0;
      return graphemeMatch[0];
    }
    graphemeMatchIndex++;
  }
  return '';
}

/**
 * Extracts the last `length` characters from `subject`.
 *
 * @function last
 * @static
 * @since 1.2.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to extract from.
 * @param  {int}    [length=1]   The number of characters to extract.
 * @return {string}              Returns the last characters string.
 * @example
 * as.last('helicopter');
 * // => 'r'
 *
 * as.last('vehicle', 2);
 * // => 'le'
 *
 * as.last('car', 5);
 * // => 'car'
 */
function last(subject, length) {
  var subjectString = coerceToString(subject);
  var lengthInt = isNil(length) ? 1 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  if (subjectString.length <= lengthInt) {
    return subjectString;
  }
  return subjectString.substr(subjectString.length - lengthInt, lengthInt);
}

/**
 * Truncates `subject` to a new `length` and does not break the words. Guarantees that the truncated string is no longer
 * than `length`.
 *
 * @static
 * @function prune
 * @since 1.2.0
 * @memberOf Chop
 * @param  {string} [subject=''] The string to prune.
 * @param  {int}    length       The length to prune the string.
 * @param  {string} [end='...']  The string to be added at the end.
 * @return {string}              Returns the pruned string.
 * @example
 * as.prune('Once upon a time', 7);
 * // => 'Once...'
 *
 * as.prune('Good day, Little Red Riding Hood', 16, ' (more)');
 * // => 'Good day (more)'
 *
 * as.prune('Once upon', 10);
 * // => 'Once upon'
 */
function prune(subject, length, end) {
  var subjectString = coerceToString(subject);
  var lengthInt = isNil(length) ? subjectString.length : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  var endString = coerceToString(end, '...');
  if (lengthInt >= subjectString.length) {
    return subjectString;
  }
  var pattern = REGEXP_EXTENDED_ASCII.test(subjectString) ? REGEXP_LATIN_WORD : REGEXP_WORD;
  var truncatedLength = 0;
  subjectString.replace(pattern, function (word, offset) {
    var wordInsertLength = offset + word.length;
    if (wordInsertLength <= lengthInt - endString.length) {
      truncatedLength = wordInsertLength;
    }
  });
  return subjectString.substr(0, truncatedLength) + endString;
}

/**
 * Extracts from `subject` a string from `start` position up to `end` position. The character at `end` position is not
 * included.
 *
 * @function slice
 * @static
 * @since 1.2.0
 * @memberOf Chop
 * @param  {string} [subject='']         The string to extract from.
 * @param  {number} start                The position to start extraction. If negative use `subject.length + start`.
 * @param  {number} [end=subject.length] The position to end extraction. If negative use `subject.length + end`.
 * @return {string}                      Returns the extracted string.
 * @note Uses native `String.prototype.slice()`
 * @example
 * as.slice('miami', 1);
 * // => 'iami'
 *
 * as.slice('florida', -4);
 * // => 'rida'
 *
 * as.slice('florida', 1, 4);
 * // => "lor"
 */
function slice(subject, start, end) {
  return coerceToString(subject).slice(start, end);
}

/**
 * Extracts from `subject` a string from `start` position a number of `length` characters.
 *
 * @function substr
 * @static
 * @since 1.2.0
 * @memberOf Chop
 * @param  {string} [subject='']                 The string to extract from.
 * @param  {number} start                        The position to start extraction.
 * @param  {number} [length=subject.endOfString] The number of characters to extract. If omitted, extract to the end of `subject`.
 * @return {string}                              Returns the extracted string.
 * @note Uses native `String.prototype.substr()`
 * @example
 * as.substr('infinite loop', 9);
 * // => 'loop'
 *
 * as.substr('dreams', 2, 2);
 * // => 'ea'
 */
function substr(subject, start, length) {
  return coerceToString(subject).substr(start, length);
}

/**
 * Extracts from `subject` a string from `start` position up to `end` position. The character at `end` position is not
 * included.
 *
 * @function substring
 * @static
 * @since 1.2.0
 * @memberOf Chop
 * @param  {string} [subject='']         The string to extract from.
 * @param  {number} start                The position to start extraction.
 * @param  {number} [end=subject.length] The position to end extraction.
 * @return {string}                      Returns the extracted string.
 * @note Uses native `String.prototype.substring()`
 * @example
 * as.substring('beach', 1);
 * // => 'each'
 *
 * as.substring('ocean', 1, 3);
 * // => 'ea'
 */
function substring(subject, start, end) {
  return coerceToString(subject).substring(start, end);
}

/**
 * Counts the characters in `subject`.<br/>
 *
 * @function count
 * @static
 * @since 1.2.0
 * @memberOf Count
 * @param  {string} [subject=''] The string to count characters.
 * @return {number}              Returns the number of characters in `subject`.
 * @example
 * as.count('rain');
 * // => 4
 */
function count(subject) {
  return coerceToString(subject).length;
}

/**
 * Counts the graphemes in `subject` taking care of
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#24surrogatepairs">surrogate pairs</a> and
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#25combiningmarks">combining marks</a>.
 *
 * @function  countGraphemes
 * @static
 * @since 1.2.0
 * @memberOf Count
 * @param  {string} [subject=''] The string to count graphemes.
 * @return {number}              Returns the number of graphemes in `subject`.
 * @example
 * as.countGraphemes('cafe\u0301'); // or 'café'
 * // => 4
 *
 * as.countGraphemes('\uD835\uDC00\uD835\uDC01'); // or '𝐀𝐁'
 * // => 2
 *
 * as.countGraphemes('rain');
 * // => 4
 */
function countGrapheme(subject) {
  return coerceToString(subject).replace(REGEXP_COMBINING_MARKS, '*').replace(REGEXP_SURROGATE_PAIRS, '*').length;
}

/**
 * Counts the number of `substring` appearances in `subject`.
 *
 * @function countSubstrings
 * @static
 * @since 1.2.0
 * @memberOf Count
 * @param  {string} [subject=''] The string where to count.
 * @param  {string} substring    The substring to be counted.
 * @return {number}              Returns the number of `substring` appearances.
 * @example
 * as.countSubstrings('bad boys, bad boys whatcha gonna do?', 'boys');
 * // => 2
 *
 * as.countSubstrings('every dog has its day', 'cat');
 * // => 0
 */
function countSubstrings(subject, substring) {
  var subjectString = coerceToString(subject);
  var substringString = coerceToString(substring);
  var substringLength = substringString.length;
  var count = 0;
  var matchIndex = 0;
  if (subjectString === '' || substringString === '') {
    return count;
  }
  do {
    matchIndex = subjectString.indexOf(substringString, matchIndex);
    if (matchIndex !== -1) {
      count++;
      matchIndex += substringLength;
    }
  } while (matchIndex !== -1);
  return count;
}

function functionBind(oThis) {
  if (typeof this !== 'function') {
    // closest thing possible to the ECMAScript 5
    // internal IsCallable function
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
  }

  var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function () {},
      fBound = function () {
    return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
  };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();

  return fBound;
}

function stringReduce(subject, callback, initialValue) {
  if (!isFunction(callback)) {
    throw Error(callback + ' is not a function');
  }
  var applyInitial = !isNil(initialValue);

  var string = coerceToString(subject);
  var arr = string.split('');

  if (!applyInitial && arr.length === 0) {
    throw Error('Reduce of empty array with no initial value');
  }

  var reduceVal = applyInitial ? initialValue : arr[0];
  var index = applyInitial ? 0 : 1;

  for (; index < arr.length; index++) {
    reduceVal = callback(reduceVal, arr[index], index, arr);
  }

  return reduceVal;
}

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
function countWhere(subject, predicate, context) {
  var subjectString = coerceToString(subject);
  if (subjectString === '' || typeof predicate !== 'function') {
    return 0;
  }
  if (!predicate.prototype.bind) {
    predicate.prototype.bind = functionBind;
  }
  var predicateWithContext = predicate.bind(context);
  return stringReduce(subjectString, function (countTruthy, character, index) {
    return predicateWithContext(character, index, subjectString) ? countTruthy + 1 : countTruthy;
  }, 0);
}

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
function countWords(subject, pattern, flags) {
  return words(subject, pattern, flags).length;
}

/**
 * The current index.
 *
 * @ignore
 * @name ReplacementIndex#index
 * @type {number}
 * @return {ReplacementIndex} ReplacementIndex instance.
 */
function ReplacementIndex() {
  this.index = 0;
}

/**
 * Increment the current index.
 *
 * @ignore
 * @return {undefined}
 */
ReplacementIndex.prototype.increment = function () {
  this.index++;
};

/**
 * Increment the current index by position.
 *
 * @ignore
 * @param {number} [position] The replacement position.
 * @return {undefined}
 */
ReplacementIndex.prototype.incrementOnEmptyPosition = function (position) {
  if (isNil(position)) {
    this.increment();
  }
};

/**
 * Get the replacement index by position.
 *
 * @ignore
 * @param {number} [position] The replacement position.
 * @return {number} The replacement index.
 */
ReplacementIndex.prototype.getIndexByPosition = function (position) {
  return isNil(position) ? this.index : position - 1;
};

var Const = Object.freeze({
  // Type specifiers
  TYPE_INTEGER: 'i',
  TYPE_INTEGER_BINARY: 'b',
  TYPE_INTEGER_ASCII_CHARACTER: 'c',
  TYPE_INTEGER_DECIMAL: 'd',
  TYPE_INTEGER_OCTAL: 'o',
  TYPE_INTEGER_UNSIGNED_DECIMAL: 'u',
  TYPE_INTEGER_HEXADECIMAL: 'x',
  TYPE_INTEGER_HEXADECIMAL_UPPERCASE: 'X',
  TYPE_FLOAT_SCIENTIFIC: 'e',
  TYPE_FLOAT_SCIENTIFIC_UPPERCASE: 'E',
  TYPE_FLOAT: 'f',
  TYPE_FLOAT_SHORT: 'g',
  TYPE_FLOAT_SHORT_UPPERCASE: 'G',
  TYPE_STRING: 's',

  // Simple literals
  LITERAL_PERCENT: '%',
  LITERAL_SINGLE_QUOTE: "'",
  LITERAL_PLUS: '+',
  LITERAL_MINUS: '-',
  LITERAL_PERCENT_SPECIFIER: '%%',

  // Radix constants to format numbers
  RADIX_BINARY: 2,
  RADIX_OCTAL: 8,
  RADIX_DECIMAL: 10,
  RADIX_HEXADECIMAL: 16
});

/**
 * Repeats the `subject` number of `times`.
 *
 * @function repeat
 * @static
 * @since 1.2.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to repeat.
 * @param {number} [times=1] The number of times to repeat.
 * @return {string} Returns the repeated string.
 * @example
 * as.repeat('w', 3);
 * // => 'www'
 *
 * as.repeat('world', 0);
 * // => ''
 */
function repeat(subject, times) {
  var subjectString = coerceToString(subject);
  var timesInt = isNil(times) ? 1 : clipNumber(toInteger(times), 0, MAX_SAFE_INTEGER);
  var repeatString = '';
  while (timesInt) {
    if (timesInt & 1) {
      repeatString += subjectString;
    }
    if (timesInt > 1) {
      subjectString += subjectString;
    }
    timesInt >>= 1;
  }
  return repeatString;
}

/**
 * Creates the padding string.
 *
 * @ignore
 * @param {string} padCharacters The characters to create padding string.
 * @param {number} length The padding string length.
 * @return {string} The padding string.
 */
function buildPadding(padCharacters, length) {
  var padStringRepeat = toInteger(length / padCharacters.length);
  var padStringRest = length % padCharacters.length;
  return repeat(padCharacters, padStringRepeat + padStringRest).substr(0, length);
}

/**
 * Pads `subject` from left to a new `length`.
 *
 * @function padLeft
 * @static
 * @since 1.2.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to pad.
 * @param {int} [length=0] The length to left pad the string. No changes are made if `length` is less than `subject.length`.
 * @param {string} [pad=' '] The string to be used for padding.
 * @return {string} Returns the left padded string.
 * @example
 * as.padLeft('dog', 5);
 * // => '  dog'
 *
 * as.padLeft('bird', 6, '-');
 * // => '--bird'
 *
 * as.padLeft('cat', 6, '-=');
 * // => '-=-cat'
 */
function padLeft(subject, length, pad) {
  var subjectString = coerceToString(subject);
  var lengthInt = isNil(length) ? 0 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  var padString = coerceToString(pad, ' ');
  if (lengthInt <= subjectString.length) {
    return subjectString;
  }
  return buildPadding(padString, lengthInt - subjectString.length) + subjectString;
}

/**
 * Pads `subject` from right to a new `length`.
 *
 * @function padRight
 * @static
 * @since 1.2.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to pad.
 * @param {int} [length=0] The length to right pad the string. No changes are made if `length` is less than `subject.length`.
 * @param {string} [pad=' '] The string to be used for padding.
 * @return {string} Returns the right padded string.
 * @example
 * as.padRight('dog', 5);
 * // => 'dog  '
 *
 * as.padRight('bird', 6, '-');
 * // => 'bird--'
 *
 * as.padRight('cat', 6, '-=');
 * // => 'cat-=-'
 */
function padRight(subject, length, pad) {
  var subjectString = coerceToString(subject);
  var lengthInt = isNil(length) ? 0 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  var padString = coerceToString(pad, ' ');
  if (lengthInt <= subjectString.length) {
    return subjectString;
  }
  return subjectString + buildPadding(padString, lengthInt - subjectString.length);
}

/**
 * Aligns and pads `subject` string.
 *
 * @ignore
 * @param {string} subject The subject string.
 * @param {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the aligned and padded string.
 */
function alignAndPad(subject, conversion) {
  var width = conversion.width;
  if (isNil(width) || subject.length >= width) {
    return subject;
  }
  var padType = conversion.alignmentSpecifier === Const.LITERAL_MINUS ? padRight : padLeft;
  return padType(subject, width, conversion.getPaddingCharacter());
}

/**
 * Add sign to the formatted number.
 *
 * @ignore
 * @name addSignToFormattedNumber
 * @param  {number} replacementNumber The number to be replaced.
 * @param  {string} formattedReplacement The formatted version of number.
 * @param  {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the formatted number string with a sign.
 */
function addSignToFormattedNumber(replacementNumber, formattedReplacement, conversion) {
  if (conversion.signSpecifier === Const.LITERAL_PLUS && replacementNumber >= 0) {
    formattedReplacement = Const.LITERAL_PLUS + formattedReplacement;
  }
  return formattedReplacement;
}

/**
 * Formats a float type according to specifiers.
 *
 * @ignore
 * @param  {string} replacement The string to be formatted.
 * @param  {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the formatted string.
 */

function float(replacement, conversion) {
  var replacementNumber = parseFloat(replacement);
  var formattedReplacement = void 0;
  if (isNaN(replacementNumber)) {
    replacementNumber = 0;
  }
  var precision = coerceToNumber(conversion.precision, 6);
  switch (conversion.typeSpecifier) {
    case Const.TYPE_FLOAT:
      formattedReplacement = replacementNumber.toFixed(precision);
      break;
    case Const.TYPE_FLOAT_SCIENTIFIC:
      formattedReplacement = replacementNumber.toExponential(precision);
      break;
    case Const.TYPE_FLOAT_SCIENTIFIC_UPPERCASE:
      formattedReplacement = replacementNumber.toExponential(precision).toUpperCase();
      break;
    case Const.TYPE_FLOAT_SHORT:
    case Const.TYPE_FLOAT_SHORT_UPPERCASE:
      formattedReplacement = formatFloatAsShort(replacementNumber, precision, conversion);
      break;
  }
  formattedReplacement = addSignToFormattedNumber(replacementNumber, formattedReplacement, conversion);
  return coerceToString(formattedReplacement);
}

/**
 * Formats the short float.
 *
 * @ignore
 * @param  {number} replacementNumber The number to format.
 * @param  {number} precision The precision to format the float.
 * @param  {ConversionSpecification} conversion The conversion specification object.
 * @return {string}  Returns the formatted short float.
 */
function formatFloatAsShort(replacementNumber, precision, conversion) {
  if (replacementNumber === 0) {
    return '0';
  }
  var nonZeroPrecision = precision === 0 ? 1 : precision;
  var formattedReplacement = replacementNumber.toPrecision(nonZeroPrecision).replace(REGEXP_TRAILING_ZEROS, '');
  if (conversion.typeSpecifier === Const.TYPE_FLOAT_SHORT_UPPERCASE) {
    formattedReplacement = formattedReplacement.toUpperCase();
  }
  return formattedReplacement;
}

/**
 * Formats an integer type according to specifiers.
 *
 * @ignore
 * @param  {string} replacement The string to be formatted.
 * @param  {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the formatted string.
 */

function integerBase(replacement, conversion) {
  var integer = parseInt(replacement);
  if (isNaN(integer)) {
    integer = 0;
  }
  integer = integer >>> 0;
  switch (conversion.typeSpecifier) {
    case Const.TYPE_INTEGER_ASCII_CHARACTER:
      integer = String.fromCharCode(integer);
      break;
    case Const.TYPE_INTEGER_BINARY:
      integer = integer.toString(Const.RADIX_BINARY);
      break;
    case Const.TYPE_INTEGER_OCTAL:
      integer = integer.toString(Const.RADIX_OCTAL);
      break;
    case Const.TYPE_INTEGER_HEXADECIMAL:
      integer = integer.toString(Const.RADIX_HEXADECIMAL);
      break;
    case Const.TYPE_INTEGER_HEXADECIMAL_UPPERCASE:
      integer = integer.toString(Const.RADIX_HEXADECIMAL).toUpperCase();
      break;
  }
  return coerceToString(integer);
}

/**
 * Formats a decimal integer type according to specifiers.
 *
 * @ignore
 * @param  {string} replacement The string to be formatted.
 * @param  {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the formatted string.
 */

function integerDecimal(replacement, conversion) {
  var integer = parseInt(replacement);
  if (isNaN(integer)) {
    integer = 0;
  }
  return addSignToFormattedNumber(integer, toString(integer), conversion);
}

/**
 * Formats a string type according to specifiers.
 *
 * @ignore
 * @param {string} replacement The string to be formatted.
 * @param {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the formatted string.
 */
function stringFormat(replacement, conversion) {
  var formattedReplacement = replacement;
  var precision = conversion.precision;
  if (!isNil(precision) && formattedReplacement.length > precision) {
    formattedReplacement = truncate(formattedReplacement, precision, '');
  }
  return formattedReplacement;
}

/**
 * Returns the computed string based on format specifiers.
 *
 * @ignore
 * @name computeReplacement
 * @param {string} replacement The replacement value.
 * @param {ConversionSpecification} conversion The conversion specification object.
 * @return {string} Returns the computed string.
 */
function compute(replacement, conversion) {
  var formatFunction = void 0;
  switch (conversion.typeSpecifier) {
    case Const.TYPE_STRING:
      formatFunction = stringFormat;
      break;
    case Const.TYPE_INTEGER_DECIMAL:
    case Const.TYPE_INTEGER:
      formatFunction = integerDecimal;
      break;
    case Const.TYPE_INTEGER_ASCII_CHARACTER:
    case Const.TYPE_INTEGER_BINARY:
    case Const.TYPE_INTEGER_OCTAL:
    case Const.TYPE_INTEGER_HEXADECIMAL:
    case Const.TYPE_INTEGER_HEXADECIMAL_UPPERCASE:
    case Const.TYPE_INTEGER_UNSIGNED_DECIMAL:
      formatFunction = integerBase;
      break;
    case Const.TYPE_FLOAT:
    case Const.TYPE_FLOAT_SCIENTIFIC:
    case Const.TYPE_FLOAT_SCIENTIFIC_UPPERCASE:
    case Const.TYPE_FLOAT_SHORT:
    case Const.TYPE_FLOAT_SHORT_UPPERCASE:
      formatFunction = float;
      break;
  }
  var formattedString = formatFunction(replacement, conversion);
  return alignAndPad(formattedString, conversion);
}

/**
 * Construct the new conversion specification object.
 *
 * @ignore
 * @param {Object} properties An object with properties to initialize.
 * @return {ConversionSpecification} ConversionSpecification instance.
 */
function ConversionSpecification(properties) {

  /**
   * The percent characters from conversion specification.
   *
   * @ignore
   * @name ConversionSpecification#percent
   * @type {string}
   */
  this.percent = properties.percent;

  /**
   *  The sign specifier to force a sign to be used on a number.
   *
   * @ignore
   * @name ConversionSpecification#signSpecifier
   * @type {string}
   */
  this.signSpecifier = properties.signSpecifier;

  /**
   * The padding specifier that says what padding character will be used.
   *
   * @ignore
   * @name ConversionSpecification#paddingSpecifier
   * @type {string}
   */
  this.paddingSpecifier = properties.paddingSpecifier;

  /**
   * The alignment specifier that says if the result should be left-justified or right-justified.
   *
   * @ignore
   * @name ConversionSpecification#alignmentSpecifier
   * @type {string}
   */
  this.alignmentSpecifier = properties.alignmentSpecifier;

  /**
   * The width specifier how many characters this conversion should result in.
   *
   * @ignore
   * @name ConversionSpecification#width
   * @type {number}
   */
  this.width = properties.width;

  /**
   * The precision specifier says how many decimal digits should be displayed for floating-point numbers.
   *
   * @ignore
   * @name ConversionSpecification#precision
   * @type {number}
   */
  this.precision = properties.precision;

  /**
   * The type specifier says what type the argument data should be treated as.
   *
   * @ignore
   * @name ConversionSpecification#typeSpecifier
   * @type {string}
   */
  this.typeSpecifier = properties.typeSpecifier;
}

/**
 * Check if the conversion specification is a percent literal "%%".
 *
 * @ignore
 * @return {boolean} Returns true if the conversion is a percent literal, false otherwise.
 */
ConversionSpecification.prototype.isPercentLiteral = function () {
  return Const.LITERAL_PERCENT_SPECIFIER === this.percent;
};

/**
 * Get the padding character from padding specifier.
 *
 * @ignore
 * @returns {string} Returns the padding character.
 */
ConversionSpecification.prototype.getPaddingCharacter = function () {
  var paddingCharacter = nilDefault(this.paddingSpecifier, ' ');
  if (paddingCharacter.length === 2 && paddingCharacter[0] === Const.LITERAL_SINGLE_QUOTE) {
    paddingCharacter = paddingCharacter[1];
  }
  return paddingCharacter;
};

/**
 * Validates the specifier type and replacement position.
 *
 * @ignore
 * @throws {Error} Throws an exception on insufficient arguments or unknown specifier.
 * @param  {number} index The index of the matched specifier.
 * @param  {number} replacementsLength The number of replacements.
 * @param  {ConversionSpecification} conversion The conversion specification object.
 * @return {undefined}
 */
function validate(index, replacementsLength, conversion) {
  if (isNil(conversion.typeSpecifier)) {
    throw new Error('sprintf(): Unknown type specifier');
  }
  if (index > replacementsLength - 1) {
    throw new Error('sprintf(): Too few arguments');
  }
  if (index < 0) {
    throw new Error('sprintf(): Argument number must be greater than zero');
  }
}

/**
 * Return the replacement for regular expression match of the conversion specification.
 *
 * @ignore
 * @name matchReplacement
 * @param {ReplacementIndex} replacementIndex The replacement index object.
 * @param {string[]} replacements The array of replacements.
 * @param {string} conversionSpecification The conversion specification.
 * @param {string} percent The percent characters from conversion specification.
 * @param {string} position The position to insert the replacement.
 * @param {string} signSpecifier The sign specifier to force a sign to be used on a number.
 * @param {string} paddingSpecifier The padding specifier that says what padding character will be used.
 * @param {string} alignmentSpecifier The alignment specifier that says if the result should be left-justified or right-justified.
 * @param {string} widthSpecifier The width specifier how many characters this conversion should result in.
 * @param {string} precisionSpecifier The precision specifier says how many decimal digits should be displayed for floating-point numbers.
 * @param {string} typeSpecifier The type specifier says what type the argument data should be treated as.
 * @return {string} Returns the computed replacement.
 */
function match(replacementIndex, replacements, conversionSpecification, percent, position, signSpecifier, paddingSpecifier, alignmentSpecifier, widthSpecifier, precisionSpecifier, typeSpecifier) {
  var conversion = new ConversionSpecification({
    percent: percent,
    signSpecifier: signSpecifier,
    paddingSpecifier: paddingSpecifier,
    alignmentSpecifier: alignmentSpecifier,
    width: coerceToNumber(widthSpecifier, null),
    precision: coerceToNumber(precisionSpecifier, null),
    typeSpecifier: typeSpecifier
  });
  if (conversion.isPercentLiteral()) {
    return conversionSpecification.slice(1);
  }
  var actualReplacementIndex = replacementIndex.getIndexByPosition(position);
  replacementIndex.incrementOnEmptyPosition(position);
  validate(actualReplacementIndex, replacements.length, conversion);
  return compute(replacements[actualReplacementIndex], conversion);
}

/**
 * Produces a string according to `format`.
 *
 * <div id="sprintf-format" class="smaller">
 * `format` string is composed of zero or more directives: ordinary characters (not <code>%</code>), which are  copied  unchanged
 * to  the  output string and <i>conversion specifications</i>, each of which results in fetching zero or more subsequent
 * arguments. <br/> <br/>
 *
 * Each <b>conversion specification</b> is introduced by the character <code>%</code>, and ends with a <b>conversion
 * specifier</b>. In between there may be (in this order) zero or more <b>flags</b>, an optional <b>minimum field width</b>
 * and an optional <b>precision</b>.<br/>
 * The syntax is: <b>ConversionSpecification</b> = <b>"%"</b> { <b>Flags</b> }
 * [ <b>MinimumFieldWidth</b> ] [ <b>Precision</b> ] <b>ConversionSpecifier</b>, where curly braces { } denote repetition
 * and square brackets [ ] optionality. <br/><br/>
 *
 * By default, the arguments are used in the given order.<br/>
 * For argument numbering and swapping, `%m$` (where `m` is a number indicating the argument order)
 * is used instead of `%` to specify explicitly which argument is taken. For instance `%1$s` fetches the 1st argument,
 * `%2$s` the 2nd and so on, no matter what position  the conversion specification has in `format`.
 * <br/><br/>
 *
 * <b>The flags</b><br/>
 * The character <code>%</code> is followed by zero or more of the following flags:<br/>
 * <table class="light-params">
 *   <tr>
 *     <td><code>+</code></td>
 *     <td>
 *       A  sign (<code>+</code> or <code>-</code>) should always be placed before a number produced by a
 *       signed conversion. By default a sign is used only for negative numbers.
 *     </td>
 *   </tr>
 *   <tr>
 *     <td><code>0</code></td>
 *     <td>The value should be zero padded.</td>
 *   </tr>
 *   <tr>
 *     <td><code>&blank;</code></td>
 *     <td>(a space) The value should be space padded.</td>
 *   </tr>
 *   <tr>
 *    <td><code>'</code></td>
 *    <td>Indicates alternate padding character, specified by prefixing it with a single quote <code>'</code>.</td>
 *   </tr>
 *   <tr>
 *     <td><code>-</code></td>
 *     <td>The converted value is to be left adjusted on the field boundary (the default is right justification).</td>
 *   </tr>
 * </table>
 *
 * <b>The minimum field width</b><br/>
 * An  optional decimal digit string (with nonzero first digit) specifying a minimum field width.  If the converted
 * value has fewer characters than the field width, it will be padded with spaces on the left (or right, if the
 * left-adjustment flag has been given).<br/><br/>
 *
 * <b>The precision</b><br/>
 * An optional precision, in the form of a period `.` followed by an optional decimal digit string.<br/>
 * This gives the number of digits to appear after the radix character for `e`, `E`, `f` and `F` conversions, the
 * maximum number of significant digits for `g` and `G` conversions or the maximum number of characters to be printed
 * from a string for `s` conversion.<br/><br/>
 *
 * <b>The conversion specifier</b><br/>
 * A specifier that mentions what type the argument should be treated as:
 *
 * <table class="light-params">
 *   <tr>
 *     <td>`s`</td>
 *     <td>The string argument is treated as and presented as a string.</td>
 *   </tr>
 *   <tr>
 *     <td>`d` `i`</td>
 *     <td>The integer argument is converted to signed decimal notation.</td>
 *   </tr>
 *   <tr>
 *     <td>`b`</td>
 *     <td>The unsigned integer argument is converted to unsigned binary.</td>
 *   </tr>
 *   <tr>
 *     <td>`c`</td>
 *     <td>The unsigned integer argument is converted to an ASCII character with that number.</td>
 *   </tr>
 *   <tr>
 *     <td>`o`</td>
 *     <td>The unsigned integer argument is converted to unsigned octal.</td>
 *   </tr>
 *   <tr>
 *     <td>`u`</td>
 *     <td>The unsigned integer argument is converted to unsigned decimal.</td>
 *   </tr>
 *   <tr>
 *     <td>`x` `X`</td>
 *     <td>The unsigned integer argument is converted to unsigned hexadecimal. The letters `abcdef` are used for `x`
 *     conversions; the letters `ABCDEF` are used for `X` conversions.</td>
 *   </tr>
 *   <tr>
 *     <td>`f`</td>
 *     <td>
 *      The float argument is rounded and converted to decimal notation in the style `[-]ddd.ddd`, where the number of
 *      digits after the decimal-point character is equal to the precision specification. If the precision is missing,
 *      it is taken as 6; if the precision is explicitly zero, no decimal-point character appears.
 *      If a decimal point appears, at least one digit appears before it.
 *     </td>
 *   </tr>
 *   <tr>
 *     <td>`e` `E`</td>
 *     <td>
 *       The float argument is rounded and converted in the style `[-]d.ddde±dd`, where there is one digit
 *       before the decimal-point character and the number of digits after it is equal to the precision. If
 *       the precision is missing, it is taken as `6`; if the precision is zero, no decimal-point character
 *       appears. An `E` conversion uses the letter `E` (rather than `e`) to introduce the exponent.
 *     </td>
 *   </tr>
 *   <tr>
 *     <td>`g` `G`</td>
 *     <td>
 *       The float argument is converted in style `f` or `e` (or `F` or `E` for `G` conversions). The precision specifies
 *       the number of significant digits. If the precision is missing, `6` digits are given; if the
 *       precision is zero, it is treated as `1`. Style `e` is used if the exponent from its conversion is less
 *       than `-6` or greater than or equal to the precision. Trailing zeros are removed from the fractional
 *       part of the result; a decimal point appears only if it is followed by at least one digit.
 *     </td>
 *   </tr>
 *   <tr>
 *     <td>`%`</td>
 *     <td>A literal `%` is written. No argument is converted. The complete conversion specification is `%%`.</td>
 *   </tr>
 *
 * </table>
 * </div>
 *
 * @function sprintf
 * @static
 * @since 1.2.0
 * @memberOf Format
 * @param  {string} [format=''] The format string.
 * @param  {...*}               replacements The replacements to produce the string.
 * @return {string}             Returns the produced string.
 * @example
 * as.sprintf('%s, %s!', 'Hello', 'World');
 * // => 'Hello World!'
 *
 * as.sprintf('%s costs $%d', 'coffee', 2);
 * // => 'coffee costs $2'
 *
 * as.sprintf('%1$s %2$s %1$s %2$s, watcha gonna %3$s', 'bad', 'boys', 'do')
 * // => 'bad boys bad boys, watcha gonna do'
 *
 * as.sprintf('% 6s', 'bird');
 * // => '  bird'
 *
 * as.sprintf('% -6s', 'crab');
 * // => 'crab  '
 *
 * as.sprintf("%'*5s", 'cat');
 * // => '**cat'
 *
 * as.sprintf("%'*-6s", 'duck');
 * // => 'duck**'
 *
 * as.sprintf('%d %i %+d', 15, -2, 25);
 * // => '15 -2 +25'
 *
 * as.sprintf("%06d", 15);
 * // => '000015'
 *
 * as.sprintf('0b%b 0o%o 0x%X', 12, 9, 155);
 * // => '0b1100 0o11 0x9B'
 *
 * as.sprintf('%.2f', 10.469);
 * // => '10.47'
 *
 * as.sprintf('%.2e %g', 100.5, 0.455);
 * // => '1.01e+2 0.455'
 * 
 */
function sprintf(format) {
  var formatString = coerceToString(format);
  if (formatString === '') {
    return formatString;
  }
  if (!match.prototype.bind) {
    match.prototype.bind = functionBind;
  }

  for (var _len = arguments.length, replacements = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    replacements[_key - 1] = arguments[_key];
  }

  var boundReplacementMatch = match.bind(undefined, new ReplacementIndex(), replacements);
  return formatString.replace(REGEXP_CONVERSION_SPECIFICATION, boundReplacementMatch);
}

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Produces a string according to `format`. Works exactly like <a href="#sprintf"><code>sprintf()</code></a>,
 * with the only difference that accepts the formatting arguments in an array `values`.<br/>
 * See <a href="#sprintf-format">here</a> `format` string specifications.
 *
 * @function vprintf
 * @static
 * @since 1.2.0
 * @memberOf Format
 * @param  {string} format='']  The format string.
 * @param  {Array} replacements The array of replacements to produce the string.
 * @return {string}             Returns the produced string.
 * @example
 * as.vprintf('%s', ['Welcome'])
 * // => 'Welcome'
 *
 * as.vprintf('%s has %d apples', ['Alexandra', 3]);
 * // => 'Alexandra has 3 apples'
 */
function vprintf(format, replacements) {
  return sprintf.apply(undefined, [format].concat(_toConsumableArray(nilDefault(replacements, []))));
}

var escapeCharactersMap = {
  '<': '&lt;',
  '>': '&gt;',
  '&': '&amp;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;'
};

/**
 * Return the escaped version of `character`.
 *
 * @ignore
 * @param  {string} character The character to be escape.
 * @return {string}           The escaped version of character.
 */
function replaceSpecialCharacter(character) {
  return escapeCharactersMap[character];
}

/**
 * Escapes HTML special characters  <code>< > & ' " `</code> in <code>subject</code>.
 *
 * @function escapeHtml
 * @static
 * @since 1.2.0
 * @memberOf Escape
 * @param {string} [subject=''] The string to escape.
 * @return {string} Returns the escaped string.
 * @example
 * as.escapeHtml('<p>wonderful world</p>');
 * // => '&lt;p&gt;wonderful world&lt;/p&gt;'
 */
function escapeHtml(subject) {
  return coerceToString(subject).replace(REGEXP_HTML_SPECIAL_CHARACTERS, replaceSpecialCharacter);
}

/**
 * Escapes the regular expression special characters `- [ ] / { } ( ) * + ? . \ ^ $ |` in `subject`.
 *
 * @function escapeRegExp
 * @static
 * @since 1.2.0
 * @memberOf Escape
 * @param {string} [subject=''] The string to escape.
 * @return {string} Returns the escaped string.
 * @example
 * as.escapeRegExp('(hours)[minutes]{seconds}');
 * // => '\(hours\)\[minutes\]\{seconds\}'
 */
function escapeRegExp(subject) {
  return coerceToString(subject).replace(REGEXP_SPECIAL_CHARACTERS, '\\$&');
}

function arrayReduce(arr, callback, initialValue) {
  if (!isArray(arr)) {
    throw Error(arr + ' is not an array');
  }
  if (!isFunction(callback)) {
    throw Error(callback + ' is not a function');
  }
  var applyInitial = !isNil(initialValue);

  if (!applyInitial && arr.length === 0) {
    throw Error('Reduce of empty array with no initial value');
  }

  var reduceVal = applyInitial ? initialValue : arr[0];
  var index = applyInitial ? 0 : 1;

  for (; index < arr.length; index++) {
    reduceVal = callback(reduceVal, arr[index], index, arr);
  }

  return reduceVal;
}

function objectKeys(obj) {
  var keys = [];
  if (!isNil(obj) && typeof obj === 'object') {
    for (var key in obj) {
      keys.push(key);
    }
  }

  return keys;
}

var unescapeCharactersMap = {
  '<': /(&lt;)|(&#x0*3c;)|(&#0*60;)/gi,
  '>': /(&gt;)|(&#x0*3e;)|(&#0*62;)/gi,
  '&': /(&amp;)|(&#x0*26;)|(&#0*38;)/gi,
  '"': /(&quot;)|(&#x0*22;)|(&#0*34;)/gi,
  "'": /(&#x0*27;)|(&#0*39;)/gi,
  '`': /(&#x0*60;)|(&#0*96;)/gi
};
var characters = objectKeys(unescapeCharactersMap);

/**
 * Replaces the HTML entities with corresponding characters.
 *
 * @ignore
 * @param  {string} string The accumulator string.
 * @param  {string} key    The character.
 * @return {string}        The string with replaced HTML entity
 */
function reduceUnescapedString(string, key) {
  return string.replace(unescapeCharactersMap[key], key);
}

/**
 * Unescapes HTML special characters from <code>&amp;lt; &amp;gt; &amp;amp; &amp;quot; &amp;#x27; &amp;#x60;</code>
 * to corresponding <code>< > & ' " `</code> in <code>subject</code>.
 *
 * @function unescapeHtml
 * @static
 * @since 1.2.0
 * @memberOf Escape
 * @param  {string} [subject=''] The string to unescape.
 * @return {string}              Returns the unescaped string.
 * @example
 * as.unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;');
 * // => '<p>wonderful world</p>'
 */
function unescapeHtml(subject) {
  var subjectString = coerceToString(subject);
  return arrayReduce(characters, reduceUnescapedString, subjectString);
}

/**
 * Returns the first occurrence index of `search` in `subject`.
 *
 * @function indexOf
 * @static
 * @since 1.2.0
 * @memberOf Index
 * @param {string} [subject=''] The string where to search.
 * @param {string} search The string to search.
 * @param {number} [fromIndex=0] The index to start searching.
 * @return {number} Returns the first occurrence index or `-1` if not found.
 * @example
 * as.indexOf('morning', 'n');
 * // => 3
 *
 * as.indexOf('evening', 'o');
 * // => -1
 */
function indexOf(subject, search, fromIndex) {
  var subjectString = coerceToString(subject);
  return subjectString.indexOf(search, fromIndex);
}

/**
 * Returns the last occurrence index of `search` in `subject`.
 *
 * @function lastIndexOf
 * @static
 * @since 1.2.0
 * @memberOf Index
 * @param {string} [subject=''] The string where to search.
 * @param {string} search The string to search.
 * @param {number} [fromIndex=subject.length - 1] The index to start searching backward in the string.
 * @return {number} Returns the last occurrence index or `-1` if not found.
 * @example
 * as.lastIndexOf('morning', 'n');
 * // => 5
 *
 * as.lastIndexOf('evening', 'o');
 * // => -1
 */
function lastIndexOf(subject, search, fromIndex) {
  var subjectString = coerceToString(subject);
  return subjectString.lastIndexOf(search, fromIndex);
}

/**
 * Returns the first index of a `pattern` match in `subject`.
 *
 * @function search
 * @static
 * @since 1.2.0
 * @memberOf Index
 * @param {string} [subject=''] The string where to search.
 * @param {string|RegExp} pattern The pattern to match. If `pattern` is not RegExp, it is transformed to `new RegExp(pattern)`.
 * @param {number} [fromIndex=0] The index to start searching.
 * @return {number} Returns the first match index or `-1` if not found.
 * @example
 * as.search('morning', /rn/);
 * // => 2
 *
 * as.search('evening', '/\d/');
 * // => -1
 */
function search(subject, pattern, fromIndex) {
  var subjectString = coerceToString(subject);
  var fromIndexNumber = isNil(fromIndex) ? 0 : clipNumber(toInteger(fromIndex), 0, subjectString.length);
  var matchIndex = subjectString.substr(fromIndexNumber).search(pattern);
  if (matchIndex !== -1 && !isNaN(fromIndexNumber)) {
    matchIndex += fromIndexNumber;
  }
  return matchIndex;
}

/**
 * Inserts into `subject` a string `toInsert` at specified `position`.
 *
 * @function insert
 * @static
 * @since 1.2.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string where to insert.
 * @param {string} [toInsert=''] The string to be inserted.
 * @param {number} [position=0] The position to insert.
 * @return {string} Returns the string after insertion.
 * @example
 * as.insert('ct', 'a', 1);
 * // => 'cat'
 *
 * as.insert('sunny', ' day', 5);
 * // => 'sunny day'
 */
function insert(subject, toInsert, position) {
  var subjectString = coerceToString(subject);
  var toInsertString = coerceToString(toInsert);
  var positionNumber = coerceToNumber(position);
  if (positionNumber < 0 || positionNumber > subjectString.length || toInsertString === '') {
    return subjectString;
  }
  return subjectString.slice(0, positionNumber) + toInsertString + subjectString.slice(positionNumber);
}

/**
 * Generated diacritics map. See bellow the base code.
 * @ignore
 * @see http://stackoverflow.com/a/18391901/1894471
 * @type Object
 */

var diacritics = {
  "3": "\u039e\u03be",
  "8": "\u0398\u03b8",
  "A": "\x41\xc0\xc1\xc2\xc3\xc4\xc5\u0100\u0102\u0104\u01cd\u01de\u01e0\u01fa\u0200\u0202\u0226\u023a\u1e00\u1ea0\u1ea2\u1ea4\u1ea6\u1ea8\u1eaa\u1eac\u1eae\u1eb0\u1eb2\u1eb4\u1eb6\u24b6\u2c6f\uff21\u0386\u0391\u0410",
  "B": "\x42\u0181\u0182\u0243\u1e02\u1e04\u1e06\u24b7\uff22\u0392\u0411",
  "C": "\x43\xc7\u0106\u0108\u010a\u010c\u0187\u023b\u1e08\u24b8\ua73e\uff23\u0426",
  "D": "\x44\u010e\u0110\u0189\u018a\u018b\u1e0a\u1e0c\u1e0e\u1e10\u1e12\u24b9\ua779\uff24\xd0\u0394\u0414",
  "E": "\x45\xc8\xc9\xca\xcb\u0112\u0114\u0116\u0118\u011a\u018e\u0190\u0204\u0206\u0228\u1e14\u1e16\u1e18\u1e1a\u1e1c\u1eb8\u1eba\u1ebc\u1ebe\u1ec0\u1ec2\u1ec4\u1ec6\u24ba\uff25\u0388\u0395\u0415\u042d",
  "F": "\x46\u0191\u1e1e\u24bb\ua77b\uff26\u03a6\u0424",
  "G": "\x47\u011c\u011e\u0120\u0122\u0193\u01e4\u01e6\u01f4\u1e20\u24bc\ua77d\ua77e\ua7a0\uff27\u0393\u0413\u0490",
  "H": "\x48\u0124\u0126\u021e\u1e22\u1e24\u1e26\u1e28\u1e2a\u24bd\u2c67\u2c75\ua78d\uff28\u0389\u0397\u0425",
  "I": "\x49\xcc\xcd\xce\xcf\u0128\u012a\u012c\u012e\u0130\u0197\u01cf\u0208\u020a\u1e2c\u1e2e\u1ec8\u1eca\u24be\uff29\u038a\u0399\u03aa\u0406\u0418",
  "J": "\x4a\u0134\u0248\u24bf\uff2a\u0419",
  "K": "\x4b\u0136\u0198\u01e8\u1e30\u1e32\u1e34\u24c0\u2c69\ua740\ua742\ua744\ua7a2\uff2b\u039a\u041a",
  "L": "\x4c\u0139\u013b\u013d\u013f\u0141\u023d\u1e36\u1e38\u1e3a\u1e3c\u24c1\u2c60\u2c62\ua746\ua748\ua780\uff2c\u039b\u041b",
  "M": "\x4d\u019c\u1e3e\u1e40\u1e42\u24c2\u2c6e\uff2d\u039c\u041c",
  "N": "\x4e\xd1\u0143\u0145\u0147\u019d\u01f8\u0220\u1e44\u1e46\u1e48\u1e4a\u24c3\ua790\ua7a4\uff2e\u039d\u041d",
  "O": "\x4f\xd2\xd3\xd4\xd5\xd6\xd8\u014c\u014e\u0150\u0186\u019f\u01a0\u01d1\u01ea\u01ec\u01fe\u020c\u020e\u022a\u022c\u022e\u0230\u1e4c\u1e4e\u1e50\u1e52\u1ecc\u1ece\u1ed0\u1ed2\u1ed4\u1ed6\u1ed8\u1eda\u1edc\u1ede\u1ee0\u1ee2\u24c4\ua74a\ua74c\uff2f\u038c\u039f\u041e",
  "P": "\x50\u01a4\u1e54\u1e56\u24c5\u2c63\ua750\ua752\ua754\uff30\u03a0\u041f",
  "Q": "\x51\u024a\u24c6\ua756\ua758\uff31",
  "R": "\x52\u0154\u0156\u0158\u0210\u0212\u024c\u1e58\u1e5a\u1e5c\u1e5e\u24c7\u2c64\ua75a\ua782\ua7a6\uff32\u03a1\u0420",
  "S": "\x53\u015a\u015c\u015e\u0160\u0218\u1e60\u1e62\u1e64\u1e66\u1e68\u1e9e\u24c8\u2c7e\ua784\ua7a8\uff33\u03a3\u0421",
  "T": "\x54\u0162\u0164\u0166\u01ac\u01ae\u021a\u023e\u1e6a\u1e6c\u1e6e\u1e70\u24c9\ua786\uff34\u03a4\u0422",
  "U": "\x55\xd9\xda\xdb\xdc\u0168\u016a\u016c\u016e\u0170\u0172\u01af\u01d3\u01d5\u01d7\u01d9\u01db\u0214\u0216\u0244\u1e72\u1e74\u1e76\u1e78\u1e7a\u1ee4\u1ee6\u1ee8\u1eea\u1eec\u1eee\u1ef0\u24ca\uff35\u0423\u042a",
  "V": "\x56\u01b2\u0245\u1e7c\u1e7e\u24cb\ua75e\uff36\u0412",
  "W": "\x57\u0174\u1e80\u1e82\u1e84\u1e86\u1e88\u24cc\u2c72\uff37\u038f\u03a9",
  "X": "\x58\u1e8a\u1e8c\u24cd\uff38\u03a7",
  "Y": "\x59\xdd\u0176\u0178\u01b3\u0232\u024e\u1e8e\u1ef2\u1ef4\u1ef6\u1ef8\u1efe\u24ce\uff39\u038e\u03a5\u03ab\u042b",
  "Z": "\x5a\u0179\u017b\u017d\u01b5\u0224\u1e90\u1e92\u1e94\u24cf\u2c6b\u2c7f\ua762\uff3a\u0396\u0417",
  "a": "\x61\xe0\xe1\xe2\xe3\xe4\xe5\u0101\u0103\u0105\u01ce\u01df\u01e1\u01fb\u0201\u0203\u0227\u0250\u1e01\u1e9a\u1ea1\u1ea3\u1ea5\u1ea7\u1ea9\u1eab\u1ead\u1eaf\u1eb1\u1eb3\u1eb5\u1eb7\u24d0\u2c65\uff41\u03ac\u03b1\u0430",
  "b": "\x62\u0180\u0183\u0253\u1e03\u1e05\u1e07\u24d1\uff42\u03b2\u0431",
  "c": "\x63\xe7\u0107\u0109\u010b\u010d\u0188\u023c\u1e09\u2184\u24d2\ua73f\uff43\u0446",
  "d": "\x64\u010f\u0111\u018c\u0256\u0257\u1e0b\u1e0d\u1e0f\u1e11\u1e13\u24d3\ua77a\uff44\xf0\u03b4\u0434",
  "e": "\x65\xe8\xe9\xea\xeb\u0113\u0115\u0117\u0119\u011b\u01dd\u0205\u0207\u0229\u0247\u025b\u1e15\u1e17\u1e19\u1e1b\u1e1d\u1eb9\u1ebb\u1ebd\u1ebf\u1ec1\u1ec3\u1ec5\u1ec7\u24d4\uff45\u03ad\u03b5\u0435\u044d",
  "f": "\x66\u0192\u1e1f\u24d5\ua77c\uff46\u03c6\u0444",
  "g": "\x67\u011d\u011f\u0121\u0123\u01e5\u01e7\u01f5\u0260\u1d79\u1e21\u24d6\ua77f\ua7a1\uff47\u03b3\u0433\u0491",
  "h": "\x68\u0125\u0127\u021f\u0265\u1e23\u1e25\u1e27\u1e29\u1e2b\u1e96\u24d7\u2c68\u2c76\uff48\u03ae\u03b7\u0445",
  "i": "\x69\xec\xed\xee\xef\u0129\u012b\u012d\u012f\u0131\u01d0\u0209\u020b\u0268\u1e2d\u1e2f\u1ec9\u1ecb\u24d8\uff49\u0390\u03af\u03b9\u03ca\u0438\u0456",
  "j": "\x6a\u0135\u01f0\u0249\u24d9\uff4a\u0439",
  "k": "\x6b\u0137\u0199\u01e9\u1e31\u1e33\u1e35\u24da\u2c6a\ua741\ua743\ua745\ua7a3\uff4b\u03ba\u043a",
  "l": "\x6c\u013a\u013c\u013e\u0140\u0142\u017f\u019a\u026b\u1e37\u1e39\u1e3b\u1e3d\u24db\u2c61\ua747\ua749\ua781\uff4c\u03bb\u043b",
  "m": "\x6d\u026f\u0271\u1e3f\u1e41\u1e43\u24dc\uff4d\u03bc\u043c",
  "n": "\x6e\xf1\u0144\u0146\u0148\u0149\u019e\u01f9\u0272\u1e45\u1e47\u1e49\u1e4b\u24dd\ua791\ua7a5\uff4e\u03bd\u043d",
  "o": "\x6f\xf2\xf3\xf4\xf5\xf6\xf8\u014d\u014f\u0151\u01a1\u01d2\u01eb\u01ed\u01ff\u020d\u020f\u022b\u022d\u022f\u0231\u0254\u0275\u1e4d\u1e4f\u1e51\u1e53\u1ecd\u1ecf\u1ed1\u1ed3\u1ed5\u1ed7\u1ed9\u1edb\u1edd\u1edf\u1ee1\u1ee3\u24de\ua74b\ua74d\uff4f\u03bf\u03cc\u043e",
  "p": "\x70\u01a5\u1d7d\u1e55\u1e57\u24df\ua751\ua753\ua755\uff50\u03c0\u043f",
  "q": "\x71\u024b\u24e0\ua757\ua759\uff51",
  "r": "\x72\u0155\u0157\u0159\u0211\u0213\u024d\u027d\u1e59\u1e5b\u1e5d\u1e5f\u24e1\ua75b\ua783\ua7a7\uff52\u03c1\u0440",
  "s": "\x73\xdf\u015b\u015d\u015f\u0161\u0219\u023f\u1e61\u1e63\u1e65\u1e67\u1e69\u1e9b\u24e2\ua785\ua7a9\uff53\u03c2\u03c3\u0441",
  "t": "\x74\u0163\u0165\u0167\u01ad\u021b\u0288\u1e6b\u1e6d\u1e6f\u1e71\u1e97\u24e3\u2c66\ua787\uff54\u03c4\u0442",
  "u": "\x75\xf9\xfa\xfb\xfc\u0169\u016b\u016d\u016f\u0171\u0173\u01b0\u01d4\u01d6\u01d8\u01da\u01dc\u0215\u0217\u0289\u1e73\u1e75\u1e77\u1e79\u1e7b\u1ee5\u1ee7\u1ee9\u1eeb\u1eed\u1eef\u1ef1\u24e4\uff55\u0443\u044a",
  "v": "\x76\u028b\u028c\u1e7d\u1e7f\u24e5\ua75f\uff56\u0432",
  "w": "\x77\u0175\u1e81\u1e83\u1e85\u1e87\u1e89\u1e98\u24e6\u2c73\uff57\u03c9\u03ce",
  "x": "\x78\u1e8b\u1e8d\u24e7\uff58\u03c7",
  "y": "\x79\xfd\xff\u0177\u01b4\u0233\u024f\u1e8f\u1e99\u1ef3\u1ef5\u1ef7\u1ef9\u1eff\u24e8\uff59\u03b0\u03c5\u03cb\u03cd\u044b",
  "z": "\x7a\u017a\u017c\u017e\u01b6\u0225\u0240\u1e91\u1e93\u1e95\u24e9\u2c6c\ua763\uff5a\u03b6\u0437",
  "OE": "\x8c\u0152",
  "oe": "\x9c\u0153",
  "AE": "\xc6\u01e2\u01fc",
  "ae": "\xe6\u01e3\u01fd",
  "hv": "\u0195",
  "OI": "\u01a2",
  "oi": "\u01a3",
  "DZ": "\u01c4\u01f1",
  "Dz": "\u01c5\u01f2",
  "dz": "\u01c6\u01f3",
  "LJ": "\u01c7",
  "Lj": "\u01c8",
  "lj": "\u01c9",
  "NJ": "\u01ca",
  "Nj": "\u01cb",
  "nj": "\u01cc",
  "OU": "\u0222",
  "ou": "\u0223",
  "TZ": "\ua728",
  "tz": "\ua729",
  "AA": "\ua732",
  "aa": "\ua733",
  "AO": "\ua734",
  "ao": "\ua735",
  "AU": "\ua736",
  "au": "\ua737",
  "AV": "\ua738\ua73a",
  "av": "\ua739\ua73b",
  "AY": "\ua73c",
  "ay": "\ua73d",
  "OO": "\ua74e",
  "oo": "\ua74f",
  "VY": "\ua760",
  "vy": "\ua761",
  "TH": "\xde",
  "th": "\xfe",
  "PS": "\u03a8",
  "ps": "\u03c8",
  "Yo": "\u0401",
  "Ye": "\u0404",
  "Yi": "\u0407",
  "Zh": "\u0416",
  "Ch": "\u0427",
  "Sh": "\u0428\u0429",
  "": "\u042c\u044c",
  "Yu": "\u042e",
  "Ya": "\u042f",
  "zh": "\u0436",
  "ch": "\u0447",
  "sh": "\u0448\u0449",
  "yu": "\u044e",
  "ya": "\u044f",
  "yo": "\u0451",
  "ye": "\u0454",
  "yi": "\u0457"
};

var diacriticsMap = null;

/**
 * Creates a map of the diacritics.
 *
 * @ignore
 * @returns {Object} Returns the diacritics map.
 */
function getDiacriticsMap() {
  if (diacriticsMap !== null) {
    return diacriticsMap;
  }
  diacriticsMap = {};

  arrayForEach(objectKeys(diacritics), function (key) {
    var characters = diacritics[key];
    for (var index = 0; index < characters.length; index++) {
      var character = characters[index];
      diacriticsMap[character] = key;
    }
  });

  return diacriticsMap;
}

/**
 * Get the latin character from character with diacritics.
 *
 * @ignore
 * @param   {string} character The character with diacritics.
 * @returns {string}           Returns the character without diacritics.
 */
function getLatinCharacter(character) {
  var characterWithoutDiacritic = getDiacriticsMap()[character];
  return characterWithoutDiacritic ? characterWithoutDiacritic : character;
}

/**
 * Returns the `cleanCharacter` from combining marks regular expression match.
 *
 * @ignore
 * @param {string} character The character with combining marks
 * @param {string} cleanCharacter The character without combining marks.
 * @return {string} The character without combining marks.
 */
function removeCombiningMarks(character, cleanCharacter) {
  return cleanCharacter;
}

/**
 * Latinises the `subject` by removing diacritic characters.
 *
 * @function latinise
 * @static
 * @since 1.2.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to latinise.
 * @return {string} Returns the latinised string.
 * @example
 * as.latinise('cafe\u0301'); // or 'café'
 * // => 'cafe'
 *
 * as.latinise('août décembre');
 * // => 'aout decembre'
 *
 * as.latinise('как прекрасен этот мир');
 * // => 'kak prekrasen etot mir'
 */
function latinise(subject) {
  var subjectString = coerceToString(subject);
  if (subjectString === '') {
    return subjectString;
  }
  return subjectString.replace(REGEXP_NON_LATIN, getLatinCharacter).replace(REGEXP_COMBINING_MARKS, removeCombiningMarks);
}

/**
 * Pads `subject` to a new `length`.
 *
 * @function pad
 * @static
 * @since 1.2.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to pad.
 * @param {int} [length=0] The length to pad the string. No changes are made if `length` is less than `subject.length`.
 * @param {string} [pad=' '] The string to be used for padding.
 * @return {string} Returns the padded string.
 * @example
 * as.pad('dog', 5);
 * // => ' dog '
 *
 * as.pad('bird', 6, '-');
 * // => '-bird-'
 *
 * as.pad('cat', 6, '-=');
 * // => '-cat-='
 */
function pad(subject, length, pad) {
  var subjectString = coerceToString(subject);
  var lengthInt = isNil(length) ? 0 : clipNumber(toInteger(length), 0, MAX_SAFE_INTEGER);
  var padString = coerceToString(pad, ' ');
  if (lengthInt <= subjectString.length) {
    return subjectString;
  }
  var paddingLength = lengthInt - subjectString.length;
  var paddingSideLength = toInteger(paddingLength / 2);
  var paddingSideRemainingLength = paddingLength % 2;
  return buildPadding(padString, paddingSideLength) + subjectString + buildPadding(padString, paddingSideLength + paddingSideRemainingLength);
}

/**
 * Returns a new string where the matches of `pattern` are replaced with `replacement`. <br/>
 *
 * @function replace
 * @static
 * @since 1.2.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to verify.
 * @param {string|RegExp} pattern The pattern which match is replaced. If `pattern` is a string,
 * a simple string match is evaluated and only the first occurrence replaced.
 * @param {string|Function} replacement The string or function which invocation result replaces `pattern` match.
 * @return {string} Returns the replacement result.
 * @example
 * as.replace('swan', 'wa', 'u');
 * // => 'sun'
 *
 * as.replace('domestic duck', /domestic\s/, '');
 * // => 'duck'
 *
 * as.replace('nice duck', /(nice)(duck)/, function(match, nice, duck) {
 *   return 'the ' + duck + ' is ' + nice;
 * });
 * // => 'the duck is nice'
 */
function replace(subject, pattern, replacement) {
  var subjectString = coerceToString(subject);
  return subjectString.replace(pattern, replacement);
}

/**
 * Get the flags string from a regular expression object.
 *
 * @ignore
 * @param {RegExp} regExp The regular expression object.
 * @return {string} Returns the string with flags chars.
 */
function getRegExpFlags(regExp) {
  return regExp.toString().match(REGEXP_FLAGS)[0];
}

/**
 * Checks whether `subject` includes `search` starting from `position`.
 *
 * @function includes
 * @static
 * @since 1.2.0
 * @memberOf Query
 * @param {string} [subject=''] The string where to search.
 * @param {string} search The string to search.
 * @param {number} [position=0] The position to start searching.
 * @return {boolean} Returns `true` if `subject` includes `search` or `false` otherwise.
 * @example
 * as.includes('starship', 'star');
 * // => true
 *
 * as.includes('galaxy', 'g', 1);
 * // => false
 */
function includes(subject, search, position) {
  var subjectString = coerceToString(subject);
  var searchString = toString(search);
  if (searchString === null) {
    return false;
  }
  if (searchString === '') {
    return true;
  }
  position = isNil(position) ? 0 : clipNumber(toInteger(position), 0, subjectString.length);
  return subjectString.indexOf(searchString, position) !== -1;
}

/**
 * Append flag to a regular expression.
 *
 * @ignore
 * @param {RegExp} pattern The pattern to coerce.
 * @param {string} appendFlag The flag to append to regular expression.
 * @return {RegExp} The regular expression with added flag.
 */
function appendFlagToRegExp(pattern, appendFlag) {
  var regularExpressionFlags = getRegExpFlags(pattern);
  if (!includes(regularExpressionFlags, appendFlag)) {
    return new RegExp(pattern.source, regularExpressionFlags + appendFlag);
  }
  return pattern;
}

/**
 * Returns a new string where all matches of `pattern` are replaced with `replacement`. <br/>
 *
 * @function replaceAll
 * @static
 * @since 1.2.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to verify.
 * @param {string|RegExp} pattern The pattern which match is replaced. If `pattern` is a string, a simple string match is evaluated.
 * All matches are replaced.
 * @param {string|Function} replacement The string or function which invocation result replaces `pattern` match.
 * @return {string} Returns the replacement result.
 * @example
 * as.replaceAll('good morning', 'o', '*');
 * // => 'g**d m*rning'
 * as.replaceAll('evening', /n/, 's');
 * // => 'evesisg'
 *
 */
function replaceAll(subject, pattern, replacement) {
  var subjectString = coerceToString(subject);
  var regExp = pattern;
  if (!(pattern instanceof RegExp)) {
    regExp = new RegExp(escapeRegExp(pattern), 'g');
  } else if (!pattern.global) {
    regExp = appendFlagToRegExp(pattern, 'g');
  }
  return subjectString.replace(regExp, replacement);
}

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
function reverse(subject) {
  var subjectString = coerceToString(subject);
  return subjectString.split('').reverse().join('');
}

/**
 * Reverses the `subject` taking care of
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#24surrogatepairs">surrogate pairs</a> and
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#25combiningmarks">combining marks</a>.
 *
 * @function reverseGrapheme
 * @static
 * @since 1.2.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to reverse.
 * @return {string} Returns the reversed string.
 * @example
 * as.reverseGrapheme('summer');
 * // => 'remmus'
 *
 * as.reverseGrapheme('𝌆 bar mañana mañana');
 * // => 'anañam anañam rab 𝌆'
 */
function reverseGrapheme(subject) {
  var subjectString = coerceToString(subject);
  /**
   * @see https://github.com/mathiasbynens/esrever
   */
  subjectString = subjectString.replace(REGEXP_COMBINING_MARKS, function ($0, $1, $2) {
    return reverseGrapheme($2) + $1;
  }).replace(REGEXP_SURROGATE_PAIRS, '$2$1');
  var reversedString = '';
  var index = subjectString.length;
  while (index--) {
    reversedString += subjectString.charAt(index);
  }
  return reversedString;
}

/**
 * Slugifies the `subject`. Cleans the `subject` by replacing diacritics with corresponding latin characters.
 *
 * @function slugify
 * @static
 * @since 1.2.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to slugify.
 * @return {string} Returns the slugified string.
 * @example
 * as.slugify('Italian cappuccino drink');
 * // => 'italian-cappuccino-drink'
 *
 * as.slugify('caffé latté');
 * // => 'caffe-latte'
 *
 * as.slugify('хорошая погода');
 * // => 'horoshaya-pogoda'
 */
function slugify(subject) {
  var subjectString = coerceToString(subject);
  if (subjectString === '') {
    return '';
  }
  var cleanSubjectString = latinise(subjectString).replace(REGEXP_NON_LATIN, '-');
  return kebabCase(cleanSubjectString);
}

/**
 * Changes `subject` by deleting `deleteCount` of characters starting at position `start`. Places a new string
 * `toAdd` instead of deleted characters.
 *
 * @function splice
 * @static
 * @since 1.2.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string where to insert.
 * @param {string} start The position to start changing the string. For a negative position will start from the end of
 * the string.
 * @param {number} [deleteCount=subject.length-start] The number of characters to delete from string.
 * @param {string} [toAdd=''] The string to be added instead of deleted characters.
 * @return {string} Returns the modified string.
 * @example
 * as.splice('new year', 0, 4);
 * // => 'year'
 *
 * as.splice('new year', 0, 3, 'happy');
 * // => 'happy year'
 *
 * as.splice('new year', -4, 4, 'day');
 * // => 'new day'
 */
function splice(subject, start, deleteCount, toAdd) {
  var subjectString = coerceToString(subject);
  var toAddString = coerceToString(toAdd);
  var startPosition = coerceToNumber(start);
  if (startPosition < 0) {
    startPosition = subjectString.length + startPosition;
    if (startPosition < 0) {
      startPosition = 0;
    }
  } else if (startPosition > subjectString.length) {
    startPosition = subjectString.length;
  }
  var deleteCountNumber = coerceToNumber(deleteCount, subjectString.length - startPosition);
  if (deleteCountNumber < 0) {
    deleteCountNumber = 0;
  }
  return subjectString.slice(0, startPosition) + toAddString + subjectString.slice(startPosition + deleteCountNumber);
}

/**
 * Removes whitespaces from the left side of the `subject`.
 *
 * @function trimLeft
 * @static
 * @since 1.2.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to trim.
 * @param {string} [whitespace=whitespace] The whitespace characters to trim. List all characters that you want to be stripped.
 * @return {string} Returns the trimmed string.
 * @example
 * as.trimLeft('  Starship Troopers');
 * // => 'Starship Troopers'
 *
 * as.trimLeft('***Mobile Infantry', '*');
 * // => 'Mobile Infantry'
 */
function trimLeft(subject, whitespace$$1) {
  var subjectString = coerceToString(subject);
  if (whitespace$$1 === '' || subjectString === '') {
    return subjectString;
  }
  var whitespaceString = toString(whitespace$$1);
  if (isNil(whitespaceString)) {
    return subjectString.replace(REGEXP_TRIM_LEFT, '');
  }
  var matchWhitespace = true;
  return stringReduce(subjectString, function (trimmed, character) {
    if (matchWhitespace && includes(whitespaceString, character)) {
      return trimmed;
    }
    matchWhitespace = false;
    return trimmed + character;
  }, '');
}

function stringReduce$1(subject, callback, initialValue) {
  if (!isFunction(callback)) {
    throw Error(callback + ' is not a function');
  }
  var applyInitial = !isNil(initialValue);

  var string = coerceToString(subject);
  var arr = string.split('');
  var length = arr.length;

  if (!applyInitial && length === 0) {
    throw Error('Reduce of empty array with no initial value');
  }

  var reduceVal = applyInitial ? initialValue : arr[length - 1];
  var index = applyInitial ? length - 1 : length - 2;

  for (; index >= 0; index--) {
    reduceVal = callback(reduceVal, arr[index], index, arr);
  }

  return reduceVal;
}

/**
 * Removes whitespaces from the right side of the `subject`.
 *
 * @function trimRight
 * @static
 * @since 1.2.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to trim.
 * @param {string} [whitespace=whitespace] The whitespace characters to trim. List all characters that you want to be stripped.
 * @return {string} Returns the trimmed string.
 * @example
 * as.trimRight('the fire rises   ');
 * // => 'the fire rises'
 *
 * as.trimRight('do you feel in charge?!!!', '!');
 * // => 'do you feel in charge?'
 */
function trimRight(subject, whitespace$$1) {
  var subjectString = coerceToString(subject);
  if (whitespace$$1 === '' || subjectString === '') {
    return subjectString;
  }
  var whitespaceString = toString(whitespace$$1);
  if (isNil(whitespaceString)) {
    return subjectString.replace(REGEXP_TRIM_RIGHT, '');
  }
  var matchWhitespace = true;
  return stringReduce$1(subjectString, function (trimmed, character) {
    if (matchWhitespace && includes(whitespaceString, character)) {
      return trimmed;
    }
    matchWhitespace = false;
    return character + trimmed;
  }, '');
}

/**
 * Removes whitespaces from left and right sides of the `subject`.
 *
 * @function trim
 * @static
 * @since 1.2.0
 * @memberOf Manipulate
 * @param {string} [subject=''] The string to trim.
 * @param {string} [whitespace=whitespace] The whitespace characters to trim. List all characters that you want to be stripped.
 * @return {string} Returns the trimmed string.
 * @example
 * as.trim(' Mother nature ');
 * // => 'Mother nature'
 *
 * as.trim('--Earth--', '-');
 * // => 'Earth'
 */
function trim(subject, whitespace) {
  var subjectString = coerceToString(subject);
  if (whitespace === '' || subjectString === '') {
    return subjectString;
  }
  var whitespaceString = toString(whitespace);
  if (isNil(whitespaceString)) {
    return subjectString.trim();
  }
  return trimRight(trimLeft(subjectString, whitespaceString), whitespaceString);
}

var OPTION_WIDTH = 'width';
var OPTION_NEW_LINE = 'newLine';
var OPTION_INDENT = 'indent';
var OPTION_CUT = 'cut';

/**
 * Determine the word wrap options. The missing values are filled with defaults.
 *
 * @param  {Object} options  The options object.
 * @return {Object}          The word wrap options, with default settings if necessary.
 * @ignore
 */
function determineOptions(options) {
  return {
    width: coerceToNumber(options[OPTION_WIDTH], 75),
    newLine: coerceToString(options[OPTION_NEW_LINE], '\n'),
    indent: coerceToString(options[OPTION_INDENT], ''),
    cut: coerceToBoolean(options[OPTION_CUT], false)
  };
}

/**
 * Wraps `subject` to a given number of characters using a string break character.
 *
 * @function wordWrap
 * @static
 * @since 1.2.0
 * @memberOf Manipulate
 * @param  {string} [subject=''] The string to wrap.
 * @param  {Object} [options={}] The wrap options.
 * @param  {number} [options.width=75] The number of characters at which to wrap.
 * @param  {string} [options.newLine='\n'] The string to add at the end of line.
 * @param  {string} [options.indent='']  The string to intend the line.
 * @param  {boolean} [options.cut=false] When `false` (default) does not split the word even if word length is bigger than `width`. <br/>
 *                                       When `true` breaks the word that has length bigger than `width`.
 *
 * @return {string} Returns wrapped string.
 * @example
 * as.wordWrap('Hello world', {
 *   width: 5
 * });
 * // => 'Hello\nworld'
 *
 * as.wordWrap('Hello world', {
 *   width: 5,
 *   newLine: '<br/>',
 *   indent: '__'
 * });
 * // => '__Hello<br/>__world'
 *
 * as.wordWrap('Wonderful world', {
 *   width: 5,
 *   cut: true
 * });
 * // => 'Wonde\nrful\nworld'
 *
 */
function wordWrap(subject) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var subjectString = coerceToString(subject);

  var _determineOptions = determineOptions(options),
      width = _determineOptions.width,
      newLine = _determineOptions.newLine,
      indent = _determineOptions.indent,
      cut = _determineOptions.cut;

  if (subjectString === '' || width <= 0) {
    return indent;
  }
  if (!String.prototype.bind) {
    String.prototype.bind = functionBind;
  }
  var subjectLength = subjectString.length;
  var substring = subjectString.substring.bind(subjectString);
  var offset = 0;
  var wrappedLine = '';
  while (subjectLength - offset > width) {
    if (subjectString[offset] === ' ') {
      offset++;
      continue;
    }
    var spaceToWrapAt = subjectString.lastIndexOf(' ', width + offset);
    if (spaceToWrapAt >= offset) {
      wrappedLine += indent + substring(offset, spaceToWrapAt) + newLine;
      offset = spaceToWrapAt + 1;
    } else {
      if (cut) {
        wrappedLine += indent + substring(offset, width + offset) + newLine;
        offset += width;
      } else {
        spaceToWrapAt = subjectString.indexOf(' ', width + offset);
        if (spaceToWrapAt >= 0) {
          wrappedLine += indent + substring(offset, spaceToWrapAt) + newLine;
          offset = spaceToWrapAt + 1;
        } else {
          wrappedLine += indent + substring(offset);
          offset = subjectLength;
        }
      }
    }
  }
  if (offset < subjectLength) {
    wrappedLine += indent + substring(offset);
  }
  return wrappedLine;
}

/**
 * Checks whether `subject` ends with `end`.
 *
 * @function endsWith
 * @static
 * @since 1.2.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @param {string} end The ending string.
 * @param {number} [position=subject.length] Search within `subject` as if the string were only `position` long.
 * @return {boolean} Returns `true` if `subject` ends with `end` or `false` otherwise.
 * @example
 * as.endsWith('red alert', 'alert');
 * // => true
 *
 * as.endsWith('metro south', 'metro');
 * // => false
 *
 * as.endsWith('Murphy', 'ph', 5);
 * // => true
 */
function endsWith(subject, end, position) {
  if (isNil(end)) {
    return false;
  }
  var subjectString = coerceToString(subject);
  var endString = coerceToString(end);
  if (endString === '') {
    return true;
  }
  position = isNil(position) ? subjectString.length : clipNumber(toInteger(position), 0, subjectString.length);
  position -= endString.length;
  var lastIndex = subjectString.indexOf(endString, position);
  return lastIndex !== -1 && lastIndex === position;
}

/**
 * Checks whether `subject` contains only alpha characters.
 *
 * @function isAlpha
 * @static
 * @since 1.2.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` contains only alpha characters or `false` otherwise.
 * @example
 * as.isAlpha('bart');
 * // => true
 *
 * as.isAlpha('lisa!');
 * // => false
 *
 * as.isAlpha('lisa and bart');
 * // => false
 */
function isAlpha(subject) {
  var subjectString = coerceToString(subject);
  return REGEXP_ALPHA.test(subjectString);
}

/**
 * Checks whether `subject` contains only alpha and digit characters.
 *
 * @function isAlphaDigit
 * @static
 * @since 1.2.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` contains only alpha and digit characters or `false` otherwise.
 * @example
 * as.isAlphaDigit('year2020');
 * // => true
 *
 * as.isAlphaDigit('1448');
 * // => true
 *
 * as.isAlphaDigit('40-20');
 * // => false
 */
function isAlphaDigit(subject) {
  var subjectString = coerceToString(subject);
  return REGEXP_ALPHA_DIGIT.test(subjectString);
}

/**
 * Checks whether `subject` is empty or contains only whitespaces.
 *
 * @function isBlank
 * @static
 * @since 1.2.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` is empty or contains only whitespaces or `false` otherwise.
 * @example
 * as.isBlank('');
 * // => true
 *
 * as.isBlank('  ');
 * // => true
 *
 * as.isBlank('World');
 * // => false
 */
function isBlank(subject) {
  var subjectString = coerceToString(subject);
  return subjectString.trim().length === 0;
}

/**
 * Checks whether `subject` contains only digit characters.
 *
 * @function isDigit
 * @static
 * @since 1.2.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` contains only digit characters or `false` otherwise.
 * @example
 * as.isDigit('35');
 * // => true
 *
 * as.isDigit('1.5');
 * // => false
 *
 * as.isDigit('ten');
 * // => false
 */
function isDigit(subject) {
  var subjectString = coerceToString(subject);
  return REGEXP_DIGIT.test(subjectString);
}

/**
 * Checks whether `subject` is empty.
 *
 * @function isEmpty
 * @static
 * @since 1.2.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` is empty or `false` otherwise
 * @example
 * as.isEmpty('');
 * // => true
 *
 * as.isEmpty('  ');
 * // => false
 *
 * as.isEmpty('sun');
 * // => false
 */
function isEmpty(subject) {
  var subjectString = coerceToString(subject);
  return subjectString.length === 0;
}

/**
 * Checks whether `subject` has only lower case characters.
 *
 * @function isLowerCase
 * @static
 * @since 1.2.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` is lower case or `false` otherwise.
 * @example
 * as.isLowerCase('motorcycle');
 * // => true
 *
 * as.isLowerCase('John');
 * // => false
 *
 * as.isLowerCase('T1000');
 * // => false
 */
function isLowerCase(subject) {
  var valueString = coerceToString(subject);
  return isAlpha(valueString) && valueString.toLowerCase() === valueString;
}

/**
 * Checks whether `subject` is numeric.
 *
 * @function isNumeric
 * @static
 * @since 1.2.0
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
function isNumeric(subject) {
  var valueNumeric = typeof subject === 'object' && !isNil(subject) ? Number(subject) : subject;
  return (typeof valueNumeric === 'number' || typeof valueNumeric === 'string') && !isNaN(valueNumeric - parseFloat(valueNumeric));
}

/**
 * Checks whether `subject` contains only upper case characters.
 *
 * @function isUpperCase
 * @static
 * @since 1.2.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @return {boolean} Returns `true` if `subject` is upper case or `false` otherwise.
 * @example
 * as.isUpperCase('ACDC');
 * // => true
 *
 * as.isUpperCase('Morning');
 * // => false
 */
function isUpperCase(subject) {
  var subjectString = coerceToString(subject);
  return isAlpha(subjectString) && subjectString.toUpperCase() === subjectString;
}

/**
 * Checks whether `subject` matches the regular expression `pattern`.
 *
 * @function matches
 * @static
 * @since 1.2.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @param {RegExp|string} pattern The pattern to match. If `pattern` is not RegExp, it is transformed to `new RegExp(pattern, flags)`.
 * @param {string} [flags=''] The regular expression flags. Applies when `pattern` is string type.
 * @return {boolean} Returns `true` if `subject` matches `pattern` or `false` otherwise.
 * @example
 * as.matches('pluto', /plu.{2}/);
 * // => true
 *
 * as.matches('sun', 'S', 'i');
 * // => true
 *
 * as.matches('apollo 11', '\\d{3}');
 * // => false
 */
function matches(subject, pattern, flags) {
  var subjectString = coerceToString(subject);
  var flagsString = coerceToString(flags);
  var patternString = void 0;
  if (!(pattern instanceof RegExp)) {
    patternString = toString(pattern);
    if (patternString === null) {
      return false;
    }
    pattern = new RegExp(patternString, flagsString);
  }
  return pattern.test(subjectString);
}

/**
 * Checks whether `subject` starts with `start`.
 *
 * @function startsWith
 * @static
 * @since 1.2.0
 * @memberOf Query
 * @param {string} [subject=''] The string to verify.
 * @param {string} start The starting string.
 * @param {number} [position=0] The position to start searching.
 * @return {boolean} Returns `true` if `subject` starts with `start` or `false` otherwise.
 * @example
 * as.startsWith('say hello to my little friend', 'say hello');
 * // => true
 *
 * as.startsWith('tony', 'on', 1);
 * // => true
 *
 * as.startsWith('the world is yours', 'world');
 * // => false
 */
function startsWith(subject, start, position) {
  var subjectString = coerceToString(subject);
  var startString = toString(start);
  if (startString === null) {
    return false;
  }
  if (startString === '') {
    return true;
  }
  position = isNil(position) ? 0 : clipNumber(toInteger(position), 0, subjectString.length);
  return subjectString.substr(position, startString.length) === startString;
}

/**
 * Splits `subject` into an array of characters.
 *
 * @function chars
 * @static
 * @since 1.2.0
 * @memberOf Split
 * @param {string} [subject=''] The string to split into characters.
 * @return {Array} Returns the array of characters.
 * @example
 * as.chars('cloud');
 * // => ['c', 'l', 'o', 'u', 'd']
 */
function chars(subject) {
  var subjectString = coerceToString(subject);
  return subjectString.split('');
}

/**
 * Returns an array of Unicode code point values from characters of `subject`.
 *
 * @function codePoints
 * @static
 * @since 1.2.0
 * @memberOf Split
 * @param  {string} [subject=''] The string to extract from.
 * @return {Array} Returns an array of non-negative numbers less than or equal to `0x10FFFF`.
 * @example
 * as.codePoints('rain');
 * // => [114, 97, 105, 110], or
 * //    [0x72, 0x61, 0x69, 0x6E]
 *
 * as.codePoints('\uD83D\uDE00 smile'); // or '😀 smile'
 * // => [128512, 32, 115, 109, 105, 108, 101], or
 * //    [0x1F600, 0x20, 0x73, 0x6D, 0x69, 0x6C, 0x65]
 */
function codePoints(subject) {
  var subjectString = coerceToString(subject);
  var subjectStringLength = subjectString.length;
  var codePointArray = [];
  var index = 0;
  var codePointNumber = void 0;
  while (index < subjectStringLength) {
    codePointNumber = codePointAt(subjectString, index);
    codePointArray.push(codePointNumber);
    index += codePointNumber > 0xFFFF ? 2 : 1;
  }
  return codePointArray;
}

/**
 * Splits `subject` into an array of graphemes taking care of
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#24surrogatepairs">surrogate pairs</a> and
 * <a href="https://rainsoft.io/what-every-javascript-developer-should-know-about-unicode/#25combiningmarks">combining marks</a>.
 *
 * @function graphemes
 * @static
 * @since 1.2.0
 * @memberOf Split
 * @param {string} [subject=''] The string to split into characters.
 * @return {Array} Returns the array of graphemes.
 * @example
 * as.graphemes('\uD835\uDC00\uD835\uDC01'); // or '𝐀𝐁'
 * // => ['\uD835\uDC00', '\uD835\uDC01'], or
 * //    ['𝐀', '𝐁']
 *
 * as.graphemes('cafe\u0301'); // or 'café'
 * // => ['c', 'a', 'f', 'e\u0301'], or
 * //    ['c', 'a', 'f', 'é']
 */
function graphemes(subject) {
  var subjectString = coerceToString(subject);
  return nilDefault(subjectString.match(REGEXP_UNICODE_CHARACTER), []);
}

/**
 * Splits `subject` into an array of chunks by `separator`.
 *
 * @function split
 * @static
 * @since 1.2.0
 * @memberOf Split
 * @param {string} [subject=''] The string to split into characters.
 * @param {string|RegExp} [separator] The pattern to match the separator.
 * @param {number} [limit] Limit the number of chunks to be found.
 * @return {Array} Returns the array of chunks.
 * @example
 * as.split('rage against the dying of the light', ' ');
 * // => ['rage', 'against', 'the', 'dying', 'of', 'the', 'light']
 *
 * as.split('the dying of the light', /\s/, 3);
 * // => ['the', 'dying', 'of']
 */
function split(subject, separator, limit) {
  var subjectString = coerceToString(subject);
  return subjectString.split(separator, limit);
}

/**
 * Checks whether `subject` contains substring at specific `index`.
 *
 * @ignore
 * @param {string} subject The subject to search in.
 * @param {string} substring The substring to search/
 * @param {number} index The index to search substring.
 * @param {boolean} lookBehind Whether to look behind (true) or ahead (false).
 * @return {boolean} Returns a boolean whether the substring exists.
 */
function hasSubstringAtIndex(subject, substring, index) {
  var lookBehind = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  var indexOffset = 0;
  if (lookBehind) {
    indexOffset = -substring.length + 1;
  }
  var extractedSubstring = subject.substr(index + indexOffset, substring.length);
  return extractedSubstring.toLowerCase() === substring;
}

/**
 * Parses the tags from the string '<tag1><tag2>...<tagN>'.
 *
 * @ignore
 * @param {string} tags The string that contains the tags.
 * @return {string[]} Returns the array of tag names.
 */
function parseTagList(tags) {
  var tagsList = [];
  var match = void 0;
  while ((match = REGEXP_TAG_LIST.exec(tags)) !== null) {
    tagsList.push(match[1]);
  }
  return tagsList;
}

var STATE_START_TAG = 0;
var STATE_NON_WHITESPACE = 1;
var STATE_DONE = 2;

/**
 * Parses the tag name from html content.
 *
 * @ignore
 * @param {string} tagContent The tag content.
 * @return {string} Returns the tag name.
 */
function parseTagName(tagContent) {
  var state = STATE_START_TAG;
  var tagName = '';
  var index = 0;
  while (state !== STATE_DONE) {
    var char = tagContent[index++].toLowerCase();
    switch (char) {
      case '<':
        break;
      case '>':
        state = STATE_DONE;
        break;
      default:
        if (REGEXP_WHITESPACE.test(char)) {
          if (state === STATE_NON_WHITESPACE) {
            state = STATE_DONE;
          }
        } else {
          if (state === STATE_START_TAG) {
            state = STATE_NON_WHITESPACE;
          }
          if (char !== '/') {
            tagName += char;
          }
        }
        break;
    }
  }
  return tagName;
}

var STATE_OUTPUT = 0;
var STATE_HTML = 1;
var STATE_EXCLAMATION = 2;
var STATE_COMMENT = 3;

/**
 * Strips HTML tags from `subject`.
 *
 * @function stripTags
 * @static
 * @since 1.2.0
 * @memberOf Strip
 * @param {string} [subject=''] The string to strip from.
 * @param {string|Array} [allowableTags] The string `'<tag1><tag2>'` or array `['tag1', 'tag2']` of tags that should not be stripped.
 * @param {string} [replacement=''] The string to replace the stripped tag.
 * @return {string} Returns the stripped string.
 * @example
 *
 * as.stripTags('<span><a href="#">Summer</a> is nice</span>');
 * // => 'Summer is nice'
 *
 * as.stripTags('<span><i>Winter</i> is <b>cold</b></span>', ['b', 'i']);
 * // => '<i>Winter</i> is <b>cold</b>'
 *
 * as.stripTags('Sun<br/>set', '', '-');
 * // => 'Sun-set'
 */
function trim$1(subject, allowableTags, replacement) {
  subject = coerceToString(subject);
  if (subject === '') {
    return '';
  }
  if (!Array.isArray(allowableTags)) {
    var allowableTagsString = coerceToString(allowableTags);
    allowableTags = allowableTagsString === '' ? [] : parseTagList(allowableTagsString);
  }
  if (!hasSubstringAtIndex.prototype.bind) {
    hasSubstringAtIndex.prototype.bind = functionBind;
  }
  var replacementString = coerceToString(replacement);
  var length = subject.length;
  var hasAllowableTags = allowableTags.length > 0;
  var hasSubstring = hasSubstringAtIndex.bind(null, subject);
  var state = STATE_OUTPUT;
  var depth = 0;
  var output = '';
  var tagContent = '';
  var quote = null;
  for (var index = 0; index < length; index++) {
    var char = subject[index];
    var advance = false;
    switch (char) {
      case '<':
        if (quote) {
          break;
        }
        if (hasSubstring('< ', index, false)) {
          advance = true;
          break;
        }
        if (state === STATE_OUTPUT) {
          advance = true;
          state = STATE_HTML;
          break;
        }
        if (state === STATE_HTML) {
          depth++;
          break;
        }
        advance = true;
        break;
      case '!':
        if (state === STATE_HTML && hasSubstring('<!', index)) {
          state = STATE_EXCLAMATION;
          break;
        }
        advance = true;
        break;
      case '-':
        if (state === STATE_EXCLAMATION && hasSubstring('!--', index)) {
          state = STATE_COMMENT;
          break;
        }
        advance = true;
        break;
      case '"':
      case "'":
        if (state === STATE_HTML) {
          if (quote === char) {
            quote = null;
          } else if (!quote) {
            quote = char;
          }
        }
        advance = true;
        break;
      case 'E':
      case 'e':
        if (state === STATE_EXCLAMATION && hasSubstring('doctype', index)) {
          state = STATE_HTML;
          break;
        }
        advance = true;
        break;
      case '>':
        if (depth > 0) {
          depth--;
          break;
        }
        if (quote) {
          break;
        }
        if (state === STATE_HTML) {
          quote = null;
          state = STATE_OUTPUT;
          if (hasAllowableTags) {
            tagContent += '>';
            var tagName = parseTagName(tagContent);
            if (allowableTags.indexOf(tagName.toLowerCase()) !== -1) {
              output += tagContent;
            } else {
              output += replacementString;
            }
            tagContent = '';
          } else {
            output += replacementString;
          }
          break;
        }
        if (state === STATE_EXCLAMATION || state === STATE_COMMENT && hasSubstring('-->', index)) {
          quote = null;
          state = STATE_OUTPUT;
          tagContent = '';
          break;
        }
        advance = true;
        break;
      default:
        advance = true;
    }
    if (advance) {
      switch (state) {
        case STATE_OUTPUT:
          output += char;
          break;
        case STATE_HTML:
          if (hasAllowableTags) {
            tagContent += char;
          }
          break;
      }
    }
  }
  return output;
}

var globalObject$1 = null;

function getGlobalObject() {
  if (globalObject$1 !== null) {
    return globalObject$1;
  }
  /* istanbul ignore next */
  // It's hard to mock the global variables. This code surely works fine. I hope :)
  if (typeof global === 'object' && global.Object === Object) {
    // NodeJS global object
    globalObject$1 = global;
  } else if (typeof self === 'object' && self.Object === Object) {
    // self property from Window object
    globalObject$1 = self;
  } else {
    // Other cases. Function constructor always has the context as global object
    globalObject$1 = new Function('return this')();
  }
  return globalObject$1;
}

var globalObject = getGlobalObject();
var previousAS = globalObject.as;

/**
 * Restores `as` variable to previous value and returns Awesome String library instance.
 *
 * @function noConflict
 * @static
 * @since 1.2.0
 * @memberOf Util
 * @return {Object} Returns AwesomeString library instance.
 * @example
 * var awesomeString = as.noConflict();
 * awesomeString.isAlpha('Hello');
 * // => true
 */
function noConflict() {
  if (this === globalObject.as) {
    globalObject.as = previousAS;
  }
  return this;
}

/**
 * A property that contains the library <a href="http://semver.org/">semantic version number</a>.
 * @name version
 * @static
 * @since 1.2.0
 * @memberOf Util
 * @type string
 * @example
 * as.version
 * // => '1.2.0'
 */
var version = '1.2.0';

/* eslint sort-imports: "off" */

/**
 * Functions to change the case
 * @namespace Case
 */
/**
 * Chain functions
 * @namespace Chain
 */

/**
 * Functions to cut a string
 * @namespace Chop
 */
/**
 * Functions to count characters in a string
 * @namespace Count
 */
/**
 * Functions to format
 * @namespace Format
 */
/**
 * Functions to escape RegExp special characters
 * @namespace Escape
 */
/**
 * Functions to find index
 * @namespace Index
 */
/**
 * Functions to manipulate a string
 * @namespace Manipulate
 */
/**
 * Functions to query a string
 * @namespace Query
 */
/**
 * Functions to split a string
 * @namespace Split
 */
/**
 * Functions to strip a string
 * @namespace Strip
 */
/**
 * Util functions and properties
 * @namespace Util
 */
var functions = {
  camelCase: camelCase,
  capitalize: capitalize,
  decapitalize: decapitalize,
  kebabCase: kebabCase,
  lowerCase: lowerCase,
  snakeCase: snakeCase,
  upperCase: upperCase,

  count: count,
  countGraphemes: countGrapheme,
  countSubstrings: countSubstrings,
  countWhere: countWhere,
  countWords: countWords,

  escapeHtml: escapeHtml,
  escapeRegExp: escapeRegExp,
  unescapeHtml: unescapeHtml,

  sprintf: sprintf,
  vprintf: vprintf,

  indexOf: indexOf,
  lastIndexOf: lastIndexOf,
  search: search,

  charAt: charAt,
  codePointAt: codePointAt,
  first: first,
  graphemeAt: graphemeAt,
  last: last,
  prune: prune,
  slice: slice,
  substr: substr,
  substring: substring,
  truncate: truncate,

  insert: insert,
  latinise: latinise,
  pad: pad,
  padLeft: padLeft,
  padRight: padRight,
  repeat: repeat,
  replace: replace,
  replaceAll: replaceAll,
  reverse: reverse,
  reverseGrapheme: reverseGrapheme,
  slugify: slugify,
  splice: splice,
  trim: trim,
  trimLeft: trimLeft,
  trimRight: trimRight,
  wordWrap: wordWrap,

  endsWith: endsWith,
  includes: includes,
  isAlpha: isAlpha,
  isAlphaDigit: isAlphaDigit,
  isBlank: isBlank,
  isDigit: isDigit,
  isEmpty: isEmpty,
  isLowerCase: isLowerCase,
  isNumeric: isNumeric,
  isString: isString,
  isUpperCase: isUpperCase,
  matches: matches,
  startsWith: startsWith,

  chars: chars,
  codePoints: codePoints,
  graphemes: graphemes,
  split: split,
  words: words,

  stripTags: trim$1,

  noConflict: noConflict,
  version: version
};

/**
 * The chain wrapper constructor.
 *
 * @ignore
 * @param  {string}       subject               The string to be wrapped.
 * @param  {boolean}      [explicitChain=false] A boolean that indicates if the chain sequence is explicit or implicit.
 * @return {ChainWrapper}                       Returns a new instance of `ChainWrapper`
 * @constructor
 */
function ChainWrapper(subject, explicitChain) {
  this._wrappedValue = subject;
  this._explicitChain = explicitChain;
}

/**
 * Unwraps the chain sequence wrapped value.
 *
 * @memberof Chain
 * @since 1.2.0
 * @function __proto__value
 * @return {*} Returns the unwrapped value.
 * @example
 * v
 *  .chain('Hello world')
 *  .replace('Hello', 'Hi')
 *  .lowerCase()
 *  .slugify()
 *  .value()
 * // => 'hi-world'
 *
 * v(' Space travel ')
 *  .trim()
 *  .truncate(8)
 *  .value()
 * // => 'Space...'
 */
ChainWrapper.prototype.value = function () {
  return this._wrappedValue;
};

/**
 * Override the default object valueOf().
 *
 * @ignore
 * @return {*} Returns the wrapped value.
 */
ChainWrapper.prototype.valueOf = function () {
  return this.value();
};

/**
 * Returns the wrapped value to be used in JSON.stringify().
 *
 * @ignore
 * @return {*} Returns the wrapped value.
 */
ChainWrapper.prototype.toJSON = function () {
  return this.value();
};

/**
 * Returns the string representation of the wrapped value.
 *
 * @ignore
 * @return {string} Returns the string representation.
 */
ChainWrapper.prototype.toString = function () {
  return String(this.value());
};

/**
 * Creates a new chain object that enables <i>explicit</i> chain sequences.
 * Use `as.prototype.value()` to unwrap the result. <br/>
 * Does not modify the wrapped value.
 *
 * @memberof Chain
 * @since 1.2.0
 * @function __proto__chain
 * @return {Object} Returns the wrapper in <i>explicit</i> mode.
 * @example
 * v('Back to School')
 *  .chain()
 *  .lowerCase()
 *  .words()
 *  .value()
 * // => ['back', 'to', 'school']
 *
 * v(" Back to School ")
 *  .chain()
 *  .trim()
 *  .truncate(7)
 *  .value()
 * // => 'Back...'
 */
ChainWrapper.prototype.chain = function () {
  return new ChainWrapper(this._wrappedValue, true);
};

/**
 * Modifies the wrapped value with the invocation result of `changer` function. The current wrapped value is the
 * argument of `changer` invocation.
 *
 * @memberof Chain
 * @since 1.2.0
 * @function __proto__thru
 * @param  {Function} changer The function to invoke.
 * @return {Object}           Returns the new wrapper that wraps the invocation result of `changer`.
 * @example
 * v
 *  .chain('sun is shining')
 *  .words()
 *  .thru(function(words) {
 *    return words[0];
 *  })
 *  .value()
 * // => 'sun'
 *
 */
ChainWrapper.prototype.thru = function (changer) {
  if (typeof changer === 'function') {
    return new ChainWrapper(changer(this._wrappedValue), this._explicitChain);
  }
  return this;
};

/**
 * A boolean that indicates if the chain sequence is explicit or implicit.
 * @ignore
 * @type {boolean}
 * @private
 */
ChainWrapper.prototype._explicitChain = true;

/**
 * Make a AwesomeString function chainable.
 *
 * @ignore
 * @param  {Function} functionInstance The function to make chainable
 * @return {Function}                  Returns the chainable function
 */
function makeFunctionChainable(functionInstance) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var result = functionInstance.apply(undefined, [this._wrappedValue].concat(args));
    if (this._explicitChain || typeof result === 'string') {
      return new ChainWrapper(result, this._explicitChain);
    } else {
      return result;
    }
  };
}

arrayForEach(objectKeys(functions), function (name) {
  ChainWrapper.prototype[name] = makeFunctionChainable(functions[name]);
});

/**
 * Creates a chain object that wraps `subject`, enabling <i>explicit</i> chain sequences. <br/>
 * Use `as.prototype.value()` to unwrap the result.
 *
 * @memberOf Chain
 * @since 1.2.0
 * @function chain
 * @param  {string} subject The string to wrap.
 * @return {Object}         Returns the new wrapper object.
 * @example
 * v
 *  .chain('Back to School')
 *  .lowerCase()
 *  .words()
 *  .value()
 * // => ['back', 'to', 'school']
 */
function chain(subject) {
  return new ChainWrapper(subject, true);
}

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
 * v(" Back to School ")
 *  .trim()
 *  .truncate(7)
 *  .value()
 * // => 'Back...'
 */
function AwesomeString(subject) {
  return new ChainWrapper(subject, false);
}

_extends(AwesomeString, functions, {
  chain: chain
});

/**
 * The string containing all printable ASCII characters.
 * @ignore
 * @type {string}
 */
var PRINTABLE_ASCII = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

/**
 * The string containing all printable ASCII characters in reverse order.
 * @ignore
 * @type {string}
 */
var REVERSED_PRINTABLE_ASCII = '~}|{zyxwvutsrqponmlkjihgfedcba`_^]\\[ZYXWVUTSRQPONMLKJIHGFEDCBA@?>=<;:9876543210/.-,+*)(\'&%$#"! ';

/**
 * Regular expression to match the library version.
 * @see http://semver.org/
 * @type {RegExp}
 */
var REGEXP_SEMVER = /\bv?(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?\b/ig;

describe('camelCase', function () {

  it('should return the camel case of a string', function () {
    chai.expect(AwesomeString.camelCase('bird')).to.be.equal('bird');
    chai.expect(AwesomeString.camelCase('BIRD')).to.be.equal('bird');
    chai.expect(AwesomeString.camelCase('BirdFlight')).to.be.equal('birdFlight');
    chai.expect(AwesomeString.camelCase('bird flight')).to.be.equal('birdFlight');
    chai.expect(AwesomeString.camelCase('San Diego Zoo Safari Park')).to.be.equal('sanDiegoZooSafariPark');
    chai.expect(AwesomeString.camelCase('-BIRD-FLIGHT-')).to.be.equal('birdFlight');
    chai.expect(AwesomeString.camelCase('__BIRD___FLIGHT___')).to.be.equal('birdFlight');
    chai.expect(AwesomeString.camelCase('Restless flycatcher')).to.be.equal('restlessFlycatcher');
    chai.expect(AwesomeString.camelCase('XMLHttpRequest')).to.be.equal('xmlHttpRequest');
    chai.expect(AwesomeString.camelCase('weight of up to 12 kg')).to.be.equal('weightOfUpTo12Kg');
    chai.expect(AwesomeString.camelCase('/home/dmitri/projects/voca')).to.be.equal('homeDmitriProjectsVoca');
    chai.expect(AwesomeString.camelCase(PRINTABLE_ASCII)).to.be.equal('0123456789AbcdefghijklmnopqrstuvwxyzAbcdefghijklmnopqrstuvwxyz');
    chai.expect(AwesomeString.camelCase('****')).to.be.equal('');
    chai.expect(AwesomeString.camelCase('****')).to.be.equal('');
    chai.expect(AwesomeString.camelCase('-----')).to.be.equal('');
    chai.expect(AwesomeString.camelCase('     ')).to.be.equal('');
    chai.expect(AwesomeString.camelCase('\n\n\n\n   ***\t\t')).to.be.equal('');
    chai.expect(AwesomeString.camelCase('')).to.be.equal('');
  });

  it('should return the camel case of a non-latin string', function () {
    chai.expect(AwesomeString.camelCase('zborul păsării')).to.be.equal('zborulPăsării');
    chai.expect(AwesomeString.camelCase('полет птицы')).to.be.equal('полетПтицы');
    chai.expect(AwesomeString.camelCase('fuerza de sustentación')).to.be.equal('fuerzaDeSustentación');
    chai.expect(AwesomeString.camelCase('skrzydło ptaka składa się')).to.be.equal('skrzydłoPtakaSkładaSię');
  });

  it('should not modify numbers', function () {
    chai.expect(AwesomeString.camelCase(0)).to.be.equal('0');
    chai.expect(AwesomeString.camelCase(1200)).to.be.equal('1200');
    chai.expect(AwesomeString.camelCase('8965')).to.be.equal('8965');
  });

  it('should return the camel case of a string representation of an object', function () {
    chai.expect(AwesomeString.camelCase(['bird flight'])).to.be.equal('birdFlight');
    chai.expect(AwesomeString.camelCase({
      toString: function () {
        return 'bird flight';
      }
    })).to.be.equal('birdFlight');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(AwesomeString.camelCase()).to.be.equal('');
    chai.expect(AwesomeString.camelCase(undefined)).to.be.equal('');
    chai.expect(AwesomeString.camelCase(null)).to.be.equal('');
  });
});

describe('capitalize', function () {

  it('should capitalize the first character in a string', function () {
    chai.expect(AwesomeString.capitalize('APPLE')).to.be.equal('APPLE');
    chai.expect(AwesomeString.capitalize('apple')).to.be.equal('Apple');
    chai.expect(AwesomeString.capitalize('macBook')).to.be.equal('MacBook');
    chai.expect(AwesomeString.capitalize('f')).to.be.equal('F');
    chai.expect(AwesomeString.capitalize('')).to.be.equal('');
    chai.expect(AwesomeString.capitalize('*apple')).to.be.equal('*apple');
    chai.expect(AwesomeString.capitalize(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should capitalize the first character in a string and keep the rest unmodified', function () {
    chai.expect(AwesomeString.capitalize('apple', true)).to.be.equal('Apple');
    chai.expect(AwesomeString.capitalize('APPLE', true)).to.be.equal('Apple');
    chai.expect(AwesomeString.capitalize('яблоко', true)).to.be.equal('Яблоко');
    chai.expect(AwesomeString.capitalize('f', true)).to.be.equal('F');
    chai.expect(AwesomeString.capitalize('', true)).to.be.equal('');
    chai.expect(AwesomeString.capitalize('100', true)).to.be.equal('100');
    chai.expect(AwesomeString.capitalize('  ', true)).to.be.equal('  ');
  });

  it('should capitalize the first character in a string representation of an object', function () {
    chai.expect(AwesomeString.capitalize(['grape'])).to.be.equal('Grape');
    chai.expect(AwesomeString.capitalize({
      toString: function () {
        return 'oRaNgE';
      }
    }, false)).to.be.equal('ORaNgE');
  });

  it('should not modify numbers', function () {
    chai.expect(AwesomeString.capitalize(100)).to.be.equal('100');
    chai.expect(AwesomeString.capitalize(812, false)).to.be.equal('812');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(AwesomeString.capitalize()).to.be.equal('');
    chai.expect(AwesomeString.capitalize(undefined)).to.be.equal('');
    chai.expect(AwesomeString.capitalize(null)).to.be.equal('');
    chai.expect(AwesomeString.capitalize(undefined, true)).to.be.equal('');
    chai.expect(AwesomeString.capitalize(undefined, false)).to.be.equal('');
  });
});

describe('decapitalize', function () {

  it('should decapitalize the first character in a string', function () {
    chai.expect(AwesomeString.decapitalize('Light')).to.be.equal('light');
    chai.expect(AwesomeString.decapitalize('light')).to.be.equal('light');
    chai.expect(AwesomeString.decapitalize('Sun')).to.be.equal('sun');
    chai.expect(AwesomeString.decapitalize('f')).to.be.equal('f');
    chai.expect(AwesomeString.decapitalize('')).to.be.equal('');
    chai.expect(AwesomeString.decapitalize('*light')).to.be.equal('*light');
    chai.expect(AwesomeString.decapitalize(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should decapitalize the first character in a string representation of an object', function () {
    chai.expect(AwesomeString.decapitalize(['Fruit'])).to.be.equal('fruit');
    chai.expect(AwesomeString.decapitalize({
      toString: function () {
        return 'CaRrOt';
      }
    }, false)).to.be.equal('caRrOt');
  });

  it('should not modify numbers', function () {
    chai.expect(AwesomeString.decapitalize(100)).to.be.equal('100');
    chai.expect(AwesomeString.decapitalize(812, false)).to.be.equal('812');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(AwesomeString.decapitalize()).to.be.equal('');
    chai.expect(AwesomeString.decapitalize(undefined)).to.be.equal('');
    chai.expect(AwesomeString.decapitalize(null)).to.be.equal('');
  });
});

describe('kebabCase', function () {

  it('should return the kebab case of a string', function () {
    chai.expect(AwesomeString.kebabCase('bird')).to.be.equal('bird');
    chai.expect(AwesomeString.kebabCase('BIRD')).to.be.equal('bird');
    chai.expect(AwesomeString.kebabCase('BirdFlight')).to.be.equal('bird-flight');
    chai.expect(AwesomeString.kebabCase('bird flight')).to.be.equal('bird-flight');
    chai.expect(AwesomeString.kebabCase('San Diego Zoo Safari Park')).to.be.equal('san-diego-zoo-safari-park');
    chai.expect(AwesomeString.kebabCase('-BIRD-FLIGHT-')).to.be.equal('bird-flight');
    chai.expect(AwesomeString.kebabCase('__BIRD___FLIGHT___')).to.be.equal('bird-flight');
    chai.expect(AwesomeString.kebabCase('Restless flycatcher')).to.be.equal('restless-flycatcher');
    chai.expect(AwesomeString.kebabCase('XMLHttpRequest')).to.be.equal('xml-http-request');
    chai.expect(AwesomeString.kebabCase('weight of up to 12 kg')).to.be.equal('weight-of-up-to-12-kg');
    chai.expect(AwesomeString.kebabCase('/home/dmitri/projects/voca')).to.be.equal('home-dmitri-projects-voca');
    chai.expect(AwesomeString.kebabCase(PRINTABLE_ASCII)).to.be.equal('0123456789-abcdefghijklmnopqrstuvwxyz-abcdefghijklmnopqrstuvwxyz');
    chai.expect(AwesomeString.kebabCase('****')).to.be.equal('');
    chai.expect(AwesomeString.kebabCase('****')).to.be.equal('');
    chai.expect(AwesomeString.kebabCase('-----')).to.be.equal('');
    chai.expect(AwesomeString.kebabCase('     ')).to.be.equal('');
    chai.expect(AwesomeString.kebabCase('\n\n\n\n   ***\t\t')).to.be.equal('');
    chai.expect(AwesomeString.kebabCase('')).to.be.equal('');
  });

  it('should return the kebab case of a non-latin string', function () {
    chai.expect(AwesomeString.kebabCase('zborul păsării')).to.be.equal('zborul-păsării');
    chai.expect(AwesomeString.kebabCase('полет птицы')).to.be.equal('полет-птицы');
    chai.expect(AwesomeString.kebabCase('fuerza de sustentación')).to.be.equal('fuerza-de-sustentación');
    chai.expect(AwesomeString.kebabCase('skrzydło ptaka składa się')).to.be.equal('skrzydło-ptaka-składa-się');
  });

  it('should not modify numbers', function () {
    chai.expect(AwesomeString.kebabCase(0)).to.be.equal('0');
    chai.expect(AwesomeString.kebabCase(1200)).to.be.equal('1200');
    chai.expect(AwesomeString.kebabCase('8965')).to.be.equal('8965');
  });

  it('should return the kebab case of a string representation of an object', function () {
    chai.expect(AwesomeString.kebabCase(['bird flight'])).to.be.equal('bird-flight');
    chai.expect(AwesomeString.kebabCase({
      toString: function () {
        return 'bird flight';
      }
    })).to.be.equal('bird-flight');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(AwesomeString.kebabCase()).to.be.equal('');
    chai.expect(AwesomeString.kebabCase(undefined)).to.be.equal('');
    chai.expect(AwesomeString.kebabCase(null)).to.be.equal('');
  });
});

describe('lowerCase', function () {

  it('should return the lower case of a string', function () {
    chai.expect(AwesomeString.lowerCase('Saturn')).to.be.equal('saturn');
    chai.expect(AwesomeString.lowerCase('EARTH')).to.be.equal('earth');
    chai.expect(AwesomeString.lowerCase('456')).to.be.equal('456');
    chai.expect(AwesomeString.lowerCase('')).to.be.equal('');
  });

  it('should return the lower case of a string representation of an object', function () {
    chai.expect(AwesomeString.lowerCase(['Venus'])).to.be.equal('venus');
    chai.expect(AwesomeString.lowerCase({
      toString: function () {
        return 'Venus';
      }
    })).to.be.equal('venus');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(AwesomeString.lowerCase()).to.be.equal('');
    chai.expect(AwesomeString.lowerCase(undefined)).to.be.equal('');
    chai.expect(AwesomeString.lowerCase(null)).to.be.equal('');
  });
});

describe('snakeCase', function () {

  it('should return the snake case of a string', function () {
    chai.expect(AwesomeString.snakeCase('bird')).to.be.equal('bird');
    chai.expect(AwesomeString.snakeCase('BIRD')).to.be.equal('bird');
    chai.expect(AwesomeString.snakeCase('BirdFlight')).to.be.equal('bird_flight');
    chai.expect(AwesomeString.snakeCase('bird flight')).to.be.equal('bird_flight');
    chai.expect(AwesomeString.snakeCase('San Diego Zoo Safari Park')).to.be.equal('san_diego_zoo_safari_park');
    chai.expect(AwesomeString.snakeCase('-BIRD-FLIGHT-')).to.be.equal('bird_flight');
    chai.expect(AwesomeString.snakeCase('__BIRD___FLIGHT___')).to.be.equal('bird_flight');
    chai.expect(AwesomeString.snakeCase('Restless flycatcher')).to.be.equal('restless_flycatcher');
    chai.expect(AwesomeString.snakeCase('XMLHttpRequest')).to.be.equal('xml_http_request');
    chai.expect(AwesomeString.snakeCase('weight of up to 12 kg')).to.be.equal('weight_of_up_to_12_kg');
    chai.expect(AwesomeString.snakeCase('/home/dmitri/projects/voca')).to.be.equal('home_dmitri_projects_voca');
    chai.expect(AwesomeString.snakeCase(PRINTABLE_ASCII)).to.be.equal('0123456789_abcdefghijklmnopqrstuvwxyz_abcdefghijklmnopqrstuvwxyz');
    chai.expect(AwesomeString.snakeCase('****')).to.be.equal('');
    chai.expect(AwesomeString.snakeCase('****')).to.be.equal('');
    chai.expect(AwesomeString.snakeCase('-----')).to.be.equal('');
    chai.expect(AwesomeString.snakeCase('     ')).to.be.equal('');
    chai.expect(AwesomeString.snakeCase('\n\n\n\n   ***\t\t')).to.be.equal('');
    chai.expect(AwesomeString.snakeCase('')).to.be.equal('');
  });

  it('should return the snake case of a non-latin string', function () {
    chai.expect(AwesomeString.snakeCase('zborul păsării')).to.be.equal('zborul_păsării');
    chai.expect(AwesomeString.snakeCase('полет птицы')).to.be.equal('полет_птицы');
    chai.expect(AwesomeString.snakeCase('fuerza de sustentación')).to.be.equal('fuerza_de_sustentación');
    chai.expect(AwesomeString.snakeCase('skrzydło ptaka składa się')).to.be.equal('skrzydło_ptaka_składa_się');
  });

  it('should not modify numbers', function () {
    chai.expect(AwesomeString.snakeCase(0)).to.be.equal('0');
    chai.expect(AwesomeString.snakeCase(1200)).to.be.equal('1200');
    chai.expect(AwesomeString.snakeCase('8965')).to.be.equal('8965');
  });

  it('should return the snake case of a string representation of an object', function () {
    chai.expect(AwesomeString.snakeCase(['bird flight'])).to.be.equal('bird_flight');
    chai.expect(AwesomeString.snakeCase({
      toString: function () {
        return 'bird flight';
      }
    })).to.be.equal('bird_flight');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(AwesomeString.snakeCase()).to.be.equal('');
    chai.expect(AwesomeString.snakeCase(undefined)).to.be.equal('');
    chai.expect(AwesomeString.snakeCase(null)).to.be.equal('');
  });
});

describe('upperCase', function () {

  it('should return the upper case of a string', function () {
    chai.expect(AwesomeString.upperCase('Saturn')).to.be.equal('SATURN');
    chai.expect(AwesomeString.upperCase('Earth')).to.be.equal('EARTH');
    chai.expect(AwesomeString.upperCase('456')).to.be.equal('456');
    chai.expect(AwesomeString.upperCase('')).to.be.equal('');
  });

  it('should return the upper case of a string representation of an object', function () {
    chai.expect(AwesomeString.upperCase(['Venus'])).to.be.equal('VENUS');
    chai.expect(AwesomeString.upperCase({
      toString: function () {
        return 'Venus';
      }
    })).to.be.equal('VENUS');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(AwesomeString.upperCase()).to.be.equal('');
    chai.expect(AwesomeString.upperCase(undefined)).to.be.equal('');
    chai.expect(AwesomeString.upperCase(null)).to.be.equal('');
  });
});

describe('chain', function () {

  it('should calculate the result using explicit chaining', function () {
    chai.expect(AwesomeString.chain('Hello world').value()).to.equal('Hello world');
    chai.expect(AwesomeString.chain('  Hello world  ').trim().value()).to.equal('Hello world');
    chai.expect(AwesomeString.chain('world').isAlpha().value()).to.equal(true);
    chai.expect(AwesomeString.chain('Hello world').lowerCase().replace('hello', 'hi').upperCase().value()).to.equal('HI WORLD');
  });

  it('should calculate the result using implicit chaining', function () {
    chai.expect(AwesomeString('Hello world').lowerCase().words()).to.eql(['hello', 'world']);
    chai.expect(AwesomeString('  Hello world  ').trimLeft().count()).to.equal(13);
    chai.expect(AwesomeString('7 days').replace(/\sdays/, '').isDigit()).to.equal(true);
    chai.expect(AwesomeString('7 days').replace(/\sdays/, '').value()).to.equal('7');
  });

  it('should transform implicit into explicit chaining', function () {
    chai.expect(AwesomeString('Hello world').chain().lowerCase().words().value()).to.eql(['hello', 'world']);
    chai.expect(AwesomeString('15').chain().isNumeric().value()).to.equal(true);
    chai.expect(AwesomeString('15').chain().isNumeric().thru(function (isNumeric) {
      return isNumeric ? 1 : 0;
    }).value()).to.be.equal(1);
  });

  it('should allow to pass thru the wrapped value', function () {
    chai.expect(AwesomeString('Hello world').chain().lowerCase().words().thru(function (words) {
      return words[0];
    }).value()).to.equal('hello');
    chai.expect(AwesomeString.chain('15').isNumeric().thru().value()).to.equal(true);
  });

  it('wrapper object should coerce to a primitive', function () {
    chai.expect('nice' + AwesomeString.chain(' evening ').trimRight()).to.be.equal('nice evening');
    chai.expect(AwesomeString('clouds').upperCase() == 'CLOUDS').to.be.true;
  });

  it('wrapper object should coerce to a string', function () {
    chai.expect('nice ' + AwesomeString.chain('hello world').words()).to.be.equal('nice hello,world');
    chai.expect(AwesomeString('green tree').split(' ') == 'green,tree').to.be.true;
  });

  it('wrapper object should provide toJSON method', function () {
    chai.expect(JSON.stringify(AwesomeString.chain('happy coding').upperCase().split(' '))).to.be.equal('["HAPPY","CODING"]');
  });
});

describe('charAt', function () {

  it('should return the character by index', function () {
    chai.expect(AwesomeString.charAt('Good day', 0)).to.be.equal('G');
    chai.expect(AwesomeString.charAt('Good day', 1)).to.be.equal('o');
    chai.expect(AwesomeString.charAt('Good day', 7)).to.be.equal('y');
    chai.expect(AwesomeString.charAt(PRINTABLE_ASCII, 0)).to.be.equal(' ');
    chai.expect(AwesomeString.charAt('', 0)).to.be.equal('');
    chai.expect(AwesomeString.charAt('Good day')).to.be.equal('G');
    chai.expect(AwesomeString.charAt('Good day', undefined)).to.be.equal('G');
    chai.expect(AwesomeString.charAt('Good day', null)).to.be.equal('G');
    chai.expect(AwesomeString.charAt('Good day', NaN)).to.be.equal('G');
  });

  it('should return an empty string for out of bounds index', function () {
    chai.expect(AwesomeString.charAt('Good day', -1)).to.be.equal('');
    chai.expect(AwesomeString.charAt('Good day', 100)).to.be.equal('');
  });

  it('should return the character by index of a string representation of an object', function () {
    chai.expect(AwesomeString.charAt(['Good evening'], 5)).to.be.equal('e');
    chai.expect(AwesomeString.charAt({
      toString: function () {
        return 'Morning';
      }
    }, 1)).to.be.equal('o');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(AwesomeString.charAt()).to.be.equal('');
    chai.expect(AwesomeString.charAt(undefined)).to.be.equal('');
    chai.expect(AwesomeString.charAt(null)).to.be.equal('');
    chai.expect(AwesomeString.charAt(null, null)).to.be.equal('');
    chai.expect(AwesomeString.charAt(undefined, undefined)).to.be.equal('');
  });
});

describe('codePointAt', function () {

  it('should return the code pount number by position', function () {
    chai.expect(AwesomeString.codePointAt('Good day', 0)).to.be.equal(0x0047);
    chai.expect(AwesomeString.codePointAt('Good day', 1)).to.be.equal(0x006F);
    chai.expect(AwesomeString.codePointAt('Good day', 7)).to.be.equal(0x0079);
    chai.expect(AwesomeString.codePointAt(PRINTABLE_ASCII, 0)).to.be.equal(0x0020);
    chai.expect(AwesomeString.codePointAt('man\u0303ana', 2)).to.equal(0x006E);
    chai.expect(AwesomeString.codePointAt('\u00E9\u20DD', 0)).to.equal(0x00E9);
    chai.expect(AwesomeString.codePointAt('\uD835\uDC00\uD835\uDC01', 0)).to.equal(0x1D400);
    chai.expect(AwesomeString.codePointAt('\uD835\uDC00\uD835\uDC01', 1)).to.equal(0xDC00);
    chai.expect(AwesomeString.codePointAt('\uD835\uDC00\uD835\uDC01', 2)).to.equal(0x1D401);
    chai.expect(AwesomeString.codePointAt('\uD835\uDC00\uD835\uDC01', 3)).to.equal(0xDC01);
    chai.expect(AwesomeString.codePointAt('cafe\u0301', 3)).to.equal(0x0065);
    chai.expect(AwesomeString.codePointAt('cafe\u0301', 4)).to.equal(0x0301);
    chai.expect(AwesomeString.codePointAt('foo\u0303\u035C\u035D\u035Ebar', 2)).to.equal(0x006F);
    chai.expect(AwesomeString.codePointAt('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar\uD834\uDF06\u0303\u035C\u035D', 3)).to.equal(0x1D306);
    chai.expect(AwesomeString.codePointAt('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar\uD834\uDF06\u0303\u035C\u035D', 12)).to.equal(0x1D306);
    chai.expect(AwesomeString.codePointAt('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar\uD834\uDF06\u0303\u035C\u035D', 13)).to.equal(0xDF06);
    chai.expect(AwesomeString.codePointAt('Good day')).to.be.equal(0x0047);
    chai.expect(AwesomeString.codePointAt('Good day', undefined)).to.be.equal(0x0047);
    chai.expect(AwesomeString.codePointAt('Good day', null)).to.be.equal(0x0047);
    chai.expect(AwesomeString.codePointAt('Good day', NaN)).to.be.equal(0x0047);
    chai.expect(AwesomeString.codePointAt(String.fromCharCode(0xD835) + '0', 0)).to.be.equal(0xD835);
  });

  it('should return undefined for out of bounds position', function () {
    chai.expect(AwesomeString.codePointAt('Good day', -1)).to.be.equal(undefined);
    chai.expect(AwesomeString.codePointAt('Good day', 100)).to.be.equal(undefined);
    chai.expect(AwesomeString.codePointAt('cafe\u0301', 5)).to.be.equal(undefined);
    chai.expect(AwesomeString.codePointAt('\uD835\uDC00\uD835\uDC01', 4)).to.equal(undefined);
    chai.expect(AwesomeString.codePointAt('', 0)).to.be.equal(undefined);
  });

  it('should return the code point number by position in a string representation of an object', function () {
    chai.expect(AwesomeString.codePointAt(['Good evening'], 5)).to.be.equal(0x0065);
    chai.expect(AwesomeString.codePointAt({
      toString: function () {
        return 'Morning';
      }
    }, 1)).to.be.equal(0x006F);
  });

  it('should return undefined for null or undefined', function () {
    chai.expect(AwesomeString.codePointAt()).to.be.equal(undefined);
    chai.expect(AwesomeString.codePointAt(undefined)).to.be.equal(undefined);
    chai.expect(AwesomeString.codePointAt(null)).to.be.equal(undefined);
    chai.expect(AwesomeString.codePointAt(null, null)).to.be.equal(undefined);
    chai.expect(AwesomeString.codePointAt(undefined, undefined)).to.be.equal(undefined);
  });
});

describe('graphemeAt', function () {

  it('should return the grapheme by index', function () {
    chai.expect(AwesomeString.graphemeAt('Good day', 0)).to.be.equal('G');
    chai.expect(AwesomeString.graphemeAt('Good day', 1)).to.be.equal('o');
    chai.expect(AwesomeString.graphemeAt('Good day', 7)).to.be.equal('y');
    chai.expect(AwesomeString.graphemeAt(PRINTABLE_ASCII, 0)).to.be.equal(' ');
    chai.expect(AwesomeString.graphemeAt('man\u0303ana', 2)).to.equal('n\u0303');
    chai.expect(AwesomeString.graphemeAt('\u00E9\u20DD', 0)).to.equal('\u00E9\u20DD');
    chai.expect(AwesomeString.graphemeAt('\uD835\uDC00\uD835\uDC01', 1)).to.equal('\uD835\uDC01');
    chai.expect(AwesomeString.graphemeAt('cafe\u0301', 3)).to.equal('e\u0301');
    chai.expect(AwesomeString.graphemeAt('foo\u0303\u035C\u035D\u035Ebar', 2)).to.equal('o\u0303\u035C\u035D\u035E');
    chai.expect(AwesomeString.graphemeAt('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar\uD834\uDF06\u0303\u035C\u035D', 3)).to.equal('\uD834\uDF06\u0303\u035C\u035D\u035E');
    chai.expect(AwesomeString.graphemeAt('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar\uD834\uDF06\u0303\u035C\u035D', 7)).to.equal('\uD834\uDF06\u0303\u035C\u035D');
    chai.expect(AwesomeString.graphemeAt('', 0)).to.be.equal('');
    chai.expect(AwesomeString.graphemeAt('Good day')).to.be.equal('G');
    chai.expect(AwesomeString.graphemeAt('Good day', undefined)).to.be.equal('G');
    chai.expect(AwesomeString.graphemeAt('Good day', null)).to.be.equal('G');
    chai.expect(AwesomeString.graphemeAt('Good day', NaN)).to.be.equal('G');
  });

  it('should return an empty string for out of bounds index', function () {
    chai.expect(AwesomeString.graphemeAt('Good day', -1)).to.be.equal('');
    chai.expect(AwesomeString.graphemeAt('Good day', 100)).to.be.equal('');
    chai.expect(AwesomeString.graphemeAt('cafe\u0301', 4)).to.be.equal('');
  });

  it('should return the grapheme by index of a string representation of an object', function () {
    chai.expect(AwesomeString.graphemeAt(['Good evening'], 5)).to.be.equal('e');
    chai.expect(AwesomeString.graphemeAt({
      toString: function () {
        return 'Morning';
      }
    }, 1)).to.be.equal('o');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(AwesomeString.graphemeAt()).to.be.equal('');
    chai.expect(AwesomeString.graphemeAt(undefined)).to.be.equal('');
    chai.expect(AwesomeString.graphemeAt(null)).to.be.equal('');
    chai.expect(AwesomeString.graphemeAt(null, null)).to.be.equal('');
    chai.expect(AwesomeString.graphemeAt(undefined, undefined)).to.be.equal('');
  });
});

describe('first', function () {

  it('should return the first part of a string', function () {
    chai.expect(AwesomeString.first('Good day', -1)).to.be.equal('');
    chai.expect(AwesomeString.first('Good day', 0)).to.be.equal('');
    chai.expect(AwesomeString.first('Good day', 4)).to.be.equal('Good');
    chai.expect(AwesomeString.first('Good day', 1)).to.be.equal('G');
    chai.expect(AwesomeString.first('Good day', 8)).to.be.equal('Good day');
    chai.expect(AwesomeString.first('Good day', 1000)).to.be.equal('Good day');
    chai.expect(AwesomeString.first('Good day')).to.be.equal('G');
    chai.expect(AwesomeString.first('', 5)).to.be.equal('');
    chai.expect(AwesomeString.first('', 0)).to.be.equal('');
    chai.expect(AwesomeString.first('')).to.be.equal('');
    chai.expect(AwesomeString.first(PRINTABLE_ASCII, PRINTABLE_ASCII.length)).to.be.equal(PRINTABLE_ASCII);
    chai.expect(AwesomeString.first(PRINTABLE_ASCII, 1)).to.be.equal(PRINTABLE_ASCII[0]);
  });

  it('should return the first part of a string representation of an object', function () {
    chai.expect(AwesomeString.first(['Good evening'], 5)).to.be.equal('Good ');
    chai.expect(AwesomeString.first({
      toString: function () {
        return 'Morning';
      }
    }, 2)).to.be.equal('Mo');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(AwesomeString.first()).to.be.equal('');
    chai.expect(AwesomeString.first(undefined)).to.be.equal('');
    chai.expect(AwesomeString.first(null)).to.be.equal('');
    chai.expect(AwesomeString.first(null, null)).to.be.equal('');
    chai.expect(AwesomeString.first(undefined, undefined)).to.be.equal('');
  });
});

describe('last', function () {

  it('should return the last part of a string', function () {
    chai.expect(AwesomeString.last('Good day', -1)).to.be.equal('');
    chai.expect(AwesomeString.last('Good day', 0)).to.be.equal('');
    chai.expect(AwesomeString.last('Good day', 4)).to.be.equal(' day');
    chai.expect(AwesomeString.last('Good day', 1)).to.be.equal('y');
    chai.expect(AwesomeString.last('Good day', 8)).to.be.equal('Good day');
    chai.expect(AwesomeString.last('Good day', 1000)).to.be.equal('Good day');
    chai.expect(AwesomeString.last('Good day')).to.be.equal('y');
    chai.expect(AwesomeString.last('', 5)).to.be.equal('');
    chai.expect(AwesomeString.last('', 0)).to.be.equal('');
    chai.expect(AwesomeString.last('')).to.be.equal('');
    chai.expect(AwesomeString.last(PRINTABLE_ASCII, PRINTABLE_ASCII.length)).to.be.equal(PRINTABLE_ASCII);
    chai.expect(AwesomeString.last(PRINTABLE_ASCII, 1)).to.be.equal(PRINTABLE_ASCII[PRINTABLE_ASCII.length - 1]);
  });

  it('should return the last part of a string representation of an object', function () {
    chai.expect(AwesomeString.last(['Good evening'], 5)).to.be.equal('ening');
    chai.expect(AwesomeString.last({
      toString: function () {
        return 'Morning';
      }
    }, 2)).to.be.equal('ng');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(AwesomeString.last()).to.be.equal('');
    chai.expect(AwesomeString.last(undefined)).to.be.equal('');
    chai.expect(AwesomeString.last(null)).to.be.equal('');
    chai.expect(AwesomeString.last(null, null)).to.be.equal('');
    chai.expect(AwesomeString.last(undefined, undefined)).to.be.equal('');
  });
});

describe('prune', function () {

  it('should prune a string', function () {
    chai.expect(AwesomeString.prune('Once upon a time there lived in a certain village a little country girl', 7)).to.be.equal('Once...');
    chai.expect(AwesomeString.prune('I\'ll go this way and go you that', 19, ' (read more)')).to.be.equal('I\'ll go (read more)');
    chai.expect(AwesomeString.prune('Little Red Riding Hood', 6, '...')).to.be.equal('...');
    chai.expect(AwesomeString.prune('Little Red Riding Hood', 9, '...')).to.be.equal('Little...');
    chai.expect(AwesomeString.prune('Little Red Riding Hood', 11, '...')).to.be.equal('Little...');
    chai.expect(AwesomeString.prune('Little Red Riding Hood', 20, '...')).to.be.equal('Little Red Riding...');
    chai.expect(AwesomeString.prune('Little Red Riding Hood', 22, '...')).to.be.equal('Little Red Riding Hood');
    chai.expect(AwesomeString.prune('Little Red Riding Hood', 1, '...')).to.be.equal('...');
    chai.expect(AwesomeString.prune('Little Red Riding Hood', 5, '...')).to.be.equal('...');
    chai.expect(AwesomeString.prune('Little Red Riding Hood', 0, '(more)')).to.be.equal('(more)');
    chai.expect(AwesomeString.prune(PRINTABLE_ASCII, PRINTABLE_ASCII.length)).to.be.equal(PRINTABLE_ASCII);
    chai.expect(AwesomeString.prune(PRINTABLE_ASCII, 0)).to.be.equal('...');
  });

  it('should prune a string with extra ASCII characters', function () {
    chai.expect(AwesomeString.prune('Привет, как дела', 10, '...')).to.be.equal('Привет...');
    chai.expect(AwesomeString.prune('La variété la plus fréquente est la blanche', 12, '..')).to.be.equal('La variété..');
  });

  it('should not prune a string if length parameter is greater or equal than string length', function () {
    chai.expect(AwesomeString.prune('Once upon', 20)).to.be.equal('Once upon');
    chai.expect(AwesomeString.prune('Once', 4, ' (read more)')).to.be.equal('Once');
    chai.expect(AwesomeString.prune('', 0, '....')).to.be.equal('');
  });

  it('should prune a string representation of an object', function () {
    chai.expect(AwesomeString.prune(['Welcome'], 4)).to.be.equal('...');
    chai.expect(AwesomeString.prune({
      toString: function () {
        return 'Have a nice day';
      }
    }, 6, '..')).to.be.equal('Have..');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(AwesomeString.prune()).to.be.equal('');
    chai.expect(AwesomeString.prune(undefined)).to.be.equal('');
    chai.expect(AwesomeString.prune(null)).to.be.equal('');
  });
});

describe('slice', function () {

  it('should slice a string', function () {
    chai.expect(AwesomeString.slice('infinite loop', 9)).to.be.equal('loop');
    chai.expect(AwesomeString.slice('infinite loop', 0)).to.be.equal('infinite loop');
    chai.expect(AwesomeString.slice('infinite loop')).to.be.equal('infinite loop');
    chai.expect(AwesomeString.slice('infinite loop', 1)).to.be.equal('nfinite loop');
    chai.expect(AwesomeString.slice(PRINTABLE_ASCII, 0)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should slice a string with an end position', function () {
    chai.expect(AwesomeString.slice('infinite loop', 9, 12)).to.be.equal('loo');
    chai.expect(AwesomeString.slice('infinite loop', 9, -1)).to.be.equal('loo');
    chai.expect(AwesomeString.slice('infinite loop', 0, 'infinite loop'.length)).to.be.equal('infinite loop');
    chai.expect(AwesomeString.slice('infinite loop', 1, 2)).to.be.equal('n');
    chai.expect(AwesomeString.slice('infinite loop', -4, -1)).to.be.equal('loo');
  });

  it('should slice a string representation of an object', function () {
    chai.expect(AwesomeString.slice(['infinite loop'], 10)).to.be.equal('oop');
    chai.expect(AwesomeString.slice({
      toString: function () {
        return 'loop';
      }
    }, 0, 3)).to.be.equal('loo');
  });

  it('should slice a string from a number', function () {
    chai.expect(AwesomeString.slice(12345, 3)).to.be.equal('45');
    chai.expect(AwesomeString.slice(987, 1, 2)).to.be.equal('8');
  });
});

describe('substr', function () {

  it('should substract a string', function () {
    chai.expect(AwesomeString.substr('infinite loop', 9)).to.be.equal('loop');
    chai.expect(AwesomeString.substr('infinite loop', 0)).to.be.equal('infinite loop');
    chai.expect(AwesomeString.substr('infinite loop')).to.be.equal('infinite loop');
    chai.expect(AwesomeString.substr('infinite loop', 1)).to.be.equal('nfinite loop');
    chai.expect(AwesomeString.substr('infinite loop', -4)).to.be.equal('loop');
    chai.expect(AwesomeString.substr(PRINTABLE_ASCII, 0)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should substract a string with a length', function () {
    chai.expect(AwesomeString.substr('infinite loop', 9, 3)).to.be.equal('loo');
    chai.expect(AwesomeString.substr('infinite loop', 0, 'infinite loop'.length)).to.be.equal('infinite loop');
    chai.expect(AwesomeString.substr('infinite loop', 1, 1)).to.be.equal('n');
    chai.expect(AwesomeString.substr('infinite loop', -4, 1)).to.be.equal('l');
  });

  it('should substract a string representation of an object', function () {
    chai.expect(AwesomeString.substr(['infinite loop'], 10)).to.be.equal('oop');
    chai.expect(AwesomeString.substr({
      toString: function () {
        return 'loop';
      }
    }, 0, 3)).to.be.equal('loo');
  });

  it('should substract a string from a number', function () {
    chai.expect(AwesomeString.substr(12345, 3)).to.be.equal('45');
    chai.expect(AwesomeString.substr(987, 1, 1)).to.be.equal('8');
  });
});

describe('substring', function () {

  it('should substring a string', function () {
    chai.expect(AwesomeString.substring('infinite loop', 9)).to.be.equal('loop');
    chai.expect(AwesomeString.substring('infinite loop', 0)).to.be.equal('infinite loop');
    chai.expect(AwesomeString.substring('infinite loop')).to.be.equal('infinite loop');
    chai.expect(AwesomeString.substring('infinite loop', 1)).to.be.equal('nfinite loop');
    chai.expect(AwesomeString.substring(PRINTABLE_ASCII, 0)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should substring a string with an end position', function () {
    chai.expect(AwesomeString.substring('infinite loop', 9, 12)).to.be.equal('loo');
    chai.expect(AwesomeString.substring('infinite loop', 0, 'infinite loop'.length)).to.be.equal('infinite loop');
    chai.expect(AwesomeString.substring('infinite loop', 1, 2)).to.be.equal('n');
  });

  it('should substring a string representation of an object', function () {
    chai.expect(AwesomeString.substring(['infinite loop'], 10)).to.be.equal('oop');
    chai.expect(AwesomeString.substring({
      toString: function () {
        return 'loop';
      }
    }, 0, 3)).to.be.equal('loo');
  });

  it('should substring a string from a number', function () {
    chai.expect(AwesomeString.substring(12345, 3)).to.be.equal('45');
    chai.expect(AwesomeString.substring(987, 1, 2)).to.be.equal('8');
  });
});

describe('truncate', function () {

  it('should truncate a string', function () {
    chai.expect(AwesomeString.truncate('Once upon a time there lived in a certain village a little country girl', 4)).to.be.equal('O...');
    chai.expect(AwesomeString.truncate('I\'ll go this way and go you that', 19, ' (read more)')).to.be.equal('I\'ll go (read more)');
    chai.expect(AwesomeString.truncate('Little Red Riding Hood', 9, '...')).to.be.equal('Little...');
    chai.expect(AwesomeString.truncate('Little Red Riding Hood', 0, '(more)')).to.be.equal('(more)');
    chai.expect(AwesomeString.truncate('Little Red Riding Hood', 1, '(more)')).to.be.equal('(more)');
    chai.expect(AwesomeString.truncate('Little Red Riding Hood', 2, '(more)')).to.be.equal('(more)');
    chai.expect(AwesomeString.truncate('Little Red Riding Hood', 3, '(more)')).to.be.equal('(more)');
    chai.expect(AwesomeString.truncate('Little Red Riding Hood', 6, '(more)')).to.be.equal('(more)');
    chai.expect(AwesomeString.truncate('Little Red Riding Hood', 7, '(more)')).to.be.equal('L(more)');
    chai.expect(AwesomeString.truncate('Little Red Riding Hood', 7, '')).to.be.equal('Little ');
    chai.expect(AwesomeString.truncate('Little Red Riding Hood', 0, '')).to.be.equal('');
    chai.expect(AwesomeString.truncate(PRINTABLE_ASCII, PRINTABLE_ASCII.length)).to.be.equal(PRINTABLE_ASCII);
    chai.expect(AwesomeString.truncate(PRINTABLE_ASCII, 0)).to.be.equal('...');
  });

  it('should not truncate a string if length parameter is greater or equal than string length', function () {
    chai.expect(AwesomeString.truncate('Once upon', 20)).to.be.equal('Once upon');
    chai.expect(AwesomeString.truncate('Once', 4, ' (read more)')).to.be.equal('Once');
    chai.expect(AwesomeString.truncate('', 0, '....')).to.be.equal('');
  });

  it('should truncate a string representation of an object', function () {
    chai.expect(AwesomeString.truncate(['Welcome'], 6)).to.be.equal('Wel...');
    chai.expect(AwesomeString.truncate({
      toString: function () {
        return 'Have a nice day';
      }
    }, 4, '..')).to.be.equal('Ha..');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(AwesomeString.truncate()).to.be.equal('');
    chai.expect(AwesomeString.truncate(undefined)).to.be.equal('');
    chai.expect(AwesomeString.truncate(null)).to.be.equal('');
  });
});

describe('count', function () {

  it('should return the number of characters in a string', function () {
    chai.expect(AwesomeString.count('rain')).to.be.equal(4);
    chai.expect(AwesomeString.count('')).to.be.equal(0);
    chai.expect(AwesomeString.count('rainbow')).to.be.equal(7);
    chai.expect(AwesomeString.count(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.length);
  });

  it('should return the number of characters in a number', function () {
    chai.expect(AwesomeString.count(123)).to.be.equal(3);
    chai.expect(AwesomeString.count(0)).to.be.equal(1);
    chai.expect(AwesomeString.count(-1.5)).to.be.equal(4);
  });

  it('should return the number of characters in a string representation of an object', function () {
    chai.expect(AwesomeString.count(['droplet'])).to.be.equal(7);
    chai.expect(AwesomeString.count({
      toString: function () {
        return 'rainfall';
      }
    })).to.be.equal(8);
  });

  it('should return zero for undefined or null', function () {
    chai.expect(AwesomeString.count()).to.be.equal(0);
    chai.expect(AwesomeString.count(null)).to.be.equal(0);
    chai.expect(AwesomeString.count(undefined)).to.be.equal(0);
  });
});

describe('countGraphemes', function () {

  it('should return the number of characters in a string', function () {
    chai.expect(AwesomeString.countGraphemes('rain')).to.be.equal(4);
    chai.expect(AwesomeString.countGraphemes('')).to.be.equal(0);
    chai.expect(AwesomeString.countGraphemes('rainbow')).to.be.equal(7);
    chai.expect(AwesomeString.countGraphemes('\u00E9\u20DD')).to.be.equal(1);
    chai.expect(AwesomeString.countGraphemes('\uD835\uDC00\uD835\uDC01')).to.be.equal(2);
    chai.expect(AwesomeString.countGraphemes('man\u0303ana')).to.be.equal(6);
    chai.expect(AwesomeString.countGraphemes('cafe\u0301')).to.be.equal(4);
    chai.expect(AwesomeString.countGraphemes('foo\u0303\u035C\u035D\u035Ebar')).to.be.equal(6);
    chai.expect(AwesomeString.countGraphemes('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar')).to.be.equal(7);
    chai.expect(AwesomeString.countGraphemes(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.length);
  });

  it('should return the number of characters in a number', function () {
    chai.expect(AwesomeString.countGraphemes(123)).to.be.equal(3);
    chai.expect(AwesomeString.countGraphemes(0)).to.be.equal(1);
    chai.expect(AwesomeString.countGraphemes(-1.5)).to.be.equal(4);
  });

  it('should return the number of characters in a string representation of an object', function () {
    chai.expect(AwesomeString.countGraphemes(['droplet'])).to.be.equal(7);
    chai.expect(AwesomeString.countGraphemes({
      toString: function () {
        return 'rainfall';
      }
    })).to.be.equal(8);
  });

  it('should return zero for undefined or null', function () {
    chai.expect(AwesomeString.countGraphemes()).to.be.equal(0);
    chai.expect(AwesomeString.countGraphemes(null)).to.be.equal(0);
    chai.expect(AwesomeString.countGraphemes(undefined)).to.be.equal(0);
  });
});

describe('countSubstrings', function () {

  it('should return the number of substring appearances in a string', function () {
    chai.expect(AwesomeString.countSubstrings('Hey man where-where-where\'s your cup holder?', 'where')).to.be.equal(3);
    chai.expect(AwesomeString.countSubstrings('And some Skittles', 'Skittles')).to.be.equal(1);
    chai.expect(AwesomeString.countSubstrings('And some Skittles', 'chocolate')).to.be.equal(0);
    chai.expect(AwesomeString.countSubstrings('******', '*')).to.be.equal(6);
    chai.expect(AwesomeString.countSubstrings('*******', '**')).to.be.equal(3);
    chai.expect(AwesomeString.countSubstrings('*******', '**-')).to.be.equal(0);
    chai.expect(AwesomeString.countSubstrings('*******', '***')).to.be.equal(2);
    chai.expect(AwesomeString.countSubstrings('*******', '****')).to.be.equal(1);
    chai.expect(AwesomeString.countSubstrings('*******', '********')).to.be.equal(0);
    chai.expect(AwesomeString.countSubstrings('*-*-*', '**')).to.be.equal(0);
    chai.expect(AwesomeString.countSubstrings('', '')).to.be.equal(0);
    chai.expect(AwesomeString.countSubstrings(PRINTABLE_ASCII, '#')).to.be.equal(1);
  });

  it('should return the number of appearances of a number in a number', function () {
    chai.expect(AwesomeString.countSubstrings(111222, 1)).to.be.equal(3);
    chai.expect(AwesomeString.countSubstrings(0, 0)).to.be.equal(1);
    chai.expect(AwesomeString.countSubstrings(15, 16)).to.be.equal(0);
  });

  it('should return the number of substring appearances in a string representation of an object', function () {
    chai.expect(AwesomeString.countSubstrings(['where-where-where'], 'where')).to.be.equal(3);
    chai.expect(AwesomeString.countSubstrings({
      toString: function () {
        return 'where-where-where';
      }
    }, 'where')).to.be.equal(3);
  });

  it('should return zero for undefined or null', function () {
    chai.expect(AwesomeString.countSubstrings()).to.be.equal(0);
    chai.expect(AwesomeString.countSubstrings(undefined)).to.be.equal(0);
    chai.expect(AwesomeString.countSubstrings(null)).to.be.equal(0);
    chai.expect(AwesomeString.countSubstrings(undefined, undefined)).to.be.equal(0);
    chai.expect(AwesomeString.countSubstrings(null, null)).to.be.equal(0);
  });
});

describe('countWhere', function () {

  it('should return the number of characters in a string for a predicate', function () {
    chai.expect(AwesomeString.countWhere('', AwesomeString.isAlpha)).to.be.equal(0);
    chai.expect(AwesomeString.countWhere('africa654', AwesomeString.isAlpha)).to.be.equal(6);
    chai.expect(AwesomeString.countWhere('790', AwesomeString.isAlpha)).to.be.equal(0);
    chai.expect(AwesomeString.countWhere(PRINTABLE_ASCII, AwesomeString.isDigit)).to.be.equal(10);
    chai.expect(AwesomeString.countWhere('****--**--**', function (character) {
      return character === '*';
    })).to.be.equal(8);
    chai.expect(AwesomeString.countWhere('****--**--**', function () {
      return false;
    })).to.be.equal(0);
  });

  it('should invoke the predicate with correct parameters and context', function () {
    var verifyIndex = 0;
    var context = {};
    var verifyString = '0123456789';
    chai.expect(AwesomeString.countWhere(verifyString, function (character, index, string) {
      chai.expect(index).to.be.equal(verifyIndex);
      chai.expect(this).to.be.equal(context);
      chai.expect(string).to.be.equal(verifyString);
      chai.expect(character).to.be.equal(verifyString[verifyIndex]);
      verifyIndex++;
      return true;
    }, context)).to.be.equal(10);
  });

  it('should return the number of characters in a number for a predicate', function () {
    chai.expect(AwesomeString.countWhere(123, AwesomeString.isDigit)).to.be.equal(3);
    chai.expect(AwesomeString.countWhere(0, AwesomeString.isDigit)).to.be.equal(1);
    chai.expect(AwesomeString.countWhere(-1.5, AwesomeString.isDigit)).to.be.equal(2);
  });

  it('should return the number of characters in a string representation of an object for a predicate', function () {
    chai.expect(AwesomeString.countWhere(['droplet'], AwesomeString.isDigit)).to.be.equal(0);
    chai.expect(AwesomeString.countWhere({
      toString: function () {
        return 'homo sapiens';
      }
    }, AwesomeString.isAlphaDigit)).to.be.equal(11);
  });

  it('should return zero for a non function predicate', function () {
    chai.expect(AwesomeString.countWhere('africa')).to.be.equal(0);
    chai.expect(AwesomeString.countWhere('africa', undefined)).to.be.equal(0);
    chai.expect(AwesomeString.countWhere('africa', null)).to.be.equal(0);
    chai.expect(AwesomeString.countWhere('africa', 'africa')).to.be.equal(0);
    chai.expect(AwesomeString.countWhere('africa', 0)).to.be.equal(0);
    chai.expect(AwesomeString.countWhere()).to.be.equal(0);
  });
});

describe('countcountWords', function () {

  it('should the words in a string', function () {
    chai.expect(AwesomeString.countWords('123')).to.equal(1);
    chai.expect(AwesomeString.countWords('15+20=35')).to.equal(3);
    chai.expect(AwesomeString.countWords('hello')).to.equal(1);
    chai.expect(AwesomeString.countWords('  hello   ')).to.equal(1);
    chai.expect(AwesomeString.countWords('hello world')).to.equal(2);
    chai.expect(AwesomeString.countWords('12+14-18*400')).to.equal(4);
    chai.expect(AwesomeString.countWords('gravity can cross dimensions')).to.equal(4);
    chai.expect(AwesomeString.countWords('-gravity-can-cross-dimensions-')).to.equal(4);
    chai.expect(AwesomeString.countWords('gravity_can_cross_dimensions')).to.equal(4);
    chai.expect(AwesomeString.countWords('*gravity***can****cross&&dimensions++')).to.equal(4);
    chai.expect(AwesomeString.countWords('GravityCanCrossDimensions')).to.equal(4);
    chai.expect(AwesomeString.countWords('GRAVITYCan')).to.equal(2);
    chai.expect(AwesomeString.countWords('GravityCan')).to.equal(2);
    chai.expect(AwesomeString.countWords('GravityCANAttract')).to.equal(3);
    chai.expect(AwesomeString.countWords('gravityCan')).to.equal(2);
    chai.expect(AwesomeString.countWords('Gravity-Can11Cross **Dimensions1Foo')).to.equal(7);
    chai.expect(AwesomeString.countWords('Cooper... Cooper... Come in, Cooper.')).to.equal(5);
    chai.expect(AwesomeString.countWords('Newton\'s third law')).to.equal(4);
    chai.expect(AwesomeString.countWords('Newton\'s thIrd lAw')).to.equal(6);
    chai.expect(AwesomeString.countWords(PRINTABLE_ASCII)).to.equal(3);
    chai.expect(AwesomeString.countWords('')).to.equal(0);
    chai.expect(AwesomeString.countWords()).to.equal(0);
    chai.expect(AwesomeString.countWords(' ')).to.equal(0);
    chai.expect(AwesomeString.countWords('     ')).to.equal(0);
    chai.expect(AwesomeString.countWords('\n')).to.equal(0);
    chai.expect(AwesomeString.countWords('***')).to.equal(0);
    chai.expect(AwesomeString.countWords('***---')).to.equal(0);
    chai.expect(AwesomeString.countWords('***---')).to.equal(0);
    chai.expect(AwesomeString.countWords('man\u0303ana')).to.equal(1);
    chai.expect(AwesomeString.countWords('maN\u0303ana')).to.equal(2);
    chai.expect(AwesomeString.countWords('foo\u0303\u035C\u035D\u035E bar')).to.equal(2);
    chai.expect(AwesomeString.countWords('fo-O-O\u0303\u035C\u035D\u035E-bar')).to.equal(4);
  });

  it('should count the words in a string with diacritics', function () {
    chai.expect(AwesomeString.countWords('clasificación biológica.')).to.equal(2);
    chai.expect(AwesomeString.countWords('BunăZiua')).to.equal(2);
    chai.expect(AwesomeString.countWords('Bună1ZiUa!')).to.equal(4);
    chai.expect(AwesomeString.countWords('Język /polski wywodzi się z` języka` praindoeuropejskiego za**pośrednictwem+języka-prasłowiańskiego.')).to.equal(11);
    chai.expect(AwesomeString.countWords('Гравитация притягивает все')).to.equal(3);
    chai.expect(AwesomeString.countWords('Гравитация-Притягивает-ВСЕ!!')).to.equal(3);
    chai.expect(AwesomeString.countWords('Στις--αρχές** (του) 21ου, αιώνα!')).to.equal(6);
  });

  it('should count the countWords in a string representation of an object', function () {
    chai.expect(AwesomeString.countWords(['GravityCanCrossDimensions'])).to.equal(4);
    chai.expect(AwesomeString.countWords({
      toString: function () {
        return 'Gr4v1ty';
      }
    })).to.equal(5);
  });

  it('should count the words in a string into countWords using a pattern', function () {
    chai.expect(AwesomeString.countWords('1234567890', /\d/g)).to.equal(10);
    chai.expect(AwesomeString.countWords('gravity', /\w{1,2}/g)).to.equal(4);
    chai.expect(AwesomeString.countWords('gravity can cross dimensions', '\\w+(?=\\s?)', 'g')).to.equal(4);
    chai.expect(AwesomeString.countWords('1234567890', /\s/g)).to.equal(0);
  });

  it('should count the words in a string with default pattern for null and undefined', function () {
    chai.expect(AwesomeString.countWords('gravity_can_cross_dimensions', null)).to.equal(4);
    chai.expect(AwesomeString.countWords('gravity_can_cross_dimensions', undefined)).to.equal(4);
  });
});

describe('escapeHtml', function () {

  it('should return the escaped string', function () {
    chai.expect(AwesomeString.escapeHtml('<>&"\'`')).to.be.equal('&lt;&gt;&amp;&quot;&#x27;&#x60;');
    chai.expect(AwesomeString.escapeHtml('<p>wonderful world</p>')).to.be.equal('&lt;p&gt;wonderful world&lt;/p&gt;');
    chai.expect(AwesomeString.escapeHtml(PRINTABLE_ASCII)).to.be.equal(' !&quot;#$%&amp;&#x27;()*+,-./0123456789:;&lt;=&gt;?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_&#x60;abcdefghijklmnopqrstuvwxyz{|}~');
  });

  it('should return the escaped string representation of an object', function () {
    chai.expect(AwesomeString.escapeHtml(['<span>'])).to.be.equal('&lt;span&gt;');
    chai.expect(AwesomeString.escapeHtml({
      toString: function () {
        return '<script>';
      }
    })).to.be.equal('&lt;script&gt;');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(AwesomeString.escapeHtml()).to.be.equal('');
    chai.expect(AwesomeString.escapeHtml(undefined)).to.be.equal('');
    chai.expect(AwesomeString.escapeHtml(null)).to.be.equal('');
  });
});

describe('escapeRegExp', function () {

  it('should return the escaped string', function () {
    chai.expect(AwesomeString.escapeRegExp('-[]/{}()*+?.\\^$|')).to.be.equal('\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|');
    chai.expect(AwesomeString.escapeRegExp('time')).to.be.equal('time');
    chai.expect(AwesomeString.escapeRegExp('500-200')).to.be.equal('500\\-200');
    chai.expect(AwesomeString.escapeRegExp('')).to.be.equal('');
    chai.expect(new RegExp(AwesomeString.escapeRegExp('[a-z0-9]?')).test('[a-z0-9]?')).to.be.true;
    chai.expect(new RegExp(AwesomeString.escapeRegExp('.*')).test('future')).to.be.false;
  });

  it('should return the escaped string representation of an object', function () {
    chai.expect(AwesomeString.escapeRegExp(['-[]object'])).to.be.equal('\\-\\[\\]object');
    chai.expect(AwesomeString.escapeRegExp({
      toString: function () {
        return '1.15';
      }
    })).to.be.equal('1\\.15');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(AwesomeString.escapeRegExp()).to.be.equal('');
    chai.expect(AwesomeString.escapeRegExp(undefined)).to.be.equal('');
    chai.expect(AwesomeString.escapeRegExp(null)).to.be.equal('');
  });
});

describe('unescapeHtml', function () {

  it('should return the unescaped', function () {
    chai.expect(AwesomeString.unescapeHtml('&lt;&gt;&amp;&quot;&#x27;&#x60;')).to.be.equal('<>&"\'`');
    chai.expect(AwesomeString.unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;')).to.be.equal('<p>wonderful world</p>');
    chai.expect(AwesomeString.unescapeHtml('&#x003C;p&#0062;wonderful world&#x003C;/p&#0062;')).to.be.equal('<p>wonderful world</p>');
    chai.expect(AwesomeString.unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;')).to.be.equal('<p>wonderful world</p>');
    chai.expect(AwesomeString.unescapeHtml('&lt;p&gt;wonderful world&lt;/p&gt;')).to.be.equal('<p>wonderful world</p>');
    chai.expect(AwesomeString.unescapeHtml('&lt; &#x03c; &#060; &gt; &#x03e; &#062; &amp; &#x026; &#038; &quot; &#x022; &#034; &#x027; &#039; &#x060; &#096;')).to.be.equal('< < < > > > & & & " " " \' \' ` `');
    chai.expect(AwesomeString.unescapeHtml(' !&quot;#$%&amp;&#x27;()*+,-./0123456789:;&lt;=&gt;?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_&#x60;abcdefghijklmnopqrstuvwxyz{|}~')).to.be.equal(PRINTABLE_ASCII);
    chai.expect(AwesomeString.unescapeHtml('<>&"\'`')).to.be.equal('<>&"\'`');
  });

  it('should return the unescaped string representation of an object', function () {
    chai.expect(AwesomeString.unescapeHtml(['&lt;span&gt;'])).to.be.equal('<span>');
    chai.expect(AwesomeString.unescapeHtml({
      toString: function () {
        return '&lt;script&gt;';
      }
    })).to.be.equal('<script>');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(AwesomeString.unescapeHtml()).to.be.equal('');
    chai.expect(AwesomeString.unescapeHtml(undefined)).to.be.equal('');
    chai.expect(AwesomeString.unescapeHtml(null)).to.be.equal('');
  });
});

describe('coerceToBoolean', function () {

  it('should coerce the value to boolean', function () {
    chai.expect(coerceToBoolean(true)).to.be.equal(true);
    chai.expect(coerceToBoolean(false)).to.be.equal(false);
    chai.expect(coerceToBoolean(1)).to.be.equal(true);
    chai.expect(coerceToBoolean(null)).to.be.equal(false);
    chai.expect(coerceToBoolean(null, true)).to.be.equal(true);
    chai.expect(coerceToBoolean(undefined)).to.be.equal(false);
    chai.expect(coerceToBoolean(undefined, true)).to.be.equal(true);
    chai.expect(coerceToBoolean(undefined, false)).to.be.equal(false);
  });
});

describe('coerceToNumber', function () {

  it('should coerce the value to number', function () {
    chai.expect(coerceToNumber(10)).to.be.equal(10);
    chai.expect(coerceToNumber(0)).to.be.equal(0);
    chai.expect(coerceToNumber(true)).to.be.equal(1);
    chai.expect(coerceToNumber(null)).to.be.equal(0);
    chai.expect(coerceToNumber(null, 1)).to.be.equal(1);
    chai.expect(coerceToNumber(undefined)).to.be.equal(0);
    chai.expect(coerceToNumber(undefined, 1)).to.be.equal(1);
    chai.expect(coerceToNumber(undefined, 0)).to.be.equal(0);
  });
});

describe('coerceToRegularExpression', function () {

  it('should coerce the pattern to a regular expression', function () {
    var regexp1 = appendFlagToRegExp(/.*/g, 'g');
    chai.expect(regexp1).to.be.instanceof(RegExp);
    chai.expect(regexp1.toString()).to.be.equal('/.*/g');
    var regexp2 = appendFlagToRegExp(/.*/, 'g');
    chai.expect(regexp2).to.be.instanceof(RegExp);
    chai.expect(regexp2.toString()).to.be.equal('/.*/g');
  });
});

describe('parseTagName', function () {

  it('should parse the tag name from markup', function () {
    chai.expect(parseTagName("<img title=\"foo 'bar'\"/>")).to.be.equal('img');
    chai.expect(parseTagName("<  b>Wonderful world</b>")).to.be.equal('b');
  });
});

describe('sprintf', function () {

  it('should return a string according to string type formatting', function () {
    chai.expect(AwesomeString.sprintf('%s', 'string')).to.be.equal('string');
    chai.expect(AwesomeString.sprintf('Hello %s!', 'World')).to.be.equal('Hello World!');
    chai.expect(AwesomeString.sprintf('%s %s!', 'Hello', 'World')).to.be.equal('Hello World!');
    chai.expect(AwesomeString.sprintf('%s %s!', '%s', '%s')).to.be.equal('%s %s!');
    chai.expect(AwesomeString.sprintf('Hello %5s!', 'World')).to.be.equal('Hello World!');
    chai.expect(AwesomeString.sprintf('Hello %3s!', 'World')).to.be.equal('Hello World!');
    chai.expect(AwesomeString.sprintf('Hello %8s!', 'World')).to.be.equal('Hello    World!');
    chai.expect(AwesomeString.sprintf('%s%s%s%s%s', 'Alexander', ' ', 'the', ' ', 'Great')).to.be.equal('Alexander the Great');
    chai.expect(AwesomeString.sprintf('Alexander the %08s', 'Great')).to.be.equal('Alexander the 000Great');
    chai.expect(AwesomeString.sprintf('Alexander the % 8s', 'Great')).to.be.equal('Alexander the    Great');
    chai.expect(AwesomeString.sprintf("%'-10s the %s", 'Alexander', 'Great')).to.be.equal('-Alexander the Great');
    chai.expect(AwesomeString.sprintf("%'.12s the %09s", 'Alexander', 'Great')).to.be.equal('...Alexander the 0000Great');
    chai.expect(AwesomeString.sprintf('%-12s', 'Alexander')).to.be.equal('Alexander   ');
    chai.expect(AwesomeString.sprintf('%+-12s', 'Alexander')).to.be.equal('Alexander   ');
    chai.expect(AwesomeString.sprintf('%.4s the Great', 'Alexander')).to.be.equal('Alex the Great');
    chai.expect(AwesomeString.sprintf('%.9s the Great', 'Alexander')).to.be.equal('Alexander the Great');
    chai.expect(AwesomeString.sprintf('%.0s the Great', 'Alexander')).to.be.equal(' the Great');
    chai.expect(AwesomeString.sprintf('%10.8s the Great', 'Alexander')).to.be.equal('  Alexande the Great');
    chai.expect(AwesomeString.sprintf('%\'-10.6s %\'1-12.4s', 'Persian', 'Empire')).to.be.equal('----Persia Empi11111111');
    chai.expect(AwesomeString.sprintf('%2$s the %1$s', 'Great', 'Alexander')).to.be.equal('Alexander the Great');
    chai.expect(AwesomeString.sprintf('%2$s', 'Great', 'Alexander')).to.be.equal('Alexander');
    chai.expect(AwesomeString.sprintf('%2$\'012s the %1$.4s', 'Great', 'Alexander')).to.be.equal('000Alexander the Grea');
    chai.expect(AwesomeString.sprintf('%%%1$\'q-12.4s%%s', 'Alexander')).to.be.equal('%Alexqqqqqqqq%s');
    chai.expect(AwesomeString.sprintf('%2$s the %s', 'Great', 'Alexander')).to.be.equal('Alexander the Great');
    chai.expect(AwesomeString.sprintf('%1$s the %s', 'Great')).to.be.equal('Great the Great');
  });

  it('should return a string according to decimal integer type formatting', function () {
    chai.expect(AwesomeString.sprintf('%d', 1)).to.be.equal('1');
    chai.expect(AwesomeString.sprintf('%i', 1)).to.be.equal('1');
    chai.expect(AwesomeString.sprintf('%d %d %d', 1, 0, -100)).to.be.equal('1 0 -100');
    chai.expect(AwesomeString.sprintf('%+d %+d', 10, -10)).to.be.equal('+10 -10');
    chai.expect(AwesomeString.sprintf("%+'t4d %4d", 9, 0)).to.be.equal('tt+9    0');
    chai.expect(AwesomeString.sprintf("%010i", 90)).to.be.equal('0000000090');
    chai.expect(AwesomeString.sprintf("%+ 8d", 88)).to.be.equal('     +88');
    chai.expect(AwesomeString.sprintf("%d+%d=%d", 9, 1, 10)).to.be.equal('9+1=10');
    chai.expect(AwesomeString.sprintf("%3$04d-%2$04d=%1$04d", 9, 1, 10)).to.be.equal('0010-0001=0009');
    chai.expect(AwesomeString.sprintf("%+'T-5d", 15)).to.be.equal('+15TT');
    chai.expect(AwesomeString.sprintf("%d", 1.5e+3)).to.be.equal('1500');
    chai.expect(AwesomeString.sprintf("%d", '15NN')).to.be.equal('15');
    chai.expect(AwesomeString.sprintf("%d", '1.6')).to.be.equal('1');
    chai.expect(AwesomeString.sprintf("%d", '1.5e+3')).to.be.equal('1');
    chai.expect(AwesomeString.sprintf("%d", 'NN15')).to.be.equal('0');
    chai.expect(AwesomeString.sprintf("%d %d", '', 15)).to.be.equal('0 15');
    chai.expect(AwesomeString.sprintf("%d", '+')).to.be.equal('0');
  });

  it('should return a string according to binary integer type formatting', function () {
    chai.expect(AwesomeString.sprintf('%b', 1)).to.be.equal('1');
    chai.expect(AwesomeString.sprintf('%b %b 0b%b', 1, 0, 10)).to.be.equal('1 0 0b1010');
    chai.expect(AwesomeString.sprintf('%+b %+b', 10, 10)).to.be.equal('1010 1010');
    chai.expect(AwesomeString.sprintf("%+'t6b %4b", 9, 0)).to.be.equal('tt1001    0');
    chai.expect(AwesomeString.sprintf("%010b", 90)).to.be.equal('0001011010');
    chai.expect(AwesomeString.sprintf("%+ 8b", 88)).to.be.equal(' 1011000');
    chai.expect(AwesomeString.sprintf("%b+%b=%b", 9, 1, 10)).to.be.equal('1001+1=1010');
    chai.expect(AwesomeString.sprintf("%3$04b-%2$04b=%1$04b", 4, 1, 5)).to.be.equal('0101-0001=0100');
    chai.expect(AwesomeString.sprintf("%+'T-5b", 15)).to.be.equal('1111T');
    chai.expect(AwesomeString.sprintf("%b", 1.5e+3)).to.be.equal('10111011100');
    chai.expect(AwesomeString.sprintf("%b", '15NN')).to.be.equal('1111');
    chai.expect(AwesomeString.sprintf("%b", '1.6')).to.be.equal('1');
    chai.expect(AwesomeString.sprintf("%b", '1.5e+3')).to.be.equal('1');
    chai.expect(AwesomeString.sprintf("%b", 'NN15')).to.be.equal('0');
    chai.expect(AwesomeString.sprintf("%b %b", '', 15)).to.be.equal('0 1111');
    chai.expect(AwesomeString.sprintf("%b", '+')).to.be.equal('0');
    chai.expect(AwesomeString.sprintf("%b %b", -1, -10)).to.be.equal('11111111111111111111111111111111 11111111111111111111111111110110');
  });

  it('should return a string according to octal integer type formatting', function () {
    chai.expect(AwesomeString.sprintf('%o', 1)).to.be.equal('1');
    chai.expect(AwesomeString.sprintf('%o %o 0%o', 1, 0, 10)).to.be.equal('1 0 012');
    chai.expect(AwesomeString.sprintf('%+o %+o', 10, 10)).to.be.equal('12 12');
    chai.expect(AwesomeString.sprintf("%+'t6o %4o", 9, 0)).to.be.equal('tttt11    0');
    chai.expect(AwesomeString.sprintf("%010o", 90)).to.be.equal('0000000132');
    chai.expect(AwesomeString.sprintf("%+ 8o", 88)).to.be.equal('     130');
    chai.expect(AwesomeString.sprintf("%o+%o=%o", 9, 1, 10)).to.be.equal('11+1=12');
    chai.expect(AwesomeString.sprintf("%3$04o-%2$04o=%1$04o", 35, 5, 40)).to.be.equal('0050-0005=0043');
    chai.expect(AwesomeString.sprintf("%+'T-5o", 15)).to.be.equal('17TTT');
    chai.expect(AwesomeString.sprintf("%o", 1.5e+3)).to.be.equal('2734');
    chai.expect(AwesomeString.sprintf("%o", '15NN')).to.be.equal('17');
    chai.expect(AwesomeString.sprintf("%o", '1.6')).to.be.equal('1');
    chai.expect(AwesomeString.sprintf("%o", '1.5e+3')).to.be.equal('1');
    chai.expect(AwesomeString.sprintf("%o", 'NN15')).to.be.equal('0');
    chai.expect(AwesomeString.sprintf("%o %o", '', 15)).to.be.equal('0 17');
    chai.expect(AwesomeString.sprintf("%o", '+')).to.be.equal('0');
    chai.expect(AwesomeString.sprintf("%o %o", -1, -10)).to.be.equal('37777777777 37777777766');
  });

  it('should return a string according to hexadecimal integer type formatting', function () {
    chai.expect(AwesomeString.sprintf('%x-%X', 1, 14)).to.be.equal('1-E');
    chai.expect(AwesomeString.sprintf('%x %x 0X%x', 1, 0, 20)).to.be.equal('1 0 0X14');
    chai.expect(AwesomeString.sprintf('%+x %+x', 10, 50)).to.be.equal('a 32');
    chai.expect(AwesomeString.sprintf("%+'t6x %4x", 30, 0)).to.be.equal('tttt1e    0');
    chai.expect(AwesomeString.sprintf("%010x", 90)).to.be.equal('000000005a');
    chai.expect(AwesomeString.sprintf("%+ 8x", 88)).to.be.equal('      58');
    chai.expect(AwesomeString.sprintf("%x+%x=%x", 90, 10, 100)).to.be.equal('5a+a=64');
    chai.expect(AwesomeString.sprintf("%3$04x-%2$04x=%1$04x", 35, 5, 40)).to.be.equal('0028-0005=0023');
    chai.expect(AwesomeString.sprintf("%+'T-5x", 15)).to.be.equal('fTTTT');
    chai.expect(AwesomeString.sprintf("%1$x %1$X", 1.5e+3)).to.be.equal('5dc 5DC');
    chai.expect(AwesomeString.sprintf("%x", '15NN')).to.be.equal('f');
    chai.expect(AwesomeString.sprintf("%x", '1.6')).to.be.equal('1');
    chai.expect(AwesomeString.sprintf("%x", '1.5e+3')).to.be.equal('1');
    chai.expect(AwesomeString.sprintf("%x", 'NN15')).to.be.equal('0');
    chai.expect(AwesomeString.sprintf("%x %x", '', 15)).to.be.equal('0 f');
    chai.expect(AwesomeString.sprintf("%x", '+')).to.be.equal('0');
    chai.expect(AwesomeString.sprintf("%x %x", -1, -10)).to.be.equal('ffffffff fffffff6');
  });

  it('should return a string according to unsigned decimal integer type formatting', function () {
    chai.expect(AwesomeString.sprintf('%u-%u', 1, 14)).to.be.equal('1-14');
    chai.expect(AwesomeString.sprintf('%u %u %u', 1, 0, 20)).to.be.equal('1 0 20');
    chai.expect(AwesomeString.sprintf('%+u %+u', 10, 50)).to.be.equal('10 50');
    chai.expect(AwesomeString.sprintf("%+'t6u %4u", 30, 0)).to.be.equal('tttt30    0');
    chai.expect(AwesomeString.sprintf("%010u", 90)).to.be.equal('0000000090');
    chai.expect(AwesomeString.sprintf("%+ 8u", 88)).to.be.equal('      88');
    chai.expect(AwesomeString.sprintf("%u+%u=%u", 90, 10, 100)).to.be.equal('90+10=100');
    chai.expect(AwesomeString.sprintf("%3$04u-%2$04u=%1$04u", 35, 5, 40)).to.be.equal('0040-0005=0035');
    chai.expect(AwesomeString.sprintf("%+'T-5u", 15)).to.be.equal('15TTT');
    chai.expect(AwesomeString.sprintf("%1$u %1$u", 1.5e+3)).to.be.equal('1500 1500');
    chai.expect(AwesomeString.sprintf("%u", '15NN')).to.be.equal('15');
    chai.expect(AwesomeString.sprintf("%u", '1.6')).to.be.equal('1');
    chai.expect(AwesomeString.sprintf("%u", '1.5e+3')).to.be.equal('1');
    chai.expect(AwesomeString.sprintf("%u", 'NN15')).to.be.equal('0');
    chai.expect(AwesomeString.sprintf("%u %u", '', 15)).to.be.equal('0 15');
    chai.expect(AwesomeString.sprintf("%u", '+')).to.be.equal('0');
    chai.expect(AwesomeString.sprintf("%u %u", -1, -10)).to.be.equal('4294967295 4294967286');
  });

  it('should return a string according to ascii integer type formatting', function () {
    chai.expect(AwesomeString.sprintf('%c %c %c', 65, 0x0020, 48)).to.be.equal('A   0');
    chai.expect(AwesomeString.sprintf('%5c', 65)).to.be.equal('    A');
    chai.expect(AwesomeString.sprintf('%02c', 65)).to.be.equal('0A');
    chai.expect(AwesomeString.sprintf('%-5c', 65)).to.be.equal('A    ');
    chai.expect(AwesomeString.sprintf('%+\'t-4c', '110')).to.be.equal('nttt');
  });

  it('should return a string according to float type formatting', function () {
    chai.expect(AwesomeString.sprintf('%f %f', 1, 0)).to.be.equal('1.000000 0.000000');
    chai.expect(AwesomeString.sprintf('%+f+%+f', 50.123456789, 0)).to.be.equal('+50.123457++0.000000');
    chai.expect(AwesomeString.sprintf('%1$.0f %1$.1f %1$.2f', 1.57)).to.be.equal('2 1.6 1.57');
    chai.expect(AwesomeString.sprintf('%.2f %0.2f', 0, 0)).to.be.equal('0.00 0.00');
    chai.expect(AwesomeString.sprintf('%4f %05.2f', -15.789, 1.27)).to.be.equal('-15.789000 01.27');
    chai.expect(AwesomeString.sprintf("%'f10f", 1.5)).to.be.equal('ff1.500000');
    chai.expect(AwesomeString.sprintf("%+-12f", 101.101)).to.be.equal('+101.101000 ');
    chai.expect(AwesomeString.sprintf("%+'s-15.10f", 9.7654321)).to.be.equal('+9.7654321000ss');
    chai.expect(AwesomeString.sprintf("%06.2f", 8)).to.be.equal('008.00');
    chai.expect(AwesomeString.sprintf('%f %.1f', '34.111', '-15.67')).to.be.equal('34.111000 -15.7');
    chai.expect(AwesomeString.sprintf('%.3f %.2f', '1.123456e+0', '1.3E+2')).to.be.equal('1.123 130.00');
    chai.expect(AwesomeString.sprintf('%.3f', '-567.123456e+6')).to.be.equal('-567123456.000');
    chai.expect(AwesomeString.sprintf('%f %f %f', '1FF', '-15.67TUU', '.1')).to.be.equal('1.000000 -15.670000 0.100000');
    chai.expect(AwesomeString.sprintf('%f %f %f', 'FF', '', '+')).to.be.equal('0.000000 0.000000 0.000000');
  });

  it('should return a string according to scientific float type formatting', function () {
    chai.expect(AwesomeString.sprintf('%e %e %E', 100, 0, .1)).to.be.equal('1.000000e+2 0.000000e+0 1.000000E-1');
    chai.expect(AwesomeString.sprintf('%+e+%+e', 50.123456789, 0)).to.be.equal('+5.012346e+1++0.000000e+0');
    chai.expect(AwesomeString.sprintf('%1$.0e %1$.1e %1$.2e', 1.57)).to.be.equal('2e+0 1.6e+0 1.57e+0');
    chai.expect(AwesomeString.sprintf('%.2e %0.2e', 0, 0)).to.be.equal('0.00e+0 0.00e+0');
    chai.expect(AwesomeString.sprintf('%.0e %.0e', 0, 15.7)).to.be.equal('0e+0 2e+1');
    chai.expect(AwesomeString.sprintf('%4e %08.2e', -15.789, 1.27)).to.be.equal('-1.578900e+1 01.27e+0');
    chai.expect(AwesomeString.sprintf("%'f15e", 0.105)).to.be.equal('ffff1.050000e-1');
    chai.expect(AwesomeString.sprintf("%+-14e", 101.101)).to.be.equal('+1.011010e+2  ');
    chai.expect(AwesomeString.sprintf("%+'s-20.10e", 0.097654321)).to.be.equal('+9.7654321000e-2ssss');
    chai.expect(AwesomeString.sprintf("%08.2e", 8)).to.be.equal('08.00e+0');
    chai.expect(AwesomeString.sprintf('%e %.1e', '34.111', '-15.67')).to.be.equal('3.411100e+1 -1.6e+1');
    chai.expect(AwesomeString.sprintf('%.3E %.2E', '1.123456e+0', '1.3E+2')).to.be.equal('1.123E+0 1.30E+2');
    chai.expect(AwesomeString.sprintf('%.4e', '-567.123456e+6')).to.be.equal('-5.6712e+8');
    chai.expect(AwesomeString.sprintf('%e %e %e', '1FF', '-15.67TUU', '.1')).to.be.equal('1.000000e+0 -1.567000e+1 1.000000e-1');
    chai.expect(AwesomeString.sprintf('%e %e %e', 'FF', '', '+')).to.be.equal('0.000000e+0 0.000000e+0 0.000000e+0');
  });

  it('should return a string according to short float type formatting', function () {
    chai.expect(AwesomeString.sprintf('%g %g %g', 100, 0, .1)).to.be.equal('100 0 0.1');
    chai.expect(AwesomeString.sprintf('%+g+%+g', 50.123456789, 0)).to.be.equal('+50.1235++0');
    chai.expect(AwesomeString.sprintf('%1$.0g %1$.1g %1$.2g', 1.57)).to.be.equal('2 2 1.6');
    chai.expect(AwesomeString.sprintf('%.2g %0.2g', 0, 0)).to.be.equal('0 0');
    chai.expect(AwesomeString.sprintf('%.0g', 0)).to.be.equal('0');
    chai.expect(AwesomeString.sprintf('%.0g %.0g', 0, 15.7)).to.be.equal('0 2e+1');
    chai.expect(AwesomeString.sprintf('%4g %08.2g', -15.789, 1.27)).to.be.equal('-15.789 000001.3');
    chai.expect(AwesomeString.sprintf("%'f15g", 0.105)).to.be.equal('ffffffffff0.105');
    chai.expect(AwesomeString.sprintf("%+-14g", 101.101)).to.be.equal('+101.101      ');
    chai.expect(AwesomeString.sprintf("%+'s-20.10g", 0.0976543216)).to.be.equal('+0.0976543216sssssss');
    chai.expect(AwesomeString.sprintf("%+'s-20.8g", 0.0976543216)).to.be.equal('+0.097654322ssssssss');
    chai.expect(AwesomeString.sprintf("%08.2g", 8)).to.be.equal('00000008');
    chai.expect(AwesomeString.sprintf('%g %.1G', '34.111', '-15.67')).to.be.equal('34.111 -2E+1');
    chai.expect(AwesomeString.sprintf('_%.3G_%.2G_!1234567890*', '1.123456e+0', '1.3E+2')).to.be.equal('_1.12_1.3E+2_!1234567890*');
    chai.expect(AwesomeString.sprintf('%.4g', '-567.123456e+6')).to.be.equal('-5.671e+8');
    chai.expect(AwesomeString.sprintf('%g %G %g', '1FF', '-15.67TUU', '.1')).to.be.equal('1 -15.67 0.1');
    chai.expect(AwesomeString.sprintf('%g %G %g', 'FF', '', '+')).to.be.equal('0 0 0');
  });

  it('should return a string according to format', function () {
    chai.expect(AwesomeString.sprintf('%s costs $%.2f', 'Coffee', 2)).to.be.equal('Coffee costs $2.00');
    chai.expect(AwesomeString.sprintf('%%s like %s', 'Coffee')).to.be.equal('%s like Coffee');
    chai.expect(AwesomeString.sprintf("Full format: %'*10s %+d %i %04b %c %o %u %X %.0f %e %g %%", 'string', 18, -5, 4, 65, 8, 401, 255, 8.9, 50.12, 10.123456789)).to.be.equal('Full format: ****string +18 -5 0100 A 10 401 FF 9 5.012000e+1 10.1235 %');
    chai.expect(AwesomeString.sprintf('%s%d%%%s', 'word', 10, 'word')).to.be.equal('word10%word');
  });

  it('should ignore specifiers with double percent characters', function () {
    chai.expect(AwesomeString.sprintf('%%s')).to.be.equal('%s');
    chai.expect(AwesomeString.sprintf('%%s %s', 'Persian')).to.be.equal('%s Persian');
    chai.expect(AwesomeString.sprintf('%% %%')).to.be.equal('% %');
    chai.expect(AwesomeString.sprintf('%%%% %%%%%s', 'Babylon')).to.be.equal('%% %%Babylon');
  });

  it('should throw exceptions when the formatter is not valid or not enough arguments', function () {
    chai.expect(AwesomeString.sprintf.bind(AwesomeString, '%s')).to.throw(Error, 'sprintf(): Too few arguments');
    chai.expect(AwesomeString.sprintf.bind(AwesomeString, '%s %s')).to.throw(Error, 'sprintf(): Too few arguments');
    chai.expect(AwesomeString.sprintf.bind(AwesomeString, '%s %s', 'Alexander')).to.throw(Error, 'sprintf(): Too few arguments');
    chai.expect(AwesomeString.sprintf.bind(AwesomeString, '%2$s %1$s', 'Alexander')).to.throw(Error, 'sprintf(): Too few arguments');
    chai.expect(AwesomeString.sprintf.bind(AwesomeString, '%2$s %1$s', 'Alexander')).to.throw(Error, 'sprintf(): Too few arguments');
    chai.expect(AwesomeString.sprintf.bind(AwesomeString, '%a', 'Alexander')).to.throw(Error, 'sprintf(): Unknown type specifier');
    chai.expect(AwesomeString.sprintf.bind(AwesomeString, PRINTABLE_ASCII, 'Alexander')).to.throw(Error, 'sprintf(): Unknown type specifier');
    chai.expect(AwesomeString.sprintf.bind(AwesomeString, '%s the %y', 'Alexander', 'Great')).to.throw(Error, 'sprintf(): Unknown type specifier');
    chai.expect(AwesomeString.sprintf.bind(AwesomeString, '%', 'Alexander')).to.throw(Error, 'sprintf(): Unknown type specifier');
    chai.expect(AwesomeString.sprintf.bind(AwesomeString, '%%%%% %%', 'Alexander')).to.throw(Error, 'sprintf(): Unknown type specifier');
    chai.expect(AwesomeString.sprintf.bind(AwesomeString, '%0$s', 'Alexander')).to.throw(Error, 'sprintf(): Argument number must be greater than zero');
  });

  it('should return an unmodified string for missing formatting specifiers', function () {
    chai.expect(AwesomeString.sprintf('Without formatting')).to.be.equal('Without formatting');
    chai.expect(AwesomeString.sprintf('')).to.be.equal('');
    chai.expect(AwesomeString.sprintf()).to.be.equal('');
    chai.expect(AwesomeString.sprintf(undefined)).to.be.equal('');
    chai.expect(AwesomeString.sprintf(null)).to.be.equal('');
  });
});

describe('vprintf', function () {

  it('should return a string according to formatting', function () {
    chai.expect(AwesomeString.vprintf('%s', ['string'])).to.be.equal('string');
    chai.expect(AwesomeString.vprintf('Hello %s!', ['World'])).to.be.equal('Hello World!');
    chai.expect(AwesomeString.vprintf('%d %d %d', [1, 0, -100])).to.be.equal('1 0 -100');
    chai.expect(AwesomeString.vprintf('%b %b 0b%b', [1, 0, 10])).to.be.equal('1 0 0b1010');
    chai.expect(AwesomeString.vprintf('%o %o 0%o', [1, 0, 10])).to.be.equal('1 0 012');
    chai.expect(AwesomeString.vprintf('%x %x 0X%x', [1, 0, 20])).to.be.equal('1 0 0X14');
    chai.expect(AwesomeString.vprintf('%u %u %u', [1, 0, 20])).to.be.equal('1 0 20');
    chai.expect(AwesomeString.vprintf('%c %c %c', [65, 0x0020, 48])).to.be.equal('A   0');
    chai.expect(AwesomeString.vprintf('%+f+%+f', [50.123456789, 0])).to.be.equal('+50.123457++0.000000');
    chai.expect(AwesomeString.vprintf('%e %e %E', [100, 0, .1])).to.be.equal('1.000000e+2 0.000000e+0 1.000000E-1');
    chai.expect(AwesomeString.vprintf('%+g+%+g', [50.123456789, 0])).to.be.equal('+50.1235++0');
    chai.expect(AwesomeString.vprintf("Full format: %'*10s %+d %i %04b %c %o %u %X %.0f %e %g %%", ['string', 18, -5, 4, 65, 8, 401, 255, 8.9, 50.12, 10.123456789])).to.be.equal('Full format: ****string +18 -5 0100 A 10 401 FF 9 5.012000e+1 10.1235 %');
    chai.expect(AwesomeString.vprintf('%%s %s', ['Persian'])).to.be.equal('%s Persian');
  });

  it('should throw exceptions when the formatter is not valid or not enough arguments', function () {
    chai.expect(AwesomeString.vprintf.bind(AwesomeString, '%2$s %1$s', ['Alexander'])).to.throw(Error, 'sprintf(): Too few arguments');
    chai.expect(AwesomeString.vprintf.bind(AwesomeString, '%a', ['Alexander'])).to.throw(Error, 'sprintf(): Unknown type specifier');
    chai.expect(AwesomeString.vprintf.bind(AwesomeString, PRINTABLE_ASCII, ['Alexander'])).to.throw(Error, 'sprintf(): Unknown type specifier');
    chai.expect(AwesomeString.vprintf.bind(AwesomeString, '%0$s', ['Alexander'])).to.throw(Error, 'sprintf(): Argument number must be greater than zero');
  });

  it('should return an unmodified string for missing formatting specifiers', function () {
    chai.expect(AwesomeString.vprintf('Without formatting')).to.be.equal('Without formatting');
    chai.expect(AwesomeString.vprintf('Without formatting', [])).to.be.equal('Without formatting');
    chai.expect(AwesomeString.vprintf('Without formatting', [undefined])).to.be.equal('Without formatting');
    chai.expect(AwesomeString.vprintf('')).to.be.equal('');
    chai.expect(AwesomeString.vprintf(' ')).to.be.equal(' ');
    chai.expect(AwesomeString.vprintf()).to.be.equal('');
    chai.expect(AwesomeString.vprintf(undefined)).to.be.equal('');
    chai.expect(AwesomeString.vprintf(null)).to.be.equal('');
  });
});

describe('indexOf', function () {

  it('should return the index of a searched string', function () {
    chai.expect(AwesomeString.indexOf('we have a mission', 'mission')).to.be.equal(10);
    chai.expect(AwesomeString.indexOf('we have a mission', 'a')).to.be.equal(4);
    chai.expect(AwesomeString.indexOf('we have a mission', 'we')).to.be.equal(0);
    chai.expect(AwesomeString.indexOf('we have a mission', '')).to.be.equal(0);
    chai.expect(AwesomeString.indexOf('', '')).to.be.equal(0);
    chai.expect(AwesomeString.indexOf(undefined, '')).to.be.equal(0);
    chai.expect(AwesomeString.indexOf(null, '')).to.be.equal(0);
    chai.expect(AwesomeString.indexOf(PRINTABLE_ASCII, '!')).to.be.equal(1);
  });

  it('should return the index of a searched string and start index', function () {
    chai.expect(AwesomeString.indexOf('we have a mission', 'a', 6)).to.be.equal(8);
    chai.expect(AwesomeString.indexOf('we have a mission', 'we', 0)).to.be.equal(0);
    chai.expect(AwesomeString.indexOf('we have a mission', 'we', NaN)).to.be.equal(0);
    chai.expect(AwesomeString.indexOf('we have a mission', '', 0)).to.be.equal(0);
    chai.expect(AwesomeString.indexOf(PRINTABLE_ASCII, '#', 3)).to.be.equal(3);
  });

  it('should return the index of a searched string in a string representation of an object', function () {
    chai.expect(AwesomeString.indexOf(['we have a mission'], 'a')).to.be.equal(4);
    chai.expect(AwesomeString.indexOf({
      toString: function () {
        return 'we have a mission';
      }
    }, 'we')).to.be.equal(0);
  });

  it('should return -1 for an invalid ending string and position', function () {
    chai.expect(AwesomeString.indexOf('we have a mission', 'me')).to.be.equal(-1);
    chai.expect(AwesomeString.indexOf('we have a mission', '12')).to.be.equal(-1);
    chai.expect(AwesomeString.indexOf('we have a mission', 'we', 3)).to.be.equal(-1);
    chai.expect(AwesomeString.indexOf('we have a mission', 'mission', 100)).to.be.equal(-1);
    chai.expect(AwesomeString.indexOf('we have a mission', 'mission', Infinity)).to.be.equal(-1);
    chai.expect(AwesomeString.indexOf('', 'me')).to.be.equal(-1);
  });

  it('should return -1 for undefined and null parameters', function () {
    chai.expect(AwesomeString.indexOf('we have a mission')).to.be.equal(-1);
    chai.expect(AwesomeString.indexOf('we have a mission', undefined)).to.be.equal(-1);
    chai.expect(AwesomeString.indexOf('we have a mission', null)).to.be.equal(-1);
  });
});

describe('lastIndexOf', function () {

  it('should return the index of a searched string', function () {
    chai.expect(AwesomeString.lastIndexOf('we have a mission', 'mission')).to.be.equal(10);
    chai.expect(AwesomeString.lastIndexOf('we have a mission', 'a')).to.be.equal(8);
    chai.expect(AwesomeString.lastIndexOf('we have a mission', 'we')).to.be.equal(0);
    chai.expect(AwesomeString.lastIndexOf('we have a mission', '')).to.be.equal(17);
    chai.expect(AwesomeString.lastIndexOf('', '')).to.be.equal(0);
    chai.expect(AwesomeString.lastIndexOf(undefined, '')).to.be.equal(0);
    chai.expect(AwesomeString.lastIndexOf(null, '')).to.be.equal(0);
    chai.expect(AwesomeString.lastIndexOf(PRINTABLE_ASCII, '!')).to.be.equal(1);
  });

  it('should return the index of a searched string and start index', function () {
    chai.expect(AwesomeString.lastIndexOf('we have a mission', 'a', 17)).to.be.equal(8);
    chai.expect(AwesomeString.lastIndexOf('we have a mission', 'a', 6)).to.be.equal(4);
    chai.expect(AwesomeString.lastIndexOf('we have a mission', 'we', 15)).to.be.equal(0);
    chai.expect(AwesomeString.lastIndexOf('we have a mission', 'we', 17)).to.be.equal(0);
    chai.expect(AwesomeString.lastIndexOf('we have a mission', '', 1)).to.be.equal(1);
    chai.expect(AwesomeString.lastIndexOf(PRINTABLE_ASCII, '#', PRINTABLE_ASCII.length - 3)).to.be.equal(3);
  });

  it('should return the index of a searched string in a string representation of an object', function () {
    chai.expect(AwesomeString.lastIndexOf(['we have a mission'], 'a')).to.be.equal(8);
    chai.expect(AwesomeString.lastIndexOf({
      toString: function () {
        return 'we have a mission';
      }
    }, 'we')).to.be.equal(0);
  });

  it('should return -1 for an invalid ending string and position', function () {
    chai.expect(AwesomeString.lastIndexOf('we have a mission', 'me')).to.be.equal(-1);
    chai.expect(AwesomeString.lastIndexOf('we have a mission', '12')).to.be.equal(-1);
    chai.expect(AwesomeString.lastIndexOf('we have a mission', 'mission', -100)).to.be.equal(-1);
    chai.expect(AwesomeString.lastIndexOf('we have a mission', 'mission', -Infinity)).to.be.equal(-1);
    chai.expect(AwesomeString.lastIndexOf('', 'me')).to.be.equal(-1);
  });

  it('should return -1 for undefined and null parameters', function () {
    chai.expect(AwesomeString.lastIndexOf('we have a mission')).to.be.equal(-1);
    chai.expect(AwesomeString.lastIndexOf('we have a mission', undefined)).to.be.equal(-1);
    chai.expect(AwesomeString.lastIndexOf('we have a mission', null)).to.be.equal(-1);
  });
});

describe('search', function () {

  it('should return the index of a match', function () {
    chai.expect(AwesomeString.search('we have a mission', /mission/)).to.be.equal(10);
    chai.expect(AwesomeString.search('we have a mission', 'a')).to.be.equal(4);
    chai.expect(AwesomeString.search('we have a mission', /we/)).to.be.equal(0);
    chai.expect(AwesomeString.search('we have a mission', /\s/)).to.be.equal(2);
    chai.expect(AwesomeString.search('we have a mission', '')).to.be.equal(0);
    chai.expect(AwesomeString.search('', '')).to.be.equal(0);
    chai.expect(AwesomeString.search(undefined, '')).to.be.equal(0);
    chai.expect(AwesomeString.search(null, '')).to.be.equal(0);
    chai.expect(AwesomeString.search(PRINTABLE_ASCII, '!')).to.be.equal(1);
  });

  it('should return the index of a match and start index', function () {
    chai.expect(AwesomeString.search('we have a mission', /a/, 6)).to.be.equal(8);
    chai.expect(AwesomeString.search('we have a mission', /we/, 0)).to.be.equal(0);
    chai.expect(AwesomeString.search('we have a mission', 'we', NaN)).to.be.equal(0);
    chai.expect(AwesomeString.search('we have a mission', '', 0)).to.be.equal(0);
    chai.expect(AwesomeString.search(PRINTABLE_ASCII, '#', 3)).to.be.equal(3);
  });

  it('should return the index of a searched string in a string representation of an object', function () {
    chai.expect(AwesomeString.search(['we have a mission'], /a/)).to.be.equal(4);
    chai.expect(AwesomeString.search({
      toString: function () {
        return 'we have a mission';
      }
    }, /we/)).to.be.equal(0);
  });

  it('should threat a null value as "null" match pattern', function () {
    chai.expect(AwesomeString.search('we have a null mission', null)).to.be.equal(10);
    chai.expect(AwesomeString.search('we have a mission', null)).to.be.equal(-1);
  });

  it('should return -1 for an invalid ending string and position', function () {
    chai.expect(AwesomeString.search('we have a mission', /me/)).to.be.equal(-1);
    chai.expect(AwesomeString.search('we have a mission', /12/)).to.be.equal(-1);
    chai.expect(AwesomeString.search('we have a mission', /\s^/)).to.be.equal(-1);
    chai.expect(AwesomeString.search('we have a mission', 'we', 3)).to.be.equal(-1);
    chai.expect(AwesomeString.search('we have a mission', /mission/, 100)).to.be.equal(-1);
    chai.expect(AwesomeString.search('we have a mission', /mission/, Infinity)).to.be.equal(-1);
    chai.expect(AwesomeString.search('', /me/)).to.be.equal(-1);
  });

  it('should return 0 for an undefined', function () {
    chai.expect(AwesomeString.search('we have a mission')).to.be.equal(0);
    chai.expect(AwesomeString.search('we have a mission', undefined)).to.be.equal(0);
  });
});

describe('insert', function () {

  it('should insert into a string at specified position', function () {
    chai.expect(AwesomeString.insert('autumn', 'nice ', 0)).to.be.equal('nice autumn');
    chai.expect(AwesomeString.insert('autumn', 'nice ')).to.be.equal('nice autumn');
    chai.expect(AwesomeString.insert('autumn', 'nice', 1)).to.be.equal('aniceutumn');
    chai.expect(AwesomeString.insert('autumn', 'nice', 5)).to.be.equal('autumnicen');
    chai.expect(AwesomeString.insert('autumn', ' is nice', 6)).to.be.equal('autumn is nice');
    chai.expect(AwesomeString.insert('', 'nice', 0)).to.be.equal('nice');
    chai.expect(AwesomeString.insert('autumn', '', 1)).to.be.equal('autumn');
    chai.expect(AwesomeString.insert('autumn', '', 6)).to.be.equal('autumn');
  });

  it('should not insert into a string when position is out of bounds', function () {
    chai.expect(AwesomeString.insert('autumn', 'nice ', 100)).to.be.equal('autumn');
    chai.expect(AwesomeString.insert('autumn', 'nice', -100)).to.be.equal('autumn');
    chai.expect(AwesomeString.insert('autumn', 'nice', 7)).to.be.equal('autumn');
    chai.expect(AwesomeString.insert('autumn', 'nice', -1)).to.be.equal('autumn');
    chai.expect(AwesomeString.insert('', 'nice', 1)).to.be.equal('');
  });

  it('should insert into a string representation of an object at specified position', function () {
    chai.expect(AwesomeString.insert(['paradise'], '**', 2)).to.be.equal('pa**radise');
    chai.expect(AwesomeString.insert({
      toString: function () {
        return 'Tony';
      }
    }, ' Montana', 4)).to.be.equal('Tony Montana');
  });

  it('should not insert into a string on null or undefined arguments', function () {
    chai.expect(AwesomeString.insert()).to.be.equal('');
    chai.expect(AwesomeString.insert(null)).to.be.equal('');
    chai.expect(AwesomeString.insert(undefined)).to.be.equal('');
    chai.expect(AwesomeString.insert(undefined, undefined)).to.be.equal('');
  });
});

describe('latinise', function () {

  it('should latinise a string', function () {
    chai.expect(AwesomeString.latinise('')).to.be.equal('');
    chai.expect(AwesomeString.latinise('moldova')).to.be.equal('moldova');
    chai.expect(AwesomeString.latinise('cafe\u0301')).to.be.equal('cafe');
    chai.expect(AwesomeString.latinise('ma\xF1ana')).to.be.equal('manana');
    chai.expect(AwesomeString.latinise('man\u0303ana')).to.be.equal('manana');
    chai.expect(AwesomeString.latinise('foo\u0303\u035C\u035D\u035Ebar')).to.be.equal('foobar');
    chai.expect(AwesomeString.latinise('cafe\u0301')).to.be.equal('cafe');
    chai.expect(AwesomeString.latinise('colecção cópias críticos é tão')).to.be.equal('coleccao copias criticos e tao');
    chai.expect(AwesomeString.latinise('književnošću čuvanje')).to.be.equal('knjizevnoscu cuvanje');
    chai.expect(AwesomeString.latinise('anglikonų šiurkščios užrašinėti')).to.be.equal('anglikonu siurkscios uzrasineti');
    chai.expect(AwesomeString.latinise('Schuß für Pfarrerstöchter')).to.be.equal('Schus fur Pfarrerstochter');
    chai.expect(AwesomeString.latinise('publicó éxito nació María')).to.be.equal('publico exito nacio Maria');
    chai.expect(AwesomeString.latinise('Charlotte Brontë')).to.be.equal('Charlotte Bronte');
    chai.expect(AwesomeString.latinise('vecākā no māsām Brontē')).to.be.equal('vecaka no masam Bronte');
    chai.expect(AwesomeString.latinise('Şarlotta Brontenin özü')).to.be.equal('Sarlotta Brontenin ozu');
    chai.expect(AwesomeString.latinise('Wkrótce po ślubie pisarka zaszła w ciążę')).to.be.equal('Wkrotce po slubie pisarka zaszla w ciaze');
    chai.expect(AwesomeString.latinise("Dès l'enfance, Charlotte, comme Emily et probablement plus fortement Branwell, est influencée par certaines sources d'inspiration")).to.be.equal("Des l'enfance, Charlotte, comme Emily et probablement plus fortement Branwell, est influencee par certaines sources d'inspiration");
    chai.expect(AwesomeString.latinise('Există peste 13.800 de localități în România')).to.be.equal('Exista peste 13.800 de localitati in Romania');
    chai.expect(AwesomeString.latinise('août décembre')).to.be.equal('aout decembre');
    chai.expect(AwesomeString.latinise('Україна розташована в південно-східній частині Європи')).to.be.equal('Ukrayina roztashovana v pivdenno-shidnij chastini Yevropi');
    chai.expect(AwesomeString.latinise('\t\n')).to.be.equal('\t\n');
    chai.expect(AwesomeString.latinise('\u2047')).to.be.equal('\u2047');
    chai.expect(AwesomeString.latinise(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should latinise a string representation of an object', function () {
    chai.expect(AwesomeString.latinise(['María'])).to.be.equal('Maria');
    chai.expect(AwesomeString.latinise({
      toString: function () {
        return 'sacó';
      }
    })).to.be.equal('saco');
  });

  it('should not modify numbers', function () {
    chai.expect(AwesomeString.latinise(100)).to.be.equal('100');
    chai.expect(AwesomeString.latinise(812)).to.be.equal('812');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(AwesomeString.latinise()).to.be.equal('');
    chai.expect(AwesomeString.latinise(undefined)).to.be.equal('');
    chai.expect(AwesomeString.latinise(null)).to.be.equal('');
  });
});

describe('repeat', function () {

  it('should repeat a string', function () {
    chai.expect(AwesomeString.repeat('paradise', 2)).to.be.equal('paradiseparadise');
    chai.expect(AwesomeString.repeat('w', 3)).to.be.equal('www');
    chai.expect(AwesomeString.repeat('the world is yours', 1)).to.be.equal('the world is yours');
    chai.expect(AwesomeString.repeat('', 10)).to.be.equal('');
    chai.expect(AwesomeString.repeat(PRINTABLE_ASCII, 2)).to.be.equal(PRINTABLE_ASCII + PRINTABLE_ASCII);
  });

  it('should return an empty string for 0 repeat times', function () {
    chai.expect(AwesomeString.repeat('the world is yours', 0)).to.be.equal('');
    chai.expect(AwesomeString.repeat('', 0)).to.be.equal('');
  });

  it('should return the same string when the number of times is null or undefined', function () {
    chai.expect(AwesomeString.repeat('the world is yours')).to.be.equal('the world is yours');
    chai.expect(AwesomeString.repeat('the world is yours', null)).to.be.equal('the world is yours');
    chai.expect(AwesomeString.repeat('the world is yours', undefined)).to.be.equal('the world is yours');
  });

  it('should repeat a number', function () {
    chai.expect(AwesomeString.repeat(123, 2)).to.be.equal('123123');
    chai.expect(AwesomeString.repeat(0, 5)).to.be.equal('00000');
    chai.expect(AwesomeString.repeat(-1.5, 2)).to.be.equal('-1.5-1.5');
  });

  it('should repeat a string representation of an object', function () {
    chai.expect(AwesomeString.repeat(['paradise'], 2)).to.be.equal('paradiseparadise');
    chai.expect(AwesomeString.repeat({
      toString: function () {
        return 'Tony';
      }
    }, 2)).to.be.equal('TonyTony');
  });

  it('should return an empty string for null or undefined string to be repeated', function () {
    chai.expect(AwesomeString.repeat()).to.be.equal('');
    chai.expect(AwesomeString.repeat(null)).to.be.equal('');
    chai.expect(AwesomeString.repeat(undefined)).to.be.equal('');
    chai.expect(AwesomeString.repeat(undefined, 10)).to.be.equal('');
  });
});

describe('pad', function () {

  it('should pad a string', function () {
    chai.expect(AwesomeString.pad('FF', 4, '0')).to.be.equal('0FF0');
    chai.expect(AwesomeString.pad('00FF', 4, '0')).to.be.equal('00FF');
    chai.expect(AwesomeString.pad('ab', 10, '012')).to.be.equal('0120ab0120');
    chai.expect(AwesomeString.pad('0', 5, '0')).to.be.equal('00000');
    chai.expect(AwesomeString.pad('', 10, '01')).to.be.equal('0101001010');
    chai.expect(AwesomeString.pad('Hello World')).to.be.equal('Hello World');
    chai.expect(AwesomeString.pad('Hello World', 20, '')).to.be.equal('Hello World');
    chai.expect(AwesomeString.pad('Welcome', 10)).to.be.equal(' Welcome  ');
    chai.expect(AwesomeString.pad('Alien', 10, '-=')).to.be.equal('-=Alien-=-');
    chai.expect(AwesomeString.pad(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    chai.expect(AwesomeString.pad(PRINTABLE_ASCII, PRINTABLE_ASCII.length + 3, '--')).to.be.equal('-' + PRINTABLE_ASCII + '--');
    chai.expect(AwesomeString.pad('')).to.be.equal('');
    chai.expect(AwesomeString.pad('', 0)).to.be.equal('');
  });

  it('should not modify the string when pad length is less than string length', function () {
    chai.expect(AwesomeString.pad('Hello World', 0, ' ')).to.be.equal('Hello World');
    chai.expect(AwesomeString.pad('Hello World', 5, ' ')).to.be.equal('Hello World');
    chai.expect(AwesomeString.pad('0', 0, ' ')).to.be.equal('0');
    chai.expect(AwesomeString.pad('123', -1, ' ')).to.be.equal('123');
  });

  it('should pad a string representation of an object', function () {
    chai.expect(AwesomeString.pad(['Welcome'], 9)).to.be.equal(' Welcome ');
    chai.expect(AwesomeString.pad({
      toString: function () {
        return 'great';
      }
    }, 10, '-')).to.be.equal('--great---');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(AwesomeString.pad()).to.be.equal('');
    chai.expect(AwesomeString.pad(undefined)).to.be.equal('');
    chai.expect(AwesomeString.pad(null)).to.be.equal('');
  });
});

describe('padLeft', function () {

  it('should left pad a string', function () {
    chai.expect(AwesomeString.padLeft('FF', 4, '0')).to.be.equal('00FF');
    chai.expect(AwesomeString.padLeft('00FF', 4, '0')).to.be.equal('00FF');
    chai.expect(AwesomeString.padLeft('ab', 10, '012')).to.be.equal('01201201ab');
    chai.expect(AwesomeString.padLeft('0', 5, '0')).to.be.equal('00000');
    chai.expect(AwesomeString.padLeft('', 10, '01')).to.be.equal('0101010101');
    chai.expect(AwesomeString.padLeft('Hello World')).to.be.equal('Hello World');
    chai.expect(AwesomeString.padLeft('Hello World', 20, '')).to.be.equal('Hello World');
    chai.expect(AwesomeString.padLeft('Welcome', 10)).to.be.equal('   Welcome');
    chai.expect(AwesomeString.padLeft('Alien', 10, '-=')).to.be.equal('-=-=-Alien');
    chai.expect(AwesomeString.padLeft(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    chai.expect(AwesomeString.padLeft(PRINTABLE_ASCII, PRINTABLE_ASCII.length + 3, '--')).to.be.equal('---' + PRINTABLE_ASCII);
    chai.expect(AwesomeString.padLeft('')).to.be.equal('');
    chai.expect(AwesomeString.padLeft('', 0)).to.be.equal('');
  });

  it('should not modify the string when pad length is less than string length', function () {
    chai.expect(AwesomeString.padLeft('Hello World', 0, ' ')).to.be.equal('Hello World');
    chai.expect(AwesomeString.padLeft('Hello World', 5, ' ')).to.be.equal('Hello World');
    chai.expect(AwesomeString.padLeft('0', 0, ' ')).to.be.equal('0');
    chai.expect(AwesomeString.padLeft('123', -1, ' ')).to.be.equal('123');
  });

  it('should left pad a string representation of an object', function () {
    chai.expect(AwesomeString.padLeft(['Welcome'], 9)).to.be.equal('  Welcome');
    chai.expect(AwesomeString.padLeft({
      toString: function () {
        return 'great';
      }
    }, 10, '-')).to.be.equal('-----great');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(AwesomeString.padLeft()).to.be.equal('');
    chai.expect(AwesomeString.padLeft(undefined)).to.be.equal('');
    chai.expect(AwesomeString.padLeft(null)).to.be.equal('');
  });
});

describe('padRight', function () {

  it('should right pad a string', function () {
    chai.expect(AwesomeString.padRight('FF', 4, '0')).to.be.equal('FF00');
    chai.expect(AwesomeString.padRight('00FF', 4, '0')).to.be.equal('00FF');
    chai.expect(AwesomeString.padRight('ab', 10, '012')).to.be.equal('ab01201201');
    chai.expect(AwesomeString.padRight('0', 5, '0')).to.be.equal('00000');
    chai.expect(AwesomeString.padRight('', 10, '01')).to.be.equal('0101010101');
    chai.expect(AwesomeString.padRight('Hello World')).to.be.equal('Hello World');
    chai.expect(AwesomeString.padRight('Hello World', 20, '')).to.be.equal('Hello World');
    chai.expect(AwesomeString.padRight('Welcome', 10)).to.be.equal('Welcome   ');
    chai.expect(AwesomeString.padRight('123', 6, '_-')).to.be.equal('123_-_');
    chai.expect(AwesomeString.padRight(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    chai.expect(AwesomeString.padRight(PRINTABLE_ASCII, PRINTABLE_ASCII.length + 3, '--')).to.be.equal(PRINTABLE_ASCII + '---');
    chai.expect(AwesomeString.padRight('')).to.be.equal('');
    chai.expect(AwesomeString.padRight('', 0)).to.be.equal('');
  });

  it('should not modify the string when pad length is less than string length', function () {
    chai.expect(AwesomeString.padRight('Hello World', 0, ' ')).to.be.equal('Hello World');
    chai.expect(AwesomeString.padRight('Hello World', 5, ' ')).to.be.equal('Hello World');
    chai.expect(AwesomeString.padRight('0', 0, ' ')).to.be.equal('0');
    chai.expect(AwesomeString.padRight('123', -1, ' ')).to.be.equal('123');
  });

  it('should right pad a string representation of an object', function () {
    chai.expect(AwesomeString.padRight(['Welcome'], 9)).to.be.equal('Welcome  ');
    chai.expect(AwesomeString.padRight({
      toString: function () {
        return 'great';
      }
    }, 10, '-')).to.be.equal('great-----');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(AwesomeString.padRight()).to.be.equal('');
    chai.expect(AwesomeString.padRight(undefined)).to.be.equal('');
    chai.expect(AwesomeString.padRight(null)).to.be.equal('');
  });
});

describe('replace', function () {

  it('should return the replace result with a string pattern', function () {
    chai.expect(AwesomeString.replace('duck', 'duck', 'swan')).to.be.equal('swan');
    chai.expect(AwesomeString.replace('duck', 'duck', '')).to.be.equal('');
    chai.expect(AwesomeString.replace('duck', 'd', '')).to.be.equal('uck');
    chai.expect(AwesomeString.replace('duck', 'u', function () {
      return 'a';
    })).to.be.equal('dack');
    chai.expect(AwesomeString.replace('', '', '')).to.be.equal('');
    chai.expect(AwesomeString.replace(PRINTABLE_ASCII, PRINTABLE_ASCII, PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    chai.expect(AwesomeString.replace(PRINTABLE_ASCII, PRINTABLE_ASCII, 'duck')).to.be.equal('duck');
  });

  it('should return the replace result with a RegExp pattern', function () {
    chai.expect(AwesomeString.replace('duck', /duck/, 'swan')).to.be.equal('swan');
    chai.expect(AwesomeString.replace('duck', /duck/, '')).to.be.equal('');
    chai.expect(AwesomeString.replace('duck', /d/, '')).to.be.equal('uck');
    chai.expect(AwesomeString.replace('duck', /u/, function () {
      return 'a';
    })).to.be.equal('dack');
    chai.expect(AwesomeString.replace('hello world', /(hello)\s(world)/, function (match, hello, world) {
      return world + ', ' + hello;
    })).to.be.equal('world, hello');
  });

  it('should return the replace result from a string representation of an object', function () {
    chai.expect(AwesomeString.replace(['duck'], 'duck', 'swan')).to.be.equal('swan');
    chai.expect(AwesomeString.replace({
      toString: function () {
        return 'mandarin duck';
      }
    }, /mandarin\s/, '')).to.be.equal('duck');
  });

  it('should return the replace result from a number', function () {
    chai.expect(AwesomeString.replace(1500, '0', '1')).to.be.equal('1510');
    chai.expect(AwesomeString.replace(6475, /\d/g, '*')).to.be.equal('****');
  });

  it('should return the an empty string for an undefined or null', function () {
    chai.expect(AwesomeString.replace(undefined, /./, '1')).to.be.equal('');
    chai.expect(AwesomeString.replace(null, /./, '1')).to.be.equal('');
  });
});

describe('replaceAll', function () {

  it('should return the replace result with a string pattern', function () {
    chai.expect(AwesomeString.replaceAll('duck', 'duck', 'swan')).to.be.equal('swan');
    chai.expect(AwesomeString.replaceAll('duck duck', 'duck', 'swan')).to.be.equal('swan swan');
    chai.expect(AwesomeString.replaceAll('duck', 'duck', '')).to.be.equal('');
    chai.expect(AwesomeString.replaceAll('dduucckk', 'd', 'dd')).to.be.equal('dddduucckk');
    chai.expect(AwesomeString.replaceAll('duck', 'd', '')).to.be.equal('uck');
    chai.expect(AwesomeString.replaceAll('duck duck duc', 'duck', function () {
      return 'swan';
    })).to.be.equal('swan swan duc');
    chai.expect(AwesomeString.replaceAll('duck', 'u', function () {
      return 'a';
    })).to.be.equal('dack');
    chai.expect(AwesomeString.replaceAll('[a-b] [a-c][a-b]', '[a-b]', '[ab]')).to.be.equal('[ab] [a-c][ab]');
    chai.expect(AwesomeString.replaceAll('*.*.', '*.', '*')).to.be.equal('**');
    chai.expect(AwesomeString.replaceAll('\u0061 \u0061 b \u0061', '\u0061', '\u0062')).to.be.equal('b b b b');
    chai.expect(AwesomeString.replaceAll('', '', '')).to.be.equal('');
    chai.expect(AwesomeString.replaceAll('duck', '', '')).to.be.equal('duck');
    chai.expect(AwesomeString.replaceAll(PRINTABLE_ASCII, PRINTABLE_ASCII, PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
    chai.expect(AwesomeString.replaceAll(PRINTABLE_ASCII, PRINTABLE_ASCII, 'duck')).to.be.equal('duck');
  });

  it('should return the replace result with a RegExp pattern', function () {
    chai.expect(AwesomeString.replaceAll('duck duck', /duck/, 'swan')).to.be.equal('swan swan');
    chai.expect(AwesomeString.replaceAll('duck DUCK', /duck/, 'swan')).to.be.equal('swan DUCK');
    chai.expect(AwesomeString.replaceAll('duck DUCK', /DUCK/i, 'swan')).to.be.equal('swan swan');
    chai.expect(AwesomeString.replaceAll('duck', /duck/, '')).to.be.equal('');
    chai.expect(AwesomeString.replaceAll('duck', /d/, '')).to.be.equal('uck');
    chai.expect(AwesomeString.replaceAll('duck duck', /u/, function () {
      return 'a';
    })).to.be.equal('dack dack');
    chai.expect(AwesomeString.replaceAll('hello world', /(hello)\s(world)/, function (match, hello, world) {
      return world + ', ' + hello;
    })).to.be.equal('world, hello');
  });

  it('should return the replace result from a string representation of an object', function () {
    chai.expect(AwesomeString.replaceAll(['duck'], 'duck', 'swan')).to.be.equal('swan');
    chai.expect(AwesomeString.replaceAll({
      toString: function () {
        return 'mandarin duck';
      }
    }, /mandarin\s/, '')).to.be.equal('duck');
  });

  it('should return the replace result from a number', function () {
    chai.expect(AwesomeString.replaceAll(1500, '0', '1')).to.be.equal('1511');
    chai.expect(AwesomeString.replaceAll(6475, /\d/g, '*')).to.be.equal('****');
    chai.expect(AwesomeString.replaceAll(6475, /\d/, '*')).to.be.equal('****');
  });

  it('should return the original string on failed match', function () {
    chai.expect(AwesomeString.replaceAll('duck', 'dack', 'swan')).to.be.equal('duck');
    chai.expect(AwesomeString.replaceAll('duck', /dack/, '')).to.be.equal('duck');
  });

  it('should return the an empty string for an undefined or null', function () {
    chai.expect(AwesomeString.replaceAll(undefined, /./, '1')).to.be.equal('');
    chai.expect(AwesomeString.replaceAll(null, /./, '1')).to.be.equal('');
  });
});

describe('reverse', function () {

  it('should reverse a string', function () {
    chai.expect(AwesomeString.reverse('green tree')).to.be.equal('eert neerg');
    chai.expect(AwesomeString.reverse('o')).to.be.equal('o');
    chai.expect(AwesomeString.reverse('\n\t')).to.be.equal('\t\n');
    chai.expect(AwesomeString.reverse('')).to.be.equal('');
    chai.expect(AwesomeString.reverse(PRINTABLE_ASCII)).to.be.equal(REVERSED_PRINTABLE_ASCII);
  });

  it('should reverse a number', function () {
    chai.expect(AwesomeString.reverse(123)).to.be.equal('321');
    chai.expect(AwesomeString.reverse(0)).to.be.equal('0');
    chai.expect(AwesomeString.reverse(-1.5)).to.be.equal('5.1-');
  });

  it('should reverse a string representation of an object', function () {
    chai.expect(AwesomeString.reverse(['flower'])).to.be.equal('rewolf');
    chai.expect(AwesomeString.reverse({
      toString: function () {
        return 'flower';
      }
    })).to.be.equal('rewolf');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(AwesomeString.reverse()).to.be.equal('');
    chai.expect(AwesomeString.reverse(null)).to.be.equal('');
    chai.expect(AwesomeString.reverse(undefined)).to.be.equal('');
  });
});

describe('reverseGrapheme', function () {

  it('should reverse a string', function () {
    chai.expect(AwesomeString.reverseGrapheme('green tree')).to.be.equal('eert neerg');
    chai.expect(AwesomeString.reverseGrapheme('ma\xF1ana')).to.be.equal('ana\xF1am');
    chai.expect(AwesomeString.reverseGrapheme('man\u0303ana')).to.be.equal('anan\u0303am');
    chai.expect(AwesomeString.reverseGrapheme('foo\u0303\u035C\u035D\u035Ebar')).to.be.equal('rabo\u0303\u035C\u035D\u035Eof');
    chai.expect(AwesomeString.reverseGrapheme('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar')).to.be.equal('rab\uD834\uDF06\u0303\u035C\u035D\u035Eoof');
    chai.expect(AwesomeString.reverseGrapheme('o')).to.be.equal('o');
    chai.expect(AwesomeString.reverseGrapheme('\n\t')).to.be.equal('\t\n');
    chai.expect(AwesomeString.reverseGrapheme('')).to.be.equal('');
    chai.expect(AwesomeString.reverseGrapheme(PRINTABLE_ASCII)).to.be.equal(REVERSED_PRINTABLE_ASCII);
  });

  it('should reverseCodePoint a number', function () {
    chai.expect(AwesomeString.reverseGrapheme(123)).to.be.equal('321');
    chai.expect(AwesomeString.reverseGrapheme(0)).to.be.equal('0');
    chai.expect(AwesomeString.reverseGrapheme(-1.5)).to.be.equal('5.1-');
  });

  it('should reverseCodePoint a string representation of an object', function () {
    chai.expect(AwesomeString.reverseGrapheme(['flower'])).to.be.equal('rewolf');
    chai.expect(AwesomeString.reverseGrapheme({
      toString: function () {
        return 'flower';
      }
    })).to.be.equal('rewolf');
  });

  it('should return an empty string for null or undefined', function () {
    chai.expect(AwesomeString.reverseGrapheme()).to.be.equal('');
    chai.expect(AwesomeString.reverseGrapheme(null)).to.be.equal('');
    chai.expect(AwesomeString.reverseGrapheme(undefined)).to.be.equal('');
  });
});

describe('slugify', function () {

  it('should slugify the string', function () {
    chai.expect(AwesomeString.slugify('bird')).to.be.equal('bird');
    chai.expect(AwesomeString.slugify('BIRD')).to.be.equal('bird');
    chai.expect(AwesomeString.slugify('BirdFlight')).to.be.equal('bird-flight');
    chai.expect(AwesomeString.slugify('bird flight')).to.be.equal('bird-flight');
    chai.expect(AwesomeString.slugify('San Diego Zoo Safari Park')).to.be.equal('san-diego-zoo-safari-park');
    chai.expect(AwesomeString.slugify('-BIRD-FLIGHT-')).to.be.equal('bird-flight');
    chai.expect(AwesomeString.slugify('__BIRD___FLIGHT___')).to.be.equal('bird-flight');
    chai.expect(AwesomeString.slugify('Restless flycatcher')).to.be.equal('restless-flycatcher');
    chai.expect(AwesomeString.slugify('XMLHttpRequest')).to.be.equal('xml-http-request');
    chai.expect(AwesomeString.slugify('weight of up to 12 kg')).to.be.equal('weight-of-up-to-12-kg');
    chai.expect(AwesomeString.slugify('/home/dmitri/projects/voca')).to.be.equal('home-dmitri-projects-voca');
    chai.expect(AwesomeString.slugify(PRINTABLE_ASCII)).to.be.equal('0123456789-abcdefghijklmnopqrstuvwxyz-abcdefghijklmnopqrstuvwxyz');
    chai.expect(AwesomeString.slugify('****')).to.be.equal('');
    chai.expect(AwesomeString.slugify('****')).to.be.equal('');
    chai.expect(AwesomeString.slugify('-----')).to.be.equal('');
    chai.expect(AwesomeString.slugify('     ')).to.be.equal('');
    chai.expect(AwesomeString.slugify('\n\n\n\n   ***\t\t')).to.be.equal('');
    chai.expect(AwesomeString.slugify('')).to.be.equal('');
  });

  it('should slugify the string of a non-latin string', function () {
    chai.expect(AwesomeString.slugify('zborul păsării')).to.be.equal('zborul-pasarii');
    chai.expect(AwesomeString.slugify('fuerza de sustentación')).to.be.equal('fuerza-de-sustentacion');
    chai.expect(AwesomeString.slugify('skrzydło ptaka składa się')).to.be.equal('skrzydlo-ptaka-sklada-sie');
    chai.expect(AwesomeString.slugify('Україна розташована в південно-східній частині Європи')).to.be.equal('ukrayina-roztashovana-v-pivdenno-shidnij-chastini-yevropi');
    chai.expect(AwesomeString.slugify('man\u0303ana')).to.be.equal('manana');
    chai.expect(AwesomeString.slugify('foo\u0303\u035C\u035D\u035E bar')).to.be.equal('foo-bar');
  });

  it('should not modify numbers', function () {
    chai.expect(AwesomeString.slugify(0)).to.be.equal('0');
    chai.expect(AwesomeString.slugify(1200)).to.be.equal('1200');
    chai.expect(AwesomeString.slugify('8965')).to.be.equal('8965');
  });

  it('should slugify the string representation of an object', function () {
    chai.expect(AwesomeString.slugify(['bird flight'])).to.be.equal('bird-flight');
    chai.expect(AwesomeString.slugify({
      toString: function () {
        return 'bird flight';
      }
    })).to.be.equal('bird-flight');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(AwesomeString.slugify()).to.be.equal('');
    chai.expect(AwesomeString.slugify(undefined)).to.be.equal('');
    chai.expect(AwesomeString.slugify(null)).to.be.equal('');
  });
});

describe('splice', function () {

  it('should splice the string at a given position, number of characters and addition string', function () {
    chai.expect(AwesomeString.splice('sting like a bee', 0, 0, 'you should ')).to.be.equal('you should sting like a bee');
    chai.expect(AwesomeString.splice('sting like a bee', 0, 5, 'fly')).to.be.equal('fly like a bee');
    chai.expect(AwesomeString.splice('sting like a bee', 6, 4, 'as')).to.be.equal('sting as a bee');
    chai.expect(AwesomeString.splice('sting like a bee', 0, 16, 'float like a butterfly')).to.be.equal('float like a butterfly');
    chai.expect(AwesomeString.splice('sting like a bee', 0, 16, '')).to.be.equal('');
    chai.expect(AwesomeString.splice('bee', 3, 0, ' flies')).to.be.equal('bee flies');
    chai.expect(AwesomeString.splice('bee', 10, 0, ' flies')).to.be.equal('bee flies');
    chai.expect(AwesomeString.splice('sting like a bee', 0, 0, '')).to.be.equal('sting like a bee');
    chai.expect(AwesomeString.splice('bee', 10, 100, ' flies')).to.be.equal('bee flies');
    chai.expect(AwesomeString.splice('bee', 100, 100, ' is an insect')).to.be.equal('bee is an insect');
    chai.expect(AwesomeString.splice('bee', 100, -1, ' is an insect')).to.be.equal('bee is an insect');
  });

  it('should splice the string at a given negative position, number of characters and addition string', function () {
    chai.expect(AwesomeString.splice('days', -1, 1, '')).to.be.equal('day');
    chai.expect(AwesomeString.splice('days', -1, 1, ' and night')).to.be.equal('day and night');
    chai.expect(AwesomeString.splice('make the days count', -5, 5, 'matter')).to.be.equal('make the days matter');
    chai.expect(AwesomeString.splice('make the days count', -5, 0, 'matter and ')).to.be.equal('make the days matter and count');
    chai.expect(AwesomeString.splice('make the days count', -19, 19, 'matter')).to.be.equal('matter');
    chai.expect(AwesomeString.splice('make the days count', -19, 19, '')).to.be.equal('');
    chai.expect(AwesomeString.splice('make the days count', -100, 19, 'matter')).to.be.equal('matter');
    chai.expect(AwesomeString.splice('make the days count', -100, 100, 'matter')).to.be.equal('matter');
  });

  it('should delete from string at a given position by number of characters', function () {
    chai.expect(AwesomeString.splice('suffer now then be champion', 6, 4)).to.be.equal('suffer then be champion');
    chai.expect(AwesomeString.splice('champion', -1, 0)).to.be.equal('champion');
    chai.expect(AwesomeString.splice('champion', 0, 0)).to.be.equal('champion');
    chai.expect(AwesomeString.splice('champion', 1, 0)).to.be.equal('champion');
    chai.expect(AwesomeString.splice('champion', 5)).to.be.equal('champ');
    chai.expect(AwesomeString.splice('champion', 0)).to.be.equal('');
  });

  it('should splice the string representation of an object', function () {
    chai.expect(AwesomeString.splice(['paradise'], 0, 0, 'this is ')).to.be.equal('this is paradise');
    chai.expect(AwesomeString.splice({
      toString: function () {
        return 'paradise';
      }
    }, 5, 1, 'I')).to.be.equal('paradIse');
  });

  it('should clear the string for null or undefined arguments', function () {
    chai.expect(AwesomeString.splice('champion')).to.be.equal('');
    chai.expect(AwesomeString.splice('champion', undefined, null)).to.be.equal('');
    chai.expect(AwesomeString.splice('champion', null, null, null)).to.be.equal('');
    chai.expect(AwesomeString.splice()).to.be.equal('');
  });
});

describe('trim', function () {

  it('should return the trimmed string with default whitespaces', function () {
    chai.expect(AwesomeString.trim(' Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trim('   Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trim('   Yes. The fire rises.    ')).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trim('Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trim('\n\f\t Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trim('\n\f\t Yes. The fire rises.', null)).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trim('\n\f\t Yes. The fire rises.', undefined)).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trim(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.substr(1));
  });

  it('should return the trimmed string with custom whitespaces', function () {
    chai.expect(AwesomeString.trim('-Do you *feel* in charge?-', '-')).to.be.equal('Do you *feel* in charge?');
    chai.expect(AwesomeString.trim('---Do-you-*feel*-in-charge?---', '-')).to.be.equal('Do-you-*feel*-in-charge?');
    chai.expect(AwesomeString.trim('Do you *feel* in charge?___', '_')).to.be.equal('Do you *feel* in charge?');
    chai.expect(AwesomeString.trim('<-Do you *feel* in charge?', '<-')).to.be.equal('Do you *feel* in charge?');
    chai.expect(AwesomeString.trim('***Do you *feel* in charge?***', '*-')).to.be.equal('Do you *feel* in charge?');
    chai.expect(AwesomeString.trim('Do you *feel* in charge?', 'Doe?')).to.be.equal(' you *feel* in charg');
    chai.expect(AwesomeString.trim('\n\nDo you *feel* in charge?', '\n')).to.be.equal('Do you *feel* in charge?');
  });

  it('should not modify the string for an empty string whitespace', function () {
    chai.expect(AwesomeString.trim('I\'m *necessary* evil!', '')).to.be.equal('I\'m *necessary* evil!');
    chai.expect(AwesomeString.trim('', '')).to.be.equal('');
  });

  it('should return the trimmed string representation of an object', function () {
    chai.expect(AwesomeString.trim([' Yes. The fire rises.'])).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trim({
      toString: function () {
        return '\n\nYes. The fire rises.';
      }
    })).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trim(['****You\'re a big guy!****'], ['*'])).to.be.equal('You\'re a big guy!');
  });

  it('should return the trimmed string for numbers', function () {
    chai.expect(AwesomeString.trim(100, 1)).to.be.equal('00');
    chai.expect(AwesomeString.trim(6780, 6780)).to.be.equal('');
    chai.expect(AwesomeString.trim(-115, -1)).to.be.equal('5');
    chai.expect(AwesomeString.trim(1111, 1)).to.be.equal('');
    chai.expect(AwesomeString.trim(8998, 8)).to.be.equal('99');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(AwesomeString.trim(null)).to.be.equal('');
    chai.expect(AwesomeString.trim(null, '\n')).to.be.equal('');
    chai.expect(AwesomeString.trim(null, null)).to.be.equal('');
    chai.expect(AwesomeString.trim(undefined)).to.be.equal('');
    chai.expect(AwesomeString.trim(undefined, '*')).to.be.equal('');
    chai.expect(AwesomeString.trim(undefined, undefined)).to.be.equal('');
  });
});

describe('trimLeft', function () {

  it('should return the left trimmed string with default whitespaces', function () {
    chai.expect(AwesomeString.trimLeft(' Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trimLeft('   Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trimLeft('   Yes. The fire rises.    ')).to.be.equal('Yes. The fire rises.    ');
    chai.expect(AwesomeString.trimLeft('Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trimLeft('\n\f\t Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trimLeft('\n\f\t Yes. The fire rises.', null)).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trimLeft('\n\f\t Yes. The fire rises.', undefined)).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trimLeft(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII.substr(1));
  });

  it('should return the left trimmed string with custom whitespaces', function () {
    chai.expect(AwesomeString.trimLeft('-Do you *feel* in charge?-', '-')).to.be.equal('Do you *feel* in charge?-');
    chai.expect(AwesomeString.trimLeft('---Do-you-*feel*-in-charge?---', '-')).to.be.equal('Do-you-*feel*-in-charge?---');
    chai.expect(AwesomeString.trimLeft('Do you *feel* in charge?___', '_')).to.be.equal('Do you *feel* in charge?___');
    chai.expect(AwesomeString.trimLeft('___Do you *feel* in charge?', '_')).to.be.equal('Do you *feel* in charge?');
    chai.expect(AwesomeString.trimLeft('<-Do you *feel* in charge?', '<-')).to.be.equal('Do you *feel* in charge?');
    chai.expect(AwesomeString.trimLeft('***Do you *feel* in charge?***', '*')).to.be.equal('Do you *feel* in charge?***');
    chai.expect(AwesomeString.trimLeft('Do you *feel* in charge?', 'Doy')).to.be.equal(' you *feel* in charge?');
    chai.expect(AwesomeString.trimLeft('\n\nDo you *feel* in charge?', '\n')).to.be.equal('Do you *feel* in charge?');
  });

  it('should not modify the string for an empty string whitespace', function () {
    chai.expect(AwesomeString.trimLeft('I\'m *necessary* evil!', '')).to.be.equal('I\'m *necessary* evil!');
    chai.expect(AwesomeString.trimLeft('', '')).to.be.equal('');
  });

  it('should return the left trimmed string representation of an object', function () {
    chai.expect(AwesomeString.trimLeft([' Yes. The fire rises.'])).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trimLeft({
      toString: function () {
        return '\n\nYes. The fire rises.';
      }
    })).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trimLeft(['****You\'re a big guy!'], ['*'])).to.be.equal('You\'re a big guy!');
  });

  it('should return the left trimmed string for numbers', function () {
    chai.expect(AwesomeString.trimLeft(100, 1)).to.be.equal('00');
    chai.expect(AwesomeString.trimLeft(6780, 6780)).to.be.equal('');
    chai.expect(AwesomeString.trimLeft(-115, -1)).to.be.equal('5');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(AwesomeString.trimLeft(null)).to.be.equal('');
    chai.expect(AwesomeString.trimLeft(null, '\n')).to.be.equal('');
    chai.expect(AwesomeString.trimLeft(null, null)).to.be.equal('');
    chai.expect(AwesomeString.trimLeft(undefined)).to.be.equal('');
    chai.expect(AwesomeString.trimLeft(undefined, '*')).to.be.equal('');
    chai.expect(AwesomeString.trimLeft(undefined, undefined)).to.be.equal('');
  });
});

describe('trimRight', function () {

  it('should return the right trimmed string with default whitespaces', function () {
    chai.expect(AwesomeString.trimRight('Yes. The fire rises. ')).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trimRight('Yes. The fire rises.   ')).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trimRight('   Yes. The fire rises.    ')).to.be.equal('   Yes. The fire rises.');
    chai.expect(AwesomeString.trimRight('Yes. The fire rises.')).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trimRight('Yes. The fire rises.\n\f\t ')).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trimRight('Yes. The fire rises.\n\f\t ', null)).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trimRight('Yes. The fire rises.\n\f\t ', undefined)).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trimRight(PRINTABLE_ASCII)).to.be.equal(PRINTABLE_ASCII);
  });

  it('should return the right trimmed string with custom whitespaces', function () {
    chai.expect(AwesomeString.trimRight('-Do you *feel* in charge?-', '-')).to.be.equal('-Do you *feel* in charge?');
    chai.expect(AwesomeString.trimRight('---Do-you-*feel*-in-charge?---', '-')).to.be.equal('---Do-you-*feel*-in-charge?');
    chai.expect(AwesomeString.trimRight('___Do you *feel* in charge?', '_')).to.be.equal('___Do you *feel* in charge?');
    chai.expect(AwesomeString.trimRight('Do you *feel* in charge?___', '_')).to.be.equal('Do you *feel* in charge?');
    chai.expect(AwesomeString.trimRight('Do you *feel* in charge?<-', '<-')).to.be.equal('Do you *feel* in charge?');
    chai.expect(AwesomeString.trimRight('***Do you *feel* in charge?***', '**')).to.be.equal('***Do you *feel* in charge?');
    chai.expect(AwesomeString.trimRight('Do you *feel* in charge?', 'charge?')).to.be.equal('Do you *feel* in ');
    chai.expect(AwesomeString.trimRight('Do you *feel* in charge?\n\n', '\n')).to.be.equal('Do you *feel* in charge?');
  });

  it('should not modify the string for an empty string whitespace', function () {
    chai.expect(AwesomeString.trimRight('I\'m *necessary* evil!', '')).to.be.equal('I\'m *necessary* evil!');
    chai.expect(AwesomeString.trimRight('', '')).to.be.equal('');
  });

  it('should return the right trimmed string representation of an object', function () {
    chai.expect(AwesomeString.trimRight(['Yes. The fire rises. '])).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trimRight({
      toString: function () {
        return 'Yes. The fire rises.\n\n';
      }
    })).to.be.equal('Yes. The fire rises.');
    chai.expect(AwesomeString.trimRight(['You\'re a big guy!****'], ['*'])).to.be.equal('You\'re a big guy!');
  });

  it('should return the right trimmed string for numbers', function () {
    chai.expect(AwesomeString.trimRight(100, 0)).to.be.equal('1');
    chai.expect(AwesomeString.trimRight(6780, 6780)).to.be.equal('');
    chai.expect(AwesomeString.trimRight(-115, 15)).to.be.equal('-');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(AwesomeString.trimRight(null)).to.be.equal('');
    chai.expect(AwesomeString.trimRight(null, '\n')).to.be.equal('');
    chai.expect(AwesomeString.trimRight(null, null)).to.be.equal('');
    chai.expect(AwesomeString.trimRight(undefined)).to.be.equal('');
    chai.expect(AwesomeString.trimRight(undefined, '*')).to.be.equal('');
    chai.expect(AwesomeString.trimRight(undefined, undefined)).to.be.equal('');
  });
});

describe('wordWrap', function () {

  it('should wrap the string with default parameters', function () {
    chai.expect(AwesomeString.wordWrap('')).to.be.equal('');
    chai.expect(AwesomeString.wordWrap('Yes. The fire rises. ')).to.be.equal('Yes. The fire rises. ');
    chai.expect(AwesomeString.wordWrap('Theatricality and deception are powerful agents to the uninitiated... but we are initiated, aren\'t ' + 'we Bruce? Members of the League of Shadows!')).to.be.equal('Theatricality and deception are powerful agents to the uninitiated... but' + '\n' + 'we are initiated, aren\'t we Bruce? Members of the League of Shadows!');
    chai.expect(AwesomeString.wordWrap('Theatricality-and-deception-are-powerful-agents-to-the-uninitiated...-but-we-are-initiated')).to.be.equal('Theatricality-and-deception-are-powerful-agents-to-the-uninitiated...-but-we-are-initiated');
  });

  it('should wrap the string for a specific width', function () {
    chai.expect(AwesomeString.wordWrap('Hello', {
      width: 4
    })).to.be.equal('Hello');
    chai.expect(AwesomeString.wordWrap('  Hello  ', {
      width: 4
    })).to.be.equal('Hello\n ');
    chai.expect(AwesomeString.wordWrap('Hello World', {
      width: 4
    })).to.be.equal('Hello\nWorld');
    chai.expect(AwesomeString.wordWrap('Yes. The fire rises.', {
      width: 4
    })).to.be.equal('Yes.\nThe\nfire\nrises.');
    chai.expect(AwesomeString.wordWrap('And I think to myself what a wonderful world.', {
      width: 10
    })).to.be.equal('And I\nthink to\nmyself\nwhat a\nwonderful\nworld.');
    chai.expect(AwesomeString.wordWrap('Hello World', {
      width: 0
    })).to.be.equal('');
    chai.expect(AwesomeString.wordWrap('Hello World', {
      width: -5
    })).to.be.equal('');
  });

  it('should wrap the string with indent', function () {
    chai.expect(AwesomeString.wordWrap('Hello', {
      width: 4,
      indent: '***'
    })).to.be.equal('***Hello');
    chai.expect(AwesomeString.wordWrap('Hello World', {
      width: 4,
      indent: '  '
    })).to.be.equal('  Hello\n  World');
    chai.expect(AwesomeString.wordWrap('Yes. The fire rises.', {
      width: 4,
      indent: '**'
    })).to.be.equal('**Yes.\n**The\n**fire\n**rises.');
    chai.expect(AwesomeString.wordWrap('', {
      width: 5,
      indent: '000'
    })).to.be.equal('000');
    chai.expect(AwesomeString.wordWrap('Wonderful world', {
      width: 0,
      indent: '000'
    })).to.be.equal('000');
  });

  it('should wrap the string with a custom newline character', function () {
    chai.expect(AwesomeString.wordWrap('What A Wonderful World', {
      width: 10,
      indent: '  ',
      newLine: '+'
    })).to.be.equal('  What A+  Wonderful+  World');
    chai.expect(AwesomeString.wordWrap('I hear babies crying, I watch them grow', {
      width: 5,
      indent: '-',
      newLine: '<br/>'
    })).to.be.equal('-I<br/>-hear<br/>-babies<br/>-crying,<br/>-I<br/>-watch<br/>-them<br/>-grow');
  });

  it('should wrap the string with breaking long words', function () {
    chai.expect(AwesomeString.wordWrap('Hello', {
      width: 4,
      cut: true
    })).to.be.equal('Hell\no');
    chai.expect(AwesomeString.wordWrap('I hear babies crying, I watch them grow', {
      width: 5,
      cut: true
    })).to.be.equal('I\nhear\nbabie\ns\ncryin\ng, I\nwatch\nthem\ngrow');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(AwesomeString.wordWrap()).to.be.equal('');
    chai.expect(AwesomeString.wordWrap(undefined)).to.be.equal('');
    chai.expect(AwesomeString.wordWrap(null)).to.be.equal('');
  });
});

describe('endsWith', function () {

  it('should return true for valid ending string', function () {
    chai.expect(AwesomeString.endsWith('Hello World!', '')).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', '!')).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', 'd!')).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', 'rld!')).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', 'orld!')).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', 'World!')).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', ' World!')).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', 'o World!')).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', 'lo World!')).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', 'llo World!')).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', 'ello World!')).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', 'Hello World!')).to.be.true;
    chai.expect(AwesomeString.endsWith('Привет Мир!', 'Мир!')).to.be.true;
    chai.expect(AwesomeString.endsWith('', '')).to.be.true;
    chai.expect(AwesomeString.endsWith(PRINTABLE_ASCII, '~')).to.be.true;
  });

  it('should return true for valid ending string and position', function () {
    chai.expect(AwesomeString.endsWith('Hello World!', '', 'Hello World'.length)).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', 'Hello World!', 'Hello World!'.length)).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', 'Hello World', 'Hello World!'.length - 1)).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', 'Hello Worl', 'Hello World!'.length - 2)).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', 'Hello Wor', 'Hello World!'.length - 3)).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', 'Hello Wo', 'Hello World!'.length - 4)).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', 'Hello W', 'Hello World!'.length - 5)).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', 'Hello ', 'Hello World!'.length - 6)).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', 'Hello', 'Hello World!'.length - 7)).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', 'Hell', 'Hello World!'.length - 8)).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', 'Hel', 'Hello World!'.length - 9)).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', 'He', 'Hello World!'.length - 10)).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', 'H', 'Hello World!'.length - 11)).to.be.true;
    chai.expect(AwesomeString.endsWith('', '', 0)).to.be.true;
  });

  it('should return true for a correct downcast of the position', function () {
    chai.expect(AwesomeString.endsWith('Hello World!', 'ello', '5')).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', 'ello', 5.1)).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', 'World!', 30000)).to.be.true;
    chai.expect(AwesomeString.endsWith('Hello World!', 'World!', Infinity)).to.be.true;
  });

  it('should return true for an empty ending string', function () {
    [0, 1, 100, Infinity, undefined, NaN, null].forEach(function (position) {
      chai.expect(AwesomeString.endsWith('Hello World!', '', position)).to.be.true;
    });
  });

  it('should return true for valid ending number', function () {
    chai.expect(AwesomeString.endsWith(1000, 0)).to.be.true;
    chai.expect(AwesomeString.endsWith(1250, 50)).to.be.true;
    chai.expect(AwesomeString.endsWith('916', 16)).to.be.true;
  });

  it('should return true for a valid ending in a string representation of an object', function () {
    chai.expect(AwesomeString.endsWith(['Welcome to Earth'], 'Earth')).to.be.true;
    chai.expect(AwesomeString.endsWith({
      toString: function () {
        return 'Let us not stand on ceremony, Mr. Wayne.';
      }
    }, ['Mr. Wayne'], 'Let us not stand on ceremony, Mr. Wayne.'.length - 1)).to.be.true;
  });

  it('should return false for an invalid ending string', function () {
    chai.expect(AwesomeString.endsWith('The shadows betray you, because they belong to me!', 'The shadows')).to.be.false;
    chai.expect(AwesomeString.endsWith('The shadows betray you, because they belong to me!', 'to me')).to.be.false;
    chai.expect(AwesomeString.endsWith('They belong to me!', 'They belong to me')).to.be.false;
    chai.expect(AwesomeString.endsWith('They belong to me!', 'belong')).to.be.false;
    chai.expect(AwesomeString.endsWith('', 'The shadows')).to.be.false;
  });

  it('should return false for an invalid ending string and position', function () {
    chai.expect(AwesomeString.endsWith('The shadows betray you, because they belong to me!', 'they belong to me!', 5)).to.be.false;
    chai.expect(AwesomeString.endsWith('They belong to me!', 'They belong to me!', 'They belong to me!'.length - 1)).to.be.false;
    chai.expect(AwesomeString.endsWith('They belong to me!', 'They', 'They belong to me!'.length)).to.be.false;
    chai.expect(AwesomeString.endsWith('They belong to me!', 'belong', 'They belong to me!'.length)).to.be.false;
    chai.expect(AwesomeString.endsWith('They belong to me!', 'to me!', 0)).to.be.false;
    chai.expect(AwesomeString.endsWith('They belong to me!', 'belong to me!', -100)).to.be.false;
  });

  it('should return false for an invalid ending number', function () {
    chai.expect(AwesomeString.endsWith(1000, 10)).to.be.false;
    chai.expect(AwesomeString.endsWith(1250, 55)).to.be.false;
    chai.expect(AwesomeString.endsWith('916', 18)).to.be.false;
  });

  it('should return false for a NaN position', function () {
    chai.expect(AwesomeString.endsWith('Hello World!', 'World!', NaN)).to.be.false;
  });

  it('should return false for undefined and null parameters', function () {
    chai.expect(AwesomeString.endsWith()).to.be.false;
    chai.expect(AwesomeString.endsWith(undefined)).to.be.false;
    chai.expect(AwesomeString.endsWith(undefined, undefined)).to.be.false;
    chai.expect(AwesomeString.endsWith(undefined, undefined, undefined)).to.be.false;
    chai.expect(AwesomeString.endsWith(undefined, undefined, 0)).to.be.false;
    chai.expect(AwesomeString.endsWith(undefined, 'Hello World!')).to.be.false;
    chai.expect(AwesomeString.endsWith(null)).to.be.false;
    chai.expect(AwesomeString.endsWith(null, null)).to.be.false;
    chai.expect(AwesomeString.endsWith(null, null, null)).to.be.false;
    chai.expect(AwesomeString.endsWith(null, null, 0)).to.be.false;
    chai.expect(AwesomeString.endsWith(null, 'Hello World!')).to.be.false;
  });
});

describe('includes', function () {

  it('should return true for an included string', function () {
    chai.expect(AwesomeString.includes('mobile infantry', 'mobile')).to.be.true;
    chai.expect(AwesomeString.includes('mobile infantry', 'infantry')).to.be.true;
    chai.expect(AwesomeString.includes('mobile infantry', 'mobile infantry')).to.be.true;
    chai.expect(AwesomeString.includes('mobile infantry', ' ')).to.be.true;
    chai.expect(AwesomeString.includes('mobile infantry', '')).to.be.true;
    chai.expect(AwesomeString.includes('', '')).to.be.true;
    chai.expect(AwesomeString.includes(undefined, '')).to.be.true;
    chai.expect(AwesomeString.includes('\nwelcome', '\n')).to.be.true;
    chai.expect(AwesomeString.includes(PRINTABLE_ASCII, '+')).to.be.true;
  });

  it('should return true for an included string and position', function () {
    chai.expect(AwesomeString.includes('mobile infantry', 'mobile', 0)).to.be.true;
    chai.expect(AwesomeString.includes('mobile infantry', 'infantry', 7)).to.be.true;
    chai.expect(AwesomeString.includes('mobile infantry', 'mobile infantry', 0)).to.be.true;
    chai.expect(AwesomeString.includes('mobile infantry', ' ', 6)).to.be.true;
    chai.expect(AwesomeString.includes('mobile infantry', '', 0)).to.be.true;
    chai.expect(AwesomeString.includes('mobile infantry', '', 6)).to.be.true;
    chai.expect(AwesomeString.includes('', '', 0)).to.be.true;
    chai.expect(AwesomeString.includes('', '', 6)).to.be.true;
  });

  it('should return true for an included string representation of an object', function () {
    chai.expect(AwesomeString.includes(['mobile infantry'], 'mobile')).to.be.true;
    chai.expect(AwesomeString.includes({
      toString: function () {
        return 'mobile infantry';
      }
    }, 'infantry')).to.be.true;
    chai.expect(AwesomeString.includes(['mobile infantry'], ['mobile infantry'])).to.be.true;
  });

  it('should return true for an included number', function () {
    chai.expect(AwesomeString.includes(155, 55));
    chai.expect(AwesomeString.includes('1078', 78));
    chai.expect(AwesomeString.includes(0, 0));
    chai.expect(AwesomeString.includes(80, ''));
  });

  it('should return false for a not included string', function () {
    chai.expect(AwesomeString.includes('mobile infantry', 'be mobile')).to.be.false;
    chai.expect(AwesomeString.includes('mobile infantry', 'infantry ')).to.be.false;
    chai.expect(AwesomeString.includes('mobile infantry', ' mobile infantry ')).to.be.false;
    chai.expect(AwesomeString.includes('mobile infantry', '!')).to.be.false;
    chai.expect(AwesomeString.includes('', 'mobile')).to.be.false;
    chai.expect(AwesomeString.includes('\nwelcome', '\t')).to.be.false;
  });

  it('should return false for a not included string and position', function () {
    chai.expect(AwesomeString.includes('mobile infantry', 'mobile', 1)).to.be.false;
    chai.expect(AwesomeString.includes('mobile infantry', 'infantry', 8)).to.be.false;
    chai.expect(AwesomeString.includes('mobile infantry', 'mobile infantry', 2)).to.be.false;
    chai.expect(AwesomeString.includes('mobile infantry', ' ', 7)).to.be.false;
  });

  it('should return false for a not included string representation of an object', function () {
    chai.expect(AwesomeString.includes(['mobile infantry'], 'mobile number')).to.be.false;
    chai.expect(AwesomeString.includes({
      toString: function () {
        return 'mobile infantry';
      }
    }, 'motorized infantry')).to.be.false;
    chai.expect(AwesomeString.includes(['mobile infantry'], ['mobile infantry'], 1)).to.be.false;
  });

  it('should return false for a undefined or null search string', function () {
    chai.expect(AwesomeString.includes('mobile infantry', undefined)).to.be.false;
    chai.expect(AwesomeString.includes('mobile infantry', null)).to.be.false;
  });
});

describe('isAlpha', function () {

  it('should return true for an alpha string', function () {
    chai.expect(AwesomeString.isAlpha('HelloWorld')).to.be.true;
    chai.expect(AwesomeString.isAlpha('JavaScript')).to.be.true;
    chai.expect(AwesomeString.isAlpha('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz')).to.be.true;
    chai.expect(AwesomeString.isAlpha('man\u0303ana')).to.be.true;
    chai.expect(AwesomeString.isAlpha('foo\u0303\u035C\u035D\u035Ebar')).to.be.true;
  });

  it('should return true for a string with diacritics', function () {
    chai.expect(AwesomeString.isAlpha('áéèêëíîïóôúûýàòüçäöâùÿãõñ')).to.be.true;
  });

  it('should return true for characters with diacritical marks', function () {
    chai.expect(AwesomeString.isAlpha('man\u0303ana')).to.be.true;
    chai.expect(AwesomeString.isAlpha('foo\u0303\u035C\u035D\u035Ebar')).to.be.true;
  });

  it('should return true for an array with one alpha string item', function () {
    chai.expect(AwesomeString.isAlpha(['HelloWorld'])).to.be.true;
  });

  it('should return true for an alpha string representation of an object', function () {
    chai.expect(AwesomeString.isAlpha({
      toString: function () {
        return 'HelloWorld';
      }
    })).to.be.true;
    chai.expect(AwesomeString.isAlpha({
      toString: function () {
        return 'HelloWorld';
      }
    })).to.be.true;
  });

  it('should return true for a boolean', function () {
    chai.expect(AwesomeString.isAlpha(true)).to.be.true;
    chai.expect(AwesomeString.isAlpha(false)).to.be.true;
  });

  it('should return true for a NaN or Infinity number', function () {
    chai.expect(AwesomeString.isAlpha(NaN)).to.be.true;
    chai.expect(AwesomeString.isAlpha(Infinity)).to.be.true;
  });

  it('should return false for a non-alpha string', function () {
    chai.expect(AwesomeString.isAlpha('Hello World!')).to.be.false;
    chai.expect(AwesomeString.isAlpha('\nHello World!\n')).to.be.false;
    chai.expect(AwesomeString.isAlpha('ECMAScript 5.1 (ECMA-262)')).to.be.false;
    chai.expect(AwesomeString.isAlpha(' ')).to.be.false;
    chai.expect(AwesomeString.isAlpha('\n')).to.be.false;
    chai.expect(AwesomeString.isAlpha('\t')).to.be.false;
    chai.expect(AwesomeString.isAlpha('0123456789')).to.be.false;
    chai.expect(AwesomeString.isAlpha('áéèêëíîïóôúûýàòüçäöâùÿãõñ 0123456789')).to.be.false;
    chai.expect(AwesomeString.isAlpha(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for an array with a non-alpha string item', function () {
    chai.expect(AwesomeString.isAlpha(['Hello World!'])).to.be.false;
  });

  it('should return false for a non-alpha string representation of an object', function () {
    chai.expect(AwesomeString.isAlpha({
      toString: function () {
        return 'Hello World!';
      }
    })).to.be.false;
    chai.expect(AwesomeString.isAlpha({
      toString: function () {
        return 'Welcome!';
      }
    })).to.be.false;
  });

  it('should return false for an undefined', function () {
    chai.expect(AwesomeString.isAlpha(undefined)).to.be.false;
    chai.expect(AwesomeString.isAlpha()).to.be.false;
  });

  it('should return false for a null', function () {
    chai.expect(AwesomeString.isAlpha(null)).to.be.false;
  });

  it('should return false for a number or numeric string', function () {
    chai.expect(AwesomeString.isAlpha(0)).to.be.false;
    chai.expect(AwesomeString.isAlpha(10)).to.be.false;
    chai.expect(AwesomeString.isAlpha(-12.05)).to.be.false;
    chai.expect(AwesomeString.isAlpha(0xFF)).to.be.false;
    chai.expect(AwesomeString.isAlpha('0')).to.be.false;
    chai.expect(AwesomeString.isAlpha('10')).to.be.false;
    chai.expect(AwesomeString.isAlpha('-12.05')).to.be.false;
    chai.expect(AwesomeString.isAlpha('0xFF')).to.be.false;
  });

  it('should return false for an empty string', function () {
    chai.expect(AwesomeString.isAlpha('')).to.be.false;
  });
});

describe('isAlphaDigit', function () {

  it('should return true for an alpha and digit string', function () {
    chai.expect(AwesomeString.isAlphaDigit('HelloWorld')).to.be.true;
    chai.expect(AwesomeString.isAlphaDigit('HelloWorld007')).to.be.true;
    chai.expect(AwesomeString.isAlphaDigit('JavaScript6')).to.be.true;
    chai.expect(AwesomeString.isAlphaDigit('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz')).to.be.true;
    chai.expect(AwesomeString.isAlphaDigit('AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789')).to.be.true;
    chai.expect(AwesomeString.isAlphaDigit('man\u0303ana')).to.be.true;
    chai.expect(AwesomeString.isAlphaDigit('foo\u0303\u035C\u035D\u035Ebar')).to.be.true;
  });

  it('should return true for a string with diacritics', function () {
    chai.expect(AwesomeString.isAlphaDigit('áéèêëíîïóôúûýàòüçäöâùÿãõñ')).to.be.true;
    chai.expect(AwesomeString.isAlphaDigit('áéèêëíîïóôúûýàòüçäöâùÿãõñ0123456789')).to.be.true;
  });

  it('should return true for an array with one alpha and digit string item', function () {
    chai.expect(AwesomeString.isAlphaDigit(['HelloWorld'])).to.be.true;
    chai.expect(AwesomeString.isAlphaDigit(['HelloWorld007'])).to.be.true;
  });

  it('should return true for an alpha and digit string representation of an object', function () {
    chai.expect(AwesomeString.isAlphaDigit({
      toString: function () {
        return 'HelloWorld';
      }
    })).to.be.true;
    chai.expect(AwesomeString.isAlphaDigit({
      toString: function () {
        return 'Welcome';
      }
    })).to.be.true;
    chai.expect(AwesomeString.isAlphaDigit({
      toString: function () {
        return 'JavaScript2016';
      }
    })).to.be.true;
    chai.expect(AwesomeString.isAlphaDigit({
      toString: function () {
        return 'Welcome';
      }
    })).to.be.true;
  });

  it('should return true for a boolean', function () {
    chai.expect(AwesomeString.isAlphaDigit(true)).to.be.true;
    chai.expect(AwesomeString.isAlphaDigit(false)).to.be.true;
  });

  it('should return true for a positive number or numeric string', function () {
    chai.expect(AwesomeString.isAlphaDigit(0)).to.be.true;
    chai.expect(AwesomeString.isAlphaDigit(10)).to.be.true;
    chai.expect(AwesomeString.isAlphaDigit(0xFF)).to.be.true;
    chai.expect(AwesomeString.isAlphaDigit('0')).to.be.true;
    chai.expect(AwesomeString.isAlphaDigit('10')).to.be.true;
    chai.expect(AwesomeString.isAlphaDigit('0xFF')).to.be.true;
    chai.expect(AwesomeString.isAlphaDigit(NaN)).to.be.true;
    chai.expect(AwesomeString.isAlphaDigit(Infinity)).to.be.true;
  });

  it('should return false for a non alpha and non digit string', function () {
    chai.expect(AwesomeString.isAlphaDigit('Hello World!')).to.be.false;
    chai.expect(AwesomeString.isAlphaDigit('Hello World! It is 2016.')).to.be.false;
    chai.expect(AwesomeString.isAlphaDigit('\nHello World!\n')).to.be.false;
    chai.expect(AwesomeString.isAlphaDigit('JavaScript 2015')).to.be.false;
    chai.expect(AwesomeString.isAlphaDigit(' ')).to.be.false;
    chai.expect(AwesomeString.isAlphaDigit('\n')).to.be.false;
    chai.expect(AwesomeString.isAlphaDigit('\t')).to.be.false;
    chai.expect(AwesomeString.isAlphaDigit(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non alpha and non digit string representation of an object', function () {
    chai.expect(AwesomeString.isAlphaDigit({
      toString: function () {
        return 'Hello World! How are you?';
      }
    })).to.be.false;
    chai.expect(AwesomeString.isAlphaDigit({
      toString: function () {
        return 'Hello World! How are you?';
      }
    })).to.be.false;
  });

  it('should return false for an undefined', function () {
    chai.expect(AwesomeString.isAlphaDigit(undefined)).to.be.false;
    chai.expect(AwesomeString.isAlphaDigit()).to.be.false;
  });

  it('should return false for a null', function () {
    chai.expect(AwesomeString.isAlphaDigit(null)).to.be.false;
  });

  it('should return false for a negative number or numeric string', function () {
    chai.expect(AwesomeString.isAlphaDigit(-1)).to.be.false;
    chai.expect(AwesomeString.isAlphaDigit(-12.05)).to.be.false;
    chai.expect(AwesomeString.isAlphaDigit('-12.05')).to.be.false;
  });

  it('should return false for an empty string', function () {
    chai.expect(AwesomeString.isAlphaDigit('')).to.be.false;
  });
});

describe('isBlank', function () {

  it('should return false for a non empty string', function () {
    chai.expect(AwesomeString.isBlank('Hello World!')).to.be.false;
    chai.expect(AwesomeString.isBlank('a')).to.be.false;
    chai.expect(AwesomeString.isBlank(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non empty string representation of an object', function () {
    chai.expect(AwesomeString.isBlank(['Hello world'])).to.be.false;
    chai.expect(AwesomeString.isBlank({
      toString: function () {
        return 'Welcome to New York';
      }
    })).to.be.false;
  });

  it('should return false for a boolean', function () {
    chai.expect(AwesomeString.isBlank(true)).to.be.false;
    chai.expect(AwesomeString.isBlank(false)).to.be.false;
  });

  it('should return false for a number', function () {
    chai.expect(AwesomeString.isBlank(0)).to.be.false;
    chai.expect(AwesomeString.isBlank(100)).to.be.false;
    chai.expect(AwesomeString.isBlank(-1.5)).to.be.false;
  });

  it('should return true for an empty string', function () {
    chai.expect(AwesomeString.isBlank('')).to.be.true;
  });

  it('should return true for a string with whitespaces', function () {
    chai.expect(AwesomeString.isBlank(' ')).to.be.true;
    chai.expect(AwesomeString.isBlank('   ')).to.be.true;
    chai.expect(AwesomeString.isBlank(' \n  ')).to.be.true;
    chai.expect(AwesomeString.isBlank('\f\n\r\t\v')).to.be.true;
  });

  it('should return true for an empty string string representation of an object', function () {
    chai.expect(AwesomeString.isBlank(['\n\n'])).to.be.true;
    chai.expect(AwesomeString.isBlank({
      toString: function () {
        return ' ';
      }
    })).to.be.true;
  });

  it('should return true for an undefined', function () {
    chai.expect(AwesomeString.isBlank(undefined)).to.be.true;
    chai.expect(AwesomeString.isBlank()).to.be.true;
  });

  it('should return true for a null', function () {
    chai.expect(AwesomeString.isBlank(null)).to.be.true;
  });
});

describe('isDigit', function () {

  it('should return true for a digit string', function () {
    chai.expect(AwesomeString.isDigit('0')).to.be.true;
    chai.expect(AwesomeString.isDigit('1000')).to.be.true;
    chai.expect(AwesomeString.isDigit('1234567890')).to.be.true;
    chai.expect(AwesomeString.isDigit('00')).to.be.true;
  });

  it('should return true for an array with one digit string item', function () {
    chai.expect(AwesomeString.isDigit(['00'])).to.be.true;
    chai.expect(AwesomeString.isDigit(['12'])).to.be.true;
    chai.expect(AwesomeString.isDigit(['1234567890'])).to.be.true;
  });

  it('should return true for a digit string representation of an object', function () {
    chai.expect(AwesomeString.isDigit({
      toString: function () {
        return '123';
      }
    })).to.be.true;
    chai.expect(AwesomeString.isDigit({
      toString: function () {
        return '567';
      }
    })).to.be.true;
    chai.expect(AwesomeString.isDigit({
      toString: function () {
        return '00';
      }
    })).to.be.true;
  });

  it('should return true for a positive integer number', function () {
    chai.expect(AwesomeString.isDigit(0)).to.be.true;
    chai.expect(AwesomeString.isDigit(1000)).to.be.true;
    chai.expect(AwesomeString.isDigit(0xFF)).to.be.true;
    chai.expect(AwesomeString.isDigit(0x1fffffffffffff)).to.be.true;
  });

  it('should return false for a boolean', function () {
    chai.expect(AwesomeString.isDigit(true)).to.be.false;
    chai.expect(AwesomeString.isDigit(false)).to.be.false;
  });

  it('should return false for a non-digit string', function () {
    chai.expect(AwesomeString.isDigit('hell0w0rld!')).to.be.false;
    chai.expect(AwesomeString.isDigit('hello world! 12')).to.be.false;
    chai.expect(AwesomeString.isDigit('\nhell0 w0rld!\n')).to.be.false;
    chai.expect(AwesomeString.isDigit('JavaScript 2015')).to.be.false;
    chai.expect(AwesomeString.isDigit('isAlpha(0)')).to.be.false;
    chai.expect(AwesomeString.isDigit('привет0мир!1200')).to.be.false;
    chai.expect(AwesomeString.isDigit('12.0')).to.be.false;
    chai.expect(AwesomeString.isDigit('-1')).to.be.false;
    chai.expect(AwesomeString.isDigit(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for an array with a non-digit string item', function () {
    chai.expect(AwesomeString.isDigit(['Hello 1000000 visitor'])).to.be.false;
    chai.expect(AwesomeString.isDigit(['0.0'])).to.be.false;
  });

  it('should return false for a non digit string representation of an object', function () {
    chai.expect(AwesomeString.isDigit({
      toString: function () {
        return 'Hello World! 007';
      }
    })).to.be.false;
    chai.expect(AwesomeString.isDigit({
      toString: function () {
        return 'Ява Скрипт, привет 0!';
      }
    })).to.be.false;
  });

  it('should return false for an undefined', function () {
    chai.expect(AwesomeString.isDigit(undefined)).to.be.false;
    chai.expect(AwesomeString.isDigit()).to.be.false;
  });

  it('should return false for a null', function () {
    chai.expect(AwesomeString.isDigit(null)).to.be.false;
  });

  it('should return false for a negative number or negative numeric string', function () {
    chai.expect(AwesomeString.isDigit(-12)).to.be.false;
    chai.expect(AwesomeString.isDigit(-100)).to.be.false;
    chai.expect(AwesomeString.isDigit(-12.05)).to.be.false;
    chai.expect(AwesomeString.isDigit('-1')).to.be.false;
    chai.expect(AwesomeString.isDigit('-12.05')).to.be.false;
  });

  it('should return false for float numbers', function () {
    chai.expect(AwesomeString.isDigit(0.5)).to.be.false;
    chai.expect(AwesomeString.isDigit(12.05)).to.be.false;
    chai.expect(AwesomeString.isDigit(100.001)).to.be.false;
  });

  it('should return false for an Infinity number', function () {
    chai.expect(AwesomeString.isDigit(Infinity)).to.be.false;
  });

  it('should return false for a NaN number', function () {
    chai.expect(AwesomeString.isDigit(NaN)).to.be.false;
  });

  it('should return false for an empty string', function () {
    chai.expect(AwesomeString.isDigit('')).to.be.false;
  });
});

describe('isEmpty', function () {

  it('should return true for an empty string', function () {
    chai.expect(AwesomeString.isEmpty('')).to.be.true;
  });

  it('should return true for an undefined', function () {
    chai.expect(AwesomeString.isEmpty(undefined)).to.be.true;
    chai.expect(AwesomeString.isEmpty()).to.be.true;
  });

  it('should return true for a null', function () {
    chai.expect(AwesomeString.isEmpty(null)).to.be.true;
  });

  it('should return false for a non empty string', function () {
    chai.expect(AwesomeString.isEmpty('Hello World!')).to.be.false;
    chai.expect(AwesomeString.isEmpty('a')).to.be.false;
    chai.expect(AwesomeString.isEmpty(' ')).to.be.false;
    chai.expect(AwesomeString.isEmpty(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non empty string representation of an object', function () {
    chai.expect(AwesomeString.isEmpty(['Hello world'])).to.be.false;
    chai.expect(AwesomeString.isEmpty({
      toString: function () {
        return ' ';
      }
    })).to.be.false;
  });

  it('should return false for a boolean', function () {
    chai.expect(AwesomeString.isEmpty(true)).to.be.false;
    chai.expect(AwesomeString.isEmpty(false)).to.be.false;
  });

  it('should return false for a number', function () {
    chai.expect(AwesomeString.isEmpty(0)).to.be.false;
    chai.expect(AwesomeString.isEmpty(100)).to.be.false;
    chai.expect(AwesomeString.isEmpty(-1.5)).to.be.false;
  });
});

describe('isLowerCase', function () {

  it('should return true for a lower case string', function () {
    chai.expect(AwesomeString.isLowerCase('a')).to.be.true;
    chai.expect(AwesomeString.isLowerCase('helloworld')).to.be.true;
    chai.expect(AwesomeString.isLowerCase('welcometoearth')).to.be.true;
    chai.expect(AwesomeString.isLowerCase('áéèêëíîïóôúûýàòüçäöâùÿãõñ')).to.be.true;
  });

  it('should return true for a lower case string representation of an object', function () {
    chai.expect(AwesomeString.isLowerCase(['robocop'])).to.be.true;
    chai.expect(AwesomeString.isLowerCase({
      toString: function () {
        return 'batman';
      }
    })).to.be.true;
  });

  it('should return true for a boolean', function () {
    chai.expect(AwesomeString.isLowerCase(true)).to.be.true;
    chai.expect(AwesomeString.isLowerCase(false)).to.be.true;
  });

  it('should return false for a string containing upper case characters', function () {
    chai.expect(AwesomeString.isLowerCase('Helloworld')).to.be.false;
    chai.expect(AwesomeString.isLowerCase('WELCOMETOEARTH')).to.be.false;
  });

  it('should return false for a string containing characters different than lower case', function () {
    chai.expect(AwesomeString.isLowerCase('hello world!')).to.be.false;
    chai.expect(AwesomeString.isLowerCase('No one cared who I was until I put on the mask.')).to.be.false;
    chai.expect(AwesomeString.isLowerCase('\n')).to.be.false;
    chai.expect(AwesomeString.isLowerCase('\t')).to.be.false;
    chai.expect(AwesomeString.isLowerCase(' ')).to.be.false;
    chai.expect(AwesomeString.isLowerCase('')).to.be.false;
    chai.expect(AwesomeString.isLowerCase(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non lower case string representation of an object', function () {
    chai.expect(AwesomeString.isLowerCase(['RoboCop'])).to.be.false;
    chai.expect(AwesomeString.isLowerCase({
      toString: function () {
        return 'Batman';
      }
    })).to.be.false;
  });

  it('should return false for a number or numeric string', function () {
    chai.expect(AwesomeString.isLowerCase(0)).to.be.false;
    chai.expect(AwesomeString.isLowerCase(-1500)).to.be.false;
    chai.expect(AwesomeString.isLowerCase(2017)).to.be.false;
    chai.expect(AwesomeString.isLowerCase('0')).to.be.false;
    chai.expect(AwesomeString.isLowerCase('1998')).to.be.false;
  });

  it('should return false for a null', function () {
    chai.expect(AwesomeString.isLowerCase(null)).to.be.false;
  });

  it('should return false for an undefined', function () {
    chai.expect(AwesomeString.isLowerCase(undefined)).to.be.false;
    chai.expect(AwesomeString.isLowerCase()).to.be.false;
  });
});

describe('isNumeric', function () {

  it('should return true for a number', function () {
    chai.expect(AwesomeString.isNumeric(0)).to.be.true;
    chai.expect(AwesomeString.isNumeric(+0)).to.be.true;
    chai.expect(AwesomeString.isNumeric(1000)).to.be.true;
    chai.expect(AwesomeString.isNumeric(-1000)).to.be.true;
    chai.expect(AwesomeString.isNumeric(0xFF)).to.be.true;
    chai.expect(AwesomeString.isNumeric(1.56)).to.be.true;
    chai.expect(AwesomeString.isNumeric(-10.888)).to.be.true;
    chai.expect(AwesomeString.isNumeric(125e5)).to.be.true;
    chai.expect(AwesomeString.isNumeric(125e-3)).to.be.true;
  });

  it('should return true for a numeric string', function () {
    chai.expect(AwesomeString.isNumeric('0')).to.be.true;
    chai.expect(AwesomeString.isNumeric('+0')).to.be.true;
    chai.expect(AwesomeString.isNumeric('0.0')).to.be.true;
    chai.expect(AwesomeString.isNumeric('1000')).to.be.true;
    chai.expect(AwesomeString.isNumeric('-1000')).to.be.true;
    chai.expect(AwesomeString.isNumeric('0xFF')).to.be.true;
    chai.expect(AwesomeString.isNumeric('1.56')).to.be.true;
    chai.expect(AwesomeString.isNumeric('-10.888')).to.be.true;
    chai.expect(AwesomeString.isNumeric('125e5')).to.be.true;
    chai.expect(AwesomeString.isNumeric('125e-3')).to.be.true;
  });

  it('should return true for a numeric string representation of an object', function () {
    chai.expect(AwesomeString.isNumeric([0])).to.be.true;
    chai.expect(AwesomeString.isNumeric(['0'])).to.be.true;
    chai.expect(AwesomeString.isNumeric(['0.0'])).to.be.true;
    chai.expect(AwesomeString.isNumeric({
      toString: function () {
        return '100';
      }
    })).to.be.true;
  });

  it('should return false for a non numeric string', function () {
    chai.expect(AwesomeString.isNumeric('FF')).to.be.false;
    chai.expect(AwesomeString.isNumeric('0FF')).to.be.false;
    chai.expect(AwesomeString.isNumeric('Hello World!')).to.be.false;
    chai.expect(AwesomeString.isNumeric('!0')).to.be.false;
    chai.expect(AwesomeString.isNumeric('1.0 0')).to.be.false;
    chai.expect(AwesomeString.isNumeric('Infinity')).to.be.false;
    chai.expect(AwesomeString.isNumeric('NaN')).to.be.false;
    chai.expect(AwesomeString.isNumeric(' ')).to.be.false;
    chai.expect(AwesomeString.isNumeric(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non numeric string representation of an object', function () {
    chai.expect(AwesomeString.isNumeric(['Hello World!'])).to.be.false;
    chai.expect(AwesomeString.isNumeric({
      toString: function () {
        return 'NaN';
      }
    })).to.be.false;
  });

  it('should return false for a boolean', function () {
    chai.expect(AwesomeString.isNumeric(true)).to.be.false;
    chai.expect(AwesomeString.isNumeric(false)).to.be.false;
  });

  it('should return false for an undefined', function () {
    chai.expect(AwesomeString.isNumeric(undefined)).to.be.false;
    chai.expect(AwesomeString.isNumeric()).to.be.false;
  });

  it('should return false for a null', function () {
    chai.expect(AwesomeString.isNumeric(null)).to.be.false;
  });

  it('should return false for an Inifinty', function () {
    chai.expect(AwesomeString.isNumeric(null)).to.be.false;
  });

  it('should return false for a NaN', function () {
    chai.expect(AwesomeString.isNumeric(null)).to.be.false;
  });

  it('should return false for an empty string', function () {
    chai.expect(AwesomeString.isNumeric('')).to.be.false;
  });
});

describe('isString', function () {

  it('should return true for a string', function () {
    chai.expect(AwesomeString.isString('Hello World!')).to.be.true;
    chai.expect(AwesomeString.isString('')).to.be.true;
    chai.expect(AwesomeString.isString('\n')).to.be.true;
    chai.expect(AwesomeString.isString(PRINTABLE_ASCII)).to.be.true;
  });

  it('should return false for a null', function () {
    chai.expect(AwesomeString.isString(null)).to.be.false;
  });

  it('should return false for an undefined', function () {
    chai.expect(AwesomeString.isString(undefined)).to.be.false;
    chai.expect(AwesomeString.isString()).to.be.false;
  });

  it('should return false for a boolean', function () {
    chai.expect(AwesomeString.isString(true)).to.be.false;
    chai.expect(AwesomeString.isString(false)).to.be.false;
  });

  it('should return false for a number', function () {
    chai.expect(AwesomeString.isString(100)).to.be.false;
    chai.expect(AwesomeString.isString(-40)).to.be.false;
  });

  it('should return false for an object', function () {
    chai.expect(AwesomeString.isString([])).to.be.false;
    chai.expect(AwesomeString.isString({})).to.be.false;
    chai.expect(AwesomeString.isString(new Date())).to.be.false;
  });
});

describe('isUpperCase', function () {

  it('should return true for an upper case string', function () {
    chai.expect(AwesomeString.isUpperCase('A')).to.be.true;
    chai.expect(AwesomeString.isUpperCase('HELLOWORLD')).to.be.true;
    chai.expect(AwesomeString.isUpperCase('WELCOMETOEARTH')).to.be.true;
    chai.expect(AwesomeString.isUpperCase('ÁÉÈÊËÍÎÏÓÔÚÛÝÀÒÜÇÄÖÂÙŸÃÕÑ')).to.be.true;
  });

  it('should return true for a lower case string representation of an object', function () {
    chai.expect(AwesomeString.isUpperCase(['ROBOCOP'])).to.be.true;
    chai.expect(AwesomeString.isUpperCase({
      toString: function () {
        return 'BATMAN';
      }
    })).to.be.true;
  });

  it('should return false for a string containing lower case characters', function () {
    chai.expect(AwesomeString.isUpperCase('Helloworld')).to.be.false;
    chai.expect(AwesomeString.isUpperCase('WeLCOMETOEARTH')).to.be.false;
  });

  it('should return false for a boolean', function () {
    chai.expect(AwesomeString.isUpperCase(true)).to.be.false;
    chai.expect(AwesomeString.isUpperCase(false)).to.be.false;
  });

  it('should return false for a string containing characters different than upper case', function () {
    chai.expect(AwesomeString.isUpperCase('hello world!')).to.be.false;
    chai.expect(AwesomeString.isUpperCase('No one cared who I was until I put on the mask.')).to.be.false;
    chai.expect(AwesomeString.isUpperCase('\n')).to.be.false;
    chai.expect(AwesomeString.isUpperCase('\t')).to.be.false;
    chai.expect(AwesomeString.isUpperCase(' ')).to.be.false;
    chai.expect(AwesomeString.isUpperCase('')).to.be.false;
    chai.expect(AwesomeString.isUpperCase(PRINTABLE_ASCII)).to.be.false;
  });

  it('should return false for a non upper case string representation of an object', function () {
    chai.expect(AwesomeString.isUpperCase(['RoboCop'])).to.be.false;
    chai.expect(AwesomeString.isUpperCase({
      toString: function () {
        return 'Batman';
      }
    })).to.be.false;
  });

  it('should return false for a number or numeric string', function () {
    chai.expect(AwesomeString.isUpperCase(0)).to.be.false;
    chai.expect(AwesomeString.isUpperCase(-1500)).to.be.false;
    chai.expect(AwesomeString.isUpperCase(2017)).to.be.false;
    chai.expect(AwesomeString.isUpperCase('0')).to.be.false;
    chai.expect(AwesomeString.isUpperCase('1998')).to.be.false;
  });

  it('should return false for a null', function () {
    chai.expect(AwesomeString.isUpperCase(null)).to.be.false;
  });

  it('should return false for an undefined', function () {
    chai.expect(AwesomeString.isUpperCase(undefined)).to.be.false;
    chai.expect(AwesomeString.isUpperCase()).to.be.false;
  });
});

describe('matches', function () {

  it('should return true for a string that matches a regular expression object', function () {
    chai.expect(AwesomeString.matches('pacific ocean', /ocean/)).to.be.true;
    chai.expect(AwesomeString.matches('pacific ocean', /^pacific ocean$/)).to.be.true;
    chai.expect(AwesomeString.matches(undefined, /.?/)).to.be.true;
    chai.expect(AwesomeString.matches(null, /.?/)).to.be.true;
  });

  it('should return true for a string that matches a regular expression string', function () {
    chai.expect(AwesomeString.matches('pacific ocean', 'ocean')).to.be.true;
    chai.expect(AwesomeString.matches('pacific ocean', '^pacific ocean$')).to.be.true;
    chai.expect(AwesomeString.matches('pacific ocean', 'PACIFIC', 'i')).to.be.true;
    chai.expect(AwesomeString.matches('pacific ocean', '\\s')).to.be.true;
    chai.expect(AwesomeString.matches(undefined, '.?')).to.be.true;
    chai.expect(AwesomeString.matches(null, '.?')).to.be.true;
    chai.expect(AwesomeString.matches(PRINTABLE_ASCII, '\s')).to.be.true;
  });

  it('should return true for a string that matches a string representation of an object', function () {
    chai.expect(AwesomeString.matches(['atlantic ocean'], /atlantic/)).to.be.true;
    chai.expect(AwesomeString.matches('pacific ocean', ['^pacific ocean$'])).to.be.true;
    chai.expect(AwesomeString.matches({
      toString: function () {
        return 'pacific ocean';
      }
    }, 'PACIFIC', 'i')).to.be.true;
    chai.expect(AwesomeString.matches(['pacific ocean'], ['\\s'])).to.be.true;
  });

  it('should return true for a number that matches a regular expression', function () {
    chai.expect(AwesomeString.matches(1500, /\d/)).to.be.true;
    chai.expect(AwesomeString.matches(685, 68)).to.be.true;
    chai.expect(AwesomeString.matches(-1.5, /^\-1\.5$/)).to.be.true;
  });

  it('should return true for a boolean that matches a regular expression', function () {
    chai.expect(AwesomeString.matches(true, /true/)).to.be.true;
    chai.expect(AwesomeString.matches(false, 'false')).to.be.true;
  });

  it('should return false for a string that does not match a regular expression object', function () {
    chai.expect(AwesomeString.matches('pacific ocean', /^ocean/)).to.be.false;
    chai.expect(AwesomeString.matches('pacific ocean', /^atlantic ocean$/)).to.be.false;
    chai.expect(AwesomeString.matches(undefined, /a/)).to.be.false;
  });

  it('should return false for a string that does not match a regular expression string', function () {
    chai.expect(AwesomeString.matches('pacific ocean', 'sea')).to.be.false;
    chai.expect(AwesomeString.matches('pacific ocean', '^atlantic ocean$')).to.be.false;
    chai.expect(AwesomeString.matches('pacific ocean', 'PACIFIC')).to.be.false;
    chai.expect(AwesomeString.matches('pacific ocean', '\\n')).to.be.false;
    chai.expect(AwesomeString.matches(undefined, '\s')).to.be.false;
  });

  it('should return false for a null or undefined pattern', function () {
    chai.expect(AwesomeString.matches('pacific ocean', undefined)).to.be.false;
    chai.expect(AwesomeString.matches('pacific ocean', null)).to.be.false;
  });
});

describe('startsWith', function () {

  it('should return true for a valid starting string', function () {
    chai.expect(AwesomeString.startsWith('Hello World!', '')).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'H')).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'He')).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'Hel')).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'Hell')).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'Hello')).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'Hello ')).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'Hello W')).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'Hello Wo')).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'Hello Wor')).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'Hello Worl')).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'Hello World')).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'Hello World!')).to.be.true;
    chai.expect(AwesomeString.startsWith('Привет Мир!', 'Привет')).to.be.true;
    chai.expect(AwesomeString.startsWith('', '')).to.be.true;
    chai.expect(AwesomeString.startsWith(PRINTABLE_ASCII, ' ')).to.be.true;
  });

  it('should return true for a valid starting string and position', function () {
    chai.expect(AwesomeString.startsWith('Hello World!', '', 0)).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', '!', 'Hello World!'.length - 1)).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'd!', 'Hello World!'.length - 2)).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'ld!', 'Hello World!'.length - 3)).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'rld!', 'Hello World!'.length - 4)).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'orld!', 'Hello World!'.length - 5)).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'World!', 'Hello World!'.length - 6)).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', ' World!', 'Hello World!'.length - 7)).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'o World!', 'Hello World!'.length - 8)).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'lo World!', 'Hello World!'.length - 9)).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'llo World!', 'Hello World!'.length - 10)).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'ello World!', 'Hello World!'.length - 11)).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'Hello World!', 0)).to.be.true;
    chai.expect(AwesomeString.startsWith('', '', 0)).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'Hello', NaN)).to.be.true;
  });

  it('should return true for a correct downcast of the position', function () {
    chai.expect(AwesomeString.startsWith('Hello World!', 'ello', '1')).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'ello', 1.1)).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'Hello', -1)).to.be.true;
    chai.expect(AwesomeString.startsWith('Hello World!', 'Hello', -Infinity)).to.be.true;
  });

  it('should return true for an empty starting string', function () {
    [0, 1, 100, Infinity, undefined, NaN, null].forEach(function (position) {
      chai.expect(AwesomeString.startsWith('Hello World!', '', position)).to.be.true;
    });
  });

  it('should return true for a valid starting as a number', function () {
    chai.expect(AwesomeString.startsWith(1000, 100)).to.be.true;
    chai.expect(AwesomeString.startsWith(1250, 12)).to.be.true;
    chai.expect(AwesomeString.startsWith('916', 91)).to.be.true;
  });

  it('should return true for a valid ending in a string representation of an object', function () {
    chai.expect(AwesomeString.startsWith(['Welcome to Earth'], 'Welcome')).to.be.true;
    chai.expect(AwesomeString.startsWith({
      toString: function () {
        return 'Let us not stand on ceremony, Mr. Wayne.';
      }
    }, ['Let us not stand on ceremony'])).to.be.true;
  });

  it('should return false for an invalid starting string', function () {
    chai.expect(AwesomeString.startsWith('The shadows betray you, because they belong to me!', 'belong to me!')).to.be.false;
    chai.expect(AwesomeString.startsWith('The shadows betray you, because they belong to me!', 'he shadows')).to.be.false;
    chai.expect(AwesomeString.startsWith('They belong to me!', 'hey belong to me!')).to.be.false;
    chai.expect(AwesomeString.startsWith('They belong to me!', 'belong')).to.be.false;
    chai.expect(AwesomeString.startsWith('', 'The shadows')).to.be.false;
  });

  it('should return false for an invalid starting string and position', function () {
    chai.expect(AwesomeString.startsWith('The shadows betray you, because they belong to me!', 'The shadows betray you', 1)).to.be.false;
    chai.expect(AwesomeString.startsWith('They belong to me!', 'They belong to me!', 1)).to.be.false;
    chai.expect(AwesomeString.startsWith('They belong to me!', 'They', 1)).to.be.false;
    chai.expect(AwesomeString.startsWith('They belong to me!', 'belong', 2)).to.be.false;
    chai.expect(AwesomeString.startsWith('They belong to me!', 'to me!', 3)).to.be.false;
    chai.expect(AwesomeString.startsWith('They belong to me!', 'They belong', 100)).to.be.false;
  });

  it('should return false for an invalid starting number', function () {
    chai.expect(AwesomeString.startsWith(1000, 11)).to.be.false;
    chai.expect(AwesomeString.startsWith(1250, 10)).to.be.false;
    chai.expect(AwesomeString.startsWith('916', 90)).to.be.false;
  });

  it('should return false for undefined and null parameters', function () {
    chai.expect(AwesomeString.startsWith()).to.be.false;
    chai.expect(AwesomeString.startsWith(undefined)).to.be.false;
    chai.expect(AwesomeString.startsWith(undefined, undefined)).to.be.false;
    chai.expect(AwesomeString.startsWith(undefined, undefined, undefined)).to.be.false;
    chai.expect(AwesomeString.startsWith(undefined, undefined, 0)).to.be.false;
    chai.expect(AwesomeString.startsWith(undefined, 'Hello World!')).to.be.false;
    chai.expect(AwesomeString.startsWith(null)).to.be.false;
    chai.expect(AwesomeString.startsWith(null, null)).to.be.false;
    chai.expect(AwesomeString.startsWith(null, null, null)).to.be.false;
    chai.expect(AwesomeString.startsWith(null, null, 0)).to.be.false;
    chai.expect(AwesomeString.startsWith(null, 'Hello World!')).to.be.false;
  });
});

describe('chars', function () {

  it('should split a string into characters', function () {
    chai.expect(AwesomeString.chars('stellar bomb')).to.eql(['s', 't', 'e', 'l', 'l', 'a', 'r', ' ', 'b', 'o', 'm', 'b']);
    chai.expect(AwesomeString.chars('   ')).to.eql([' ', ' ', ' ']);
    chai.expect(AwesomeString.chars('\n\t')).to.eql(['\n', '\t']);
    chai.expect(AwesomeString.chars('')).to.eql([]);
    chai.expect(AwesomeString.chars(PRINTABLE_ASCII)).to.eql(Array.prototype.slice.call(PRINTABLE_ASCII, 0));
  });

  it('should split a number into characters', function () {
    chai.expect(AwesomeString.chars(0)).to.eql(['0']);
    chai.expect(AwesomeString.chars(1560)).to.eql(['1', '5', '6', '0']);
    chai.expect(AwesomeString.chars(-1.6)).to.eql(['-', '1', '.', '6']);
  });

  it('should split the string representation of an object', function () {
    chai.expect(AwesomeString.chars(['star'])).to.eql(['s', 't', 'a', 'r']);
    chai.expect(AwesomeString.chars({
      toString: function () {
        return 'Capa';
      }
    })).to.eql(['C', 'a', 'p', 'a']);
  });

  it('should return an empty array of characters for null and undefined', function () {
    chai.expect(AwesomeString.chars()).to.eql([]);
    chai.expect(AwesomeString.chars(undefined)).to.eql([]);
    chai.expect(AwesomeString.chars(null)).to.eql([]);
  });
});

describe('codePoints', function () {

  it('should split a string into code point numbers', function () {
    chai.expect(AwesomeString.codePoints('stellar bomb')).to.eql([0x73, 0x74, 0x65, 0x6C, 0x6C, 0x61, 0x72, 0x20, 0x62, 0x6F, 0x6D, 0x62]);
    chai.expect(AwesomeString.codePoints('   ')).to.eql([0x20, 0x20, 0x20]);
    chai.expect(AwesomeString.codePoints('\n\t')).to.eql([0xA, 0x9]);
    chai.expect(AwesomeString.codePoints('')).to.eql([]);
  });

  it('should split a string with surrogate pairs and diacritical marks characters into code point numbers', function () {
    chai.expect(AwesomeString.codePoints('man\u0303ana')).to.eql([0x6D, 0x61, 0x6E, 0x303, 0x61, 0x6E, 0x61]);
    chai.expect(AwesomeString.codePoints('\u00E9\u20DD')).to.eql([0xE9, 0x20DD]);
    chai.expect(AwesomeString.codePoints('\uD835\uDC00\uD835\uDC01')).to.eql([0x1D400, 0x1D401]);
    chai.expect(AwesomeString.codePoints('cafe\u0301')).to.eql([0x63, 0x61, 0x66, 0x65, 0x301]);
    chai.expect(AwesomeString.codePoints('foo\u0303\u035C\u035D\u035Ebar')).to.eql([0x66, 0x6F, 0x6F, 0x303, 0x35C, 0x35D, 0x35E, 0x62, 0x61, 0x72]);
    chai.expect(AwesomeString.codePoints('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar')).to.eql([0x66, 0x6F, 0x6F, 0x1D306, 0x303, 0x35C, 0x35D, 0x35E, 0x62, 0x61, 0x72]);
  });

  it('should split a number into code point numbers', function () {
    chai.expect(AwesomeString.codePoints(0)).to.eql([0x30]);
    chai.expect(AwesomeString.codePoints(1560)).to.eql([0x31, 0x35, 0x36, 0x30]);
    chai.expect(AwesomeString.codePoints(-1.6)).to.eql([0x2D, 0x31, 0x2E, 0x36]);
  });

  it('should split the string representation of an object into code point numbers', function () {
    chai.expect(AwesomeString.codePoints(['star'])).to.eql([0x73, 0x74, 0x61, 0x72]);
    chai.expect(AwesomeString.codePoints({
      toString: function () {
        return 'Capa';
      }
    })).to.eql([0x43, 0x61, 0x70, 0x61]);
  });

  it('should return an empty array for null and undefined', function () {
    chai.expect(AwesomeString.codePoints()).to.eql([]);
    chai.expect(AwesomeString.codePoints(undefined)).to.eql([]);
    chai.expect(AwesomeString.codePoints(null)).to.eql([]);
  });
});

describe('graphemes', function () {

  it('should split a string into characters', function () {
    chai.expect(AwesomeString.graphemes('stellar bomb')).to.eql(['s', 't', 'e', 'l', 'l', 'a', 'r', ' ', 'b', 'o', 'm', 'b']);
    chai.expect(AwesomeString.graphemes('   ')).to.eql([' ', ' ', ' ']);
    chai.expect(AwesomeString.graphemes('\n\t')).to.eql(['\n', '\t']);
    chai.expect(AwesomeString.graphemes('')).to.eql([]);
    chai.expect(AwesomeString.graphemes(PRINTABLE_ASCII)).to.eql(Array.prototype.slice.call(PRINTABLE_ASCII, 0));
  });

  it('should split a string into surrogate pairs and diacritical marks characters', function () {
    chai.expect(AwesomeString.graphemes('man\u0303ana')).to.eql(['m', 'a', 'n\u0303', 'a', 'n', 'a']);
    chai.expect(AwesomeString.graphemes('\u00E9\u20DD')).to.eql(['\u00E9\u20DD']);
    chai.expect(AwesomeString.graphemes('\uD835\uDC00\uD835\uDC01')).to.eql(['\uD835\uDC00', '\uD835\uDC01']);
    chai.expect(AwesomeString.graphemes('cafe\u0301')).to.eql(['c', 'a', 'f', 'e\u0301']);
    chai.expect(AwesomeString.graphemes('foo\u0303\u035C\u035D\u035Ebar')).to.eql(['f', 'o', 'o\u0303\u035C\u035D\u035E', 'b', 'a', 'r']);
    chai.expect(AwesomeString.graphemes('foo\uD834\uDF06\u0303\u035C\u035D\u035Ebar')).to.eql(['f', 'o', 'o', '\uD834\uDF06\u0303\u035C\u035D\u035E', 'b', 'a', 'r']);
  });

  it('should split a number into characters', function () {
    chai.expect(AwesomeString.graphemes(0)).to.eql(['0']);
    chai.expect(AwesomeString.graphemes(1560)).to.eql(['1', '5', '6', '0']);
    chai.expect(AwesomeString.graphemes(-1.6)).to.eql(['-', '1', '.', '6']);
  });

  it('should split the string representation of an object', function () {
    chai.expect(AwesomeString.graphemes(['star'])).to.eql(['s', 't', 'a', 'r']);
    chai.expect(AwesomeString.graphemes({
      toString: function () {
        return 'Capa';
      }
    })).to.eql(['C', 'a', 'p', 'a']);
  });

  it('should return an empty array of characters for null and undefined', function () {
    chai.expect(AwesomeString.graphemes()).to.eql([]);
    chai.expect(AwesomeString.graphemes(undefined)).to.eql([]);
    chai.expect(AwesomeString.graphemes(null)).to.eql([]);
  });
});

describe('split', function () {

  it('should split a string into chunks', function () {
    chai.expect(AwesomeString.split('stellar bomb', ' ')).to.eql(['stellar', 'bomb']);
    chai.expect(AwesomeString.split('   ', ' ')).to.eql(['', '', '', '']);
    chai.expect(AwesomeString.split('dying star', /\s/)).to.eql(['dying', 'star']);
    chai.expect(AwesomeString.split('*dying*star*', /\*/)).to.eql(['', 'dying', 'star', '']);
    chai.expect(AwesomeString.split('', '')).to.eql([]);
    chai.expect(AwesomeString.split('star', '')).to.eql(['s', 't', 'a', 'r']);
  });

  it('should split a number into chunks', function () {
    chai.expect(AwesomeString.split(0)).to.eql(['0']);
    chai.expect(AwesomeString.split(1560, '6')).to.eql(['15', '0']);
    chai.expect(AwesomeString.split(-1.6, /\./)).to.eql(['-1', '6']);
  });

  it('should split the string representation of an object', function () {
    chai.expect(AwesomeString.split('rising star', ' ')).to.eql(['rising', 'star']);
    chai.expect(AwesomeString.split({
      toString: function () {
        return 'rising-star';
      }
    }, /\-/)).to.eql(['rising', 'star']);
  });

  it('should return the string as an item of an array for an empty separator', function () {
    chai.expect(AwesomeString.split('star')).to.eql(['star']);
    chai.expect(AwesomeString.split('star', null)).to.eql(['star']);
    chai.expect(AwesomeString.split('star', undefined)).to.eql(['star']);
  });
});

describe('words', function () {

  it('should split the string into words', function () {
    chai.expect(AwesomeString.words('123')).to.eql(['123']);
    chai.expect(AwesomeString.words('15+20=35')).to.eql(['15', '20', '35']);
    chai.expect(AwesomeString.words('hello')).to.eql(['hello']);
    chai.expect(AwesomeString.words('  hello   ')).to.eql(['hello']);
    chai.expect(AwesomeString.words('hello world')).to.eql(['hello', 'world']);
    chai.expect(AwesomeString.words('12+14-18*400')).to.eql(['12', '14', '18', '400']);
    chai.expect(AwesomeString.words('gravity can cross dimensions')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    chai.expect(AwesomeString.words('-gravity-can-cross-dimensions-')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    chai.expect(AwesomeString.words('gravity_can_cross_dimensions')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    chai.expect(AwesomeString.words('*gravity***can****cross&&dimensions++')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    chai.expect(AwesomeString.words('GravityCanCrossDimensions')).to.eql(['Gravity', 'Can', 'Cross', 'Dimensions']);
    chai.expect(AwesomeString.words('GRAVITYCan')).to.eql(['GRAVITY', 'Can']);
    chai.expect(AwesomeString.words('GravityCan')).to.eql(['Gravity', 'Can']);
    chai.expect(AwesomeString.words('GravityCANAttract')).to.eql(['Gravity', 'CAN', 'Attract']);
    chai.expect(AwesomeString.words('gravityCan')).to.eql(['gravity', 'Can']);
    chai.expect(AwesomeString.words('Gravity-Can11Cross **Dimensions1Foo')).to.eql(['Gravity', 'Can', '11', 'Cross', 'Dimensions', '1', 'Foo']);
    chai.expect(AwesomeString.words('Cooper... Cooper... Come in, Cooper.')).to.eql(['Cooper', 'Cooper', 'Come', 'in', 'Cooper']);
    chai.expect(AwesomeString.words('Newton\'s third law')).to.eql(['Newton', 's', 'third', 'law']);
    chai.expect(AwesomeString.words('Newton\'s thIrd lAw')).to.eql(['Newton', 's', 'th', 'Ird', 'l', 'Aw']);
    chai.expect(AwesomeString.words(PRINTABLE_ASCII)).to.eql(['0123456789', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz']);
    chai.expect(AwesomeString.words('')).to.eql([]);
    chai.expect(AwesomeString.words()).to.eql([]);
    chai.expect(AwesomeString.words(' ')).to.eql([]);
    chai.expect(AwesomeString.words('     ')).to.eql([]);
    chai.expect(AwesomeString.words('\n')).to.eql([]);
    chai.expect(AwesomeString.words('***')).to.eql([]);
    chai.expect(AwesomeString.words('***---')).to.eql([]);
    chai.expect(AwesomeString.words('***---')).to.eql([]);
    chai.expect(AwesomeString.words('man\u0303ana')).to.eql(['man\u0303ana']);
    chai.expect(AwesomeString.words('maN\u0303ana')).to.eql(['ma', 'N\u0303ana']);
    chai.expect(AwesomeString.words('foo\u0303\u035C\u035D\u035E bar')).to.eql(['foo\u0303\u035C\u035D\u035E', 'bar']);
    chai.expect(AwesomeString.words('fo-O-O\u0303\u035C\u035D\u035E-bar')).to.eql(['fo', 'O', 'O\u0303\u035C\u035D\u035E', 'bar']);
  });

  it('should split the string with diacritics into words', function () {
    chai.expect(AwesomeString.words('clasificación biológica.')).to.eql(['clasificación', 'biológica']);
    chai.expect(AwesomeString.words('BunăZiua')).to.eql(['Bună', 'Ziua']);
    chai.expect(AwesomeString.words('Bună1ZiUa!')).to.eql(['Bună', '1', 'Zi', 'Ua']);
    chai.expect(AwesomeString.words('Język /polski wywodzi się z` języka` praindoeuropejskiego za**pośrednictwem+języka-prasłowiańskiego.')).to.eql(['Język', 'polski', 'wywodzi', 'się', 'z', 'języka', 'praindoeuropejskiego', 'za', 'pośrednictwem', 'języka', 'prasłowiańskiego']);
    chai.expect(AwesomeString.words('Гравитация притягивает все')).to.eql(['Гравитация', 'притягивает', 'все']);
    chai.expect(AwesomeString.words('Гравитация-Притягивает-ВСЕ!!')).to.eql(['Гравитация', 'Притягивает', 'ВСЕ']);
    chai.expect(AwesomeString.words('Στις--αρχές** (του) 21ου, αιώνα!')).to.eql(['Στις', 'αρχές', 'του', '21', 'ου', 'αιώνα']);
  });

  it('should split the string representation of an object', function () {
    chai.expect(AwesomeString.words(['GravityCanCrossDimensions'])).to.eql(['Gravity', 'Can', 'Cross', 'Dimensions']);
    chai.expect(AwesomeString.words({
      toString: function () {
        return 'Gr4v1ty';
      }
    })).to.eql(['Gr', '4', 'v', '1', 'ty']);
  });

  it('should split the string into words using a pattern', function () {
    chai.expect(AwesomeString.words('1234567890', /\d/g)).to.eql(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']);
    chai.expect(AwesomeString.words('gravity', /\w{1,2}/g)).to.eql(['gr', 'av', 'it', 'y']);
    chai.expect(AwesomeString.words('gravity can cross dimensions', '\\w+(?=\\s?)', 'g')).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    chai.expect(AwesomeString.words('1234567890', /\s/g)).to.eql([]);
  });

  it('should split the string with default pattern for null and undefined', function () {
    chai.expect(AwesomeString.words('gravity_can_cross_dimensions', null)).to.eql(['gravity', 'can', 'cross', 'dimensions']);
    chai.expect(AwesomeString.words('gravity_can_cross_dimensions', undefined)).to.eql(['gravity', 'can', 'cross', 'dimensions']);
  });
});

describe('stripTags', function () {

  it('should strip tags', function () {
    chai.expect(AwesomeString.stripTags('<b>Hello world!</b>')).to.be.equal('Hello world!');
    chai.expect(AwesomeString.stripTags('<b>Hello world!</b>')).to.be.equal('Hello world!');
    chai.expect(AwesomeString.stripTags('<span class="italic">Hello world!</span>')).to.be.equal('Hello world!');
    chai.expect(AwesomeString.stripTags('<span class="<italic>">Hello world!</span>')).to.be.equal('Hello world!');
    chai.expect(AwesomeString.stripTags('<span class="italic"><b>Hello world!</b></span>')).to.be.equal('Hello world!');
    chai.expect(AwesomeString.stripTags('<html>hello</html>')).to.be.equal('hello');
    chai.expect(AwesomeString.stripTags('<script language=\"PHP\"> echo hello </script>')).to.be.equal(' echo hello ');
    chai.expect(AwesomeString.stripTags('<html><b>hello</b><p>world</p></html>')).to.be.equal('helloworld');
  });

  it('should strip potential xss tags', function () {
    /**
     * @see https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
     */
    chai.expect(AwesomeString.stripTags('<script>evil();</script>')).to.be.equal('evil();');
    chai.expect(AwesomeString.stripTags('<SCRIPT SRC=http://xss.rocks/xss.js></SCRIPT>')).to.be.equal('');
    chai.expect(AwesomeString.stripTags('<IMG """><SCRIPT>alert("XSS")</SCRIPT>">')).to.be.equal('');
    chai.expect(AwesomeString.stripTags('<SCRIPT/XSS SRC="http://xss.rocks/xss.js"></SCRIPT>')).to.be.equal('');
    chai.expect(AwesomeString.stripTags('<BODY onload!#$%&()*~+-_.,:;?@[/|\]^`=alert("XSS")>')).to.be.equal('');
    chai.expect(AwesomeString.stripTags('<SCRIPT/SRC="http://xss.rocks/xss.js"></SCRIPT>')).to.be.equal('');
    chai.expect(AwesomeString.stripTags('<<SCRIPT>alert("XSS");//<</SCRIPT>')).to.be.equal('');
    chai.expect(AwesomeString.stripTags('<SCRIPT SRC=http://xss.rocks/xss.js?< B >')).to.be.equal('');
    chai.expect(AwesomeString.stripTags('<SCRIPT SRC=//xss.rocks/.j>')).to.be.equal('');
    chai.expect(AwesomeString.stripTags('<IMG SRC="javascript:alert(\'XSS\')"')).to.be.equal('');
    chai.expect(AwesomeString.stripTags('<SCRIPT a=">" SRC="httx://xss.rocks/xss.js"></SCRIPT>')).to.be.equal('');
    chai.expect(AwesomeString.stripTags('<SCRIPT =">" SRC="httx://xss.rocks/xss.js"></SCRIPT>')).to.be.equal('');
    chai.expect(AwesomeString.stripTags('<SCRIPT a=">" \'\' SRC="httx://xss.rocks/xss.js"></SCRIPT>')).to.be.equal('');
    chai.expect(AwesomeString.stripTags('<SCRIPT "a=\'>\'" SRC="httx://xss.rocks/xss.js"></SCRIPT>')).to.be.equal('');
    chai.expect(AwesomeString.stripTags('<SCRIPT a=`>` SRC="httx://xss.rocks/xss.js"></SCRIPT>')).to.be.equal('` SRC="httx://xss.rocks/xss.js">');
    chai.expect(AwesomeString.stripTags('<SCRIPT a=">\'>" SRC="httx://xss.rocks/xss.js"></SCRIPT>')).to.be.equal('');
    chai.expect(AwesomeString.stripTags('<SCRIPT>document.write("<SCRI");</SCRIPT>PT SRC="httx://xss.rocks/xss.js"></SCRIPT>')).to.be.equal('document.write("');
  });

  it('should strip tags which attributes contain < or > ', function () {
    var helloWorld = 'hello  world';
    chai.expect(AwesomeString.stripTags('hello <img title="<"> world')).to.be.equal(helloWorld);
    chai.expect(AwesomeString.stripTags('hello <img title=">"> world')).to.be.equal(helloWorld);
    chai.expect(AwesomeString.stripTags('hello <img title=">_<"> world')).to.be.equal(helloWorld);
    chai.expect(AwesomeString.stripTags("hello <img title='>_<'> world")).to.be.equal(helloWorld);
    chai.expect(AwesomeString.stripTags("hello <img title=\"foo 'bar'\"> world")).to.be.equal(helloWorld);
  });

  it('should strip tags on multiple lines', function () {
    var multilineHtml = '<html>This\'s a string with quotes:</html>\n"strings in double quote";\n\'strings in single quote\';\n<html>this\line is single quoted /with\slashes </html>';
    chai.expect(AwesomeString.stripTags(multilineHtml, '<html>')).to.be.equal(multilineHtml);
  });

  it('should strip comments and doctype', function () {
    chai.expect(AwesomeString.stripTags('<html><!-- COMMENT --></html>')).to.be.equal('');
    chai.expect(AwesomeString.stripTags('<b>Hello world!</b><!-- Just some information -->')).to.be.equal('Hello world!');
    chai.expect(AwesomeString.stripTags('<span class="italic">Hello world!<!-- Just some information --></span>')).to.be.equal('Hello world!');
    chai.expect(AwesomeString.stripTags('<!-- Small<>comment --><span class="italic"><!-- Just some information --><b>Hello world!</b></span>')).to.be.equal('Hello world!');
    chai.expect(AwesomeString.stripTags('<!doctype html><span class="italic"><!-- Just some information --><b>Hello world!</b></span>')).to.be.equal('Hello world!');
  });

  it('should not strip allowable tags', function () {
    chai.expect(AwesomeString.stripTags('<b>Hello world!</b>', ['b'])).to.be.equal('<b>Hello world!</b>');
    chai.expect(AwesomeString.stripTags('<b class="red">Hello world!</b>', ['b'])).to.be.equal('<b class="red">Hello world!</b>');
    chai.expect(AwesomeString.stripTags('<b class="red">Hello</b> <span>world!</span>', '<b><a>')).to.be.equal('<b class="red">Hello</b> world!');
    var helloWorldHtml = '<html><p>hello</p><b>world</b><a href="#fragment">Other text</a></html>';
    chai.expect(AwesomeString.stripTags(helloWorldHtml, '<html>')).to.be.equal('<html>helloworldOther text</html>');
    chai.expect(AwesomeString.stripTags(helloWorldHtml, ['p'])).to.be.equal('<p>hello</p>worldOther text');
    chai.expect(AwesomeString.stripTags(helloWorldHtml, '<a>')).to.be.equal('helloworld<a href="#fragment">Other text</a>');
    chai.expect(AwesomeString.stripTags(helloWorldHtml, ['html', 'p', 'a', 'b'])).to.be.equal(helloWorldHtml);
  });

  it('should not modify a string without tags', function () {
    chai.expect(AwesomeString.stripTags('Hello world!')).to.be.equal('Hello world!');
    chai.expect(AwesomeString.stripTags('  ')).to.be.equal('  ');
    chai.expect(AwesomeString.stripTags('')).to.be.equal('');
  });

  it('should add instead of stripped tags a special string', function () {
    chai.expect(AwesomeString.stripTags('<li><b><a href="#" title="Title">Recently improved articles</a></b></li>', '', '*')).to.be.equal('***Recently improved articles***');
    chai.expect(AwesomeString.stripTags('<b>Hello</b><i>World</i>', '<a>', ' ')).to.be.equal(' Hello  World ');
    chai.expect(AwesomeString.stripTags('Line<br/>break', ['i'], ' ')).to.be.equal('Line break');
  });

  it('should treat especially broken or invalid tags', function () {
    chai.expect(AwesomeString.stripTags('< html >')).to.be.equal('< html >');
    chai.expect(AwesomeString.stripTags('<<>>')).to.be.equal('');
    var allowableTags = '<p><a><html>';
    chai.expect(AwesomeString.stripTags('<<htmL>>hello<</htmL>>', allowableTags)).to.be.equal('<htmL>hello</htmL>');
    chai.expect(AwesomeString.stripTags('<a.>HtMl text</.a>', allowableTags)).to.be.equal('HtMl text');
    chai.expect(AwesomeString.stripTags('<nnn>I am a quoted (\") string with special chars like \$,\!,\@,\%,\&</nnn>', allowableTags)).to.be.equal('I am a quoted (\") string with special chars like \$,\!,\@,\%,\&');
    chai.expect(AwesomeString.stripTags('<abc>hello</abc> \t\tworld... <ppp>strip_tags_test</ppp>', allowableTags)).to.be.equal('hello \t\tworld... strip_tags_test');
  });

  it('should strip tags from a string representation of an object', function () {
    chai.expect(AwesomeString.stripTags('<a href="#">Hello</a>')).to.equal('Hello');
    chai.expect(AwesomeString.stripTags({
      toString: function () {
        return '<a href="#">Hello</a>';
      }
    }, '<a>')).to.equal('<a href="#">Hello</a>');
  });

  it('should return empty string for null or undefined', function () {
    chai.expect(AwesomeString.stripTags(null)).to.be.equal('');
    chai.expect(AwesomeString.stripTags(null, null)).to.be.equal('');
    chai.expect(AwesomeString.stripTags(undefined)).to.be.equal('');
    chai.expect(AwesomeString.stripTags(undefined, '<a>')).to.be.equal('');
    chai.expect(AwesomeString.stripTags(undefined, undefined)).to.be.equal('');
  });
});

describe('noConflict', function () {

  it('should return Awesome String library instance and restore as global variable', function () {
    var globalObject = getGlobalObject();
    globalObject.as = AwesomeString;
    var awesome = AwesomeString.noConflict();
    chai.expect(awesome).to.be.equal(AwesomeString);
    chai.expect(globalObject.as).to.be.equal(undefined);
  });

  it('should return Awesome String library instance and not modify as global variable', function () {
    var globalObject = getGlobalObject();
    var awesome = AwesomeString.noConflict();
    chai.expect(awesome).to.be.equal(AwesomeString);
    chai.expect(globalObject.as).to.be.equal(undefined);
  });
});

describe('version', function () {

  it('should match semantic version number pattern', function () {
    chai.expect(REGEXP_SEMVER.test(AwesomeString.version)).to.be.true;
  });
});

//case
//chain
//chop
//count
//escape
//helper
//format
//index
//manipulate
//query
//split
//strip
//util

}(chai));
