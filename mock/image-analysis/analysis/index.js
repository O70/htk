const http = require('http')
const sockjs = require('sockjs')
const { resolve } = require('path')

const childProcess = require('child_process')

/* const [app, filename, options] = [
  'python3',
  `${resolve()}/pys/index.py`,
  // { cwd: __dirname }
  {}
  // { cwd: resolve() }
] */

const { app, entry, args, options = {}} = require(`${resolve()}/htk.config.js`)

function dataEvent(conn, message) {
  console.debug('[GUI]', 'server message:', message)
  message.split(',').forEach(id => {
    console.log('exec:', app, entry, args(dir), 'options:', options)
    const dir = `${resolve('./')}/db.tmp/images/${id}`
    childProcess.execFile(app, [entry, args(dir)], options, (err, stdout, stderr) => {
      console.log('invoke result:', err, stdout, stderr)
      conn.write(JSON.stringify({ id, state: !err }))
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
