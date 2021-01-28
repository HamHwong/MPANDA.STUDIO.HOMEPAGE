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
        var ImageData = await this.DrawLine(
          this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height),
          this.canvas.width,
          this.canvas.height
        );
        var matrix = await this.InitBinaryArr(
          ImageData,
          this.canvas.width,
          this.canvas.height
        );
        ImageData = await this.NewDrawVerticalLine(ImageData, matrix, 20);
        await this.ctx.putImageData(ImageData, 0, 0);
      };
      img.src = imgs;
    },
    // 画横线
    DrawHorizontalLine(data, w, y) {
      var col = 0;
      while (col < y) {
        col++;
      }
      for (var index = col * w; index < (col + 1) * w; index++) {
        data[index * 4] = 0;
        data[index * 4 + 1] = 0;
        data[index * 4 + 2] = 0;
        data[index * 4 + 3] = 255;
      }
    },
    // 画竖线
    DrawVerticalLine(data, w, h, x) {
      var row = 0;
      while (row < h) {
        var index = row * w + x - 1;
        data[index * 4] = 0;
        data[index * 4 + 1] = 0;
        data[index * 4 + 2] = 0;
        data[index * 4 + 3] = 255;
        row++;
      }
    },
    async InitBinaryArr({ data }, w, h) {
      var Matrix = [];
      for (var row = 0; row < h; row++) {
        var rowArr = [];
        for (var col = 0; col < w; col++) {
          var index = row * w + col;
          rowArr.push(index);
        }
        Matrix.push(rowArr);
      }
      return Matrix;
    },
    async NewDrawVerticalLine(dataObj, Matrix, ColIndex) {
      var { data } = dataObj;
      for (var rowIndex = 0; rowIndex < Matrix.length; rowIndex++) {
        var PixelIndex = Matrix[rowIndex][ColIndex];
        data[PixelIndex * 4] = 0;
        data[PixelIndex * 4 + 1] = 0;
        data[PixelIndex * 4 + 2] = 0;
        data[PixelIndex * 4 + 3] = 255;
      }
      return dataObj;
    },
    async GetIndexArrOfVertical(Matrix, X) {
      var H = Matrix[0].length
      var arr = []
      for(var rowIndex =0 ; rowIndex<H;rowIndex++){
        arr.push(Matrix[rowIndex][X])
      }
      return arr
    },
    async GetIndexArrOfHorizatial(Matrix, Y) {
      return Matrix[Y]
    },
    async CheckVerticalLineCollide(dataObj, Matrix) {
      var { data } = dataObj;
      for (var X = 0; X < Matrix[0].length; X++) {
        var arr = this.GetIndexArrOfVertical(Matrix,X)
       // var realArr = data.filter((i,index)=>arr.includes(index*4))
        
        // arr.map(index=>data[index])
        // var Arr = data.filter((i,index)=>arr.includes(index))
      }
    },
    // 框出水平边距
    HorizontalCollide(data, w, h, from = "top") {
      var enableSearch = true;
      var y = 0;
      var pixelsIndexArr = [];
      if (from.toLowerCase() === "top") {
        while (y < h && enableSearch) {
          for (var index = y * w; index < (y + 1) * w; index++) {
            if (
              data[index * 4] !== 0 &&
              data[index * 4 + 1] !== 0 &&
              data[index * 4 + 2] !== 0
            ) {
              enableSearch = false;
              pixelsIndexArr.push(index * 4);
              this.DrawHorizontalLine(data, w, y);
              break;
            }
          }
          y++;
        }
      } else if (from.toLowerCase() === "bottom") {
        var y = h;
        while (y > 0 && enableSearch) {
          for (var index = y * w - 1; index > (y - 1) * w; index--) {
            if (
              data[index * 4] !== 0 &&
              data[index * 4 + 1] !== 0 &&
              data[index * 4 + 2] !== 0
            ) {
              enableSearch = false;
              pixelsIndexArr.push(index * 4);
              this.DrawHorizontalLine(data, w, y);
              break;
            }
          }
          y--;
        }
      }
      return pixelsIndexArr;
    },
    async DrawLine(ImageData, w, h) {
      var data = ImageData.data;
      // console.log(data.length)
      var pixelCount = data.length / 4;
      var RowsCount = h;

      this.HorizontalCollide(data, w, h);
      this.HorizontalCollide(data, w, h, "bottom");

      function VerticalCollide(from = "left") {
        // var enableSearch = true;
        // var x = 0;
        // while(x < w){
        //   for(var row = 0; row < h;row++){
        //     row*w+x
        //   }
        //   x++
        // }
        for (var col = 0; col < w; col++) {
          for (var y = 0; y < h; y++) {
            // if()
            // col+
            // if(col*y+y)
          }
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