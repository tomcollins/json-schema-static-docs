# Json Schema Statiuc docs

[![CircleCI](https://circleci.com/gh/tomcollins/json-schema-static-docs/tree/master.svg?style=svg)](https://circleci.com/gh/tomcollins/json-schema-static-docs/tree/master) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)


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

