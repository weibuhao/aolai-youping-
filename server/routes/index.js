const {
  getTabs,
  goodsList,
  goodsThree,
  goodsDetails
} = require('../utils/fn/index_fn')

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

//获取tabs
router.get('/tabs', getTabs);

// 获取商品列表
router.get('/goods/list', goodsList)


//获取三为倍速的列表
router.get('/goods/three', goodsThree)

//获取商品详情
router.get('/goods/details', goodsDetails)

module.exports = router;
