<template>
    <div class="searchlist">
        <!-- 头部搜索框 -->
        <TopSearch></TopSearch>
        <section>
            <ul>
                <li
                    v-for="(i, index) in goodsList"
                    :key="index"
                    @click="
                        $router.push({
                            name: 'GoodsDetail',
                            query: { id: i.id },
                        })
                    "
                >
                    <img v-lazy="i.goodsImg" alt="" />
                    <span class="name">{{ i.goodsName }}</span>
                    <div class="price">
                        <span>￥</span>
                        <b>{{ i.goodsPrice }}</b>
                    </div>
                </li>
            </ul>
            <div v-if="goodsList.length == 0">无搜索结果</div>
        </section>
        <!-- <Tabbar></Tabbar> -->
    </div>
</template>

<script>
import TopSearch from "../../components/common/TopSearch.vue";
// import Tabbar from '../../components/common/Tabbar.vue'
import Like from "../../components/home/Like.vue";
export default {
    name: "SearchList",
    components: { TopSearch, Like },
    data() {
        return {
            goodsList: [],
        };
    },
    methods: {
        getData() {
            this.$axios
                .get("/api/home/clientGoods/shopList", {
                    params: { goodsName: this.$route.query.key },
                })
                .then((result) => {
                    console.log(result);
                    this.goodsList = result.data.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    created() {
        this.getData();
    },
    watch: {
        // 此处不监听就不能多次搜索
        $route() {
            // 如果路由发生改变，请求
            this.getData();
        },
    },
};
</script>

<style lang="less" scoped>
section {
    // width: 100%;
    padding: 0.1333rem;
    margin-bottom: 50px;
    ul {
        display: flex;
        flex-wrap: wrap;
        li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 50%;
            text-align: left;
            margin-bottom: 0.48rem;
            img {
                width: 4.6667rem;
                height: 4.6667rem;
            }
            .name {
                display: block;
                width: 100%;
                margin: 5px 0 8px 10px;
                // 文字超出省略号代替
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 0.48rem;
                color: #222;
            }
            .price {
                width: 100%;
                color: #b0352f;
                font-size: 0.5067rem;
            }
        }
    }
}
</style>