
<template>
  <div id="vditor" />
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { debounce } from '@/utils/common.js'
import { getCurrentInstance, onMounted, ref, toRefs, watch } from 'vue'
export default {
  props: {
    disabled: {
      type: Boolean,
      default: () => false,
    },
    modelValue: {
      type: String,
      default: () => '',
    },
  },
  setup (props, context) {
    const content = ref('')
    const contentEditor = ref('')
    const instance = getCurrentInstance()
    const dispatch = (componentName, eventName, params) => {
      var parent = instance.parent || instance.root
      var name = parent.type.componentName
      while (parent && (!name || name !== componentName)) {
        parent = parent.parent
        if (parent) {
          name = parent.type.componentName
        }
      }
      if (parent) {
        parent.emit.apply(parent, [eventName].concat(params))
      }
    }
    watch(
      () => props.modelValue,
      (val, old) => {
        if (contentEditor.value.getValue().trim() === '') {
          contentEditor.value.setValue(val)
        }
      }
    )
    onMounted(() => {
      // console.log(props.modelValue)
      contentEditor.value = new Vditor('vditor', {
        height: 400,
        toolbarConfig: {
          pin: true,
        },
        cache: {
          enable: false,
        },
        after: () => { },
        input: (md) => { 
          instance.emit('update:modelValue', md.trim())
          dispatch('ElFormItem', 'el.form.blur', [md.trim()])
        },
        select: () => {
        },
      })
    })

    var { disabled } = toRefs(props)
    // console.log(prop)
    watch(disabled, (isDisabled) => {
      if (isDisabled) contentEditor.value.disabled()
      else contentEditor.value.enable()
    })
    // contentEditor.value.disabled()

    return {
      contentEditor,
    }
  },
}
</script>

<style lang="scss" scoped></style>
