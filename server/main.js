const express = require('express')
const app = express()

const server = app.listen(9716, function() {
  const { address, port } = server.address()
  console.log(`http://${address}:${port}`)
})

app.get('/htk', function(req, res) {
  res.send({ code: 20000, data: 'htk get' })
})

app.post('/htk', function(req, res) {
  res.send({ code: 20000, data: 'htk post' })
})

app.put('/htk', function(req, res) {
  res.send({ code: 20000, data: 'htk put' })
})

app.delete('/htk', function(req, res) {
  res.send({ code: 20000, data: 'htk delete' })
})
