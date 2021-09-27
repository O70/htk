const Service = require('./service')
const service = new Service()

module.exports = [
  {
    url: '/api/thraex/image/analysis',
    type: 'get',
    response: _ => ({ code: 20000, data: new Array(0).fill('Item').map((it, i) => ({
      // id: uuidv4(),
      nation: `Nation-${i}`,
      type: ['岩心或岩屑', '野外露头剖面'][i % 2],
      location: `location-${i}`,
      era: `era-${i}`,
      stratum: `stratum-${i}`
    })) })
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
      console.debug(config.url)
      const id = config.url.split('/').reverse()[0]
      console.debug(id)
      return { code: 20000, data: true }
    }
  }
]
