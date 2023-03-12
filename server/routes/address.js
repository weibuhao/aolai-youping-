var express = require('express');
var router = express.Router();
const {
  saveAddress,
  getAddressList,
  deleteAddress,
  updateAddressState
} = require('../utils/fn/address_fn')


//获取地址列表
router.get('/list', getAddressList);

//保存与编辑地址信息
router.post('/save', saveAddress);

//更新地址状态
router.post('/state', updateAddressState);

//删除
router.delete('/delete', deleteAddress);



module.exports = router;
