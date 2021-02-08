<!--
 * @Author: shawnxiao
 * @Date: 2021-02-08 09:40:29
 * @LastEditTime: 2021-02-08 09:46:38
 * @FilePath: /vue3-cli-antd-pages/src/components/SvgIcon/index.vue
-->
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.name}`
    },
    svgClass() {
      if (this.name) {
        return 'svg-icon ' + this.name
      }
      return 'svg-icon'
    }
  }
})
</script>

<style lang="less" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>
