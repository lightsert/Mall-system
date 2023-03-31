<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c60" text-color="#fff"
             active-text-color="#ffd04b" @open="handleOpen" @close="handleClose">


        <el-menu-item v-for="item in noChildren" :index="item.path" :key="item.path" @click="ClickMenu(item)">
            <i :class="'el-icon-' + item.icon"></i>
            <span slot="title">{{item.label}}</span>
        </el-menu-item>

        <!-- <el-submenu v-for="item in hasChildren" :key="item.path" :index="item.path+''">
            <template slot="title">
                <i :class="'el-icon-'+item.icon"></i>
                <span slot="title">{{item.label}}</span>
            </template>
            <el-menu-item-group v-for="(c,cindex) in item.children" :key="c.path">
                <el-menu-item :index="cindex.toString()">{{c.label}}</el-menu-item>
            </el-menu-item-group>
        </el-submenu> -->
    </el-menu>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'LeftMenu',
    data() {
        return {
            menu: [
                {
                    path: '/',
                    name: 'home',
                    label: '首页',
                    icon: 's-home',
                    url: 'home'
                },
                {
                    path: '/goods',
                    name: 'goods',
                    label: '商品管理',
                    icon: 's-goods',
                    url: 'Goods'
                },
                {
                    path: '/order',
                    name: 'order',
                    label: '订单管理',
                    icon: 's-order',
                    url: 'orderManage'
                },
                {
                    path: '/client',
                    name: 'client',
                    label: '用户管理',
                    icon: 's-order',
                    url: 'orderManage'
                },
            ]
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        ClickMenu(item) {
            this.$router.push({name: item.name})
        }
    },
    computed: {
        noChildren() {
            return this.menu.filter(item => !item.children)
        },
        hasChildren() {
            // console.log(this.menu.filter(item => item.children));
            return this.menu.filter(item => item.children)
        },
        /* vuex */
        // ...mapState({ isCollapse: state => state.shouMenu.isCollapse })
        /* isCollapse() {
            return this.$store.state.shouMenu.isCollapse
        } */
    },
}
</script>


<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
}

.el-menu {
    height: 100%;
    border: 0;

    h3 {
        color: white;
        text-align: center;
        line-height: 48px;
        font-size: 15px;
        font-weight: 300;
        margin-top: 5px;
    }

}
</style>