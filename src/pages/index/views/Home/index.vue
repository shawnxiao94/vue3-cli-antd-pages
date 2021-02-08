<!--
 * @Author: shawnxiao
 * @Date: 2021-02-01 16:13:43
 * @LastEditTime: 2021-02-08 16:09:34
 * @FilePath: /vue3-cli-antd-pages/src/pages/index/views/Home/index.vue
-->
<template>
  <div class="box">
    <div class="box-top">
      <div class="box-top-left">
        <div class="img">
          <img
            :src="require('@index/assets/images/pages/home/ic_covid.png')"
            alt=""
          />
        </div>
        <div class="info">
          <h3>疫情系统填报情况每日监测</h3>
          <p>
            在岗总人数
            <!-- <i>{{ monitor.number0 }}</i> -->
            <count-to  :startVal="1" :endVal="monitor.number0"></count-to>
          </p>
        </div>
      </div>
      <div class="box-top-right">
        <a-button
          type="primary"
          @click="handleFresh"
          :loading="loadings.btnLoading"
        >
          <template #icon><ReloadOutlined /></template>
          刷新
        </a-button>
      </div>
    </div>
    <div class="box-card">
      <div class="box-card-title">预警图</div>
      <div class="box-card-cont">
        <a-skeleton
          :loading="loadings.loadinglist"
          :paragraph="{ rows: 7 }"
          active
        >
          <ul class="list-item">
            <li class="item">
              <div class="item-t">
                <statistic-count-to title="今日测温" >
                  <template #countTo>
                    <count-to  :startVal="1" :endVal="monitor.number1"></count-to>
                  </template>
                  <template #suffix>
                    <span> / 人</span>
                  </template>
                </statistic-count-to>
              </div>
              <div class="item-b">
                <a-progress
                  class="custom-progress"
                  type="circle"
                  :width="80"
                  :percent="monitor.number11"
                  strokeColor="#004898"
                />
              </div>
            </li>
            <li class="item">
              <div class="item-t">
                <statistic-count-to title="通过测温检查" >
                  <template #countTo>
                    <count-to  :startVal="1" :endVal="monitor.number2"></count-to>
                  </template>
                  <template #suffix>
                    <span> / 人</span>
                  </template>
                </statistic-count-to>
                <!-- <a-statistic
                  title="通过测温检查"
                  :value="monitor.number2"
                  class="custom-statistic"
                >
                  <template #suffix>
                    <span> / 人</span>
                  </template>
                </a-statistic> -->
              </div>
              <div class="item-b">
                <a-progress
                  class="custom-progress"
                  type="circle"
                  :width="80"
                  :percent="monitor.number12"
                  strokeColor="#23B899"
                />
              </div>
            </li>
            <li class="item">
              <div class="item-t">
                <statistic-count-to title="体温异常" >
                  <template #countTo>
                    <count-to  :startVal="1" :endVal="monitor.number3"></count-to>
                  </template>
                  <template #suffix>
                    <span> / 人</span>
                  </template>
                </statistic-count-to>
                <!-- <a-statistic
                  title="体温异常"
                  :value="monitor.number3"
                  class="custom-statistic"
                >
                  <template #suffix>
                    <span> / 人</span>
                  </template>
                </a-statistic> -->
              </div>
              <div class="item-b">
                <a-progress
                  class="custom-progress"
                  type="circle"
                  :width="80"
                  :percent="monitor.number13"
                  strokeColor="#ED6E4F"
                />
              </div>
            </li>
            <li class="item">
              <div class="item-t">
                <statistic-count-to title="测温中断" >
                  <template #countTo>
                    <count-to  :startVal="1" :endVal="monitor.number4"></count-to>
                  </template>
                  <template #suffix>
                    <span> / 人</span>
                  </template>
                </statistic-count-to>
                <!-- <a-statistic
                  title="测温中断"
                  :value="monitor.number4"
                  class="custom-statistic"
                >
                  <template #suffix>
                    <span> / 人</span>
                  </template>
                </a-statistic> -->
              </div>
              <div class="item-b">
                <a-progress
                  class="custom-progress"
                  type="circle"
                  :width="80"
                  :percent="monitor.number14"
                  strokeColor="#004898"
                />
              </div>
            </li>
            <li class="item">
              <div class="item-t">
                <statistic-count-to title="出行登记" >
                  <template #countTo>
                    <count-to  :startVal="1" :endVal="monitor.number5"></count-to>
                  </template>
                  <template #suffix>
                    <span> / 人</span>
                  </template>
                </statistic-count-to>
                <!-- <a-statistic
                  title="出行登记"
                  :value="monitor.number5"
                  class="custom-statistic"
                >
                  <template #suffix>
                    <span> / 人</span>
                  </template>
                </a-statistic> -->
              </div>
              <div class="item-b">
                <a-progress
                  class="custom-progress"
                  type="circle"
                  :width="80"
                  :percent="monitor.number15"
                  strokeColor="#004898"
                />
              </div>
            </li>
            <li class="item">
              <div class="item-t">
                <statistic-count-to title="异常出行" >
                  <template #countTo>
                    <count-to  :startVal="1" :endVal="monitor.number6"></count-to>
                  </template>
                  <template #suffix>
                    <span> / 人</span>
                  </template>
                </statistic-count-to>
                <!-- <a-statistic
                  title="异常出行"
                  :value="monitor.number6"
                  class="custom-statistic"
                >
                  <template #suffix>
                    <span> / 人</span>
                  </template>
                </a-statistic> -->
              </div>
              <div class="item-b">
                <a-progress
                  class="custom-progress"
                  type="circle"
                  :width="80"
                  :percent="monitor.number16"
                  strokeColor="#ED6E4F"
                />
              </div>
            </li>
            <li class="item">
              <div class="item-t">
                <statistic-count-to title="格子信息每日确认" >
                  <template #countTo>
                    <count-to  :startVal="1" :endVal="monitor.number7"></count-to>
                  </template>
                  <template #suffix>
                    <span> / 人</span>
                  </template>
                </statistic-count-to>
                <!-- <a-statistic
                  title="格子信息每日确认"
                  :value="monitor.number7"
                  class="custom-statistic"
                >
                  <template #suffix>
                    <span> / 人</span>
                  </template>
                </a-statistic> -->
              </div>
              <div class="item-b">
                <a-progress
                  class="custom-progress"
                  type="circle"
                  :width="80"
                  :percent="monitor.number17"
                  strokeColor="#004898"
                />
              </div>
            </li>
          </ul>
        </a-skeleton>
      </div>
    </div>
    <a-table
      :columns="columns"
      :data-source="tableData"
      :pagination="pagination"
      @change="handleTableChange"
      size="small"
      :row-key="record => record.key"
      :loading="loadings.loading"
    >
      <template
        #filterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
      >
        <div style="padding: 8px">
          <a-input
            :ref="c => (searchInput = c)"
            placeholder="请输入"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block;"
            @change="
              e => setSelectedKeys(e.target.value ? [e.target.value] : [])
            "
            @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button
            type="primary"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            筛选
          </a-button>
          <a-button
            size="small"
            style="width: 90px"
            @click="handleReset(clearFilters, column.dataIndex)"
          >
            重置
          </a-button>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  onBeforeMount,
  toRefs,
  reactive
} from 'vue'
import StatisticCountTo from '@/components/StatisticCountTo'
import CountTo from '@/components/CountTo'
import { notification } from 'ant-design-vue'
import { ReloadOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'
import * as request from '@index/apis/CovidMonitor'
import { getUuid } from '@/common/utils'
export default defineComponent({
  name: 'Home',
  components: {
    ReloadOutlined,
    StatisticCountTo,
    CountTo
  },
  setup() {
    const store = useStore()
    const settings = computed(() => {
      return store.getters['settings/device']
    })

    const state = reactive({
      searchInput: null,
      monitor: {},
      tableData: [],
      pagination: {
        current: 1,
        pageSize: 15,
        total: 0
      },
      form: {
        girdName: '',
        projectName: '',
        affiliatedUnitName: '',
        pageNum: 1,
        pageSize: 15
      },
      loadings: {
        loadinglist: false,
        btnLoading: false,
        loading: false
      }
    })
    const columns = computed(() => {
      return [
        {
          title: '格子名称',
          key: 'girdName',
          dataIndex: 'girdName',
          // 设置筛选图标是否高亮
          filtered: !!state.form.girdName,
          // 设置筛选输入框的值
          filteredValue: [state.form.girdName],
          slots: {
            filterDropdown: 'filterDropdown'
          },
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                state.searchInput.focus()
              }, 0)
            }
          }
        },
        {
          title: '格子长',
          key: 'gridLengthName',
          dataIndex: 'gridLengthName'
        },
        {
          title: '所属项目',
          key: 'projectName',
          dataIndex: 'projectName',
          filtered: !!state.form.projectName,
          filteredValue: [state.form.projectName],
          slots: {
            filterDropdown: 'filterDropdown'
          },
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                state.searchInput.focus()
              }, 0)
            }
          }
        },
        {
          title: '所属国总/区总/片区',
          key: 'affiliatedUnitName',
          dataIndex: 'affiliatedUnitName',
          filtered: !!state.form.affiliatedUnitName,
          filteredValue: [state.form.affiliatedUnitName],
          slots: {
            filterDropdown: 'filterDropdown'
          },
          onFilterDropdownVisibleChange: visible => {
            if (visible) {
              setTimeout(() => {
                state.searchInput.focus()
              }, 0)
            }
          }
        },
        {
          title: '今日是否已确认',
          key: 'voidMark',
          dataIndex: 'voidMark'
        }
      ]
    })
    const updateDashData = data => {
      state.monitor = data || {}
    }
    const updateTabeData = data => {
      state.tableData = data?.GridList?.length ? data?.GridList : []
      state.tableData?.length &&
        state.tableData.map(item => (item.key = getUuid()))
      state.pagination.total = data?.total ? data?.total : 0
    }
    const finddashFn = (resolve, reject, flag) => {
      state.loadings.loadinglist = true
      state.monitor = {}
      request
        .findAll({})
        .then(res => {
          if (flag) {
            // 单独请求不走promise all场景
            updateDashData(res?.data)
          } else {
            resolve(res)
          }
        })
        .catch(err => {
          if (flag) {
            notification['error']({
              message: '温馨提示',
              description: err.message || err?.data?.message
            })
          } else {
            reject(err)
          }
        })
        .finally(() => {
          state.loadings.loadinglist = false
        })
    }
    const getGridListFn = (resolve, reject, flag) => {
      state.loadings.loading = true
      request
        .getGridList(state.form)
        .then(res => {
          if (flag) {
            // 单独请求不走promise all场景
            updateTabeData(res?.data)
          } else {
            resolve(res)
          }
        })
        .catch(err => {
          if (flag) {
            notification['error']({
              message: '温馨提示',
              description: err.message || err?.data?.message
            })
          } else {
            reject(err)
          }
        })
        .finally(() => {
          state.loadings.loading = false
        })
    }
    // update
    const updateDateFn = () => {
      state.loadings.btnLoading = true
      state.loadings.loading = true
      request
        .updateDate({})
        .then(res => {
          res && init()
        })
        .catch(err => {
          notification['warning']({
            message: '温馨提示',
            description: err.message || '数据正在计算中，请稍后再刷新...'
          })
        })
        .finally(() => {
          state.loadings.btnLoading = false
          state.loadings.loading = false
        })
    }
    const findAllData = () => {
      const p1 = new Promise((resolve, reject) => {
        finddashFn(resolve, reject)
      })
      const p2 = new Promise((resolve, reject) => {
        getGridListFn(resolve, reject)
      })
      Promise.all([p1, p2])
        .then(resultList => {
          updateDashData(resultList[0]?.data)
          updateTabeData(resultList[1]?.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
    const init = () => {
      state.form = {
        girdName: '',
        projectName: '',
        affiliatedUnitName: '',
        pageNum: 1,
        pageSize: 15
      }
      state.pagination = {
        current: 1,
        pageSize: 15,
        total: 0
      }
      findAllData()
    }
    // 分页、排序、筛选变化时触发
    const handleTableChange = (pagination, filters) => {
      state.pagination.current = pagination.current
      state.pagination.pageSize = pagination.pageSize
      state.form.pageNum = pagination.current
      state.form.pageSize = pagination.pageSize
      Object.keys(filters).forEach(item => {
        state.form[item] = filters[item][0]
      })
      getGridListFn(null, null, true)
    }
    onBeforeMount(() => {
      init()
    })

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      // clearFormParams();
      state.form[dataIndex] = selectedKeys[0]
      // state.form.sortField = dataIndex
      confirm()
      state.form.pageNum = 1
      state.form.pageSize = 15
      state.pagination = {
        current: 1,
        pageSize: 15,
        total: 0
      }
      getGridListFn(null, null, true)
    }
    // eslint-disable-next-line no-unused-vars
    const handleReset = (clearFilters, dataIndex) => {
      clearFilters()
      state.form[dataIndex] = ''
      getGridListFn(null, null, true)
    }
    const handleFresh = () => {
      // 刷新
      updateDateFn()
    }
    // const clearFormParams = () => {
    //   // 清空form
    //   Object.keys(state.form).forEach(key => {
    //     state.form[key] = "";
    //   });
    // };

    return {
      ...toRefs(state),
      columns,
      handleTableChange,
      handleSearch,
      handleReset,
      handleFresh,
      settings
    }
  }
})
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
  &-top {
    width: 100%;
    height: 80px;
    padding: 15px 10px;
    box-shadow: 2px 2px 6px #ddd;
    &-left {
      float: left;
      height: 100%;
      overflow: hidden;
      .img {
        width: auto;
        height: 100%;
        float: left;
        img {
          display: block;
          max-height: 100%;
        }
      }
      .info {
        float: left;
        padding: 0 15px;
        color: #222;
        font-size: 14px;
        height: 100%;
        h3 {
          font-size: 18px;
          font-weight: 600;
        }
        p {
          color: #010d26;
          i {
            color: #014087;
          }
        }
      }
    }
    &-right {
      float: right;
      height: 100%;
      padding-top: 8px;
    }
  }
  &-card {
    padding-top: 20px;
    margin-bottom: 25px;
    &-title {
      font-size: 18px;
      font-weight: 600;
      line-height: 25px;
      color: #222;
      height: 40px;
    }
    &-cont {
      width: 100%;
      .list-item {
        width: 100%;
        height: 210px;
        display: flex;
        .item {
          flex: 1;
          background: #f6f7f9;
          border-radius: 8px;
          margin-left: 20px;
          &:first-child {
            margin-left: 0;
          }
          &:hover {
            box-shadow: 0px 16px 24px 0px rgba(149, 156, 182, 0.24);
            background: #fff;
            cursor: pointer;
          }
          &-t {
            height: 40%;
            box-sizing: border-box;
            font-size: 14px;
            color: #222;
            padding-top: 25px;
            .custom-statistic {
              text-align: center;
              ::v-deep(.ant-statistic-title) {
                color: #222;
              }
              ::v-deep(.ant-statistic-content) {
                color: #222;
                font-size: 26px;
                .ant-statistic-content-suffix {
                  font-size: 12px;
                }
              }
            }
          }
          &-b {
            height: 60%;
            display: flex;
            justify-content: center;
            align-items: center;
            .custom-progress {
              ::v-deep(.ant-progress-inner) {
                .ant-progress-circle {
                  &-trail {
                    stroke: #dcdfe3;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
