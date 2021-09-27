const fsp = require('fs/promises')

const { v4: uuidv4 } = require('uuid')

const [DB_DIR, DB_PATH] = ['./db.tmp', './db.tmp/db.json']

class Service {
  constructor() {
    fsp.access(DB_DIR)
      .then(_ => fsp.access(DB_PATH).catch(_ => this.writeFile()))
      .catch(_ => fsp.mkdir(DB_DIR).finally(_ => this.writeFile()))
  }

  writeFile(data = []) {
    fsp.writeFile(DB_PATH, JSON.stringify(data, null, '\t'))
  }

  async list() {
    // fsp.readFile(DB_PATH).then(content => {
    //   const rows = JSON.parse(content.toString())
    //   console.debug(rows)
    // })
    const content = await fsp.readFile(DB_PATH)
    const rows = JSON.parse(content.toString())
    // console.debug(rows)
    return rows
  }

  save(data) {
    Object.assign(data, { id: uuidv4() })
    fsp.readFile(DB_PATH).then(content => {
      console.debug(content)
      const rows = JSON.parse(content.toString())
      console.debug(rows)
      this.writeFile([data, ...rows])
    })

    return Object.assign(data, { id: uuidv4() })
  }
}

module.exports = Service
