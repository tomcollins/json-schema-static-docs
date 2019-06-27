const extend = require('extend');
const path = require('path');
const Loader = require('./loader');
const Resolver = require('./resolver');
const Merger = require('./merger');
const Renderer = require('./renderer');
const Writer = require('./writer');

const defaultOptions = {
  inputPath: 'schema',
  inputFileGlob: '**.json',
  outputPath: 'docs',
  templatePath: path.join(__dirname, '../templates/markdown'),
  resolve: {},
  additionalDataSources: {}
};

var JsonSchameStaticDocs = function(options){
  this._options = extend(true, defaultOptions, options);
};

JsonSchameStaticDocs.prototype.generate = async function() {
  const inputPathGlob = path.join(this._options.inputPath, this._options.inputFileGlob);
  const unresolvedSchemas = await Loader.loadJsonFiles(inputPathGlob);
  console.log('Loaded', unresolvedSchemas.length, 'schema files from', inputPathGlob);
  const resolvedSchemas = await Resolver.resolveSchemas(inputPathGlob, this._options.resolve);

  let additionalDataResults = [];
  await Promise.all(Object.entries(this._options.additionalDataSources).map(async keyValue  => {
    let additionalDataSourcePath = path.join(keyValue[1], '**.json');
    let results = await Loader.loadJsonFiles(additionalDataSourcePath);
    console.log('Loaded', results.length, 'additional data sources from', additionalDataSourcePath);
    if (results.length) {
      additionalDataResults[keyValue[0]] = results;
    }
  }))

  const mergedSchemas = Merger.mergeSchemas(unresolvedSchemas, resolvedSchemas, additionalDataResults);

  let renderer = new Renderer(this._options.templatePath);
  await renderer.setup();

  await Promise.all(mergedSchemas.map(async mergedSchema => {
    let renderedSchema = renderer.renderSchema(mergedSchema);
    let filenameParts = mergedSchema.filename.split('/');
    let filename = filenameParts[filenameParts.length-1];
    filename = filename.replace(/\.json$/, '.md');
    await Writer.writeFile(path.join(this._options.outputPath, filename), renderedSchema);
  }));
  console.log('Written', mergedSchemas.length, 'documents to', this._options.outputPath);

  return mergedSchemas;
};

module.exports = JsonSchameStaticDocs;