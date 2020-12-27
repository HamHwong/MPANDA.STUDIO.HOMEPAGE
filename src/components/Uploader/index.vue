<!--
 * @Author: your name
 * @Date: 2020-12-21 00:23:48
 * @LastEditTime: 2020-12-23 10:37:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /homepage/src/components/Uploader/index.vue
-->
<template>
  <div>
    <div>
      <img
        :src="img"
        alt=""
      >
    </div>
    <div
      v-for="i in results"
      :key="i.fileId"
    > 
      <img
        :src="i.base64"
        alt=""
      >
    </div>
    <div>
      <input
        id=""
        ref=""
        type="file"
        name=""
        @change="handleMountFile"
      >
      <button
        :disabled="!file || loading"
        @click="handleUploadClick"
      >
        {{ loading ? "上传中" : "上传" }}
      </button>
      <button
        :disabled="!file || loading"
        @click="UploadMXDImage"
      >
        {{ loading ? "上传中" : "上传到MXD" }}
      </button>

      <button
        :disabled="!file || loading"
        @click="GetMXDImageInfo"
      >
        {{ loading ? "上传中" : "查询" }}
      </button>
    </div>
  </div>
</template>

<script>
import { UploadImage, GetImage, GetMXDImageInfo, UploadMXDImage } from "@/api/index.js";
export default {
  props:['paste'],
  data () {
    return {
      loading: false,
      file: null,
      id: "",
      img: null,
      results: []
    };
  },
  watch:{
    paste:{
      handler(obj){ 
        this.file = obj 
        console.log(this.img)
      },
      // immediate:true,
      // deep:true
    }
  },
  methods: {
    handleMountFile (e) {
      this.file = e.target.files[0];
    },
    async handleUploadClick () {
      await this.handleUpload();
      await this.handleReadImage();
    },
    async handleUpload () {
      this.loading = true;
      var data = new FormData();
      data.append("file", this.file);
      var { Data, Message, IsSuccess } = await UploadImage(data).catch(() => {
        this.loading = false;
      });
      if (IsSuccess) {
        this.id = Data;
      } else {
        throw new Error(Message);
      }
      this.loading = false;
    },
    async UploadMXDImage () {
      this.loading = true;
      var data = new FormData();
      data.append("file", this.file);
      var { Data, Message, IsSuccess } = await UploadMXDImage(data).catch(() => {
        this.loading = false;
      });
      if (IsSuccess) {
        this.id = Data;
      } else {
        throw new Error(Message);
      }
      this.loading = false;
      await this.handleReadImage();
    },
    async GetMXDImageInfo () {

      this.loading = true;
      var data = new FormData();
      data.append("file", this.file);
      var { Data, IsSuccess } = await GetMXDImageInfo(data).catch(() => {
        this.loading = false;
      });
      if (IsSuccess) {
        this.results = await Data
        Data.map(async item => {
          return await this.handleResultImage(item.fileId).then((response) => {
            // console.log('res', response)
            var index = this.results.findIndex(i => i.fileId == response.fileId)
            this.results[index].base64 = response.base64
          })
        })
      }
      this.loading = false;
    },
    async handleReadImage () {
      if (this.id) {
        this.loading = true;
        var { Data, IsSuccess } = await GetImage({ id: this.id }).catch(() => {
          this.loading = false;
        });
        if (IsSuccess) {
          const { base64 } = Data;
          let imgBase64 = base64;
          // console.log('imgBase64', imgBase64)
          this.img = imgBase64;
        }
        this.loading = false;
      }
    },
    async handleResultImage (id) {
      if (id) {
        // this.loading = true;
        var { Data, IsSuccess } = await GetImage({ id: id }).catch(() => {
          this.loading = false;
        });
        if (IsSuccess) {
          return Data
        }
      }
    },
  },
};
</script>

<style>
</style>