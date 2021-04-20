<!--
 * @Author: your name
 * @Date: 2021-03-04 16:24:36
 * @LastEditTime: 2021-04-20 14:49:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/views/Index/index.vue
-->
<template>
  <div class="container">
    <NavTop fixed="top" />
    <div
      class="text-context"
      :style="`
      background-image: url(${ImageObj.imgUrl});
      background-clip:${bgClipStyle};
      -webkit-background-clip:${bgClipStyle};
      color:${bgTextColor}
    `"
      @click="HandleBgTextSwitch()"
    >
      <p>Welcome</p>
      <p>To</p>
      <p>MPanda.Studio</p>
      <div class="dailywords center">
        <small>今日毒鸡汤:
          <span class="underline">{{
            DailyWords.text || "加载中..."
          }}</span></small>
      </div>
    </div>
    <el-row
      type="flex"
      style="margin:30px 10px 0 10px"
      :gutter="30"
    >
      <el-col
        :md="8"
        :sm="24"
      >
        <MPRank />
      </el-col>

      <el-col
        :md="8"
        :sm="24"
      >
        <MPRank type="primary" />
      </el-col>

      <el-col
        :md="8"
        :sm="24"
      >
        <MPRank type="success" />
      </el-col>
    </el-row>
    <!-- Enter Btn -->
    <svgBotton @click="handleEnter" />
    <div>
      <GameComponent />
    </div>
  </div>
</template>

<script>
import { Ext } from "@/api";
import { onMounted, reactive, ref, provide } from "vue";
import GameComponent from "@/components/Game";
import svgBotton from './components/svgBotton'
import NavTop from '@/components/TopNav'
import MPRank from '@/components/mp-rank'
export default {
  setup () {
    var ImageObj = reactive({
      imgUrl: "",
    });
    var DailyWords = reactive({ text: "" });
    //Vue3写法
    onMounted(async () => {
      const { Data, IsSuccess } = await Ext.getDailyBG();
      if (IsSuccess) {
        if (Data.images.length > 0) {
          ImageObj.imgUrl = "https://www.bing.com" + Data.images[0].url;
        }
      }
    });
    onMounted(async () => {
      const {
        Data: { data },
        IsSuccess,
      } = await Ext.getFuckingWords();
      if (IsSuccess) {
        DailyWords.text = data;
      }
    });
    //
    var bgTextColor = ref("transparent");
    var bgClipStyle = ref("text");
    var isShowBG = ref(false)
    provide('isShownBG', isShowBG)
    function HandleBgTextSwitch () {
      if (bgTextColor.value === "transparent") {
        bgTextColor.value = "rgba(255, 255, 255, 0.900);";
        bgClipStyle.value = null;
        isShowBG.value = true
      } else {
        bgTextColor.value = "transparent";
        bgClipStyle.value = "text";
        isShowBG.value = false
      }
    }

    return {
      ImageObj,
      DailyWords,
      bgTextColor,
      HandleBgTextSwitch,
      bgClipStyle,
      GameComponent,
      NavTop,
      isShowBG,
      svgBotton,
      MPRank
    };
  },
  methods: {
    handleEnter (e) {
      e.stopPropagation();
      setTimeout(() => {
        this.$router.push("/Controls");
      }, 700);
    },
  },
};
</script>

<style lang="scss" scoped>
$fontSize_Desktop: 4rem;
$fontSize_Mobile: 2.5rem;
.text-context {
  transition: ALL 1s cubic-bezier(0.8, -0.5, 0.2, 1.4);
  min-height: 70px;
  // display:flex;
  // flex-direction: column-reverse;
  // min-height: 30vh;
  // padding-top: 100px;
  // text-shadow: 0px 0px 2px rgb(124, 124, 124);
  padding: 80px 20px 0 20px;
  position: relative;
  user-select: none;
  text-align: left;
  font-size: $fontSize_Mobile;
  line-height: $fontSize_Mobile;
  font-weight: 800;
  text-transform: uppercase;
  background-position-x: 0;
  background-position-y: 0;
  @media (min-width: 600px) {
    background-position-y: -25vh;
    font-size: $fontSize_Desktop;
    line-height: $fontSize_Desktop;
  }
  background-size: cover;
  background-repeat: no-repeat;
  .center {
    text-align: center;
  }
  .underline {
    padding-bottom: 2px;
    // line-height: 10px;
    border-bottom: solid 0.15rem rgba(0, 0, 0, 0.2);
    // text-decoration: underline 0.15rem rgba(0, 0, 0, 0.2);
  }
  p {
    margin: 0;
  }
  small {
    font-size: 0.6rem;
    line-height: 0.6rem;
  }
  .dailywords {
    // position: absolute;
    // width: 100%;
    // bottom: calc(20% + 2em);
  }
}
.container {
  width: 100vw;
  // @media (min-width: 600px) {
  //   width: 100vw;
  // }
  //   width: unset;
  // overflow: hidden;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>