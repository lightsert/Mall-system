<template>
    <div class="notebook">
        <img :src="bannerImg" alt="banner">
        <Like :likeData="likeData"></Like>
    </div>
</template>

<script>
import Like from '../../components/home/Like.vue'
export default {
    name:'Notebook',
    components:{
        Like
    },
    data() {
        return {
            bannerImg:'https://img0.baidu.com/it/u=1474141401,2172207722&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333',
            likeData:[]
        }
    },
    methods: {
        async gettgy(){
            let res3=await this.$axios.get('/api/home/index_list/2/data/1');
            this.likeData.shift()
            this.likeData.push(res3.data.data.result)
            // console.log(this.likeData);
        }
    },
    created() {
        this.gettgy()
    },
}
</script>

<style lang="less" scoped>
.notebook{
    img{
        width: 100%;
    }
}
</style>