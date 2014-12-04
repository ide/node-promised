`node-promised` is a small library to convert APIs with Node-style callbacks into promises. It is similar to "promisify" libraries except that it uses the built-in `Promise` implementation included with ES6.

# Usage
```js
// Define the Promise constructor if you are not using ES6
require('es6-promise').polyfill();

var fs = require('fs');
var promised = require('node-promised');

var promiseReadFile = promised(fs.readFile);
promiseReadFile('example.txt', 'utf8').then(function(contents) {
  console.log('File contents:', contents);
}, function(error) {
  console.error(error);
});
```

# Tests

Run `npm test` to run the unit tests, which are written with [jest](https://facebook.github.io/jest/).
