<template>
    <div class="personal">
        <header>
            <van-icon name="arrow-left" @click="$router.replace('/My')" />
            <h2>个人信息</h2>
        </header>
        <main class="main">
            <div class="sideBar">
                <div class="personalInfo">
                    <ul>
                        <li><span>用户名： {{cartList.username}}</span></li>
                        <li><span>性别：  {{cartList.sex}}</span></li>
                        <li><span>电话号码： {{cartList.phone}}</span></li>
                        <li><span>电子邮箱： {{cartList.email}}</span></li>
                        <li><span>信用值： {{cartList.credit}}</span></li>
                        <li><span>个人简介：{{cartList.describes}}</span></li>
                    </ul>
                </div>
            </div>
        </main>
        <div class="buttes">
            <el-button type="primary" icon="el-icon-edit" class="but" @click='pushedit()'>编辑个人信息</el-button>
        </div>
    </div>
</template>

<script>
import Tabbar from "../components/common/Tabbar.vue";
export default {
    name: "Personal",
    components: {
        Tabbar,
    },
    data() {
        return {
            cartList:{},
        };
    },
    methods: {
        userdata(){
            this.$axios
                .post(`/api/buyer/getdata`,{
                    token:localStorage.getItem('clientToken')
                })
                .then((result) => {
                    // console.log(result);
                    // console.log(this.usernameda.username);
                    this.cartList = result.data.goodsInfo[0];
                    // console.log(this.infoData);
                    console.log(this.cartList);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        pushedit(info){
            this.$router.replace({
                name:'Editinfo',
                params:{
                        username:this.cartList.username,
                        phone:this.cartList.phone,
                        sex:this.cartList.sex,
                        email:this.cartList.email,
                        describes:this.cartList.describes
                }   
            })
        }  
    },
    created() {
        this.userdata();
    },

}
</script>

<style lang="less" scoped>
.personal{
    header {
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
            margin-left:-35px;
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
        .main{
          width: 100%;
          height: 100%;
          background: #eae6e666;
          margin-top: 10%;
        //   margin: auto 0;
            .sideBar{
                width: 100%;
                height: 100%;
                background: #eae6e666;
                // margin-top: 30px;
                    .personalInfo{
                        padding: 5px;
                        padding-left: 20px;
                        ul{
                            li{
                                margin-top: 8px;
                                font-size: 20px;
                            }
                        }
                    }
            }
        }
        
        .buttes{
            width: 100%;
            // background: #b0352f;
            margin-top: 40px;
            .but{
                width: 375px;
                height: 36px;
            }
        }

}

</style>