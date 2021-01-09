'use strict';

const Node = require('./node');
const Fetcher = require('./fetcher');
const schemator = require('./schemator');

function Controller() {}

Controller.single = async (scheme, fn, ...args) => {
  const fetcher = new Fetcher();
  const result = await fetcher.run(fn, ...args);
  return scheme ? schemator(result, scheme) : result;
};

Controller.parallel = () => {
  const fetcher = new Fetcher();
  const node = Node(
    fetcher.collect.bind(fetcher),
    fetcher.multiple.bind(fetcher),
    schemator,
  );
  return node;
};

Controller.consistently = () => {
  const fetcher = new Fetcher();
  const node = Node(
    fetcher.collect.bind(fetcher),
    fetcher.chain.bind(fetcher),
    schemator,
  );
  return node;
};

module.exports = Controller;
