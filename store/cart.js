import {
  getCartData,
  addCart,
  updateCount,
  deleteGoods
} from '@/api/cartAPI.js'

export default {
  state: {
    cartData: []
  },
  getters: {
    cartCount: state => {
      let count = 0
      if (state.cartData.length == 0) return count
      state.cartData.forEach(item => {
        count += item.count
      })
      return count
    },

    cartAllState: state => {
      let goodsState = false
      if (state.cartData.length == 0) return goodsState
      state.cartData.some(item => item.state == false) ? goodsState = false : goodsState = true
      return goodsState
    },

    cartTotalPrice: state => {
      let totalPrice = 0
      if (state.cartData.length == 0) return totalPrice
      state.cartData.forEach(item => {
        if (item.state) totalPrice += (item.price * item.count)
      })
      return totalPrice
    },

    carSelectList: state => {
      let list = []
      if (state.cartData.length == 0) return list
      state.cartData.forEach(item => {
        if (item.state) list.push(item)
      })
      return list
    },

  },
  mutations: {
    updateCartData(state, val) {
      state.cartData = val
    }
  },
  actions: {
    // 请求购物车数据
    async reqCartData(context) {
      const {
        data: res
      } = await getCartData()
        
      if (Array.isArray(res)) {
        context.commit('updateCartData', res)
      }
    },

    // 添加购物车数据
    async reqAddCart(context, data) {
      const {
        data: res
      } = await addCart(data)
      context.dispatch('reqCartData')
    },

    //更新购物车商品数量或购物车选中状态
    async reqUpdateGoods(context, {
      goods_id,
      tabs_id,
      count
    }) {
      const {
        data: res
      } = await updateCount(goods_id, tabs_id, count)
      context.dispatch('reqCartData')
    },

    //删除购物车商品
    async reqDeleteGoods(context, goodsList = null) {
      const {
        data: res
      } = await deleteGoods(goodsList)
      context.dispatch('reqCartData')
    }
  }
}
