/*
 * @Author: your name
 * @Date: 2021-03-25 14:51:35
 * @LastEditTime: 2021-04-16 15:40:54
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
import frames_config from './frames.config.js'
// import {
//     load
// } from '../../utils/assetsLoader'
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
        this.xv = 0
        this.yv = 0
        this.zv = 0
        this.xa = 0
        this.ya = 0
        this.za = 0
        this.vector = [1, 1, 0]
        this.FramesDurationOfEachFrame = 1
        this.groupId = null
        this.rotation = 0
        this.sprit = ''
        this.frames = {}
        this.sprintCount = 0
        this.currentFrame = 0
        this._currentFrame = 0
        this._frameCounter = 0
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
                    if (this._CanvasManager.Player === this&& this.eventsLoop.length > 0) {
                        this.eventsLoop.map(({
                            $event,
                            callback
                        }) => this.on($event, callback))
                        this.eventsLoop = []
                    }
                    this._preRender()
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
        this.name = this.constructor.name
        this.init()
        this._load()
    }
    _load() { 
        this.load()
    }
    _preRender(){
        this.CanvasManager.preRenderSprints.push(this._loadImgs.bind(this))
    }
    async _loadImgs() { 
            var actions = frames_config[this.name]
            for (var i = 0; i < actions.length; i++) {
                var actionName = actions[i]
                var id = `${this.type}.${this.name}.actions.${actionName}`
                this.CanvasManager.AssetsManager.setTableName('Frames')
                const o= await this.CanvasManager.AssetsManager.get('ID', id) 
                var base64 = o.base64
                this.frames[actionName] = base64.map(bs64 => {
                    var f = new frame()
                    var img = new Image()
                    img.src = bs64
                    f.img = img
                    return f
                })
            }
        
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
        var currXV = this.xv = this.xv + this.xa
        var currYV = this.yv = this.yv + this.ya
        var currZV = this.zv = this.zv + this.za
        if (currXV <= 0) {
            currXV = 0
            this.xa = 0
        }
        if (currYV <= 0) {
            currYV = 0
            this.ya = 0
        }
        if (currZV <= 0) {
            currZV = 0
            this.za = 0
        }
        this.x += currXV * vx
        this.y += currYV * vy
        this.z += currZV * vz

        this.sprintCount = this.frames[this.status] ? this.frames[this.status].length || 1 : 1
        this._frameCounter += 1
        if (this.sprintCount > this.CanvasManager.FPS) {
            this.currentFrame += 1
            this.currentFrame = this._frameCounter % this.sprintCount
        } else {
            if ((this._frameCounter / this.FramesDurationOfEachFrame) > 1) {
                this._currentFrame += 1
                this._currentFrame = this._currentFrame % this.sprintCount
                this.currentFrame = this._currentFrame
                this._frameCounter = 0
            }
        }
        this.updating()
    }
    updating() {}
    _draw() {
        var actionFrames = this.frames[this.status]
        var actionFrame = null;
        if (actionFrames instanceof Array) {
            actionFrame = actionFrames[this.currentFrame%actionFrames.length]
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
    $emit($event, data,TargetId) {
        data.OriginId = this.id
        if (TargetId) { 
            data.TargetId = TargetId
        }else{
            data.TargetId = this.id
        }
        this.CanvasManager.broadcast($event, data)
    }
    on($event, callback) {
        if (!this.CanvasManager) {
            this.eventsLoop.push({
                $event,
                callback
            })
        } else {
            if(this.CanvasManager.Player===this)
            this.CanvasManager.registerEvent(this, $event, callback)
        }
    }
    addStatusFrames(status, frames) {
        this.frames[status] = frames
    }
}