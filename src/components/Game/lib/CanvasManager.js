/*
 * @Author: your name
 * @Date: 2021-03-25 14:50:15
 * @LastEditTime: 2021-04-17 22:04:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/lib/CanvasManager.js
 */
// import {
//     action
// } from './enums'
import * as actions from './actions'
import keyMapping from './keymap'
import {
    EventManager
} from "./eventManager";
import {
    AssetsManager
} from './assetsManager';
import {
    WSManager
} from './WSManager';
export class CanvasManager {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.document = null
        this.keyMapping = keyMapping
        this.eventsPool = actions
        this.messageBus = []
        this.sprints = []
        this.preRenderSprints = []
        this.AnimationFrameTimer = null
        this.pause = false
        this.FPS = 120
        this.EventManager = new EventManager()
        this.AssetsManager = null
        this.Debug = false
        this.Player = null
        this.WSManager = null
    }
    async init({
        width = 800,
        height = 500,
        debug = false
    }) {
        this.canvas.height = height
        this.canvas.width = width
        this.Debug = debug
        this.reloadKeyMapping()
        this.initKeyboardEvents()
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
    initKeyboardEvents(document) {
        console.log('CanvasManager.initKeyboardEvents:', this.EventManager)
        this.document = document || window.document
        this.document.addEventListener('keydown', e => {
            if (this.Debug) console.log('Key has been pressed:', e.code.trim())
            e.preventDefault()
            this.invoke(this.keyMapping[e.code.trim()])
        }, true)
        this.document.addEventListener('keyup', e => {
            if (this.Debug) console.log('Key up:', e.code.trim())
            e.preventDefault()
            this.broadcast('$keyup', e.code.trim())
        }, true)
        return this
    }
    removeKeyboardEvents() {
        this.document.removeKeyboardEvents('keydown')
        this.document.removeKeyboardEvents('keyup')
        return this
    }
    // Keyboard Trigger Broadcast// By user self
    invoke(eventName, {
        ...args
    }) {
        if (eventName && this.Debug) console.log('CanvasManager.invoke:', eventName)
        if (this.eventsPool[eventName] && typeof this.eventsPool[eventName] === 'function') this.eventsPool[eventName].call(this, {
            OriginId: this.id,
            TargetId: this.id,
            ...args
        })
        return this
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
                this.sprints.map(sprint => {
                    sprint._update()
                })
            }
        }, 1000 / this.FPS);
    }

    mappingKey(key, action) {
        for (var i in this.keyMapping) {
            if (this.keyMapping[i] === action) this.keyMapping[i] = null
        }
        this.keyMapping[key] = action
        return this
    }
    reloadKeyMapping() {
        for (var i in this.keyMapping) {
            this.mappingKey(i, this.keyMapping[i])
        }
        return this
    }
    addInstance(instance) {
        instance.ctx = this.ctx
        instance.CanvasManager = this
        this.sprints.push(instance)
        this.preloadSprints()
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
        // data.OriginId = this.id
        // data.TargetId  = data.TargetId || this.id 
        this.EventManager.trigger($event, data)
        return this
    }
}