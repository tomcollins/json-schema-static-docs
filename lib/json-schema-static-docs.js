const extend = require('extend');
const path = require('path');
const Loader = require('./loader');
const Resolver = require('./resolver');
const Merger = require('./merger');
const Renderer = require('./renderer');
const Writer = require('./writer');

const defaultOptions = {
  inputPath: 'schema',
  outputPath: 'docs',
  fileGlob: '**.json',
  resolve: {}
};

var JsonSchameStaticDocs = function(options){
  this._options = extend(true, defaultOptions, options);
};

JsonSchameStaticDocs.prototype.generate = async function() {
  const fileGlob = path.join(this._options.inputPath, this._options.fileGlob);
  const unresolvedSchemas = await Loader.loadJsonFiles(fileGlob);
  const resolvedSchemas = await Resolver.resolveSchemas(fileGlob, this._options.resolve);
  const mergedSchemas = Merger.mergeSchemas(unresolvedSchemas, resolvedSchemas);
  let renderer = new Renderer();
  await renderer.setup();

  mergedSchemas.map(async mergedSchema => {
    let renderedSchema = renderer.renderSchema(mergedSchema);
    let filenameParts = mergedSchema.filename.split('/');
    let filename = filenameParts[filenameParts.length-1];
    filename = filename.replace(/\.json$/, '.md');
    await Writer.writeFile(path.join(this._options.outputPath, filename), renderedSchema);
  });
};

module.exports = JsonSchameStaticDocs;