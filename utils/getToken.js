export const getToken = () => {

  // #ifndef MP-WEIXIN
  return uni.getStorageSync('token')
  // #endif
  // #ifdef MP-WEIXIN
  return uni.getStorageSync('wx_token')
  // #endif

}
