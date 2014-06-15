var p = require('./parse/parse');

var redis = require('redis');
    client = redis.createClient();

var express = require('express');
    app = express();
    cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);

var id = 0; // TODO actually use a real id generation mechanism

app.post('/', function (req, res, next) {
    var schema = req.body.schema;
    client.set(id, schema);
    res.send({id: id});
    id++
});

app.get('/:id', function (req, res) {
    client.get(parseInt(req.params.id), function (err, reply) {
        if (err != null) { console.log(err);}
        var schemaObj = JSON.parse(reply);

        res.send(JSON.stringify(p.generate(schemaObj)))
    })
});

app.listen(8080, function() {
    console.log('listening...');
});

