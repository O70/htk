const Service = require('./service')
const service = new Service()

const splits = req => req.url.split('/').reverse()

module.exports = [
  {
    url: '/api/thraex/image/analysis/results',
    type: 'get',
    response: req => {
      const { id, prefix } = req.query
      return { code: 20000, data: service.results(id, prefix) }
    }
  },
  {
    url: '/api/thraex/image/analysis/results',
    type: 'post',
    response: req => ({ code: 20000, data: service.calc(req.body) })
  },
  {
    url: '/api/thraex/image/analysis/upload',
    type: 'post',
    response: req => ({ code: 20000, data: service.upload(req) })
  },
  // {
  //   // url: '/api/thraex/image/analysis/picture/\.*/\.*',
  //   type: 'get',
  //   native: true,
  //   response: (req, res) => {
  //     const [filename, sid] = splits(req)
  //     service.download(`${sid}/${filename}`, res)
  //   }
  // },
  {
    url: '/api/thraex/image/analysis/\.*/\.*',
    type: 'delete',
    response: req => {
      const [filename, sid] = splits(req)
      // service.delPicture(`${sid}/${filename}`)
      service.delPicture(sid, filename)
      return { code: 20000, data: true }
    }
  },
  {
    url: '/api/thraex/image/analysis/picture/list',
    type: 'get',
    response: req => {
      const { sid } = req.query
      return { code: 20000, data: service.pictures(sid) }
    }
  },
  {
    url: '/api/thraex/image/analysis/picture',
    type: 'get',
    native: true,
    response: (req, res) => {
      const [, fpath] = req.url.split('/api/thraex/image/analysis/picture/')
      service.download(fpath, res)
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
      const id = splits(req)[0]
      service.remove(id)
      return { code: 20000, data: true }
    }
  }
]
