//  前台登录注册&购物车&地址管理

//  引入express
const express = require('express')
const router = express.Router()

//  引入数据库文件
const db = require('../../config/db')

// 引入jwt
const cjwt = require('jsonwebtoken')

//  引入express-jwt 校验token
const jwtAuth = require('../../config/tokens')
const secretKey = require('../../config/keys')
const {v4:uuidv4} = require("uuid")

//  $router POST api/buyer/register
//  @desc   前台注册接口
router.post('/register',(req,res)=>{
    //  搜索是否有同名的
    db.query('select * from buyer where username=? || phone=?',[req.body.username,req.body.phone],(err,result,fields)=>{
        if(err) throw err
        //  无同名
        const uid = uuidv4()
        if(result.length === 0){
            db.query('insert into buyer(uid,username,password,credit,phone,state) values(?,?,?,?,?,?)',[uid,req.body.username,req.body.password,70,req.body.phone,1],(err,result,fields)=>{
                if(err) throw err
                res.status(200)
                res.json("注册成功")
            })
        }else{
            res.status(400)
            res.json('该用户名已被注册')
        }
    })
})


// $router post /api/buyer/pwdLogin
//  @desc   前台登录接口
router.post('/pwdLogin',(req,res)=>{
    let userinfo = req.body
    db.query('select * from buyer where phone=?',[userinfo.phone],(err,result)=>{
        if(err) throw err
        if(result.length == 0){
            res.status(400)
            res.json("账号不存在")
        }else{
            if(userinfo.password === result[0].password){
                const rule = {id:result[0].uid,username:result[0].username,phone:result[0].phone}
                cjwt.sign(rule,secretKey,{expiresIn:3600},(err,token)=>{
                    if (err) throw err
                    res.json({
                        success:true,
                        loginStatus:true,
                        token,
                        data:result[0]
                    })
                })
            }else if(userinfo.password !== result[0].password){
                res.status(400).json({msg:'密码错误',loginStatus:false})
            }
        }
    })
    console.log(req.body);
})

// $router get /api/buyer/
//  @desc   获取所有用户信息
router.get("/",(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    db.query('select * from buyer order by username',(err,result)=>{
        if(err) throw err
        res.json({goodsInfo:result})
    })
})

// $router pst /api/buyer/state
//  @desc   修改用户状态
router.post("/state/:username",(req,res)=>{
    if(req.body.goodsName) goodsInfo.goodsName = req.body.goodsName
    if(req.body.state == 1){
        state = 0
    }else if(req.body.state == 0){
        state = 1
    }
    db.query("update buyer set state=? where username=?",[state,req.params.username],(err,result)=>{
        if(err) throw err
        if(state == 1){
            res.json({msg:"解封成功"})
        }else if(state == 0){
            res.json({msg:"封禁成功"})
        }
    })
})

// $router post /api/buyer/
//  @desc   获取特定用户信息
router.post("/getdata",(req,res)=>{
    let token = req.body.token
    const decode = cjwt.decode(token)
    let phone = decode.phone
    db.query('select * from buyer where phone=?',[phone],(err,result)=>{
        if(err) throw err
        res.json({goodsInfo:result})
    })
})


// $router post /api/buyer/editinfo
//  @desc      编辑个人信息
router.post("/editinfo/:phone",(req,res)=>{
    const usersInfo = {}
    if(req.body.username) usersInfo.username = req.body.username
    if(req.body.sex) usersInfo.sex = req.body.sex
    if(req.body.email) usersInfo.email = req.body.email
    if(req.body.describes) usersInfo.describes = req.body.describes

    db.query("update buyer set username=?,sex=?,email=?,describes=? where phone=?",[usersInfo.username,usersInfo.sex,usersInfo.email,usersInfo.describes,req.params.phone],(err,result)=>{
        if(err) throw err
        res.json({msg:'buyer Update',usersInfo})
    })
})


// $router post /api/buyer/addCart
//  @desc      加入购物车
router.post("/addCart",(req,res)=>{
    let goodsId = req.body.goodsId
    let token = req.body.token
    let id = uuidv4()
    let decode = cjwt.decode(token)
    let userPhone =decode.phone
    // console.log(userPhone);
    db.query('select * from goods where id=?',[goodsId],(err,result)=>{
        if(err)throw err
        const {goodsName,goodsPrice,goodsImg} = result[0]
        db.query('select * from cart where userPhone=? and goodsId=?', [userPhone, goodsId], (err, result) => {
            if (result.length > 0) {
                db.query('update cart set goodsNum=goodsNum+1 where userPhone=? and goodsId=?',[userPhone,goodsId], (err, result) => {
                    if (err) throw err
                    res.json({ msg:'添加成功' }).status(200)
                })
            } else {
                db.query('insert into cart(id,userPhone,goodsId,goodsName,goodsPrice,goodsImg) values (?,?,?,?,?,?)', [id,userPhone, goodsId, goodsName, goodsPrice, goodsImg], (err, result) => {
                    if (err) throw err
                    console.log(result);
                    res.json({ msg:'添加成功' }).status(200)
                })
            }
        })
    })
})


