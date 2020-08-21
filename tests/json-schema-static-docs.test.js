const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const _ = require("lodash");

const JsonSchameStaticDocs = require("../lib/json-schema-static-docs.js");

let defaultTestOptions = {
  inputPath: "./tests/examples/schema/",
  outputPath: "./tests/docs/",
};
let testOptions = {};

beforeEach(() => {
  testOptions = _.cloneDeep(defaultTestOptions);
  if (!fs.existsSync(testOptions.outputPath)) {
    fs.mkdirSync(testOptions.outputPath);
  }
});

afterEach(() => {
  rimraf.sync(testOptions.outputPath);
});

test("resolves single schema", async () => {
  const jsonSchameStaticDocs = new JsonSchameStaticDocs(testOptions);
  await jsonSchameStaticDocs.generate();
});

test("loads single additional data source", async () => {
  testOptions.additionalDataSources = {
    foo: "./tests/examples/foo",
    bar: "./tests/examples/bar",
  };
  const jsonSchameStaticDocs = new JsonSchameStaticDocs(testOptions);
  let mergedSchemas = await jsonSchameStaticDocs.generate();
  console.log(mergedSchemas);
  expect(mergedSchemas[0].filename).toBe("tests/examples/schema/name.json");
  expect(mergedSchemas[0].foo.filename).toBe("tests/examples/foo/name.json");
  expect(mergedSchemas[0].bar.filename).toBe("tests/examples/bar/name.json");
});

test("supports custom templates", async () => {
  testOptions.templatePath = path.join(__dirname, "examples/templates/");
  const jsonSchameStaticDocs = new JsonSchameStaticDocs(testOptions);
  await jsonSchameStaticDocs.generate();
  let result = fs.readFileSync(path.join(testOptions.outputPath, "name.md"));
  expect(result.toString()).toBe("foo");
});

test("allows templates to be skipped", async () => {
  testOptions.skipTemplates = true;
  const jsonSchameStaticDocs = new JsonSchameStaticDocs(testOptions);
  await jsonSchameStaticDocs.generate();
  let result = fs.readFileSync(
    path.join(testOptions.outputPath, "person.json")
  );
  let schema = JSON.parse(result.toString());
  expect(schema.title).toBe("Person");
  expect(schema.properties.name.properties.firstNames.type).toBe("string");
});
