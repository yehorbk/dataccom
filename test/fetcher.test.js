const mocha = require('mocha');
const assert = require('assert');

const Fetcher = require('../lib/fetcher');

mocha.describe('Fetcher test', () => {
  mocha.it('Chain of simple functions', () => {
    const callback = (name, value) => () => ({ [name]: value });
    const fetcher = new Fetcher();
    fetcher.collect(callback('name', 'John'));
    fetcher.collect(callback('age', 27));
    fetcher.collect(callback('position', 'Developer'));
    const expected = {
      error: null,
      data: { name: 'John', age: 27, position: 'Developer' },
    };
    fetcher.multiple((error, data) => {
      const actual = { error, data };
      assert.deepStrictEqual(actual, expected);
    });
  });

  mocha.it('Chain of promise functions', () => {
    const callback = (name, value) => () =>
      new Promise(resolve => resolve({ [name]: value }));
    const fetcher = new Fetcher();
    fetcher.collect(callback('name', 'John'));
    fetcher.collect(callback('age', 27));
    fetcher.collect(callback('position', 'Developer'));
    const expected = {
      error: null,
      data: { name: 'John', age: 27, position: 'Developer' },
    };
    fetcher.multiple((error, data) => {
      const actual = { error, data };
      assert.deepStrictEqual(actual, expected);
    });
  });
});
