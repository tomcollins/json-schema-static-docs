# Json Schema Static docs

[![CircleCI](https://circleci.com/gh/tomcollins/json-schema-static-docs/tree/master.svg?style=svg)](https://circleci.com/gh/tomcollins/json-schema-static-docs/tree/master) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)


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
    outputPath: './docs'
  });
  await jsonSchemaStaticDocs.generate();
  console.log('Documents generated.');
})();
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
