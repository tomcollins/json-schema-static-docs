const fastGlob = require('fast-glob');
const $RefParser = require("json-schema-ref-parser");

var Resolver = function(){}

Resolver.resolveSchemas = async function(fileGlob, resolvers) {
  const files = fastGlob.sync(fileGlob);
  const results = await Promise.all(files.map(async file => {
    let resolvedSchema = await Resolver.resolveSchema(file, resolvers)
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

Resolver.resolveSchema = async function(schemaToResolve, resolvers) {
  let resolvedSchema;
  try {
    resolvedSchema = await $RefParser.dereference(schemaToResolve, { resolve: resolvers });
  } catch(e) {
    console.error(e.message);
  }
  return resolvedSchema;
};

module.exports = Resolver;