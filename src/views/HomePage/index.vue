<!--
 * @Author: your name
 * @Date: 2020-12-22 23:36:22
 * @LastEditTime: 2021-03-04 17:06:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/App.vue
-->
<template>
  <div>
    <img :src="require('@/static/logo.png')" />
    <Uploader :paste="file" />  
  </div>
</template>

<script>
import Uploader from '@/components/Uploader'

export default { 
  components: {
    Uploader
  },
  data(){
    return {
      file:null,
    }
  },
  mounted () {
    this.BindPaste()
  },
  methods: {
    BindPaste () {
      // var that = this 
      document.onpaste = (event)=> { 
        // console.log(that.test);
        var isChrome = false;
        if (event.clipboardData || event.originalEvent) {
          //某些chrome版本使用的是event.originalEvent
          var clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
          if (clipboardData.items) {
            // for chrome
            var items = clipboardData.items,
              len = items.length,
              blob = null;
            isChrome = true;
            if(isChrome){
              for (var i = 0; i < len; i++) {
                // console.log(items[i]);
                if (items[i].type.indexOf("image") !== -1) {
                  //getAsFile() 此方法只是living standard firefox ie11 并不支持
                  blob = items[i].getAsFile();
                  // console.log(blob)
                  this.file = blob
                  // console.log(this.file)
                }
              }
            }else{
              alert('暂仅支持Chrome浏览器')
            }
          }
        }
      }
    }
  }
}
</script>

<style> 
</style>
