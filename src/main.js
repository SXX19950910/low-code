import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import components from './components/Global/index'
import directives from '@/directive'
import mixin from '@/mixin/common'
import 'default-passive-events'
// 使用iconfont
import './icons/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

console.log(components)
// 注册全局组件
components.map(item => Vue.component(item.name, item.component))
// 注册ElementUi
Vue.use(ElementUI)
//注册全局指令
directives.map(item => Vue.use(item))
// 全局混入
Vue.use(mixin)


new Vue({
  mixins: [
      mixin
  ],
  render: h => h(App),
  router,
  store,
  created() {
    console.log(this)
  },
}).$mount('#app')
