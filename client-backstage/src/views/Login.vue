<template>
  <el-form :model="loginUser" status-icon :rules="rules" ref="loginForm" label-width="100px" class="login-container">
    <h3 class="login_title">好物多后台管理系统登录</h3>
    <el-form-item label="用户名" prop="name" label-width="80px" class="name">
        <el-input type="input" v-model="loginUser.name" autocomplete="off" placeholder="输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" label-width="80px" prop="password" class="password">
        <el-input type="password" v-model="loginUser.password" autocomplete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="login('loginForm')" class="login_submit">登录</el-button>
    </el-form-item>
</el-form>

</template>

<script>
import jwt_decode from 'jwt-decode'

export default {
     name:'Login',
     components:{},
     data() {
        return {
            loginUser:{
                name:'',
                password:''
            },
            rules:{
                name:[
                    {required:true,message:'请输入用户名',trigger:'blur'},
                    {min:3,message:'用户名长度不能小于3位',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:'blur'},
                    {min:6,message:'密码长度不能小于6位',trigger:'blur'}
                ]
            }
        }
     },
     methods: {
        login(formName){
            this.$refs[formName].validate(vaild =>{
                // console.log(vaild);
                if(vaild){
                    // console.log(this);
                    this.$axios.post('/api/users/login',{
                        name:this.loginUser.name,
                        password:this.loginUser.password
                    }).then(res=>{
                        // console.log(res);
                        //  拿到token和登录时间
                        const timestamp = Math.round(new Date().getTime());
                        const {token} = res.data;
                        // console.log(token);
                        //  存储到ls
                        localStorage.setItem("eleToken",token);
                        localStorage.setItem('loginTime',timestamp)
                        //  解析token
                        const decode = jwt_decode(token);
                        // console.log(decode);

                        this.$store.commit('setUser',decode)

                        this.$router.push('/index')
                    })
                }
            })
        },
        isEmpty(value){ //判断是否为空
            return (
                value === undefined || value ===null||(typeof value ==='object' && Object.keys(value).length===0)
                || (typeof value==='string' && value.trim().length===0)
            )
        }
     },
}
</script>

<style lang="less">
html{
    background: linear-gradient(to right, #fbc2eb, #a6c1ee);
}
#app {
    // height: 100%;
    
}

.login-container {
    width: 400px;
    margin: 30vh auto;
    background: white;
    border-radius: 15px;
    background-clip: padding-box;
    padding: 35px 35px 15px 0;
    box-shadow: 0 0 25px #cac6c6;
    // opacity: .9;

    .login_title {
        text-align: center;
        margin-left: 10%;
        padding-bottom: 30px;
    }
    .login_submit{
        width: 80%;
        margin-left: 40%;
        transform: translateX(-50%);
        
    }
}
</style>