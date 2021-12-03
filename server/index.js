const express = require('express')
const app = express()

const server = app.listen(9716, function() {
  const { address, port } = server.address()
  console.log(`http://${address}:${port}`)
})

app.get('/htk', function(req, res) {
  console.log('Server:...', 0)
  res.send({ code: 20000, data: 'htk get' })
})

app.get('/htk1', function(req, res) {
  console.log('Server:...', 1)
  res.send({ code: 20000, data: 'htk1 get' })
})

app.post('/htk', function(req, res) {
  console.log('Server:...', 2)
  res.send({ code: 20000, data: 'htk post' })
})
