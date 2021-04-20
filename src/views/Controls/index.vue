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
      <el-col>
        <MPCarousel />
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h1>MP-Card</h1>
      </el-col>
    </el-row>
    <el-row 
      :gutter="15"
    >
      <el-col
        :span="4"
        :xs="24"
      >
        <MPCard type="default">
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
        </MPCard>
      </el-col>
      <el-col
        :span="6"
        :xs="24"
      >
        <MPCard
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
        </MPCard>
      </el-col>
      <el-col
        :span="6"
        :xs="24"
      >
        <MPCard
          type="success"
          height="200px"
        >
          <template #header>
            Success <MPButton
              type="success"
            />
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
        </MPCard>
      </el-col>
      <el-col
        :span="4"
        :xs="24"
      >
        <MPCard type="danger">
          <template #header>
            Danger <MPButton type="danger" />
          </template>
          <p>Danger type</p>
          <p>With 4 Spans</p>
        </MPCard>
      </el-col>
      <el-col
        :span="4"
        :xs="24"
      >
        <MPCard type="dark">
          <template #header>
            Dark <MPButton type="dark" />
          </template>
          <p>Dark Mode</p>
        </MPCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MPCarousel from "@/components/mp-carousel";
import MPCard from "@/components/mp-card";
import MPRadio from "@/components/mp-radio";
import MPButton from "@/components/mp-card/mp-card-button";
export default {
  name: "",
  components: {
    MPCard,
    MPButton,
    MPCarousel,
    MPRadio,
  },
  data() {
    return {
      activeName: "1",
    };
  },
};
</script>

<style lang="scss" scoped>
</style>