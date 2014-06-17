var inputEd, outputEd

var initialData = [
    {
        id: '{{index()}}',
        guid: '{{guid()}}',
        bool: '{{bool()}}',
        floating: '{{floating(-25.2, 25.0)}}',
        constant: 'http://www.google.com',
        integer: '{{integer()}}',
        rangedInteger: '{{integer(2, 10)}}',
        words: '{{lorem(3, "words")}}',
        sentence: '{{lorem(1, "sentence")}}',
        paragraph: '{{lorem(2, "paragraphs")}}',
        fullName: '{{firstName()}} X. {{lastName()}}',
        tags: [
            '{{lorem(1, "word")}}',
            '{{lorem(1, "word")}}',
            '{{lorem(1, "word")}}'
        ],
        people: [
            {
                firstName: '{{firstName()}}',
                lastName: '{{lastName()}}',
                age: '{{integer(2, 99)}}'
            },
            {
                firstName: '{{firstName()}}',
                lastName: '{{lastName()}}',
                age: '{{integer(2, 99)}}'
            }
        ]

    }
]

$(initCodeMirrors)

function initCodeMirrors () {
    inputEd = CodeMirror.fromTextArea(document.getElementById("jsonator-input"), {
        mode: "text/javascript",
        lineNumbers: true,
        theme: "monokai-dark-soda",
        lineWrapping: true,
        tabSize: 2
    })
    //inputEd.setValue(initialDataString)
    var initialJson = JSON.stringify(initialData, null, 2);
    initialJson = initialJson.replace(/\"([^(\")"]+)\":/g,"$1:");
    inputEd.setValue(initialJson);

    outputEd = CodeMirror.fromTextArea(document.getElementById("jsonator-output"), {
        mode: "application/json",
        lineNumbers: true,
        lineWrapping: true,
        theme: "monokai-dark-soda"
    });
}

function hideEndpointUrl () {
    $('#endpoint-url').slideUp();
}

function send () {
    var data = eval(inputEd.getValue());

    var url = "http://localhost/api/";
    if (document.URL.indexOf("herokuapp.com") != -1) {
        url = "http://jsonator.herokuapp.com/api/";
    }

    $.post(url, {schema: JSON.stringify(data)}, function (res) {
        $.get(url + res.id, null, function (results) {
            var output = JSON.stringify(JSON.parse(results), null, 2)
            outputEd.setValue(output)

            $('#endpoint-url').find('a.url').text(url + res.id).attr('href', url + res.id);
            $('#endpoint-url').slideDown();
        })
    })
}