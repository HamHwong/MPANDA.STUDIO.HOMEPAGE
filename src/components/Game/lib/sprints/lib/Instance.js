/*
 * @Author: your name
 * @Date: 2021-03-25 14:51:35
 * @LastEditTime: 2021-04-18 20:58:28
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
import STATUS from './type.enums'
import EVENTS from '../../WSManager/default.event.status'
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
        this._status = STATUS.INIT
        this._sync_timer = null
        this.debugMode = false
        this.saysomething = null
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
                    if (this._CanvasManager.Player === this && this.eventsLoop.length > 0) {
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
        this.name = this.constructor.name
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
        var actions = frames_config[this.name]
        for (var i = 0; i < actions.length; i++) {
            var actionName = actions[i]
            var id = `${this.type}.${this.name}.actions.${actionName}`
            this.CanvasManager.AssetsManager.setTableName('Frames')
            const o = await this.CanvasManager.AssetsManager.get('ID', id)
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
                vector: this.vector,
                currentFrame: this.currentFrame,
                _status: this._status,
            }
            this.CanvasManager.WSManager.Send(new defaultEvent({
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
        var actionFrames = this.frames[this.status]
        var actionFrame = null;
        if (actionFrames instanceof Array) {
            actionFrame = actionFrames[this.currentFrame % actionFrames.length]
        } else if (actionFrames instanceof Function) {
            actionFrame = actionFrames
        }
        this.draw(actionFrame)
    }
    /**
     * 画
     *
     * @param {*} actionFrame
     * @memberof Instance
     */
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