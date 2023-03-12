var express = require('express');
var router = express.Router();
const {userInfo} = require('../utils/fn/user_fn')


/* GET users listing. */
//用户信息
router.get('/info',userInfo);

module.exports = router;
