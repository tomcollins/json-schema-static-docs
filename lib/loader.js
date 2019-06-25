const fastGlob = require('fast-glob');
const loadJsonFile = require('load-json-file');

const loadFiles = async files => {
  return await Promise.all(files.map(async file => {
    let schema = await loadJsonFile(file)
      .catch(e => {
        console.error(e);
      });
    return {
      filename: file,
      schema: schema
    };
  }));
}

var Loader = function(){}

Loader.loadJsonFiles = async function(glob) {
  const files = fastGlob.sync(glob);
  const results = await loadFiles(files);
  return results.filter(result => result.schema !== undefined);
};

module.exports = Loader;