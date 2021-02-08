/*
 * @Author: shawnxiao
 * @Date: 2021-02-01 16:13:43
 * @LastEditTime: 2021-02-08 10:20:50
 * @FilePath: /vue3-cli-antd-pages/src/pages/index/router/index.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'

const asyncImport = file => () =>
  import(/* webpackChunkName: "vueinfo" */ '../views/' + file + '.vue')

//  静态无需权限路由
export const constantRoutes = [
  {
    path: '/login',
    component: asyncImport('Login/index'),
    hidden: true
  },
  {
    path: '/home',
    component: asyncImport('Home/index'),
    hidden: false
  },
  {
    path: '/403',
    name: '403',
    component: asyncImport('Error/403'),
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: asyncImport('Error/404'),
    hidden: true
  },
  // vue3对404配置进行了修改,必须要使用正则匹配
  { path: '/:pathMatch(.*)*', redirect: '/404' },
  { path: '', redirect: '/home' }
]

// 异步权限路由
export const asyncRoutes = []

const scrollBehavior = (to, from, savedPosition) => {
  const behavior = 'smooth'
  if (savedPosition) {
    return { ...savedPosition, behavior }
  }
   // Scroll to anchor by returning the selector
  if (to.hash) {
    return { el: decodeURI(to.hash), behavior }
  }
   // Check if any matched route config has meta that discourages scrolling to top
  if (to.matched.some((m) => m.meta.scrollToTop === false)) {
    // Leave scroll as it is
    return false
  }
  if (!from.meta.noCache) {
    from.meta.savedPosition =
      document.body.scrollTop ||
      document.documentElement.scrollTop ||
      window.pageYOffset
  }
  return { left: 0, top: to.meta.savedPosition || 0, behavior }
}

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior,
  routes: constantRoutes
})

// router.beforeEach((to, from, next) => {
//   const title = to.meta && to.meta.title;
//   if (title) {
//     document.title = title;
//   }
//   next();
// });

export default router