// $router post /api/buyer/userCart 
//  @desc       获取购物车信息
router.post('/userCart',(req,res)=>{
    let phone = req.body.phone
    db.query('select * from cart where userPhone=?',[phone],(err,result)=>{
        if(err) throw err
        res.json(result)
    })
})
// $router post /api/buyer/changNum
//  @desc       购物车内物品数量加减
router.post('/changNum',(req,res)=>{
    const { newNum, id } = req.body;
    db.query('update cart set goodsNum = ? where id=?', [newNum,id], (err, result) => {
        if (err) throw err
        res.json({msg:'修改成功'})
    })
})

// $router post /api/buyer/cartDelete
//  @desc       删除单个购物车物品
router.post('/cartDelete',(req,res)=>{
    let id = req.body.id
    db.query('delete from cart where id=?',[id],(err,result)=>{
        if(err) throw err
        res.json({msg:'删除成功'})
    })
})

// $router post /api/buyer/changNum
//  @desc       删除多个购物车物品
router.post('/cartMoreDelete',(req,res)=>{
    const idArr = req.body.idArr
    // 批量删除
    db.query('delete from cart where id in (?)', [idArr], (err, result) => {
        if (err) throw err
        res.json({msg:'删除成功'})
    })
})
// $router post /api/buyer/getAddress
//  @desc       获取收货地址信息
router.post('/getAddress',(req,res)=>{
    const token = req.body.token
    const decode = cjwt.decode(token)
    const uid = decode.id
    db.query('select * from address where uid=?',[uid],(err,result)=>{
        if(err) throw err
        res.json(result)
    })
})


// $router post /api/buyer/addAddress
//  @desc       添加收货地址信息
router.post('/addAddress',(req,res)=>{
    //  获取前端传来加密过的token
    let token = req.body.token
    //  解密token
    let decode = cjwt.decode(token)
    // 获取用户的唯一的标识
    let uid = decode.id
    let id = uuidv4()
    // console.log(uid);
    //  获取用户传过来的数据
    const {addressDetail,isDefault,name,tel,province,city,county,areaCode} = req.body.addressInfo
    db.query('select * from address where addressDetail=? and province=? and city=? and county=? and name=? and tel=? and uid=? and areaCode=?',[addressDetail, province, city, county, name, tel,uid,areaCode], (err, result) =>{
        if (err) throw err
        if(result.length == 0){
            if (isDefault == 1) {//如新加的isDefault为true,则该用户其他地址都设为false,再插入该条新地址
                db.query('update address set isDefault=0 where id<>?', [id], (err, result) => {
                    if(err) throw err
                })
            }
            db.query('insert into address(addressDetail,province,city,county,isDefault,name,tel,uid,areaCode,id) values (?,?,?,?,?,?,?,?,?,?)', [addressDetail, province, city, county, isDefault, name, tel,uid,areaCode,id],(err,result)=>{
                if(err) throw err
                res.json({msg:'添加成功!',success:true})
            })
        }else{
            res.json({msg:'地址已存在!'})
        }
    })
    
})


// $router post /api/buyer/editAddress
//  @desc       修改收货地址信息
router.post('/editAddress',(req,res)=>{
    //  获取前端传过来的数据
    let cont = req.body.addressInfo
    //  解析token
    let token = req.body.token
    let decode = cjwt.decode(token)
    //  对比地址的uid是否跟用户的id一致
    const { addressDetail, province, city, county, isDefault, name, tel, areaCode, id } = cont
    if(decode.id === cont.uid){
        if (isDefault == 1) {
            db.query('update address set isDefault=0 where id<>?', [id], (err, result) => {
                if (err) throw err
            })
        }
        db.query('update address set addressDetail=?, province=? , city=? , county=? , name=? , tel=? , areaCode=? , isDefault=? where id=?',[addressDetail,province,city,county,name,tel,areaCode,isDefault,id],(err,reuslt)=>{
            if(err) throw err
            res.json({msg:'修改成功!',success:true})
        })
    }else{
        res.json({msg:'非法操作!'})
    }
    // console.log(decode);
    // console.log(cont);
})

// $router post /api/buyer/deleteAddress
//  @desc       删除收货地址信息
router.post('/deleteAddress',(req,res)=>{
    const id = req.body.id
    db.query('delete from address where id=?',[id],(err,result)=>{
        if(err) throw err
        res.json({msg:'删除成功!',success:true})
    })
})



module.exports = router
