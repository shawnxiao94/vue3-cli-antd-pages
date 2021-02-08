<!--
 * @Author: shawnxiao
 * @Date: 2021-02-08 09:48:55
 * @LastEditTime: 2021-02-08 09:49:14
 * @FilePath: /vue3-cli-antd-pages/src/components/Loading/index.vue
-->
<template>
  <div class="spin-wrapper">
    <Spin size="large" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Spin } from 'ant-design-vue'
export default defineComponent({
  name: 'IconPage',
  components: {
    Spin
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less" scoped>
.spin-wrapper {
  padding-top: 100px;
  text-align: center;
}
</style>
