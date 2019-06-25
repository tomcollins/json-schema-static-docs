var fs = require('fs');
var rimraf = require("rimraf");

const JsonSchameStaticDocs = require('../lib/json-schema-static-docs.js');

let testOptions = {
  inputPath: './tests/examples/schema/',
  outputPath: './tests/docs/'
};

beforeEach(() => {
  if (!fs.existsSync(testOptions.outputPath)){
    fs.mkdirSync(testOptions.outputPath);
  }
});

afterEach(() => {
  rimraf.sync(testOptions.outputPath);
});

test('resolves single schema', async () => {
  const jsonSchameStaticDocs = new JsonSchameStaticDocs(testOptions);
  await jsonSchameStaticDocs.generate();
});