const fastGlob = require('fast-glob');
const $RefParser = require("json-schema-ref-parser");

var Resolver = function(){}

Resolver.resolveSchemas = async function(fileGlob, resolvers) {
  const files = fastGlob.sync(fileGlob);
  const results = await Promise.all(files.map(async file => {
    let resolvedSchema = await Resolver.resolveSchema(file, resolvers)
      .catch(e => {
        console.error('Error resolving', file);
        console.error(e.message);
      });
      return {
        filename: file,
        data: resolvedSchema
      };
  }));
  return results.filter(results => results.data != undefined);
};

Resolver.resolveSchema = async function(schemaToResolve, resolvers) {
  return await $RefParser.dereference(schemaToResolve, { resolve: resolvers });
};

module.exports = Resolver;