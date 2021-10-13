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

export function analysis(id) {
  return request({
    url: `/api/thraex/image/analysis/results/${id}`,
    method: 'POST'
  })
}

export function results(id) {
  return request({
    url: `/api/thraex/image/analysis/results/${id}`,
    method: 'GET'
  })
}
