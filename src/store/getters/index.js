export default {
  isShownGB:state=>state.settings.isShownGB,
  isShowGame:state=>state.game.isShowGame,
  userId:state=>state.user._id,
  userDisplayName:state=>state.user.display_name,
  roles:state=>state.user.roles
}