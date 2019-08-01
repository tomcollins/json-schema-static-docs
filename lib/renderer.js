let RendererMarkdown = require('./renderer-markdown');

function Renderer(templatePath, linkBasePath){
  this.renderer = new RendererMarkdown(templatePath, linkBasePath);
};

Renderer.prototype.setup = async function() {
  await this.renderer.setup();
};

Renderer.prototype.renderSchema = function(data) {
  return this.renderer.renderSchema(data);
};

module.exports = Renderer;
