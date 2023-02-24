import {
  saveAddress,
  getAddressList,
  upAddressState,
  deleteAddress
}
from '@/api/addressAPI.js'
export default {
  state: {
    addressList: []
  },
  getters: {

  },
  mutations: {

    upAddressList(state, val) {
      state.addressList = val
    }

  },
  actions: {
    //获取地址列表
    async reqGetaddresList(context) {
      const {
        data: res
      } = await getAddressList()
      context.commit('upAddressList', res)
    },

    //保存地址
    async reqSaveAddress(context, data) {
      const {
        data: res
      } = await saveAddress(data)
      context.state.addressList.forEach(item => {
        item.addressState = false
      })
      context.dispatch('reqGetaddresList')
      return res
    },

    //修改默认地址
    reqUpAddressState(context, id) {
      const {
        state,

      } = context
      state.addressList.forEach(item => {
        item.addressState = false
        if (item.id == id) item.addressState = true
      })
      upAddressState(id)
    },

    //删除地址
    reqDeleteAddress(context, address) {
      const {
        dispatch,
        state
      } = context
      deleteAddress(address.id).then(res => {
        dispatch('reqGetaddresList').then(() => {
          if (address.addressState) state.addressList.length !== 0 && dispatch('reqUpAddressState', state
            .addressList[0].id)
        })

      })
    }
  }
}
