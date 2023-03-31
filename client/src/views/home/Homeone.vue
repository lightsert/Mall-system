<template>
    <div class="homeone">
        <Swiper :swiperData="swiperData"></Swiper>
        <Recommend :recommendData="recommendData"></Recommend>
    </div>
</template>

<script>
// 推荐下页面
import Swiper from "../../components/home/Swiper.vue";
import Recommend from "../../components/home/Recommend.vue";
export default {
    name: "Homeone",
    components: {
        Swiper,
        Recommend,
    },
    data() {
        return {
            swiperData: [],
            recommendData: [],
        };
    },
    methods: {
        getSwiperData() {
            this.$axios
                .get("/api/home/getSwiper")
                .then((result) => {
                    console.log(result.data);
                    this.swiperData = result.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getRecommendData() {
            this.$axios
                .get("/api/home/getRecommend")
                .then((result) => {
                    console.log(result.data);
                    this.recommendData = result.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    created() {
        this.getSwiperData();
        this.getRecommendData();
    },
};
</script>

<style>
</style>