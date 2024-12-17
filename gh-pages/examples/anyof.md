---
title: Any-of
description: Example schema to demonstrate the use of the anyOf keyword

---


# Any-of

<p>Example schema to demonstrate the use of the anyOf keyword</p>

<table>
<tbody>
<tr><th>$id</th><td>anyof.yml</td></tr>
<tr><th>$schema</th><td>http://json-schema.org/draft-07/schema#</td></tr>
</tbody>
</table>

## Properties

<table class="jssd-properties-table"><thead><tr><th colspan="2">Name</th><th>Type</th></tr></thead><tbody><tr><td rowspan="3">anyOfExample</td><td rowspan="3">Any of:</td><td>Object</td></tr><tr><td>Object</td></tr><tr><td>Object</td></tr></tbody></table>


## Example



```
{
    "anyOfExample": {
        "propertyA": "With a string value"
    }
}
```


## Example



```
{
    "anyOfExample": {
        "propertyA": "With another string value",
        "propertyB": 456,
        "propertyC": 789
    }
}
```



<hr />


## anyOfExample


<table class="jssd-property-table">
  <tbody>
    <tr>
      <th>Title</th>
      <td colspan="2">Any Of Example</td>
    </tr>
    <tr>
      <th>Description</th>
      <td colspan="2">Property that demonstrates anyOf</td>
    </tr>
    <tr><tr><td rowspan="3">Type</td><td rowspan="3">Any of:</td><td>Object</td></tr><tr><td>Object</td></tr><tr><td>Object</td></tr></tr>
    <tr>
      <th>Required</th>
      <td colspan="2">Yes</td>
    </tr>
    
  </tbody>
</table>



### anyOfExample.0


<table class="jssd-property-table">
  <tbody>
    <tr>
      <th>Title</th>
      <td colspan="2">anyOfExample option 0 with a single property</td>
    </tr>
    
    
  </tbody>
</table>



### anyOfExample.0.propertyA


<table class="jssd-property-table">
  <tbody>
    <tr>
      <th>Title</th>
      <td colspan="2">Property A</td>
    </tr>
    <tr><th>Type</th><td colspan="2">String</td></tr>
    
  </tbody>
</table>





### anyOfExample.1


<table class="jssd-property-table">
  <tbody>
    <tr>
      <th>Title</th>
      <td colspan="2">anyOfExample option 1 with a two property</td>
    </tr>
    
    
  </tbody>
</table>



### anyOfExample.1.propertyA


<table class="jssd-property-table">
  <tbody>
    <tr>
      <th>Title</th>
      <td colspan="2">Property A</td>
    </tr>
    <tr><th>Type</th><td colspan="2">String</td></tr>
    
  </tbody>
</table>




### anyOfExample.1.propertyB


<table class="jssd-property-table">
  <tbody>
    <tr>
      <th>Title</th>
      <td colspan="2">Property B</td>
    </tr>
    <tr><th>Type</th><td colspan="2">Integer</td></tr>
    
  </tbody>
</table>





### anyOfExample.2


<table class="jssd-property-table">
  <tbody>
    <tr>
      <th>Title</th>
      <td colspan="2">anyOfExample option 2 with three properties</td>
    </tr>
    
    
  </tbody>
</table>



### anyOfExample.2.propertyA


<table class="jssd-property-table">
  <tbody>
    <tr>
      <th>Title</th>
      <td colspan="2">Property A</td>
    </tr>
    <tr><th>Type</th><td colspan="2">String</td></tr>
    
  </tbody>
</table>




### anyOfExample.2.propertyB


<table class="jssd-property-table">
  <tbody>
    <tr>
      <th>Title</th>
      <td colspan="2">Property B</td>
    </tr>
    <tr><th>Type</th><td colspan="2">Integer</td></tr>
    
  </tbody>
</table>




### anyOfExample.2.propertyC


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
    "$id": "anyof.yml",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Any-of",
    "description": "Example schema to demonstrate the use of the anyOf keyword",
    "type": "object",
    "examples": [
        {
            "anyOfExample": {
                "propertyA": "With a string value"
            }
        },
        {
            "anyOfExample": {
                "propertyA": "With another string value",
                "propertyB": 456,
                "propertyC": 789
            }
        }
    ],
    "properties": {
        "anyOfExample": {
            "title": "Any Of Example",
            "description": "Property that demonstrates anyOf",
            "type": "object",
            "anyOf": [
                {
                    "title": "anyOfExample option 0 with a single property",
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
                    "title": "anyOfExample option 1 with a two property",
                    "properties": {
                        "propertyA": {
                            "type": "string",
                            "title": "Property A"
                        },
                        "propertyB": {
                            "type": "integer",
                            "title": "Property B"
                        }
                    },
                    "additionalProperties": false,
                    "required": [
                        "propertyA"
                    ]
                },
                {
                    "title": "anyOfExample option 2 with three properties",
                    "properties": {
                        "propertyA": {
                            "type": "string",
                            "title": "Property A"
                        },
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
                        "propertyA",
                        "propertyB",
                        "propertyC"
                    ]
                }
            ]
        }
    },
    "additionalProperties": false,
    "required": [
        "anyOfExample"
    ]
}
```


