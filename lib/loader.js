const fastGlob = require("fast-glob");
const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);

const loadFiles = async (files) => {
  return await Promise.all(
    files.map(async (file) => {
      let jsonDataObject;

      const fileContent = await readFileAsync(file).catch((e) => {
        console.error("Error loading JSON file: ", file);
        console.error(e);
      });

      try {
        jsonDataObject = JSON.parse(fileContent);
      } catch (e) {
        console.error("Error parsing JSON file: ", file);
        console.error(e);
      }

      return {
        filename: file,
        data: jsonDataObject,
      };
    })
  );
};

var Loader = function () {};

Loader.loadJsonFiles = async function (glob) {
  const files = fastGlob.sync(glob);
  const results = await loadFiles(files);
  return results.filter((result) => result.data !== undefined);
};

module.exports = Loader;
