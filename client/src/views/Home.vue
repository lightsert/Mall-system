<template>
    <div class="home">
        <!-- 头部搜索框 -->
        <Header></Header>
        <!-- 标签栏 -->
        <van-tabs
            @click="handleTab"
            v-model="active"
            type="line"
            color="#b0352f"
            line-height="0.0533rem"
            lazy-render
            title-active-color="#b0352f"
            animated
            sticky
            offset-top="44px"
        >
            <van-tab
                v-for="(item, index) in tabsData"
                :key="index"
                :title="item.title"
                :to="item.path"
            >
                <section>
                    <!-- 标签栏下页面 -->
                    <!-- <keep-alive> -->
                    <router-view></router-view>
                    <!-- </keep-alive> -->
                </section>
            </van-tab>
        </van-tabs>
        <!-- 底部tabbar导航 -->
        <Tabbar></Tabbar>
    </div>
</template>

<script>
// 底部tabbar 顶部header
import Tabbar from "../components/common/Tabbar.vue";
import Header from "../components/home/Header.vue";

export default {
    name: "Home",
    components: {
        Tabbar,
        Header,
    },
    data() {
        return {
            active: 0,
            tabsData: [],
        };
    },
    methods: {
        handleTab(name, title) {
            console.log(name, title);
        },
        getTopbarData() {
            this.$axios
                .get("/api/home/getTabs")
                .then((result) => {
                    console.log(result.data);
                    this.tabsData = result.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    created() {
        this.getTopbarData();
    },
};
</script>

<style lang="less" scoped>
.home {
    // width: 100vw;
    .van-tabs {
        // 这里不能固定定位，会不能下滑页面
        // position: fixed;
        // top: 45px;
        // left: 0;
        // height: 44px;
        width: 100%;
        // height: 1.1733rem;
        margin-top: 1.1733rem;
        margin-bottom: 1.3333rem;
        .van-tab {
        }
        .van-tabs__wrap {
        }
    }
    .van-tabs__content {
        width: 100%;
        height: 100%;
    }
}
</style>