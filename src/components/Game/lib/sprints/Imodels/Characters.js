/*
 * @Author: your name
 * @Date: 2021-04-08 15:13:57
 * @LastEditTime: 2021-04-19 14:35:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/lib/sprints/character.js
 */
// import { frame } from '../../frame'
// import { load } from '../../utils/assetsLoader'
import {
  Instance
} from '../lib/Instance'

export class Characters extends Instance{
  constructor(id){
    super(id)
    this.type = 'characters'
    this.saysomething = null
  } 
}