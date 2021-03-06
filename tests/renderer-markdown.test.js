const fs = require('fs');
const path = require('path');
const rimraf = require("rimraf");
const _ = require('lodash')

const RendererMarkdown = require('../lib/renderer-markdown.js');

let defaultTemplatePath = path.join(__dirname, '../templates');
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
        type: ["string", "integer"],
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

const removeFormatting = value => {
  return value.replace(/\n/g, '').replace(/ +</g, '<');
}

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
    + '<table><thead><tr><th colspan=\"2\">Name</th><th>Type</th></tr></thead>'
    + '<tr><td colspan=\"2\">property1</td><td>String</td></tr>'
    + '<tr><td colspan=\"2\">property2</td><td>[string, integer]</td></tr>'
    + '<tr><td colspan=\"2\">property3</td><td>Array [<a href=\"./property3.html\">Property3</a>]</td></tr>'
    + '</tbody></table>';

  expect(result).toEqual(expect.stringContaining(expectedText));
});

test('renders string property enums', async () => {
  expect.assertions(1);
  rendererMarkdown = new RendererMarkdown(defaultTemplatePath);
  await rendererMarkdown.setup();
  let result = rendererMarkdown.renderSchema(mergedSchema);

  result = result.match(/## property1(.*\n)*/)[0];
  result = removeFormatting(result);

  let expectedText = ''
    + '<tr><td>Title</td><td colspan=\"2\">Property 1</td></tr>';
    + '<tr><td>Required</td><td colspan=\"2\">Yes</td></tr>'
    + '<tr><td>Type</td><td colspan=\"2\">String</td></tr>'
    + '<tr><td>Enum</td><td colspan=\"2\"><ul><li>foo</li><li>bar</li><li>42</li><li>null</li></ul></td></tr>';

  expect(result).toEqual(expect.stringContaining(expectedText));
});

test('renders array property types', async () => {
  expect.assertions(1);
  rendererMarkdown = new RendererMarkdown(defaultTemplatePath);
  await rendererMarkdown.setup();
  let result = rendererMarkdown.renderSchema(mergedSchema);

  result = result.match(/## property3(.*\n)*/)[0];
  result = removeFormatting(result);

  let expectedText = ''
    + '<tr><td>Title</td><td colspan=\"2\">Property 3</td></tr>'
    + '<tr><td>Required</td><td colspan=\"2\">No</td></tr>'
    + '<tr><td>Type</td><td colspan=\"2\">Array [<a href=\"./property3.html\">Property3</a>]</td></tr>';

  expect(result).toEqual(expect.stringContaining(expectedText));
});