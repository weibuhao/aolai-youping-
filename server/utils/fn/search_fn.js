const {
  db,
  errMessage
} = require('../../db')

//搜索提示
const goodsTips = (req, res, next) => {
  const {
    name
  } = req.query

  db.query(`select * from search_tips where name like '%${name}%'`, async (err, result) => {
    errMessage(err)
    let data = []


    await result.forEach(item => {
      data.push(item.name)
    })
    res.send(data)
  })

}

// 搜索商品列表
const goodsList = (req, res, next) => {
  const {
    name,
    page,
    condition = '',
    quantity = 8,
  } = req.query

  let orde = ''

  if (condition !== '') {
    let {
      factor,
      sort = ''
    } = JSON.parse(condition)
    orde = `ORDER by ${factor} ${sort}`
  }

  let data = {}

  db.query(`select COUNT(*) total from goods_form where name like ? ${orde} `, [
    `%${name}%`
  ], async (err, result) => {
    errMessage(err)
    data.total = result[0].total
  })

  db.query(
    `select goods_id,img,name,price, discount from goods_form where name like ? ${orde} limit ? offset ? `,
    [
      `%${name}%`, quantity, ((page - 1) * quantity)
    ], async (err, result) => {
      errMessage(err)
      data.data = await result

    })
  setTimeout(() => res.send(data), 300)
}

module.exports = {
  goodsTips,
  goodsList
};
