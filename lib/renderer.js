let RendererMarkdown = require('./renderer-markdown');

function Renderer(){
  this.renderer = new RendererMarkdown();
};

Renderer.prototype.setup = async function() {
  await this.renderer.setup();
};

Renderer.prototype.renderSchema = function(data) {
  return this.renderer.renderSchema(data);
};

module.exports = Renderer;
