import vAuth from './v-auth'
const list = [
  {
    auth:vAuth
  }
]
export default {
  install: function (app) {
    list.forEach((directive) => {
      for (var directiveTag in directive) {
        app.directive(directiveTag,directive[directiveTag])
      }
    })
  }
}
