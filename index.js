const TaskkitTask = require('taskkit-task');
const sourceMapExplorer = require('source-map-explorer');
const path = require('path');

class AnalyzerTask extends TaskkitTask {
  process(input, output, done) {
    const sourceMap = sourceMapExplorer.loadSourceMap(input);
    const data = sourceMapExplorer.computeGeneratedFileSizes(sourceMap.mapConsumer, sourceMap.jsData);
    Object.keys(data).forEach((file) => {
      const relativePath = path.relative(process.cwd(), file);
      const size = data[file];
      this.log({
        path: relativePath,
        size
      });
    });
    done();
  }
}

module.exports = AnalyzerTask;
