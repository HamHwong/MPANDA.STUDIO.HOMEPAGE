import request from '@/utils/request'
export async function UploadImage(params){
  return request({
    url: 'http://localhost:8100/v1/imageUpload',
    method: 'post',
    data: params
  }) 
}