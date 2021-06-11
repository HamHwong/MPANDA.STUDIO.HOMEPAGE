<template>
  <div>
    <el-select
      v-if="editable"
      v-model="innerValue"
      filterable
      placeholder="请选择类别"
      allow-create
      :size="size"
    >
      <el-option
        v-for="item in options"
        :key="item._id"
        :label="item.cate_name"
        :value="item._id"
      />
    </el-select>
    <div v-else>
      {{ options.find((i) => i._id === value)?.cate_name }}
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from '@vue/reactivity'
import { nextTick, onMounted, watch } from '@vue/runtime-core'
import { Category } from '@/api'
import { ElNotification as $notify } from 'element-plus'
export default {
  props: {
    size: {
      type: String,
      default: () => 'medium',
      validator: (val) => {
        return ['medium', 'small', 'mini'].includes(val)
      },
    },
    editable: {
      type: Boolean,
      default: () => false,
    },
    value: {
      type: String,
      default: () => '',
    },
  },
  setup(props, ctx) {
    var options = reactive([])
    const innerValue = ref('')
    watch(
      () => innerValue.value,
      (val) => {
        var result = options.find(i=>i._id===val)||{cate_name:val,_id:'_CREATE_CATEGORY_'}
        console.log('result',result)
        ctx.emit('update:modelValue', result)
      }
    )
    function initCategory() {
      Category.List().then(({ Data, IsSuccess, Message }) => {
        if (IsSuccess) {
          Data.map((item) => {
            options.push({ _id: item._id,cate_name:item.cate_name })
          })
        } else {
          $notify({
            title: '失败',
            message: '获取失败：' + Message,
            type: 'error',
          })
        }
      }) 
    }
    initCategory()
    // console.log('result', result)
    return {
      innerValue,
      options,
    }
  },
}
</script>

<style></style>
