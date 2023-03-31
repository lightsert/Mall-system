<template>
    <div class="editinfo">
        <LoginHeader><h2>编辑个人信息</h2></LoginHeader>
        <main>
            <div class="main">
                <van-form @submit="onSubmit" ref="form">
                    <!--  1、以1开头
                        2、第二位数字为3，4，5，6，7，8，9中一个
                        3、第三位到十一位数字为0到9的任意一个数字 -->
                    <van-field
                        v-model="infoData.username"
                        name="昵称"
                        type="string"
                        placeholder="请输入昵称"
                    >
                    </van-field>
                    <van-field
                        v-model="infoData.sex"
                        name="性别"
                        type="string"
                        placeholder="请输入性别"
                    >
                    </van-field>
                    <van-field
                        v-model="infoData.email"
                        name="电子邮箱"
                        type="email"
                        placeholder="请输入电子邮箱"
                    >
                    </van-field>
                    <van-field
                        v-model="infoData.describes"
                        name="个人简介"
                        type="string"
                        placeholder="请输入个人简介"
                    >
                    </van-field>
                    <div class="loginbtn">
                        <button type="submit">确认修改</button>
                    </div>
                </van-form>
            </div>
        </main>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import Tabbar from "../components/common/Tabbar.vue";
import LoginHeader from "../components/common/LoginHeader.vue";
export default {
    name: "Editinfo",
    components: {
        Tabbar,
        LoginHeader,
    },
    data() {
        return {
            infoData:{
                username:this.$route.params.username,
                phone:this.$route.params.phone,
                sex:this.$route.params.sex,
                email:this.$route.params.email,
                describes:this.$route.params.describes
            },
        };
    },
    methods: {
        onSubmit(values) {
            // console.log("submit", values);
            console.log(this.infoData);
            this.$refs.form
                .validate()
                .then((result) => {
                    this.$axios
                        .post(`/api/buyer/editinfo/${this.infoData.phone}`, {
                            username:this.infoData.username,
                            sex:this.infoData.sex,
                            email:this.infoData.email,
                            describes:this.infoData.describes
                        })
                        .then((res) => {
                            this.$message({message:'操作成功',type:'success'})
                            // console.log(res);
                            this.$router.replace({name:'Personal'})
                        })
                        .catch((err) => {
                            this.$message({message:'操作失败,请联系管理员！',type:'error'})
                            return false
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
.editinfo {
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