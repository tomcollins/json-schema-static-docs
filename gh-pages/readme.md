---
title: README
---

# Json Schema Static Docs

[![npm version](https://badge.fury.io/js/json-schema-static-docs.svg)](https://badge.fury.io/js/json-schema-static-docs) [![CircleCI](https://circleci.com/gh/tomcollins/json-schema-static-docs/tree/master.svg?style=svg)](https://circleci.com/gh/tomcollins/json-schema-static-docs/tree/master)

## Installation

```bash
npm install json-schema-static-docs
```

## Usage

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

## Describing Enums

Json-schema allows a set of enumeration values to be defined for a string property but does not allow descriptions to be defined for each value. Descriptions within documentation can be very useful.

This library supports the `meta:enum` convention (inspired by [adobe/jsonschema2md](https://github.com/adobe/jsonschema2md) to allow descriptions to be defined for enums.

You will need to enable this feature using the `enableMetaEnum` option:

```javascript
let jsonSchemaStaticDocs = new JsonSchemaStaticDocs({
  inputPath: "./schema",
  outputPath: "./docs",
  enableMetaEnum: true,
});
await jsonSchemaStaticDocs.generate();
```

_This allows the `meta:enum` keyword to be used when applying strict validation._

And then define the `meta:enum` descriptions adjacent to your `enum` e.g.

```yml
property1:
  title: "Property 1"
  type: "string"
  enum: ["foo", 42]
  meta:enum:
    foo: Description for foo
    42: Description for 42
```

## Custom Templates

Templates are authored in [handlebars.js](https://handlebarsjs.com).

The default template is [templates/markdown/schema.hbs](https://github.com/tomcollins/json-schema-static-docs/blob/master/templates/markdown/schema.hbs).

You can provide your own custom templates using the `templatePath` option.

In the example below you will be expected to provide `./your-templates/schema.hbs'.

```javascript
const JsonSchemaStaticDocs = require("json-schema-static-docs");

(async () => {
  let jsonSchemaStaticDocs = new JsonSchemaStaticDocs({
    inputPath: "./schema",
    outputPath: "./docs",
    templatePath: "./your-templates/",
  });
  await jsonSchemaStaticDocs.generate();
  console.log("Documents generated.");
})();
```

_There are currently limitations when using custom templates. Some elements are rendered through handlebars helpers outside the templates._
