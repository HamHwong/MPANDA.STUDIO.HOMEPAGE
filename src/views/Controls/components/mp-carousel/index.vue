<!--
 * @Author: your name
 * @Date: 2021-02-20 15:52:29
 * @LastEditTime: 2021-02-20 17:07:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/views/Controls/components/mp-carousel/index.vue
-->
<template>
  <div>
    <div class="mpanda-Carousel">
      <section
        v-for="(i, index) in slides"
        :class="{
          slide: true,
          left: currentSectionPos > index,
          active: currentSectionPos == index,
          right: currentSectionPos < index,
        }"
        @click="focusOn(index)"
        :style="{
          zIndex:
            currentSectionPos >= index
              ? currentSectionPos == index
                ? slides.length
                : index
              : slides.length - index,
          backgroundImage: 'url(' + i.url + ')',
        }"
        @mouseover="pause = true"
        @mouseleave="pause = false"
      >
        <h1>{{ i.title }}</h1>
        <span>{{ i.text }}</span>
      </section>
      <div @click="toLeft" class="slide-arrow left"></div>
      <div @click="toRight" class="slide-arrow right"></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.init();
    this.sort();
  },
  data() {
    return {
      slides: [
        {
          title: "Title0",
          text: "Context",
          url:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
        },
        {
          title: "Title1",
          text: "Context",
          url:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
        },
        {
          title: "Title2",
          text: "Context",
          url:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
        },
        {
          title: "Title3",
          text: "Context",
          url:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
        },
        {
          title: "Title4",
          text: "Context",
          url:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
        },
      ],
      currentSectionPos: 0,
      pause: false,
      pauseTimer: null,
      playTimer: null,
      intervalTime: 3000,
    };
  },
  methods: {
    init() {
      this.play();
    },
    sort() {},
    play() {
      clearInterval(this.playTimer);
      this.playTimer = setInterval(() => {
        if (!this.pause) {
          var newPos = (this.currentSectionPos + 1) % this.slides.length;
          this.focusOn(newPos);
        }
      }, this.intervalTime);
    },
    focusOn(index = 0) {
      if (index > this.slides.length - 1) index = this.slides.length;
      if (index < 0) index = 0;
      this.currentSectionPos = index;
    },
    toRight() {
      clearInterval(this.playTimer);
      var newPos = (this.currentSectionPos + 1) % this.slides.length;
      this.focusOn(newPos);
      this.play();
    },
    toLeft() {
      clearInterval(this.playTimer);
      var newPos =
        (this.currentSectionPos + this.slides.length - 1) % this.slides.length;
      this.focusOn(newPos);
      this.play();
    },
  },
};
</script>

<style lang="scss" scoped>
.mpanda-Carousel {
  position: relative;
  display: flex;
  padding: 10px 100px;
}

.slide {
  flex: 1;
  background-color: #fff;
//   box-shadow: 0px 0px 50px #383838;
  border-radius: 5px;
  transition: all 0.5s;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: blur(2px);
  /* 强制开启gpu加速 */
  transform: translateZ(10);
  backface-visibility: hidden;
  transform-style: preserve-3d;
}
.slide.active {
  filter: none;
}

.slide.active {
  z-index: 5;
  height: 50vh;
}

@media (max-width: 700px) {
  .slide.active {
    flex: 2;
  }
}

@media (min-width: 700px) and (max-width: 1080px) {
  .slide.active {
    flex: 4;
  }
}

@media (min-width: 1080px) {
  .slide.active {
    flex: 5;
  }
}

.slide.left {
  transform: rotate3d(3, 10, 1, 45deg);
  margin-right: -20vh;
}

.slide.right {
  transform: rotate3d(3, -10, -1, 45deg);
  margin-left: -20vh;
}

@keyframes zeroDegreeToThirty {
  0% {
    transform: rotate3d(0, 0, 0, 0deg);
  }
  100% {
    transform: rotate3d(10, 0, 0, 45deg);
  }
}

.slide-arrow {
  position: absolute;
  z-index: 999;
  top: 20vh;
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  line-height: 40px;
  font-size: 50px;
  height: 50px;
  width: 50px;
  border-radius: 25px;
}

@media (min-width: 700px) {
  .slide-arrow {
    // display: none;
  }
}

.slide-arrow:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.slide-arrow.left {
  text-align: right;
  padding-right: 10px;
  left: -40px;
}

.slide-arrow.left::before {
  content: "‹";
}

.slide-arrow.right {
  text-align: left;
  padding-left: 10px;
  right: -40px;
}

.slide-arrow.right::before {
  content: "›";
}
</style>