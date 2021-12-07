const proxys = [
  'debug',
  'info',
  'log',
  'warn',
  'error'
]

const maxLen = Math.max(...proxys.map(it => it.length))

function format(date) {
  const locales = ['zh-CN', { hour12: false }]
  const dateString = date.toLocaleDateString(...locales)
  const timeString = date.toLocaleTimeString(...locales)
  const millis = `${date.getMilliseconds()}`.padStart(3, '0')

  const [year, month, day] = dateString.split('/')
  const pad = s => s.padStart(2, '0')

  return `${[year, pad(month), pad(day)].join('-')} ${timeString}.${millis}`
}

function proxy(obj) {
  return new Proxy(obj, {
    apply(target, thisArg, args) {
      const [first, ...others] = args
      const prefixs = [
        format(new Date()),
        target.name.toUpperCase().padStart(maxLen, ' '),
        '---',
        first
      ]

      return Reflect.apply(target, thisArg, [prefixs.join(' '), ...others])
    }
  })
}

module.exports = new Proxy(console, {
  get(target, prop) {
    const obj = target[prop]
    return proxys.includes(prop) ? proxy(obj) : obj
  }
})
