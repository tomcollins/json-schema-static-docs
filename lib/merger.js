const _ = require('lodash')
const pointer = require('json-pointer');

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

    const hasRequired = Array.isArray(mergedSchema.data.required) && mergedSchema.data.required.length > 0;

    if (mergedSchema.data.properties) {
      Object.entries(mergedSchema.data.properties).map( keyValue => {
        let unresolvedProperty = unresolvedSchema.data.properties[keyValue[0]];
        let ref = unresolvedProperty.$ref;
        if (ref && ref.substr(0,1) === '#') {
          let refPointer = ref.substr(1);
          // handle bad pointer
          let resolvedRef = pointer.get(unresolvedSchema.data, refPointer);
          if (resolvedRef.items && resolvedRef.items.$ref) {
            ref = resolvedRef.items.$ref;
          } else {
            ref = undefined;
          }
        } 
        if (unresolvedProperty !== undefined && ref !== undefined) {
          keyValue[1].$ref = ref;
        }

        keyValue[1].isRequired = hasRequired && mergedSchema.data.required.includes(keyValue[0]);
      });
    }

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