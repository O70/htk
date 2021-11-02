
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    id: 'ADMIN-ID',
    name: 'Super Admin',
    password: '111111',
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    deptId: 'org-2',
    mobile: '10000'
  },
  'editor-token': {
    id: 'EDITOR-ID',
    name: 'Normal Editor',
    password: '111111',
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    deptId: 'org-4',
    mobile: '10001'
  }
}

module.exports = [
  // user login
  {
    url: '/api/thraex/user/login',
    type: 'post',
    response: config => {
      const { username, password } = config.body
      const token = tokens[username]
      console.debug(password, token)

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: '账号或密码不正确.'
        }
      }

      const user = users[token.token]
      console.debug(user)
      if (!user || user.password !== password) {
        return {
          code: 60204,
          message: '账号或密码不正确.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/api/thraex/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/api/thraex/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/api/thraex/user\.*',
    type: 'get',
    response: config => {
      const id = config.url.split('/').reverse()[0]
      return {
        code: 20000,
        data: Object.values(users).find(it => it.id === id)
      }
    }
  }
]
