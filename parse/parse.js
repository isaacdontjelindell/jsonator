var g = require('./generators.js')

var par = require('./parse-js.js');

exports.generate = function (schema) {
    return parseArr(schema)
}

function parseArr(l) {
    var retArr = []
    l.forEach(function (arrItem, i) {

        var type = 'object';
        if (Array.isArray(arrItem))
            type = 'array'
        if (typeof arrItem == 'string')
            type = 'string'

        switch (type) {
            case 'string':
                retArr[i] = parseString(arrItem)
                break
            case 'array':
                retArr[i] = parseArr(arrItem)
                break
            case 'object':
                retArr[i] = parseObj(arrItem)
        }

    });
    return retArr
}

function parseObj(o) {
    var retObj = {};
    Object.keys(o).forEach(function (key, _) {
        var item = o[key];

        var type = 'string'
        if (Array.isArray(item))
            type = 'array'

        switch (type) {
            case 'string':
                retObj[key] = parseString(item)
                break
            case 'array':
                retObj[key] = parseArr(item)
        }
    })
    return retObj;
}

function parseString(s) {
    var values = []

    var val // temp variable

    var stack = []
    var isFunc = false

    if (s.indexOf('{{') != -1) {
        var i = 0
        while (i < s.length) {
            if ((s[i] == '}') && (s[i+1] == '}')) {
                isFunc = false
                val = ''
                var top = stack.pop()
                while (top != '{') {
                    val = top + val
                    top = stack.pop()
                }
                stack.pop() // remove final '{';
                i +=2
                var res = self_eval(val)
                values.push(res)
                //values.push(eval('g.'+ val))
            }

                stack.push(s[i])
                i++

            if ((s[i] == '{') && (s[i+1] == '{')) {
                if (stack.length > 0) {
                    val = stack.join('')
                    values.push(val)
                    stack = []
                }
                isFunc = true
                stack.push(s[i])
                stack.push(s[i+1])
                i += 2
            }
        }
        return values.join('')
    } else {
        return s
    }
}

function self_eval (code) {
    var ast = par.parse(code)
    var top = ast[1]

    return parseFunc(top[0][1]);

    function parseFunc(call) {
        var funcName = call[1][1]
        var args = call[2]

        var reducedArgs = [];

        args.forEach(function (arg) {
            var type = arg[0];

            switch (type) {
                case "call":
                    var val = parseFunc(arg)
                    reducedArgs.push(val)
                    break;
                default:
                    // TODO handle unary ops (-Num)
                    reducedArgs.push(arg[1])
            }
        })

        if (g[funcName])
            return g[funcName].apply(undefined, reducedArgs);
    }
}


