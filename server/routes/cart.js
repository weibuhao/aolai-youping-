const {
  cartData,
  addCart,
  updateGoods,
  cartGoodsDelete
} = require('../utils/fn/cart_fn')

var express = require('express');
var router = express.Router();

//cart数据
router.get('/data', cartData)

//添加购物车
router.post('/add',addCart)

//更新购物车商品状态
router.post('/update/goods',updateGoods)

//删除购物车商品
router.delete('/delete',cartGoodsDelete)

module.exports = router;
