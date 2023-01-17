---
title: Person
---
# Person

<p>A person entity containing a name and date of birth.</p>


<p>person.yml</p>


## Properties

<table><thead><tr><th colspan="2">Name</th><th>Type</th></tr></thead><tbody><tr><td colspan="2"><a href="#name">name</a></td><td>Object (of type <a href="./name.html">Name</a>)</td></tr><tr><td colspan="2"><a href="#dateofbirth">dateOfBirth</a></td><td>String</td></tr><tr><td colspan="2"><a href="#address">address</a></td><td>Object</td></tr><tr><td colspan="2"><a href="#friends">friends</a></td><td>Array [<a href="./name.html">Name</a>]</td></tr></tbody></table>


## Example
```
{
    "name": {
        "title": "Mr",
        "firstName": "Seymour",
        "lastName": "Butts"
    },
    "dateOfBirth": "1980-01-01T00:00:00.000Z",
    "address": {
        "houseNumber": 41,
        "street": "Some street",
        "city": "Swansea",
        "timeAtAddress": {
            "years": 1,
            "months": 3
        }
    }
}
```
## Example
```
{
    "name": {
        "title": "Mr",
        "firstName": "Jane",
        "lastName": "Smith"
    },
    "dateOfBirth": "1980-01-01T00:00:00.000Z",
    "address": {
        "houseNumber": 310,
        "street": "Any street",
        "city": "London"
    },
    "friends": [
        {
            "title": "Mr",
            "firstName": "Seymour",
            "lastName": "Butts"
        },
        {
            "title": "Mrs",
            "firstName": "Marge",
            "lastName": "Simpson"
        }
    ]
}
```

<hr />



## name

  <p>Defined in <a href="./name.html">./name.yml</a></p>


<p>A name entity containing a title, first name and last name.</p>

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
    <tr>
      <td>Required</td>
      <td colspan="2">Yes</td>
    </tr>
    <tr><td>Type</td><td colspan="2">Object (of type <a href="./name.html">Name</a>)</td></tr>
    
  </tbody>
</table>

### Properties
  <table><thead><tr><th colspan="2">Name</th><th>Type</th></tr></thead><tbody><tr><td colspan="2"><a href="#nametitle">title</a></td><td>String</td></tr><tr><td colspan="2"><a href="#namefirstname">firstName</a></td><td>String</td></tr><tr><td colspan="2"><a href="#namelastname">lastName</a></td><td>String</td></tr></tbody></table>





## dateOfBirth



<p>The date at which a person was born.</p>

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
      <td colspan="2">Date of birth</td>
    </tr>
    <tr>
      <td>Required</td>
      <td colspan="2">Yes</td>
    </tr>
    <tr><td>Type</td><td colspan="2">String</td></tr>
    <tr>
      <td>Format</td>
      <td colspan="2">date</td>
    </tr>
  </tbody>
</table>






## address



<p>The address at which a person lives.</p>

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
      <td colspan="2">Address</td>
    </tr>
    <tr>
      <td>Required</td>
      <td colspan="2">Yes</td>
    </tr>
    <tr><td>Type</td><td colspan="2">Object</td></tr>
    
  </tbody>
</table>

### Properties
  <table><thead><tr><th colspan="2">Name</th><th>Type</th></tr></thead><tbody><tr><td colspan="2"><a href="#addresshousenumber">houseNumber</a></td><td>String</td></tr><tr><td colspan="2"><a href="#addressstreet">street</a></td><td>String</td></tr><tr><td colspan="2"><a href="#addresscity">city</a></td><td>String</td></tr><tr><td colspan="2"><a href="#addresstimeataddress">timeAtAddress</a></td><td>Object</td></tr></tbody></table>


### address.houseNumber



<p>The house number at which an address is located.</p>

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
      <td colspan="2">House Number</td>
    </tr>
    <tr>
      <td>Required</td>
      <td colspan="2">No</td>
    </tr>
    <tr><td>Type</td><td colspan="2">String</td></tr>
    <tr>
      <td>Min Length</td>
      <td colspan="2">1</td>
    </tr><tr>
      <td>Max Length</td>
      <td colspan="2">10</td>
    </tr>
  </tbody>
</table>




### address.street



<p>The street in which an address is located.</p>

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
      <td colspan="2">Street</td>
    </tr>
    <tr>
      <td>Required</td>
      <td colspan="2">No</td>
    </tr>
    <tr><td>Type</td><td colspan="2">String</td></tr>
    <tr>
      <td>Min Length</td>
      <td colspan="2">1</td>
    </tr><tr>
      <td>Max Length</td>
      <td colspan="2">250</td>
    </tr>
  </tbody>
</table>




### address.city



<p>The city in which an address is located.</p>

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
      <td colspan="2">City</td>
    </tr>
    <tr>
      <td>Required</td>
      <td colspan="2">No</td>
    </tr>
    <tr><td>Type</td><td colspan="2">String</td></tr>
    <tr>
      <td>Min Length</td>
      <td colspan="2">1</td>
    </tr><tr>
      <td>Max Length</td>
      <td colspan="2">250</td>
    </tr>
  </tbody>
</table>




### address.timeAtAddress



<p>How long the person has lived at this address.</p>

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
      <td colspan="2">Time at address</td>
    </tr>
    <tr>
      <td>Required</td>
      <td colspan="2">No</td>
    </tr>
    <tr><td>Type</td><td colspan="2">Object</td></tr>
    
  </tbody>
</table>



### address.timeAtAddress.years



<p>The number of years lived at this address.</p>

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
      <td colspan="2">Years</td>
    </tr>
    <tr><td>Type</td><td colspan="2">Number</td></tr>
    <tr>
      <td>Minimum</td>
      <td colspan="2">1</td>
    </tr><tr>
      <td>Maximum</td>
      <td colspan="2">100</td>
    </tr>
  </tbody>
</table>




### address.timeAtAddress.months



<p>The number of months lived at this address.</p>

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
      <td colspan="2">Months</td>
    </tr>
    <tr><td>Type</td><td colspan="2">Integer</td></tr>
    <tr>
      <td>Minimum</td>
      <td colspan="2">1</td>
    </tr><tr>
      <td>Maximum</td>
      <td colspan="2">12</td>
    </tr>
  </tbody>
</table>








## friends



<p>An array containing the names of a person&#x27;s friends.</p>

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
      <td colspan="2">Friends</td>
    </tr>
    <tr>
      <td>Required</td>
      <td colspan="2">No</td>
    </tr>
    <tr><td>Type</td><td colspan="2">Array [<a href="./name.html">Name</a>]</td></tr>
    
  </tbody>
</table>









