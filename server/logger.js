const all = [
  'error',
  'warn',
  'log',
  'info',
  'debug'
]

const maxLen = Math.max(...all.map(it => it.length))

function handleArgs() {
  const arg = process.argv.slice(2)
    .map(it => it.toLowerCase())
    .find(it => it.startsWith('logging.level='))

  const [level] = arg?.split('=').reverse() || []

  if (level === 'all') {
    return all
  } else if (level === 'off') {
    return []
  } else {
    const ind = all.findIndex(it => it === level)
    const levels = all.slice(0, ind + 1)

    return levels.length > 0 ? levels : all.slice(0, 3)
  }
}

const levels = handleArgs()

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
      const name = target.name
      const [first, ...others] = args
      const prefixs = [
        format(new Date()),
        name.toUpperCase().padStart(maxLen, ' '),
        '---',
        first
      ]

      let res
      if (levels.includes(name)) {
        res = Reflect.apply(target, thisArg, [prefixs.join(' '), ...others])
      }

      return res
    }
  })
}

module.exports = new Proxy(console, {
  get(target, prop) {
    const obj = target[prop]
    return all.includes(prop) ? proxy(obj) : obj
  }
})
