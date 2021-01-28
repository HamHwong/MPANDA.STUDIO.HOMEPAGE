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
const imgs = require("@/static/test.png");
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
      console.log("start");
      this.canvas = this.$refs["canvas"];
      await this.initCtx(this.canvas);
      this.loadImage();
    },
    // 初始化Canvas
    async initCtx (canvas) {
      this.ctx = await canvas.getContext("2d");
      canvas.width = "200";
      canvas.height = "200";
    },
    // 加载图片
    loadImage (path) {
      const img = new Image();
      img.onload = async () => {
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        this.ctx.drawImage(img, 0, 0);
        var ImageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
        var matrix = await this.InitBinaryArr(
          ImageData,
          this.canvas.width,
          this.canvas.height
        );
        var { leftX, rightX, topY, bottomY } = await this.GetCutInfo(ImageData, matrix, this.canvas.width, this.canvas.height)
        var ImageData = await this.DrawLine(
          this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height),
          matrix,
          leftX,
          rightX,
          topY,
          bottomY
        );

        await this.ctx.putImageData(ImageData, 0, 0);
      };
      img.src = imgs;
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
      var CollidedArr = await this.VerticalLineCollide(ImageData, matrix);
      var leftX = CollidedArr[0]
      var rightX = CollidedArr[CollidedArr.length - 1]
      var topY = this.HorizontalCollide(data, w, h);
      var bottomY = this.HorizontalCollide(data, w, h, "bottom");
      return { leftX, rightX, topY, bottomY };
    },
    // 初始化Matrix
    async InitBinaryArr ({ data }, w, h) {
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
    async VerticalLineCollide ({ data }, Matrix) {
      var CollidedArr = []
      for (var X = 0; X < Matrix[0].length; X++) {
        var arr = this.GetIndexArrOfVertical(Matrix, X)
        var collided = arr.map(index => index * 4).some(i => {
          return (data[i] + data[i + 1] + data[i + 2]) * data[i + 3]
        })
        if (collided) {
          // console.log(X)
          CollidedArr.push(X)
        }
      }
      return CollidedArr
    },
    // 获取位于图片水平方向X像素的垂直数组
    GetIndexArrOfVertical (Matrix, X) {
      var H = Matrix[0].length
      var arr = []
      for (var rowIndex = 0; rowIndex < H; rowIndex++) {
        arr.push(Matrix[rowIndex][X])
      }
      return arr
    },
    // 框出水平边距
    HorizontalCollide (data, w, h, from = "top") {
      var enableSearch = true;
      var y = 0;
      var pixelsIndexArr = [];
      if (from.toLowerCase() === "top") {
        while (y < h && enableSearch) {
          // y++;
          for (var index = ++y * w; index < (y + 1) * w; index++) {
            if ((data[index * 4] + data[index * 4 + 1] + data[index * 4 + 2]) * data[index * 4 + 3] > 0) {
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
            if ((data[index * 4] + data[index * 4 + 1] + data[index * 4 + 2]) * data[index * 4 + 3] > 0) {
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