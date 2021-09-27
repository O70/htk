const Service = require('./service')
const service = new Service()

module.exports = [
  {
    url: '/api/thraex/image/analysis',
    type: 'get',
    response: _ => ({ code: 20000, data: service.list() })
  },
  {
    url: '/api/thraex/image/analysis',
    type: 'post',
    response: config => ({ code: 20000, data: service.save(config.body) })
  },
  {
    url: '/api/thraex/image/analysis',
    type: 'delete',
    response: config => {
      const id = config.url.split('/').reverse()[0]
      service.remove(id)
      return { code: 20000, data: true }
    }
  }
]
