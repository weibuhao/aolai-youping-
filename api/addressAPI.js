//获取地址
export const getAddressList = (data) => {
  return uni.$http.get('/address/list', data)
}

//保存地址
export const saveAddress = (data) => {
  return uni.$http.post('/address/save', data)
}

//更新地址状态
  
export const upAddressState=(id)=>{
  return uni.$http.post('/address/state', {id})
}


//删除地址
export const deleteAddress = (id) => {
  return uni.$http.delete('/address/delete', {id})
}
