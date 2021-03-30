/*
 * @Author: your name
 * @Date: 2021-03-25 14:50:15
 * @LastEditTime: 2021-03-30 17:28:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/lib/CanvasManager.js
 */
// import {
//     action
// } from './enums'
import * as actions from './actions'
import keyMapping  from './keymap'
export class CanvasManager {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.document = null
        this.keyMapping = keyMapping
        this.eventsPool = actions
        this.messageBus = []
        this.sprints = []
        this.AnimationFrameTimer = null
        this.pause = false
        this.FPS = 0.5
    }
    init({
        width = 800,
        height = 500
    }) {
        //console.log('Canvas Init Start!',this.canvas)
        this.canvas.height = height
        this.canvas.width = width
        //this.AnimationFrameTimer = setInterval(this.draw.bind(this),Math.ceil(1000/this.FPS))
        this.reloadKeyMapping()
        return this
    }  
    start(){
        this.AnimationFrameTimer = this.draw()
    }
    initKeyboardEvents(document) {
        this.document = document || window.document
        this.document.addEventListener('keyup', e => {
            this.invoke(this.keyMapping[e.code])
        }, true)
    }
    removeKeyboardEvents() {
        this.document.removeKeyboardEvents('keyup')
    }
    invoke(eventName, ...args) {
        if (this.eventsPool[eventName] && typeof this.eventsPool[eventName] === 'function') this.eventsPool[eventName].call(this, ...args)
    }
    register(key, func) {
        if (typeof func === 'function') this.eventsPool[this.keyMapping[key]] = func.bind(this)
    }
    resign(key) {
        if (this.eventsPool[key] && typeof this.eventsPool[key] === 'function') this.eventsPool[key] = null
    }
    draw() {
        if (!this.pause) {
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
            this.sprints.map(sprint=>{
                sprint.draw()
            })
        }
        return window.requestAnimationFrame(this.draw.bind(this),1000/this.FPS)
    }
    
    mappingKey(key, action) {
        for (var i in this.keyMapping) {
            if (this.keyMapping[i] === action) this.keyMapping[i] = null
        }
        this.keyMapping[key] = action
    }
    reloadKeyMapping() {
        for (var i in this.keyMapping) {
            this.mappingKey(i, this.keyMapping[i])
        }
    }
    addInstance(instance){ 
        instance.ctx = this.ctx
        this.sprints.push(instance)
    }
    removeInstance(id){
        this.sprints = this.sprints.filter(sprint=>sprint.id===id)
    }
}