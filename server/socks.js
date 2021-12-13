module.exports = app => {
  const sockjs = require('sockjs')
  function dataEvent(conn, message) {
    console.log('dataEvent:', conn, message)
  }
  const sockjsServer = sockjs.createServer({ prefix: '/notify' })
  sockjsServer.on('connection', conn => {
    conn.on('data', message => dataEvent(conn, message))
    conn.on('close', () => console.log('[GUI]', 'conn closed...'))
  })
  sockjsServer.installHandlers(app)
}
