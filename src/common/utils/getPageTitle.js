/*
 * @Author: your name
 * @Date: 2020-05-13 09:44:07
 * @LastEditTime: 2020-05-13 09:45:56
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /vue-cli4-multi/src/common/utils/getPageTitle.js
 */
import defaultSettings from '@/settings'

const title = defaultSettings.title || '标题 Vue Element'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
