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
        type: "array",
        title: "Property 3",
        $ref: "property3.json",
        items: {
            type: "String"
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

  result = result.match(/## Attributes(.*\n)*/)[0];

  let expectedText = '## Attributes\n\n'
    + '| Name | Type |\n'
    + '| --- | --- |\n'
    + '| property1 | String |\n'
    + '| property2 | Integer |\n'
    + '| property3 | Array [[Property3](./property3.html)] |\n';

  expect(result).toEqual(expect.stringContaining(expectedText));
});

test('renders string property enums', async () => {
  expect.assertions(1);
  rendererMarkdown = new RendererMarkdown(defaultTemplatePath);
  await rendererMarkdown.setup();
  let result = rendererMarkdown.renderSchema(mergedSchema);

  result = result.match(/## property1(.*\n)*/)[0];

  let expectedText = '| Title | Property 1 |\n'
    + '| Required | Yes |\n';
    + '| Type | String |\n'
    + '| Enum | foo, bar, 42, null |\n';

  expect(result).toEqual(expect.stringContaining(expectedText));
});

test('renders array property types', async () => {
  expect.assertions(1);
  rendererMarkdown = new RendererMarkdown(defaultTemplatePath);
  await rendererMarkdown.setup();
  let result = rendererMarkdown.renderSchema(mergedSchema);

  result = result.match(/## property3(.*\n)*/)[0];

  let expectedText = '| Title | Property 3 |\n'
    + '| Required | No |\n';
    + '| Type | Array [[Property3](./property3.html)] |\n';

  expect(result).toEqual(expect.stringContaining(expectedText));
});