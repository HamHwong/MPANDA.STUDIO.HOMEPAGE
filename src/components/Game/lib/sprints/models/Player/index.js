/*
 * @Author: your name
 * @Date: 2021-03-30 16:38:32
 * @LastEditTime: 2021-04-23 11:22:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/lib/sprints/ball.js
 */
import {
    ICharacter
} from '../../Imodels/ICharacter'

export class Player extends ICharacter {
    constructor(id) {
        super(id)
    }
    init() { 
        this.on('$keyup', ({value:keyCode}) => {
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
            this.xv = 4
            this.vector[0] = -1
        })
        this.on('$walk.right', (data) => {
            this.status = 'walk.right' 
            this.xa = 0
            this.xv = 4
            this.vector[0] = 1
        })
        var scale = 0.8
        this.w = 80*scale
        this.h = 110*scale
        this.FramesDurationOfEachFrame = 12
        this.enableDebug()
    }
}