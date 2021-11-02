const childProcess = require('child_process')
// const stompServer = require('./socks')

const [app, filename, options] = [
  'python3',
  'analysis.py',
  { cwd: __dirname }
]

module.exports = (items = []) => {
  items.forEach(({ dir, message }) => {
    childProcess.execFile(app, [filename, dir], options, (err, stdout, stderr) => {
      console.debug('invoke result:', err, stdout, stderr)
    })
  })
}

function create() {
  const http = require('http')
  const sockjs = require('sockjs')

  const { resolve } = require('path')
  const sockjsServer = sockjs.createServer({ prefix: '/notify' })
  sockjsServer.on('connection', conn => {
    conn.on('data', message => {
      console.debug('[GUI]', 'server message:', message)
      console.debug(resolve('./'))
      const ids = message.split(',')
      // ids.forEach(it => conn.write('res:' + it))
      ids.forEach(it => {
        const dir = `${resolve('./')}/db.tmp/images/${it}`
        // conn.write(dir)
        childProcess.execFile(app, [filename, dir], options, (err, stdout, stderr) => {
          console.debug('invoke result:', err, stdout, stderr)
          conn.write(it)
        })
      })
    })
    conn.on('close', () => console.log('[GUI]', 'conn closed...'))
  })

  const server = http.createServer()
  sockjsServer.installHandlers(server)
  server.listen(9718, '0.0.0.0')
}

create()
