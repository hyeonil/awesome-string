
export default function functionBind(oThis) {
  if (typeof this !== 'function') {
    // closest thing possible to the ECMAScript 5
    // internal IsCallable function
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
  }

  const aArgs   = Array.prototype.slice.call(arguments, 1);
  const fToBind = this;
  const fNOP    = function() {};
  const fBound  = function() {
    return fToBind.apply(this instanceof fNOP && oThis
          ? this
          : oThis,
        aArgs.concat(Array.prototype.slice.call(arguments)));
  };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();

  return fBound;
}