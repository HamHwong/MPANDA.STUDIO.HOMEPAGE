// 画边框
export async function DrawLine(ImageData, matrix, leftX, rightX, topY, bottomY) {
  var data = ImageData.data;
  DrawHorizontalLine(data, matrix, topY);
  DrawHorizontalLine(data, matrix, bottomY);
  DrawVerticalLine(data, matrix, leftX);
  DrawVerticalLine(data, matrix, rightX);
  return ImageData;
}
// 获取边框信息
export async function GetCutInfo(ImageData, matrix, w, h) {
  var data = ImageData.data;
  var CollidedArr = await VerticalLineCollide(ImageData, matrix);
  var leftX = CollidedArr[0] -1 || 0
  var rightX = CollidedArr[CollidedArr.length - 1] || 0
  var topY = HorizontalCollide(data, w, h, "top")  || 0;
  var bottomY = HorizontalCollide(data, w, h, "bottom") || 0;
  return {
      leftX,
      rightX,
      topY,
      bottomY
  };
}
// 初始化Matrix
export function InitBinaryArr(w, h) {
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
}
// 画横线
function DrawHorizontalLine(data, matrix, y) {
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
}
// 画竖线
function DrawVerticalLine(data, Matrix, ColIndex) {
  for (var rowIndex = 0; rowIndex < Matrix.length; rowIndex++) {
    var PixelIndex = Matrix[rowIndex][ColIndex];
    data[PixelIndex * 4] = 0;
    data[PixelIndex * 4 + 1] = 0;
    data[PixelIndex * 4 + 2] = 0;
    data[PixelIndex * 4 + 3] = 255;
  }
}
// 框出竖直边框
async function VerticalLineCollide({data}, Matrix, r = 255, g = 255, b = 255) {
  var CollidedArr = []
  for (var X = 0; X < Matrix[0].length; X++) {
    var arr = GetIndexArrOfVertical(Matrix, X)
    var collided = arr.map(index => index * 4).some(i => {
      return data[i] !== r && data[i + 1] !== g && data[i + 2] !== b && data[i + 3] !== 0
    })
    if (collided) {
      CollidedArr.push(X+1)
    }
  }
  return CollidedArr
}
// 获取位于图片水平方向X像素的垂直数组
function GetIndexArrOfVertical(Matrix, X) {
  var H = Matrix.length
  var arr = []
  for (var rowIndex = 0; rowIndex < H; rowIndex++) {
    // debugger
    arr.push(Matrix[rowIndex][X])
  }
  return arr
}
// 框出水平边距
function HorizontalCollide(data, w, h, from = "top", r = 255, g = 255, b = 255) {
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