/*
 * @Author: your name
 * @Date: 2020-04-10 17:00:18
 * @LastEditTime: 2021-02-07 18:37:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-cli-antd-pages/src/pages/index/apis/CovidMonitor/index.js
 */
import axiosApi from '@/common/utils/axiosApi.js'
import * as model from './model'

// 接口域名
const isMock = true
const domain = isMock ? './' : `${process.env.VUE_APP_BASE_API}`
// 接口标示路径
const basePath =
  process.env.NODE_ENV === 'production'
    ? `${domain}/epidemicpocapi/reportAndMonitor`
    : `${domain}/reportAndMonitor`

// 获取所有监测数据
export function findAll(params) {
  return axiosApi({
    url: `${basePath}/findAll`,
    method: 'get',
    model: model.findAll,
    params
  })
}
// 获取所有监测数据
export function getGridList(params) {
  return axiosApi({
    url: `${basePath}/getGridList`,
    method: 'get',
    model: model.findAll,
    params
  })
}
// update
export function updateDate(params) {
  return axiosApi({
    url: `${basePath}/update`,
    method: 'get',
    model: model.findAll,
    params
  })
}
