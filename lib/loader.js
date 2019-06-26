const fastGlob = require('fast-glob');
const loadJsonFile = require('load-json-file');

const loadFiles = async files => {
  return await Promise.all(files.map(async file => {
    let data = await loadJsonFile(file)
      .catch(e => {
        console.error(e);
      });
    return {
      filename: file,
      data: data
    };
  }));
}

var Loader = function(){}

Loader.loadJsonFiles = async function(glob) {
  const files = fastGlob.sync(glob);
  const results = await loadFiles(files);
  return results.filter(result => result.data !== undefined);
};

module.exports = Loader;