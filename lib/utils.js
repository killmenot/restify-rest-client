'use strict';

exports.callbackPromise = (resolve, reject) => {
  return function f(err) {
    const args = Array.prototype.slice.call(arguments, f.length);

    if (err) {
      reject(err);
    } else {
      resolve.apply(null, args);
    }
  };
};
