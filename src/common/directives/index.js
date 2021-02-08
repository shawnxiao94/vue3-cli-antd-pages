/* eslint-disable no-unused-vars */
/*
 * @Author: your name
 * @Date: 2020-05-13 09:57:25
 * @LastEditTime: 2021-02-08 16:16:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-cli-antd-pages/src/common/directives/index.js
 */
import { isFunction, isObject, makeMap, debounce, throttle } from '../utils'
// 存储指令所需参数
let eventParams = {}
// 支持事件对象
const hasEventKey = makeMap(
  'click,dblclick,keyup,keydown,keypress,mouseup,mousedown,mouseover,mouseleave,mousemove,scroll'
)
// 通用指令
export default {
  /** *
   * 防抖 单位时间只触发最后一次
   *  @param {?Number|300} wait - 间隔时间
   *  @param {Function} fn - 执行事件
   *  @param {?String|"click"} event - 事件类型 例："click"
   *  @param {?String} args - 函数附加参数
   *  使用方法1
   *  <button v-debounce="handleClick">方法1</button>
   *  使用方法2
   *  <button v-debounce="{fun: 'handleClick', event: 'click', args: 'test', wait: 500}"></button>
   *  使用方法3
   *  <button v-debounce.dblclick.stop="handleDblclick"></button>
   *  <button v-debounce.mouseover.stop="{fun: 'queryParkListFn', args: 'test', wait: 500}></button>
   */
  debounce: {
    bind: (el, binding, vNode) => {
      const defaultConfig = initEventParams(binding)
      eventParams = defaultConfig
      bindElementEvent(el, vNode.context, 'debounce')
    },
    update: (el, binding, vNode) => {
      const defaultConfig = initEventParams(binding)
      eventParams = defaultConfig
    }
  },
  /** *
   *  节流 每单位时间可触发一次
   *  第一次瞬间触发，最后一次不管是否达到间隔时间依然触发
   *  @param {?Number|300} wait - 间隔时间
   *  @param {Function} fn - 执行事件
   *  @param {?String|"click"} event - 事件类型 例："click"
   *  @param {?String} args - 函数附加参数
   *  使用方法1
   *  <button v-throttle="handleClick">方法1</button>
   *  使用方法2
   *  <button v-throttle="{fun: 'handleClick', event: 'click', args: 'test', wait: 500}"></button>
   *  使用方法3
   *  <button v-throttle.dblclick.stop="handleDblclick"></button>
   *  <button v-throttle.mouseover.stop="{fun: 'queryParkListFn', args: 'test', wait: 500}></button>
   */
  throttle: {
    bind: (el, binding, vNode) => {
      const defaultConfig = initEventParams(binding)
      eventParams = defaultConfig
      bindElementEvent(el, vNode.context, 'throttle')
    },
    update: (el, binding, vNode) => {
      const defaultConfig = initEventParams(binding)
      eventParams = defaultConfig
    }
  }
}

// 初始化指令参数
function initEventParams(binding) {
  const defaultConfig = {
    fun: '',
    event: 'click',
    args: '',
    wait: 200,
    modifiers: {}
  }
  const modifierList = Object.keys(binding.modifiers).filter(
    key => binding.modifiers[key]
  )
  defaultConfig.modifierList = binding.modifiers
  if (modifierList.length > 0) {
    const eventArr = modifierList.filter(vv => hasEventKey(vv))
    defaultConfig.event = eventArr.length === 0 ? 'click' : modifierList[0]
  }
  if (isObject(binding.value)) {
    Object.assign(defaultConfig, binding.value)
  } else if (isFunction(binding.value)) {
    defaultConfig.fun = binding.expression
  }
  return defaultConfig
}
// 事件绑定
function bindElementEvent(el, context, type) {
  const { fun, event, args, wait, modifiers } = eventParams
  if (!isFunction(context[fun])) {
    console.warn(`方法名【${fun}】在组件中未定义`)
    return
  }
  el.removeEventListener(event, () => {})
  if (type === 'debounce') {
    el.addEventListener(
      event,
      debounce(e => {
        if (modifiers.stop) e.stopPropagation()
        if (modifiers.prev) e.preventDefault()
        context[fun].call(null, e, args)
      }, wait)
    )
  } else if (type === 'throttle') {
    el.addEventListener(
      event,
      throttle(e => {
        if (modifiers.stop) e.stopPropagation()
        if (modifiers.prev) e.preventDefault()
        context[fun].call(null, e, args)
      }, wait)
    )
  }
}
