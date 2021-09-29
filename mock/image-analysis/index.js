const Service = require('./service')
const service = new Service()

module.exports = [
  {
    url: '/api/thraex/image/analysis/upload',
    type: 'post',
    response: req => ({ code: 20000, data: service.upload(req) })
  },
  {
    url: '/api/thraex/image/analysis/view',
    type: 'get',
    response: (req, res) => {
      // console.debug(res)
      console.debug(res.download)
      // return { id: 1 }
      // res.download('db.tmp/images/4adcddae-e093-41fe-baff-6a590d93065e/APAVhj_LCFw7608psyOAlly9.png')
      return service.download(res)
    }
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
