let RendererMarkdown = require('./renderer-markdown');

function Renderer(){
  this.renderer = new RendererMarkdown();
  console.log('this._renderer', this.renderer);
};

Renderer.prototype.setup = async function() {
  await this.renderer.setup();
};

Renderer.prototype.renderSchema = data => {
  return this.renderer.renderSchema(data);
};

module.exports = Renderer;
