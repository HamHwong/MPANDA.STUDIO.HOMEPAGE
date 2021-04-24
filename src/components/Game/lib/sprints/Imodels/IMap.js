import { Instance } from "../lib/Instance";
import Enums from './Type.Enums'
/*
 * @Author: your name
 * @Date: 2021-04-23 11:21:02
 * @LastEditTime: 2021-04-24 15:15:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/lib/Sprints/Imodels/Map.js
 */ 
export class IMap extends Instance{
  constructor(id){
    super(id)
    this.type=Enums.MAP
    this.gravity = 0.9
    this.mapFrames = []

  }
  async _loadImgs() {
    if(this.CanvasManager&&this.CanvasManager.MapManager){
      this.y = -this.CanvasManager.MapManager.x
      this.x = -this.CanvasManager.MapManager.y
    }
    // console.log(this.x,this.y)
    this.activeFrames = (ctx)=>{
      ctx.fillStyle = '#ddd';
      ctx.fillRect(this.x,this.y,this.w,this.h); 
    }
  }
  updating() { 
    
  }
}