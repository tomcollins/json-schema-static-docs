const fs = require('fs');
const path = require('path');
const rimraf = require("rimraf");
const _ = require('lodash')

const RendererMarkdown = require('../lib/renderer-markdown.js');

let defaultTemplatePath = path.join(__dirname, '../templates/markdown');
let rendererMarkdown;

let defaultMergedSchema = {
  schema: {
    title: 'My Schema',
    properties: {
      property1: {
        title: 'Property 1',
        type: 'string',
        isRequired: true,
        enum: ["foo", "bar", 42, null]
      },
      property2: {
        title: 'Property 2',
        type: 'integer',
        isRequired: false
      },
      property3: {
        "type": "array",
        "title": "Property 3",
        "items": {
            "title": "Property 3",
            "$ref": "property3.json"
        }
      }
    }
  }
};
let mergedSchema = {};

beforeEach(() => {
  mergedSchema = _.cloneDeep(defaultMergedSchema);
});

test('renders title', async () => {
  expect.assertions(1);
  rendererMarkdown = new RendererMarkdown(defaultTemplatePath);
  await rendererMarkdown.setup();
  let result = rendererMarkdown.renderSchema(mergedSchema);
  expect(result).toEqual(expect.stringContaining('# ' + mergedSchema.schema.title));
});

test('renders attributes', async () => {
  expect.assertions(1);
  rendererMarkdown = new RendererMarkdown(defaultTemplatePath);
  await rendererMarkdown.setup();
  let result = rendererMarkdown.renderSchema(mergedSchema);

  let expectedText = '## Attributes\n\n'
    + '| Name | Type | Required |\n'
    + '| --- | --- | --- |\n'
    + '| property1 | String | Yes |\n'
    + '| property2 | Integer | No |\n'
    + '| property3 | Array [[Property3](./property3.html)] | No |\n';

  expect(result).toEqual(expect.stringContaining(expectedText));
});

test('renders string property enums', async () => {
  expect.assertions(1);
  rendererMarkdown = new RendererMarkdown(defaultTemplatePath);
  await rendererMarkdown.setup();
  let result = rendererMarkdown.renderSchema(mergedSchema);

  let expectedText = '| Title | Property 1 |\n'
    + '| Type | String |\n'
    + '| Enum | foo, bar, 42, null |\n';

  expect(result).toEqual(expect.stringContaining(expectedText));
});

test('renders array property types', async () => {
  expect.assertions(1);
  rendererMarkdown = new RendererMarkdown(defaultTemplatePath);
  await rendererMarkdown.setup();
  let result = rendererMarkdown.renderSchema(mergedSchema);

  let expectedText = '| Title | Property 3 |\n'
    + '| Type | Array [[Property3](./property3.html)] |\n';

  expect(result).toEqual(expect.stringContaining(expectedText));
});