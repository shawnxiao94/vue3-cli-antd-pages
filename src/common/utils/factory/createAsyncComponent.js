/*
 * @Author: shawnxiao
 * @Date: 2021-02-08 10:35:50
 * @LastEditTime: 2021-02-08 10:39:50
 * @FilePath: /vue3-cli-antd-pages/src/common/utils/factory/createAsyncComponent.js
 */
import {
  defineAsyncComponent
} from 'vue'
import { Spin } from 'ant-design-vue'
// eslint-disable-next-line no-empty-function
const noop = () => {}

export function createAsyncComponent(loader, options) {
  const { size = 'small', delay = 100, timeout = 30000, loading = false, retry = true } = options
  return defineAsyncComponent({
    loader,
    loadingComponent: loading ? <Spin spinning={true} size={size} /> : undefined,
    timeout,
    delay,
    /**
     *
     * @param {*} error Error message object
     * @param {*} retry A function that indicating whether the async component should retry when the loader promise rejects
     * @param {*} fail  End of failure
     * @param {*} attempts Maximum allowed retries number
     */
    onError: !retry
      ? noop
      : (error, retry, fail, attempts) => {
          if (error.message.match(/fetch/) && attempts <= 3) {
            retry()
          } else {
            fail()
          }
        }
  })
}
