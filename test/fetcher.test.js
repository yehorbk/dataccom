const mocha = require('mocha');
const assert = require('assert');

const Fetcher = require('../lib/fetcher');

mocha.describe('Fetcher test', () => {
  mocha.it('Chain of simple functions', () => {
    const callback = (name, value) => () => ({ [name]: value });
    const fetcher = new Fetcher();
    fetcher.collect(callback('name', 'John'));
    fetcher.collect(callback('age', 2));
    fetcher.collect(callback('position', 'Developer'));
    const expected = { name: 'John', age: 2, position: 'Developer' };
    fetcher.run(data => {
      assert.deepStrictEqual(data, expected);
    });
  });

  mocha.it('Chain of promise functions', () => {
    const callback = (name, value) => () =>
      new Promise(resolve => resolve({ [name]: value }));
    const fetcher = new Fetcher();
    fetcher.collect(callback('name', 'John'));
    fetcher.collect(callback('age', 2));
    fetcher.collect(callback('position', 'Developer'));
    const expected = { name: 'John', age: 2, position: 'Developer' };
    fetcher.run(data => {
      assert.deepStrictEqual(data, expected);
    });
  });
});
