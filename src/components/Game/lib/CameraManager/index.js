/*
 * @Author: your name
 * @Date: 2021-04-23 10:13:58
 * @LastEditTime: 2021-04-25 14:30:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/lib/CameraManager/index.js
 */
export class CameraManager {
  constructor(x, y, w, h) {
    this.viewX = x
    this.viewY = y
    this.x = x
    this.y = y 
    this.viewW = w
    this.viewH = h
    this.followObj = null
  }

  follow(Instance) {
    this.followObj = Instance
  }
  goForward() {

  }
  go() {
    var {
      x: mapX,
      y: mapY,
      w: mapW,
      h: mapH
    } = this.followObj.CanvasManager.MapManager
    var centerXGap = (this.viewW - this.followObj.w) / 2
    var bottomYGap = (this.viewH - this.followObj.h) / 3 * 2
    
    this.viewX = -this.followObj.x+ centerXGap
    this.viewY = -this.followObj.y+ bottomYGap
    // const {x,y} = this.CameraToCanvasMap(this.viewX,this.viewY)
    // this.x = x
    // this.y = y


    // var {viewX,viewY} =  this.Obj2Camera(this.followObj.x,this.followObj.y)
    // viewX+=centerXGap
    // viewY+=bottomYGap
    
    // if (viewW > mapW) {
    //   var Fx = viewX-mapX
    //   var Gx = (mapX+mapW)-(viewX+viewW)
    //   if(Fx<=0){
    //     this.viewX = 0
    //   }
    //   if(Gx<=0){
    //     this.viewX = Fx
    //   }
    // } else {

    // }
  }
  CameraToCanvasMap(viewX, viewY) {
    var {
      x: mapX,
      y: mapY,
    } = this.followObj.CanvasManager.MapManager
    return {
      x: viewX - mapX,
      y: viewY - mapY
    }
  }
  CanvasToCameraMap(x,y){
    var {
      x: mapX,
      y: mapY,
    } = this.followObj.CanvasManager.MapManager
    return {
      viewX:x+mapX,
      viewY:y+mapY
    }
  }
  Obj2Camera(objX,objY){
    return this.CanvasToCameraMap(objX,objY)
  }
  Camera2Obj(viewX,viewY){
    return this.CameraToCanvasMap(viewX,viewY)
  }  
  
  draw(context) {
    context.strokeStyle = "black";
    context.lineWidth = 5;
    context.strokeRect(this.x, this.y, this.viewW, this.viewH);
    var fontsize = 8;
    context.lineWidth = 1;
    context.font = `${fontsize}px Verdana`;
    context.fillStyle = '#333'
    context.strokeText(`this.viewW:${this.viewW} ,this.viewH:${this.viewH}`, 100, 100)
  }
}