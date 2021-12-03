module.exports = [
  [
    '/user/login',
    'post',
    function(req, res) {
      console.log('login post...')
      res.send({
        code: 20000,
        data: 'admin-token'
      })
    }
  ],
  [
    '/user/info',
    'get',
    function(req, res) {
      console.log('login post...')
      res.send({
        code: 20000,
        data: {
          id: 'ADMIN-ID',
          name: 'Super Admin',
          password: '111111',
          roles: ['admin'],
          introduction: 'I am a super administrator',
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          deptId: 'org-2',
          mobile: '10000'
        }
      })
    }
  ]
]
