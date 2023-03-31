<template>
    <div class="cart">
        <header>
            <van-icon name="arrow-left" @click="$router.replace('/home')" />
            <h2>购物车</h2>
            <div
                class="edit"
                v-if="cartList.length"
                @click="isEdit = !isEdit"
                v-text="isEdit ? '完成' : '编辑'"
            ></div>
            <div
                class="edit"
                v-else
                v-text="'\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0'"
            ></div>
        </header>
        <main>
            <ul v-if="cartList.length">
                <li v-for="(item, index) in cartList" :key="index">
                    <div class="goodsList">
                        <div class="left">
                            <van-checkbox
                                v-model="item.checked"
                                @change="isChecked($event, index)"
                                checked-color="#b0352f"
                            ></van-checkbox>
                            <img :src="item.goodsImg" alt="" />
                        </div>
                        <div class="text">
                            <a>{{ item.goodsName }}</a>
                            <span>￥{{ item.goodsPrice }}</span>
                        </div>
                        <div class="right">
                            <van-icon
                                name="delete-o"
                                @click="cartDelete(item)"
                            />
                            <van-stepper
                                v-model="item.goodsNum"
                                theme="round"
                                button-size="22"
                                disable-input
                                @change="changNum($event, item)"
                            />
                        </div>
                    </div>
                </li>
            </ul>
            <van-empty description="购物车是空的" v-else />
        </main>
        <footer v-if="cartList.length">
            <van-submit-bar
                v-if="isEdit == false"
                :price="total"
                button-text="结算"
                @submit="onSubmit(cartList)"
                button-color="#b0352f"
            >
                <van-checkbox v-model="isAll" checked-color="#b0352f"
                    >全选</van-checkbox
                >
            </van-submit-bar>
            <van-submit-bar
                v-else
                :price="total"
                button-text="删除"
                @submit="cartMoreDelete(cartList)"
                button-color="#b0352f"
            >
                <van-checkbox v-model="isAll" checked-color="#b0352f"
                    >全选</van-checkbox
                >
            </van-submit-bar>
        </footer>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import jwtDecode from "jwt-decode";
import Tabbar from "../components/common/Tabbar.vue";
import { Dialog, Toast } from "vant";
export default {
    name: "Cart",
    components: {
        Tabbar,
    },
    data() {
        return {
            // cartList:'',
            checked: "",
            isEdit: false, //是否进入编辑状态
        };
    },
    computed: {
        ...mapState({
            //本页数据是vuex给的，修改去vuex操作
            cartList: (state) => state.cart.cartList,
        }),
        ...mapGetters(["total"]),
        // 是否全选
        isAll: {
            get() {
                return (
                    this.cartList.length ===
                        this.cartList.filter((v) => v.checked == true).length &&
                    this.cartList.length > 0
                );
            },
            set(value) {
                this.$store.commit("allChecked", value);
            },
        },
    },
    methods: {
        onSubmit(cartList) {
            //去结算
            const checkedGoods = cartList.filter((v) => v.checked); //选中的商品数组
            if (checkedGoods.length <= 0) {
                Toast("至少选中一件商品");
                return;
            }
            // // 发送请求生成一个订单
            // this.$axios
            //     .post("/api/order/createOrder", { goodsInfo: checkedGoods })
            //     .then((result) => {
            //         // console.log(result.data);
            //         if (!result.data.sussess) return;
            //         // 订单号保存到vuex,并把订单号存到本地
            //         this.$store.commit("setOrderNo", result.data.orderNo);
            // 跳转到订单页
            this.$router.push({
                name: "Order",
                query: {
                    goodsInfo: JSON.stringify(checkedGoods),
                    total: JSON.stringify(this.total),
                },
            });
            // })
            // .catch((err) => {
            //     console.log(err);
            // });
        },
        getData() {
            //请求用户标识得到商品数据,存入vuex
            if (localStorage.clientToken) {
                // 解析token
                const decode = jwtDecode(localStorage.clientToken);
                const { phone } = decode;
                this.$axios
                    .post("/api/buyer/userCart", { phone })
                    .then((result) => {
                        // 前端给返回的数据加上checked属性,用于判断是否选中,正常来说该属性要请求获得,选中会请求一下
                        result.data.forEach((val) => {
                            val["checked"] = false;
                        });
                        console.log(result);
                        this.$store.commit("setCartList", result.data); //存入vuex
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        isChecked(e, index) {
            //单个商品选中(e是选中状态，index为cartList下标)
            // console.log(e,index);
            this.$store.commit("isChecked", { e, index });
        },
        cartDelete(goodsInfo) {
            //删除单个商品
            // console.log(goodsInfo);
            const { id } = goodsInfo;
            Dialog.confirm({ message: "是否删除" }).then((result) => {
                this.$axios
                    .post("/api/buyer/cartDelete", { id: [id] })
                    .then((result) => {
                        Toast.success("删除成功");
                        setTimeout(this.getData, 500);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
        }, //视频中用的是vuex处理删除操作,且单/多选删除是一个方法
        cartMoreDelete(goodsInfo) {
            //批量删除商品
            // console.log(goodsInfo);
            const re = goodsInfo.filter((v) => v.checked == true); //过滤 返回被选中的
            if (re.length) {
                //有商品选中
                const idArr = [];
                for (let i = 0; i < re.length; i++) {
                    idArr.push(re[i].id);
                }
                Dialog.confirm({ message: "是否删除" }).then((result) => {
                    this.$axios
                        .post("/api/buyer/cartMoreDelete", { idArr })
                        .then((result) => {
                            Toast.success("删除成功");
                            setTimeout(this.getData, 500);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                });
            } else {
                Toast("请选择商品");
            }
        },
        changNum(value, goodsInfo) {
            // console.log(value, goodsInfo);
            this.$store.dispatch("changNum", [value, goodsInfo.id]);
        },
    },
    created() {
        this.getData();
    },
};
</script>

<style lang="less" scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1.1733rem;
    background-color: #b0352f;
    color: #fff;
    h2 {
        flex: 10;
        font-size: 0.4267rem;
        font-weight: 400;
        text-align: center;
    }
    .van-icon {
        // flex: 0;
        display: block;
        margin: 0 auto;
        width: 44px;
        text-align: center;
        font-size: 0.5333rem;
    }
    .edit {
        display: block;
        height: 100%;
        line-height: 1.1733rem;
        text-align: center;
        font-size: 0.4267rem;
        margin-right: 0.1333rem;
        cursor: pointer;
    }
}

main {
    margin-bottom: 50px;
    .goodsList {
        display: flex;
        box-sizing: border-box;
        justify-content: center;
        width: 100%;
        padding: 0.1333rem;
        margin: 0.4rem 0;
        border-top: 1px solid rgb(219, 219, 219);
        background: #fff;
        .left {
            flex: 1;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .van-checkbox {
                // flex: 1;
            }
            img {
                // flex: 1;
                height: 1.9733rem;
                width: 1.9733rem;
                border: 1px solid rgb(240, 240, 240);
            }
        }
        .text {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: 0.4267rem;
            a {
                width: 4.2667rem;
                overflow: hidden;
                white-space: pre-wrap;
                text-overflow: ellipsis;
            }
            span {
                color: #b0352f;
            }
        }
        .right {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-end;
        }
    }
}
</style>