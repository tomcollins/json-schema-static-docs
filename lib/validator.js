const Ajv = require('ajv');

let options = {
  extendRefs: 'ignore'
};

let Validator = function(){}

Validator.validateSchema = function(schema) {
  let ajv = new Ajv(options);
  let validate = ajv.compile(schema);
  return true;
};

Validator.validateSchemaAndData = function(schema, data) {
  let ajv = new Ajv(options);
  var valid = ajv.validate(schema, data);
  if (!valid) {
    throw ajv.errors;
  }
  return valid;
};

module.exports = Validator;