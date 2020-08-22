import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(ElementUI)

// 线上的API接口
axios.defaults.baseURL = "https://www.zykhome.club/api/"
axios.defaults.timeout = 10000

// axios.defaults.baseURL = 'http://www.localhost:8081/'

/**
 *  axios请求拦截器
 */
axios.interceptors.request.use(config => {
  // NProgress.start() // 设置加载进度条(开始..)
  config.headers.Authorization = window.localStorage.getItem('JWT_TOKEN');
  return config;
},
  error => {
  return Promise.reject(error)
  });


/**
 * axios响应拦截器
 */
axios.interceptors.response.use(
  function (response) {
    // NProgress.done() // 设置加载进度条(结束..)
    if (response.data.code == 4001) {//如果返回的code==4001说明token错误或者token过期
      window.localStorage.clear();
      // var vm=new Vue();
      // vm.$message.error("您的登入状态已失效,请您重新登入~")
      return router.push("/login");
    }else {
      return response;
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
