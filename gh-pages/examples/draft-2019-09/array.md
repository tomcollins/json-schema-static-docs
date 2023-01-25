---
title: Draft 2019-09 - Array Example
description: A schema describing fruits and vegetables

---
# Draft 2019-09 - Array Example

<p>A schema describing fruits and vegetables</p>

<table>
<tbody>
<tr><th>$id</th><td>https://example.com/arrays.schema.json</td></tr>
<tr><th>$schema</th><td>https://json-schema.org/draft/2019-09/schema</td></tr>
</tbody>
</table>

## Properties

<table><thead><tr><th colspan="2">Name</th><th>Type</th></tr></thead><tbody><tr><td colspan="2"><a href="#fruits">fruits</a></td><td>Array</td></tr><tr><td colspan="2"><a href="#vegetables">vegetables</a></td><td>Array</td></tr></tbody></table>


## Example
```
{
    "fruits": [
        "Apple"
    ],
    "vegetables": [
        {
            "name": "Tomato",
            "hasARoundShape": true
        },
        {
            "name": "Carrot",
            "hasARoundShape": false
        }
    ]
}
```

<hr />



## fruits



<p>An array of fruit names</p>

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
      <td colspan="2">Fruits</td>
    </tr>
    <tr>
      <td>Required</td>
      <td colspan="2">No</td>
    </tr>
    <tr><td>Type</td><td colspan="2">Array</td></tr>
    
  </tbody>
</table>






## vegetables



<p>An array vegetable objects</p>

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
      <td colspan="2">Vegetables</td>
    </tr>
    <tr>
      <td>Required</td>
      <td colspan="2">No</td>
    </tr>
    <tr><td>Type</td><td colspan="2">Array</td></tr>
    
  </tbody>
</table>



### vegetables.name



<p>The name of the vegetable.</p>

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
      <td colspan="2">Name</td>
    </tr>
    <tr><td>Type</td><td colspan="2">String</td></tr>
    
  </tbody>
</table>




### vegetables.hasARoundShape



<p>Does this vegetable have a round shape?</p>

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
      <td colspan="2">Is round</td>
    </tr>
    <tr><td>Type</td><td colspan="2">Boolean</td></tr>
    
  </tbody>
</table>










## Schema
```
{
    "$id": "https://example.com/arrays.schema.json",
    "$schema": "https://json-schema.org/draft/2019-09/schema",
    "title": "Draft 2019-09 - Array Example",
    "description": "A schema describing fruits and vegetables",
    "examples": [
        {
            "fruits": [
                "Apple"
            ],
            "vegetables": [
                {
                    "name": "Tomato",
                    "hasARoundShape": true
                },
                {
                    "name": "Carrot",
                    "hasARoundShape": false
                }
            ]
        }
    ],
    "type": "object",
    "properties": {
        "fruits": {
            "title": "Fruits",
            "description": "An array of fruit names",
            "type": "array",
            "contains": {
                "type": "string"
            },
            "isRequired": false
        },
        "vegetables": {
            "title": "Vegetables",
            "description": "An array vegetable objects",
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "name",
                    "hasARoundShape"
                ],
                "properties": {
                    "name": {
                        "type": "string",
                        "title": "Name",
                        "description": "The name of the vegetable."
                    },
                    "hasARoundShape": {
                        "type": "boolean",
                        "title": "Is round",
                        "description": "Does this vegetable have a round shape?"
                    }
                }
            },
            "isRequired": false
        }
    },
    "$defs": {
        "vegetable": {
            "type": "object",
            "required": [
                "name",
                "hasARoundShape"
            ],
            "properties": {
                "name": {
                    "type": "string",
                    "title": "Name",
                    "description": "The name of the vegetable."
                },
                "hasARoundShape": {
                    "type": "boolean",
                    "title": "Is round",
                    "description": "Does this vegetable have a round shape?"
                }
            }
        }
    }
}
```


