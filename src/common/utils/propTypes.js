/*
 * @Author: shawnxiao
 * @Date: 2021-02-08 11:07:26
 * @LastEditTime: 2021-02-08 11:09:12
 * @FilePath: /vue3-cli-antd-pages/src/common/utils/propTypes.js
 */
import { createTypes } from 'vue-types'

const propTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  object: undefined,
  integer: undefined
})

propTypes.extend([
  {
    name: 'style',
    getter: true,
    type: [String, Object],
    default: undefined
  },
  {
    name: 'VNodeChild',
    getter: true,
    type: undefined
  }
])
export { propTypes }
