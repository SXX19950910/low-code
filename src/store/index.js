import Vue from 'vue'
import Vuex from 'vuex'
import lowCode from './modules/lowCode'
import getters from './getters'
import mutations from './mutations'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    lowCode
  },
  getters,
  mutations
})

export default store
