const {
  goodsTips,
  goodsList
} = require('../utils/fn/search_fn')

var express = require('express');
var router = express.Router();

//搜索提示
router.get('/goods/tips', goodsTips)

// 搜索商品列表
router.get('/goods/list', goodsList)

module.exports = router;
