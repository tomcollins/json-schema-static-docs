const _ = require('lodash');
const Merger = require('../lib/merger.js');

let unresolvedSchemas = [
  {
    filename: 'schema/file1.json',
    data: { 
      $id: 1, title: '1 unresolved', 
      properties: { property1: { $ref: '#/definitions/property1' } },
      definitions: { property1: { title: 'Definition 1' } }
    }
  },
  {
    filename: 'schema/file2.json',
    data: { 
      $id: 2, title: '2 unresolved', 
      properties: { property2: { $ref: '#/definitions/property2' } },
      definitions: { property2: { $ref: "property2.json" } }
    }
  }
];
let resolvedSchemas = [
  {
    filename: 'schema/file2.json',
    data: { $id: 2, title: '2 resolved', properties: { property2: { title: 'property2' } }, required: [] }
  },
  {
    filename: 'schema/file1.json',
    data: { $id: 1, title: '1 resolved', properties: { property1: { title: 'property1' } }, required: ['property1'] }
  }
];

let unresolvedSchemas2 = [
  {
    filename: 'schema/file3.json',
    data: { 
      $id: 3, title: '3 unresolved', 
      properties: { property1: { $ref: '#/definitions/property1' } },
      definitions: { 
        property1: { 
          oneOf: [
            { $ref: "property1.json" },
            { $ref: "property2.json" }
          ]
        } 
      }
    }
  }
];
let resolvedSchemas2 = [
  {
    filename: 'schema/file3.json',
    data: { 
      $id: 3, title: '3 resolved', 
      properties: { 
        property1: { 
          oneOf: [
            { 
              title: 'oneOfProperty1'
            },
            { 
              title: 'oneOfProperty2'
            }
          ]
        }  
      }, 
      required: [], 
      definitions: { 
        property1: { 
          oneOf: [
            { 
              title: 'oneOfProperty1'
            },
            { 
              title: 'oneOfProperty2'
            }
          ]
        } 
      }
    }
  }
];

test('merges schemas', () => {
  const results = Merger.mergeSchemas(unresolvedSchemas, resolvedSchemas);
  expect(results).toHaveLength(2);
  expect(results[0].filename).toBe('schema/file1.json');
  expect(results[0].schema.$id).toBe(1);
  expect(results[1].filename).toBe('schema/file2.json');
  expect(results[1].schema.$id).toBe(2);
  expect(results[0].schema.properties.property1.title).toBe('property1');
  expect(results[0].schema.properties.property1.$ref).toBe('#/definitions/property1');
  expect(results[1].schema.properties.property2.title).toBe('property2');
  expect(results[1].schema.properties.property2.$ref).toBe('property2.json');
});

test('sets $ref in definitions containing OneOf', () => {
  const results = Merger.mergeSchemas(unresolvedSchemas2, resolvedSchemas2);
  expect(results).toHaveLength(1);
  expect(results[0].filename).toBe('schema/file3.json');
  expect(results[0].schema.$id).toBe(3);
  let property = results[0].schema.properties.property1;
  expect(property.oneOf.length).toBe(2);
  expect(property.oneOf[0].title).toBe('oneOfProperty1');
  expect(property.oneOf[1].title).toBe('oneOfProperty2');
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