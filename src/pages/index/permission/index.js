/*
 * @Author: your name
 * @Date: 2020-06-30 17:19:32
 * @LastEditTime: 2021-02-06 23:05:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-cli-antd-pages/src/pages/index/permission/index.js
 */
import router from '../router'
// import store from '@front/data/store'
// progress bar style
import 'nprogress/nprogress.css'
// progress bar
import NProgress from 'nprogress'

import { clearPending } from '@/common/utils/axiosApi.js'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whiteList = ['/login'] // no redirect whitelist
const loginPagePath = '/login'
const homePagePath = '/'

router.beforeEach(async (to, from, next) => {
  clearPending()
  NProgress.start()

  const token = 'getToken()'
  if (token) {
    if (to.path === loginPagePath) {
      next({ path: homePagePath })
      NProgress.done()
    } else {
      runRouter()
      // if (hasPermission(to, store.getters.user.resourceCodes)) {
      //   next();
      // } else {
      //   next("/forbidden");
      // }
    }
  } else {
    if (whiteList.includes(to.path)) {
      // 在免登录白名单列表，直接放行
      next()
    } else {
      // 重定向到登录页
      next({ path: loginPagePath })
      NProgress.done()
    }
  }

  function runRouter() {
    next()
  }
})

router.afterEach(to => {
  NProgress.done()
  document.title = to.meta.title || '首页'
})
