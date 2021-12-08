const logger = require('../logger')

const Service = require('../../mock/htk/service')
const service = new Service()

const splits = req => req.url.split('/').reverse()

module.exports = [
  {
    url: '/image/analysis/notify/address',
    type: 'GET',
    // handler: _ => ({ code: 20000, data: require('ip').address() })
    handler: _ => ({ code: 20000, data: 'localhost' })
  },
  {
    url: '/image/analysis/results',
    type: 'GET',
    handler: req => {
      const { id, prefix } = req.query
      return { code: 20000, data: service.results(id, prefix) }
    }
  },
  {
    url: '/image/analysis/results',
    type: 'POST',
    handler: req => ({ code: 20000, data: service.calc(req.body) })
  },
  {
    url: '/image/analysis/upload',
    type: 'POST',
    handler: req => ({ code: 20000, data: service.upload(req) })
  },
  {
    url: '/image/analysis/\.*/\.*',
    type: 'DELETE',
    handler: req => {
      const [filename, sid] = splits(req)
      // service.delPicture(`${sid}/${filename}`)
      service.delPicture(sid, filename)
      return { code: 20000, data: true }
    }
  },
  {
    url: '/image/analysis/picture/list',
    type: 'GET',
    handler: req => {
      const { sid } = req.query
      return { code: 20000, data: service.pictures(sid) }
    }
  },
  {
    url: '/image/analysis/picture',
    type: 'GET',
    native: true,
    handler: (req, res) => {
      const [, fpath] = req.url.split('/api/thraex/image/analysis/picture/')
      service.download(fpath, res)
    }
  },
  {
    url: '/image/analysis',
    type: 'GET',
    handler: _ => ({ code: 20000, data: service.list() })
  },
  {
    url: '/image/analysis',
    type: 'POST',
    handler: req => ({ code: 20000, data: service.save(req.body) })
  },
  {
    url: '/image/analysis',
    type: 'DELETE',
    handler: req => {
      const id = splits(req)[0]
      service.remove(id)
      return { code: 20000, data: true }
    }
  }
]
