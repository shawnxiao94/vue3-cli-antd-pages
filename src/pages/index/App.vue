<!--
 * @Author: shawnxiao
 * @Date: 2021-02-01 16:13:43
 * @LastEditTime: 2021-02-08 09:23:00
 * @FilePath: /vue3-cli-antd-pages/src/pages/index/App.vue
-->
<template>
  <a-config-provider :locale="locale">
    <router-view></router-view>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  name: 'App',
  data() {
    return {
      locale: zhCN
    }
  }
}
</script>
