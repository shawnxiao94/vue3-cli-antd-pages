/*
 * @Author: shawnxiao
 * @Date: 2021-02-08 10:47:36
 * @LastEditTime: 2021-02-08 10:51:33
 * @FilePath: /vue3-cli-antd-pages/src/common/utils/is.js
 */
const toString = Object.prototype.toString

export function is(val, type) {
  return toString.call(val) === `[object ${type}]`
}

export function isDef(val) {
  return typeof val !== 'undefined'
}

export function isUnDef(val) {
  return !isDef(val)
}

export function isObject(val) {
  return val !== null && is(val, 'Object')
}

export function isEmpty(val) {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }

  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0
  }

  return false
}

export function isDate(val) {
  return is(val, 'Date')
}

export function isNull(val) {
  return val === null
}

export function isNullAndUnDef(val) {
  return isUnDef(val) && isNull(val)
}

export function isNullOrUnDef(val) {
  return isUnDef(val) || isNull(val)
}

export function isNumber(val) {
  return is(val, 'Number')
}

export function isPromise(val) {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function isString(val) {
  return is(val, 'String')
}

export function isFunction(val) {
  return typeof val === 'function'
}

export function isBoolean(val) {
  return is(val, 'Boolean')
}

export function isRegExp(val) {
  return is(val, 'RegExp')
}

export function isArray(val) {
  return val && Array.isArray(val)
}

export function isWindow(val) {
  return typeof window !== 'undefined' && is(val, 'Window')
}

export function isElement(val) {
  return isObject(val) && !!val.tagName
}

export const isServer = typeof window === 'undefined'

export const isClient = typeof window !== 'undefined'

export function isImageDom(o) {
  return o && ['IMAGE', 'IMG'].includes(o.tagName)
}

export function isTextarea(element) {
  return element !== null && element.tagName.toLowerCase() === 'textarea'
}

export function isMobile() {
  return !!navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
}

export function isUrl(path) {
  // eslint-disable-next-line no-useless-escape
  const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
  return reg.test(path)
}
