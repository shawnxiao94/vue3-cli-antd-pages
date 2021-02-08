<!--
 * @Author: shawnxiao
 * @Date: 2021-02-02 09:38:40
 * @LastEditTime: 2021-02-08 09:39:43
 * @FilePath: /vue3-cli-antd-pages/src/components/NoData/index.vue
-->
<template>
  <a-empty :image="simpleImage" />
</template>

<script>
import { Empty } from 'ant-design-vue'
export default {
  name: 'NoData',
  setup() {
    const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
    return { simpleImage }
  }
}
</script>
