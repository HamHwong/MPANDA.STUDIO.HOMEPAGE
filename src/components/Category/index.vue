<template>
  <div>
    <el-select
      v-if="editable"
      v-model="innerValue._id"
      filterable
      placeholder="请选择类别"
      allow-create
      clearable
      :size="size"
      @clear="handleClear"
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
    var innerValue = reactive({
      cate_name: null,
      _id: null,
    })
    const isLoading = ref(true)
    watch(
      () => innerValue._id,
      async (_id) => {
        if (isLoading.value) await initCategory()
        var result = options.find((i) => i._id === _id) || {
          cate_name: _id,
          _id: '_CREATE_CATEGORY_',
        }
        ctx.emit('update:modelValue', result)
      }
    )
    watch(
      () => props.modelValue,
      async (obj) => {
        if (isLoading.value) await initCategory()
        if (obj._id === '_CREATE_CATEGORY_') {
          innerValue.cate_name = obj.cate_name
        }else{
          innerValue._id = obj._id 
          innerValue.cate_name= obj.cate_name 
        }
      },
      { deep: true }
    )
    async function initCategory() {
      isLoading.value = true
      const { Data, IsSuccess, Message } = await Category.List()
      if (IsSuccess) {
        Data.map((item) => {
          if (!options.find((i) => i._id === item._id))
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
    function handleClear(){
      innerValue.cate_name = null
      innerValue._id = null
    }
    onMounted(async () => {
      await initCategory()
    })
    return {
      innerValue,
      handleClear,
      options,
    }
  },
}
</script>

<style></style>
