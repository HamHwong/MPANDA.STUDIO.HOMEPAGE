<template>
  <div>
    <input type="file" name="" id="" @change="handleUpload">
    <button>上传</button>
  </div>
</template>

<script>
import {UploadImage} from '@/api/index.js'
export default {
  data(){
    return {
      file:null
    }
  },
  methods:{
    async handleUpload(e){
      var file = e.target.files[0]
      var data = new FormData();
      data.append('file',file)
      await UploadImage(data)
    }
  }
}
</script>

<style>

</style>