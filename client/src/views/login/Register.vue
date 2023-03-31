<template>
    <div class="register">
        <LoginHeader><h2>注册</h2></LoginHeader>
        <main>
            <div class="main">
                <van-form @submit="onSubmit" ref="form">
                    <!--  1、以1开头
                        2、第二位数字为3，4，5，6，7，8，9中一个
                        3、第三位到十一位数字为0到9的任意一个数字 -->
                    <van-field
                        v-model="phone"
                        name="手机号"
                        type="number"
                        placeholder="请输入手机号"
                        :rules="[
                            {
                                required: true,
                                pattern: /^1[3-9]\d{9}$/,
                                message: '手机号格式不正确',
                            },
                        ]"
                    />
                    <van-field
                        v-model="username"
                        name="昵称"
                        type="string"
                        placeholder="请输入用户昵称"
                        :rules="[
                            {
                                required: true,
                                pattern: /^[0-9\a-zA-Z\u4e00-\u9fa5]{2,8}$/,
                                message: '用户昵称为2-8个字符',
                            },
                        ]"
                    >
                    </van-field>
                    <van-field
                        v-model="password"
                        name="密码"
                        type="password"
                        placeholder="请输入密码"
                        :rules="[
                            {
                                required: true,
                                pattern: /^\w{6,12}$/,
                                message: '密码为6-12位',
                            },
                        ]"
                    >
                    </van-field>
                    <van-field
                        v-model="password2"
                        name="再次密码"
                        type="password"
                        placeholder="请再次输入密码"
                        :rules="[
                            {
                                required: true,
                                validator: (val) => {
                                    return val === this.password;
                                },
                                message: '两次密码不一致',
                            },
                        ]"
                    >
                    </van-field>
                    <div class="loginbtn">
                        <button type="submit">注册</button>
                    </div>
                    <div class="bottombtn">
                        <a @click="$router.replace({ name: 'Login' })"
                            >密码登录</a
                        >
                    </div>
                </van-form>
            </div>
        </main>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import Tabbar from "../../components/common/Tabbar.vue";
import LoginHeader from "../../components/common/LoginHeader.vue";
import { Toast } from "vant";
export default {
    name: "Register",
    components: {
        Tabbar,
        LoginHeader,
    },
    data() {
        return {
            phone: "",
            username: "",
            password: "",
            password2: "",
        };
    },
    methods: {
        onSubmit(values) {
            console.log("submit", values);
            this.$refs.form
                .validate()
                .then((result) => {
                    this.$axios
                        .post("/api/buyer/register", {
                            phone: this.phone,
                            username: this.username,
                            password: this.password,
                        })
                        .then((res) => {
                            console.log(res);
                            Toast.success(res.data);
                            this.$router.replace({ name: "Login" });
                        })
                        .catch((err) => {
                            Toast.fail(err.response.data);
                            console.error(err.response.data);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style lang="less" scoped>
.register {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .main {
        width: 80%;
        margin: 0 auto;
        .van-field {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            // height: 1.3333rem;
            border: 1px solid #ccc;
            border-radius: 0.1333rem;
            outline: red;
            margin: 0.5333rem 0;
        }
        .loginbtn {
            button {
                width: 100%;
                height: 1.1733rem;
                font-size: 0.48rem;
                border: 0;
                color: #fff;
                background-color: #b0352f;
            }
        }
        .bottombtn {
            display: flex;
            justify-content: space-between;
            margin-top: 0.4rem;
            a {
                color: black;
                font-size: 0.4rem;
            }
        }
    }
}
</style>