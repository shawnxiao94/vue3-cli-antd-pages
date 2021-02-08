<!--
 * @Author: your name
 * @Date: 2020-05-13 10:09:48
 * @LastEditTime: 2021-02-01 17:09:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-cli-antd-pages/src/components/Error/404.vue
 -->
<template>
  <div class="page404">
    <img :src="require('@/assets/images/common/404.png')" alt="" />
  </div>
</template>

<script>
export default {
  name: 'ErrorPage'
}
</script>

<style lang="less">
.page404 {
  img {
    display: block;
    max-height: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
