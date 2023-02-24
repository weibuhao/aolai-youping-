import Vue from 'vue'
import Vuex from 'vuex'
import homeStore from './home.js'
import cartStore from './cart.js'
import userStore from './user.js'
import addressStore from './address.js'

Vue.use(Vuex)
	export default new Vuex.Store({
		modules:{
			homeStore,
      cartStore,
      userStore,
      addressStore
		}
	})
