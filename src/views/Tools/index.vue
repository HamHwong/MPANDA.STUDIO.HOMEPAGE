<template>
  <div>
    <MPCard style="padding:0 20px">
      <el-form
        inline
        size="mini"
      >
        <el-row>
          <h2>将图片转换为box-shadow</h2>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-upload
              action="#"
              list-type="picture-card"
              :http-request="handleUpload"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus" />
            </el-upload>
          </el-col>
          <el-col
            v-loading="processing"
            :span="8"
          >
            <el-scrollbar
              height="300px"
              max-height="300px"
              style="height:300px"
            >
              <!-- <canvas ref="canvas" /> -->
              <div :style="Style" />
            </el-scrollbar>
          </el-col>
          <el-col :span="8">
            <el-input
              v-model="Style.boxShadow"
              :readonly="true"
              type="textarea"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-col :span="8">
              <el-form-item label="Width">
                <el-input v-model="width" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Height">
                <el-input v-model="height" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="pixelBlur">
                <el-input v-model="pixelBlur" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button
                size="mini"
                @click="handleConvert"
              >
                Convert
              </el-button>
            </el-col>
          </el-col>
        </el-row>
      </el-form>
    </MPCard>
    <el-dialog v-model="dialogVisible">
      <img
        width="100%"
        :src="dialogImageUrl"
      >
    </el-dialog>
  </div>
</template>

<script>
import { nextTick, onMounted, reactive, ref } from 'vue'
export default {
  setup() {
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const processedImage = ref('')
    const processing = ref(false)
    const canvas = ref(document.createElement('canvas'))
    const ctx = ref(null)
    const width = ref(0)
    const height = ref(0)
    const pixelBlur = ref(1)
    const bufferArray = ref([])
    const Style = reactive({
      width: 0,
      height: 0,
      boxShadow: '0 0 0 1px #000',
    })
    const image = ref(null)
    onMounted(() => {
      nextTick(() => {
        ctx.value = canvas.value.getContext('2d')
      })
    })
    function handleRemove(file, fileList) {
      console.log(file, fileList)
    }
    function handlePictureCardPreview(file) {
      dialogImageUrl.value = file.url
      dialogVisible.value = true
    }
    function draw(image){
        canvas.value.width = Number(width.value)
        canvas.value.height = Number(height.value) 
        ctx.value.drawImage(image.value, 0, 0,  image.value.width,  image.value.height ,0,0,  canvas.value.width,  canvas.value.height) 
        bufferArray.value = bufferArray.value
          .splice(0, bufferArray.value.length)
          .concat(ctx.value.getImageData(0, 0,  canvas.value.width,  canvas.value.height ).data)
    }
    function handleUpload(data) {
      image.value = new Image()
      image.value.onload = () => {
        processing.value = false 
        width.value = image.value.width
        height.value = image.value.height
        draw(image)
      }
      image.value.onloadstart = () => {
        processing.value = true
      }
      var fr = new FileReader()
      fr.onload = () => {}
      fr.onloadend = () => {
        image.value.src = fr.result
      }
      fr.readAsDataURL(data.file)
    }
    function handleConvert() {
      draw(image)
      var results = []
      var y = 0
      var data = bufferArray.value[0]
      while (y < height.value) {
        for (
          var index = y * width.value, j = ++y;
          index < j * width.value;
          index++
        ) {
          var r = data[index * 4]
          var g = data[index * 4 + 1]
          var b = data[index * 4 + 2]
          var a = data[index * 4 + 3]
          if(a===0) continue
          results.push(
            `rgb(${r} ${g} ${b} / ${Math.floor((a / 255) * 100)}%) ${index %
              width.value}px ${y}px 0px ${pixelBlur.value}px `
          )
        }
      }
      Style.boxShadow = results.join(',')
      bufferArray.value = null
    }
    return {
      dialogImageUrl,
      dialogVisible,
      handleRemove,
      handlePictureCardPreview,
      handleUpload,
      processedImage,
      processing,
      width,
      height,
      pixelBlur,
      Style,
      handleConvert,
    }
  },
}
</script>

<style></style>
