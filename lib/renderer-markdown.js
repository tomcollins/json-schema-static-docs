const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const util = require("util");
const _ = require("lodash");

const readFile = util.promisify(fs.readFile);

let refLinkBasePath = "";

const typeToLinkLabel = (label, x) => {
  if (Array.isArray(label)) {
    label = label.join(", ");
    label = `[${label}]`;
  } else {
    label = label || "";
    label = label.substr(0, 1).toUpperCase() + label.substr(1);
    label = label.replace(".md", "html");
  }
  return label;
};

const refToLink = (ref, label) => {
  let refParts = ref.split("/");
  let filename = refParts[refParts.length - 1];
  filename = filename.substr(0, filename.length - 5);

  filename = ref.replace(".json", ".html");

  label = label || filename;
  label = typeToLinkLabel(label, ref);

  // @todo this should not exist in this package
  // maybe pass in as a link resolver function ?
  // return '[' + label +'](./' +filename + '.html)';
  return '<a href="' + filename + '">' + label + "</a>";
};

const jsonSchemaType = (property) => {
  let type = property.type;
  let ref = property.$ref;

  if (type === "array") {
    ref = property.$ref;
    if (ref != undefined && ref.match(/\.json$/)) {
      type = "Array [" + refToLink(ref, property.items.title) + "]";
    } else {
      type = "Array";
    }
  } else if (ref !== undefined && ref.match(/\.json$/)) {
    type = refToLink(ref, property.title);
  } else {
    type = typeToLinkLabel(type, property);
  }

  return type;
};

Handlebars.registerHelper("json", function (context) {
  return JSON.stringify(context, undefined, 4);
});

Handlebars.registerHelper("enumValues", function (enums) {
  let html = "<ul>";
  if (Array.isArray(enums)) {
    enums.forEach((e) => {
      html += "<li>" + String(e) + "</li>";
    });
  }
  return new Handlebars.SafeString(html + "</ul>");
});

Handlebars.registerHelper("jsonSchemaType", function (property) {
  return new Handlebars.SafeString(jsonSchemaType(property));
});

const attributeRow = (name, property) => {
  let html =
    "<tr>" +
    '<td colspan="2">' +
    name +
    "</td>" +
    "<td>" +
    jsonSchemaType(property) +
    "</td>" +
    "</tr>";

  return html;
};

const oneOfRow = (name, properties) => {
  const length = Object.keys(properties).length;
  let html =
    '<tr><td rowspan="' +
    length +
    '">' +
    name +
    "</td>" +
    '<td rowspan="' +
    length +
    '">One of:</td>';
  let isFirstRow = true;

  for (const key in properties) {
    let property = properties[key];

    if (!isFirstRow) {
      html += "<tr>";
    }

    html += "<td>" + jsonSchemaType(property) + "</td>" + "</tr>";

    isFirstRow = false;
  }

  return html;
};

const oneOfArrayRow = (oneOf) => {
  const length = oneOf.length;
  let html = "";
  let isFirstRow = true;

  oneOf.forEach((one) => {
    if (isFirstRow) {
      html += '<tr><td colspan="2" rowspan="' + length + '">One of:</td>';
    } else {
      html += "<tr>";
    }

    html += "<td>" + jsonSchemaType(one) + "</td>" + "</tr>";

    isFirstRow = false;
  });

  return html;
};

const attributesTable = (schema) => {
  let properties = schema.properties;
  let html =
    "<table>" +
    '<thead><tr><th colspan="2">Name</th><th>Type</th></tr></thead>';
  +"<tbody>";

  for (const key in properties) {
    let property = properties[key];
    if (property && property.oneOf != undefined) {
      html += oneOfRow(key, property.oneOf);
    } else {
      html += attributeRow(key, property);
    }
  }

  let oneOf = schema.oneOf;
  if (Array.isArray(oneOf) && oneOf.length > 0) {
    html += oneOfArrayRow(oneOf);
  }

  html += "</tbody></table>";

  return html;
};

Handlebars.registerHelper("attributesTable", function (schema) {
  return new Handlebars.SafeString(attributesTable(schema));
});

Handlebars.registerHelper("propertyTypeRow", function (property) {
  let html = "<tr>";
  if (property.oneOf != undefined) {
    html += oneOfRow("Type", property.oneOf);
  } else {
    html +=
      '<td>Type</td><td colspan="2">' + jsonSchemaType(property) + "</td>";
  }
  html += "</tr>";
  return new Handlebars.SafeString(html);
});

var RendererMarkdown = function (templatePath, linkBasePath) {
  this.templatePath = templatePath;
  if (linkBasePath == undefined) {
    linkBasePath = "./";
  }
  refLinkBasePath = linkBasePath;
};

RendererMarkdown.prototype.setup = async function () {
  const schemaTemplatePath = path.join(this.templatePath, "schema.hbs");
  let templateSource = await readFile(schemaTemplatePath);
  this.templateSchema = Handlebars.compile(templateSource.toString());
};

RendererMarkdown.prototype.renderSchema = function (data) {
  let result = this.templateSchema(data);

  // this fixes tables that have been broken by unintended double line breaks
  // introduced by optional rows.
  // could possibly be avoided by use of ~ in templates
  result = result.replace(/\|(\n)+\|/g, "|\n|");

  return result;
};

module.exports = RendererMarkdown;
