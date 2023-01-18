---
title: Enum Documentation
description: JSON schema example demonstrating documentation of enum values.

---
# Enum Documentation

<p>JSON schema example demonstrating documentation of enum values.</p>


<p>enum-documentation.yml</p>


## Properties

<table><thead><tr><th colspan="2">Name</th><th>Type</th></tr></thead><tbody><tr><td colspan="2"><a href="#status">status</a></td><td>String</td></tr></tbody></table>


## Example
```
{
    "status": "Active"
}
```

<hr />



## status



<p>The status of something</p>

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
      <td colspan="2">Status</td>
    </tr>
    <tr>
      <td>Required</td>
      <td colspan="2">Yes</td>
    </tr>
    <tr><td>Type</td><td colspan="2">String</td></tr>
    <tr>
      <td>Enum</td>
      <td colspan="2"><dl><dt>Active</dt><dd>The thing is currently active and in use</dd><dt>Suspended</dt><dd>The thing is currently suspended and may later become Active or Terminated</dd><dt>Deleted</dt><dd>The thing has been permanently terminated</dd></dl></td>
    </tr>
  </tbody>
</table>










