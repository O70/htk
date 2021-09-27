const fs = require('fs/promises')
const { v4: uuidv4 } = require('uuid')

class Service {
  constructor() {
    console.debug('constructor...')
    fs.mkdir('./db')
    fs.writeFile('gui')
  }

  save(data) {
    console.debug(data)
    return Object.assign(data, { id: uuidv4() })
  }
}

module.exports = Service
