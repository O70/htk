/* const express = require('express')
const expressWs = require('express-ws')
const app = express()
expressWs(app)

// const wsObj = {}
app.ws('/notify', (ws, req) => {
  // const uid = req.params.uid
  // wsObj[uid] = ws
  ws.send('Connection success...')
  ws.onmessage = msg => {
    console.debug('msg:', msg)
    ws.send('sss' + msg)
  }
})
app.listen(9718) */

const http = require('http')
const sockjs = require('sockjs')
// const StompServer = require('stomp-broker-js')

const { resolve } = require('path')
const sockjsServer = sockjs.createServer({ prefix: '/notify' })
// const sockjsServer = sockjs.createServer()

sockjsServer.on('connection', conn => {
  conn.on('data', message => {
    console.debug('[GUI]', 'server message:', message)
    console.debug(resolve('./'))
    const ids = message.split(',')
    ids.forEach(it => conn.write('res:' + it))
    // conn.write('res:' + message)
  })
  conn.on('close', () => console.log('[GUI]', 'conn closed...'))
})

const server = http.createServer()
// const stompServer = new StompServer({ server, path: '/notify' })
sockjsServer.installHandlers(server)
server.listen(9718, '0.0.0.0')

// const clients = []
// stompServer.on('connected', function(sessionId, headers) {
//   const clientId = headers.clientId
//   if (clientId) {
//     clients.push(clientId)
//   }
// })

// stompServer.subscribe('/**', function(msg, headers) {
//   const topic = headers.destination
//   console.log(topic, '->', msg)
// })

// stompServer.send('/topic/notification', {}, 'testMsg')

// module.exports = stompServer

/* module.exports = {
  create() {
    const http = require('http')
    const sockjs = require('sockjs')

    const echo = sockjs.createServer({ prefix: '/echo' })
    echo.on('connection', conn => {
      // conn.write('阿斯顿发')

      conn.on('data', message => {
        console.debug('[GUI]', 'server message:', message)
        conn.write(message)
      })
      conn.on('close', () => console.log('[GUI]', 'conn closed...'))
    })

    const server = http.createServer()
    echo.installHandlers(server)
    server.listen(9718, '0.0.0.0')
  },
  send(message) {
    const SockJS = require('sockjs-client')
    const sock = new SockJS('http://localhost:9718/echo')
    // sock.send(message)
    sock.onopen = function() {
      console.debug('[GUI]', 'server client open')
      sock.send(message)
      sock.close()
    }
    // sock.onmessage = function(e) {
    //   console.debug('[GUI]', 'server client message:', e.data)
    //   sock.close()
    // }
  }
} */
