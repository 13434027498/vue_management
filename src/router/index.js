import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import _401 from '../views/401.vue'
import AttachMents from '../components/system_management/attachments/AttachMents.vue'
import Department from '../components/system_management/department/Department.vue'
import Roles from "../components/system_management/roles/Roles"
import Users from '../components/system_management/users/Users.vue'
import RoleMenus from "../components//system_management/rolemenu/roleMenus.vue"
import PublishStocks from "../components/business_management/publishstocks/publishStocks.vue";
import AddStocks from "../components/business_management/addstocks/addStocks.vue"
import InStocks from "../components/business_management/material_management/instocks/inStocks.vue";
import Products from "../components/business_management/material_management/products/Products.vue";
import ProductCategorys from "../components/business_management/material_management/productcategorys/productCategorys.vue"
import OutStocks from "../components/business_management/material_management/outstocks/outStocks.vue"
import Stocks from "../components/business_management/material_management/stocks/Stocks.vue";
import MaterialTo from "../components/business_management/material_flow/materialto/materialTo.vue";
import MaterialFrom from "../components/business_management/material_flow/materialfrom/materialFrom.vue";

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
    redirect: '/welcome',
    meta: { title: '首页' },
    children: [
      // 系统管理
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/401',
        component: _401
      },
      {
        path: '/attachments',
        component: AttachMents
      },
      {
        path: '/departments',
        component: Department
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/users',
        component: Users
      },
      {
        path: '/menus',
        component: RoleMenus
      },
      // 业务管理
      {
        path: '/OutStocks/publishStocks',
        component: PublishStocks
      },
      {
        path: '/inStocks/addStocks',
        component: AddStocks
      },
      {
        path: '/inStocks',
        component: InStocks
      },
      {
        path: '/products',
        component: Products
      },
      {
        path: '/productCategorys',
        component: ProductCategorys
      },
      {
        path: '/outStocks',
        component: OutStocks
      },
      {
        path: '/stocks',
        component: Stocks
      },
      {
        path: '/consumers',
        component: MaterialTo
      },
      {
        path: '/suppliers',
        component: MaterialFrom
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
    if (!token) {
      return next();
    } else {
      return next({ path: '/home' })
    }
  }

  if (to.path == '/401') {
    return next();
  }

  if (!token) {
    return next('/login');
  } else {
    //判断是否有访问该路径的权限
    const urls = store.state.userInfo.url;
    //如果是管理员
    if (store.state.userInfo.isAdmin) {
      return next();
    } else {
      if (urls.indexOf(to.path) > -1) {
        //则包含该元素
        window.sessionStorage.setItem("activePath", to.path);
        return next();
      } else {
        return next("/401");
      }
    }
  }
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
