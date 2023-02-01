const fs = require("fs");
const path = require("path");
const fg = require("fast-glob");

const removeSourcePathPrefix = (filename, sourcePath) => {
  let result = filename
    .replace(
      new RegExp(
        `/Users/collinst/Workspace/json-schema-static-docs/gh-pages/examples`
      ),
      ""
    )
    .replace(/^\//, "");

  return result;
};

const formatTitle = (value) => {
  return value.substr(0, 1).toUpperCase() + value.substr(1);
};

const formatLink = (filename) => {
  // const relativeFilename = filename.replace(docsPath, "").substr(1);
  const label = filename.replace(".md", ".html");
  const url = filename.replace(".md", ".html");

  return `- [${label}](${url})\n`;
};

const formatHeading = (value, index) => {
  let heading = "#";
  for (var i = 0; i <= index; i++) {
    heading += "#";
  }
  heading += " ";
  return heading + formatTitle(value) + "\n";
};

const updateHeadings = (
  currentHeading,
  markdown,
  filenameParts,
  startingLevel
) => {
  filenameParts.forEach((filenamePart, index) => {
    if (
      index >= startingLevel &&
      // do not make the actual filename a heading
      index < filenameParts.length - 1 &&
      // only render heading if there has been a change in value
      (!currentHeading[index] || currentHeading[index] !== filenamePart)
    ) {
      markdown += `\n${formatHeading(filenamePart, index - startingLevel)}`;
    }
  });

  currentHeading = filenameParts;

  return { currentHeading, markdown };
};

const renderFilenames = (filenames, startingLevel, sourcePath) => {
  let markdown = "";
  let currentHeading = [];
  let currentDepth = 0;

  filenames.forEach((filename) => {
    if (!filename.match(/index.md$/)) {
      const partialFilename = removeSourcePathPrefix(filename, sourcePath);

      const filenameParts = partialFilename.split("/");
      if (!filenameParts) {
        filenameParts = [partialFilename];
      }

      if (filenameParts.length < currentDepth) {
        markdown += `\n`;
      }
      currentDepth = filenameParts.length;

      ({ currentHeading, markdown } = updateHeadings(
        currentHeading,
        markdown,
        filenameParts,
        startingLevel
      ));
      markdown += formatLink(partialFilename);
    }
  });
  return markdown;
};

const sortFilenames = (filenames) => {
  return filenames.sort((a, b) => {
    return a >= b;
  });
};

const createIndex = async (indexPath, sourcePath, options) => {
  options = options || {};

  let files = await fg([sourcePath + "/**"]);
  files = sortFilenames(files);

  let title = options.title || "Index of Schema";
  let markdown = `# ${title}\n`;
  markdown += renderFilenames(files, 0, sourcePath);
  fs.writeFileSync(indexPath, markdown);
};

module.exports = {
  createIndex,
};
