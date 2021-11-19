import request from '@/utils/request'

export function list() {
  return request({
    url: '/api/thraex/image/analysis',
    method: 'get'
  })
}

export function save(data) {
  return request({
    url: '/api/thraex/image/analysis',
    method: 'post',
    data
  })
}

export function remove(id) {
  return request({
    url: `/api/thraex/image/analysis/${id}`,
    method: 'delete'
  })
}

export function upload(data) {
  return request({
    url: '/api/thraex/image/analysis/upload',
    method: 'post',
    data
  })
}

export function pictures(sid) {
  return request({
    url: '/api/thraex/image/analysis/picture/list',
    method: 'get',
    params: { sid }
  })
}

export function delPicture(name) {
  return request({
    url: `/api/thraex/image/analysis/picture/${name}`,
    method: 'delete'
  })
}

export function analysis(data) {
  return request({
    url: `/api/thraex/image/analysis/results`,
    method: 'POST',
    data
  })
}

export function results(id, prefix) {
  return request({
    url: `/api/thraex/image/analysis/results/${id}`,
    method: 'GET',
    params: { id, prefix }
  })
}

export function notifyAddress() {
  return request({
    url: `/api/thraex/image/analysis/notify/address`,
    method: 'GET'
  })
}
