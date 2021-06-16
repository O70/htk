import request from '@/utils/request'
import { getById as getUserById } from '@/api/user'

export function serverTime() {
  return request({
    url: '/api/thraex/server/time',
    method: 'get'
  })
}

export function getOrg() {
  return request({
    url: '/api/thraex/orgs',
    method: 'get'
  })
}

export function currentUser(id) {
  return getUserById(id)
}

export function getBoardrooms() {
  return request({
    url: '/api/thraex/boardrooms/group',
    method: 'get'
  })
}

export function getBoardroom(id = '') {
  return request({
    url: `/api/thraex/boardrooms/${id}`,
    method: 'get'
  })
}

export function getFormInfo() {
  return request({
    url: `/api/thraex/boardrooms/book/info`,
    method: 'get'
  })
}

export function save(data) {
  console.debug('Save data(Need to convert):', data)
  return request({ url: '/api/thraex/boardrooms/book', method: 'post', data })
    .then(({ code, ...other }) => ({ code: Number.parseInt(code / 100) + code % 100, ...other }))
    .then(({ code, message, ...other }) => ({ code, message: code === 206
      ? message.split(',').map(it => it.split('&')) : message, ...other }))
}

export function getBook(id) {
  return request({
    url: `/api/thraex/boardrooms/book/${id}`,
    method: 'get'
  })
}

export function getBookEvents(day) {
  return request({
    url: '/api/thraex/boardrooms/book/events',
    method: 'get',
    params: { day }
  })
}

export function getBookMarks(params) {
  return request({
    url: '/api/thraex/boardrooms/book/marks',
    method: 'get',
    params
  })
}
