const mocha = require('mocha');
const assert = require('assert');

mocha.describe('Controller test', () => {
  mocha.it('Should pass', () => {
    assert.strictEqual(true, true);
  });
});
