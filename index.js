'use strict';
const TaskkitTask = require('taskkit-task');
const sourceMapExplorer = require('source-map-explorer');
const path = require('path');
const humanize = require('humanize');
const glob = require('glob');

class AnalyzerTask extends TaskkitTask {
  execute(done) {
    if (typeof this.options.files === 'string') {
      glob(this.options.files, (err, files) => {
        if (err) {
          return done(err);
        }
        const map = {};
        files.forEach((file) => {
          map[file] = '';
        });
        this.options.files = map;
        super.execute(done);
      });
      return;
    }
    super.execute(done);
  }

  process(input, output, done) {
    const sourceMap = sourceMapExplorer.loadSourceMap(output);
    const data = sourceMapExplorer.computeGeneratedFileSizes(sourceMap.mapConsumer, sourceMap.jsData);
    const map = {};
    Object.keys(data).forEach((file) => {
      const relativePath = path.relative(process.cwd(), file);
      const size = data[file];
      map[relativePath] = humanize.filesize(size);
    });
    this.log(map);
    done();
  }
}

module.exports = AnalyzerTask;
