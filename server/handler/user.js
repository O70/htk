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
  [
    '/user/login',
    'post',
    function(req, res) {
      const { username, password } = req.body
      console.debug('User login:', username, password)

      const user = users.find(it => it.username === username && it.password === password)

      res.send(user ? {
        code: 20000,
        data: user.token
      } : {
        code: 60204,
        message: '账号或密码不正确.'
      })
    }
  ],
  [
    '/user/info',
    'get',
    function(req, res) {
      const { token } = req.query
      console.debug('Get user info:', token)
      const user = users.find(it => it.token === token)

      res.send(user ? {
        code: 20000,
        data: user
      } : {
        code: 50008,
        message: 'Login failed, unable to get user details.'
      })
    }
  ],
  [
    '/user/logout',
    'post',
    function(req, res) {
      const { token } = req.query
      console.debug('User logout:', token)

      res.send({ code: 20000, data: 'success' })
    }
  ]
]
