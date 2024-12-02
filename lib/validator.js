const Ajv = require("ajv/dist/2019");
const Ajv2020 = require("ajv/dist/2020");
const draft7MetaSchema = require("ajv/dist/refs/json-schema-draft-07.json");
const draft6MetaSchema = require("ajv/dist/refs/json-schema-draft-06.json");
const addFormats = require("ajv-formats");
const { JsonSchemaVersions } = require("./utils");

let Validator = function (schemas, ajvOptions, jsonSchemaVersion) {
  let options = {};
  Object.assign(options, ajvOptions);
  if (jsonSchemaVersion === JsonSchemaVersions.DRAFT_2020_12) {
    // support draft-202-12 only
    this._ajv = new Ajv2020(options);
  } else {
    // support draft-06, draft-07, draft-2019-09
    this._ajv = new Ajv(options);
    this._ajv.addMetaSchema(draft7MetaSchema);
    this._ajv.addMetaSchema(draft6MetaSchema);
  }
  schemas.forEach((schema) => {
    this._ajv.addSchema(schema);
  });
  addFormats(this._ajv);

  // Add validation for meta:title and meta:description
  this._ajv.addKeyword({
    keyword: "meta:title",
    type: "string",
    errors: false,
  });

  this._ajv.addKeyword({
    keyword: "meta:description",
    type: "string",
    errors: false,
  });
};

Validator.prototype.addMetaEnum = function () {
  // @todo this should really perform validation to ensure that the input is safe
  this._ajv.addKeyword({
    keyword: "meta:enum",
    valid: true,
    errors: false,
  });
};

Validator.prototype.validateSchema = function (schema) {
  let validate = this._ajv.compile(schema);
  return true;
};

Validator.prototype.validateSchemaAndData = function (schema, data) {
  var valid = this._ajv.validate(schema, data);
  if (!valid) {
    throw this._ajv.errors;
  }
  return valid;
};

module.exports = Validator;
