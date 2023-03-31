export default ({
    state: {
        addressList: [],//list页的地址列表
        addressInfo: {},//edit页的编辑数据
        // selectedAddress:{},//订单页选中的地址信息
    },
    getters: {
        defaultAddress(state) {
            return state.addressList.filter(v=>v.isDefault==true)
        }
    },
    mutations: { //处理
        setAddressList(state, data) {
            state.addressList = data
            for (let i = 0; i < state.addressList.length; i++) {
                state.addressList[i].address = state.addressList[i].province + state.addressList[i].city +
                    state.addressList[i].county + state.addressList[i].addressDetail;
                state.addressList[i].isDefault==0?false:true
            }
        },
        setAddressInfo(state, data) {//未用
            state.addressInfo=data
        },
      /*   setSelectedAddress(state, data) {
            state.selectedAddress=data
        } */
    },
    actions: { //预处理
        
    },
});