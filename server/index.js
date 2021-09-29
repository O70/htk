const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.listen(9716, function() {
  console.log('Listen to 9716...')
})

const Service = require('../mock/image-analysis/service')
const service = new Service()

const API = '/api/thraex/image/analysis'

app.get(API, function(req, res) {
  console.log('Get samples...')
  res.send({ code: 20000, data: service.list() })
})

app.post(API, function(req, res) {
  console.log('Save sample...')
  console.log(req.body)
  res.send({ code: 20000, data: service.save(req.body) })
})

app.delete(`${API}/*`, function(req, res) {
  console.log('Delete sample...')
  const id = req.url.split('/').reverse()[0]
  service.remove(id)
  res.send({ code: 20000, data: true })
})

const multiparty = require('multiparty')
app.post(`${API}/upload`, function(req, res) {
  console.log('Upload sample images...')
  console.debug(req.body)
  const form = new multiparty.Form({ uploadDir: './imagess' })
  form.parse(req, function(err, fields, files) {
    console.debug(err)
    console.debug(fields)
    console.debug(files)
  })
})

const cm = require('connect-multiparty')
const a = cm()
app.post(`${API}/upload1`, a, function(req, res) {
  console.log('Upload sample images...')
  console.debug(req.body)
  console.debug(req.file)
  console.debug(req.files)
})

app.get('/download', function(req, res) {
  const path = `./db.tmp/images/4adcddae-e093-41fe-baff-6a590d93065e/APAVhj_LCFw7608psyOAlly9.png`
  console.debug('Download image...')
  // res.download(path)
  service.download(res)
})
