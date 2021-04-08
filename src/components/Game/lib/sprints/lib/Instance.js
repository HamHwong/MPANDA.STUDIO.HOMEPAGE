/*
 * @Author: your name
 * @Date: 2021-03-25 14:51:35
 * @LastEditTime: 2021-04-08 15:21:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/lib/Instance.js
 */
import {
    v4
} from 'uuid'
import {
    frame
} from '../../frame'
import {
    load
} from '../../utils/assetsLoader'
// import * as sprint from '../../static/characters/char1/init/char1-init-1.png'
export class Instance {
    constructor() {
        this._beforeInit()
        this.id = v4()
        this.name = ''
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
        this._status = 'init'
        this.debugMode = false
        Object.defineProperty(this, 'status', {
            get: function () {
                return this._status
            },
            set: function (val) {
                this.$emit('$event.emit.data', {
                    status: val
                })
                this._status = val
            }
        })
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
        this._load()
    }
    _load() {
        this._loadImgs()
        this.load()
    }
    async _loadImgs() {
        const arr = []
        const frame1 = new frame()
        frame1.img = await load(require('../../../static/characters/char1/init/char1-init-1.png'))
        const frame2 = new frame()
        frame2.img = await load(require('../../../static/characters/char1/init/char1-init-2.png'))
        arr.push(frame1)
        arr.push(frame2)
        this.addStatusFrames('init', arr)

    }
    load() {

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
        var frameCount = this.frames[this.status] ? this.frames[this.status].length || 1 : 1
        this.currentFrame += 1
        this.currentFrame = this.currentFrame % frameCount
        this.updating()
    }
    updating() {}
    _draw() {
        var actionFrames = this.frames[this.status]
        var actionFrame = null;
        if (actionFrames instanceof Array) {
            actionFrame = actionFrames[this.currentFrame]
        } else if (actionFrames instanceof Function) {
            actionFrame = actionFrames
        }
        this.draw(actionFrame)
    }
    draw(actionFrame) {
        if (actionFrame instanceof frame) {
            this.ctx.drawImage(actionFrame.img, this.x, this.y, this.w, this.h);
        } else if (actionFrame instanceof Function) {
            actionFrame.bind(this)(this.ctx)
        }
        if (this.debugMode) {
            this.debug()
        }
    }
    debug() {
        var fontsize = 8;
        this.ctx.font = `${fontsize}px Verdana`;
        this.ctx.fillStyle = '#333'
        this.ctx.fillText(`currentFrame:${this.currentFrame};x:${this.x};y:${this.y};w:${this.w};h:${this.h}`, this.x - this.w, this.y + this.h);
    }
    enableDebug() {
        this.debugMode = true
    }
    disDebug() {
        this.debugMode = false
    }
    _beforeUpdate() {
        this.beforeUpdate()
    }
    beforeUpdate() {}
    _updated() {
        this.updated()
    }
    updated() {}
    $emit($event, TargetId, data) {
        data.originId = this.id
        data.TargetId = TargetId
        this.CanvasManager.broadcast($event, data)
    }
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
    addStatusFrames(status, frames) {
        this.frames[status] = frames
    }
}