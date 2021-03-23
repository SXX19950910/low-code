export default {
  bind(el, binding, vnode) {
    let toggleFlag = false
    const $title = el.querySelector('.el-dialog__title')
    const $toggle = document.createElement('div')
    $toggle.classList.add('dialog-full-btn')
    $toggle.innerHTML = `<i class="iconfont icon-fangda"></i>`
    $title && $title.insertAdjacentElement('afterend', $toggle)
    const $icon = $toggle.querySelector('.iconfont')
    const outTransition = () => {
      el.firstChild.classList.add('transition-3')
      setTimeout(() => {
        el.firstChild.classList.remove('transition-3')
      }, 300)
    }
    $toggle.addEventListener('click', function() {
      const className = toggleFlag ? 'iconfont icon-fangda' : 'iconfont icon-suoxiaotuichuquanpingshouhui'
      if (!toggleFlag) {
        el.firstChild.classList.add('el-full-dialog')
        $icon.setAttribute('class', className)
      } else {
        outTransition()
        el.firstChild.classList.remove('el-full-dialog')
        $icon.setAttribute('class', className)
      }
      toggleFlag = !toggleFlag
    })
  }
}
