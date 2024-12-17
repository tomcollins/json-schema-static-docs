const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const _ = require("lodash");

const RendererMarkdown = require("../lib/renderer-markdown.js");

let defaultTemplatePath = path.join(__dirname, "../templates");
let rendererMarkdown;

let defaultMergedSchema = {
  schema: {
    title: "My Schema",
    examples: [
      {
        "meta:title": "Meta Title",
        "meta:description": "Meta Description",
        title: "Example 1",
        description: "Description for Example 1",
        data: {
          property1: "foo",
          property2: 42,
          property3: ["foo", "bar"],
          property4: "foo",
          property5: {
            "property5.1": {
              "property5.1.1": "foo",
            },
          },
        },
      },
      {
        title: "Example 2",
        description: "Description for Example 2",
        data: {
          property1: "bar",
          property2: 42,
          property3: ["foo", "bar"],
          property4: "foo",
          property5: {
            "property5.1": {
              "property5.1.1": "foo",
            },
          },
        },
      },
    ],
    properties: {
      property1: {
        title: "Property 1",
        type: "string",
        isRequired: true,
        enum: ["foo", "bar", 42, null],
      },
      property2: {
        title: "Property 2",
        type: ["string", "integer"],
        isRequired: false,
      },
      property3: {
        type: "array",
        title: "Property 3",
        $ref: "property3.json",
        items: {
          type: "String",
        },
      },
      property4: {
        title: "Property 4",
        type: "string",
        isRequired: true,
        enum: ["foo", 42],
        "meta:enum": {
          foo: "Description for foo",
          42: "Description for 42",
        },
      },
      property5: {
        title: "Property 5",
        type: "object",
        isRequired: true,
        properties: {
          "property5.1": {
            type: "object",
            properties: {
              "property5.1.1": {
                type: "string",
              },
            },
          },
        },
      },
      property6: {
        title: "Property 6",
        type: "object",
        isRequired: true,
        allOf: [
          {
            title: "AllOf Property 1",
            type: "string",
          },
          {
            title: "AllOf Property 2",
            type: "integer",
          },
        ],
      },
      property7: {
        title: "Property 7",
        type: "object",
        isRequired: true,
        anyOf: [
          {
            title: "AnyOf Property 1",
            type: "string",
          },
          {
            title: "AnyOf Property 2",
            type: "integer",
          },
        ],
      },
    },
  },
};
const defaultMergedSchemaWithConst = {
  schema: {
    title: "My Schema",
    properties: {
      property1: {
        title: "Property 1",
        type: "string",
        const: "foo",
      },
    },
  },
};
const mergedSchemaWithRootLevelString = {
  schema: {
    $id: "/property1",
    title: "Property 1",
    type: "string",
  },
};
let mergedSchema = {};

const removeFormatting = (value) => {
  return value.replace(/\n/g, "").replace(/ +</g, "<");
};

beforeEach(() => {
  mergedSchema = _.cloneDeep(defaultMergedSchema);
});

test("renders title", async () => {
  expect.assertions(1);
  rendererMarkdown = new RendererMarkdown(defaultTemplatePath);
  await rendererMarkdown.setup();
  let result = rendererMarkdown.renderSchema(mergedSchema);
  expect(result).toEqual(
    expect.stringContaining("# " + mergedSchema.schema.title)
  );
});

