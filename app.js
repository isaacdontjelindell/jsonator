var p = require('./parse/parse')

var redis = require('redis')
    client = redis.createClient()

var express = require('express')
    app = express()

var uuid = require('uuid')
    cors = require('cors')
    bodyParser = require('body-parser')


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())


app.post('/', function (req, res, next) {
    var schema = req.body.schema
    var id = uuid.v4()
    client.set(id, schema)
    res.send({id: id})
});

app.get('/:id', function (req, res) {
    client.get(req.params.id, function (err, reply) {
        if (err != null) { console.log(err) }

        var schemaObj = JSON.parse(reply)
        var returnVal = p.generate(schemaObj)
        res.send(JSON.stringify(returnval))
    })
});

app.listen(8080, function() {
    console.log('listening...')
})

