import request from '@/utils/request'

export function list() {
  return request({
    url: '/api/thraex/image/analysis',
    method: 'get'
  })
}
