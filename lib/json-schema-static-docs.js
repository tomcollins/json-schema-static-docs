const extend = require('extend');
const Loader = require('./loader');
const Resolver = require('./resolver');
const Merger = require('./merger');
const Renderer = require('./renderer');
const Writer = require('./writer');

const defaultOptions = {
  inputPath: 'schema',
  outputPath: 'docs',
  fileGlob: '**.json'
};

var JsonSchameStaticDocs = function(options){
  this._options = extend(true, defaultOptions, options);
  // this._rawSchema = {};
  //this._ajv = ajv;
  //this._schemaPathMap=schemaMap;
};

JsonSchameStaticDocs.prototype.generate = async function() {
  const fileGlob = this._options.inputPath + this._options.fileGlob;
  const unresolvedSchemas = await Loader.loadJsonFiles(fileGlob);
  const resolvedSchemas = await Resolver.resolveSchemas(fileGlob);
  const mergedSchemas = Merger.mergeSchemas(unresolvedSchemas, resolvedSchemas);
  let renderer = new Renderer();
  renderer.setup();

  // console.log('mergedSchemas', mergedSchemas);
  mergedSchemas.map(async mergedSchema => {
    // console.log('mergedSchema', mergedSchema);
    let renderedSchema = renderer.renderSchema(mergedSchema);
    // console.log('renderedSchema', renderedSchema);
    let filenameParts = mergedSchema.filename.split('/');
    //console.log('filenameParts', filenameParts);
    let filename = filenameParts[filenameParts.length-1];
    filename = filename.replace(/\.json$/, '.md');
    // console.log('filename', filename);
    await Writer.writeFile(this._options.outputPath + filename, renderedSchema);
  });
  // console.log('resolvedSchemas', resolvedSchemas);
};

module.exports = JsonSchameStaticDocs;