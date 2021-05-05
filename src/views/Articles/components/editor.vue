<!--
 * @Author: your name
 * @Date: 2021-05-04 22:04:12
 * @LastEditTime: 2021-05-05 14:14:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \MPANDA.STUDIO.HOMEPAGE\src\views\Articles\view\index.vue
-->
<template>
  <div id="vditor" />
</template>

<script>
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { getCurrentInstance, onMounted, ref, toRefs, watch } from 'vue'
export default {
  props: {
    disabled: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props, context, ctx) {
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
    onMounted(() => {
      contentEditor.value = new Vditor('vditor', {
        height: 360,
        toolbarConfig: {
          pin: true,
        },
        cache: {
          enable: false,
        },
        after: () => {},
        blur: (md) => {
          var result = md.trim()
          instance.emit('update:modelValue', result)
          dispatch('ElFormItem', 'el.form.blur', [result])
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
