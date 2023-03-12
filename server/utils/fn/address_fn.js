const {
  db,
  errMessage
} = require('../../db')

const JWT = require('../jwt')

//让全部地址状态都变成false
const upAddressState = (user) => {
  db.query('update address set addressState = false where user=?', [user], (err) =>
    errMessage(err))
}

//插入地址数据
const saveAddress = (req, res, next) => {
  // 用户
  const user = JWT.verify(req.headers.authorization.split(' ')[1]).user

  // 地址数据
  const {
    id = null,
      consignee,
      contactCode,
      addressType,
      addressDetailed,
      addressArea,
      addressState
  } = req.body

  //查询是否已经有该地址
  db.query(
    'select * from address where consignee = ? and contactCode = ?  and addressDetailed = ? and addressArea = ?  and user = ? ',
    [consignee,
      contactCode,
      addressDetailed,
      addressArea,
      user
    ],

    async (err, result) => {
      errMessage(err)
      //插入的地址是默认的 让全部地址状态都变成false
      if (addressState) upAddressState(user)
      //没有该地址就添加，有就告诉用户已经有该地址
      if (await result.length == 0 && id == null) {
        db.query(
          'insert into address (id , consignee,contactCode,addressType,addressDetailed,addressArea,addressState,user) values (uuid(),?,?,?,?,?,?,?)',
          [consignee,
            contactCode,
            addressType,
            addressDetailed,
            addressArea,
            addressState, user
          ], async (err, result_2) => {
            errMessage(err)

            if (await result_2.affectedRows !== 0) {
              res.send({
                ok: 1
              })

            } else {
              res.send({
                ok: 0
              })
            }
          })
        // 修改地址时会有id传过来
      } else if (await result.length == 0 && id !== null) {
        db.query(
          'update address set consignee= ? , contactCode=? , addressType=? , addressDetailed=?,addressArea=?,addressState=? where id=? and user= ?',
          [consignee, contactCode, addressType, addressDetailed, addressArea, addressState, id, user], async (
            err,
            result) => {
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
            return
          })
        //修改地址
      } else {
        return res.send({
          ok: 0,
          errMessage: '您已经有该地址了'
        })
      }
      return
    }
  )


}

//获取地址数据
const getAddressList = (req, res, next) => {
  const user = JWT.verify(req.headers.authorization.split(' ')[1]).user
  db.query(
    'select id, consignee, contactCode, addressType, addressDetailed, addressArea, addressState from address where  user = ? ORDER BY addressState DESC',
    [
      user
    ],
    async (err, result) => {
      errMessage(err)
      const data = await result
      data.forEach(item => {
        item.addressState == 1 ? item.addressState = true : item.addressState = false
      })
      res.send(data)
    })
}

//删除地址数据
const deleteAddress = (req, res, next) => {
  const user = JWT.verify(req.headers.authorization.split(' ')[1]).user
  const {
    id
  } = req.body

  db.query('delete from address where id=? and user=?', [id, user], async (err, result) => {
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
    return
  })

}

//更新地址状态
const updateAddressState = (req, res, next) => {
  const user = JWT.verify(req.headers.authorization.split(' ')[1]).user
  const {
    id
  } = req.body
  //让全部地址状态都变成false
  upAddressState(user)
  db.query('update address set addressState =true where user=? and id=?', [user, id], async (err, result) => {
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
    return
  })
}

module.exports = {
  saveAddress,
  getAddressList,
  deleteAddress,
  updateAddressState
};
