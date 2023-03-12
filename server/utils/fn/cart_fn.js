const {
  db,
  errMessage
} = require('../../db')
const JWT = require('../jwt')

//获取购物车数据
const cartData = (req, res, next) => {
  const user = JWT.verify(req.headers.authorization.split(' ')[1]).user
  db.query('select * from cart where user= ? ', [user], async (err, result) => {
    errMessage(err)
    const data = await result

    data.forEach(item => {
      item.state == 1 ? item.state = true : item.state = false
    })
    res.send(data)
  })

  return
}

//添加购物车
const addCart = (req, res, next) => {
  const {
    goods_id,
    tabs_id
  } = req.body.data
  const user = JWT.verify(req.headers.authorization.split(' ')[1]).user

  db.query('select * from cart where goods_id= ? and tabs_id= ? and  user= ? ', [goods_id, tabs_id, user], async (err,
    result) => {
    errMessage(err)
    const data = await result
    //先判断购物车有没有这个商品，有就加商品数量
    if (data.length !== 0) {
      db.query('update cart set count = count+1 where goods_id= ? and tabs_id= ? and user= ? ', [goods_id,
        tabs_id, user
      ], async (err_2, result_2) => {
        errMessage(err)
        if (await result_2) {
          return res.send({
            ok: 2
          })

        } else {
          return res.send({
            ok: 0
          })
        }
      })
      //没有就添加商品
    } else {
      const {
        goods_id,
        tabs_id,
        img,
        name,
        discount,
        price,
        state = true,
        count = 1
      } = req.body.data
      db.query(
        'insert into cart (goods_id, tabs_id,img,name,discount,price ,state,user,count) values (?,?,?,?,?,?,?,?,?)',
        [goods_id, tabs_id,
          img,
          name,
          discount,
          price,
          state,
          user,
          count
        ], async (err_3, result_3) => {
          errMessage(err_3)
          if (await result_3) {
            return res.send({
              ok: 1
            })
          } else {
            return res.send({
              ok: 0
            })
          }
        })
    }
  })
}

// 更新商品状态
const updateGoods = (req, res, next) => {
  const {
    goods_id,
    tabs_id,
    val
  } = req.body
  const user = JWT.verify(req.headers.authorization.split(' ')[1]).user

  // 全选时更新
  if (!goods_id && !tabs_id) {
    db.query(`update cart set state = ? where user= ? `, [val, user], async (err, result) => {
      errMessage(err)
      if (await result) {
        return res.send({
          ok: 1
        })

      } else {
        return res.send({
          ok: 0
        })
      }

    })
    return
  }

  // 改变数量时或改变选中状态时
  let className = 'count'
  if (typeof req.body.val == 'number') {
    className = 'count'
  } else {
    className = 'state'
  }

  // 更新商品数量和状态
  db.query(`update cart set ${className} = ? where goods_id= ? and tabs_id= ? and user= ? `, [val, goods_id,
    tabs_id, user
  ], async (err, result) => {
    errMessage(err)

    if (await result) {
      return res.send({
        ok: 1
      })

    } else {
      return res.send({
        ok: 0
      })
    }

  })
}

//删除购物车商品
const cartGoodsDelete = (req, res, next) => {
  const {
    goodsList
  } = req.body
  const user = JWT.verify(req.headers.authorization.split(' ')[1]).user
  if (goodsList == null) {
    db.query('delete from cart where user= ? ', [user], async (err, result) => {
      errMessage(err)
      if (await result.affectedRows !== 0) {
        res.send({
          ok: 1
        })
      } else {
        res.send({
          ok: 0
        })
      }
    })

  } else {
    console.log(goodsList);
    let deleteState = true
    goodsList.forEach(item => {
      db.query('delete from cart where goods_id= ? and tabs_id= ? and user= ? ', [item.goods_id, item.tabs_id,
        user
      ], async (err, result) => {
        errMessage(err)
        await result.affectedRows == 0 ? deleteState = false : deleteState
      })
    })
    setTimeout(() => deleteState ? res.send({
      ok: 1
    }) : res.send({
      ok: 0
    }))
  }
  return
}
module.exports = {
  cartData,
  addCart,
  updateGoods,
  cartGoodsDelete
}
