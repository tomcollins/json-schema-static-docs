const _ = require('lodash');
const Merger = require('../lib/merger.js');

let unresolvedSchemas = [
  {
    filename: 'schema/file1.json',
    data: { 
      $id: 1, name: '1 unresolved', 
      properties: { property1: { $ref: '#/definitions/property1' } },
      definitions: { property1: { $ref: "property1.json" } }
    }
  },
  {
    filename: 'schema/file2.json',
    data: { 
      $id: 2, name: '2 unresolved', 
      properties: { property2: { $ref: '#/definitions/property2' } },
      definitions: { property2: { $ref: "property2.json" } }
    }
  }
];
let resolvedSchemas = [
  {
    filename: 'schema/file2.json',
    data: { $id: 2, name: '2 resolved', properties: { property2: { name: 'property2' } }, required: [] }
  },
  {
    filename: 'schema/file1.json',
    data: { $id: 1, name: '1 resolved', properties: { property1: { name: 'property1' } }, required: ['property1'] }
  }
];

test('merges schemas', () => {
  const results = Merger.mergeSchemas(unresolvedSchemas, resolvedSchemas);
  expect(results).toHaveLength(2);
  expect(results[0].filename).toBe('schema/file1.json');
  expect(results[0].schema.$id).toBe(1);
  expect(results[1].filename).toBe('schema/file2.json');
  expect(results[1].schema.$id).toBe(2);
  expect(results[0].schema.properties.property1.name).toBe('property1');
  expect(results[0].schema.properties.property1.$ref).toBe('#/definitions/property1');
  expect(results[1].schema.properties.property2.name).toBe('property2');
  expect(results[1].schema.properties.property2.$ref).toBe('#/definitions/property2');
});

test('sets isRequired on each schama property', () => {
  const results = Merger.mergeSchemas(unresolvedSchemas, resolvedSchemas);
  expect(results).toHaveLength(2);
  expect(results[0].schema.properties.property1.isRequired).toBe(true);
  expect(results[1].schema.properties.property2.isRequired).toBe(false);
});

test('handles schema with no properties', () => {
  let unresolvedSchemasWithNoProperties = _.cloneDeep(unresolvedSchemas);
  let resolvedSchemasWithNoProperties = _.cloneDeep(resolvedSchemas);

  delete unresolvedSchemasWithNoProperties[0].data.properties;
  delete unresolvedSchemasWithNoProperties[1].data.properties;
  delete resolvedSchemasWithNoProperties[0].data.properties;
  delete resolvedSchemasWithNoProperties[1].data.properties;

  const results = Merger.mergeSchemas(unresolvedSchemasWithNoProperties, resolvedSchemasWithNoProperties);
  expect(results).toHaveLength(2);
  expect(results[0].filename).toBe('schema/file1.json');
  expect(results[0].schema.$id).toBe(1);
  expect(results[1].filename).toBe('schema/file2.json');
  expect(results[1].schema.$id).toBe(2);
});