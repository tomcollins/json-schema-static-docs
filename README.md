# Json Schema Static Docs

[![npm version](https://badge.fury.io/js/json-schema-static-docs.svg)](https://badge.fury.io/js/json-schema-static-docs) [![CircleCI](https://circleci.com/gh/tomcollins/json-schema-static-docs/tree/master.svg?style=svg)](https://circleci.com/gh/tomcollins/json-schema-static-docs/tree/master)

## Description

Generates static documentation for humans based on the contents of [JSON schema](https://json-schema.org/) files (yml or json).

## Support for JSON schema specification versions

Currently supports schema specified using the following [specification versions](https://json-schema.org/specification-links.html):
draft-06, draft-07, draft-2019-09, and draft 2020-12.

For complete documentation, including examples and supported keywords, see [tomcollins.github.io/json-schema-static-docs](https://tomcollins.github.io/json-schema-static-docs/).

## Installation

```bash
npm install json-schema-static-docs
```

## Usage

See [the docs](https://tomcollins.github.io/json-schema-static-docs/) for more details.

```javascript
const JsonSchemaStaticDocs = require("json-schema-static-docs");

(async () => {
  let jsonSchemaStaticDocs = new JsonSchemaStaticDocs({
    inputPath: "./schema",
    outputPath: "./docs",
    ajvOptions: {
      allowUnionTypes: true,
    },
  });
  await jsonSchemaStaticDocs.generate();
  console.log("Documents generated.");
})();
```

### How to use draft-2020-12

To use schema based on `draft-2020-12` set `options.jsonSchemaVersion` to `https://json-schema.org/draft/2020-12/schema`.

```javascript
const JsonSchemaStaticDocs = require("json-schema-static-docs");

(async () => {
  let jsonSchemaStaticDocs = new JsonSchemaStaticDocs({
    inputPath: "./schema",
    outputPath: "./docs",
    jsonSchemaVersion: "https://json-schema.org/draft/2020-12/schema",
    ajvOptions: {
      allowUnionTypes: true,
    },
  });
  await jsonSchemaStaticDocs.generate();
  console.log("Documents generated.");
})();
```

All schema documents must use must use `draft-2020-12`, you can not combine this with earlier versions such as `draft-07`.

### Adding Titles and Descriptions to Examples

You can add an optional title or description to each example in a schema using `meta:title` and `meta:description`. For example:

```json
{
  "$id": "http://example.com/schemas/name.json",
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Name",
  "description": "A name.",
  "type": "object",
  "properties": {
    "firstNames": {
      "$ref": "#/definitions/firstNames"
    },
    "lastName": {
      "$ref": "#/definitions/lastName"
    }
  },
  "additionalProperties": false,
  "required": ["lastName"],
  "definitions": {
    "firstNames": {
      "description": "One or more first names separated by a space character.",
      "type": "string",
      "minLength": 1,
      "maxLength": 100,
      "pattern": "[A-Za-z ]{1,100}"
    },
    "lastName": {
      "description": "A single last name.",
      "type": "string",
      "minLength": 1,
      "maxLength": 100,
      "pattern": "[A-Za-z]{1,100}"
    }
  },
  "examples": [
    {
      "meta:title": "First example",
      "meta:description": "First description.",
      "firstNames": "Andrew Barry",
      "lastName": "Cunningham"
    }
  ]
}
```
