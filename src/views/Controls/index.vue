<!--
 * @Author: your name
 * @Date: 2021-01-08 11:11:22
 * @LastEditTime: 2021-04-20 14:10:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /MPANDA.STUDIO.HOMEPAGE/src/views/Controls/index.vue
-->
<template>
  <div>
    <!-- <el-tabs v-model="tabs" tab-position="right" style="height: 200px;">
        <el-tab-pane label="Draggable Table" name="1">
            
        </el-tab-pane>

    </el-tabs> -->
    <el-row>
      <el-col>
        <h1>MP-Radio</h1>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col
        :md="4"
        :sm="8"
        :xs="12"
      >
        <MPRadio>
          <template #default>
            Normal
          </template>
        </MPRadio>
      </el-col>
      <el-col
        :md="4"
        :sm="8"
        :xs="12"
      >
        <MPRadio disabled>
          <template #default>
            Disabled
          </template>
        </MPRadio>
      </el-col>
      <el-col
        :md="4"
        :sm="8"
        :xs="12"
      >
        <MPRadio readonly>
          <template #default>
            Read-Only
          </template>
        </MPRadio>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h1>MP-Carousel</h1>
      </el-col>
    </el-row>

    <el-row :gutter="15">
      <el-col style="height:500px">
        <MPCarousel
          indicators
          :value="slides"
          :height="`500px`"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h1>MP-Card A type</h1>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col
        :span="4"
        :xs="24"
      >
        <MPCardA type="default">
          <template #header>
            Default
            <MPButton
              type="default"
              trigger="hover"
            >
              <template #reference>
                <div>Hover Dropdown</div>
              </template>
            </MPButton>
          </template>
          <p>Sigle Line</p>
        </MPCardA>
      </el-col>
      <el-col
        :span="6"
        :xs="24"
      >
        <MPCardA
          type="primary"
          height="200px"
        >
          <template #header>
            Primary
            <MPButton
              type="default"
              trigger="click"
            >
              <template #reference>
                <div>Click Dorpdown</div>
              </template>
            </MPButton>
          </template>
          <p>Multiple Line</p>
          <p>With el-scroller-bar</p>
          <p>And</p>
          <p>200px Height</p>
          <p>U can scroll down</p>
          <p>to see</p>
          <p>more informations</p>
        </MPCardA>
      </el-col>
      <el-col
        :span="6"
        :xs="24"
      >
        <MPCardA
          type="success"
          height="200px"
        >
          <template #header>
            Success
            <MPButton type="success" />
          </template>
          <p>Success</p>
          <p>Type</p>
          <p>With el-scroller-bar</p>
          <p>And</p>
          <p>200px Height</p>
          <p>U can scroll down</p>
          <p>to see</p>
          <p>more informations</p>
          <template #footer>
            <small>With Footer</small>
          </template>
        </MPCardA>
      </el-col>
      <el-col
        :span="4"
        :xs="24"
      >
        <MPCardA type="danger">
          <template #header>
            Danger
            <MPButton type="danger" />
          </template>
          <p>Danger type</p>
          <p>With 4 Spans</p>
        </MPCardA>
      </el-col>
      <el-col
        :span="4"
        :xs="24"
      >
        <MPCardA type="dark">
          <template #header>
            Dark
            <MPButton type="dark" />
          </template>
          <p>Dark Mode</p>
        </MPCardA>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h1>MP-Card</h1>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <MPCard
        :radius="`20px`"
        type="bankCard"
        style="width: 350px; height: 200px"
        :bg-blur="false"
      >
        <template #header>
          <div
            style="
            display: flex;
            justify-content: space-between;
            flex: 1;
            align-items: center;
          "
          >
            <span style="font-size: 12px">WORD ELITE</span>
            <span>
              <img
                src="/images/mastercard/wave.png"
                :width="15"
              >
            </span>
          </div>
        </template>
        <template #avatar>
          <img
            src="/images/mastercard/mastercard.png"
            :width="35"
            :height="35"
            style="margin: 0px 5px 0px 0px"
            alt=""
          >
        </template>
        <template #content>
          5412 7512 3412 3456
        </template>
        <template #date>
          <small style="font-size: 0.5rem">VALID THAU</small> 12/23
        </template>
        <template #others>
          <small style="font-size: 12px">LEE M. CARDHOLDER</small>
        </template>
      </MPCard>
      <MPCard
        :radius="`20px`"
        type="bankCard"
        style="width: 350px; height: 200px" 
      >
        <template #header>
          <div
            style="
            display: flex;
            justify-content: space-between;
            flex: 1;
            align-items: center;
          "
          >
            <span style="font-size: 12px">WORD ELITE</span>
            <span>
              <img
                src="/images/mastercard/wave.png"
                :width="15"
              >
            </span>
          </div>
        </template>
        <template #avatar>
          <img
            src="/images/mastercard/mastercard.png"
            :width="35"
            :height="35"
            style="margin: 0px 5px 0px 0px"
            alt=""
          >
        </template>
        <template #content>
          5412 7512 3412 3456
        </template>
        <template #date>
          <small style="font-size: 0.5rem">VALID THAU</small> 12/23
        </template>
        <template #others>
          <small style="font-size: 12px">LEE M. CARDHOLDER</small>
        </template>
      </MPCard>
      <MPCard
        :radius="`20px`"
        type="bankCard"
        style="width: 350px; height: 200px"
        :bg-blur="false"
      >
        <template #header>
          <div
            style="
            display: flex;
            justify-content: space-between;
            flex: 1;
            align-items: center;
          "
          >
            <span style="font-size: 12px">WORD ELITE</span>
            <span>
              <img
                src="/images/mastercard/wave.png"
                :width="15"
              >
            </span>
          </div>
        </template>
        <template #avatar>
          <img
            src="/images/mastercard/mastercard.png"
            :width="35"
            :height="35"
            style="margin: 0px 5px 0px 0px"
            alt=""
          >
        </template>
        <template #content>
          5412 7512 3412 3456
        </template>
        <template #date>
          <small style="font-size: 0.5rem">VALID THAU</small> 12/23
        </template>
        <template #others>
          <small style="font-size: 12px">LEE M. CARDHOLDER</small>
        </template>
      </MPCard>
    </el-row>
    <el-row>
      <el-button @click="handleShow">
        Click
      </el-button>
      <MPModal
        :visible="modalVisibility"
        draggable
        resizeable
        @close="handleClose"
      >
        aa
      </MPModal>
    </el-row>
  </div>
