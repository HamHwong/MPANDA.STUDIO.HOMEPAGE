<!--
 * @Author: your name
 * @Date: 2021-03-04 16:24:36
 * @LastEditTime: 2021-03-04 17:39:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/views/Index/index.vue
-->
<template>
  <div class="btn-warpper" @click="handleEnter()">
    <a class="btn">
      <svg>
        <rect x="0" y="0" fill="none" width="100%" height="100%" />
      </svg>
      <span> Enter </span>
    </a>
  </div>
</template>

<script>
export default {
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
.btn-warpper {
  position: absolute;
  bottom: 20%;
  width: 20%;
  left: 40%;
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