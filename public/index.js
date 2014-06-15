var inputEd, outputEd
var initialDataString = "\
[\n\
  {\n\
    id: '{{index()}}',\n\
    id2: '{{index()}}',\n\
    something: '{{integer(-20, 20)}}',\n\
    guid: '{{guid()}}',\n\
    bool: '{{bool()}}',\n\
    words: '{{lorem(3, \"words\")}}',\n\
    sentence: '{{lorem(1, \"sentence\")}}',\n\
    paragraph: '{{lorem(2, \"paragraphs\")}}',\n\
    firstName: '{{firstName()}} X. {{lastName()}}',\n\
    url: 'http://www.google.com',\n\
    tags: [\n\
      '{{lorem(1, \"word\")}}',\n\
      '{{lorem(1, \"word\")}}',\n\
      '{{lorem(1, \"word\")}}'\n\
    ],\n\
    people: [\n\
      {\n\
        name: '{{firstName()}}',\n\
        last: '{{lastName()}}'\n\
      },\n\
      {\n\
        name: '{{firstName()}}',\n\
        last: '{{lastName()}}'\n\
      }\n\
    ]\n\
  }\n\
]\n\
"

$(initCodeMirrors)

function initCodeMirrors () {
    inputEd = CodeMirror.fromTextArea(document.getElementById("jsonator-input"), {
        mode: "text/javascript",
        lineNumbers: true,
        theme: "monokai-dark-soda",
        lineWrapping: true,
        tabSize: 2
    })
    inputEd.setValue(initialDataString)


    outputEd = CodeMirror.fromTextArea(document.getElementById("jsonator-output"), {
        mode: "application/json",
        lineNumbers: true,
        lineWrapping: true,
        theme: "monokai-dark-soda"
    });
}

function hideEndpointUrl () {
    $('#endpoint-url').hide();
}

function send () {
    var data = eval(inputEd.getValue());
    $.post('http://localhost:8080', {schema: JSON.stringify(data)}, function (res) {
        $.get('http://localhost:8080/' + res.id, null, function (results) {
            var output = JSON.stringify(JSON.parse(results), null, 2)
            outputEd.setValue(output)

            $('#endpoint-url').find('a.url').text('http://localhost:8080/' + res.id).attr('href', 'http://localhost:8080/' + res.id);
            $('#endpoint-url').slideDown();
        })
    })
}