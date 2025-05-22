const fs = require('fs');
const path = require('path');

var Writer = function(){}

Writer.writeFile = async function(filename, data) {
  let parts = filename.split(path.sep);
  let dirName = parts.splice(0, parts.length-1).join('/');
  if (dirName && !fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, {recursive:true})
  }
  fs.writeFileSync(filename, data);
};

module.exports = Writer;