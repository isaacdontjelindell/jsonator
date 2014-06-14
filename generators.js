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
        case 'word':
        case 'words':
            for (var i = 0; i < c-1; i++)
                ret += ch.word() + ' ';
            ret += ch.word();
            break;
        case 'sentence':
        case 'sentences':
            ret = ch.paragraph({sentences: c});
            break;
        case 'paragraph':
        case 'paragraphs':
            for (var i = 0; i < c-1; i++)
                ret += ch.paragraph() + "\n";
            ret += ch.paragraph();
            break;
    }
    return ret;
};

exports.firstName = function () { return ch.first(); };
exports.lastName = function () { return ch.last(); };
