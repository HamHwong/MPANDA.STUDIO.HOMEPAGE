/*
 * @Author: your name
 * @Date: 2021-04-17 16:07:32
 * @LastEditTime: 2021-04-17 23:16:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MPANDA.STUDIO.HOMEPAGE\src\components\Game\lib\WSManager\utils\index.js
 */
import Events from '../default.event'
import {
  defaultEvent
} from '../default.event.class'
import {
  Ball
} from '../../sprints/models/Ball'
export class WSEventsManager {
  constructor(WSManager) {
    this.WSManager = WSManager
  }
  handleEvents(event) {
    try {
      var e = JSON.parse(event)
      const {
        $event,
        data,
        from
      } = e
      switch ($event) {
        case Events.NEWBORN:
          var ball = new Ball()
          ball.id = from
          this.WSManager.CanvasManager.addInstance(ball)
          this.WSManager.Send(new defaultEvent({
            $event: Events.UPDATE_USERS,
            data: {
              id: this.WSManager.CanvasManager.Player.id
            }
          }))
          break
        case Events.UPDATE:
          // console.log('this.WSManager.CanvasManager.sprints',this.WSManager.CanvasManager.sprints.length)
          this.WSManager.CanvasManager.sprints.filter(o => o.id === from).map(i => {
            const {
              x,
              y,
              z,
              w,
              h,
              xv,
              yv,
              zv,
              xa,
              ya,
              za,
              vector,
              currentFrame,
              _status,
            } = data
            i.x = x
            i.y = y
            i.z = z
            i.w = w
            i.h = h
            i.xv = xv
            i.yv = yv
            i.zv = zv
            i.xa = xa
            i.ya = ya
            i.za = za
            i.vector = vector
            i.currentFrame = currentFrame
            i._status = _status
          })
          break
        case Events.UPDATE_USERS:
          if (data.from !== this.WSManager.CanvasManager.Player.id) {
            var b = new Ball();
            b.id = data.from
            this.WSManager.CanvasManager.addInstance(b)
          }
          break;
        case Events.LEAVE:
          console.log('Events.LEAVE',Events.LEAVE,from)
          this.WSManager.CanvasManager.sprints= this.WSManager.CanvasManager.sprints.filter(o => o.id !== from)
          break
        default:
          break
      }
    } catch (e) {
      console.log('err', e)
    }
  }
}