
import request from '@/utils/request'
export async function getDailyBG() {
    return request({
        url:'/api/v1/Vendor/Bing/GetDailyBG',
        method: 'get'
    })
}
export async function getFuckingWords(){
    return request({
        // url:'//api.lkblog.net/ws/api.php',
        url:'/api/v1/Vendor/Other/GetDailyWords',
        method:'get'
    })
}