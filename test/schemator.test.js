const mocha = require('mocha');
const assert = require('assert');

mocha.describe('Schemator test', () => {
  mocha.it('Should pass', () => {
    assert.strictEqual(true, true);
  });
});
