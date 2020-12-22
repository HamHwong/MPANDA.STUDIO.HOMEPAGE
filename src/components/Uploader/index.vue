<!--
 * @Author: your name
 * @Date: 2020-12-21 00:23:48
 * @LastEditTime: 2020-12-22 17:35:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /homepage/src/components/Uploader/index.vue
-->
<template>
  <div>
    <input ref="" type="file" name="" id="" @change="handleMountFile">
    <button @click="handleUploadClick">上传</button>
    <button @click="handleReadImage">读取</button>
  </div>
</template>

<script>
import {UploadImage,GetImage} from '@/api/index.js'
export default {
  data(){
    return {
      file:null,
      id:''
    }
  },
  methods:{
    handleMountFile(e){
      this.file = e.target.files[0]
    },
    handleUploadClick(){
      this.handleUpload()
    },
    async handleUpload(){
        var data = new FormData();
        data.append('file',this.file)
        var {Data,Message,IsSuccess} =  await UploadImage(data)
        console.log('IsSuccess',IsSuccess)
        if(IsSuccess){
          this.id = Data
        }else{
          throw new Error(Message)
        }
    },
    handleReadImage(){
      if(this.id){
        GetImage({id:this.id})
      }
    }
  }
}
</script>

<style>

</style>