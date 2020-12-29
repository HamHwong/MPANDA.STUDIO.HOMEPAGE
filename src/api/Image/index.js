import request from '@/utils/request'
// 上传图片
export async function UploadImage(params){
  return request({
    url: '/api/v1/image/upload',
    method: 'post',
    data: params
  }) 
}
//通过ID获取该图片
export async function GetImage(params){
  return request({
    url: '/api/v1/image/'+params.id,
    method:'get'
  })
}
//通过ID获取该图片二值化的图
export async function GetBinarizationImage(params){
  return request({
    url: '/api/v1/image/Binarization/'+params.id,
    method:'get'
  })
}
// 上传图片进行二值化（不保存）
export async function BinarizationImage(params){
  return request({
    url: '/api/v1/image/Binarization',
    method: 'post',
    data: params
  }) 
}