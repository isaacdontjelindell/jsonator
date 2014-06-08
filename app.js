var data =
    [
        {
            id: '{{index()}}',
            something: '{{integer()}}'
        }
    ];

function main () {
    parseList(data)
}


function parseList(l) {
    l.forEach(function (object, _) {
        Object.keys(object).forEach(function (key, _) {
            var obj = object[key];
            // TODO get type of object
            var type = 'string';

            switch (type) {
                case 'string':
                    parseString(obj);
                    break;
                case 'list':
                    parseList(obj);
                    break;
            }
        })
    })
}

function parseString(s) {
    if (s.indexOf('{{') != -1) {
        var code = s.substring(2, s.length-2);
        console.log(code)
    }
}


main();

