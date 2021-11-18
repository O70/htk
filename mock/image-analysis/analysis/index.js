const http = require('http')
const sockjs = require('sockjs')
const { resolve } = require('path')

const childProcess = require('child_process')

const [app, filename, options] = [
  'python3',
  `${resolve()}/pys/analysis.py`,
  { cwd: __dirname }
]

function dataEvent(conn, message) {
  console.debug('[GUI]', 'server message:', message)
  message.split(',').forEach(id => {
    const dir = `${resolve('./')}/db.tmp/images/${id}`
    childProcess.execFile(app, [filename, dir], options, (err, stdout, stderr) => {
      console.debug('invoke result:', err, stdout, stderr)
      const res = {
        id,
        type: err ? 'error' : 'success',
        label: err ? '失败' : '完成'
      }
      conn.write(JSON.stringify(res))
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
