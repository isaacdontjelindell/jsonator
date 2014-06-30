JSONator
========

Web service for creating random JSON data


### What is JSONator?

The intent is to provide a service that allows developers to quickly mock up a JSON data source.

The developer can create a "schema" that describes the structure of the desired endpoint, and JSON will provide an
endpoint that, when requested by an HTTP GET request, returns random data in the desired structure.

For example, if the schema looks like this:

```
[
  {
    id: "{{guid()}}",
    name: "{{firstName()}} X. {{lastName()}})
  }
]
```

then the data returned by the endpoint looks like this:

```
[
  {
    "id": "3f51369b-e3ee-5b9c-a271-0f4fd9fca14f",
    "name": "Augusta X. Christensen"
  }
]
```

### Usage

The schema is described in JavaScript object notation. Any string is valid as a value. Substitution functions are wrapped between two curly braces (e.g. `{{firstName()}}`). Some substitution functions can take parameters. For example, `{{index(2, 10)}}` will return an integer between 2 and 10 inclusive.

The complete list of substitution functions can be found below.


### Substitution functions

* `guid()` -- returns a GUID 
* `bool()` -- returns a boolean value
* `integer([min, max])` -- returns a random integer. If min and max are specified, the integer will be between min and max (inclusive). If min and max are not specified, the integer will be bounded by Javascript's integer size.
* `floating([min, max])` -- returns a random floating-point number. If min and max are specified, the number will be between min and max (inclusive). If min and max are not specified, the integer will be bounded by Javascript's floating point size.
* `lorem(num, type)` -- returns random text. `num` must be an integer specifying how many units of the given type should be generated. `type` must be one of ["words", "sentences", or "paragraphs"] ("word", "sentence", and "paragraph" are also legal). Example: `lorem(3, "sentences")` will return 3 sentences.


Combining substitution functions is also legal. For example, `{{firstName()}} X. {{lastName()}}` will return something like `Augusta X. Christensen`. Since the ` X. ` is not a substitution function, it is treated as a constant and always included in the returned data.
