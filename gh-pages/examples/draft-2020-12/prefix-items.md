---
title: Draft 2020-12 - Prefix Items
description: A schema demonstrating the use of prefixItems

---


# Draft 2020-12 - Prefix Items

<p>A schema demonstrating the use of prefixItems</p>

<table>
<tbody>
<tr><th>$id</th><td>https://example.com/2020-12-prefix-items.json</td></tr>
<tr><th>$schema</th><td>https://json-schema.org/draft/2020-12/schema</td></tr>
</tbody>
</table>

## Properties

<table class="jssd-properties-table"><thead><tr><th colspan="2">Name</th><th>Type</th></tr></thead><tbody><tr><td colspan="2"><a href="#members">members</a></td><td>Array</td></tr></tbody></table>


## Example



```
{
    "members": [
        1,
        "Two"
    ]
}
```



<hr />


## members


<table class="jssd-property-table">
  <tbody>
    <tr><th>Type</th><td colspan="2">Array</td></tr>
    <tr>
      <th>Required</th>
      <td colspan="2">No</td>
    </tr>
    <tr>
      <th>Min Items</th>
      <td colspan="2">2</td>
    </tr><tr>
      <th>Max Items</th>
      <td colspan="2">2</td>
    </tr>
  </tbody>
</table>

<hr />

## Security

<p>This schema is secure.</p>

<hr />

## Schema
```
{
    "$id": "https://example.com/2020-12-prefix-items.json",
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "title": "Draft 2020-12 - Prefix Items",
    "description": "A schema demonstrating the use of prefixItems",
    "examples": [
        {
            "members": [
                1,
                "Two"
            ]
        }
    ],
    "type": "object",
    "properties": {
        "members": {
            "type": "array",
            "prefixItems": [
                {
                    "type": "integer"
                },
                {
                    "type": "string"
                }
            ],
            "minItems": 2,
            "maxItems": 2,
            "items": false
        }
    }
}
```
