// 引入express-jwt 校验token 需要在token前加'Bearer '
const { expressjwt: jwt } = require("express-jwt");
// 引入密钥
const secretKey = require('./keys')

let jwtAuth = jwt({
    secret: secretKey,
    algorithms: ["HS256"]
}).unless(
    {
        path: ["/api/users/login", "/api/users/register","/api/client/pwdLogin", "/api/client/register"]
    })

module.exports = jwtAuth 