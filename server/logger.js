const proxys = [
  'debug',
  'info',
  'log',
  'warn',
  'error'
]

const maxLen = Math.max(...proxys.map(it => it.length))

function proxy(obj) {
  return new Proxy(obj, {
    apply(target, thisArg, args) {
      console.log(process.report.filename)
      console.trace('asdf')
      const prefixs = [
        new Date(),
        target.name.toUpperCase().padStart(maxLen, ' '),
        '---'
      ]

      return Reflect.apply(target, thisArg, [...prefixs, ...args])
    }
  })
}

module.exports = new Proxy(console, {
  get(target, prop) {
    const obj = target[prop]
    return proxys.includes(prop) ? proxy(obj) : obj
  }
})
