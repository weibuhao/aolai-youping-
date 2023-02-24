//获取tabs
export const getTabs = () => {
  return uni.$http.get('/tabs')
}

//获取tabs对应页面的数据
export const getTabsData = (tabsID) => {
  return uni.$http.get('/home/tabs/data', {
    tabsID
  })
}

//获取商品列表
export const getGoodsList = (tabs_id, page, quantity = 4) => {
  return uni.$http.get('/goods/list', {
    tabs_id,
    page,
    quantity
  })
}

//获取三列表
export const getThreeList = (tabs_id, name) => {
  return uni.$http.get('/goods/three', {
    tabs_id,
    name
  })
}
