<template>
  <div class="tabbar">
      <ul>
          <li v-for="(item,index) in tabbarData" :key="index">
              <img :src="item.path===$route.path?item.selected:item.active" @click="ClickTab(item)">
              <span :class="item.path===$route.path?'font_actived':''">{{item.name}}</span>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    name:'Tabbar',
    data() {
        return {
            tabbarData:[
                {
                    name:'首页',path:'/home',
                    active:'./images/home.png', //这里的路径是public下的
                    selected:'./images/home-select.png' //被选中时
                },
                {
                    name:'分类',path:'/category',
                    active:'./images/list.png',
                    selected:'./images/list-select.png' 
                },
                {
                    name:'购物车',path:'/cart',
                    active:'./images/cart.png',
                    selected:'./images/cart-select.png' 
                },
                {
                    name:'我的',path:'/my',
                    active:'./images/my.png',
                    selected:'./images/my-select.png'
                }
            ],
        }
    },
    methods: {
        ClickTab(item){
            if(this.$route.path===item.path) return  //如果点击的是跟当前页面相同，不执行
            this.$router.replace(item.path) //对应跳转页面,一级不允许返回 用replace最好
        }
    },
}
</script>

<style lang="less" scoped>
.tabbar{
    position: fixed;
    left: 0;
    bottom: 0;
    // height: 10%;
    height: 1.3333rem;
    width: 100%;
    font-size: .3467rem;
    background-color: #fff;
    ul{
        display: flex;
        justify-content: space-around;
        align-items: center;
        li{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            img{
                width: .8267rem;
                height: .8267rem;
            }
            .font_actived{
                color: #d81e06;
            }
        }
    }
}
</style>