let RendererMarkdown = require('./renderer-markdown');

function Renderer(templatePath){
  this.renderer = new RendererMarkdown(templatePath);
};

Renderer.prototype.setup = async function() {
  await this.renderer.setup();
};

Renderer.prototype.renderSchema = function(data) {
  return this.renderer.renderSchema(data);
};

module.exports = Renderer;
