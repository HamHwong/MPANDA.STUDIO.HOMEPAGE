/*
 * @Author: your name
 * @Date: 2021-04-23 10:13:58
 * @LastEditTime: 2021-04-23 17:09:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/lib/CameraManager/index.js
 */
export class CameraManager {
  constructor() {
    this.viewX = 0
    this.viewY = 0
    this.viewW = 0
    this.viewH = 0
    this.followObj = null
  }

  follow(Instance) {
    this.followObj = Instance
  }
  goForward() {
    this.viewX += .01
    // this.viewY += 1
  }
  go(x,y){
    this.viewX = x
    this.viewY = y
  }
}