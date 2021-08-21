<template>
  <div class="todolist_container">
    <div
      v-for="i in list"
      :key="i._id"
      class="todolist_row"
    >
      <div
        v-tooltips
        class="title"
      >
        <span> {{ i.content }}</span>
      </div>
      <small class="date">
        <el-divider direction="vertical" />
        {{ dateformat(i.createDate, 'yyyy-mm-dd HH:MM') }}
      </small>
    </div>
  </div>
</template>

<script>
import { Tasks } from '@/api'
import dateformat from 'dateformat'
import { onMounted, reactive } from '@vue/runtime-core'
export default {
  setup () {
    const list = reactive([])
    onMounted(async () => {
      const { IsSuccess, Message, Data } = await Tasks.List()
      if (IsSuccess) {
        Data.map(i => list.push(i))
      } else {

      }
      console.log(list)
    })
    return {
      list,
      dateformat
    }
  }
}
</script>

<style lang="scss" scoped>
.todolist_container {
  text-align: left;
  &:deep(.el-checkbox) {
    color: #fff;
  }
  .todolist_row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0;
    .title {
      flex: 2;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .date {
      // justify-self: flex-end;
      // flex: 1;
    }
  }
}
</style>