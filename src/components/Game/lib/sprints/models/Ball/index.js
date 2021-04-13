/*
 * @Author: your name
 * @Date: 2021-03-30 16:38:32
 * @LastEditTime: 2021-04-13 22:20:04
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
        this.on('$keyup', (keyCode) => {
            switch (keyCode) {
                case 'KeyA':
                case 'KeyD':
                    this.status = 'init'
                    this.xa = -0.5
                    break;
            }
        })
        this.on('$walk.left', (data) => { 
            this.status = 'walk.left' 
            this.xa = 0
            this.xv = 10
            this.vector[0] = -1
        })
        this.on('$walk.right', (data) => {
            this.status = 'walk.right' 
            this.xa = 0
            this.xv = 10 
            this.vector[0] = 1
        })
        this.w = 80
        this.h = 110
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