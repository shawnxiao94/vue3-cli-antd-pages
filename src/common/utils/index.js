/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable prefer-rest-params */
/* eslint-disable init-declarations */
/**
 * 工具包
 */
// 树形转扁平
// 把 level, Id, Name, Pid 这些想要获取的键值名作为参数带进去,给每个层级增加一个level
// flatten(arr, ['Id', 'Name', 'Pid', 'id'])
export function flatten(data, keys, level = 0) {
  return data.reduce(
    (arr, x) => [
      ...arr,
      keys.reduce(
        (o, k) => {
          o[k] = x[k] === 0 ? x[k] : x[k] ? x[k] : ''
          return o
        },
        { level }
      ),
      ...flatten(x.children || [], keys, level + 1)
    ],
    []
  )
}
// 扁平树形化
export function transformTree(list, options = {}) {
  const {
    keyField = 'id',
    childField = 'children',
    parentField = 'parentId'
  } = options

  const tree = []
  const record = {}

  for (let i = 0, len = list.length; i < len; i++) {
    const item = list[i]
    const id = item[keyField]

    if (!id) {
      continue
    }

    if (record[id]) {
      item[childField] = record[id]
    } else {
      item[childField] = record[id] = []
    }

    if (item[parentField]) {
      const parentId = item[parentField]

      if (!record[parentId]) {
        record[parentId] = []
      }

      record[parentId].push(item)
    } else {
      tree.push(item)
    }
  }

  return tree
}

export function getUuid() {
  const temp_url = URL.createObjectURL(new Blob())
  const uuid = temp_url.toString()
  URL.revokeObjectURL(temp_url)
  return uuid.substr(uuid.lastIndexOf('/') + 1)
}

export const getRandomStr = () => {
  return (
    new Date().getTime() +
    Math.random()
      .toString(16)
      .slice(2)
  )
}

/**
 * 将一个扁平化的数组转换为树状结构
 * @param {Array} list
 * @param {Null | String} id 子节点关联属性 值
 * @param {String} key 子节点关联属性 键
 * @param {String} parentKey 父节点关联属性 键
 * @return {Array} 树状数据
 */
export const listToTree = (list, id, key, parentKey) => {
  const ret = []
  const temp = list.filter(v => v[parentKey] === id)
  temp.forEach(item => {
    ret.push({
      ...item,
      id: String(item.id),
      children: listToTree(list, item[key], key, parentKey)
    })
  })
  return ret
}

/**
 * 判断当前路由是否拥有权限
 * @param {Object} route 当前路由对象
 * @param {Array<string>} resourceCodes 当前用户拥有的所有权限 code list
 * @return {Boolean} 是否拥有权限
 */
export const hasPermission = (route, resourceCodes = []) => {
  if (route.meta && route.meta.auth && Array.isArray(route.meta.auth)) {
    return route.meta.auth.some(code => resourceCodes.includes(code))
  }
  return true
}

/**
 * 生成有权限的路由
 * @param {Array} routes 路由表
 * @param {Array<string>} resourceCodes 当前用户拥有的所有权限 code list
 * @return {Array} accessRoutes
 */
export const getAccessRoutes = (routes, resourceCodes) => {
  return routes.filter(item => {
    if (Array.isArray(item.children)) {
      item.children = getAccessRoutes(item.children, resourceCodes)
    }
    return hasPermission(item, resourceCodes)
  })
}

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export function debounce(func, wait = 50, immediate) {
  let timeout
  return function() {
    const context = this
    const args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      const callNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, wait)
    }
  }
}

/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
export function throttle(func, wait = 50, type = 1) {
  let previous, timeout
  if (type === 1) {
    previous = 0
  }
  return function() {
    const context = this
    const args = arguments
    if (type === 1) {
      const now = Date.now()

      if (now - previous > wait) {
        func.apply(context, args)
        previous = now
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null
          func.apply(context, args)
        }, wait)
      }
    }
  }
}
export function isFunction(fun) {
  return Object.prototype.toString.call(fun) === '[object Function]'
}
export function isObject(fun) {
  return Object.prototype.toString.call(fun) === '[object Object]'
}
export function makeMap(str) {
  const arr = str.split(',')
  const obj = {}
  arr.forEach(vv => {
    obj[vv] = true
  })
  return function() {
    const args = arguments
    return obj[args[0]]
  }
}

