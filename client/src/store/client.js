export default({
    state: {
        // 登录状态
        loginStatus: localStorage.getItem('clientToken')?true:false,
        // token
        token:'',
    },
    mutations: { //处理
        userLogin(state,user) {
            // console.log(state, user)
            state.loginStatus = true
            state.token =  localStorage.getItem('clientToken')
            state.userInfo=user
        },
        loginStatusChange(state) {
            state.loginStatus = false
        }
    },
    actions: { //预处理
      
    },
    getters:{
    }
  });