const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const schemaTemplatePath = path.join(__dirname, '../templates/markdown/schema.hbs');

Handlebars.registerHelper('json', function(context) {
  return JSON.stringify(context, undefined, 4);
});

Handlebars.registerHelper('jsonSchemaType', function(property) {
  
  let type = property.type;
  let ref = property.$ref;

  if (ref !== undefined && ref.match(/\.json$/)) {
    let refParts = ref.split('/');
    let filename = refParts[refParts.length-1];
    filename = filename.substr(0, filename.length - 5);
    
    // @todo this should not exist in this package
    // maybe pass in as a link resolver function ?
    type = '[' + property.title.replace(/( )+/, '') +'](./' +filename + '.html)';
  } else {
    type = type.substr(0, 1).toUpperCase() + type.substr(1);
  }

  return new Handlebars.SafeString(type);
});

var RendererMarkdown = function(){}

RendererMarkdown.prototype.setup = async function(data) {
  let templateSource = await readFile(schemaTemplatePath);
  this.templateSchema = Handlebars.compile(templateSource.toString());
}

RendererMarkdown.prototype.renderSchema = function(data) {
  let result = this.templateSchema(data);

  // this fixes tables that have been broken by unintended double line breaks
  // introduced by optional rows.
  // could possibly be avoided by use of ~ in templates
  result = result.replace(/\|(\n)+\|/g, '|\n|');
  
  return result;
};

module.exports = RendererMarkdown;