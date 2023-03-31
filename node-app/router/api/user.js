//  登录与注册
const express = require("express");
const router = express.Router();

//  引入加密
const bcrypt = require("bcrypt")

//  引入数据库
const db = require("../../config/db")
db.connect();
//   引入
const jwt = require("jsonwebtoken")
// 引入加密名字
const jwtAuth = require("../../config/tokens")
const Keys = require("../../config/keys")

//  引入数据类型，无用了
const User = require("../../models/User")



//  $route GET api/users/test
//  @desc   返回的请求的json数据
//  @access   public
router.get("/test",(req,res)=>{
    res.json({msg:"login works"})
})

//  注册    不需要注册
//  $route Post api/users/test
//  @desc   返回的请求的json数据
//  @access   public
router.post("/register",(req,res) => {
    User.findOne({email:req.body.email}).then((user)=>{
        if(user){
            return res.status(400).json({email:'邮箱已被注册!'})
        }else{
            const newUser = new User({
                name:req.body.name,
                email:req.body.email,
                avatar,
                password:req.body.password
            })

            bcrypt.genSalt(10, function(err,salt){
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) throw err;

                    newUser.password = hash;

                    newUser.save().then(user=>res.json(user))
                    .catch(err => console.log(err))
                })
            })

            
        }
    })
})

//  登录
//  $route Post api/users/login
//  @desc   返回的请求的json数据
//  @access   public
router.post("/login",(req,res)=>{
    const userinfo = req.body
    //  判断用户是否存在数据库中
    db.query("select * from user where name=?",userinfo.name,(err,result,fields)=>{
        if(err) throw err
        if(!result.length){
            res.status(400)
            // res.json(result)
            res.json("账号不存在")
            
        }else{
           if(userinfo.password === result[0].password){
                // jwt.sign("规则","加密名字","过期日期","箭头函数 ")
                const rule = {id:userinfo.id,name:userinfo.name}
                jwt.sign(rule,Keys,{expiresIn: 3600},(err,token)=>{
                    if(err) throw err
                    res.json({
                        success:true,
                        token:"Bearer" + token
                    })
                })

           }else if(userinfo.password !== result[0].password){
                res.status(400).json({msg:'密码错误!'})
           }
        }
    })
})

// 用户信息 $route GET api/users/current
// @desc 返回当前用户
// @access private
// 验证token passport-jwt(X)或express-jwt(✔)
router.get('/current', jwtAuth, (request, response) => {
    // console.log(request.auth);
    if (!request.auth.name) return response.sendStatus(401)
    response.json({ msg: 'success', name: request.auth.name }).status(200)
})


module.exports = router