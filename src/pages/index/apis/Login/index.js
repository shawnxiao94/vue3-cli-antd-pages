/*
 * @Author: your name
 * @Date: 2020-10-16 10:15:44
 * @LastEditTime: 2021-02-01 18:07:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-cli-antd-pages/src/pages/index/apis/Login/index.js
 */
import axiosApi from '@/common/utils/axiosApi.js'
import { getParentUrl } from '@/common/utils/auth.js'

export async function checkLoginTokenFn(params) {
  // 区分lab和非lab服务环境
  const url = getParentUrl() || `${process.env.VUE_APP_BASE_API}`
  const path = url.includes('lab') ? 'sso1.lab' : 'sso1'
  const origin = url.includes('lab')
    ? 'app.lab.clickpaas.com'
    : 'app.clickpaas.com'
  return axiosApi({
    url: `//${path}.clickpaas.com/api/sso/login/checkStatus?origin=${origin}`,
    method: 'get',
    model: null,
    params
  })
}
