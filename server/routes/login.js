var express = require('express');
var router = express.Router();
const {
  loginFn,
  captchapngFn,
  verificationFn
} = require('../utils/fn/login_fn')


/* GET users listing. */
// 登录
router.post('/', loginFn);

//验证码
router.get("/captchapng", captchapngFn)

//验证验证码
router.get('/verification',  verificationFn)

module.exports = router;
