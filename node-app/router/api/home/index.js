// 前台首页

// 引入express
const express = require('express')
const router = express.Router()
// 输入数据库文件
const db=require('../../../config/db')


// $route GET /api/home/clientGoods/shopList
// @desc 前台搜索页模糊查询商品接口
router.get('/clientGoods/shopList', (request, response) => {
    console.log(request.query.goodsName);
    let goodsName=request.query.goodsName
    db.query(`select * from goods where goodsName like '%${goodsName}%'`, (err, result) => {
        response.send({
            code: 200,
            data:result
        })
    })
})

// 首页笔记本的数据
router.get('/index_list/2/data/1', (request, response) => {
    db.query(`select * from goods where type like '笔记本'`, (err, result) => {
        if (err) throw err
        if (result.length > 0) {
            response.json({
                code: 1,
                data: {result},
            })
        }
    })
})

// 首页苹果手机的数据
router.get('/index_list/1/data/1', (request, response) => {
    db.query(`select * from goods where type like '苹果'`, (err, result) => {
        if (err) throw err
        if (result.length > 0) {
            response.json({
                code: 1,
                data: {result},
            })
        }
    })
})
// 首页饮料的数据
router.get('/index_list/3/data/1', (request, response) => {
    db.query(`select * from goods where type like '饮料'`, (err, result) => {
        if (err) throw err
        if (result.length > 0) {
            response.json({
                code: 1,
                data: {result},
            })
        }
    })
})
// 首页家用品的数据
router.get('/index_list/4/data/1', (request, response) => {
    db.query(`select * from goods where type like '家用品'`, (err, result) => {
        if (err) throw err
        if (result.length > 0) {
            response.json({
                code: 1,
                data: {result},
            })
        }
    })
})
// 首页水果的数据
router.get('/index_list/5/data/1', (request, response) => {
    db.query(`select * from goods where type like '水果'`, (err, result) => {
        if (err) throw err
        if (result.length > 0) {
            response.json({
                code: 1,
                data: {result},
            })
        }
    })
})

// 首页推荐页的数据----------------------------------------

// 爆款推荐  /api/homne/getRecommend
router.get('/getRecommend', (req, res) => {
    db.query('select * from goods ORDER BY rand() limit 4', (err, result) => {
        if (err) throw err
        res.json(result)
        // console.log(result);
    })
})

// 轮播图  /api/homne/getSwiper
router.get('/getSwiper', (req, res) => {
    db.query('select * from swiper', (err, result) => {
        if (err) throw err
        res.json(result)
    })
})

// topbar  /api/homne/getTabs
router.get('/getTabs', (req, res) => {
    db.query('select * from tabs', (err, result) => {
        if (err) throw err
        res.json(result)
    })
})


module.exports = router