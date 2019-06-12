import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Welcome from '@/views/welcome.vue'
import User from '@/views/user/User.vue'
import Right from '@/views/rights/right.vue'
import Roles from '@/views/rights/roles.vue'
import Categories from '@/views/goods/categories.vue'
import Goods from '@/views/goods/goods.vue'
import List from '@/views/goods/list.vue'
import Params from '@/views/goods/params.vue'
import Add from '@/views/goods/add.vue'

Vue.use(VueRouter)
// 暴露路由
export const router = new VueRouter({
  routes: [
    // 重定向
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home',
      redirect: { name: 'Welcome' }, // 如果进入home，则跳转到欢迎页面
      component: Home,
      name: 'Home',
      children: [
        { path: 'welcome', component: Welcome, name: 'Welcome' },
        { path: 'users', component: User, name: 'User' },
        { path: 'rights', component: Right, name: 'Right' },
        { path: 'roles', component: Roles, name: 'Roles' },
        { path: 'goods',
          component: Goods,
          name: 'Goods',
          redirect: { name: 'List' },
          children: [
            { path: 'list', component: List, name: 'List' },
            { path: 'add', component: Add, name: 'Add' }
          ] },
        { path: 'categories', component: Categories, name: 'Categories' },
        { path: 'params', component: Params, name: 'Params' }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  var token = localStorage.getItem('itcastpro_token')
  if (token) {
    next()
  } else {
    if (to.path !== '/login') {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})
