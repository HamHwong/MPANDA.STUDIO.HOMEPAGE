/*
 * @Author: your name
 * @Date: 2021-04-23 10:13:58
 * @LastEditTime: 2021-04-24 15:48:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/lib/CameraManager/index.js
 */
export class CameraManager {
  constructor(x,y,w,h) {
    this.viewX = x
    this.viewY = y
    this.viewW = w
    this.viewH = h
    this.followObj = null
  }

  follow(Instance) {
    this.followObj = Instance
  }
  goForward() {
    
  }
  go(){
    this.viewX =  this.followObj.x 
    this.viewY = this.followObj.y 
    // console.log(this.viewY,this.viewX)
  }
  draw(context){ 
    context.strokeStyle = "black";
    context.lineWidth = 5;  
    context.strokeRect(0,0,this.viewW ,this.viewH);
  }
}