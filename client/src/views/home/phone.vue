<template>
    <div class="phone">
        <div class="img">
        <img :src="bannerImg" alt="banner">
        </div>
        <Like :likeData="likeData"></Like>
    </div>
</template>

<script>
import Like from '../../components/home/Like.vue'
export default {
    name:'Phone',
    components:{
        Like
    },
    data() {
        return {
            bannerImg:'./images/iphone.jpg',
            likeData:[]
        }
    },
    methods: {
        async getphone(){
            let res2=await this.$axios.get('/api/home/index_list/1/data/1');
            this.likeData.shift()
            this.likeData.push(res2.data.data.result)
            console.log(this.likeData);
            // console.log(this.likeData);
        },
    },
    created() {
        this.getphone()
    },
}
</script>

<style lang="less" scoped>
.phone{
    width: 100%;
    height: 100%;
    .img{
        width: 100%;
        height: 100%;

        img{
            width: 100%;
            height: 200px;
        }
    }
}
</style>