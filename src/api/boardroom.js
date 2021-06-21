import request from '@/utils/request'
import { getById as getUserById } from '@/api/user'

export const Ployfills = {
  room(data) {
    const {
      projectionTypeName: projectionType,
      restRoom: restroom,
      paperlessOffice: paperless,
      addressName: location,
      addressInfo: address,
      ...other
    } = data

    return {
      projectionType,
      restroom,
      paperless,
      location,
      address,
      ...other
    }
  },
  fileAPI: 'https://fuss10.elemecdn.com'
}

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

export function getCurrentUser(id) {
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

export function saveBook(data) {
  console.debug('Save data(Need to convert):', data)
  return request({ url: '/api/thraex/boardrooms/book', method: 'post', data })
    .then(({ code, ...other }) => ({ code: Number.parseInt(code / 100) + code % 100, ...other }))
    .then(({ code, message, ...other }) => ({ code, message: code === 206
      ? message.split(',').map(it => it.split('&')) : message, ...other }))
}

export function updateBook(data) {
  console.debug('Update data(Need to convert):', data)
  return request({ url: '/api/thraex/boardrooms/book', method: 'put', data })
    .then(({ code, ...other }) => ({ code: Number.parseInt(code / 100) + code % 100, ...other }))
}

export function getMyBooks() {
  return request({
    url: '/api/thraex/boardrooms/book/my',
    method: 'get'
  })
}

export function getBookById(id) {
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
