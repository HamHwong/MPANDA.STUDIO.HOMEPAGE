/*
 * @Author: your name
 * @Date: 2021-03-30 16:38:32
 * @LastEditTime: 2021-04-04 22:17:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/lib/sprints/ball.js
 */
import {Instance} from './Instance'
export class Ball extends Instance{
    constructor(){
        super()
        setTimeout(()=>this.init(),2000) 
    }
    init(){
        this.on('$myevent',()=>{
            console.log('init()',this)
            this.x=10
            this.y=10
        })
    }
    draw(){
        this.ctx.fillStyle="#FF0000";
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,15,0,Math.PI*2,true);
        this.ctx.closePath();
        this.ctx.fill();
        this.currentFrame = (this.currentFrame+1)%60
        this.update()
    }
    update(){
        this.x += 1
        this.y += 1 
    }
}