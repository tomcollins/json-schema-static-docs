const fs = require('fs');

var Writer = function(){}

Writer.writeFile = async function(filename, data) {
  fs.writeFileSync(filename, data);
};

module.exports = Writer;