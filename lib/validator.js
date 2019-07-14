const Ajv = require('ajv');

let options = {
  extendRefs: 'ignore'
};

let Validator = function(){}

Validator.validateSchema = function(schema) {
  let ajv = new Ajv(options);
  try {
    let validate = ajv.compile(schema);
  } catch(e) {
    console.error('Error validating schema');
    console.error(e);
    throw e;
  }

  return true;
};

Validator.validateSchemaAndData = function(schema, data) {
  let ajv = new Ajv(options);
  var valid = ajv.validate(schema, data);
  if (!valid) {
    console.error('Error validating data against schema');
    console.error(ajv.errors);
    throw ajv.errors;
  }
  return valid;
};

module.exports = Validator;