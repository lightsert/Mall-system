<template>
  <div class="index">
    <el-row :gutter="10" class="home">
        <el-col :span="9" style="margin-top:20px">
            <el-card shadow="hover">
                <template #header>
                    <div class="user">
                        <img :src="userImg">
                        <div class="userInfo">
                            <p class="name">{{name}}</p>
                            <p class="access">超级管理员</p>
                        </div>
                    </div>
                </template>
                <div class="loginInfo">
                    <p class="loginTime">上次登录时间：<span>{{shijianc(loginTime)}}</span></p>
                    <p class="loginAddress">上次登录地点：<span>广州</span></p>
                </div>
            </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            userImg: require('../assets/images/userImg.jpg')
        }
    },
    computed:{
        name(){
            return this.$store.state.user.user.name
        },
        loginTime(){
            // return this.shijianc(this.$store.state.user.loginTime)
            return Number(localStorage.getItem('loginTime'))
        }
    },
    methods: {
            shijianc(time) {
                let date = new Date(time)
                let Y = date.getFullYear() + '-'
                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
                let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
                let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
                let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
                return Y + M + D + h + m
            }
    },
}
</script>

<style lang="less">
.home {
    .el-card {
        padding: 10px
    }

    .user {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        img {
            width: 30%;
            border-radius: 50%;
        }

        .userInfo {
            margin-left: 20px;

            // font-size: 20px;
            .name {
                font-size: 28px;
            }

            .access {
                font-size: 16px;
                color: rgb(164, 164, 164);
            }
        }
    }

    .loginInfo {
        font-size: 12px;
        color: rgb(164, 164, 164);

        span {
            margin-left: 30px;
        }
    }
}


</style>