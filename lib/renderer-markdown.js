const Handlebars = require('handlebars');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const schemaTemplatePath = './templates/markdown/schema.hbs';


var RendererMarkdown = function(){}

RendererMarkdown.prototype.setup = async function(data) {
  let templateSource = await readFile(schemaTemplatePath);
  // console.log('templateSource', templateSource.toString());
  this.templateSchema = Handlebars.compile(templateSource.toString());
}

RendererMarkdown.prototype.renderSchema = function(data) {
  console.log(data);
  return this.templateSchema(data);
};

module.exports = RendererMarkdown;