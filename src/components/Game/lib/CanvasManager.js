/*
 * @Author: your name
 * @Date: 2021-03-25 14:50:15
 * @LastEditTime: 2021-04-20 17:59:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/lib/CanvasManager.js
 */
import {
    EventManager
} from "./EventManager";
import {
    AssetsManager
} from './AssetsManager';
import {
    WSManager
} from './WSManager';
import {
    KeyboardManager
} from './KeyboardManager';
export class CanvasManager {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        // this.offscreenCanvas = null
        // this.offscreenCtx = null 
        this.messageBus = []
        this.sprints = []
        this.preRenderSprints = []
        this.AnimationFrameTimer = null
        this.pause = false
        this.devicePixelRatio = window.devicePixelRatio || 1;
        this.backingStoreRatio = this.ctx.webkitBackingStorePixelRatio ||
            this.ctx.mozBackingStorePixelRatio ||
            this.ctx.msBackingStorePixelRatio ||
            this.ctx.oBackingStorePixelRatio ||
            this.ctx.backingStorePixelRatio || 1;
        this.ratio = this.devicePixelRatio / this.backingStoreRatio
        this.FPS = 120
        this.EventManager = new EventManager()
        this.AssetsManager = null
        this.KeyboardManager = new KeyboardManager()
        this.WSManager = null
        this.Debug = false
        this.Player = null
    }
    async init({
        width = document.documentElement.clientWidth,
        height = 500,
        debug = false
    }) {
        //HiDPI
        this.canvas.height = height * this.ratio
        this.canvas.width = width * this.ratio
        this.canvas.style.height = height + 'px'
        this.canvas.style.width = width + 'px'
        this.ctx.scale(this.ratio, this.ratio);

        this.Debug = debug
        if (!this.EventManager)
            this.EventManager = new EventManager()
        if (!this.KeyboardManager)
            this.KeyboardManager = new KeyboardManager()

        this.KeyboardManager.init(this)
        this.initCursor()
        this.AssetsManager = new AssetsManager(this)
        await this.AssetsManager.init()
        this.preloadSprints()
        this.WSManager = new WSManager()
        this.WSManager.Connect(this)
        return this
    }
    start() {
        this.AnimationFrameTimer = this.draw()
        return this
    }
    initCursor() {
        this.canvas.addEventListener('mousemove', (e) => {
            e.preventDefault();
            //offsetX
            //offsetY
            console.log(e.offsetX, e.offsetY)
        })
    }
    preloadSprints() {
        this.preRenderSprints.map(func => func())
    }
    draw() {
        setTimeout(() => {
            var timer = window.requestAnimationFrame(this.draw.bind(this))
            if (!this.AnimationFrameTimer) this.AnimationFrameTimer = timer
            if (!this.pause) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                // 画角色
                this.sprints.map(sprint => {
                    sprint._update()
                })
            }
        }, 1000 / this.FPS);
    }
    addInstance(instance) {
        instance.CanvasManager = this
        if (!this.sprints.find(i => i.id === instance.id)) {
            this.sprints.push(instance)
            this.preloadSprints()
        }
        return this
    }
    removeInstance(id) {
        this.sprints = this.sprints.filter(sprint => sprint.id === id)
        return this
    }
    registerEvent(instance, $event, callback) {
        this.EventManager.subscribe($event, callback.bind(instance))
        return this
    }
    broadcast($event, data) {
        if (!data) {
            data = {}
        }
        if (typeof data === 'string') {
            var value = data
            data = {
                value
            }
        }
        data.OriginId = this.Player.id
        data.TargetId = this.Player.id
        this.EventManager.trigger($event, data)
        return this
    }
    drop() {
        this.pause = true
        this.canvas.remove();
        if (this.WSManager)
            this.WSManager.Close();
        this.WSManager = null
        if (this.KeyboardManager)
            this.KeyboardManager.removeKeyboardEvents();
        this.KeyboardManager = null
        this.AssetsManager = null
    }
}