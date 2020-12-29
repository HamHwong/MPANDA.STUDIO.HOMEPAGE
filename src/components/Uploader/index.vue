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
      <el-row>
        <el-col>
          <el-input 
          size="mini"
          v-model="id"
          :disabled="loading"/>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <input
            id=""
            ref=""
            type="file"
            name=""
            @change="handleMountFile"
          >
          <el-button
            size="mini"
            :disabled="!file || loading"
            @click="handleUploadClick"
          >
            {{ loading ? "上传中" : "上传图片" }}
          </el-button>
          <el-button
            size="mini"
            :disabled="!file || loading"
            @click="GetBinarizationImage"
          >
            {{ loading ? "上传中" : "二值化图片" }}
          </el-button>
          <el-button
            size="mini"
            :disabled="!id || loading"
            @click="HandleBinarizationImageWithID"
          >
            {{ loading ? "上传中" : "通过ID查询二值化图片" }}
          </el-button>
          <el-button
            size="mini"
            :disabled="!file || loading"
            @click="UploadMXDImage"
          >
            {{ loading ? "上传中" : "上传MXD图片" }}
          </el-button>
          <el-button
            size="mini"
            :disabled="!file || loading"
            @click="SearchMXDImage"
          >
            {{ loading ? "上传中" : "以图片查询MXD图片" }}
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { Image,MXD } from "@/api/index.js";
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
      }, 
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
      var { Data, Message, IsSuccess } = await Image.UploadImage(data).catch(() => {
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
      var { Data, Message, IsSuccess } = await MXD.UploadMXDImage(data).catch(() => {
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
    async SearchMXDImage () { 
      this.loading = true;
      var data = new FormData();
      data.append("file", this.file);
      var { Data, IsSuccess } = await MXD.SearchMXDImage(data).catch(() => {
        this.loading = false;
      });
      if (IsSuccess) {
        this.results = await Data
        Data.map(async item => {
          return await this.handleResultImage(item.fileId).then((response) => { 
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
        var { Data, IsSuccess } = await Image.GetImage({ id: this.id }).catch(() => {
          this.loading = false;
        });
        if (IsSuccess) {
          const { base64 } = Data;
          let imgBase64 = base64; 
          this.img = imgBase64;
        }
        this.loading = false;
      }
    },
    async handleResultImage (id) {
      if (id) { 
        this.loading = true;
        var { Data, IsSuccess } = await Image.GetImage({ id: id }).catch(() => {
          this.loading = false;
        });
        if (IsSuccess) {
          return Data
        }
      }
    },
    async HandleBinarizationImageWithID (){ 
        this.loading = true;
        var { Data, IsSuccess } = await Image.GetBinarizationImage({ id: this.id }).catch(() => {
          this.loading = false;
        });
        if (IsSuccess) {
          const { base64 } = Data;
          let imgBase64 = base64; 
          this.img = imgBase64;
        }
        this.loading = false; 
    },
    async GetBinarizationImage(){
        this.loading = true;
        var data = new FormData();
        data.append("file", this.file);
        var { Data, IsSuccess } = await Image.BinarizationImage(data).catch(() => {
          this.loading = false;
        });
        if (IsSuccess) {
          const { base64 } = Data;
          let imgBase64 = base64; 
          this.img = imgBase64;
        }
        this.loading = false; 
    }
  },
};
</script>

<style>
</style>