/*
 * @Author: shawnxiao
 * @Date: 2021-02-01 16:13:43
 * @LastEditTime: 2021-02-08 10:03:08
 * @FilePath: /vue3-cli-antd-pages/src/pages/index/store/index.js
 */
// @description 导入所有 vuex 模块，自动加入namespaced:true，用于解决vuex命名冲突，请勿修改。

import { createStore } from 'vuex'

const files = require.context('./modules', false, /\.js$/)
const modules = {}
files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})
Object.keys(modules).forEach(key => {
  modules[key]['namespaced'] = true
})
export default createStore({
  modules
})
