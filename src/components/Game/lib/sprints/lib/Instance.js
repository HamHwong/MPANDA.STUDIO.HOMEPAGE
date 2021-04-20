/*
 * @Author: your name
 * @Date: 2021-03-25 14:51:35
 * @LastEditTime: 2021-04-20 16:56:28
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
    defaultEvent
} from '../../WSManager/default.event.class'
import STATUS from './status.enums'
import EVENTS from '../../WSManager/default.event.status' 
export class Instance {
    constructor(id) {
        this._beforeInit()
        this.id = id||v4()
        this.name = this.constructor.name
        this.type = '' 
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
        //方向矢量
        this.vector = [1, 1, 0]
        this.FramesDurationOfEachFrame = 1
        this.groupId = null
        this.rotation = 0 
        this.actionsFrames = {}
        this.framesCount = 0
        this.currentFrame = 0
        this._currentFrame = 0
        this._frameCounter = 0
        this._status = STATUS[this.name]?STATUS[this.name].INIT:null
        this._sync_timer = null
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
        this.offscreenCanvas = null
        this.offscreenCtx = null
        this._CanvasManager = null
        Object.defineProperty(this, 'CanvasManager', {
            get: function () {
                return this._CanvasManager
            },
            set: function (val) {
                if (!this._CanvasManager) {
                    this._beforeBind()
                    this._CanvasManager = val
                    if (this._CanvasManager.Player === this && this.eventsLoop.length > 0) {
                        this.eventsLoop.map(({
                            $event,
                            callback
                        }) => this.on($event, callback))
                        this.eventsLoop = []
                    } 
                    this.ctx = this._CanvasManager.ctx 
                    this._preRender()
                    this._afterBind()
                }
            }
        })
        this.eventsLoop = []
        this._init()
        this._afterInit()
    }
    _generateOffscreenCanvas (){
        this.offscreenCanvas = window.document.createElement('canvas')
        this.offscreenCanvas.height = this.CanvasManager.canvas.height
        this.offscreenCanvas.width = this.CanvasManager.canvas.width
        this.offscreenCtx = this.offscreenCanvas.getContext('2d')
    }
    /**
     * 初始化Instance前执行(内部)
     *
     * @memberof Instance
     */
    _beforeInit() {
        this.beforeInit()
    }
    /**
     * 初始化Instance前执行(可重写)
     *
     * @memberof Instance
     */
    beforeInit() {}
    /**
     * 初始化Instance末尾执行(内部)
     *
     * @memberof Instance
     */
    _init() {
        // this.name = this.constructor.name
        this.init()
        this._load()
    }
    /**
     * 初始化Instance末尾执行(可重写)
     *
     * @memberof Instance
     */
    init() {}

    /**
     * 初始化Instance后执行(内部)
     *
     * @memberof Instance
     */
    _load() {
        this.load()
    }
    /**
     * 初始化Instance后执行(可重写)
     *
     * @memberof Instance
     */
    load() {

    }
    _afterInit() {
        this.afterInit()
    }
    afterInit() {}
    /**
     * 在Instance.ManagerCanvas赋值前执行(内部)
     *
     * @memberof Instance
     */
    _beforeBind() {
        this.beforeBind()
    }
    /**
     * 在Instance.ManagerCanvas赋值前执行(可重写)
     *
     * @memberof Instance
     */
    beforeBind() {}
    /**
     * 在Instance.ManagerCanvas赋值后执行(内部)
     *
     * @memberof Instance
     */
    _afterBind() {
        this.afterBind()
    }
    /**
     * 在Instance.ManagerCanvas赋值后执行(可重写)
     *
     * @memberof Instance
     */
    afterBind() {}
    /**
     * 预加载素材Sprints图
     * 要CanvasManager完成初始化后渲染
     *
     * @memberof Instance
     */
    _preRender() {
        this.CanvasManager.preRenderSprints.push(this._loadImgs.bind(this))
    }
    /**
     * 加载Sprints帧图
     * CanvasManager初始化完成后渲染
     * @memberof Instance
     */
    async _loadImgs() {
        var actions = STATUS[this.name]
        for (var actionKey in actions) {
            var actionName = actions[actionKey]
            var id = `${this.type}.${this.name}.actions.${actionName}`
            this.CanvasManager.AssetsManager.setTableName('Frames')
            const o = await this.CanvasManager.AssetsManager.get('ID', id)
            var base64 = o.base64
            this.actionsFrames[actionName] = base64.map(bs64 => {
                var f = new frame()
                var img = new Image()
                img.src = bs64
                f.img = img
                return f
            })
        }
    }

    /**
     * 每1000/CanvasManager.FPS 毫秒执行一次(内部)
     *
     * @memberof Instance
     */
    _update() {
        this._beforeUpdate()
        this._updating()
        this._sync_to_all()
        this._draw()
        this._updated()
    }

    /**
     * 更新前执行(内部)
     *
     * @memberof Instance
     */
    _beforeUpdate() {
        this.beforeUpdate()
    }
    /**
     * 更新前执行(可重写)
     *
     * @memberof Instance
     */
    beforeUpdate() {}
    /**
     * 状态位置更新(内部)
     *
     * @memberof Instance
     */
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

        this.framesCount = this.actionsFrames[this.status] ? this.actionsFrames[this.status].length || 1 : 1
        this._frameCounter += 1
        if (this.framesCount > this.CanvasManager.FPS) {
            this.currentFrame += 1
            this.currentFrame = this._frameCounter % this.framesCount
        } else {
            if ((this._frameCounter / this.FramesDurationOfEachFrame) > 1) {
                this._currentFrame += 1
                this._currentFrame = this._currentFrame % this.framesCount
                this.currentFrame = this._currentFrame
                this._frameCounter = 0
            }
        }
        this.updating()
    }
    /**
     * 状态位置更新(可重写)
     *
     * @memberof Instance
     */
    updating() {

    }
    /**
     *更新后执行(内部)
     *
     * @memberof Instance
     */
    _updated() {
        this.updated()
    }
    /**
     *更新后执行(可重写)
     *
     * @memberof Instance
     */
    updated() {}
    /**
     * 同步到其他玩家(内部)
     *
     * @memberof Instance
     */
    _sync_to_all() {
        if (this._sync_timer || this.id !== this.CanvasManager.Player.id || !this.CanvasManager.WSManager.ISCONNECTED) return
        this._sync_timer = setTimeout(() => {
            var o = {
                x: this.x,
                y: this.y,
                z: this.z,
                w: this.w,
                h: this.h,
                xv: this.xv,
                yv: this.yv,
                zv: this.zv,
                xa: this.xa,
                ya: this.ya,
                za: this.za,
                rotation:this.rotation,
                vector: this.vector,
                currentFrame: this.currentFrame,
                _status: this._status,
            }
            this.CanvasManager.WSManager&&this.CanvasManager.WSManager.Send(new defaultEvent({
                $event: EVENTS.UPDATE,
                data: o
            }))
            this._sync_timer = null
        }, process.env.VUE_APP_WS_SPEED);
    }
    /**
     * 画
     *
     * @memberof Instance
     */
    _draw() {
        var actionFrames = this.actionsFrames[this.status]
        var actionFrame = null;
        if (actionFrames instanceof Array) {
            actionFrame = actionFrames[this.currentFrame % actionFrames.length]
        } else if (actionFrames instanceof Function) {
            actionFrame = actionFrames
        }

        if (actionFrame instanceof frame) {
            // this.ctx.globalCompositeOperation="source-in";
            // this.offscreenCtx.drawImage(actionFrame.img, this.x, this.y, this.w, this.h);
            this.ctx.rotate(this.rotation * Math.PI / 180);
            this.ctx.drawImage(actionFrame.img, this.x, this.y, this.w, this.h);
        } else if (actionFrame instanceof Function) {
            actionFrame.bind(this)(this.ctx)
        }
        if (this.debugMode) {
            this.debug()
        }
        //this.draw()
    }
    /**
     * 画
     *
     * @param {*} actionFrame
     * @memberof Instance
     */
    draw() {
        
    }
    /**
     * 绘制Debug信息
     *
     * @memberof Instance
     */
    debug() {
        var fontsize = 8;
        this.ctx.font = `${fontsize}px Verdana`;
        this.ctx.fillStyle = '#333'
        this.ctx.fillText(`currentFrame:${this.currentFrame};x:${this.x};y:${this.y};w:${this.w};h:${this.h}`, this.x - this.w, this.y + this.h);
    }
    /**
     * 开启Debug
     *
     * @memberof Instance
     */
    enableDebug() {
        this.debugMode = true
    }
    /**
     * 关闭Debug
     *
     * @memberof Instance
     */
    disableDebug() {
        this.debugMode = false
    }
    /**
     * 发起事件
     *
     * @param {*} $event
     * @param {*} data
     * @param {*} TargetId
     * @memberof Instance
     */
    $emit($event, data, TargetId) {
        data.OriginId = this.id
        if (TargetId) {
            data.TargetId = TargetId
        } else {
            data.TargetId = this.id
        }
        this.CanvasManager.broadcast($event, data)
    }
    /**
     * 响应事件
     *
     * @param {*} $event
     * @param {*} callback
     * @memberof Instance
     */
    on($event, callback) {
        if (!this.CanvasManager) {
            this.eventsLoop.push({
                $event,
                callback
            })
        } else {
            if (this.CanvasManager.Player === this)
                this.CanvasManager.registerEvent(this, $event, callback)
        }
    }
    
}