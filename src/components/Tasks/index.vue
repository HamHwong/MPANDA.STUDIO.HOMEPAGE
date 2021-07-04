<template>
  <div class="todolist_container">
    <div 
      v-for="i in list"
      :key="i._id"
      class="todolist_row"
    >
      <el-checkbox
        :label="i.content"
      />  
      <small> 
        <el-divider direction="vertical" /> 
        {{ dateformat(i.createDate, 'yyyy-mm-dd HH:MM') }}  
      </small> 
    </div>
  </div>
</template>

<script>
import {Tasks} from '@/api'
import dateformat from 'dateformat'
import { onMounted, reactive } from '@vue/runtime-core'
  export default {
    setup(){
      const list = reactive([])
      onMounted(async ()=>{
        const {IsSuccess,Message,Data} = await Tasks.List()
        if(IsSuccess){ 
          Data.map(i=>list.push(i))
        }else{

        }
        console.log(list)
      })
      return {
        list,
        dateformat
      }
    }
}
</script>

<style lang="scss" scoped>
.todolist_container{
  text-align: left;
  &:deep(.el-checkbox){
    color:#fff;
  }
  .todolist_row{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0;
  }
}
</style>