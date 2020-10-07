const mocha = require('mocha');
const assert = require('assert');

const schemator = require('../lib/schemator');

mocha.describe('Schemator test', () => {
  mocha.it('Parsing a simple object', () => {
    const person = {
      name: 'John',
      age: 20,
    };
    const scheme = {
      name: String,
      age: Number,
    };
    const expected = person;
    assert.deepStrictEqual(schemator(person, scheme), expected);
  });

  mocha.it('Parsing an object with nested objects', () => {
    const person = {
      name: 'John',
      age: 20,
      pet: {
        name: 'Morgan',
      },
    };
    const scheme = {
      name: String,
      age: Number,
      pet: {
        name: String,
      },
    };
    const expected = person;
    assert.deepStrictEqual(schemator(person, scheme), expected);
  });

  mocha.it('Parsing an object with arrays', () => {
    const person = {
      name: 'John',
      age: 20,
      languages: ['JavaScript', 'Java', 'Swift'],
    };
    const scheme = {
      name: String,
      age: Number,
      languages: [String],
    };
    const expected = person;
    assert.deepStrictEqual(schemator(person, scheme), expected);
  });

  mocha.it('Parsing an object with arrays of objects', () => {
    const person = {
      name: 'John',
      age: 20,
      pets: [{ name: 'Morgan' }, { name: 'Jack' }],
    };
    const scheme = {
      name: String,
      age: Number,
      pets: [{ name: String }],
    };
    const expected = person;
    assert.deepStrictEqual(schemator(person, scheme), expected);
  });

  mocha.it('Parsing an object with arrays of objects with arrays', () => {
    const person = {
      name: 'John',
      age: 20,
      pets: [
        { name: 'Morgan', collars: ['Black', 'White'] },
        { name: 'Jack', collars: ['Blue', 'Red'] },
      ],
    };
    const scheme = {
      name: String,
      age: Number,
      pets: [{ name: String, collars: [String] }],
    };
    const expected = person;
    assert.deepStrictEqual(schemator(person, scheme), expected);
  });

  mocha.it('Parsing an object with arrays of arrays of objects', () => {
    const person = {
      name: 'John',
      age: 20,
      pets: [[{ name: 'Morgan' }], [{ name: 'Jack' }]],
    };
    const scheme = {
      name: String,
      age: Number,
      pets: [[{ name: String }]],
    };
    const expected = person;
    assert.deepStrictEqual(schemator(person, scheme), expected);
  });

  mocha.it('Parsing an object with null fields', () => {
    const person = {
      name: 'John',
      age: null,
      pets: [
        { name: 'Morgan', collars: null },
        { name: 'Jack', collars: [null, null] },
        { name: 'Andrew' },
      ],
    };
    const scheme = {
      name: String,
      age: Number,
      pets: [{ name: String, collars: [String] }],
    };
    const expected = {
      name: 'John',
      age: null,
      pets: [
        { name: 'Morgan', collars: [] },
        { name: 'Jack', collars: [null, null] },
        { name: 'Andrew', collars: [] },
      ],
    };
    assert.deepStrictEqual(schemator(person, scheme), expected);
  });

  mocha.it('Parsing an object with undefined fields', () => {
    const person = {
      name: 'John',
      age: undefined,
      pets: [
        { name: 'Morgan', collars: undefined },
        { name: 'Jack', collars: [undefined, undefined] },
        { name: 'Andrew' },
      ],
    };
    const scheme = {
      name: String,
      age: Number,
      pets: [{ name: String, collars: [String] }],
    };
    const expected = {
      name: 'John',
      age: null,
      pets: [
        { name: 'Morgan', collars: [] },
        { name: 'Jack', collars: [null, null] },
        { name: 'Andrew', collars: [] },
      ],
    };
    assert.deepStrictEqual(schemator(person, scheme), expected);
  });

  mocha.it('Parsing an object with NaN field', () => {
    const person = {
      name: 'John',
      age: NaN,
    };
    const scheme = {
      name: String,
      age: Number,
    };
    const expected = person;
    assert.deepStrictEqual(schemator(person, scheme), expected);
  });

  mocha.it('Parsing primitive', () => {
    const number = 10;
    const scheme = Number;
    const expected = number;
    assert.deepStrictEqual(schemator(number, scheme), expected);
  });
});
