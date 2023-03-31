import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 公共css文件
import './assets/css/common.css'
// 淘宝无限适配文件
import './assets/js/flexible.js'
// 字体图标css文件
import '../src/assets/css/iconfont.css'
// 引入 axios
import axios from './http/axios.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入vant
import {
  Tab, Tabs, Swipe, SwipeItem, Lazyload, Grid, GridItem, Search, Icon, Loading, Toast, Sidebar, SidebarItem, TreeSelect, Card, GoodsAction, GoodsActionIcon, GoodsActionButton, NavBar, Cell, CellGroup,Image as VanImage,Form,Field,Button,SubmitBar,Checkbox, CheckboxGroup,Stepper,Empty,Dialog,AddressList,AddressEdit,Area,RadioGroup, Radio,List   } from 'vant' 
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(Grid)
Vue.use(GridItem)
Vue.use(Search)
Vue.use(Icon)
Vue.use(Loading)
Vue.use(Toast)
Vue.use(Sidebar)
Vue.use(SidebarItem)
Vue.use(TreeSelect)
Vue.use(Card)
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(NavBar);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(VanImage);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(SubmitBar);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Stepper);
Vue.use(Empty);
Vue.use(AddressList);
Vue.use(AddressEdit);
Vue.use(Area);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(List);
Vue.use(ElementUI)

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus=this
  }
}).$mount("#app");
