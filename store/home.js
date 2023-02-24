import {
  getTabsData,
} from '@/api/homeAPI.js'
export default {
  state: {
    tabsData: [],
    loaderShow: true
  },
  getters: {

  },
  mutations: {
    updateDate(state, data) {
      state.tabsData.push(data)
      state.loaderShow = false
    }
  },
  actions: {
    async reqTabsData(context, tabsID) {
      const {
        state
      } = context
      //如果是第一次记载就发起请求
      if (state.tabsData.length !== 0) {
        let exist = false
        state.tabsData.forEach(item => {
          //有数据就不请求
          if (item.id == tabsID) exist = true
        })
        //有数据就不请求直接返回
        if (exist) return
      }
      context.state.loaderShow = true
      const {
        data: res
      } = await getTabsData(tabsID)
      const data = {
        id: tabsID,
        data: res
      }

      context.commit('updateDate', data)

    }
  }
}
