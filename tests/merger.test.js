const Merger = require('../lib/merger.js');

let unresolvedSchemas = [
  {
    filename: 'schema/file1.json',
    schema: { $id: 1, name: '1 unresolved', properties: { property1: {$ref: '#/definitions/1' } } }
  },
  {
    filename: 'schema/file2.json',
    schema: { $id: 2, name: '2 unresolved', properties: { property2: {$ref: '#/definitions/2' } } }
  }
];
let resolvedSchemas = [
  {
    filename: 'schema/file2.json',
    schema: { $id: 2, name: '2 resolved', properties: { property2: { name: 'property2' } } }
  },
  {
    filename: 'schema/file1.json',
    schema: { $id: 1, name: '1 resolved', properties: { property1: { name: 'property1' } } }
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
  expect(results[0].schema.properties.property1.$ref).toBe('#/definitions/1');
  expect(results[1].schema.properties.property2.name).toBe('property2');
  expect(results[1].schema.properties.property2.$ref).toBe('#/definitions/2');
});