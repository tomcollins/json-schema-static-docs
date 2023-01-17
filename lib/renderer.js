let RendererMarkdown = require("./renderer-markdown");

function Renderer(templatePath, linkBasePath, addFrontMatter) {
  this.renderer = new RendererMarkdown(
    templatePath,
    linkBasePath,
    addFrontMatter
  );
}

Renderer.prototype.setup = async function () {
  await this.renderer.setup();
};

Renderer.prototype.renderSchema = function (data) {
  return this.renderer.renderSchema(data);
};

module.exports = Renderer;
