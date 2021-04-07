/*
 * @Author: your name
 * @Date: 2021-03-30 16:38:32
 * @LastEditTime: 2021-04-07 17:06:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/lib/sprints/ball.js
 */
import {
    Instance
} from './Instance'
export class Ball extends Instance {
    constructor() {
        super()
    }
    init() {
        this.on('$myevent', (datas) => {
            console.log('init:', datas)
            this.xv = -this.xv
            this.yv = -this.yv
        })
    }
    draw() {
        this.ctx.fillStyle = "#FF0000";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 15, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
        this.currentFrame = (this.currentFrame + 1) % 60
    }
}