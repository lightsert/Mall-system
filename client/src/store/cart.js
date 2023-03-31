import axios from '../http/axios.js'

export default ({
    state: {
        cartList: [], //购物车数据
    },
    getters: {
        total(state) { //总价
            if(!state.cartList)return
            let total=0
            state.cartList.forEach(v => {
                if (v.checked) {
                    total +=v.goodsPrice * v.goodsNum *100 
                }
            })
            return total
        },
        selectCart(state) {
            state.cartList.filter(v=>v.checked==true)
        }
    },
    mutations: { //处理
        setCartList(state, cartListData) {
            // console.log(cartListData);
            state.cartList=cartListData
        },
        // 清空购物车,退出登录用
        clearCartList(state) {
            state.cartList=''
        },
        // 是否全选
        allChecked(state,is) {
            state.cartList.forEach(val => {
                val.checked=is
            });
        },
        // 单选 (val{e为true/false,index为cartList下标})
        isChecked(state,val) {
            // console.log(val);
            state.cartList[val.index].checked=val.e
        },
        // 请求修改数量后,修改vuex中的goodsNum为新值
        endchangNum(state,val) {
            state.cartList.goodsNum=val
        }
    },
    actions: { //预处理
        changNum({commit},value) {
            const newNum = value[0]
            const id = value[1]
            console.log(newNum,id);
            axios.post('/api/buyer/changNum', { newNum, id }).then((result) => {
                commit('endchangNum',newNum)
                console.log(result);
            }).catch((err) => {
                console.log(err);
            });
        }
    },
});