/**
 *  格式化时间 Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return timeStr
}

/**
 * 用户体验式格式化时间 几秒前、几分钟前、几小时前，何年何月何日
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  }
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
}

/**
 * 获取URL参数并以对象数据形式返回
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url === null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

// 设置窗体滚动条高度
export function setScrollTop(top) {
  if (document.documentElement) {
    document.documentElement.scrollTop = top
  } else if (document.body) {
    document.body.scrollTop = top
  }
}

// 非空判断
export function isNotEmpty(value) {
  return value !== undefined && value !== '' && value !== null
}

// 获取URL参数
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

// 格式化HTML文本数据
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function dataURLtoFile(dataUrl, filename = 'file') {
  if (typeof dataUrl === 'object') {
    return new File([dataUrl], `${filename}.jpg`, { type: 'jpg' })
  }
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const suffix = mime.split('/')[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, { type: mime })
}

// merge对象
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  for (const property in source) {
    // eslint-disable-next-line no-prototype-builtins
    if (source.hasOwnProperty(property)) {
      const sourceProperty = source[property]
      if (typeof sourceProperty === 'object') {
        target[property] = objectMerge(target[property], sourceProperty)
        continue
      }
      target[property] = sourceProperty
    }
  }
  return target
}

// 滚动条定位
export function scrollTo(element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = (difference / duration) * 10
  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

// 添加删除样式
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

// 延时调用
export function delayedCall(func, wait, immediate) {
  let timeout, args, context, timestamp, result
  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * @description 将url请求参数转为json格式
 * @param url
 * @returns {{}|any}
 */
export function paramObj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

// 数据深拷
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    // eslint-disable-next-line no-prototype-builtins
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

// 数据深拷
// export function deepClone(data) {
//   const type = checkedType(data)
//   let result
//   if (type === 'Array') {
//     result = []
//   } else if (type === 'Object') {
//     result = {}
//   } else {
//     return data
//   }
//   if (type === 'Array') {
//     for (let i = 0, len = data.length; i < len; i++) {
//       result.push(deepClone(data[i]))
//     }
//   } else if (type === 'Object') {
//     // 对原型上的方法也拷贝了....
//     for (const key in data) {
//       result[key] = deepClone(data[key])
//     }
//   }
//   return result
// }

// 定义检测数据类型的功能函数
// function checkedType(target) {
//   return Object.prototype.toString.call(target).slice(8, -1)
// }

// 监听事件
export function addEvent(el, type, fn, capture) {
  if (window.addEventListener) {
    if (type === 'mousewheel' && document.mozHidden !== undefined) {
      type = 'DOMMouseScroll'
    }
    el.addEventListener(type, fn, !!capture)
  } else if (window.attachEvent) {
    el.attachEvent('on' + type, fn)
  }
}
// 移除事件
export function removeEvent(el, type, fn, capture) {
  if (window.removeEventListener) {
    if (type === 'mousewheel' && document.mozHidden !== undefined) {
      type = 'DOMMouseScroll'
    }
    el.removeEventListener(type, fn, !!capture)
  } else if (window.detachEvent) {
    el.detachEvent('on' + type, fn)
  }
}

// 解决浮点型计算精度问题
export function formatFloat(f, digit = 2, isNotRound) {
  if (arguments.length === 2 && typeof arguments[1] === 'boolean') {
    isNotRound = arguments[1]
    digit = 2
  }
  if (isNaN(Number(f))) {
    throw new Error('parameters cannot be non-numeric for formatFloat method')
  } else {
    if (typeof f === 'string') {
      f = Number(f)
    }
  }
  f = f.toFixed(10)
  const m = Math.pow(10, digit)
  if (isNotRound) {
    return parseInt(f * m, 10) / m
  }
  let _abs = 1
  if (f < 0) {
    f = Math.abs(f)
    _abs = -1
  }
  return (Math.round(f * m, 10) / m) * _abs
}

// 深冻结
export function deepFreeze(o) {
  let prop, propKey
  Object.freeze(o)
  for (propKey in o) {
    prop = o[propKey]
    if (
      // eslint-disable-next-line no-prototype-builtins
      !o.hasOwnProperty(propKey) ||
      !(typeof prop === 'object') ||
      Object.isFrozen(prop)
    ) {
      continue
    }
    deepFreeze(prop)
  }
}

/**
 * @see 获取随机数
 * @param str 随机数开头字母
 * @param n 随机数个数
 */
export function getRandomNum(str = '', n = 12) {
  if (typeof n === 'string') {
    n = Number(n)
  }
  n += 2
  return str + String(Math.random()).slice(2, n)
}

export function jsonp({ url, data }) {
  if (!url) {
    throw new Error('url is necessary')
  }
  try {
    return new Promise((resolve, reject) => {
      const callback =
        'CALLBACK' +
        Math.random()
          .toString()
          .substr(9, 18)
      const JSONP = document.createElement('script')
      JSONP.setAttribute('type', 'text/javascript')
      const headEle = document.getElementsByTagName('head')[0]
      let ret = ''
      if (data) {
        if (typeof data === 'string') {
          ret = '&' + data
        } else if (typeof data === 'object') {
          // eslint-disable-next-line guard-for-in
          for (const key in data) {
            ret += '&' + key + '=' + encodeURIComponent(data[key])
          }
        }
        ret += '&_time=' + Date.now()
      }
      JSONP.src = `${url}?callback=${callback}${ret}`
      window[callback] = result => {
        resolve(result)
        headEle.removeChild(JSONP)
        delete window[callback]
      }
      headEle.appendChild(JSONP)
    })
  } catch (err) {
    console.log(err)
  }
}
