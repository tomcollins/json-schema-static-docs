const extend = require("extend");
const path = require("path");
const Loader = require("./loader");
const Resolver = require("./resolver");
const Merger = require("./merger");
const Renderer = require("./renderer");
const Writer = require("./writer");
const Validator = require("./validator");
const { determineSchemaRelativePath } = require("./utils");

const defaultOptions = {
  inputPath: "schema",
  inputFileGlob: "**/*.{yml,json}",
  outputPath: "docs",
  templatePath: path.join(__dirname, "../templates"),
  linkBasePath: "./",
  resolve: {},
  additionalDataSources: {},
  skipTemplates: false,
  ajvOptions: {},
  enableMetaEnum: false,
  addFrontMatter: false,
  displaySchema: true,
};

var JsonSchemaStaticDocs = function (options) {
  this._options = extend(true, defaultOptions, options);
};

JsonSchemaStaticDocs.prototype.generate = async function () {
  const inputPathGlob = path.join(
    this._options.inputPath,
    this._options.inputFileGlob
  );
  // clean up path (strip leading ./ etc)
  const cleanInputPath = path.join(this._options.inputPath);

  const unresolvedSchemas = await Loader.loadFiles(inputPathGlob);
  console.log(
    "Loaded",
    unresolvedSchemas.length,
    "schema files from",
    inputPathGlob
  );

  const schemas = [];
  unresolvedSchemas.forEach((schema) => {
    schemas.push(schema.data);
  });
  const validator = new Validator(schemas, this._options.ajvOptions);

  if (this._options.enableMetaEnum) {
    validator.addMetaEnum();
  }

  unresolvedSchemas.forEach((schema) => {
    try {
      validator.validateSchema(schema.data);
    } catch (e) {
      console.error("Error validating schema", schema.filename);
      console.error(e);
      throw e;
    }

    schema.relativeFilename = determineSchemaRelativePath(
      schema.filename,
      cleanInputPath
    );
  });

  const resolvedSchemas = await Resolver.resolveSchemas(
    inputPathGlob,
    this._options.resolve
  );

  resolvedSchemas.forEach((schema) => {
    schema.relativeFilename = determineSchemaRelativePath(
      schema.filename,
      cleanInputPath
    );
  });

  if (this._options.skipTemplates === true) {
    await Promise.all(
      resolvedSchemas.map(async (resolvedSchema) => {
        let outputFilename = path.join(
          this._options.outputPath,
          resolvedSchema.relativeFilename
        );
        await Writer.writeFile(
          outputFilename,
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
        let results = await Loader.loadFiles(additionalDataSourcePath);
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
        validator.validateSchemaAndData(
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

  let renderer = new Renderer(this._options.templatePath, this._options);
  await renderer.setup();

  await Promise.all(
    mergedSchemas.map(async (mergedSchema) => {
      let renderedSchema = renderer.renderSchema(mergedSchema);
      let outputFilename = mergedSchema.relativeFilename.replace(
        /\.(json|yml)$/,
        ".md"
      );
      outputFilename = path.join(this._options.outputPath, outputFilename);
      await Writer.writeFile(outputFilename, renderedSchema);
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
