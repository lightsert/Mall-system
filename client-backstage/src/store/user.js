export default{
    state:{
        isAuthen:false,
        user:{}
    },
    getters:{
        isAuthen: state => state.isAuthen,
        user: state => state.user
    },
    actions:{

    },
    mutations:{
        // 设置是否授权方法
        setAuth(state, isAuthen) {
            if (isAuthen) {
                state.isAuth = isAuthen
            } else {
                state.isAuth = false
            }
        },
        // 存储用户
        setUser(state, user) {
            if (user) state.user = user
            else state.user = {}
        },
    }
}