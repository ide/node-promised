module.exports = function promised(fn) {
  var promiseFactory = function() {
    var context = this;
    var args = Array.prototype.slice.call(arguments);
    return new Promise(function(resolve, reject) {
      args.push(function settle(err, result) {
        if (err != null) {
          reject(err);
        } else {
          resolve(result);
        }
      });
      fn.apply(context, args);
    });
  };

  var name = fn.displayName || fn.name || 'function';
  var capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  promiseFactory.displayName = 'promise' + capitalizedName;
  return promiseFactory;
};
