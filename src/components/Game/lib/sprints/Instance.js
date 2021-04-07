/*
 * @Author: your name
 * @Date: 2021-03-25 14:51:35
 * @LastEditTime: 2021-04-07 17:17:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/lib/Instance.js
 */
import {
    v4
} from 'uuid'
export class Instance {
    constructor() {
        this._beforeInit()
        this.id = v4()
        this.type = ''
        this.pic = ''
        this.x = 0
        this.y = 0
        this.z = 0
        this.w = 0
        this.h = 0
        this.xv = 1
        this.yv = 1
        this.zv = 0
        this.vector = [1, 1, 0]
        this.groupId = null
        this.rotation = 0
        this.sprit = ''
        this.frames = {}
        this.currentFrame = 0
        this.status = ''
        this.pause = false
        this.ctx = null
        this._CanvasManager = null
        Object.defineProperty(this, 'CanvasManager', {
            get: function () {
                return this._CanvasManager
            },
            set: function (val) {
                if (!this._CanvasManager) {
                    this._beforeBind()
                    this._CanvasManager = val
                    if (this.eventsLoop.length > 0) {
                        this.eventsLoop.map(({
                            $event,
                            callback
                        }) => this.on($event, callback))
                        this.eventsLoop = []
                    }
                    this._afterBind()
                }
            }
        })
        this.eventsLoop = []
        this._init()
        this._afterInit()
    }
    _beforeInit() {
        this.beforeInit()
    }
    beforeInit() {}
    _init() {
        this.init()
    }
    init() {}
    _afterInit() {
        this.afterInit()
    }
    afterInit() {}
    _beforeBind() {
        this.beforeBind()
    }
    beforeBind() {}
    _afterBind() {
        this.afterBind()
    }
    afterBind() {}
    _update() {
        this._beforeUpdate()
        this._updating()
        this._draw()
        this._updated()
    }
    _updating() {
        var [vx, vy, vz] = this.vector
        this.x += this.xv * vx
        this.y += this.yv * vy
        this.z += this.zv * vz
        var currentFrame = this.frames[this.status]?this.frames[this.status].length:0
        this.currentFrame=++this.currentFrame%currentFrame
        // console.log(currentFrame)
        this.updating()
    }
    updating() {}
    _draw() {
        this.draw()
    }
    draw() {}
    _beforeUpdate() {
        this.beforeUpdate()
    }
    beforeUpdate() {}
    _updated() {
        this.updated()
    }
    updated() {}
    on($event, callback) {
        if (!this.CanvasManager) {
            this.eventsLoop.push({
                $event,
                callback
            })
        } else {
            this.CanvasManager.registerEvent(this, $event, callback)
        }
    }
}