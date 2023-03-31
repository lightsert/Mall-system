const mysql = require('mysql')

// 连接配置
const conncetion = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123',
    database: 'db'
})
// 连接
// conncetion.connect()

/* conncetion.query('select * from user', (err, result, fields) => {
    console.log(result);
}) */

// 暴露
module.exports = conncetion 