const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

const schemaPath = path.resolve(__dirname, "../../gh-pages/yml/ajv-2020/draft-2020-12/prefix-items.yml");
const schema = yaml.load(fs.readFileSync(schemaPath, "utf8"));

test("schema title is correct", () => {
  expect(schema.title).toBe("Draft 2020-12 - Prefix Items");
});

test("schema description is correct", () => {
  expect(schema.description).toBe("A schema demonstrating the use of prefixItems");
});

test("schema is secure", () => {
  expect(schema.secure).toBe(true);
});
