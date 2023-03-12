const {
  db,
  errMessage
} = require('../../db')

// 获取tabs
const getTabs = (req, res, next) => {
  db.query('select id, name from tabs', (err, results) => {
    errMessage(err)
    res.send({
      code: 0,
      data: results
    })
  })
}

//获取商品列表
const goodsList = (req, res, next) => {
  if (req.query.tabs_id == undefined || req.query.page == undefined) return res.status(404).jsonp({
    error: '参数错误'
  })

  const {
    tabs_id,
    page,
    quantity = 4
  } = req.query

  const data = {
    code: 0
  }

  let library = tabs_id == '0' ? 'goods' : 'goods_form'
  db.query(`select count(*) total from ${library} where tabs_id=${tabs_id}`,
    async (err, results) => {
      errMessage(err)
      data.total = await results[0].total
    }
  )


  db.query(
    `select * from ${library} where tabs_id=${tabs_id}  limit ${quantity} offset ${(page-1) *quantity} `,
    async (err, results) => {
      errMessage(err)
      data.data = await results
      return res.send(data)
    }
  )
}

//获取以三为倍速的商品列表
const goodsThree = (req, res, next) => {
  const {
    tabs_id,
    name
  } = req.query
  let class_name = ''
  if (tabs_id == '1') class_name = '鞋'

  db.query(
    `select * from goods_form where name like '%${name}%' and  name like '%${class_name}%' and tabs_id=${tabs_id} limit 9`,
    async (err, result) => {
      errMessage(err)
      res.send(await result)
    })

}

//获取商品详情
const goodsDetails = (req, res, next) => {

  const {
    goods_id,
    tabs_id = ''
  } = req.query
  let form = 'goods_form'

  if (tabs_id == '0') form = 'goods'

  db.query(`select * from ${form} where goods_id=${goods_id}  `, async (err,
  result) => {
    errMessage(err)
    let data = await result[0]
    res.send(data)
  })
}

module.exports = {
  getTabs,
  goodsList,
  goodsThree,
  goodsDetails
};
