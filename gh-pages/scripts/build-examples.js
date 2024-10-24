const JsonSchemaStaticDocs = require("../../lib/json-schema-static-docs");
const path = require("path");
const fastGlob = require("fast-glob");

const ymlPath2019 = path.resolve(__dirname, "../yml/ajv-2019/");
const ymlPath2020 = path.resolve(__dirname, "../yml/ajv-2020/");
const examplesPath = path.resolve(__dirname, "../examples/");

const options = {
  inputPath: ymlPath2019,
  outputPath: examplesPath,
  indexPath: "examples-index.md",
  indexTitle: "List of Examples",
  ajvOptions: {
    allowUnionTypes: true,
  },
  enableMetaEnum: true,
  addFrontMatter: true,
};

(async () => {
  let jsonSchemaStaticDocs = new JsonSchemaStaticDocs(options);
  await jsonSchemaStaticDocs.generate();
  console.log("AJV 2019 documents generated.");

  options.inputPath = ymlPath2020;
  options.jsonSchemaVersion = "https://json-schema.org/draft/2020-12/schema";
  jsonSchemaStaticDocs = new JsonSchemaStaticDocs(options);
  await jsonSchemaStaticDocs.generate();
  console.log("AJV 2020 documents generated.");
})();
