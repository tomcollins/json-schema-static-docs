const JsonSchemaVersions = {
  DRAFT_06: "https://json-schema.org/draft-06/schema",
  DRAFT_07: "https://json-schema.org/draft-07/schema",
  DRAFT_2019_09: "https://json-schema.org/draft/2019-09/schema",
  DRAFT_2020_12: "https://json-schema.org/draft/2020-12/schema",
};

const determineSchemaRelativePath = (schemaFilename, schemaInputPath) => {
  let outputFilename = schemaFilename.substr(schemaInputPath.length);
  if (outputFilename.substr(0, 1) === "/") {
    outputFilename = outputFilename.substr(1);
  }
  return outputFilename;
};

module.exports = {
  JsonSchemaVersions,
  determineSchemaRelativePath: determineSchemaRelativePath,
};
