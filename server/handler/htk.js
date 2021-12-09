const logger = require('../logger')

const Service = require('../service')
const service = new Service()

const splits = req => req.url.split('/').reverse()

module.exports = [
  {
    url: '/image/analysis/notify/address',
    type: 'GET',
    handler(req, res) {
      const data = require('ip').address()
      logger.debug('Get server address: [%s]', data)

      res.send({ code: 20000, data })
    }
  },
  {
    url: '/image/analysis/results',
    type: 'GET',
    handler(req, res) {
      const { id, prefix } = req.query
      logger.debug('Get results: [%s, %s]', id, prefix)

      res.send({ code: 20000, data: service.results(id, prefix) })
    }
  },
  {
    url: '/image/analysis/results',
    type: 'POST',
    handler(req, res) {
      logger.debug('Calc results.')

      res.send({ code: 20000, data: service.calc(req.body) })
    }
  },
  {
    url: '/image/analysis/upload',
    type: 'POST',
    handler(req, res) {
      logger.debug('Upload image.')

      res.send({ code: 20000, data: service.upload(req) })
    }
  },
  {
    url: '/image/analysis/\.*/\.*',
    type: 'DELETE',
    handler(req, res) {
      const [filename, sid] = splits(req)
      logger.debug('Delete sample: [%s, %s]', filename, sid)
      // service.delPicture(`${sid}/${filename}`)
      service.delPicture(sid, filename)
      res.send({ code: 20000, data: true })
    }
  },
  {
    url: '/image/analysis/picture/list',
    type: 'GET',
    handler(req, res) {
      const { sid } = req.query
      logger.debug('Get sample image: [%s]', sid)

      res.send({ code: 20000, data: service.pictures(sid) })
    }
  },
  {
    url: '/image/analysis/picture/*/*',
    type: 'GET',
    native: true,
    handler(req, res) {
      const [, fpath] = req.url.split('/api/thraex/image/analysis/picture/')
      logger.debug('Download image: [%s]', fpath)
      service.download(fpath, res)
    }
  },
  {
    url: '/image/analysis',
    type: 'GET',
    handler(req, res) {
      logger.debug('Get all samples.')
      res.send({ code: 20000, data: service.list() })
    }
  },
  {
    url: '/image/analysis',
    type: 'POST',
    handler(req, res) {
      logger.debug('Save sample: [%s]', req.body)
      res.send({ code: 20000, data: service.save(req.body) })
    }
  },
  {
    url: '/image/analysis',
    type: 'DELETE',
    handler(req, res) {
      const id = splits(req)[0]
      logger.debug('Delete sample: [%s]', id)
      service.remove(id)
      res.send({ code: 20000, data: true })
    }
  }
]
