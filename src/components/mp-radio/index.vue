<!--
 * @Author: your name
 * @Date: 2021-02-25 15:55:09
 * @LastEditTime: 2021-03-01 15:45:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/views/Controls/components/mp-radio/index.vue
-->
<template>
  <div class="MP-Radio-Control-Warper" @click="check = !check">
    <div class="MP-Radio-Warper">
      <div class="MP-Radio">
        <div class="MP-Radio-Border top"></div>
        <div class="MP-Radio-Border right"></div>
        <div class="MP-Radio-Border bottom"></div>
        <div class="MP-Radio-Border left"></div>
      </div>
      <div class="MP-Radio checked">
        <div :class="{ 'MP-Radio-Check': true, checked: check }"></div>
        <div
          :class="{ 'MP-Radio-Border': true, top: true, checked: check }"
        ></div>
        <div
          :class="{ 'MP-Radio-Border': true, right: true, checked: check }"
        ></div>
        <div
          :class="{ 'MP-Radio-Border': true, bottom: true, checked: check }"
        ></div>
        <div
          :class="{ 'MP-Radio-Border': true, left: true, checked: check }"
        ></div>
      </div>
    </div>

    <div
      :class="{
        'MP-Radio-Slot': true,
        checked: check,
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MP-Radio",
  data() {
    return {
      check: false,
    };
  },
  props: {
    disabled: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

<style lang="scss" scoped>
$width: 14px;
$height: 14px;
$border-weight: 1px;
$border-width: $width;
$border-weight: $border-weight;
$delay: 40ms;
.MP-Radio-Control-Warper {
  cursor: pointer;
  .MP-Radio-Warper {
    float: left;
    .MP-Radio {
      width: $width;
      height: $height;
      position: relative;
      overflow: hidden;
      &:nth-child(2) {
        //   top: -$height;
        margin-top: -$height;
      }
      z-index: 10;
      .MP-Radio-Border {
        position: absolute;
        background-color: rgb(143, 143, 143);
        &.top,
        &.bottom {
          width: $border-width;
          height: $border-weight;
        }
        &.left,
        &.right {
          width: $border-weight;
          height: $border-width;
        }
        &.top {
          top: 0;
          left: 0;
        }
        &.bottom {
          top: $height - $border-weight;
          left: 0;
        }
        &.left {
          top: 0;
          left: 0;
        }
        &.right {
          top: 0;
          left: $width - $border-weight;
        }
      }
      &.checked {
        .MP-Radio-Border {
          background-color: #4c9efe;
          width: 0;
          height: 0;
          transition-duration: $delay;
          transition-timing-function: ease-in-out;
          &.checked {
            &.top,
            &.bottom {
              width: $border-width;
              height: $border-weight;
            }
            &.left,
            &.right {
              width: $border-weight;
              height: $border-width;
            }
            &.top {
              transition-delay: 0 * $delay;
            }
            &.right {
              transition-delay: 1 * $delay;
            }
            &.bottom {
              transition-delay: 2 * $delay;
            }
            &.left {
              transition-delay: 3 * $delay;
            }
          }
        }
      }
      .MP-Radio-Check {
        position: absolute;
        left: 0;
        bottom: 0;
        transform-origin: 0 100%;
        transform: translateX($width + $border-weight)
          translateY(-($height - 2 * $border-weight)) rotate(135deg);
        z-index: 12;
        &::before,
        &::after {
          content: "";
          position: absolute;
          //transition: $delay ease-in-out;
          transition-duration: $delay;
          transition-timing-function: ease-in-out;
          //transition: width $delay ease-in-out;
        }
        &::before {
          width: 0;
          height: 2 * $border-weight;
          background-color: #4c9efe;
        }
        &::after {
          background-color: #4c9efe;
          width: 2 * $border-weight;
          height: 0;
          left: $height;
        }
        &.checked {
          &::before {
            width: $height;
            transition-delay: 4 * $delay;
          }
          &::after {
            height: $height/2;
            transition-delay: 5 * $delay;
          }
        }
      }
    }
  }
  .MP-Radio-Slot {
    line-height: $height;
    margin-left: 5px;
    float: left;
    transition: color 6 * $delay ease-in-out;
    &.checked {
      color: #4c9efe;
    }
  }
}
</style>