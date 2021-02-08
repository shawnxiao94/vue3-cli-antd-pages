<!--
 * @Author: shawnxiao
 * @Date: 2021-02-08 14:38:00
 * @LastEditTime: 2021-02-08 15:57:24
 * @FilePath: /vue3-cli-antd-pages/src/components/StatisticCountTo/index.vue
-->
<template>
  <div class="statistic-countTo">
    <div class="statistic-countTo-title">{{title}}</div>
    <div class="statistic-countTo-content">
      <span class="statistic-countTo-content-value">
        <slot name="countTo"></slot>
      </span>
      <span class="statistic-countTo-content-suffix">
        <slot name="suffix"></slot>
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs, reactive } from 'vue'
  export default defineComponent({
    name: 'StatisticCountTo',
    props: {
      title: {
        type: String
      }
    },
    components: {
    },
    setup(props){
      const state = reactive({
        ...props
      })
      return {
        ...toRefs(state)
      }
    }
  })
</script>

<style lang="less" scoped>
.statistic-countTo{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: 'tnum';
  text-align: center;
  &-title{
    margin-bottom: 4px;
    color:#222;
    font-size: 14px;
  }
  &-content{
    font-size: 26px;
    color:#222;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    &-suffix{
      margin-left: 4px;
      font-size: 12px;
    }
  }
}
</style>
