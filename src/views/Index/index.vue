<!--
 * @Author: your name
 * @Date: 2021-03-04 16:24:36
 * @LastEditTime: 2021-03-24 14:34:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/views/Index/index.vue
-->
<template>
  <div class="container">
    <div class="text-context" :style="`
      background: url(${ImageObj.imgUrl}) 0px 0px / cover no-repeat;
      background-clip: text;
      -webkit-background-clip: text;
    `">
      <p>Welcome To My Site</p>
      <p>Oh Yeah</p> 
      <div class="dailywords center">
        <small>今日毒鸡汤: <span class="underline">{{DailyWords.text||'加载中...'}}</span></small> 
      </div>
    </div>
    
    <!-- Enter Btn -->
    <div class="btn-warpper" @click="handleEnter()">
      <a class="btn">
        <svg>
          <rect x="0" y="0" fill="none" width="100%" height="100%" />
        </svg>
        <span> Enter </span>
      </a>
    </div>
  </div>
</template>

<script>
import { Ext } from "@/api";
import { onMounted, reactive, ref } from "vue";
export default {
  setup() {
    var ImageObj = reactive({
      imgUrl: "",
    });
    var DailyWords = reactive({text:''})
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
      const {Data:{data},IsSuccess} = await Ext.getFuckingWords()
      if(IsSuccess){
        DailyWords.text = data
      }
    });
    // 
    

    return {
      ImageObj,
      DailyWords
    };
  },
  methods: {
    handleEnter() {
      setTimeout(() => {
        this.$router.push("/Controls");
      }, 700);
    },
  },
};
</script>

<style lang="scss" scoped>
.text-context {
  margin: 25% 10px auto;
  position:relative;
  user-select: none;
  font-size: 4rem;
  text-align: left;
  line-height: 4rem;
  font-weight: 800;
  text-transform: uppercase; 
  color: transparent; 
  -webkit-text-fill-color: transparent;
  .center{
    text-align: center;
  }
  .underline{
    text-decoration: underline .15rem rgba(0, 0, 0, 0.267);
  }
  p{
    margin: 0;
  }
  small{ 
    font-size: .6rem; 
    line-height: .6rem;
  }
  .dailywords{
    // position: absolute;
    // width: 100%;
    // bottom: calc(20% + 2em);
  }
}
.container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-repeat: no-repeat;
  background-size: cover;
}
.btn-warpper {
  // position: absolute;
  // bottom: calc(50% - 60px);
  // width: 20%;
  // left: 40%;
  & * {
    -moz-box-sizing: inherit;
    box-sizing: inherit;
    -webkit-transition-property: all;
    transition-property: all;
    -webkit-transition-duration: 0.6s;
    transition-duration: 0.6s;
    -webkit-transition-timing-function: ease;
    transition-timing-function: ease;
  }
  .btn {
    color: #748a9e;
    cursor: pointer;
    display: block;
    font-size: 16px;
    font-weight: 400;
    line-height: 45px;
    max-width: 160px;
    margin: 0 auto 2em;
    position: relative;
    text-transform: uppercase;
    vertical-align: middle;
    width: 100%;
    background: #414b68;
    font-weight: 100;
    @media (min-width: 400px) {
      & {
        display: inline-block;
        margin-right: 2.5em;
        &:nth-of-type(even) {
          margin-right: 0;
        }
      }
    }
    @media (min-width: 600px) {
      &:nth-of-type(even) {
        margin-right: 2.5em;
        &:nth-of-type(5) {
          margin-right: 0;
        }
      }
    }
    svg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 45px;
      rect {
        fill: none;
        stroke: #335470;
        stroke-width: 1;
        stroke-dasharray: 422, 0;
      }
    }

    &:hover {
      background: rgba(225, 51, 45, 0);
      letter-spacing: 1px;
      font-weight: 900;
      & rect {
        stroke-width: 5;
        stroke-dasharray: 15, 310;
        stroke-dashoffset: 48;
        -webkit-transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
        transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
      }
    }
  }
}
</style>