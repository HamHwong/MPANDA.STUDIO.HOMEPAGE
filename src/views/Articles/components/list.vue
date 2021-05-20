<!--
 * @Author: your name
 * @Date: 2021-05-05 14:33:04
 * @LastEditTime: 2021-05-05 15:40:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MPANDA.STUDIO.HOMEPAGE\src\views\Articles\components\list.vue
-->
<template>
  <div>
    <div
      v-for="i in list.value"
      :key="i.id" 
    >
      <el-link
        type="primary"
        :href="`#/Article/View/${i._id}`"
        style="margin:10px 0;"
      >
        {{ i.title }}
      </el-link>  
    </div>
  </div>
</template>

<script>
import {Article} from '@/api'
import {getCurrentInstance, onMounted,reactive} from 'vue'
export default {
  props:{
    start:{
      type:Number,
      default:0
    },
    count:{
      type:Number,
      default:0
    },
    order:{
      type:Object,
      default:()=>{}
    },
    cate:{
      type:String,
      default:()=>''
    }
  },
  setup(props){ 
    //  Articles.List()
    let list = reactive({})
    onMounted(async ()=>{
      getCurrentInstance()
      const {cate,start,count,order} = props
      //console.log(cate,start,count,order)
      const a = await Article.List(cate,start,count,order)
      //console.log(a)
      const {Data,Message,IsSuccess} = a
      if(IsSuccess){
        list.value = Data
      }else{
        throw new Error(Message)
      } 
    })
    return {
      list
    }
  }
}
</script>

<style>

</style>