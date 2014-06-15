var p = require('./parse/parse');

var redis = require('redis');
    client = redis.createClient();

var express = require('express');
    app = express();
    cors = require('cors');

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


app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);

var id = 0;

app.post('/', function (req, res, next) {
    var schema = req.body.schema;
//    console.log(schema);

    client.set(id, schema);

    res.send({id: id});
    id++
});

app.get('/:id', function (req, res) {
    console.log(typeof parseInt(req.params.id));
    client.get(parseInt(req.params.id), function (err, reply) {
        if (err != null) { console.log(err);}
        var schemaObj = JSON.parse(reply);

        res.send(JSON.stringify(p.generate(schemaObj)))
    })
});


app.listen(8080, function() {
    console.log('listening...');
});



/*var id = 0;

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

            client.set(id, post['schema']);

            res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "http://localhost:8000"});
            res.end(JSON.stringify({'id': id}));

            id++;
            //res.end(JSON.stringify(p.generate(schema)));
        })
    }

    if (req.method == 'GET') {

        var body = '';
        req.on('end', function () {
            console.log(req.url);
            var data = qs.parse(body);
            console.log(data);
            client.get(data.id, function (err, reply) {
                if (err != null) {
                    console.log(err);
                }
                var schemaObj = JSON.parse(reply);
                res.writeHead(200, {'Content-Type' : 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:8000'});
                //res.end(JSON.stringify(p.generate(schemaObj)));
                res.end();
            });
        });
    }
});*/
/*
server.listen(8080, 'localhost');
console.log('Listening...');*/
