<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
export default {
  name: 'App',
  created() {
      if(localStorage.adminToken){
         // 解析token
        const decode =jwtDecode(localStorage.adminToken)
        // console.log(decode);
        // 把token信息存入vuex
        // this.$store.commit('setAuth',!this.isEmpty(decode)) //没用到
        this.$store.commit('setUser',decode)
      }
  },
  methods: {
        isEmpty(value){ //判断是否为空
            return (
                value === undefined || value ===null||(typeof value ==='object' && Object.keys(value).length===0)
                || (typeof value==='string' && value.trim().length===0)
            )
        }
    }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh
}

* {
  padding: 0;
  margin: 0;
}
</style>
