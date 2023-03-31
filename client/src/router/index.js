import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from '../store/index'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect:'/home'
  },
  {
    path: "/home",
    // name: "Home",
    component: Home,
    children: [
      {
        path: '/',
        component: () => import('../views/home/Homeone.vue')
      },
      {
          path: '/phone',
          name: 'phone',
          component:()=>import('../views/home/phone.vue')
      },
      {
        path: '/notebook',
        name: 'notebook',
        component:()=>import('../views/home/notebook.vue')
      },
      {
        path: '/drink',
        name: 'drink',
        component:()=>import('../views/home/drink.vue')
      },
      {
        path: '/fruits',
        name: 'fruits',
        component:()=>import('../views/home/fruits.vue')
      },
      {
        path: '/furniture',
        name: 'furniture',
        component:()=>import('../views/home/furniture.vue')
      },
    ]
  },
  {
    path: '/search',
    // name: 'search',
    component: () => import('../views/Search.vue'),
    children: [
      {
        path: '/',
        name: 'searchIndex',
        component: () => import('../views/search/SearchIndex.vue')
      },
      {
        path: 'searchList',
        name: 'searchList',
        component: () => import('../views/search/SearchList.vue'),
      }
    ]
  },
  {
    path: "/category",
    name: "Category",
    meta:{keepAlive:true},
    component: () =>
      import("../views/Category.vue"),
  },
  {
    path: "/goodsDetail",
    name: "GoodsDetail",
    meta:{keepAlive:true},
    component: () =>
      import("../views/GoodsDetail.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () =>
      import("../views/Cart.vue"),
  },
  {
    path: "/my",
    name: "My",
    component: () =>
      import("../views/My.vue"),
  },
  {
    path: "/personal",
    name: "Personal",
    component: () =>
      import("../views/Personal.vue"),
  },
  {
    path: "/editinfo",
    name: "Editinfo",
    component: () =>
      import("../views/Editinfo.vue"),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/login/Register.vue')
  },
  {//地址管理
    path: '/address',
    component: () => import('../views/Address.vue'),
    children: [
      {
        path: '/',
        name: 'AddressList',
        component: () => import('../views/address/AddressList.vue')
      },
      {
        path: 'addressEdit',
        name: 'AddressEdit',
        component: () => import('../views/address/AddressEdit.vue')
      }
    ]
  },
  { //查看我的订单
    path: "/myOrder",
    name: "MyOrder",
    component: () =>
      import("../views/MyOrder.vue"),
  },
  { //结算页
    path: "/order",
    name: "Order",
    meta:{keepAlive:true},
    component: () =>
      import("../views/Order.vue"),
  },
  { //支付成功或失败页
    path: "/payment",
    name: "Payment",
    component: () =>
      import("../views/Payment.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 路由守卫 验证是否登录     报错是版本问题，可上网搜索解决
router.beforeEach((to, from, next) => {
  const lanjieRoute =['Payment','Order','AddressList','AddressEdit','MyOrder','Personal']
  const isLogin = store.state.client.loginStatus
  // console.log(isLogin,store.state.client);
  if ( lanjieRoute.indexOf(to.name)>=0) {
    isLogin ? next() : next('/login')
  } else {
    return next()
  }
})


export default router;
