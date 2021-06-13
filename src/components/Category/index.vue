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
    modelValue: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, ctx) {
    var options = reactive([])
    const innerValue = ref('')
    const isLoading = ref(true)
    watch(
      () => innerValue.value,
      async (val) => {
        if (innerValue.value === val) return
        if (isLoading.value) await initCategory()
        var result = options.find((i) => i._id === val) || {
          cate_name: val,
          _id: '_CREATE_CATEGORY_',
        }
        // console.log(result,options)
        ctx.emit('update:modelValue', result)
      }
    )
    watch(
      () => props.modelValue,
      async (val) => {
        if (isLoading.value) await initCategory()
        if (innerValue.value !== val._id) innerValue.value = val._id
      }
    )
    async function initCategory() {
      isLoading.value = true
      const { Data, IsSuccess, Message } = await Category.List()
      if (IsSuccess) {
        Data.map((item) => {
          if(!options.find((i=>i._id===item._id)))
            options.push({ _id: item._id, cate_name: item.cate_name })
        })
        isLoading.value = false
      } else {
        $notify({
          title: '失败',
          message: '获取失败：' + Message,
          type: 'error',
        })
      }
    }
    onMounted(async () => {
      await initCategory()
    })
    return {
      innerValue,
      options,
    }
  },
}
</script>

<style></style>
