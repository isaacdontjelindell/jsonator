var ch = require('chance').Chance();

// instance vars
index = 0;

exports.index = function () { return index++; };
exports.guid = function () { return ch.guid(); };
exports.bool = function () { return ch.bool(); };
exports.floating = function () { /* TODO */ };

/* get an integer s <= val <= e  - note inclusive */
exports.integer = function (s, e) { return ch.integer({min: s, max: e}); };

exports.random = function(options) { /* TODO */ };
exports.firstName = function () { return ch.first(); };
exports.lastName = function () { return ch.last(); };
exports.gender = function () { /* TODO */ };
exports.company = function () { /* TODO */ };
exports.email = function () { /* TODO */ };
exports.phone = function () { /* TODO */ };
exports.street = function () { /* TODO */ };
exports.city = function () { /* TODO */ };
exports.state = function () { /* TODO */ };

// TODO date

exports.floating = function () { /* TODO */ };

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

