/* eslint-disable init-declarations */
/*
 * @Author: your name
 * @Date: 2020-05-13 09:44:07
 * @LastEditTime: 2021-02-08 16:13:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-cli-antd-pages/src/common/utils/date/pickDisable.js
 */
/**
 * @see 日期对比方法封装
 * @param contrastDate 对比日期数据
 * @param contrastBeginCode 对比日期数据的起始日期键值
 * @param contrastEndCode 对比日期数据的截止日期键值
 * @param sectionDate 对比区间
 * @param noPastTimes 不能为过去时间
 *  */
import moment from 'moment'
export default function pickDisable ({
  contrastDate = [],
  contrastBeginCode = 'effDate',
  contrastEndCode = 'expDate',
  sectionDate = null,
  noPastTimes = false
}) {
  const arr = []
  const arr2 = []
  contrastDate.forEach(item => {
    arr.push(item[contrastBeginCode])
    arr2.push(item[contrastEndCode])
  })
  // 开始日期的最大值
  const maxN = Math.max.apply(null, arr)
  // 结束日期的最小值
  const minN = Math.min.apply(null, arr2)
  // 当天
  // let currentDate = moment()
  //   .startOf("day")
  //   .valueOf();
  // 一天毫秒数
  // let oneDayTime = 24 * 60 * 60 * 1000;

  return {
    disabledDate (time) {
      let _maxN, _minN
      if (sectionDate) {
        const _sectionDateMin = moment(sectionDate.min)
          .startOf('day')
          .valueOf()
        const _sectionDateMax = moment(sectionDate.max)
          .startOf('day')
          .valueOf()
        if (_sectionDateMax < maxN || minN < _sectionDateMin) {
          return true
        } 
          _maxN = Math.max(_sectionDateMin, maxN)
          _minN = Math.min(_sectionDateMax, minN)
        
      } else {
        _maxN = maxN
        _minN = minN
      }
      if (noPastTimes) {
        const _today = moment()
          .startOf('day')
          .valueOf()
        _maxN = Math.max(_today, _maxN)
      }
      if (_maxN > time.getTime() || _minN < time.getTime()) {
        return true
      }
    }
  }
}
