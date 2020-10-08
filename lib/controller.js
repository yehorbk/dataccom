'use strict';

const Fetcher = require('./fetcher');
const schemator = require('./schemator');

const controller = () => {};

controller.chain = () => {
  const fetcher = new Fetcher();
  let scheme = null;
  const node = () => {};
  node.fetch = (fn, ...args) => {
    fetcher.collect(fn, ...args);
    return node;
  };
  node.apply = value => {
    scheme = value;
    return node;
  };
  node.collect = () =>
    new Promise(resolve => {
      fetcher.run(data => {
        const result = scheme ? schemator(data, scheme) : data;
        resolve(result);
      });
    });
  return node;
};

module.exports = controller;
