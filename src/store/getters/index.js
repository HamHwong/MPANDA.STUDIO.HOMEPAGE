export default {
  isShownBG:state=>state.settings.isShownBG,
  isShowGame:state=>state.game.isShowGame,
  userId:state=>state.user._id,
  userDisplayName:state=>state.user.display_name,
  roles:state=>state.user.roles,
  hasLogin:(state)=>{
    var result = false
    if(state.user._id)result = true
    return result
  },
  isShowLoginDialog:state=>state.settings.isShowLoginDialog
}