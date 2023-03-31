<template>
    <div class="goods_detail">
        <header>
            <van-nav-bar
                title="标题"
                left-text="返回"
                right-text="主页"
                left-arrow
                @click-left="$router.back()"
                @click-right="$router.push({ path: '/home' })"
            />
        </header>
        <main>
            <!-- <img v-lazy="goodsInfo.goodsImg" alt="" width="100%"> -->
            <van-image :src="goodsInfo.goodsImg" width="100%">
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
            </van-image>
            <div class="title">
                {{ goodsInfo.goodsName }}
            </div>
            <div class="price">
                <b>￥</b>
                <span>{{ goodsInfo.goodsPrice }}</span>
                <p v-if="this.goodsInfo.goodsPrice > 100">
                    价格：￥{{ goodsInfo.goodsPrice - 30 }}
                </p>
            </div>
        </main>

        <footer>
            <van-goods-action>
                <van-goods-action-icon
                    icon="cart-o"
                    text="购物车"
                    @click="$router.push({ name: 'Cart' })"
                />
                <van-goods-action-button
                    type="warning"
                    text="加入购物车"
                    @click="addCart"
                />
            </van-goods-action>
        </footer>
    </div>
</template>

<script>
import { Toast } from "vant";
export default {
    name: "GoodsDetail",
    data() {
        return {
            id: "",
            goodsInfo: "",
        };
    },
    methods: {
        getGoodsDetail() {
            //获取商品信息
            this.$axios
                .get(`/api/cart/goodsDetail/${this.id}`)
                .then((result) => {
                    // console.log(result);
                    this.goodsInfo = result.data.goodsInfo[0];
                    // console.log(this.goodsInfo);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        addCart() {
            //加入购物车
            if (localStorage.clientToken) {
                this.$axios
                    .post("/api/buyer/addCart", {
                        goodsId: this.id,
                        token: localStorage.getItem("clientToken"),
                    })
                    .then((result) => {
                        console.log(result);
                        Toast(result.data.msg);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                this.$router.replace("/login");
            }
        },
    },
    activated() {
        //判断是否同一id,不同则重新获取新id的商品信息
        if (this.$route.query.id != this.id) {
            this.id = this.$route.query.id;
            this.getGoodsDetail();
        }
    },
    created() {
        // console.log(this.$route.params.id);
        this.id = this.$route.query.id;
        this.getGoodsDetail();
    },
};
</script>

<style lang="less" scoped>
.goods_detail {
    // background-color: #f5f5f5;
    main {
        .van-image {
            padding: 0;
            margin: 0;
        }
        div {
            padding: 0.3467rem;
        }
        .title {
            font-size: 0.5333rem;
        }
        .price {
            color: #d22531;
            b {
                font-size: 0.4533rem;
            }
            span {
                font-size: 0.8rem;
            }
            p {
                color: #777;
                font-size: 0.4rem;
                text-decoration: line-through;
            }
        }
    }
}
</style>