const fastGlob = require('fast-glob');
const $RefParser = require("json-schema-ref-parser");

var Resolver = function(){}

Resolver.resolveSchemas = async function(fileGlob) {
  const files = fastGlob.sync(fileGlob);
  const results = await Promise.all(files.map(async file => {
    let resolvedSchema = await Resolver.resolveSchema(file)
      .catch(e => {
        console.error(e.message);
      });
      return {
        filename: file,
        schema: resolvedSchema
      };
  }));
  return results.filter(results => results.schema != undefined);
};

Resolver.resolveSchema = async function(schemaToResolve) {
  let resolvedSchema;
  try {
    resolvedSchema = await $RefParser.dereference(schemaToResolve);
  } catch(e) {
    console.error(e.message);
  }
  return resolvedSchema;
};

module.exports = Resolver;