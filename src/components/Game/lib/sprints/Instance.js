/*
 * @Author: your name
 * @Date: 2021-03-25 14:51:35
 * @LastEditTime: 2021-04-03 20:32:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/lib/Instance.js
 */
import {v4} from 'uuid'
export class Instance {
    constructor() {
        this.id = v4()
        this.type = ''
        this.pic = ''
        this.x = 0
        this.y = 0
        this.w = 0
        this.h = 0
        this.groupId = null
        this.rotation = 0
        this.sprit = ''
        this.frames = []
        this.currentFrame = 0
        this.status = ''
        this.pause = false
        this.ctx = null
        this.CanvasManager = null
    }
    draw() {}
    check() {}
    on($event,callback){
        this.CanvasManager.registerEvent(this,$event,callback)
    }
    update(){}
}