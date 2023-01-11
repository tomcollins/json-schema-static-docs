const Ajv = require("ajv");
const addFormats = require("ajv-formats");

let Validator = function (schemas, ajvOptions) {
  let options = {};
  Object.assign(options, ajvOptions);
  options.schemas = schemas;
  this._ajv = new Ajv(options);
  addFormats(this._ajv);
};

Validator.prototype.addMetaEnum = function () {
  // @todo this should really perform validation to ensure that the input is safe
  this._ajv.addKeyword({
    keyword: "meta:enum",
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
