const mysql = require('mysql')

const db = mysql.createConnection({
  host: 'gz-cynosdbmysql-grp-jelbn4lz.sql.tencentcdb.com',
  port: 25804,
  user: 'root',
  password: '206911wbhWBH',
  database: 'uni-app'
})

// 数据库连接报错反馈
const errMessage = (err) => {
  if (err) return console.log(err.message);
}


module.exports = {
  db,
  errMessage
}
