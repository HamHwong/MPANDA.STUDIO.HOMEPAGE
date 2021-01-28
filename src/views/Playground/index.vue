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
const imgs = require("@/static/1.1.png");
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
      canvas.width = "10";
      canvas.height = "10";
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
        console.log('图片高度', w)
        console.log('图片宽度', h)
        var matrix = this.InitBinaryArr(w, h);
        var { leftX, rightX, topY, bottomY } = await this.GetCutInfo(ImageData, matrix, w, h)
        console.log({ leftX, rightX, topY, bottomY })
        var ImageData = await this.DrawLine(
          this.ctx.getImageData(0, 0, w, h),
          matrix,
          leftX,
          rightX,
          topY,
          bottomY
        );
        
        await this.ctx.putImageData(ImageData, 0, 0);
      };
      img.src = path;
    },
    CutPic (ImageData, leftX, rightX, topY, bottomY) {
      // TODO
    },
    // 画边框
    async DrawLine (ImageData, matrix, leftX, rightX, topY, bottomY) {
      var data = ImageData.data;
      this.DrawHorizontalLine(data, matrix, topY);
      this.DrawHorizontalLine(data, matrix, bottomY);
      this.DrawVerticalLine(data, matrix, leftX);
      this.DrawVerticalLine(data, matrix, rightX);
      return ImageData;
    },
    // 获取边框信息
    async GetCutInfo (ImageData, matrix, w, h) {
      var data = ImageData.data;
      var CollidedArr = await this.VerticalLineCollide(ImageData, matrix, 68, 136, 187);
      var leftX = CollidedArr[0]
      var rightX = CollidedArr[CollidedArr.length - 1]
      var topY = this.HorizontalCollide(data, w, h, "top", 68, 136, 187);
      var bottomY = this.HorizontalCollide(data, w, h, "bottom", 68, 136, 187);
      return { leftX, rightX, topY, bottomY };
    },
    // 初始化Matrix
    InitBinaryArr (w, h) {
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
    // 画横线
    DrawHorizontalLine (data, matrix, y) {
      var w = matrix[0].length
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
    DrawVerticalLine (data, Matrix, ColIndex) {
      for (var rowIndex = 0; rowIndex < Matrix.length; rowIndex++) {
        var PixelIndex = Matrix[rowIndex][ColIndex];
        data[PixelIndex * 4] = 0;
        data[PixelIndex * 4 + 1] = 0;
        data[PixelIndex * 4 + 2] = 0;
        data[PixelIndex * 4 + 3] = 255;
      }
    },
    // 框出竖直边框
    async VerticalLineCollide ({ data }, Matrix, r = 255, g = 255, b = 255) {
      var CollidedArr = []
      for (var X = 0; X < Matrix[0].length; X++) {
        var arr = this.GetIndexArrOfVertical(Matrix, X)
        var collided = arr.map(index => index * 4).some(i => {
          return data[i] !== r && data[i + 1] !== g && data[i + 2] !== b && data[i + 3] !== 0
        })
        if (collided) {
          CollidedArr.push(X)
        }
      }
      return CollidedArr
    },
    // 获取位于图片水平方向X像素的垂直数组
    GetIndexArrOfVertical (Matrix, X) {
      var H = Matrix.length
      var arr = []
      for (var rowIndex = 0; rowIndex < H; rowIndex++) {
        // debugger
        arr.push(Matrix[rowIndex][X])
      }
      return arr
    },
    // 框出水平边距
    HorizontalCollide (data, w, h, from = "top", r = 255, g = 255, b = 255) {
      var enableSearch = true;
      var y = 0;
      var pixelsIndexArr = [];
      if (from.toLowerCase() === "top") {
        while (y < h && enableSearch) {
          // y++;
          for (var index = ++y * w; index < (y + 1) * w; index++) {
            if (data[index * 4] !== r && data[index * 4 + 1] !== g && data[index * 4 + 2] !== b && data[index * 4 + 3] !== 0) {
              enableSearch = false;
              pixelsIndexArr.push(index * 4);
              break;
            }
          }
        }
      } else if (from.toLowerCase() === "bottom") {
        var y = h;
        while (y > 0 && enableSearch) {
          // y--;
          for (var index = --y * w - 1; index > (y - 1) * w; index--) {
            if (data[index * 4] !== r && data[index * 4 + 1] !== g && data[index * 4 + 2] !== b && data[index * 4 + 3] !== 0) {
              enableSearch = false;
              pixelsIndexArr.push(index * 4);
              break;
            }
          }
        }
      }
      return y;
    }
  },
};
</script>

<style lang="scss" scoped>
.canvas {
  box-shadow: #333 0px 0px 20px;
}
</style>