/*
 * @Author: your name
 * @Date: 2021-03-30 16:38:32
 * @LastEditTime: 2021-04-08 17:37:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/lib/sprints/ball.js
 */
import {
    Characters
} from '../../Imodels/Characters'

export class Ball extends Characters {
    constructor() {
        super()
    }
    init() {
        this.on('$myevent', (datas) => {
            console.log('init:', datas)
            this.xv = -this.xv
            this.yv = -this.yv
        })
        this.w = 50
        this.h = 50
        this.enableDebug()
    }
    load() {
        // this.addStatusFrames('init', function (ctx) {
        //     ctx.fillStyle = "#FF0000";
        //     ctx.beginPath();
        //     this.w = 15 * 2;
        //     this.h = 15 * 2
        //     ctx.arc(this.x, this.y, this.w / 2, 0, Math.PI * 2, true);
        //     ctx.closePath();
        //     ctx.fill();
        // })
    }
}