'use strict';

function Fetcher() {}

Fetcher.prototype.collect = function (fn, ...args) {
  if (!this.functionsList) {
    this.functionsList = [];
  }
  this.functionsList.push({ fn, args });
};

Fetcher.prototype.run = async function (fn, ...args) {
  const result = await fn(...args);
  return result;
};

Fetcher.prototype.multiple = function (callback) {
  let result = {};
  const onResolve = item => data => {
    this.functionsList.splice(this.functionsList.indexOf(item), 1);
    result = Object.assign(result, data);
    if (this.functionsList.length === 0) {
      callback(null, result);
    }
  };
  const onReject = item => error => {
    const message = `Got ${error.message} in ${item}`;
    callback(new Error(message));
  };
  for (const item of this.functionsList) {
    this.run(item.fn, ...item.args)
      .then(onResolve(item))
      .catch(onReject(item));
  }
};

Fetcher.prototype.chain = function (callback) {
  let result = {};
  const iterator = this.functionsList[Symbol.iterator]();
  let item = iterator.next().value;
  const onResolve = data => {
    result = Object.assign(result, data);
    const entry = iterator.next();
    if (entry.done) {
      callback(null, result);
    }
    item = entry.value;
  };
  const onReject = error => {
    const message = `Got ${error.message} in ${item}`;
    callback(new Error(message));
  };
  this.run(item.fn, ...item.args)
    .then(onResolve(item))
    .catch(onReject(item));
};

module.exports = Fetcher;
