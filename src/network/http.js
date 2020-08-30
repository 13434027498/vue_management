// 引入axios
import axios from 'axios';
// 导入vuex,因为我们要使用到里面的状态对象
// import store from '@/store/index';
import router from '@/router/index';
import { Message } from 'element-ui'
// import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到

// axios.defaults.baseURL = "https://www.zykhome.club/api/";
// axios.defaults.timeout = 10000;

// /**
//  *  axios请求拦截器
//  */
// axios.interceptors.request.use(config => {
//   const token = store.state.token;
//   token && (config.headers.Authorization = token);
//   return config;
// },
//   error => {
//     console.log(error);
//     return Promise.reject(error)
//   });

// /**
//  * axios响应拦截器
//  */
// axios.interceptors.response.use(
//   response => {
//     if (response.status === 200) {
//       if (response.data.code === 4001) {
//         localStorage.clear()
//         return router.push("/login")
//       }
//       return Promise.resolve(response);
//     } else {
//       return Promise.reject(response);
//     }
//   },
//   error => {
//     if (error.response.status) {
//       switch (error.response.status) {
//         case 401:
//           router.replace({
//             path: '/login',
//             query: {
//               redirect: router.currentRoute.fullPath
//             }
//           });
//           break;

//         case 403:
//           Message({
//             message: res.message || '登录过期',
//             type: 'error',
//             duration: 5 * 1000
//           })
//           // 清除token
//           localStorage.removeItem('JWT_TOKEN');
//           // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
//           setTimeout(() => {
//             router.replace({
//               path: '/login',
//               query: {
//                 redirect: router.currentRoute.fullPath
//               }
//             });
//           }, 1000);
//           break;

//         // 404请求不存在
//         case 404:
//           Message({
//             message: res.message || '网络请求不存在',
//             type: 'error',
//             duration: 5 * 1000
//           })
//           break;
//         // 其他错误，直接抛出错误提示
//         default:
//           Message({
//             message: error.response.data.message,
//             type: error
//           })
//       }
//       return Promise.reject(error.response);
//     }
//   }
// );

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    baseURL: 'https://www.zykhome.club/api/',
    timeout: 10000
  })

  // 2.axios的拦截器
  // 2.1 axios请求拦截
  instance.interceptors.request.use(config => {
    config.headers.Authorization = localStorage.getItem('JWT_TOKEN')
    return config;
  },
    error => {
      console.log(error);
      return Promise.error(error);
    });

  // 2.2 axios响应拦截
  instance.interceptors.response.use(response => {
    if (response.status === 200) {
      console.log(response);
      const code = response.data.code;
      if (code !== 200) {
        if (code === 4001) {
          Message({
            message: response.data.msg,
            type: 'error'
          })
          localStorage.clear()
          return router.push("/login")
        }else {
          Message({
            message: response.data.msg,
            type: 'error'
          })
        }
      }

      return response.data;
    } else {
      console.log(response);
      return Promise.reject(new Error(response.data.msg || 'Error'));
    }
  }), error => {
    console.log(error.response);
    return Promise.reject(error.response.data.msg);
  }
  return instance(config)
}