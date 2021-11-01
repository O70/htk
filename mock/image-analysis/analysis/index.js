const childProcess = require('child_process')

const [app, filename, options] = [
  'python3',
  'analysis.py',
  { cwd: __dirname }
]

// let write = null
function sockjsServer() {
  const http = require('http')
  const sockjs = require('sockjs')
  console.debug(sockjs)

  const echo = sockjs.createServer({ prefix: '/echo' })
  echo.on('connection', conn => {
    conn.write('阿斯顿发')

    conn.on('data', message => {
      console.debug('server message:', message)
      conn.write(message)
    })
    conn.on('close', () => console.log('conn closed...'))
  })

  console.debug(echo)
  const server = http.createServer()
  echo.installHandlers(server)
  server.listen(9718, '0.0.0.0')
  return echo
}
sockjsServer()

module.exports = (items = []) => {
  items.forEach(({ dir, message }) => {
    childProcess.execFile(app, [filename, dir], options, (err, stdout, stderr) => {
      console.debug('invoke result:', err, stdout, stderr)
      // console.debug(message)
      // console.debug(write)
      // write(message)
      // a.on('connection', conn => {
      //   conn.write(message)
      // })

      const SockJS = require('sockjs-client')
      const sock = new SockJS('http://localhost:9718/echo')
      // sock.send(message)
      sock.onopen = function() {
        console.debug('server client open')
        sock.send(message)
        // sock.close()
      }
      sock.onmessage = function(e) {
        console.debug('server client message:', e.data)
        sock.close()
      }
    })
  })
}
