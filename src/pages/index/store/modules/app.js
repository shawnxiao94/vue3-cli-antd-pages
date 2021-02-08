/*
 * @Author: shawnxiao
 * @Date: 2021-02-01 16:40:41
 * @LastEditTime: 2021-02-08 10:03:20
 * @FilePath: /vue3-cli-antd-pages/src/pages/index/store/modules/settings.js
 */
const state = () => ({
  device: 'desktop'
  // language: language || i18n,
})

const getters = {
  collapse: state => state.collapse,
  device: state => state.device,
  language: state => state.language
}

const mutations = {
  toggleCollapse(state) {
    state.collapse = !state.collapse
    localStorage.setItem(
      'vue-admin-beautiful-pro-collapse',
      `{"collapse":${state.collapse}}`
    )
  },
  toggleDevice(state, device) {
    state.device = device
  }
}

const actions = {
  toggleCollapse({ commit }) {
    commit('toggleCollapse')
  },
  toggleDevice({ commit }, device) {
    commit('toggleDevice', device)
  }
}

export default { state, getters, mutations, actions }
