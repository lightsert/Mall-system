export default ({
    state: {
        orderNo: '',
    },
    getters: {
        orderNo() {
            return localStorage.getItem('orderNo')
        }
    },
    mutations: { //处理
        setOrderNo(state, data) {
            // 存订单号
            state.orderNo = data
            localStorage.setItem('orderNo', data);
        }
    },
    actions: { //预处理
        
    },
});