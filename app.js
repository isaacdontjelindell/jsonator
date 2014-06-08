var g = require('./generators.js');

var data =
    [
        {
            id: '{{index()}}',
            id2: '{{index()}}',
            something: '{{integer(-20, 20)}}',
            guid: '{{guid()}}',
            bool: '{{bool()}}',
            words: '{{lorem(3, "words")}}',
            sentence: '{{lorem(1, "sentence")}}',
            paragraph: '{{lorem(2, "paragraphs")}}'
        }
    ];

function main () {
    var ret = parseArr(data);
    console.log(ret);
}


function parseArr(l) {
    var retArr = [];
    l.forEach(function (arrItem, _) {

        var retItem = {};
        Object.keys(arrItem).forEach(function (key, _) {

            var val = arrItem[key];
            // TODO get type of val
            var type = 'string';

            switch (type) {
                case 'string':
                    retItem[key] = parseString(val);
                    break;
                case 'list':
                    retItem[key] = parseArr(val);
                    break;
            }

        });
        retArr.push(retItem);
    });
    return retArr;
}

function parseString(s) {
    if (s.indexOf('{{') != -1) {
        var code = s.substring(2, s.length-2);
        return eval('g.' + code);
    } else {
        return s;
    }
}


main();

