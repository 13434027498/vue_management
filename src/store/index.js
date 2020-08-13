import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo:JSON.parse(localStorage.getItem("userInfo")) || {}
  },
  mutations: {
    setUserInfo(state,userInfo) {
      localStorage.setItem("userInfo",JSON.stringify(userInfo)) //数据保存到localstorage
      state.userInfo = userInfo
    }
  },
  actions: {
  },
  modules: {
  }
})
