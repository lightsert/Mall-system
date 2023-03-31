<template>
  <div class="search-index">
    <!-- 头部搜索框 -->
    <TopSearch></TopSearch>
    <!-- 中间历史搜索 -->
    <section class="history" v-if="history.length>0">
        <b><van-icon name="underway-o" /></b>
        <div class="his">
          <h2>历史搜索</h2>
          <h2 class="clearhis" @click="clearHistory">清空历史记录</h2>
        </div>
        
        <ul>
          <li v-for="(item,index) in history" :key="index" @click="clickHistory(item)">{{item}}</li>
        </ul>
    </section>
    <div v-else>
      <h4>暂无搜索记录</h4>
    </div>
    <!-- 底部 -->
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '../../components/common/Tabbar.vue'
import TopSearch from '../../components/common/TopSearch.vue'
export default {
    name:'SearchIndex',
    components:{Tabbar,TopSearch},
    data() {
      return {
        history:[],
      }
    },
    methods: {
      clearHistory(){
        localStorage.setItem('history','[]')
        this.history=[]
      },
      clickHistory(item){
            if(item.length){
              // 跳转
            this.$router.push({name:'searchList',
              query:{
                  key:item
            }})
            }
            
      }
    },
    created(){
        this.history=JSON.parse(localStorage.getItem('history'))||[]
    }
}
</script>

<style lang="less" scoped>
.history{
  padding: .4rem;
  b{
    float: left;
    font-size: .48rem;
    color: #b0352f;
  }
  .his{
    display: flex;
    justify-content: space-between;
    .claerhis{
        cursor: pointer;
    }
  }
  h2{
    font-size: .4267rem;
    font-weight: 400;
  }
  ul li{
    display: inline-block;
    padding: 5px;
    border: 1px solid #ccc;
    margin: 5px;
    font-size: .4267rem;
  }
}
</style>