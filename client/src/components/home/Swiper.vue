<template>
  <div class="swiper">
    <van-swipe :autoplay="3000" indicator-color="#b0352f">
        <!-- v-s-item是每个卡片 -->
        <van-swipe-item v-for="(image, index) in swiperData" :key="index">
            <img v-lazy="image.imgUrl" />
        </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
    name:'Swiper',
    props:{swiperData:Array},
    data() {
        return {
            // swiperData:[
            //     {id:1,imgUrl:'./images/swiper1.jpeg'},
            //     {id:2,imgUrl:'./images/swiper2.jpeg'},
            //     {id:3,imgUrl:'./images/swiper3.jpeg'}
            // ]
        }
    },
}
</script>

<style lang="less" scoped>
.swiper{
    width: 10rem;
    height: 4.9333rem;
    img{
        width: 10rem;
        height: 4.9333rem;
    }
}
</style>