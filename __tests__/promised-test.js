jest.dontMock('../promised');
jest.dontMock('es6-promise');

describe('promised', function() {
  var promised;

  beforeEach(function() {
    require('es6-promise').polyfill();
    promised = require('../promised');
  });

  it('returns a function that returns a promise', function() {
    var promiseAsyncFunction = promised(function asyncFunction(callback) {
      callback(null, 'result');
    });

    expect(typeof promiseAsyncFunction).toBe('function');
    var promise = promiseAsyncFunction();
    expect(promise instanceof Promise).toBe(true);
  });

  it('fulfills the promise on success', function() {
    var promiseSuccess = promised(function(callback) {
      callback(null, 'success');
    });
    var promise = promiseSuccess();

    var onFulfilled = jest.genMockFunction();
    var onRejected = jest.genMockFunction();
    promise.then(onFulfilled, onRejected);
    jest.runAllTicks();

    expect(onFulfilled).toBeCalledWith('success');
    expect(onRejected).not.toBeCalled();
  });

  it('rejects the promise on failure', function() {
    var error = new Error('failure');
    var promiseError = promised(function(callback) {
      callback(error);
    });
    var promise = promiseError();

    var onFulfilled = jest.genMockFunction();
    var onRejected = jest.genMockFunction();
    promise.then(onFulfilled, onRejected);
    jest.runAllTicks();

    expect(onFulfilled).not.toBeCalled();
    expect(onRejected).toBeCalledWith(error);
  });

  it('rejects the promise when the function throws', function() {
    var error = new Error('failure');
    var promiseError = promised(function(callback) {
      throw error;
    });
    var promise = promiseError();

    var onFulfilled = jest.genMockFunction();
    var onRejected = jest.genMockFunction();
    promise.then(onFulfilled, onRejected);
    jest.runAllTicks();

    expect(onFulfilled).not.toBeCalled();
    expect(onRejected).toBeCalledWith(error);
  });
});
