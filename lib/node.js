'use strict';

const Node = (collect, execute, schemator, scheme = null) => ({
  fetch: (fn, ...args) => {
    collect(fn, ...args);
    return Node(collect, execute, schemator);
  },
  apply: _scheme => Node(collect, execute, schemator, _scheme),
  perform: () =>
    new Promise((resolve, reject) => {
      execute((error, data) => {
        if (error) {
          reject(error);
        }
        resolve(scheme ? schemator(data, scheme) : data);
      });
    }),
});

module.exports = Node;
