<template>
  <div class="login">
      <LoginHeader></LoginHeader>
        <main>
          <div class="main">
              <van-form @submit="onSubmit" ref='form'>
                  <!--  1、以1开头
                        2、第二位数字为3，4，5，6，7，8，9中一个
                        3、第三位到十一位数字为0到9的任意一个数字 -->
                <van-field v-model="phone" name="手机号"  placeholder="请输入手机号"
                    :rules="rules.phone"/>
                    <!-- 密码：6-12位 -->
                <van-field v-model="password" name="密码" type="password" placeholder="请输入密码"
                    :rules="rules.pwd">
                </van-field>
                <div class="loginbtn">
                    <button type="submit">登录</button>
                </div>
                <div class="bottombtn">
                    <a @click="$router.replace({name:'Register'})">快速注册</a>
                </div>
                </van-form>
          </div>
      </main>
      <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '../../components/common/Tabbar.vue'
import LoginHeader from '../../components/common/LoginHeader.vue'
import {Toast} from 'vant'
import jwtDecode from 'jwt-decode'

export default {
    name:'Login',
    components: {
        Tabbar,LoginHeader
    },
    data() {
        return {
            phone:'',
            password:'',
            rules:{
                // 手机号验证
                phone:[
                    { required: true,pattern:/^1[3-9]\d{9}$/,message:'手机号格式不正确'},
                ],
                // 密码验证
                pwd:[{ required: true,pattern:/^\w{6,12}$/,message:'密码格式不正确'}]}
            }
    },
    methods: {
        onSubmit(val){
            console.log(val);
            // 前端验证
            this.$refs.form.validate().then((result) => {
                // 发送请求，后端验证
                this.$axios.post('/api/buyer/pwdLogin',{
                    phone:this.phone,
                    password:this.password
                }).then(res => {
                    // console.log(res.data)
                    const token =res.data.token
                    // console.log(token);
                    localStorage.setItem('clientToken',token)
                    // 解析token
                    const decode =jwtDecode(token)
                    // console.log(decode);
                    this.$store.commit('userLogin',decode)
                    Toast.success('登录成功');
                    this.$router.replace({name:'My'})
                })
                .catch(err => {
                    console.log(err);
                    Toast.fail(err.response.data.msg);
                })
            }).catch((err) => {
                console.log(err);
            });

            
        },
    },
}
</script>

<style lang="less" scoped>
.login{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .main{
        width: 80%;
        margin: 0 auto;
        .van-field{
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            // height: 1.3333rem;
            border: 1px solid #ccc;
            border-radius: .1333rem;
            outline: red;
            margin: .5333rem 0;

        }
        .loginbtn{
            button{
                width: 100%;
                height: 1.1733rem;
                font-size: .48rem;
                border: 0;                            
                color: #fff;
                background-color: #b0352f;
            }   

        }
        .bottombtn{
            display: flex;
            justify-content: space-between;
            margin-top: .4rem;
             a{
                color: black;
                font-size: .4rem;
            }
        }
       
    }
    
}
</style>