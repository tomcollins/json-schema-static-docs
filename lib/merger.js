const _ = require('lodash')
const pointer = require('json-pointer');

const getFilename = path => {
  let parts = path.split('/');
  return parts[parts.length-1];
};

const resolveRef = (unresolvedSchema, mergedSchema, unresolvedProperty, mergedProperty) => {
  let ref = unresolvedProperty.$ref;

  if (!ref || ref.substr(0,1) !== '#') {
    // @todo better handling?
    // would this get picked up in validation?
    return;
  }
  let refPointer = ref.substr(1);
  let resolvedRef;
  try {
    resolvedRef = pointer.get(unresolvedSchema.data, refPointer);
  } catch(e) {
    console.error('Error resolving JSON pointer', refPointer, 'in property', property.title, 'of schema', unresolvedSchema.filename);
    console.error(e);
  }

  if (resolvedRef.$ref) {
    // @todo technically this could also require resolution
    mergedProperty.$ref = resolvedRef.$ref;
    // @todo technically this could also require resolution
  } else {
    mergedProperty.$ref = ref;
  }
  if (resolvedRef.items && resolvedRef.items.$ref) {
    mergedProperty.$ref = resolvedRef.items.$ref;
  }
  
  // @todo handle allOf, anyOf
  if (resolvedRef.oneOf) {
    resolvedRef.oneOf.forEach((oneItem, index) => {
      if (oneItem.$ref) {
        let mergedResolvedRef = pointer.get(mergedSchema.data, refPointer);
        if (mergedResolvedRef.oneOf && mergedResolvedRef.oneOf[index]) {
          mergedResolvedRef.oneOf[index].$ref = oneItem.$ref;
        }
      }
    });
  }

  return;
}

const mergeProperty = (unresolvedSchema, mergedSchema, key) => {
  let unresolvedProperty = unresolvedSchema.data.properties[key];
  let mergedProperty = mergedSchema.data.properties[key];

  if (mergedProperty === undefined) {
    return;
  }

  resolveRef(unresolvedSchema, mergedSchema, unresolvedProperty, mergedProperty);

  mergedProperty.isRequired = Array.isArray(mergedSchema.data.required) && mergedSchema.data.required.includes(key);
}

var Merger = function(){}

// resolvedSchemas do not have any $ref data 
// add the $ref from the related unresolvedSchemas into each resolvedSchema
Merger.mergeSchemas = function(unresolvedSchemas, resolvedSchemas, additionalDataResults) {
  return unresolvedSchemas.map(unresolvedSchema => {
    let resolvedSchema = resolvedSchemas.find(resolvedSchema => resolvedSchema.filename === unresolvedSchema.filename);
    let mergedSchema = _.cloneDeep(resolvedSchema);

    if (mergedSchema.data.properties) {
      for (const key in mergedSchema.data.properties) {
        mergeProperty(unresolvedSchema, mergedSchema, key);
      };
    }

    // @todo handle top-level oneOf, allOf, anyOf

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