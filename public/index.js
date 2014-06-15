var inputEd, outputEd;
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
        url: 'http://www.google.com'\n\
    }\n\
];\n\
";

$(initCodeMirrors);

function initCodeMirrors() {
    inputEd = CodeMirror.fromTextArea(document.getElementById("jsonator-input"), {
        mode: "text/javascript",
        lineNumbers: true,
        theme: "solarized dark",
    });
    inputEd.setValue(initialDataString);


    outputEd = CodeMirror.fromTextArea(document.getElementById("jsonator-output"), {
        mode: "application/json",
        lineNumbers: true,
        theme: "solarized dark"
    });
}

function send () {
    var data = eval(inputEd.getValue());
    $.post('http://localhost:8080', {schema: JSON.stringify(data)}, function (res) {
        var output = JSON.stringify(res, null, 2);
        outputEd.setValue(output);
    })
}