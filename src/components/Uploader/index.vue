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
    <div>
      <img :src="img" alt="" style="max-width:300px;max-height:200px"/>
    </div>
    <div>
      <input
        ref=""
        type="file"
        name=""
        id=""
        @change="handleMountFile"
      >
      <button :disabled="!file" @click="handleUploadClick">{{process}}</button> 
    </div>
  </div>
</template>

<script>
import { UploadImage, GetImage } from '@/api/index.js'
export default {
  data () {
    return {
      process:'上传',
      file: null,
      id: '',
      img:null
    }
  },
  methods: {
    handleMountFile (e) {
      this.file = e.target.files[0]
    },
    async handleUploadClick () {
      await this.handleUpload()
      await this.handleReadImage()
    },
    async handleUpload () {
      this.process='上传中...'
      var data = new FormData();
      data.append('file', this.file)
      var { Data, Message, IsSuccess } = await UploadImage(data) 
      if (IsSuccess) {
        this.id = Data
      } else {
        throw new Error(Message)
      }
      
      this.process='上传完成'
    },
    async handleReadImage () {
      if (this.id) { 
        this.process='载入中...'
        var {Data,IsSuccess} = await GetImage({ id: this.id }) 
        if(IsSuccess){ 
          const {base64,suffix} = Data 
          let imgBase64 = ''
          switch(suffix){
            case'png':
            imgBase64 = 'data:image/png;base64,'+base64
            break;
            case'jpg':
            case'jpeg':
            imgBase64 = 'data:image/jpeg;base64,'+base64
            break;
            case'gif':
            imgBase64 =  'data:image/gif;base64,'+base64
            break;
          }
          this.img = imgBase64 
        }
        this.process='上传'
      }
    }
  }
}
</script>

<style>
</style>