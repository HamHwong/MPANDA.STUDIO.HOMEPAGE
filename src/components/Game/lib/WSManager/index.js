/*
 * @Author: your name
 * @Date: 2021-04-16 16:18:16
 * @LastEditTime: 2021-04-16 17:36:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/lib/networkManager/index.js
 */
export class WSManager{
  constructor(){
    this.WSUrl = `${location.protocol==='https:'?'wss':'ws'}://${location.hostname}:8101`
    this.WS = null
    this.CanvasManager = null
  }
  Init(){
    this.WS.onmessage = (val)=>{
      const {data} = val
      console.log('说:',data)
    }
    this.WS.onclose=()=>{
      
    }
    this.WS.onopen=()=>{
      console.log('Opened')
    }
    
  }
  Connect(){
    try{
      this.WS = new WebSocket(this.WSUrl)
      this.Init()
    }catch(e){
      console.log('无法连接!')
      this.WS.close()
    }
  }
  Send(val){
    this.WS.send(val)
  }

  Close(){
    this.WS.close()
  }
}