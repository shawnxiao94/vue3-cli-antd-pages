/* eslint-disable init-declarations */
/*
 * @Author: your name
 * @Date: 2020-04-17 17:09:57
 * @LastEditTime: 2021-02-08 16:14:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-cli-antd-pages/src/common/utils/cookie.js
 */
export function setCookie (name, value, expires) {
  expires = expires || 300 // 未传多少天则默认300天
  const expDays = expires * 24 * 60 * 60 * 1000
  const expDate = new Date()
  expDate.setTime(expDate.getTime() + expDays)
  const expString = expires ? ';expires=' + expDate.toGMTString() : ''
  document.cookie = name + '=' + encodeURI(value) + expString + ';path=/'
}
// 读取cookies
export function getCookie (name) {
  let arr
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if ((arr = document.cookie.match(reg))) {
    return decodeURI(arr[2])
  } 
    return null
  
}
// 删除cookies
export function delCookie (name) {
  const exp = new Date(new Date().getTime() - 1)
  const cval = getCookie(name)
  if (cval !== null) {
    document.cookie =
      name + '=' + cval + ';expires=' + exp.toUTCString() + ';path=/'
  }
}
