import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/thraex/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/thraex/user/info',
    method: 'get',
    params: { token }
  })
}

export function getById(id) {
  return request({
    url: `/api/thraex/user/${id}`,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/api/thraex/user/logout',
    method: 'post'
  })
}
