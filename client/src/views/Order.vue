<template>
    <div class="order">
        <LoginHeader><h2>提交订单</h2></LoginHeader>
        <main>
            <div class="address">
                <h3>收货信息：</h3>
                <div class="addressInfo">
                    <div class="address_top">
                        <span>{{ path.name }}</span>
                        <span>{{ path.tel }}</span>
                    </div>
                    <div class="address_bottom">
                        <span>{{ path.province }}</span>
                        <span>{{ path.city }}</span>
                        <span>{{ path.county }}</span>
                    </div>
                    <van-icon
                        name="arrow"
                        @click="
                            $router.push({
                                name: 'AddressList',
                                query: { type: 'selected' },
                            })
                        "
                    />
                </div>
            </div>
            <h3>支付方式：</h3>
            <div class="pay">
                <van-radio-group v-model="radio">
                    <van-radio name="zfb" shape="square">支付宝</van-radio>
                    <van-radio name="w x" shape="square">微信</van-radio>
                </van-radio-group>
            </div>
            <!-- <h3>订单号：{{ orderNo }}</h3> -->
            <div class="goods">
                <ul>
                    <li v-for="(item, index) in goodsInfo" :key="index">
                        <van-card
                            :num="item.goodsNum"
                            :price="item.goodsPrice"
                            :title="item.goodsName"
                            :thumb="item.goodsImg"
                        />
                    </li>
                </ul>
            </div>
        </main>
        <footer>
            <van-submit-bar
                :price="total"
                button-text="去支付"
                @submit="onSubmit()"
                button-color="#b0352f"
            >
            </van-submit-bar>
        </footer>
    </div>
</template>

<script>
import LoginHeader from "../components/common/LoginHeader.vue";
import { Dialog } from "vant";
import { mapState, mapGetters } from "vuex";
import qs from "qs";
export default {
    name: "Order",
    components: { LoginHeader },
    data() {
        return {
            radio: "zfb", //单选框默认选中支付宝
            path: {}, //地址信息
            goodsInfo: [], //选中的商品信息
            total: 0, //总价
        };
    },
    computed: {
        ...mapGetters(["defaultAddress", "selectCart"]),
        ...mapState({
            // orderNo:state=>state.order.orderNo,
            cartList: (state) =>
                state.cart.cartList.filter((v) => v.checked == true),
            selectedAddress: (state) => state.address.selectedAddress,
        }),
    },
    methods: {
        onSubmit() {
            //去支付
            // 发送请求生成一个订单，删除购物车中选中的数据
            this.$axios
                .post("/api/order/createOrder", { goodsInfo: this.goodsInfo,token:localStorage.getItem('clientToken')})
                .then((result) => {
                    // console.log(result.data);
                    if (!result.data.sussess) return;
                    // 订单号保存到vuex,并把订单号存到本地
                    this.$store.commit("setOrderNo", result.data.orderNo);

                    // 请求支付
                    if (localStorage.orderNo) {
                        let payData = {
                            orderNo: localStorage.orderNo,
                            goodsName: "",
                            total: this.total / 100,
                        };
                        this.goodsInfo.forEach((v) => {
                            payData.goodsName += v.goodsName + " ";
                        });
                        //请求支付接口
                        this.$axios({
                            url: "/api/order/payment",
                            method: "post",
                            headers: {
                                "Content-Type":
                                    "application/x-www-form-urlencoded",
                            },
                            // qs是增加安全性的序列化
                            data: qs.stringify(payData),
                        }).then((res) => {
                            //返回url链接
                            if (res.data.data.success) {
                                // 打开支付宝支付页面
                                window.location.href = res.data.data.paymentUrl;
                            }
                            console.log(res);
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        /* getOrderInfo(){
            this.$axios.post('/api/order/selectOrder',{orderNo:this.orderNo})
            .then(res => {
                let result=res.data.data[0]
                console.log(result);
                this.total=result.goodsTotal*100 //取得总价
            })
            .catch(err => {
                console.error(err); 
            })
        }, */
        getAddressData() {
            //获取地址
            this.$axios
                .post("/api/buyer/getAddress", {
                    token: localStorage.getItem("clientToken"),
                })
                .then((result) => {
                    // console.log(result.data);
                    this.$store.commit("setAddressList", result.data);
                    if (this.defaultAddress.length) {
                        this.path = this.defaultAddress[0];
                    } else {
                        Dialog({
                            message: "您还未填写收货地址，请去添加",
                        }).then(() => {
                            this.$router.push({ name: "AddressList" });
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    created() {
        this.getAddressData(); //获取地址信息
        // this.getOrderInfo(); //获取订单信息
    },
    activated() {
        //激活时
        this.$bus.$on("addressSelected", (data) => {
            this.path = data;
        });
        // this.path = this.selectedAddress;
        this.goodsInfo = JSON.parse(this.$route.query.goodsInfo); //选中的商品
        this.total = JSON.parse(this.$route.query.total);
        console.log(this.goodsInfo);

        // this.getOrderInfo(); //获取订单信息
    },
};
</script>

<style lang="less" scoped>
.order {
    margin-bottom: 50px;
    h3 {
        font-size: 0.5333rem;
        padding: 0.2667rem 0.5333rem;
    }
    .address {
        .addressInfo {
            position: relative;
            padding: 0.1333rem 0.5333rem;
            background: rgb(247, 247, 247);
            span {
                padding-right: 10px;
                font-size: 0.4267rem;
            }
        }
        .van-icon {
            position: absolute;
            top: 50%;
            right: 3%;
            transform: translateY(-50%);
        }
    }
    .pay {
        padding: 0.1333rem 0.5333rem;
        background: rgb(247, 247, 247);
        .van-radio-group {
            display: flex;
            .van-radio {
                margin-right: 0.4rem;
                font-size: 0.48rem;
            }
        }
    }
    .goods {
        margin-top: 0.4rem;
        li {
            margin-top: 0.1333rem;
        }
    }
}
</style>