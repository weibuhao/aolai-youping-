export const getSearchTips = (name) => {
  return uni.$http.get('/search/goods/tips', {
    name
  })
}


export const getSearchGoodsList = (name, page,
  condition = '') => {
  return uni.$http.get('/search/goods/list', {
    name,
    page,
    condition
  })
}

export const getGoodsDetails = (goods_id,tabs_id='') => {
  return uni.$http.get('/goods/details', {
   goods_id,
   tabs_id
  })
}
