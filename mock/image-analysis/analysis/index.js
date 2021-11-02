const http = require('http')
const sockjs = require('sockjs')
const { resolve } = require('path')

const childProcess = require('child_process')

const [app, filename, options] = [
  'python3',
  'analysis.py',
  { cwd: __dirname }
]

function dataEvent(conn, message) {
  console.debug('[GUI]', 'server message:', message)
  message.split(',').forEach(it => {
    const dir = `${resolve('./')}/db.tmp/images/${it}`
    childProcess.execFile(app, [filename, dir], options, (err, stdout, stderr) => {
      console.debug('invoke result:', err, stdout, stderr)
      conn.write(it)
    })
  })
}

const sockjsServer = sockjs.createServer({ prefix: '/notify' })
sockjsServer.on('connection', conn => {
  conn.on('data', message => dataEvent(conn, message))
  conn.on('close', () => console.log('[GUI]', 'conn closed...'))
})

const server = http.createServer()
sockjsServer.installHandlers(server)
server.listen(9718, '0.0.0.0')
