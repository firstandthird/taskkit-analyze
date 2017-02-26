const AnalyzeTask = require('../');

const analyze = new AnalyzeTask('analyze', {
  files: {
    [`${__dirname}/dist.js`]: 'dummy'
  }
});
analyze.execute((err) => {
  console.log(err);
});
