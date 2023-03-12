const {
  db,
  errMessage
} = require('../../db')

// 获取tabs数据
const tabsData = (req, res, next) => {
  if (!req.query.tabsID) return res.send(404)
  const tabsID = req.query.tabsID
  // 要返回的数据
  const data = {}

  // 轮播图 
  db.query(`select img_id, img_name from swiper where swiper.tabs_id=${tabsID}`, async (err, results) => {
    errMessage(err)
    data.swiper = await results
  })

  if (tabsID !== '0') {
    let id = tabsID == '1' ? '0' : tabsID
    db.query(`select * from nav_img where tabs_id=${id} `, async (err, result) => {
      errMessage(err)
      data.nav = await result
    })
  }

  switch (tabsID) {
    case '0': {
      // 大图与小图
      db.query(`select id, big_img from big_img where big_img.tabs_id=${tabsID}`, async (err, results) => {
        errMessage(err)
        //小图
        await results.forEach((item, index) => {
          db.query(`select goods_id, small_img from small_img where small_img.img_id=${item.id}`,
            async (
              err,
              Sresults) => {
              errMessage(err)
              item.small_img = await Sresults
            })
        })
        data.img_list = await results
      })

    }
    break;
  case '1': {
    db.query(`select goods_id,img_name from motion_data_img where tabs_id=${tabsID} `, async (err, result) => {
      errMessage(err)
      data.brand = await result
    })
  }
  break;
  case '2': {}
  break;
  case '3': {}
  break;
  case '4': {}
  break;
  case '5': {}
  break;
  default:
    res.send('暂无数据')
  }

  //等查询完赋值成功后返回值
  setTimeout(() => {
    res.send(data)
  }, 1000)
}

module.exports = {
  tabsData
};
