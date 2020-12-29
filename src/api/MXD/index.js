
import request from '@/utils/request'
export async function UploadMXDImage(params){
  return request({
    url: '/api/v1/MapleStory/image/upload',
    method:'post',
    data: params
  })
}
export async function SearchMXDImage(params){
  return request({
    url: '/api/v1/MapleStory/image/search',
    method:'post',
    data: params
  })
}