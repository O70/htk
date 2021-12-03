const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

const prefix = '/api/thraex'
const all = require('./handler')
all.forEach(([url, type, handler]) => app[type](`${prefix}${url}`, handler))

const server = app.listen(9716, function() {
  const { address, port } = server.address()
  console.log(`http://${address}:${port}`)
})
