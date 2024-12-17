---
title: All-of
description: Example schema to demonstrate the use of the allOf keyword

---


# All-of

<p>Example schema to demonstrate the use of the allOf keyword</p>

<table>
<tbody>
<tr><th>$id</th><td>allof.yml</td></tr>
<tr><th>$schema</th><td>http://json-schema.org/draft-07/schema#</td></tr>
</tbody>
</table>

## Properties

<table class="jssd-properties-table"><thead><tr><th colspan="2">Name</th><th>Type</th></tr></thead><tbody><tr><td rowspan="2">allOfExample</td><td rowspan="2">All of:</td><td>Object</td></tr><tr><td>Object</td></tr></tbody></table>


## Example



```
{
    "allOfExample": {
        "propertyA": "With a string value",
        "propertyB": 123
    }
}
```


## Example



```
{
    "allOfExample": {
        "propertyA": "Another string value",
        "propertyB": 456,
        "propertyC": 789
    }
}
```



<hr />


## allOfExample


<table class="jssd-property-table">
  <tbody>
    <tr>
      <th>Title</th>
      <td colspan="2">All Of Example</td>
    </tr>
    <tr>
      <th>Description</th>
      <td colspan="2">Property that demonstrates allOf</td>
    </tr>
    <tr><tr><td rowspan="2">Type</td><td rowspan="2">All of:</td><td>Object</td></tr><tr><td>Object</td></tr></tr>
    <tr>
      <th>Required</th>
      <td colspan="2">Yes</td>
    </tr>
    
  </tbody>
</table>



### allOfExample.0


<table class="jssd-property-table">
  <tbody>
    <tr>
      <th>Title</th>
      <td colspan="2">allOfExample option 0 with a single property</td>
    </tr>
    
    
  </tbody>
</table>



### allOfExample.0.propertyA


<table class="jssd-property-table">
  <tbody>
    <tr>
      <th>Title</th>
      <td colspan="2">Property A</td>
    </tr>
    <tr><th>Type</th><td colspan="2">String</td></tr>
    
  </tbody>
</table>





### allOfExample.1


<table class="jssd-property-table">
  <tbody>
    <tr>
      <th>Title</th>
      <td colspan="2">allOfExample option 1 with two properties</td>
    </tr>
    
    
  </tbody>
</table>



### allOfExample.1.propertyB


<table class="jssd-property-table">
  <tbody>
    <tr>
      <th>Title</th>
      <td colspan="2">Property B</td>
    </tr>
    <tr><th>Type</th><td colspan="2">Integer</td></tr>
    
  </tbody>
</table>




### allOfExample.1.propertyC


<table class="jssd-property-table">
  <tbody>
    <tr>
      <th>Title</th>
      <td colspan="2">Property C</td>
    </tr>
    <tr><th>Type</th><td colspan="2">Integer</td></tr>
    
  </tbody>
</table>











<hr />

## Schema
```
{
    "$id": "allof.yml",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "All-of",
    "description": "Example schema to demonstrate the use of the allOf keyword",
    "type": "object",
    "examples": [
        {
            "allOfExample": {
                "propertyA": "With a string value",
                "propertyB": 123
            }
        },
        {
            "allOfExample": {
                "propertyA": "Another string value",
                "propertyB": 456,
                "propertyC": 789
            }
        }
    ],
    "properties": {
        "allOfExample": {
            "title": "All Of Example",
            "description": "Property that demonstrates allOf",
            "type": "object",
            "allOf": [
                {
                    "title": "allOfExample option 0 with a single property",
                    "properties": {
                        "propertyA": {
                            "type": "string",
                            "title": "Property A"
                        }
                    },
                    "additionalProperties": false,
                    "required": [
                        "propertyA"
                    ]
                },
                {
                    "title": "allOfExample option 1 with two properties",
                    "properties": {
                        "propertyB": {
                            "type": "integer",
                            "title": "Property B"
                        },
                        "propertyC": {
                            "type": "integer",
                            "title": "Property C"
                        }
                    },
                    "additionalProperties": false,
                    "required": [
                        "propertyB"
                    ]
                }
            ]
        }
    },
    "additionalProperties": false,
    "required": [
        "allOfExample"
    ]
}
```


