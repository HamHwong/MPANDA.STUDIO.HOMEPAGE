<!--
 * @Author: your name
 * @Date: 2021-03-29 14:13:20
 * @LastEditTime: 2021-04-04 22:20:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/views/Index/components/svgBotton/index.vue
-->
<template>
  <div class="btn-wrapper">
    <a
      class="btn"
    >
      <div
        v-bind="$attrs"
      >
        <svg>
          <rect
            x="0"
            y="0"
            fill="none"
            width="100%"
            height="100%"
          />
        </svg>
        <span> Enter </span>
      </div>
    </a>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.btn-wrapper {
  // position: absolute;
  // bottom: calc(50% - 60px);
  // width: 20%;
  // left: 40%;
  float: left;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  transform: translateX(calc(50vw - 100%));
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
    // max-width: 160px;
    // margin: 0 auto 2em;
    position: relative;
    text-transform: uppercase;
    vertical-align: middle;
    width: 160px;
    background: #414b68;
    font-weight: 100;
    // @media (min-width: 400px) {
    //   & {
    //     display: inline-block;
    //     margin-right: 2.5em;
    //     &:nth-of-type(even) {
    //       margin-right: 0;
    //     }
    //   }
    // }
    // @media (min-width: 600px) {
    //   &:nth-of-type(even) {
    //     margin-right: 2.5em;
    //     &:nth-of-type(5) {
    //       margin-right: 0;
    //     }
    //   }
    // }
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