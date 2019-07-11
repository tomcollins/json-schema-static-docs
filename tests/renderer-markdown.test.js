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
        type: 'string',
        isRequired: true
      },
      property2: {
        type: 'integer',
        isRequired: false
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

  let attributesText = '## Attributes\n\n'
    + '| Name | Type | Required |\n'
    + '| --- | --- | --- |\n'
    + '| property1 | String | Yes |\n'
    + '| property2 | Integer | No |\n';

  expect(result).toEqual(expect.stringContaining(attributesText));
});