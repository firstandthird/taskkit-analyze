'use strict';
const AnalyzeTask = require('../');

const analyze1 = new AnalyzeTask('analyze', {
  files: {
    [`${__dirname}/dist.js`]: 'dummy'
  }
});
analyze1.execute((err) => {
  if (err) {
    throw err;
  }
});

const analyze2 = new AnalyzeTask('analyze', {
  files: `${__dirname}/di*.js`
});
analyze2.execute((err) => {
  if (err) {
    throw err;
  }
});
