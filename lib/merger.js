const _ = require('lodash')

const getFilename = path => {
  let parts = path.split('/');
  return parts[parts.length-1];
};

var Merger = function(){}

// resolvedSchemas do not have any $ref data 
// add the $ref from the related unresolvedSchemas into each resolvedSchema
Merger.mergeSchemas = function(unresolvedSchemas, resolvedSchemas, additionalDataResults) {
  return unresolvedSchemas.map(unresolvedSchema => {
    let resolvedSchema = resolvedSchemas.find(resolvedSchema => resolvedSchema.filename === unresolvedSchema.filename);
    let mergedSchema = _.cloneDeep(resolvedSchema);

    Object.entries(mergedSchema.data.properties).map( keyValue => {
      let unresolvedProperty = unresolvedSchema.data.properties[keyValue[0]];
      if (unresolvedProperty !== undefined && unresolvedProperty.$ref !== undefined) {
        keyValue[1].$ref = unresolvedProperty.$ref;
      }
    });

    if (additionalDataResults) {
      let schemaFilename = getFilename(resolvedSchema.filename);
      Object.entries(additionalDataResults).map( keyValue => {
        let additionalDataKey = keyValue[0];
        let additionalDataResults = keyValue[1];
        let additionalDataItem = additionalDataResults.find(additionalDataResult => {
          return getFilename(additionalDataResult.filename) == schemaFilename;
        });
        if (additionalDataItem!==undefined) {
          mergedSchema[additionalDataKey] = additionalDataItem;
        }
      });
    }

    mergedSchema.schema = mergedSchema.data;
    delete mergedSchema.data;

    return mergedSchema;
  });
};

module.exports = Merger;