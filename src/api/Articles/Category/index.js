import request from '@/utils/request'
export async function Create() {
  return request({
    url: '/api/v1/category/Create',
    method: 'post',
  })
}
export async function List() {
  return request({
    url: '/api/v1/category/list',
    method: 'get',
  })
}
