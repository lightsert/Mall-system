<template>
    <!-- 首页头部 -->
    <header>
        <!-- <h1 class="logo"><img src="../../assets/images/logo2.png" alt="" /></h1> -->
        <div class="search" @click="goSearch">
            <i class="iconfont icon-fangdajing"></i>
            <input type="search" placeholder="搜您喜欢的" />
        </div>
        <div class="kefu">
            <i class="iconfont icon-kefu"></i>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header",
    methods: {
        goSearch() {
            this.$router.push({ path: "/search" });
        },
    },
};
</script>

<style lang="less" scoped>
header {
    position: fixed;
    top: 0;
    left: 0;
    background-color: #b0352f;
    width: 100%;
    height: 1.1733rem;
    z-index: 99;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    .logo {
        width: 1.1733rem;
        height: 1.1733rem;
        // transform: translateY(-5px); 手机上看加上这句logo就显示垂直居中
        img {
            width: 100%;
            height: 100%;
        }
    }
    .search {
        position: relative;
        width: 6.56rem;
        height: 0.8rem;
        background-color: #fff;
        border-radius: 0.8rem;
        i {
            position: absolute;
            left: 0.16rem;
            top: 50%;
            transform: translateY(-50%);
            font-size: 0.4267rem;
        }
        input {
            position: absolute;
            top: 0.0533rem;
            left: 0.4rem;
            height: 100%;
            width: 100%;
            border: 0;
            padding-left: 0.4rem;
            transform: translateY(-0.0267rem);
            background-color: transparent;
            outline: none;
            font-size: 0.4267rem;
        }
    }
    .kefu i {
        font-size: 0.8rem;
        color: #fff;
    }
}
</style>