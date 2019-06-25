const clonedeep = require('lodash/clonedeep')

var Merger = function(){}

// resolvedSchemas do not have any $ref data 
// add the $ref from the related unresolvedSchemas into each resolvedSchema
Merger.mergeSchemas = function(unresolvedSchemas, resolvedSchemas) {
  return unresolvedSchemas.map(unresolvedSchema => {
    let resolvedSchema = resolvedSchemas.find(resolvedSchema => resolvedSchema.filename === unresolvedSchema.filename);

    let mergedSchema = clonedeep(resolvedSchema);
    Object.entries(mergedSchema.schema.properties).map( keyValue => {
      let unresolvedProperty = unresolvedSchema.schema.properties[keyValue[0]];
      if (unresolvedProperty !== undefined && unresolvedProperty.$ref !== undefined) {
        keyValue[1].$ref = unresolvedProperty.$ref;
      }
    });
    return mergedSchema;
  });
};

module.exports = Merger;