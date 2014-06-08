var ch = require('chance').Chance();

// instance vars
index = 0;


/* get an integer s <= val <= e  - note inclusive */
exports.integer = function (s, e) { return ch.integer({min: s, max: e}); };


exports.index = function () { return index++; };

exports.bool = function () { return ch.bool(); };

exports.guid = function () { return ch.guid(); };


