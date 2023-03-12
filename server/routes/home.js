const {
  tabsData
} = require('../utils/fn/home_fn')

var express = require('express');
var router = express.Router();

//tabs数据
router.get('/tabs/data', tabsData)

module.exports = router;
