// 前台首页

// 引入express
const express = require('express')
const router = express.Router()
// 输入数据库文件
const db=require('../../../config/db')


// $route GET /api/cate/typeName
// @desc 前台获取分类页分类名接口
router.get('/typeName', (req, res) => {
    db.query('select * from category', (err, result) => {
        // console.log(result);
        res.send({
            code: 200,
            data: [
                {text:result[0].typeName},
                {text:result[1].typeName},
                {text:result[2].typeName},
                {text:result[3].typeName},
                {text:result[4].typeName}
            ]
        })
    })
})




// 获取分类页的数据
router.post('/getCate', (req,res,next) => {
    let text = req.body.text
    console.log(text);
    db.query(`select * from goods where type like ?`,[text], (err, result) => {
        if (err) throw err
        if (result.length > 0) {
            res.json({
                code: 1,
                result,
            })
        }
    })
})

// $route GET api/category/goodsDetail/:id
// @desc 获取单个商品数据
// @access private
router.get('/goodsDetail/:id', (request, response) => {
    db.query('select * from goods where id=?', [request.params.id], (err, result) => {
        if (err) throw err
        // console.log(result);
        response.json({ goodsInfo: result })
    })
})

module.exports = router