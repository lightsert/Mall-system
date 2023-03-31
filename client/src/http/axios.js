// axios二次封装
import axios from "axios";
import { Toast } from 'vant'
import router from '../router/index'

axios.interceptors.request.use(config => {
// Do something before request is sent
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
    })
    if (localStorage.clientToken&&localStorage.clientToken!=undefined) { //如登录了
        // 设置统一的请求头
        config.headers.Authorization =  localStorage.clientToken
    } 
    return config
},error => {
// Do something with request error
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
// Do something before response is sent
    Toast.clear();
    return response;
},error => {
// Do something with response error
    // 获取错误状态码
    const { status } = error.response
    if (status == 401) { //401就是token失效
        Toast('Token失效，重新登录')
        // 清除token
        localStorage.removeItem('clientToken')
        // 跳转到登录页面
        router.push({name:'Login'})
    } 
    return Promise.reject(error);
});
export default axios