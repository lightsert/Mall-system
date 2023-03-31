<template>
    <div class="loginHeader">
        <van-icon name="arrow-left" @click="goback" />
        <slot><h2>登录</h2></slot>
        <van-icon name="wap-home-o" @click="gohome" />
    </div>
</template>

<script>
export default {
    name: "LoginHeader",
    methods: {
        goback() {
            console.log(this.$route.path);
            if (this.$route.path == "/address/addressEdit") {
                this.$router.replace("/address");
            } else if (this.$route.path == "/address") {
                this.$router.replace("/my");
            } else if(this.$route.path == "/editinfo"){
                this.$router.replace('/personal')
            } else {
                this.$router.back();
            }
        },
        gohome() {
            this.$router.push({ path: "/home" });
        },
    },
};
</script>

<style lang="less" scoped>
.loginHeader {
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
}
</style>