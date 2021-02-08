/*
 * @Author: your name
 * @Date: 2020-04-17 17:09:57
 * @LastEditTime: 2020-04-17 17:25:14
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /cell-project/src/common/utils/errorMessage.js
 */
const ErrorMessage = {
  // 服务器无响应时错误提示
  API_ERROR_LOAD: '服务器无响应！',
  // 服务器请求失败
  STATUS_201: '新建或修改数据成功',
  STATUS_202: '一个请求已经进入后台排队（异步任务）',
  STATUS_204: '删除数据成功',
  STATUS_210: '请求参数错误',
  STATUS_211: '业务处理失败!',
  STATUS_400: '发出的请求有错误，服务器没有进行新建或修改数据的操作!',
  STATUS_401: '用户没有权限（令牌、用户名、密码错误）',
  STATUS_402: '用户未授权，访问被禁止',
  STATUS_403: '用户得到授权，但是访问是被禁止的',
  STATUS_404: '发出的请求针对的是不存在的记录，服务器没有进行操作',
  STATUS_406: '请求的格式不可得!',
  STATUS_408: '请求超时！',
  STATUS_410: '请求的资源被永久删除，且不会再得到的!',
  STATUS_422: '当创建一个对象时，发生一个验证错误!',
  STATUS_500: '服务器发生错误，请检查服务器!',
  STATUS_501: '服务未实现！',
  STATUS_502: '网关错误！',
  STATUS_503: '服务不可用，服务器暂时过载或维护!',
  STATUS_504: '网关超时！',
  STATUS_505: 'HTTP版本不受支持！'
}
export default ErrorMessage
