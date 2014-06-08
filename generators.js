var ch = require('chance');

/* get an integer s <= val <= e  - note inclusive */
exports.integer = function (s, e) { return ch.integer({min: s, max: e}); };
exports.index = exports.integer;