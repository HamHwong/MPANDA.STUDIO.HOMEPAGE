/*
 * @Author: your name
 * @Date: 2021-04-08 13:45:11
 * @LastEditTime: 2021-04-08 14:54:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/lib/utils/assetsLoader.js
 */
import axios from "axios"
export async function load(path) {
  return new Promise((res, rej) => {
    axios({
      method: 'get',
      url: path,
      responseType: "blob"
    }).then((response) => {
      const fr = new FileReader();
      const data = response.data
      fr.onload = () => {
        // console.log(fr.result) 
        var img = new Image();
        img.onload=()=>{
          res(img)
        }
        img.onerror=err=>{
          rej(err)
        }
        img.src = fr.result
      }
      fr.onerror=(err)=>{
        rej(err)
      }
      fr.readAsDataURL(data) 
    })
  })
}