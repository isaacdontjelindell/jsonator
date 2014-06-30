jsonator
========

Web service for creating random JSON data


#### What is JSONator?

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
