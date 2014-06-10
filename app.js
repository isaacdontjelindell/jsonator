var http = require('http');
var qs = require('querystring');
var p = require('./parse/parse');

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


var server = http.createServer(function (req, res) {
    if (req.method == 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;

            // Too much POST data, kill it :)
            if (body.length > 1e6)
                req.connection.destroy();
        });
        req.on('end', function () {
            var post = qs.parse(body);
            var schema = JSON.parse(post['schema']);

            res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "http://localhost:8000"});
            res.end(JSON.stringify(p.generate(schema)));
        })
    }
});

server.listen(8080, 'localhost');
console.log('Listening...');
