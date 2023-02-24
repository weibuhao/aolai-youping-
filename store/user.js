import {
  userInfo
}
from '@/api/userAPI.js'
export default {
  state: {
    // #ifndef MP-WEIXIN
    token: uni.getStorageSync('token'),
    // #endif 
    // #ifdef MP-WEIXIN
    wxToken: uni.getStorageSync('wx_token'),
    // #endif 
    tokenState: uni.getStorageSync('token_state') || JSON.stringify(null),
    userInfo: {}
  },
  getters: {

  },
  mutations: {
    updateToken(state, value) {
      // #ifndef MP-WEIXIN
      state.token = uni.getStorageSync('token')
      // #endif
      // #ifdef MP-WEIXIN
      state.wxToken = uni.getStorageSync('wx_token')
      // #endif 
      state.tokenState = uni.getStorageSync('token_state') || JSON.stringify(null)
    },

    updateUserInfo(state, value) {
      state.userInfo = value
    }

  },
  actions: {
    reqUserInfo(context) {
      const {
        commit
      } = context
      userInfo().then((res) => {
        // res.data.userInfo
        commit('updateUserInfo', res.data.userInfo)
      })
    }
  }
}
