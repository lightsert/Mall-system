import Vue from "vue";
import Vuex from "vuex";
import client from './client'
import cart from './cart'
import address from './address'
import order from './order'


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    client,cart,address,order
  },
});
