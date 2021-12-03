module.exports = app => {
  const { htk: { prefix }} = app

  const url = `${prefix}/image/analysis`

  app.get(url, function(req, res) {
    console.log('Server:...', 0)
    res.send({ code: 20000, data: 'htk get' })
  })

  app.post(url, function(req, res) {
    console.log('Server:...', 2)
    res.send({ code: 20000, data: 'htk post' })
  })
}
