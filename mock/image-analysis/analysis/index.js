const childProcess = require('child_process')

const [app, filename, options] = [
  'python3',
  'analysis.py',
  { cwd: __dirname }
]

function sockjsServer() {
  const http = require('http')
  const sockjs = require('sockjs/lib/sockjs')
  console.debug(sockjs)

  const echo = sockjs.createServer({ prefix: '/echo' })
  echo.on('connection', conn => {
    conn.on('data', message => conn.write(message))
    conn.on('close', () => console.log('conn closed...'))
  })

  console.debug(echo)
  console.debug(echo.attach)
  // const server = http.createServer()
  // echo.attach(server)
  // server.listen(9718, '0.0.0.0')
}
sockjsServer()

module.exports = (items = []) => {
  items.forEach(({ dir, message }) => {
    childProcess.execFile(app, [filename, dir], options, (err, stdout, stderr) => {
      console.debug('invoke result:', err, stdout, stderr)
      console.debug(message)
    })
  })
}
