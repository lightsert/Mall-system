<template>
  <div id="app">
    <!-- 要缓存的页面 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 不需缓存的页面 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
export default {
  name: 'App',
  created() {
      if(localStorage.clientToken){
         // 解析token
        const decode =jwtDecode(localStorage.clientToken)
        // console.log(decode);
        // 把token信息存入vuex
        this.$store.commit('userLogin',decode)
      }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* background-color: #f5f5f5; */
  /* overflow-x: hidden;
overflow-y: auto;
-webkit-overflow-scrolling: touch; */
  /* background-color: #f5f5f5; */
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
