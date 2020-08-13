import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import _401 from '../components/401.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta:{title: '首页'},
      children: [
        {
          path: '/welcome',
          component: Welcome
        },
        {
          path: '/401',
          component: _401
        }
      ]
    }
  ]

  const router = new VueRouter({
    routes,
    mode: 'history',
    base: process.env.BASE_URL
  })

// 路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转过来
  // next next()放行  next('/login') 强制跳转
 
const token = window.localStorage.getItem('JWT_TOKEN');
  if (to.path === '/login') {
    if(!token){
      return next();
    }else{
      return next({path: '/home'})
    }
  }

  if(to.path=='/401'){
    return next();
  }

  if (!token) {
    return next('/login');
  }else {
    //判断是否有访问该路径的权限
    const urls = store.state.userInfo.url;
    //如果是管理员
    if(store.state.userInfo.isAdmin){
      return next();
    }else{
      if(urls.indexOf(to.path) > -1){
        //则包含该元素
        window.sessionStorage.setItem("activePath", to.path);
        return next();
      }else{
        return next("/401");
      }
    }
  }
})

export default router
