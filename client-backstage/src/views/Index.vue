<template>
  <el-container style="height:100%">
    <el-header width="auto" height="70px">
      <head-nav></head-nav>
    </el-header>
  <el-container>
      <el-aside width="200px">
        <left-menu></left-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
  </el-container>
</el-container>

</template>

<script>
import HeadNav from "../components/HeadNav"
import LeftMenu from "../components/LeftMenu"


export default {
    name: 'Index',
    data() {
        return {

        }
    },
    components:{
      HeadNav,
      LeftMenu
    }
}
</script>

<style lang="less" scoped>
.el-container {
    background-color: rgb(239, 239, 239);
}

.el-header {
    background-color: black;
}

.el-main {
    padding-top: 0;
}

// 侧边栏隐藏滚动条
.el-aside {
    overflow: hidden;
}
</style>