</template>

<script>
// import MPCarousel from "@/components/mp-carousel";
import MPCard from "@/components/mp-card";
import MPRadio from "@/components/mp-radio";
import MPButton from "@/components/mp-card/mp-card-button";
import { ref } from '@vue/reactivity';
export default {
  name: "",
  components: {
    MPCardA:MPCard,
    MPButton,
    // MPCarousel,
    MPRadio,
  },
      setup(){
        const modalVisibility = ref(false)
        function handleClose (){
            modalVisibility.value=false;
        } 
        function handleShow(){
            modalVisibility.value=true; 
        }
        return {
            modalVisibility,
            handleClose,
            handleShow
        }
    },
  data () {
    return {
      activeName: "1",
      slides: [
        {
          title: "This is a 3D Image Carousel",
          text: "With blur FX",
          width: 400,
          pic:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
        },
        {
          title: "Migrated from my old controls",
          text:
            "View the old one from <b><a href='https://github.com/HamHwong/Mpanda.Frontend.Library/tree/master/Mpanda.Carousel'>MPanda.Carousel</a></b>",
          width: 400,
          pic:
            "https://cdn.pixabay.com/photo/2020/12/10/10/17/jasper-national-park-5819878_1280.jpg",
        },
        {
          title: "This is for Vue3",
          text: "But it's not full-featured",
          width: 400,
          pic:
            "https://cdn.pixabay.com/photo/2018/06/25/00/51/sunrise-3495775_1280.jpg",
        },
        {
          title: "Why?",
          text: "Cause I forget how I finished it.",
          width: 400,
          pic:
            "https://cdn.pixabay.com/photo/2021/01/28/03/13/person-5956897_1280.jpg",
        },
      ]
    };
  },
};
</script>

<style lang="scss" scoped>
</style>