const {
  db,
  errMessage
} = require('../../db')

const JWT = require('../jwt')

//获取用户信息
const userInfo = (req, res, next) => {
  const user = JWT.verify(req.headers.authorization.split(' ')[1])
  res.send({userInfo:{userName:user.user}})
}

module.exports = {
  userInfo
};
