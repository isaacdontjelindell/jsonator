var ch = require('chance').Chance()


exports.index = function () { return index++ }
exports.guid = function () { return ch.guid().toLowerCase() }
exports.bool = function () { return ch.bool() }

/* get a float s <= val <= e  - not inclusive */
exports.floating = function (s, e) { return ch.floating({min: s, max: e}) }

/* get an integer s <= val <= e  - note inclusive */
exports.integer = function (s, e) { return ch.integer({min: s, max: e}) }
exports.random = function(options) {
    return ch.pick(options)
}
exports.firstName = function () { return ch.first() }
exports.lastName = function () { return ch.last() }
exports.gender = function () { return ch.gender() }
exports.company = function () { return ch.capitalize(ch.word({syllables: 3})) }
exports.email = function () { return ch.email() }
exports.phone = function () { return ch.phone() }
exports.street = function () { return ch.street() }
exports.city = function () { return ch.city() }
exports.state = function () { return ch.state({full: true}) }
exports.date = function () { return "NOT YET IMPLEMENTED" }

exports.lorem = function (c, type) {
    var ret = ''
    switch (type) {
        case 'word':
        case 'words':
            for (var i = 0; i < c-1; i++)
                ret += ch.word() + ' '
            ret += ch.word()
            break
        case 'sentence':
        case 'sentences':
            ret = ch.paragraph({sentences: c})
            break
        case 'paragraph':
        case 'paragraphs':
            for (var i = 0; i < c-1; i++)
                ret += ch.paragraph() + "\n"
            ret += ch.paragraph()
            break
    }
    return ret
};

