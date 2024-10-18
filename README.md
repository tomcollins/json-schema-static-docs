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

To use draft-2020-12, set the `ajvOptions.jsonSchemaVersion` to `draft-2020-12`:

```javascript
const JsonSchemaStaticDocs = require("json-schema-static-docs");

(async () => {
  let jsonSchemaStaticDocs = new JsonSchemaStaticDocs({
    inputPath: "./schema",
    outputPath: "./docs",
    ajvOptions: {
      allowUnionTypes: true,
      jsonSchemaVersion: "draft-2020-12",
    },
  });
  await jsonSchemaStaticDocs.generate();
  console.log("Documents generated.");
})();
```
