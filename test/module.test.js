const test = require('node:test');
const assert = require('node:assert/strict');
const mod = require('../index.js');

test('the module shell is an Apostrophe module with the mcp alias', () => {
  assert.equal(typeof mod, 'object');
  assert.equal(mod.options.alias, 'mcp');
});
