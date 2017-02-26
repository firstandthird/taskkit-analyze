const AnalyzeTask = require('../');

const analyze = new AnalyzeTask('analyze', {
  files: [
    `${__dirname}/dist.js`
  ]
});
analyze.execute((err) => {
  console.log(err);
});
