/* eslint-disable */

// All of these polyfills are taken from MDN

/**
 * Array findIndex polyfill
 */
if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.findIndex called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return i;
      }
    }
    return -1;
  };
}

// Uint8ClampedArray slice polyfill
// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.slice
if (!Uint8ClampedArray.prototype.slice) {
  Object.defineProperty(Uint8ClampedArray.prototype, 'slice', {
    value: Array.prototype.slice
  });
}
