import request from '@/utils/request'
export async function Login(params){
  return request({
    url: '/api/v1/auth/login',
    method: 'post',
    data: params
  }) 
}