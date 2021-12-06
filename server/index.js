const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const prefix = '/api/thraex'
const all = require('./handler')
all.forEach(([url, type, handler]) => {
  const proxy = new Proxy(handler, {
    apply(target, thisArg, args) {
      console.log('Request method begin...')
      const res = Reflect.apply(target, thisArg, args)
      console.log('Request method end...')
      return res
    }
  })

  app[type](`${prefix}${url}`, proxy)
})

const server = app.listen(9716, function() {
  const { address, port } = server.address()
  console.log(`http://${address}:${port}`)
})
