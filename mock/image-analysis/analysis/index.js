const childProcess = require('child_process')

const [app, filename, options] = [
  'python3',
  'analysis.py',
  { cwd: __dirname }
]

module.exports = (items = []) => {
  items.forEach(({ dir, message }) => {
    childProcess.execFile(app, [filename, dir], options, (err, stdout, stderr) => {
      console.debug('invoke result:', err, stdout, stderr)
      console.debug(message)
    })
  })
}
