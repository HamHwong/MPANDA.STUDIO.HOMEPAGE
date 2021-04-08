/*
 * @Author: your name
 * @Date: 2021-04-08 15:13:57
 * @LastEditTime: 2021-04-08 17:43:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/lib/sprints/character.js
 */
import { frame } from '../../frame'
import { load } from '../../utils/assetsLoader'
import {
  Instance
} from '../lib/Instance'

export class Characters extends Instance{
  constructor(){
    super()
    this.type = 'characters'
  }
  async load(){ 
    // const arr = []
    // const frame1 = new frame()
    // frame1.img = await load(require('../../../static/characters/char1/init/char1-init-1.png'))
    // const frame2 = new frame()
    // frame2.img = await load(require('../../../static/characters/char1/init/char1-init-2.png'))
    // arr.push(frame1)
    // arr.push(frame2)
    // this.addStatusFrames('init', arr) 
  }
}