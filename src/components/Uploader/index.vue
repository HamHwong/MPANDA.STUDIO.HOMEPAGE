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
      <img :src="img" alt="" style="max-width: 300px; max-height: 200px" />
    </div>
    <div>
      <input ref="" type="file" name="" id="" @change="handleMountFile" />
      <button :disabled="!file || loading" @click="handleUploadClick">
        {{ loading ? "上传中" : "上传" }}
      </button>
    </div>
  </div>
</template>

<script>
import { UploadImage, GetImage } from "@/api/index.js";
export default {
  data() {
    return {
      loading: false,
      file: null,
      id: "",
      img: null,
    };
  },
  methods: {
    handleMountFile(e) {
      this.file = e.target.files[0];
    },
    async handleUploadClick() {
      await this.handleUpload();
      await this.handleReadImage();
    },
    async handleUpload() {
      this.loading = true;
      var data = new FormData();
      data.append("file", this.file);
      var { Data, Message, IsSuccess } = await UploadImage(data);
      if (IsSuccess) {
        this.id = Data;
      } else {
        throw new Error(Message);
      }

      this.loading = false;
    },
    async handleReadImage() {
      if (this.id) {
        this.loading = true;
        var { Data, IsSuccess } = await GetImage({ id: this.id });
        if (IsSuccess) {
          const { base64, suffix } = Data;
          let imgBase64 = "";
          switch (suffix) {
            case "png":
              imgBase64 = "data:image/png;base64," + base64;
              break;
            case "jpg":
            case "jpeg":
              imgBase64 = "data:image/jpeg;base64," + base64;
              break;
            case "gif":
              imgBase64 = "data:image/gif;base64," + base64;
              break;
          }
          this.img = imgBase64;
        }
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>