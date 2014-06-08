var ch = require('chance').Chance();

// instance vars
index = 0;


/* get an integer s <= val <= e  - note inclusive */
exports.integer = function (s, e) { return ch.integer({min: s, max: e}); };


exports.index = function () { return index++; };

exports.bool = function () { return ch.bool(); };

exports.guid = function () { return ch.guid(); };

exports.lorem = function (c, type) {
    var ret = '';
    switch (type) {
        case 'words':
            for (var i = 0; i < c-1; i++)
                ret = ret + ch.word() + ' ';
            ret = ret + ch.word();
            break;
        case 'sentences':
            break;
        case 'paragraphs':
            break;
    }
    return ret;
};

