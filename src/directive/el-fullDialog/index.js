import full from './full'

const install = function(Vue) {
  Vue.directive('el-full-dialog', full)
}
full.install = install
export default full
