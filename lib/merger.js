const clonedeep = require('lodash/clonedeep')

var Merger = function(){}

// resolvedSchemas do not have any $ref data 
// add the $ref from the related unresolvedSchemas into each resolvedSchema
Merger.mergeSchemas = function(unresolvedSchemas, resolvedSchemas, examples) {
  return unresolvedSchemas.map(unresolvedSchema => {
    let resolvedSchema = resolvedSchemas.find(resolvedSchema => resolvedSchema.filename === unresolvedSchema.filename);

    let mergedSchema = clonedeep(resolvedSchema);
    Object.entries(mergedSchema.schema.properties).map( keyValue => {
      let unresolvedProperty = unresolvedSchema.schema.properties[keyValue[0]];
      if (unresolvedProperty !== undefined && unresolvedProperty.$ref !== undefined) {
        keyValue[1].$ref = unresolvedProperty.$ref;
      }
    });

    mergedSchema.examples = [];
    if (examples) {
      let expectedFilenameParts = resolvedSchema.filename.split('/');
      let expectedFilename = expectedFilenameParts[expectedFilenameParts.length-1];
      // trim .json
      expectedFilename = expectedFilename.substr(0, expectedFilename.length-5);
      let expectedFilenameRegExp = new RegExp('(.*)\/' + expectedFilename +'(.*).json', 'i');
      mergedSchema.examples = examples.filter(example => {
        return example.filename.match(expectedFilenameRegExp);
      });
    }

    return mergedSchema;
  });
};

module.exports = Merger;