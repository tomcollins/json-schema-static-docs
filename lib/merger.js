const _ = require("lodash");
const pointer = require("jsonpointer");
const { CustomConsole } = require("@jest/console");

const getFilename = (path) => {
  let parts = path.split("/");
  return parts[parts.length - 1];
};

const resolveRef = (
  unresolvedSchema,
  mergedSchema,
  unresolvedProperty,
  mergedProperty
) => {
  let ref;
  let isArray = false;
  if (unresolvedProperty.type === "array") {
    isArray = true;
    ref = unresolvedProperty.items?.$ref;
  } else {
    ref = unresolvedProperty.$ref;
  }

  if (!ref) {
    return;
  } else if (ref.substr(0, 1) !== "#") {
    mergedProperty.$ref = ref;
    return;
  }

  let refPointer = ref.substr(1);
  let resolvedRef;
  try {
    resolvedRef = pointer.get(unresolvedSchema, refPointer);
  } catch (e) {
    console.error(
      "Error resolving JSON pointer",
      refPointer,
      "in property",
      property.title,
      "of schema",
      unresolvedSchema.$id
    );
    console.error(e);
  }

  // @todo technically this could also require resolution
  let finalRef = resolvedRef.$ref || ref;
  if (isArray) {
    mergedProperty.items.$ref = finalRef;
  } else {
    mergedProperty.$ref = finalRef;
  }

  // @todo handle allOf, anyOf
  if (resolvedRef.oneOf) {
    resolvedRef.oneOf.forEach((oneItem, index) => {
      if (oneItem.$ref) {
        let mergedResolvedRef = pointer.get(mergedSchema, refPointer);
        if (mergedResolvedRef.oneOf && mergedResolvedRef.oneOf[index]) {
          mergedResolvedRef.oneOf[index].$ref = oneItem.$ref;
        }
      }
    });
  }

  return;
};

const mergeProperty = (unresolvedSchema, mergedSchema, key) => {
  if (!unresolvedSchema.properties || !mergedSchema.properties) {
    return;
  }

  let unresolvedProperty = unresolvedSchema.properties[key];
  let mergedProperty = mergedSchema.properties[key];

  if (mergedProperty === undefined) {
    return;
  }

  mergedProperty.isRequired =
    Array.isArray(mergedSchema.required) && mergedSchema.required.includes(key);

  // @todo this is a hack to handle a $ref that points to an external
  // object with a oneOf that contains external refs
  // the merged/resolved object does not show the middle links
  if (unresolvedProperty.$ref && mergedProperty.oneOf) {
    mergedProperty.oneOf.forEach((one) => {
      one.$ref = one.$id;
    });
  }

  resolveRef(
    unresolvedSchema,
    mergedSchema,
    unresolvedProperty,
    mergedProperty
  );

  // if (mergedProperty.properties) {
  //   for (const key in mergedProperty.properties) {
  //     // let property = mergedProperty.properties[key];
  //     // property.isRequired =
  //     //   Array.isArray(property.required) && property.required.includes(key);

  //     mergeProperty(unresolvedProperty, mergedProperty, key);
  //   }
  // }
};

var Merger = function () {};

// resolvedSchemas do not have any $ref data
// add the $ref from the related unresolvedSchemas into each resolvedSchema
Merger.mergeSchemas = function (
  unresolvedSchemas,
  resolvedSchemas,
  additionalDataResults
) {
  return unresolvedSchemas.map((unresolvedSchema) => {
    let resolvedSchema = resolvedSchemas.find(
      (resolvedSchema) => resolvedSchema.filename === unresolvedSchema.filename
    );

    if (!resolvedSchema) {
      throw "Unable to resolve schema " + unresolvedSchema.filename;
    }

    let mergedSchema = _.cloneDeep(resolvedSchema);
    mergedSchema.cleanSchema = _.cloneDeep(resolvedSchema.data);

    if (mergedSchema.data.properties) {
      for (const key in mergedSchema.data.properties) {
        mergeProperty(unresolvedSchema.data, mergedSchema.data, key);
      }
    }

    // @todo handle top-level oneOf, allOf, anyOf
    if (mergedSchema.data.oneOf) {
      mergedSchema.data.oneOf.forEach((one, index) => {
        // @todo this is going to throw exceptions
        mergedSchema.data.oneOf[index].$ref =
          unresolvedSchema.data.oneOf[index].$ref;
      });
    }

    if (additionalDataResults) {
      let schemaFilename = getFilename(resolvedSchema.filename);
      Object.entries(additionalDataResults).map((keyValue) => {
        let additionalDataKey = keyValue[0];
        let additionalDataResults = keyValue[1];
        let additionalDataItem = additionalDataResults.find(
          (additionalDataResult) => {
            return getFilename(additionalDataResult.filename) == schemaFilename;
          }
        );
        if (additionalDataItem !== undefined) {
          mergedSchema[additionalDataKey] = additionalDataItem;
        }
      });
    }

    mergedSchema.schema = mergedSchema.data;
    delete mergedSchema.data;

    mergedSchema.unresolvedSchema = unresolvedSchema.data;

    return mergedSchema;
  });
};

module.exports = Merger;
