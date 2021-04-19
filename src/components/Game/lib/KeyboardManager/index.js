/*
 * @Author: your name
 * @Date: 2021-04-19 15:14:08
 * @LastEditTime: 2021-04-19 15:32:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/lib/KeyboardManager/index.js
 */
import keyMapping from './keymap'
import * as actions from './actions'
export class KeyboardManager {
  constructor(document) {
    this.document = document || window.document
    this.keyMapping = keyMapping
    this.eventsPool = actions
    this.CanvasManager = null
  }
  init(CanvasManager) {
    this.CanvasManager = CanvasManager
    this.reloadKeyMapping()
    this.initKeyboardEvents()
  }
  initKeyboardEvents() {
    this.document.addEventListener('keydown', e => {
      if (this.CanvasManager.Debug) console.log('Key has been pressed:', e.code.trim())
      // e.preventDefault()
      this.invoke(this.keyMapping[e.code.trim()])
    }, true)
    this.document.addEventListener('keyup', e => {
      if (this.CanvasManager.Debug) console.log('Key up:', e.code.trim())
      // e.preventDefault()
      this.CanvasManager.broadcast('$keyup', e.code.trim())
    }, true)
    return this
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
  removeKeyboardEvents() {
    this.document.removeKeyboardEvents('keydown')
    this.document.removeKeyboardEvents('keyup')
    return this
  }
  invoke(eventName, {
    ...args
  }) {
    if (eventName && this.CanvasManager.Debug) console.log('CanvasManager.invoke:', eventName)
    if (this.eventsPool[eventName] && typeof this.eventsPool[eventName] === 'function') this.eventsPool[eventName].call(this.CanvasManager, {
      OriginId: this.id,
      TargetId: this.id,
      ...args
    })
    return this
  }
}