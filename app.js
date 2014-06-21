var p = require('./parse/parse')

var redis = require('redis')
    if (process.env.REDISTOGO_URL) {
        var rtg   = require("url").parse(process.env.REDISTOGO_URL);
        var client = redis.createClient(rtg.port, rtg.hostname);
        client.auth(rtg.auth.split(":")[1]);
    } else {
        var client = redis.createClient();
    }

var express = require('express')
    app = express()

var uuid = require('uuid')
    cors = require('cors')
    bodyParser = require('body-parser')
    path = require('path')


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(express.static(path.join(__dirname, 'public')))


app.post('/set', function (req, res, next) {
    var schema = req.body.schema
    var id = uuid.v4()
    client.set(id, schema)
    res.send({id: id})
});

app.get('/see/:id', function (req, res) {
    if (req.params.id.indexOf('favicon.ico') != -1) {}
    else {
        client.get(req.params.id, function (err, reply) {
            if (err != null) {
                console.log(err)
                res.send(500, JSON.stringify({error: 'Unknown error'}))
            }
            else if (reply == null) {
                res.send(404, JSON.stringify({error: 'Unknown ID'}))
            }
            else {
                res.send(200, reply)
            }
        })
    }
})

app.get('/get/:id', function (req, res) {
    if (req.params.id.indexOf('favicon.ico') != -1) { /* ignore requests for a favicon */ }
    else {
        client.get(req.params.id, function (err, reply) {
            if (err != null) {
                console.log(err)
                res.send(500, JSON.stringify({error: 'Unknown error'}));
            }
            else if (reply == null) {
                res.send(404, JSON.stringify({error: 'Unknown ID'}))
            }
            else {
                var schemaObj = JSON.parse(reply)
                var returnVal = p.generate(schemaObj)
                res.send(200, JSON.stringify(returnVal))
            }
        })
    }
});

if (!process.env.PORT) process.env.PORT = 80;
app.listen(process.env.PORT || 80, function() {
    console.log('listening...')
})

