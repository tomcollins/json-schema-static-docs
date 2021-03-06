const extend = require("extend");
const path = require("path");
const Loader = require("./loader");
const Resolver = require("./resolver");
const Merger = require("./merger");
const Renderer = require("./renderer");
const Writer = require("./writer");
const Validator = require("./validator");

const defaultOptions = {
  inputPath: "schema",
  inputFileGlob: "**/*.json",
  outputPath: "docs",
  templatePath: path.join(__dirname, "../templates"),
  resolve: {},
  additionalDataSources: {},
  linkBasePath: "./",
  skipTemplates: false,
};

var JsonSchemaStaticDocs = function (options) {
  this._options = extend(true, defaultOptions, options);
};

JsonSchemaStaticDocs.prototype.generate = async function () {
  const inputPathGlob = path.join(
    this._options.inputPath,
    this._options.inputFileGlob
  );
  const unresolvedSchemas = await Loader.loadJsonFiles(inputPathGlob);
  console.log(
    "Loaded",
    unresolvedSchemas.length,
    "schema files from",
    inputPathGlob
  );
  const resolvedSchemas = await Resolver.resolveSchemas(
    inputPathGlob,
    this._options.resolve
  );

  resolvedSchemas.forEach((schema) => {
    try {
      Validator.validateSchema(schema.data);
    } catch (e) {
      console.error("Error validating schema", schema.filename);
      console.error(e);
      throw e;
    }
  });

  if (this._options.skipTemplates === true) {
    let inputPath = this._options.inputPath;
    if (inputPath.substr(0, 1) == ".") {
      inputPath = inputPath.substr(1);
    }
    if (inputPath.substr(0, 1) == "/") {
      inputPath = inputPath.substr(1);
    }
    await Promise.all(
      resolvedSchemas.map(async (resolvedSchema) => {
        let outputFilename = resolvedSchema.filename.substr(inputPath.length);
        await Writer.writeFile(
          path.join(this._options.outputPath, outputFilename),
          JSON.stringify(resolvedSchema.data)
        );
      })
    );
    console.log(
      "Written",
      resolvedSchemas.length,
      "documents to",
      this._options.outputPath
    );
    return resolvedSchemas;
  }

  let additionalDataResults = [];
  await Promise.all(
    Object.entries(this._options.additionalDataSources).map(
      async (keyValue) => {
        let additionalDataSourcePath = path.join(keyValue[1], "**/*.json");
        let results = await Loader.loadJsonFiles(additionalDataSourcePath);
        console.log(
          "Loaded",
          results.length,
          "additional data sources from",
          additionalDataSourcePath
        );
        if (results.length) {
          additionalDataResults[keyValue[0]] = results;
        }
      }
    )
  );

  const mergedSchemas = Merger.mergeSchemas(
    unresolvedSchemas,
    resolvedSchemas,
    additionalDataResults
  );

  mergedSchemas.forEach((mergedSchema) => {
    if (mergedSchema.example) {
      try {
        Validator.validateSchemaAndData(
          mergedSchema.cleanSchema,
          mergedSchema.example.data
        );
      } catch (e) {
        console.error(
          "Error validating",
          mergedSchema.example.filename,
          "against schema",
          mergedSchema.filename
        );
        console.error(e);
      }
    }
  });

  let renderer = new Renderer(
    this._options.templatePath,
    this._options.linkBasePath
  );
  await renderer.setup();

  await Promise.all(
    mergedSchemas.map(async (mergedSchema) => {
      let renderedSchema = renderer.renderSchema(mergedSchema);
      let inputPath = this._options.inputPath;
      if (inputPath.substr(0, 1) == ".") {
        inputPath = inputPath.substr(1);
      }
      if (inputPath.substr(0, 1) == "/") {
        inputPath = inputPath.substr(1);
      }
      let outputFilename = mergedSchema.filename
        .substr(inputPath.length)
        .replace(/\.json$/, ".md");
      await Writer.writeFile(
        path.join(this._options.outputPath, outputFilename),
        renderedSchema
      );
    })
  );
  console.log(
    "Written",
    mergedSchemas.length,
    "documents to",
    this._options.outputPath
  );

  return mergedSchemas;
};

module.exports = JsonSchemaStaticDocs;
