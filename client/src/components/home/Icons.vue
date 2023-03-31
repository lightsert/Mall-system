<template>
  <div class="icons">
        <van-grid :column-num="5" icon-size="40px">
            <van-grid-item v-for="(item,index) in iconsData" :key="index" :icon="item.iconUrl" :text="item.title"/>
        </van-grid>
  </div>
</template>

<script>
export default {
    name:'Icons',
    data() {
        return {
            iconsData:[
                {id:1,title:'自饮茶',iconUrl:'./images/icons1.png'},
                {id:2,title:'品牌茶',iconUrl:'./images/icons2.png'},
                {id:3,title:'茶具',iconUrl:'./images/icons3.png'},
                {id:4,title:'领福利',iconUrl:'./images/icons4.png'},
                {id:5,title:'官方验证',iconUrl:'./images/icons5.png'}
            ]
        }
    },
}
</script>

<style lang="less" scoped>

</style>