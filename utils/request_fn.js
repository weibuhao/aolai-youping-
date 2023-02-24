import {
  delayNavigate
} from '@/utils/timeGoto.js'


//请求时做的操作
export const reqInterceptFn = (options, tokenVal) => {
  if (uni.getStorageSync(tokenVal)) {
    const token = uni.getStorageSync(tokenVal)
    options.header.Authorization = `Bearer ${token}`
  }
}

//响应时做的操作
export const resInterceptFn = (options, tokenVal,userState) => {
  //当有头有携带token 时将他存储起来
  if (options.header.Authorization) {
    uni.setStorageSync(tokenVal, options.header.Authorization)
    uni.setStorageSync('token_state', true)
  }

  //当验证身份出错时，要重新登录
  if (options.statusCode == 401) {
    uni.removeStorageSync(tokenVal)
    uni.setStorageSync('token_state', false)
    uni.$emit('updateToken')
    if (userState) return
    delayNavigate()
  }
}
