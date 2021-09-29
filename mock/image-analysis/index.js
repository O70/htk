const Service = require('./service')
const service = new Service()

module.exports = [
  {
    url: '/api/thraex/image/analysis/upload',
    type: 'post',
    response: req => ({ code: 20000, data: service.upload(req) })
  },
  {
    url: '/api/thraex/image/analysis',
    type: 'get',
    response: _ => ({ code: 20000, data: service.list() })
  },
  {
    url: '/api/thraex/image/analysis',
    type: 'post',
    response: req => ({ code: 20000, data: service.save(req.body) })
  },
  {
    url: '/api/thraex/image/analysis',
    type: 'delete',
    response: req => {
      const id = req.url.split('/').reverse()[0]
      service.remove(id)
      return { code: 20000, data: true }
    }
  }
]
