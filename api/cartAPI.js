export const getCartData = () => {
  return uni.$http.get('/cart/data')
}

//添加购物车
export const addCart = (data) => {
  return uni.$http.post('/cart/add', {
    data
  })
}

// 更新商品的数量
export const updateCount = (goods_id = null, tabs_id = null, val) => {
  return uni.$http.post('/cart/update/goods', {
    goods_id,
    tabs_id,
    val
  })
}

//删除商品

export const deleteGoods = (goodsList = null) => {
  return uni.$http.delete('/cart/delete', {
    goodsList
  })
}
