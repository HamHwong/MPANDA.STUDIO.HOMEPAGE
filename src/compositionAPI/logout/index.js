import store from '@/store'
// import {Dispatch} from 'vuex'
export async function logout(){
  return await store.dispatch('user/user_logout')
}