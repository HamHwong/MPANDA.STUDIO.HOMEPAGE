/*
 * @Author: your name
 * @Date: 2021-04-08 15:13:57
 * @LastEditTime: 2021-04-23 16:18:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/lib/sprints/character.js
 */
// import { frame } from '../../frame'
// import { load } from '../../utils/assetsLoader'
import Enums from './Type.Enums'
import {
  Instance
} from '../lib/Instance'

export class ICharacter extends Instance{
  constructor(id){
    super(id)
    this.type = Enums.CHARACTER
    this.SaySomeThing = null
  } 
  updating(){
    this.framesCount = this.actionsFrames[this.status] ? this.actionsFrames[this.status].length || 1 : 1
    this._frameCounter += 1
    if (this.framesCount > this.CanvasManager.FPS) {
        //this.currentFrame += 1
        this.currentFrame = this._frameCounter % this.framesCount
    } else {
        if ((this._frameCounter / this.FramesDurationOfEachFrame) > 1) {
            this._currentFrame += 1
            this._currentFrame = this._currentFrame % this.framesCount
            this.currentFrame = this._currentFrame
            this._frameCounter = 0
        }
    }
    this.activeFrames = this.actionsFrames[this.status]
  }
}