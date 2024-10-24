---
title: Root level property
description: JSON schema example demonstrating a schema with properties that have default values

---


# Root level property

<p>JSON schema example demonstrating a schema with properties that have default values</p>

<table>
<tbody>
<tr><th>$id</th><td>default-values.yml</td></tr>
<tr><th>$schema</th><td>http://json-schema.org/draft-07/schema#</td></tr>
</tbody>
</table>

## Properties

<table class="jssd-properties-table"><thead><tr><th colspan="2">Name</th><th>Type</th></tr></thead><tbody><tr><td colspan="2"><a href="#defaultstring">defaultString</a></td><td>String</td></tr><tr><td colspan="2"><a href="#defaultobject">defaultObject</a></td><td>Object</td></tr></tbody></table>


## Example
```
{
    "defaultString": "Hello",
    "defaultObject": {
        "foo": "bar"
    }
}
```

<hr />


## defaultString


<table class="jssd-property-table">
  <tbody>
    <tr>
      <th>Title</th>
      <td colspan="2">Default String</td>
    </tr>
    <tr>
      <th>Description</th>
      <td colspan="2">A string property with a default</td>
    </tr>
    <tr><th>Type</th><td colspan="2">String</td></tr>
    <tr>
      <th>Required</th>
      <td colspan="2">No</td>
    </tr>
    <tr>
      <th>Default</th>
      <td colspan="2">Hello</td>
    </tr>
    
  </tbody>
</table>




## defaultObject


<table class="jssd-property-table">
  <tbody>
    <tr>
      <th>Title</th>
      <td colspan="2">Default Object</td>
    </tr>
    <tr>
      <th>Description</th>
      <td colspan="2">An object property value with a default</td>
    </tr>
    <tr><th>Type</th><td colspan="2">Object</td></tr>
    <tr>
      <th>Required</th>
      <td colspan="2">No</td>
    </tr>
    <tr>
      <th>Default</th>
      <td colspan="2">[object Object]</td>
    </tr>
    
  </tbody>
</table>

### Properties
  <table class="jssd-properties-table"><thead><tr><th colspan="2">Name</th><th>Type</th></tr></thead><tbody><tr><td colspan="2"><a href="#defaultobjectfoo">foo</a></td><td>String</td></tr></tbody></table>


### defaultObject.foo


<table class="jssd-property-table">
  <tbody>
    <tr>
      <th>Title</th>
      <td colspan="2">Foo</td>
    </tr>
    <tr><th>Type</th><td colspan="2">String</td></tr>
    <tr>
      <th>Required</th>
      <td colspan="2">No</td>
    </tr>
    
  </tbody>
</table>










<hr />

## Schema
```
{
    "$id": "default-values.yml",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Root level property",
    "description": "JSON schema example demonstrating a schema with properties that have default values",
    "type": "object",
    "examples": [
        {
            "defaultString": "Hello",
            "defaultObject": {
                "foo": "bar"
            }
        }
    ],
    "properties": {
        "defaultString": {
            "title": "Default String",
            "description": "A string property with a default",
            "type": "string",
            "default": "Hello"
        },
        "defaultObject": {
            "title": "Default Object",
            "description": "An object property value with a default",
            "type": "object",
            "properties": {
                "foo": {
                    "type": "string",
                    "title": "Foo"
                }
            },
            "default": {
                "foo": "bar"
            }
        }
    },
    "additionalProperties": false
}
```


