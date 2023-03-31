// 前台订单

// 引入express
const express = require('express')
const router = express.Router()
// 输入数据库文件
const db = require('../../config/db')
// 引入JWT
const jwt = require('jsonwebtoken')
// 引入express-jwt 校验token
const jwtAuth = require('../../config/tokens')
const {v4:uuidv4} = require("uuid")
// 引入支付宝SDK 配置文件
const alipaySdk = require('../../config/alipay')
const AlipayFormData =  require('alipay-sdk/lib/form').default
// const formData = new AlipayFormData();
const axios =require('axios')


// --------------------后台

// $route GET /api/order/AllOrder
// @desc 查询所有订单
router.get('/AllOrder', (req, res) => {
    db.query('select * from store_order',(err,result)=>{
        if(err)throw err
        res.send({
            sussess: true,
            data:result
        })
    })
})

// $route Post /api/order/deleteOrder
// @desc 删除订单
router.post('/deleteOrder', (req, res) => {
    const {orderNo} = req.body
    db.query('delete from store_order where orderNo=?',[orderNo],(err,result)=>{
        if(err)throw err
        res.send({
            sussess: true,
            data:result
        })
    })
})


// ------------------前台


// $route Post /api/order/selectOrder
// @desc 查询用户订单列表
router.post('/selectMyOrder', (req, res) => {
    let token = req.body.token
    let decodeed = jwt.decode(token)
    console.log(decodeed);
    const {phone} =decodeed
    db.query('select * from store_order where userphone=?',[phone],(err,result)=>{
        if(err)throw err
        res.send({
            sussess: true,
            data:result
        })
    })
})


// $route Post /api/order/selectOrder
// @desc 查询订单信息接口
router.post('/selectOrder', (req, res) => {
    db.query('select * from store_order where orderNo=?',[req.body.orderNo],(err,result)=>{
        if(err)throw err
        res.send({
            sussess: true,
            data:result
        })
    })
})

// $route Post /api/order/createOrder
// @desc 创建订单接口
router.post('/createOrder', (req, res) => {
    let token = req.body.token
    let decode = jwt.decode(token)
    // console.log(decodeed);
    // 前端给后端的商品数据
    let goodsInfo = req.body.goodsInfo
    // orderNo 订单号规则：时间戳+用户手机后四位
    let orderNo = Date.now() + decode.phone.substr(-4)
    let goodsNameArr = '' // 订单中商品名数组
    let goodsTotal = 0  //商品总价
    let goodsNum=0  //商品总数量
    let orderId = uuidv4()
    goodsInfo.forEach(v => {
        goodsNameArr+=v.goodsName+','
        goodsNum+=v.goodsNum
        goodsTotal += v.goodsNum * v.goodsPrice
    })
    // console.log(orderNo, goodsNameArr, goodsTotal,goodsNum,decode.phone);
    db.query('insert into store_order (orderId,orderNo,goodsName,goodsTotal,goodsNum,orderStatus,userphone) values (?,?,?,?,?,?,?)', [orderId,orderNo, goodsNameArr, goodsTotal,goodsNum, 1, decode.phone], (err, result) => {
        if (err) throw err
        db.query('select * from store_order where userphone=? and orderNo=?', [decode.phone, orderNo], (err, result) => {
            goodsInfo.forEach(v => {
                db.query('delete from cart where id=?', [v.id], (err, result) => {})
            })
            res.json({
                sussess:true,
                orderNo: result[0].orderNo,
            })
            // console.log(result);
        })
    })

    
})


// $route Post /api/order/payment
// @desc 支付接口(对接支付宝沙箱)
router.post('/payment', (req, res) => {
    // 接收到订单号，购买商品名称，商品总价
    let { orderNo, goodsName, total } = req.body
    // console.log(req.body);
    // 对接支付宝API
    const formData = new AlipayFormData();
    // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
    formData.setMethod('get');
    formData.addField('bizContent', {
        outTradeNo: orderNo,
        productCode: 'FAST_INSTANT_TRADE_PAY',
        totalAmount: total,
        subject: goodsName,
    });
    // 支付成功或失败跳转的链接
    formData.addField('returnUrl', 'http://localhost:8080/payment');
    // 返回promise
    const result = alipaySdk.exec(
        'alipay.trade.page.pay',
        {},
        { formData: formData },
    );
    // 对接支付宝成功，支付宝返回的数据(url),修改订单状态为3成功
    result.then(res1 => {
        res.json({
            data: {
                success: true,
                msg: '支付中',
                paymentUrl:res1
            }
        })
    })
})

// $route Post /api/order/successPayment
// @desc 支付成功或失败接口
router.post('/successPayment', (req, res) => {
    // 支付宝返回的订单号信息
    const { out_trade_no, trade_no } = req.body
    console.log(out_trade_no, trade_no);
    // 支付宝配置-------------------
    const formData = new AlipayFormData();
    // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
    formData.setMethod('get');
    formData.addField('bizContent', { //比对支付时信息
        out_trade_no, trade_no
    });
    // 返回promise
    const result = alipaySdk.exec(
        'alipay.trade.query', //这里改成query
        {},
        { formData: formData },
    );
    // 后端请求支付宝
    result.then(data => { //这里data是链接，请求得到json格式数据(交易信息)
        let responseCode = ''
        axios.get(data).then(res1=> {
            responseCode = res1.data.alipay_trade_query_response
            switch (responseCode.trade_status) { //交易状态
                case 'TRADE_SUCCESS' || 'TRADE_FINISHED':
                    // 修改订单状态 1 -> 3(支付成功)
                    db.query('update store_order set orderStatus=3 where orderNo=?', [out_trade_no], (err, reuslt) => {
                        if(err) throw err
                        res.json({code:responseCode.code,msg:'交易完成'})
                    })
                break;
                case 'TRADE_CLOSED':
                    res.json({code:responseCode.code,msg:'交易关闭'})
                break;
                case 'WAIT_BUYER_PAY':
                    res.json({code:responseCode.code,msg:'未付款'})
                break;
            }
        })
    })
})


module.exports = router