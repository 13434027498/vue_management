import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || {},
    // token: '' || localStorage.getItem('JWT_TOKEN')
    token: ''
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo
    }
  },
  mutations: {
    setUserInfo(state, userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo)) //数据保存到localstorage
      state.userInfo = userInfo
    },
    setToken(state){
      state.token = localStorage.getItem('JWT_TOKEN')
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store
