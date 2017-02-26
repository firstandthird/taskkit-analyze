const TaskkitTask = require('taskkit-task');
const sourceMapExplorer = require('source-map-explorer');
const path = require('path');
const humanize = require('humanize');

class AnalyzerTask extends TaskkitTask {
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