test("renders attributes", async () => {
  expect.assertions(1);
  rendererMarkdown = new RendererMarkdown(defaultTemplatePath);
  await rendererMarkdown.setup();
  let result = rendererMarkdown.renderSchema(mergedSchema);

  result = result.match(/## Properties(.*\n)*/)[0];
  result = removeFormatting(result);

  let expectedText =
    "## Properties" +
    '<table class="jssd-properties-table"><thead><tr><th colspan="2">Name</th><th>Type</th></tr></thead><tbody>' +
    '<tr><td colspan="2"><a href="#property1">property1</a></td><td>String</td></tr>' +
    '<tr><td colspan="2"><a href="#property2">property2</a></td><td>[string, integer]</td></tr>' +
    '<tr><td colspan="2"><a href="#property3">property3</a></td><td>Array [<a href="property3.html">property3.html</a>]</td></tr>' +
    '<tr><td colspan="2"><a href="#property4">property4</a></td><td>String</td></tr>' +
    '<tr><td colspan="2"><a href="#property5">property5</a></td><td>Object</td></tr>' +
    '<tr><td rowspan="2">property6</td><td rowspan="2">All of:</td><td>String</td></tr><tr><td>Integer</td></tr>';
  '<tr><td rowspan="2">property7</td><td rowspan="2">Any of:</td><td>String</td></tr><tr><td>Integer</td></tr>' +
    "</tbody></table>";

  expect(result).toContain(expectedText);
});

test("renders attributes with const", async () => {
  expect.assertions(1);
  rendererMarkdown = new RendererMarkdown(defaultTemplatePath);
  await rendererMarkdown.setup();
  let result = rendererMarkdown.renderSchema(defaultMergedSchemaWithConst);

  result = result.match(/## Properties(.*\n)*/)[0];
  result = removeFormatting(result);

  let expectedText =
    "## Properties" +
    '<table class="jssd-properties-table"><thead><tr><th colspan="2">Name</th><th>Type</th></tr></thead><tbody>' +
    '<tr><td colspan="2"><a href="#property1">property1</a></td><td>String=foo</td></tr>' +
    "</tbody></table>";

  expect(result).toContain(expectedText);
});

// tests recursive rendering of nested properties
test("renders nested property title correctly", async () => {
  expect.assertions(3);
  rendererMarkdown = new RendererMarkdown(defaultTemplatePath);
  await rendererMarkdown.setup();
  let result = rendererMarkdown.renderSchema(mergedSchema);

  result = result.match(/## property5(.*\n)*/)[0];
  result = removeFormatting(result);

  let expectedText =
    '<tr><th>Title</th><td colspan="2">Property 5</td></tr>' +
    '<tr><th>Type</th><td colspan="2">Object</td></tr>' +
    '<tr><th>Required</th><td colspan="2">Yes</td></tr>' +
    "</tbody></table>";
  expect(result).toContain(expectedText);

  let expectedText2 =
    "### Properties" +
    '<table class="jssd-properties-table"><thead><tr><th colspan="2">Name</th><th>Type</th></tr></thead><tbody>' +
    '<tr><td colspan="2"><a href="#property5property5.1">property5.1</a></td><td>Object</td></tr>' +
    "</tbody></table>";
  expect(result).toContain(expectedText2);

  let expectedText3 =
    "### property5.property5.1" +
    '<table class="jssd-property-table">' +
    '<tbody><tr><th>Type</th><td colspan="2">Object</td></tr></tbody></table>' +
    "### property5.property5.1.property5.1.1" +
    '<table class="jssd-property-table"><tbody>' +
    '<tr><th>Type</th><td colspan="2">String</td></tr></tbody></table>';
  expect(result).toContain(expectedText3);
});

test("renders string property enums", async () => {
  expect.assertions(1);
  rendererMarkdown = new RendererMarkdown(defaultTemplatePath);
  await rendererMarkdown.setup();
  let result = rendererMarkdown.renderSchema(mergedSchema);

  result = result.match(/## property1(.*\n)*/)[0];
  result = removeFormatting(result);

  let expectedText =
    '<tr><th>Title</th><td colspan="2">Property 1</td></tr>' +
    '<tr><th>Type</th><td colspan="2">String</td></tr>' +
    '<tr><th>Required</th><td colspan="2">Yes</td></tr>' +
    '<tr><th>Enum</th><td colspan="2"><ul><li>foo</li><li>bar</li><li>42</li><li>null</li></ul></td></tr>';

  expect(result).toContain(expectedText);
});

test("renders string property enums with meta description", async () => {
  expect.assertions(1);
  rendererMarkdown = new RendererMarkdown(defaultTemplatePath);
  await rendererMarkdown.setup();
  let result = rendererMarkdown.renderSchema(mergedSchema);

  result = result.match(/## property4(.*\n)*/)[0];
  result = removeFormatting(result);

  let expectedText =
    '<tr><th>Title</th><td colspan="2">Property 4</td></tr>' +
    '<tr><th>Type</th><td colspan="2">String</td></tr>' +
    '<tr><th>Required</th><td colspan="2">Yes</td></tr>' +
    '<tr><th>Enum</th><td colspan="2"><dl><dt>42</dt><dd>Description for 42</dd><dt>foo</dt><dd>Description for foo</dd></dl></td></tr>';

  expect(result).toContain(expectedText);
});

test("renders example meta title and description", async () => {
  expect.assertions(1);
  rendererMarkdown = new RendererMarkdown(defaultTemplatePath);
  await rendererMarkdown.setup();
  let result = rendererMarkdown.renderSchema(mergedSchema);

  result = result.match(/## Example(.*\n)*/)[0];

  // double line break is necessary for some markdown renderers to render the codeblock correctly
  let expectedText = "### Meta Title\n<p>Meta Description</p>\n\n```";

  expect(result).toContain(expectedText);
});

test("renders string property with const", async () => {
  expect.assertions(1);
  mergedSchema = _.cloneDeep(defaultMergedSchemaWithConst);
  rendererMarkdown = new RendererMarkdown(defaultTemplatePath);
  await rendererMarkdown.setup();
  let result = rendererMarkdown.renderSchema(mergedSchema);

  result = result.match(/## property1(.*\n)*/)[0];
  result = removeFormatting(result);

  let expectedText =
    '<tr><th>Title</th><td colspan="2">Property 1</td></tr>' +
    '<tr><th>Type</th><td colspan="2">String</td></tr>' +
    '<tr><th>Const</th><td colspan="2">foo</td></tr>';

  expect(result).toContain(expectedText);
});

test("renders array property types", async () => {
  expect.assertions(2);
  rendererMarkdown = new RendererMarkdown(defaultTemplatePath);
  await rendererMarkdown.setup();
  let result = rendererMarkdown.renderSchema(mergedSchema);

  result = result.match(/## property3(.*\n)*/)[0];
  result = removeFormatting(result);

  let expectedTitle = '<tr><th>Title</th><td colspan="2">Property 3</td></tr>';
  expect(result).toEqual(expect.stringContaining(expectedTitle));

  let expectedType =
    '<tr><th>Type</th><td colspan="2">Array [<a href="property3.html">property3.html</a>]</td></tr>';

  expect(result).toContain(expectedType);
});

test("renders root level string property", async () => {
  expect.assertions(2);
  rendererMarkdown = new RendererMarkdown(defaultTemplatePath);
  await rendererMarkdown.setup();
  let result = rendererMarkdown.renderSchema(mergedSchemaWithRootLevelString);

  console.log(result);

  result = removeFormatting(result);

  let expectedTitle = '<tr><th>Title</th><td colspan="2">Property 1</td></tr>';
  expect(result).toEqual(expect.stringContaining(expectedTitle));

  let expectedType = '<tr><th>Type</th><td colspan="2">String</td></tr>';

  expect(result).toContain(expectedType);
});
