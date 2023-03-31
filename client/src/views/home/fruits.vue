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
    name:'Fruits',
    components:{
        Like
    },
    data() {
        return {
            bannerImg:'https://img0.baidu.com/it/u=3666045119,3853971316&fm=253&fmt=auto&app=138&f=JPEG?w=751&h=500',
            likeData:[]
        }
    },
    methods: {
        async fruits(){
            let res2=await this.$axios.get('/api/home/index_list/5/data/1');
            this.likeData.shift()
            this.likeData.push(res2.data.data.result)
            console.log(this.likeData);
            // console.log(this.likeData);
        },
    },
    created() {
        this.fruits()
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