/*
 * @Author: your name
 * @Date: 2020-04-09 15:32:18
 * @LastEditTime: 2021-02-06 22:13:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-cli-antd-pages/src/common/utils/axiosApi.js
 */
import axios from 'axios'
import qs from 'qs'
import { dataURLtoFile } from '@/common/utils'
import { getStorage, loginOutCas } from '@/common/utils/auth'
import ErrorMessage from '@/common/utils/errorMessage'
import { Modal, notification } from 'ant-design-vue'

// 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const PendingArr = new Map()
const CancelToken = axios.CancelToken

// 移除重复请求 方法
const RemovePending = config => {
  if (PendingArr.length) {
    for (const key in PendingArr) {
      const index = +key
      const PendingItem = PendingArr[key]
      // 当前请求在数组中存在时执行函数体
      if (
        !PendingItem?.neverCancel &&
        PendingItem.url === config.url &&
        PendingItem.method === config.method &&
        JSON.stringify(PendingItem?.params) === JSON.stringify(config.params) &&
        JSON.stringify(PendingItem?.data) === JSON.stringify(config.data)
      ) {
        // 执行取消操作
        PendingItem.cancel('操作太频繁，请稍后再试！')
        // 从数组中移除记录
        PendingArr.splice(index, 1)
      }
    }
  }
}
/**
 * 创建axios实例
 */
const instance = axios.create({
  baseURL: '/',
  headers: {
    'content-type': 'application/json;charset=utf-8'
  },
  timeout: 30000,
  withCredentials: true,
  credentials: 'include'
})
/**
 * 添加请求拦截
 */
instance.interceptors.request.use(
  request => {
    // token
    if (getStorage()) {
      request.headers['tg-token'] = getStorage()
    }
    // 移除重复请求
    RemovePending(request)
    // 存储请求pending
    request.cancelToken = new CancelToken(c => {
      PendingArr.push({
        url: request.url,
        method: request.method,
        params: request?.params,
        data: request?.data,
        cancel: c,
        neverCancel: request?.neverCancel
      })
    })
    console.log('PendingArr:', PendingArr)
    return request
  },
  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    RemovePending(response.config)
    if (response.config.url.includes('.json')) {
      // 走的json本地数据场景
      return Promise.resolve(response)
    }
    if (~~response.data.code !== 200) {
      if (~~response.data.code === 403 || ~~response.data.code === 401) {
        Modal.error({
          title: '错误提示！',
          content: response.data.msg || response.data.message,
          // okText:''
          onOk() {
            loginOutCas()
          }
        })
      } else {
        return Promise.reject(response)
      }
    } else {
      return Promise.resolve(response)
    }
  },
  error => {
    if (error && error.response) {
      switch (~~error.response.status) {
        case 400:
          error.message = ErrorMessage.STATUS_400
          break
        case 401:
          error.message = ErrorMessage.STATUS_401
          break
        case 403:
          error.message = ErrorMessage.STATUS_403
          break
        case 404:
          error.message = ErrorMessage.STATUS_404
          break
        case 408:
          error.message = ErrorMessage.STATUS_408
          break
        case 500:
          error.message = ErrorMessage.STATUS_500
          break
        case 501:
          error.message = ErrorMessage.STATUS_501
          break
        case 502:
          error.message = ErrorMessage.STATUS_502
          break
        case 503:
          error.message = ErrorMessage.STATUS_503
          break
        case 504:
          error.message = ErrorMessage.STATUS_504
          break
        case 505:
          error.message = ErrorMessage.STATUS_505
          break
        default:
      }
      Modal.error({
        title: '错误提示！',
        content: `请求失败-${error.response.data.msg ||
          error.response.data.message ||
          error.message}`,
        // okText:''
        onOk() {
          if (
            ~~error.response.status === 401 ||
            ~~error.response.status === 403
          ) {
            loginOutCas()
          }
        }
      })
    } else {
      // 服务器请求失败时错误提示
      notification.error({
        message: '错误提示！',
        description: `请求超时${ErrorMessage.API_ERROR_LOAD}`
      })
    }
    // 超时重新请求
    const config = error.config
    // 全局的请求次数,请求的间隙
    const [RETRY_COUNT, RETRY_DELAY] = [3, 1000]
    if (config && RETRY_COUNT) {
      // 设置用于跟踪重试计数的变量
      config.__retryCount = config.__retryCount || 0
      // 检查是否已经把重试的总数用完
      if (config.__retryCount >= RETRY_COUNT) {
        return Promise.reject(error.message)
      }
      // 增加重试计数
      config.__retryCount++
      // 创造新的Promise来处理指数后退
      const backOff = new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, RETRY_DELAY || 1)
      })
      // instance重试请求的Promise
      return backOff.then(() => {
        return instance(config)
      })
    }
    // return Promise.reject(error)
  }
)

