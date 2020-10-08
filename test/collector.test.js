const mocha = require('mocha');
const assert = require('assert');

const Executor = require('../lib/collector');

mocha.describe('Collector test', () => {
  mocha.it('Chain of simple functions', () => {
    const callback = (name, value) => () => ({ [name]: value });
    const executor = new Executor();
    executor.collect(callback('name', 'John'));
    executor.collect(callback('age', 2));
    executor.collect(callback('position', 'Developer'));
    const expected = { name: 'John', age: 2, position: 'Developer' };
    executor.run(data => {
      assert.deepStrictEqual(data, expected);
    });
  });

  mocha.it('Chain of promise functions', () => {
    const callback = (name, value) => () =>
      new Promise(resolve => resolve({ [name]: value }));
    const executor = new Executor();
    executor.collect(callback('name', 'John'));
    executor.collect(callback('age', 2));
    executor.collect(callback('position', 'Developer'));
    const expected = { name: 'John', age: 2, position: 'Developer' };
    executor.run(data => {
      assert.deepStrictEqual(data, expected);
    });
  });
});
