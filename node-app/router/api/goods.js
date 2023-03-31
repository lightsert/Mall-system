//  后台商品管理

//   引入express
const express = require('express')
const router = express.Router()

// 引入数据库文件
const db = require("../../config/db")
// db.connect();

//  引入express-jwt 解析验证token
const jwtAuth = require("../../config/tokens")

const cjwt = require('jsonwebtoken')

const {v4:uuidv4} = require("uuid")


//测试
router.get("/test",(req,res)=>{
    res.json({msg:"goods"})
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Headers', '*');
    // db.query('select * from goods order by goodsTime', (err, result) => {
    //     if (err) throw err
    //     // console.log(result);
    //     res.json({ goodsInfo: result })
    // })
})

//  添加信息接口    POST
router.post("/add",(req,res)=>{
    const goodsInfo = {}
    goodsInfo.id = uuidv4()
    if(req.body.goodsName) goodsInfo.goodsName = req.body.goodsName
    if(req.body.goodsPrice) goodsInfo.goodsPrice = req.body.goodsPrice
    if(req.body.goodsImg) goodsInfo.goodsImg = req.body.goodsImg
    if(req.body.goodsType) goodsInfo.type = req.body.goodsType
    db.query("insert into goods(id,goodsName,goodsPrice,goodsImg,type,goodsTime) value(?,?,?,?,?,now())",[goodsInfo.id,goodsInfo.goodsName,goodsInfo.goodsPrice,goodsInfo.goodsImg,goodsInfo.type],(err,result)=>{
        if(err) throw err
        res.json({msg:'goods add success'})
    })
})

//  获取所有商品数据    GET
router.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    db.query('select * from goods order by goodsTime', (err, result) => {
        if (err) throw err
        // console.log(result);
        res.json({ goodsInfo: result })
    })
})

// $route GET api/goods/:id
// @desc 获取单个商品数据
// @access private
router.get('/:id',(req, res) => {
    db.query('select * from goods where id=?', [req.params.id], (err, result) => {
        if (err) throw err
        // console.log(result);
        res.json({ goodsInfo: result })
    })
})

//  编辑
router.post("/edit/:id",(req,res)=>{
    const goodsInfo = {}
    if(req.body.goodsName) goodsInfo.goodsName = req.body.goodsName
    if(req.body.goodsPrice) goodsInfo.goodsPrice = req.body.goodsPrice
    if(req.body.goodsImg) goodsInfo.goodsImg = req.body.goodsImg

    db.query("update goods set goodsName=?,goodsPrice=?,goodsImg=? where id=?",[goodsInfo.goodsName,goodsInfo.goodsPrice,goodsInfo.goodsImg,req.params.id],(err,result)=>{
        if(err) throw err
        res.json({msg:'goods Update',goodsInfo})
    })
})

//  商品删除
router.post("/delete/:id",(req,res)=>{
    db.query('delete from goods where id=?',[req.params.id],(err,result)=>{
        if(err) throw err
        res.json({msg:'delete success',data:result})
    })
})



module.exports = router