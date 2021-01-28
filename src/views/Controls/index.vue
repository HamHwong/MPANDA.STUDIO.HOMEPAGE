<!--
 * @Author: your name
 * @Date: 2021-01-08 11:11:22
 * @LastEditTime: 2021-01-21 17:41:52
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
        <h1>MP-Card</h1>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="4">
        <MPCard type="default">
          <template v-slot:header>
            Default <MPButton type="default"
          /></template>
          <p>asdad</p>
          <p>asdad</p>
          <p>asdad</p>
        </MPCard>
      </el-col>
      <el-col :span="6">
        <MPCard type="primary" height="110px">
          <template v-slot:header>
            Primary <MPButton type="default"
          /></template>
          <p>asdad</p>
          <p>asdad</p>
          <p>asdad</p>
          <p>asdad</p>
          <p>asdad</p>
          <p>asdad</p>
          <p>asdad</p>
          <p>asdad</p>
          <p>asdad</p>
          <template v-slot:footer><small>Footer</small></template>
        </MPCard>
      </el-col>
      <el-col :span="6">
        <MPCard type="success">
          <template v-slot:header>
            Success <MPButton type="success"
          /></template>
          <p>asdad</p>
          <p>asdad</p>
          <p>asdad</p>
        </MPCard>
      </el-col>
      <el-col :span="4">
        <MPCard type="danger">
          <template v-slot:header> Danger <MPButton type="danger" /></template>
          <p>asdad</p>
          <p>asdad</p>
          <p>asdad</p>
        </MPCard>
      </el-col>
      <el-col :span="4">
        <MPCard type="dark">
          <template v-slot:header> Dark <MPButton type="dark" /></template>
          <p>asdad</p>
          <p>asdad</p>
          <p>asdad</p>
        </MPCard>
      </el-col>
    </el-row>
    <!-- Table -->
    <el-row>
      <el-col :span="24">
        <MPCard>
          <el-tabs v-model="activeName"  >
            <el-tab-pane label="用户管理" name="first">
              <el-row>
                <el-table style="width: 100%">
                  <el-table-column prop="date" label="日期"> </el-table-column>
                  <el-table-column prop="name" label="姓名" width="180">
                  </el-table-column>
                  <el-table-column prop="address" label="地址">
                  </el-table-column>
                </el-table>
              </el-row>
              <el-pagination 
                :page-size="100"
                layout="total, prev, pager, next"
                :total="1000"
              >
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="配置管理" name="second"
              >配置管理
              <el-pagination
                :page-size="100"
                layout="total, prev, pager, next"
                :total="1000"
              >
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="角色管理" name="third"
              >角色管理
              <el-pagination
                :page-size="100"
                layout="total, prev, pager, next"
                :total="1000"
              >
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth"
              >定时任务补偿
              <el-pagination
                :page-size="100"
                layout="total, prev, pager, next"
                :total="1000"
              >
              </el-pagination>
            </el-tab-pane>
          </el-tabs>
          <template v-slot:footer> </template>
        </MPCard>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <MPCard> 
        </MPCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MPCard from "./components/mp-card";
import MPButton from "./components/mp-card/mp-card-button"; 
export default {
  name: "",
  data() {
    return {
      activeName: "1",
    };
  },
  components: {
    MPCard,
    MPButton, 
  },
};
</script>

<style lang="scss" scoped>
</style>