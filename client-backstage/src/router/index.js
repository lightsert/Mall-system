// import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
import NotFound from "../views/404"
import login from "../views/Login"
import Home from "../views/Home"
import Goods from "../views/Goods"
import Client from "../views/Client"
import Order from "../views/Order"


const router = new VueRouter({
  mode:'history',
  routes:[
    {
      path:'/',
      redirect: "/index",
    },
    {
      path: '/index',
      name: 'index',
      component:  Index,
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home
        },
        {
          path: 'goods',
          name: 'goods',
          component: Goods
        },
        {
          path: 'client',
          name: 'client',
          component:  Client
        },
        {
          path: 'order',
          name: 'order',
          component:  Order
        }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
    },
    {
    path: '*',
    name: '404',
    component: NotFound
    },
  ]
})

//路由守卫
router.beforeEach((to,from,next)=>{
  const isLogin = localStorage.eleToken && localStorage.eleToken != undefined ? true : false
  if(to.path == "/login"){
    next()
  }else{
    isLogin ? next() : next("/login")
  }
})

router.afterEach((to, from) => {
  document.title = to.meta.title || '后台管理系统'
})

export default router
