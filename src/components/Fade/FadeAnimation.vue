<!--
 * @Author: shawnxiao
 * @Date: 2021-02-01 17:09:43
 * @LastEditTime: 2021-02-08 09:39:53
 * @FilePath: /vue3-cli-antd-pages/src/components/Fade/FadeAnimation.vue
-->
<template>
  <transition>
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'FadeAnimation'
}
</script>

<style lang="less" scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s;
}
</style>
