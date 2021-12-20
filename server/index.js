const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const logger = require('./logger')

const prefix = '/api/thraex'
const all = require('./handler')
all.forEach(({ url, type, handler }) => {
  const proxy = new Proxy(handler, {
    apply(target, thisArg, args) {
      logger.debug(type.toUpperCase(), url)
      const res = Reflect.apply(target, thisArg, args)

      logger.debug('Request method end.')

      return res
    }
  })

  app[type.toLowerCase()](`${prefix}${url}`, proxy)
})

const server = app.listen(9716, function() {
  const { address, port } = server.address()
  console.log(`http://${address}:${port}`)
})

const sockjs = require('sockjs')
function dataEvent(conn, message) {
  console.log('dataEvent:', conn, message)
}
const sockjsServer = sockjs.createServer({ prefix: '/notify' })
sockjsServer.on('connection', conn => {
  conn.on('data', message => dataEvent(conn, message))
  conn.on('close', () => console.log('[GUI]', 'conn closed...'))
})
sockjsServer.installHandlers(server)
