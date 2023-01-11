# Json Schema Static Docs

[![npm version](https://badge.fury.io/js/json-schema-static-docs.svg)](https://badge.fury.io/js/json-schema-static-docs) [![CircleCI](https://circleci.com/gh/tomcollins/json-schema-static-docs/tree/master.svg?style=svg)](https://circleci.com/gh/tomcollins/json-schema-static-docs/tree/master)

## Installation

```
npm install json-schema-static-docs
```

## Usage

```
const JsonSchemaStaticDocs = require('json-schema-static-docs');

( async () => {
  let jsonSchemaStaticDocs = new JsonSchemaStaticDocs({
    inputPath: './schema',
    outputPath: './docs',
    ajvOptions: {
      allowUnionTypes: true
    }
  });
  await jsonSchemaStaticDocs.generate();
  console.log('Documents generated.');
})();
```

## Describing Enums

Json-schema allows a set of enumeration values to be defined for a string property but does not allow descriptions to be defined for each value. Descriptions within documentation ca.n be very useful

This library supports the `meta:enum` convention (inspired by [adobe/jsonschema2md](https://github.com/adobe/jsonschema2md) to allow descriptions to be defined for enums.

```yml
property1: {
  title: "Property 1",
  type: "string",
  enum: ["foo", 42],
  meta:enum: {
    foo: Description for foo
    42: Description for 42
```

## Custom Templates

Templates are authored in [handlebars.js](https://handlebarsjs.com).

The default template is [templates/markdown/schema.hbs](https://github.com/tomcollins/json-schema-static-docs/blob/master/templates/markdown/schema.hbs).

You can provide your own custom templates using the `templatePath` option.

In the example below you will be expected to provide `./your-templates/schema.hbs'.

```
const JsonSchemaStaticDocs = require('json-schema-static-docs');

( async () => {
  let jsonSchemaStaticDocs = new JsonSchemaStaticDocs({
    inputPath: './schema',
    outputPath: './docs',
    templatePath: './your-templates/'
  });
  await jsonSchemaStaticDocs.generate();
  console.log('Documents generated.');
})();
```
