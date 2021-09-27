const fs = require('fs')
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

  list() {
    const content = fs.readFileSync(DB_PATH)
    const rows = JSON.parse(content.toString())

    return rows
  }

  save(data) {
    const { id } = data
    const now = Date.now()
    Object.assign(data, id ? { updateDate: now } : { id: uuidv4(), createDate: now })

    fsp.readFile(DB_PATH).then(content => {
      let rows = JSON.parse(content.toString())
      if (id) {
        const ind = rows.findIndex(it => it.id === id)
        rows.splice(ind, 1, data)
      } else {
        rows = [data, ...rows]
      }
      this.writeFile(rows)
    })

    return Object.assign(data, { id: uuidv4() })
  }

  remove(id) {
    fsp.readFile(DB_PATH).then(content => {
      const rows = JSON.parse(content.toString())
      const ind = rows.findIndex(it => it.id === id)
      ind > -1 && rows.splice(ind, 1)
      this.writeFile(rows)
    })
  }
}

module.exports = Service
