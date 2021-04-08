/*
 * @Author: your name
 * @Date: 2021-03-25 14:50:15
 * @LastEditTime: 2021-04-08 11:05:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/lib/CanvasManager.js
 */
// import {
//     action
// } from './enums'
import * as actions from './actions'
import keyMapping  from './keymap'
import {EventManager} from "./eventManager";
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
        this.EventManager = new EventManager()
    }
    async init({
        width = 800,
        height = 500
    }) { 
        this.canvas.height = height
        this.canvas.width = width
        this.reloadKeyMapping()
        this.initKeyboardEvents()
        return this
    }  
    start(){
        this.AnimationFrameTimer = this.draw()
        return this
    }
    initKeyboardEvents(document) {
        console.log('CanvasManager.initKeyboardEvents:',this.EventManager)
        this.document = document || window.document
        this.document.addEventListener('keyup', e => { 
            this.invoke(this.keyMapping[e.code.trim()])
        }, true)
        return this
    }
    removeKeyboardEvents() {
        this.document.removeKeyboardEvents('keyup')
        return this
    }
    invoke(eventName, ...args) {
        if(eventName)console.log('CanvasManager.invoke:',eventName)
        if (this.eventsPool[eventName] && typeof this.eventsPool[eventName] === 'function') this.eventsPool[eventName].call(this, ...args)
        return this
    } 
    draw() {
        if (!this.pause) {
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
            this.sprints.map(sprint=>{
                sprint._update()
            })
        }
        return window.requestAnimationFrame(this.draw.bind(this),1000/this.FPS)
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
    addInstance(instance){ 
        instance.ctx = this.ctx
        instance.CanvasManager = this 
        this.sprints.push(instance)
        return this
    }
    removeInstance(id){
        this.sprints = this.sprints.filter(sprint=>sprint.id===id)
        return this
    }
    registerEvent(instance,$event,callback){
        this.EventManager.subscribe($event,callback.bind(instance))
        return this
    }
    broadcast($event, data){ 
        this.EventManager.trigger($event, data)
        return this
    }
}