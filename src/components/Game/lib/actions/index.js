/*
 * @Author: your name
 * @Date: 2021-03-30 16:20:48
 * @LastEditTime: 2021-04-07 16:23:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/components/Game/lib/actions/index.js
 */
export function switchStatus() {
    if (this.pause)
        this.pause = false
    else
        this.pause = true
}
export function reset(){  
    this.broadcast('$myevent',12)
}