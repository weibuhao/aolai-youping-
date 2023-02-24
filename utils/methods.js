//封装弹框
uni.$showMsg = function(title = '数据请求失败！', icon = 'none', duration = 1500) {
  uni.showToast({
    title,
    icon,
    duration
  })
}
