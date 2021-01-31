<!--
 * @Author: your name
 * @Date: 2021-01-07 15:37:16
 * @LastEditTime: 2021-01-25 17:31:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/views/Playground/index.vue
-->
<template>
  <div>
    <!-- <canvas class="canvas"></canvas> -->
    <div class="canvas-container">
      <canvas
        ref="canvas"
        class="canvas"
      ></canvas>
    </div>
  </div>
</template>

<script>
import {GetCutInfo,InitBinaryArr,DrawLine} from '@/utils/image'
const imgs = require("@/static/1.png");
export default {
  name: "playground",
  mounted () {
    this.init();
  },
  data () {
    return {
      canvas: null,
      ctx: null,
    };
  },
  methods: {
    // 主程序
    async init () {
      this.canvas = this.$refs["canvas"];
      await this.initCtx(this.canvas);
      this.loadImage(imgs);
    },
    // 初始化Canvas
    async initCtx (canvas) {
      this.ctx = await canvas.getContext("2d");
      // canvas.width = "10";
      // canvas.height = "10";
    },
    // 加载图片
    loadImage (path) {
      const img = new Image();
      img.onload = async () => {
        var w = img.width;
        var h = img.height;
        this.canvas.width = w
        this.canvas.height = h
        this.ctx.drawImage(img, 0, 0);
        var ImageData = this.ctx.getImageData(0, 0, w, h)
        var matrix =  InitBinaryArr(w, h);
        var { leftX, rightX, topY, bottomY } = await GetCutInfo(ImageData, matrix, w, h)
        console.log({ leftX, rightX, topY, bottomY })
        // var ImageData = await DrawLine(
        //   this.ctx.getImageData(0, 0, w, h),
        //   matrix,
        //   leftX,
        //   rightX,
        //   topY,
        //   bottomY
        // );  
        await this.ctx.putImageData(ImageData, 0, 0);
        var x = leftX;
        var y = topY;
        w = rightX-leftX;
        h = bottomY-topY;
        var cropImage = this.ctx.getImageData(x,y,w,h);
        this.ctx.clearRect(x,y,w,h)
        this.canvas.width = w
        this.canvas.height = h
        await this.ctx.putImageData(cropImage, 0, 0);
      };
      img.src = path;
    },
  },
};
</script>

<style lang="scss" scoped>
.canvas {
  box-shadow: #333 0px 0px 20px;
}
</style>