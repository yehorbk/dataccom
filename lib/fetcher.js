'use strict';

function Fetcher() {}

Fetcher.prototype.collect = (fn, ...args) => {
  if (!this.functionsList) {
    this.functionsList = [];
  }
  this.functionsList.push({ fn, args });
};

Fetcher.prototype.run = callback => {
  let result = {};
  const assyncCall = async (item, save) => {
    const value = await item.fn(...item.args);
    save(value);
  };
  const saveAndDestruct = item => data => {
    this.functionsList.splice(this.functionsList.indexOf(item), 1);
    result = Object.assign(result, data);
    if (this.functionsList.length === 0) {
      callback(result);
    }
  };
  for (const item of this.functionsList) {
    assyncCall(item, saveAndDestruct(item));
  }
};

module.exports = Fetcher;
