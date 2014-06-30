var inputEd, outputEd

var initialData = [
    {
        id: "{{guid()}}",
        isActive: "{{bool()}}",
        temperature: "{{floating(-50, 100)}} deg. C",
        url: "http://www.google.com",
        age: "{{integer(1, 120)}}",
        favoriteColor: "{{pick(['red', 'green', 'blue'])}}",
        first: "{{firstName()}}",
        last: "{{lastName()}}",
        gender: "{{gender()}}",
        email: "{{email()}}",
        phones: {
            home: "{{phone()}}",
            work: "{{phone()}}",
            cell: "{{phone()}}"
        },
        address: "{{address()}}",
        personalStatement: "{{lorem(2, 'paragraphs')}}",
        tagline: "{{lorem(1, 'sentence')",
        tags: [
            "{{lorem(1, 'word')}}",
            "{{lorem(1, 'word')}}",
            "{{lorem(1, 'word')}}"
        ],
        friends: [
            {
                firstName: "{{firstName()}}",
                lastName: "{{lastName()}}",
                age: "{{integer(2, 99)}}"
            },
            {
                firstName: "{{firstName()}}",
                lastName: "{{lastName()}}",
                age: "{{integer(2, 99)}}"
            }
        ]

    }
]

var url = "http://localhost"
if (document.URL.indexOf("herokuapp.com") != -1)
    url = "http://jsonator.herokuapp.com"
if (document.URL.indexOf("dev.isaacdontjelindell.com:8080") != -1)
    url = "http://dev.isaacdontjelindell.com:8080"

var initialJson = JSON.stringify(initialData, null, 2);
initialJson = initialJson.replace(/\"([^(\")"]+)\":/g,"$1:"); // remove quotes from keys - looks nicer

var endpointCreated = false


$(initCodeMirrors)
$(initZeroClipboard)

function initCodeMirrors () {
    inputEd = CodeMirror.fromTextArea(document.getElementById("jsonator-input"), {
        mode: "text/javascript",
        lineNumbers: true,
        theme: "monokai-dark-soda",
        lineWrapping: true,
        tabSize: 2
    })
    inputEd.setValue(initialJson);

    outputEd = CodeMirror.fromTextArea(document.getElementById("jsonator-output"), {
        mode: "application/json",
        lineNumbers: true,
        lineWrapping: true,
        theme: "monokai-dark-soda"
    });
}

function initZeroClipboard() {
    var client = new ZeroClipboard($(".copy-clipboard"))
    client.on('ready', function (event) {
        client.on('copy', function (event) {
            event.clipboardData.setData('text/plain', $('.url').attr('href'))
        })

        client.on('aftercopy', function (event) {
            $(".copy-status-text").css('display', 'inline-block')
        })
    })
}

function showEndpointUrl () {
    $('#endpoint-url').slideDown()
}

function hideEndpointUrl () {
    $('.column.right .show').css('display', '')
    $('#endpoint-url').slideUp()
}

function send () {
    $('.copy-status-text').css('display', 'none');

    var currJson = inputEd.getValue();
    if (currJson !== initialJson)
        endpointCreated = false

    if (endpointCreated) {
        var id = $('body').data('endpoint-id')
        getData(id)
    }
    else {
        createEndpoint(currJson)
    }
}

function createEndpoint (json) {
    try {
        var data = eval(json)
    }
    catch (err) {
        outputEd.setValue('Error parsing schema: ' + err.message)
        return
    }

    $.post(url + "/set", {schema: JSON.stringify(data)}, function (res) {
        $.get(url + "/get/" + res.id, null, function (results) {
            var output = JSON.stringify(JSON.parse(results), null, 2)
            outputEd.setValue(output)

            $('body').data('endpoint-id', res.id)
            endpointCreated = true
            initialJson = json

            $('#endpoint-url').find('a.url').text(url + '/get/' + res.id).attr('href', url + "/get/" + res.id)
            showEndpointUrl()
        })
    })
}

function getData (id) {
    $.get(url + '/get/' + id, null, function (results) {
        var output = JSON.stringify(JSON.parse(results), null, 2)
        outputEd.setValue(output)

        $('#endpoint-url').find('a.url').text(url + "/get/" + id).attr('href', url + "/get/" + id)
    })
}