const ContentTypeArr = [
  { raw: 'application/json;charset=utf-8' }, // 声明了请求体中的数据将会以json字符串的形式发送到后端 axiso默认,可以上传任意类型的文本，比如text、json、xml等,所有填写的text都会随着请求发送；
  {
    'x-www-form-urlencoded': 'application/x-www-form-urlencoded;charset=utf-8'
  }, // 声明了请求体中的数据会以键值对（普通表单形式）发送到后端，这种类型是Ajax默认的。
  { 'form-data': 'multipart/form-data;charset=utf-8' }, // 一般用来上传文件，指定传输数据为二进制数据，例如图片、mp3、文件，也可以用来上传键值对,它将表单数据处理为一条消息，以标签为单元，用分隔符分开。既可以单独上传键值对，也可以直接上传文件（当上传字段是文件时，会有Content-Type来说明文件类型,但该文件不会作为历史保存，只能在每次需要发送请求的时候，重新添加文件。）；post请求里较常用的一种
  { binary: 'application/octet-stream;charset=utf-8' } // 只能上传二进制文件，且没有键值对，一次只能上传一个文件, 也不能保存历史，每次选择文件，提交；
]

// 使用post请求方式数组
const postMethods = ['put', 'post', 'delete']

/**
 * API请求封装
 * @param  {String} url api请求url
 * @param  {String} method 请求方法，默认为post
 * @param  {String} model
 * @param  {Object} params 入参
 * @param  {String} isPost 请求方法
 * @return 返回一个经加工的axios实例
 */

export default function({
  url,
  method,
  model,
  params = {},
  isPost,
  ContentType,
  responseType
}) {
  const _config = {
    url,
    method,
    headers: {
      'content-type': ContentType
        ? Object.values(ContentTypeArr.find(item => item[ContentType]))[0]
        : ContentTypeArr[0].raw
    }
  }
  if (ContentType && ContentType === 'form-data') {
    _config.headers.Accept = '*/*'
  }
  if (responseType) {
    _config.responseType = responseType
  }

  const _params = params
    ? model
      ? ContentType && ContentType === 'form-data'
        ? model.request(params)
        : model.request(JSON.parse(JSON.stringify(params)))
      : params
    : ''
  if (postMethods.includes(method.toLowerCase()) || isPost) {
    if (ContentType) {
      if (ContentType === 'x-www-form-urlencoded') {
        _config.data = qs.stringify(_params)
      }
      if (ContentType === 'form-data') {
        // 文件上传流
        const obj = {
          fileName: '',
          image: '',
          file: '',
          params: {}
        }
        Object.assign(obj, _params)
        const formData = new FormData()
        if (obj.image !== '') {
          formData.append(obj.fileName, dataURLtoFile(_params.image))
        } else {
          formData.append(obj.fileName, _params.file)
        }
        if (obj.params) {
          Object.keys(obj.params).forEach(key => {
            formData.append(key, obj.params[key])
          })
        }
        _config.data = formData
      }
    } else {
      _config.data = _params
    }
  } else {
    _config.params = _params
  }
  return new Promise((resolve, reject) => {
    return instance(_config)
      .then(response => {
        resolve(model ? model.response(response.data) : response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
