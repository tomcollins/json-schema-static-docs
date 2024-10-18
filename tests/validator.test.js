const _ = require("lodash");
const Validator = require("../lib/validator.js");

let schema = {
  $id: "1",
  title: "1 unresolved",
  type: "object",
  properties: {
    property1: {
      type: ["string", "number"],
    },
    additionalProperties: false,
  },
  additionalProperties: false,
};

let dataValid = {
  property1: "bar",
};

let dataInvalidAdditional = {
  foo: "bar",
};

let dataInvalidType = {
  property1: null,
};

const defaultOptions = { allowUnionTypes: true };

test("validates schemas and data", () => {
  const validator = new Validator([schema], defaultOptions);
  const result = validator.validateSchemaAndData(schema, dataValid);
  expect(result).toBe(true);
});

test("fails with additional properties", () => {
  expect.assertions(2);
  const validator = new Validator([schema], defaultOptions);
  let result;
  try {
    result = validator.validateSchemaAndData(schema, dataInvalidAdditional);
  } catch (e) {
    expect(e.length).toBe(1);
    expect(e[0].keyword).toBe("additionalProperties");
  }
});

test("fails with invalid type", () => {
  expect.assertions(3);
  const validator = new Validator([schema], defaultOptions);
  let result;
  try {
    result = validator.validateSchemaAndData(schema, dataInvalidType);
  } catch (e) {
    expect(e.length).toBe(1);
    expect(e[0].keyword).toBe("type");
    expect(e[0].schemaPath).toBe("#/properties/property1/type");
  }
});

let draft2020Schema = {
  $id: "2",
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "2 draft 2020-12",
  type: "object",
  properties: {
    property2: {
      type: "string",
    },
  },
  additionalProperties: false,
};

let draft2020DataValid = {
  property2: "foo",
};

let draft2020DataInvalid = {
  property2: 123,
};

test("validates draft 2020-12 schemas and data", () => {
  const validator = new Validator([draft2020Schema], defaultOptions);
  const result = validator.validateSchemaAndData(draft2020Schema, draft2020DataValid);
  expect(result).toBe(true);
});

test("fails with invalid type for draft 2020-12 schema", () => {
  expect.assertions(3);
  const validator = new Validator([draft2020Schema], defaultOptions);
  let result;
  try {
    result = validator.validateSchemaAndData(draft2020Schema, draft2020DataInvalid);
  } catch (e) {
    expect(e.length).toBe(1);
    expect(e[0].keyword).toBe("type");
    expect(e[0].schemaPath).toBe("#/properties/property2/type");
  }
});
