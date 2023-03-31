<template>
    <div class="my">
        <header>
            <div class="exitBtn" v-if="loginStatus" @click="exit">
                <img :src="imgUrl" alt="" />退出
            </div>
            <div class="loginbtn" @click="goLogin" v-else>登录/注册</div>
            <h4 v-if="loginStatus" class="userinfo">
                欢迎,{{ userInfo.username }}
            </h4>
        </header>
        <main>
            <ul>
                <li @click="$router.push('/personal')">
                    <van-icon name="location-o" color="#b0352f" />
                    <span>个人信息</span>
                    <van-icon name="arrow" />
                </li>
                <li @click="$router.push('/address')">
                    <van-icon name="location-o" color="#b0352f" />
                    <span>地址管理</span>
                    <van-icon name="arrow" />
                </li>
                <li @click="$router.push('/myOrder')">
                    <van-icon name="orders-o" color="#b0352f" />
                    <span>我的订单</span>
                    <van-icon name="arrow" />
                </li>
            </ul>
        </main>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import Tabbar from "../components/common/Tabbar.vue";
import { Toast } from "vant";
import { mapState } from "vuex";
export default {
    name: "My",
    components: {
        Tabbar,
    },
    data() {
        return {
            imgUrl: "./images/exit.png",
        };
    },
    methods: {
        goLogin() {
            this.$router.push({ name: "Login" });
        },
        exit() {
            //退出登录
            this.$store.commit("loginStatusChange");
            this.$store.commit("clearCartList");
            localStorage.removeItem("clientToken");
            Toast.success("已退出");
            window.location.reload()
        },
    },
    computed: {
        ...mapState({
            userInfo: (state) => state.client.userInfo,
            loginStatus: (state) => state.client.loginStatus,
        }),
    },
};
</script>

<style lang="less" scoped>
.my {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    header {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #b0352f;
        width: 100%;
        height: 4.2667rem;
        .loginbtn {
            display: block;
            background: rgba(255, 181, 0, 0.9);
            color: #fff;
            border-radius: 5px;
            padding: 5px 20px;
            font-size: 0.5333rem;
            text-align: center;
            line-height: 30px;
            width: 120px;
            height: 30px;
        }
        .exitBtn {
            display: flex;
            position: absolute;
            top: 0;
            right: 0;
            color: white;
            // vertical-align:top;
            font-size: 0.64rem;
        }
        .userinfo {
            color: #fff;
            font-size: 0.6933rem;
        }
    }
    main {
        flex: 1;
        li {
            display: block;
            position: relative;
            width: 100%;
            height: 50px;
            line-height: 50px;
            font-size: 20px;
            border-bottom: 1px rgb(240, 240, 240) solid;
            cursor: pointer;
            .van-icon {
                margin: 0 10px;
                &:last-child {
                    // text-align: right;
                    // margin-left: 110px; ;
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                }
            }
        }
    }
}
</style>