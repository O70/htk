const logger = require('../logger')

const users = [
  {
    id: 'ADMIN-ID',
    name: 'Super Admin',
    username: 'admin',
    password: '111111',
    token: 'admin-token',
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
  },
  {
    id: 'EDITOR-ID',
    name: 'Normal Editor',
    username: 'editor',
    token: 'editor-token',
    password: '111111',
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
  }
]

module.exports = [
  {
    url: '/user/login',
    type: 'POST',
    handler(req, res) {
      const { username, password } = req.body
      logger.debug('User login: [%s, %s]', username, password)

      const user = users.find(it => it.username === username && it.password === password)

      res.send(user ? {
        code: 20000,
        data: user.token
      } : {
        code: 60204,
        message: '账号或密码不正确.'
      })
    }
  },
  {
    url: '/user/info',
    type: 'GET',
    handler(req, res) {
      const { token } = req.query
      logger.debug('Get user info: [%s]', token)
      const user = users.find(it => it.token === token)

      res.send(user ? {
        code: 20000,
        data: user
      } : {
        code: 50008,
        message: 'Login failed, unable to get user details.'
      })
    }
  },
  {
    url: '/user/logout',
    type: 'POST',
    handler(req, res) {
      const { token } = req.body
      logger.debug('User logout: [%s]', token)

      res.send({ code: 20000, data: 'success' })
    }
  },
  {
    url: '/user/*',
    type: 'GET',
    handler(req, res) {
      const [id] = req.url.split('/').reverse()
      logger.debug('Get user: [%s]', id)

      res.send({ code: 20000, data: users.find(it => it.id === id) })
    }
  }
]
