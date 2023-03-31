<template>
    <Header>
        <div class="left-content">
            <el-button plain icon="el-icon-menu" size="mini" @click="handleShou()"></el-button>
            <h3 style="font-color=white">好物多后台管理系统</h3>
        </div>
        <div class="right-content">
            <el-dropdown trigger="click" size="mini" @command="xuanze">
                <span>
                    <img :src="userImg">
                    <div class="welcome">
                        <p class="name comename">欢迎,{{user.name}}</p>
                        <!-- <p class="name avatarname">{{user.name}}</p> -->
                    </div>
                </span>
                <el-dropdown-menu slot="dropdown"  >
                    <!-- <el-dropdown-item command="updatePass">修改密码</el-dropdown-item> -->
                    <el-dropdown-item  command="exitLogin">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </Header>
</template>

<script>
export default {
    name:'Headnav',
    data() {
        return {
            userImg: require('../assets/images/userImg.jpg'),
        }
    },
    methods: {
        handleShou() {
            // this.$bus.$emit('Shou')
            this.$store.commit('isShouMenu')
        },
        xuanze(commandItem){
            console.log(commandItem);
            switch(commandItem){
                case 'updatePass':
                    break
                case 'exitLogin':
                    this.exitLogin()
                    break 
            }
        },
        exitLogin() {
            localStorage.removeItem('eleToken')
            this.$router.push('/login' )
        },
    },
    computed:{
        user(){
            return this.$store.getters.user
        }
    }
}
</script>

<style scoped lang="less">

Header {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    // align-content: center;
}

.left-content {
    display: flex;
    align-items: center;

    h3 {
        margin-left: 10px;
        font-size: 15px;
        font-weight: 400;
        color: white;
    }
}

.right-content {

    span img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        margin-top: 8px;
    }

}
</style>>
