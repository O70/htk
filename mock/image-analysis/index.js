module.exports = [
  {
    url: '/api/thraex/image/analysis',
    type: 'get',
    response: _ => ({ code: 20000, data: new Array(20).fill('Item').map((it, i) => ({
      id: `ID-${i}`,
      nation: `Nation-${i}`,
      // type: `Type-${i}`,
      type: `野外露头剖面`,
      location: `location-${i}`,
      era: `era-${i}`,
      stratum: `stratum-${i}`
    })) })
  }
]
