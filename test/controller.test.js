const mocha = require('mocha');
const assert = require('assert');

const controller = require('../lib/controller');

mocha.describe('Controller test', () => {
  mocha.it('Chain of simple functions without scheme', async () => {
    const callback = (name, value) => ({ [name]: value });
    const result = await controller
      .chain()
      .fetch(callback, 'name', 'John')
      .fetch(callback, 'age', 27)
      .fetch(callback, 'position', 'Developer')
      .collect();
    const expected = { name: 'John', age: 27, position: 'Developer' };
    assert.deepStrictEqual(result, expected);
  });

  mocha.it('Chain of simple functions with scheme', async () => {
    const callback = (name, value) => ({ [name]: value });
    const scheme = {
      name: String,
      position: String,
    };
    const result = await controller
      .chain()
      .fetch(callback, 'name', 'John')
      .fetch(callback, 'age', 27)
      .fetch(callback, 'position', 'Developer')
      .apply(scheme)
      .collect();
    const expected = { name: 'John', position: 'Developer' };
    assert.deepStrictEqual(result, expected);
  });

  mocha.it('Chain of promise functions without scheme', async () => {
    const callback = (name, value) =>
      new Promise(resolve => resolve({ [name]: value }));
    const result = await controller
      .chain()
      .fetch(callback, 'name', 'John')
      .fetch(callback, 'age', 27)
      .fetch(callback, 'position', 'Developer')
      .collect();
    const expected = { name: 'John', age: 27, position: 'Developer' };
    assert.deepStrictEqual(result, expected);
  });

  mocha.it('Chain of promise functions with scheme', async () => {
    const callback = (name, value) =>
      new Promise(resolve => resolve({ [name]: value }));
    const scheme = {
      name: String,
      position: String,
    };
    const result = await controller
      .chain()
      .fetch(callback, 'name', 'John')
      .fetch(callback, 'age', 27)
      .fetch(callback, 'position', 'Developer')
      .apply(scheme)
      .collect();
    const expected = { name: 'John', position: 'Developer' };
    assert.deepStrictEqual(result, expected);
  });
});
