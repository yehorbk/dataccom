# Dataccom

JavaScript library that allows you to build a request to multiple sources,
combine responses and transform the result according to a scheme.

# Installation

Install library via npm:

```
$ npm install dataccom
```

# Concept

The main idea is to allow the developer to compose a query to multiple sources,
retrieve the data and transform it according to the schema.

# How to Use

First of all, you need to open an interface and then you can build a chain of functions with lazy method `fetch`.
Feel free to pass both simple and asynchronous functions. If you want to apply a scheme, use
method `apply` to pass it. Note, if you call this method multiple times the scheme will
be rewrited. Finally, if you ready to get the data - use method `collect` that returns a promise.

```javascript
const dataccom = require('dataccom');

const scheme = {
  name: String,
  age: Number,
  university: String,
  specialty: String,
};

const userId = 10;

const result = dataccom
  .chain()
  .fetch(getUserData, userId)
  .fetch(getUserEducation, userId)
  .apply(scheme)
  .collect();

console.log(result);

/*
  The result is:
  { name: 'John',
    age: 20,
    university: 'Stanford University',
    specialty: 'Software Engineering'
  }
*/
```

## How to build a scheme

Scheme is an object that contains fields names and it types (constructors).
It can contain inner objects and arrays. All items of arrays must be of the same type.
To specify an array type - use the next syntax:

```javascript
const scheme = {
  faculty: String,
  specialty: String,
  students: [String], // Array of Strings
};
```

Note, if you want to use a specific constructor (like `User` class) you should pass a function
that returns `User` instance, instead of passing `User` type.

# Author

**Yehor Bublyk**: [GitHub](https://github.com/yehorbk) • [Twitter](https://twitter.com/yehorbk)
