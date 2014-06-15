var g = require('../generators.js');

exports.generate = function (schema) {
    return parseArr(schema);
};

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
    var values = [];
    var val; // temp variable

    var stack = [];
    var isFunc = false;

    if (s.indexOf('{{') != -1) {
        var i = 0;
        while (i < s.length) {
            if ((s[i] == '}') && (s[i+1] == '}')) {
                isFunc = false;
                val = '';
                var top = stack.pop();
                while (top != '{') {
                    val = top + val;
                    top = stack.pop();
                }
                stack.pop(); // remove final '{';
                values.push(eval('g.'+ val));
                i +=2 ;
            }

                stack.push(s[i]);
                i++;

            if ((s[i] == '{') && (s[i+1] == '{')) {
                if (stack.length > 0) {
                    val = stack.join('');
                    values.push(val);
                    stack = [];
                }
                isFunc = true;
                stack.push(s[i]);
                stack.push(s[i+1]);
                i += 2;
            }
        }
        return values.join('');
    } else {
        return s;
    }
}


