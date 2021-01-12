<!--
 * @Author: your name
 * @Date: 2021-01-07 15:37:16
 * @LastEditTime: 2021-01-08 11:08:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/views/Playground/index.vue
-->
<template>
  <div>
    <!-- <canvas class="canvas"></canvas> -->
    <div class="canvas-container">
      <canvas ref="canvas" class="canvas"></canvas>
    </div>
  </div>
</template>

<script>
const imgs = require("@/static/test.png");
export default {
  name: "playground",
  mounted() {
    this.init();
  },
  data() {
    return {
      canvas: null,
      ctx: null,
    };
  },
  methods: {
    async init() {
      console.log("start");
      this.canvas = this.$refs["canvas"];
      await this.initCtx(this.canvas);
      this.loadImage();
    },
    async initCtx(canvas) {
      this.ctx = await canvas.getContext("2d");
      canvas.width = "200";
      canvas.height = "200";
    },
    loadImage(path) {
      // this.ctx.putImageData(img,100,100)
      const img = new Image();
      img.onload = async () => {
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        this.ctx.drawImage(img, 0, 0);
        const ImageData = await this.DrawLine(
          this.ctx.getImageData(0, 0, this.canvas.width,this.canvas.height),
          this.canvas.width,
          this.canvas.height
        );

        // console.log(">>>>", ImageData);
        await this.ctx.putImageData(ImageData, 0, 0);
      };
      img.src = imgs;
    },
    async DrawLine(ImageData, w, h) {
      var data = ImageData.data;
      function getColumnLine(x) {}
      for (var i = 0; i < data.length; i += 4) {
        if (i % w == 0) {
          data[i] = 0;
          data[i + 1] = 0;
          data[i + 2] = 0;
          data[i + 3] = 255;
        }
      }
      return ImageData;
    },
  },
};
</script>

<style lang="scss" scoped>
.canvas {
  box-shadow: #333 0px 0px 20px;
}
</style>