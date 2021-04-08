/*
 * @Author: your name
 * @Date: 2021-04-03 20:05:30
 * @LastEditTime: 2021-04-07 16:18:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MPANDA.STUDIO.HOMEPAGE\src\components\Game\lib\eventManager\index.js
 */
export class EventManager{
  constructor(){
    this.subscribers = {}
  }
  subscribe($event,callback) {
    if(!this.subscribers[$event]){
      this.subscribers[$event]=[]
    }
    this.subscribers[$event].push(callback)
  }
  unsubscribe($event,callback){
    if(!$event) return false
    if(!this.subscribers[$event]) return true
    if(callback){
      var index = this.subscribers[$event].indexOf(callback)
      if(index>0){
        this.subscribers[$event] = this.subscribers[$event].splice(index,1)
        return true
      }else{
        return false
      }
    }else{
      this.subscribers[$event]=[]
      return true
    }
  }
  trigger($event,data){ 
    this.subscribers[$event].map(function(callback){
      callback(data)
    })
  }
}