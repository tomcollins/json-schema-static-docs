---
title: Person
description: JSON schema example for a person entity

---


# Person

<p>JSON schema example for a person entity</p>

<table>
<tbody>
<tr><th>$id</th><td>examples-with-meta.yml</td></tr>
<tr><th>$schema</th><td>http://json-schema.org/draft-07/schema#</td></tr>
</tbody>
</table>

## Properties

<table class="jssd-properties-table"><thead><tr><th colspan="2">Name</th><th>Type</th></tr></thead><tbody><tr><td colspan="2"><a href="#name">name</a></td><td>String</td></tr></tbody></table>


## Example
### Title for the example
<p>Description for the example</p>

```
{
    "name": "Rhys"
}
```


## Example
### Title for the second example


```
{
    "name": "Sarah"
}
```


## Example



```
{
    "name": "Charlie"
}
```



<hr />


## name


<table class="jssd-property-table">
  <tbody>
    <tr>
      <th>Title</th>
      <td colspan="2">Name</td>
    </tr>
    <tr>
      <th>Description</th>
      <td colspan="2">The name of a person</td>
    </tr>
    <tr><th>Type</th><td colspan="2">String</td></tr>
    <tr>
      <th>Required</th>
      <td colspan="2">Yes</td>
    </tr>
    <tr>
      <th>Examples</th>
      <td colspan="2"><li>David</li></td>
    </tr>
  </tbody>
</table>









<hr />

## Schema
```
{
    "$id": "examples-with-meta.yml",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Person",
    "description": "JSON schema example for a person entity",
    "type": "object",
    "examples": [
        {
            "meta:title": "Title for the example",
            "meta:description": "Description for the example",
            "name": "Rhys"
        },
        {
            "meta:title": "Title for the second example",
            "name": "Sarah"
        },
        {
            "name": "Charlie"
        }
    ],
    "properties": {
        "name": {
            "title": "Name",
            "description": "The name of a person",
            "type": "string",
            "examples": [
                "David"
            ]
        }
    },
    "additionalProperties": false,
    "required": [
        "name"
    ]
}
```


