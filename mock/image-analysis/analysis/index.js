const childProcess = require('child_process')

const [app, filename, options] = [
  'python3',
  'analysis.py',
  { cwd: __dirname }
]

module.exports = dir => {
  childProcess.execFile(app, [filename, dir], options, function() {
    console.debug('invoke result:', arguments)
  })
}
