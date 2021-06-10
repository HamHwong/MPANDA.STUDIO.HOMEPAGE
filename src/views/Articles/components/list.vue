<!--
 * @Author: your name
 * @Date: 2021-05-05 14:33:04
 * @LastEditTime: 2021-05-05 15:40:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MPANDA.STUDIO.HOMEPAGE\src\views\Articles\components\list.vue
-->
<template>
  <div>
    <template 
      v-if="list.length>0"
    >
      <div
        v-for="i in list.value"
        :key="i.id"
      >
        <div class="link">
          <el-link
            type="primary"
            :href="`#/Article/View/${i._id}`"
            style="margin:5px 0;"
          >
            <div>{{ i.cate&&JSON.stringify(i.cate)!=='{}' ? `[${i.cate.label}]` : `` }}{{ i.title }}</div>
          </el-link>
          <div>
            <small>{{ i.createDate }}</small>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <el-empty
        :image-size="60"
        description="没有内容哦~"
      />
    </template>
  </div>
</template>

<script>
import { Article } from '@/api'
import {  onMounted, reactive } from 'vue'
import dateformat from 'dateformat'
export default {
  props: {
    start: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
    order: {
      type: Object,
      default: () => {},
    },
    cate: {
      type: String,
      default: () => '',
    },
  },
  setup(props) { 
    let list = reactive([])
    onMounted(async () => {
      const { cate, start, count, order } = props
      //console.log(cate,start,count,order)
      const a = await Article.List(cate, start, count, order)
      //console.log(a)
      const { Data, Message, IsSuccess } = a
      if (IsSuccess) {
        Data.map(
          (i) => {
            i.createDate = dateformat(i.createDate, 'yyyy-mm-dd HH:MM')
            list.push(i)
            }
        )
        
        
      } else {
        throw new Error(Message)
      }
    })

    return {
      list,
      dateformat,
    }
  },
}
</script>

<style lang="scss" scoped>
.link {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
