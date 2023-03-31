<template>
    <div class="myOrder">
        <LoginHeader><h2>我的订单</h2></LoginHeader>
        <div class="orderList">
            <ul>
                <li v-for="(item, index) in list" :key="index">
                    <div class="order">
                        <div class="top">订单号：{{ item.orderNo }}</div>
                        <div class="content">
                            <div class="title">{{ item.goodsName }}</div>
                            <div class="num">共{{ item.goodsNum }}件</div>
                        </div>

                        <div class="isPay">
                            <div class="total">总价：{{ item.goodsTotal }}</div>
                            <div class="status">
                                订单状态:{{ item.orderStatus }}
                            </div>
                            <van-button
                                v-if="item.orderStatus == '待支付'"
                                type="danger"
                                @click="goPay(item)"
                                >去支付</van-button
                            >
                            <van-button v-else disabled>待发货</van-button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import LoginHeader from "../components/common/LoginHeader.vue";
import qs from "qs";
export default {
    name: "MyOrder",
    components: { LoginHeader },
    data() {
        return {
            list: "",
        };
    },
    methods: {
        goPay(item) {
            let payData = {
                orderNo: item.orderNo,
                goodsName: item.goodsName,
                total: item.goodsTotal,
            };
            //请求支付接口
            this.$axios({
                url: "/api/order/payment",
                method: "post",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
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
        },
        getData() {
            //获取订单列表
            this.$axios
                .post("/api/order/selectMyOrder",{token:localStorage.getItem('clientToken')})
                .then((result) => {
                    // console.log(result.data.data);
                    this.list = result.data.data;
                    this.list.forEach((v) => {
                        switch (v.orderStatus) {
                            case 1:
                                v.orderStatus = "待支付";
                                break;
                            case 3:
                                v.orderStatus = "支付成功";
                                break;
                        }
                    });
                    console.log(this.list);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    created() {
        this.getData();
    },
};
</script>

<style lang="less" scoped>
h3 {
    font-size: 0.5333rem;
}
.myOrder {
    .orderList {
        li {
            margin-top: 0.1333rem;
        }
        .order {
            padding: 0.2667rem;
            background: ghostwhite;
            font-size: 0.4267rem;
            .top {
                font-size: 0.3733rem;
            }
            .content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .title {
                    width: 6.1333rem;
                    overflow: hidden;
                    white-space: pre-wrap;
                    text-overflow: ellipsis;
                }
                .num {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 1.6rem;
                    height: 1.6rem;
                }
            }
            .isPay {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
}
</style>