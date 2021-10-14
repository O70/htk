const fs = require('fs')
const fsp = require('fs/promises')
const { resolve } = require('path')

const { v4: uuidv4 } = require('uuid')
const multiparty = require('multiparty')

const analysis = require('./analysis')

const DB_DIR = 'db.tmp'
const [DB_PATH, IMG_DIR] = [`${DB_DIR}/db.json`, `${DB_DIR}/images`]

class Service {
  constructor() {
    // fsp.mkdir(DB_DIR).then(_ => fsp.access(DB_PATH).catch(_ => this.writeFile()))
    fsp.mkdir(IMG_DIR, { recursive: true })
      .then(_ => fsp.access(DB_PATH).catch(_ => this.writeFile()))
    /* fsp.access(DB_DIR)
      .then(_ => fsp.access(DB_PATH).catch(_ => this.writeFile()))
      .then(_ => fsp.access(IMG_DIR).catch(_ => fsp.mkdir(IMG_DIR)))
      .catch(_ => fsp.mkdir(DB_DIR).finally(_ => this.writeFile())) */
  }

  writeFile(data = []) {
    fsp.writeFile(DB_PATH, JSON.stringify(data, null, '\t'))
  }

  upload(req) {
    const now = Date.now()
    const form = new multiparty.Form({ uploadDir: IMG_DIR })
    form.parse(req, (err, fields, files) => {
      if (!err) {
        let { sid } = fields;
        [sid] = sid
        let { file } = files;
        [file] = file

        const oldPath = file.path
        const filename = `${now}_${oldPath.split('/').reverse()[0]}`
        const dir = `${IMG_DIR}/${sid}`
        const newPath = `${dir}/${filename}`
        fsp.mkdir(dir, { recursive: true }).then(_ => fsp.rename(oldPath, newPath))
      }
    })
  }

  download(path, res) {
    res.download(`${IMG_DIR}/${path}`)
  }

  pictures(path) {
    let result = []
    try {
      result = fs.readdirSync(`${IMG_DIR}/${path}`).filter(it => it !== 'results')
    } catch (error) {
      console.error('Not found')
    }

    return result
  }

  delPicture(path) {
    fsp.rm(`${IMG_DIR}/${path}`)
  }

  list() {
    let rows = []
    try {
      const content = fs.readFileSync(DB_PATH)
      rows = JSON.parse(content.toString())
    } catch (error) {
      console.error(error)
    }

    return rows
  }

  one(id) {
    return this.list().find(it => it.id === id)
  }

  save(data) {
    const { id } = data
    const now = Date.now()
    Object.assign(data, id ? { updateDate: now }
      : { id: uuidv4(), createDate: now })

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

    return data
  }

  remove(id) {
    fsp.readFile(DB_PATH).then(content => {
      const rows = JSON.parse(content.toString())
      const ind = rows.findIndex(it => it.id === id)
      ind > -1 && rows.splice(ind, 1)
      this.writeFile(rows)

      fsp.rmdir(`${IMG_DIR}/${id}`, { recursive: true })
    })
  }

  calc(id) {
    const dir = `${resolve('./')}/${IMG_DIR}/${id}`
    analysis(dir)
  }

  results(id) {
    console.debug('results:', id)
  }
}

module.exports = Service
