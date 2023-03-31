const express = require('express')
const app = express();


//  引入API

// user.js
const users = require("./router/api/user")

//goods.js
const goods = require("./router/api/goods")

//buyer.js
const buyer = require("./router/api/buyer")

//index.js
const homeindex = require('./router/api/home/index')

//cart.js
const cart = require('./router/api/cart/cart')

//order.js
const order = require('./router/api/order')

//  引入bodyparser中间件
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.get("/",(req,res)=>{
    res.send("Hello World!")
})

//  使用api
//  user
app.use("/api/users",users)
//  goods
app.use("/api/goods",goods)
//  buyer
app.use("/api/buyer",buyer)
//  index
app.use("/api/home",homeindex)
//  cart
app.use("/api/cart",cart)
//  order
app.use("/api/order",order)

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})