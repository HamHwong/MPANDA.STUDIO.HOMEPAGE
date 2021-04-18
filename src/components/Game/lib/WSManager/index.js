/*
 * @Author: your name
 * @Date: 2021-04-16 16:18:16
 * @LastEditTime: 2021-04-18 13:45:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/lib/networkManager/index.js
 */
import EVENTS from './default.event'
import { defaultEvent } from './default.event.class'
import { WSEventsManager } from './WSEventsManager'


export class WSManager{
  constructor(){
    var port = process.env.NODE_ENV===`production`?8111:8110;
    this.WSUrl = `${location.protocol==='https:'?'wss':'ws'}://${location.hostname}:${port}`
    this.WS = null
    this.CanvasManager = null
    this.WSEventsManager = new WSEventsManager(this)
  }
  Init(CanvasManager){
    this.WS.onmessage = (val)=>{
      const {data} = val
      // console.log('说:',data)
      this.WSEventsManager.handleEvents(data)
    }
    this.WS.onclose=()=>{
      this.Send(new defaultEvent({$event:EVENTS.LEAVE})) 
    }
    this.WS.onopen=()=>{  
      this.Send(new defaultEvent({$event:EVENTS.NEWBORN}))
    }
    this.CanvasManager = CanvasManager
  }
  Connect(CanvasManager){
    try{
      this.WS = new WebSocket(this.WSUrl)
      this.Init(CanvasManager)
    }catch(e){
      console.log('无法连接!')
      this.WS.close()
    }
  }
  Send(event){
    event.from = this.CanvasManager.Player.id 
    this.WS.send(JSON.stringify(event))
  }

  Close(){
    this.WS.close()
  }
}