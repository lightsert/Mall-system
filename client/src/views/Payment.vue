<template>
    <div class="payment">
        <h1 v-if="payStatus">支付成功</h1>
        <h1 v-else>支付失败</h1>
        <h1>3s后返回首页</h1>
    </div>
</template>

<script>
import qs from "qs";
export default {
    name: "Payment",
    data() {
        return {
            payStatus: false,
        };
    },
    methods: {
        getData() {
            let data = {
                //支付成功或失败支付宝都会在url传query参数给你
                out_trade_no: this.$route.query.out_trade_no,
                trade_no: this.$route.query.trade_no,
            };
            this.$axios({
                url: "/api/order/successPayment",
                method: "post",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                // qs是增加安全性的序列化
                data: qs.stringify(data),
            }).then((res) => {
                //用返回码作成功失败的依据
                if (res.data.code == 10000) {
                    this.payStatus = true;
                    localStorage.removeItem("orderNo");
                }
                console.log(res);
            });
        },
    },
    created() {
        this.getData();
        setTimeout(() => {
            this.$router.replace("/home");
        }, 3000);
    },
};
</script>

<style>
</style>