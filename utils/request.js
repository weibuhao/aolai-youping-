import {
  $http
} from "@escook/request-miniprogram"

import {
  reqInterceptFn,
  resInterceptFn
} from './request_fn.js'

import store from '@/store/user.js'
uni.$http = $http
$http.baseUrl = 'http://192.168.132.189:3000'

let userState = false

//请求拦截器
$http.beforeRequest = function(options) {
  options.url.includes('user') ? userState = true : userState = false
  // #ifndef MP-WEIXIN
  reqInterceptFn(options, 'token')
  // #endif

  // #ifdef MP-WEIXIN
  reqInterceptFn(options, 'wx_token')
  // #endif
}

$http.afterRequest = function(options) {

  // #ifndef MP-WEIXIN
  resInterceptFn(options, 'token', userState)
  // #endif

  // #ifdef MP-WEIXIN
  resInterceptFn(options, 'wx_token', userState)
  // #endif

}
