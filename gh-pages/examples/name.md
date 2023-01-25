---
title: Name
description: JSON schema example for a name entity

---
# Name

<p>JSON schema example for a name entity</p>

<table>
<tbody>
<tr><th>$id</th><td>name.yml</td></tr>
<tr><th>$schema</th><td>http://json-schema.org/draft-07/schema#</td></tr>
</tbody>
</table>

## Properties

<table><thead><tr><th colspan="2">Name</th><th>Type</th></tr></thead><tbody><tr><td colspan="2"><a href="#title">title</a></td><td>String</td></tr><tr><td colspan="2"><a href="#firstname">firstName</a></td><td>String</td></tr><tr><td colspan="2"><a href="#lastname">lastName</a></td><td>String</td></tr></tbody></table>


## Example
```
{
    "title": "Mr",
    "firstName": "Seymour",
    "lastName": "Butts"
}
```

<hr />



## title



<p>The title of a name entity</p>

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th colspan="2">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Title</td>
      <td colspan="2">Title</td>
    </tr>
    <tr>
      <td>Required</td>
      <td colspan="2">Yes</td>
    </tr>
    <tr><td>Type</td><td colspan="2">String</td></tr>
    <tr>
      <td>Enum</td>
      <td colspan="2"><ul><li>Mr</li><li>Mrs</li><li>Miss</li></ul></td>
    </tr>
  </tbody>
</table>






## firstName



<p>The first name of a name entity</p>

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th colspan="2">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Title</td>
      <td colspan="2">First Name</td>
    </tr>
    <tr>
      <td>Required</td>
      <td colspan="2">Yes</td>
    </tr>
    <tr><td>Type</td><td colspan="2">String</td></tr>
    <tr>
      <td>Min Length</td>
      <td colspan="2">3</td>
    </tr><tr>
      <td>Max Length</td>
      <td colspan="2">100</td>
    </tr>
  </tbody>
</table>






## lastName



<p>The last name of a name entity</p>

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th colspan="2">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Title</td>
      <td colspan="2">Last Name</td>
    </tr>
    <tr>
      <td>Required</td>
      <td colspan="2">Yes</td>
    </tr>
    <tr><td>Type</td><td colspan="2">String</td></tr>
    <tr>
      <td>Min Length</td>
      <td colspan="2">3</td>
    </tr><tr>
      <td>Max Length</td>
      <td colspan="2">100</td>
    </tr>
  </tbody>
</table>









## Schema
```
{
    "$id": "name.yml",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Name",
    "description": "JSON schema example for a name entity",
    "type": "object",
    "examples": [
        {
            "title": "Mr",
            "firstName": "Seymour",
            "lastName": "Butts"
        }
    ],
    "properties": {
        "title": {
            "title": "Title",
            "description": "The title of a name entity",
            "type": "string",
            "enum": [
                "Mr",
                "Mrs",
                "Miss"
            ],
            "isRequired": true
        },
        "firstName": {
            "title": "First Name",
            "description": "The first name of a name entity",
            "type": "string",
            "minLength": 3,
            "maxLength": 100,
            "examples": [
                "Tom",
                "Dick",
                "Harry"
            ],
            "isRequired": true
        },
        "lastName": {
            "title": "Last Name",
            "description": "The last name of a name entity",
            "type": "string",
            "minLength": 3,
            "maxLength": 100,
            "examples": [
                "Smith",
                "Jones"
            ],
            "isRequired": true
        }
    },
    "additionalProperties": false,
    "required": [
        "title",
        "firstName",
        "lastName"
    ]
}
```


