<template>
  <div class="yl-drawer-warp">
    <div v-if="shadeVisible" class="drawer-shade-box" />
    <div v-if="visible" ref="content" :style="drawerStyle" class="drawer-content">
      <div class="title-area" @mousedown.stop="onMouseDown">
        <span class="name">{{ title }}</span>
        <div class="right-handle">
          <i class="el-icon-more mr-5" />
          <i class="el-icon-close" @click.stop="handleClose" />
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
import { on, off } from '@/utils/dom'
export default {
  props: {
    modal: {
      type: Boolean,
      default: true
    },
    size: {
      type: [String, Number],
      default: '256'
    },
    title: {
      type: String,
      default: ''
    },
    placement: {
      type: String,
      default: 'bottom',
      validator(value) {
        return ['top', 'left', 'bottom', 'right'].includes(value)
      }
    },
    minSize: {
      type: Number,
      default: 100
    },
    maxSize: {
      type: Number,
      default: 800
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      downX: '',
      downY: '',
      height: '',
      downHeight: '',
      downWidth: ''
    }
  },
  computed: {
    drawerStyle() {
      const style = {}
      const { placement, height } = this
      const isY = ['top', 'bottom'].includes(placement)
      if (isY) {
        style.height = `${height}px`
        style.width = '100%'
        style.bottom = '0'
        style.left = '0'
      }
      return style
    },
    isY() {
      return ['top', 'bottom'].includes(this.placement)
    },
    isX() {
      return ['left', 'right'].includes(this.placement)
    },
    shadeVisible() {
      return this.visible && this.modal
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.height = this.size.toString()
    },
    handleClose() {
      this.$emit('update:visible', false)
    },
    onMouseDown(e) {
      const { clientX, clientY } = e
      const $content = this.$refs.content
      this.downX = clientX
      this.downY = clientY
      this.downHeight = $content.offsetHeight
      this.downWidth = $content.offsetWidth
      on(document, 'mousemove', this.onMouseMove)
      on(document, 'mouseup', this.onMouseUp)
    },
    onMouseUp() {
      this.downX = ''
      this.downY = ''
      off(document, 'mousemove', this.onMouseMove)
    },
    inputHeight(max, min, height) {
      if (height >= max) {
        this.height = max
      } else if (height <= min) {
        this.height = min
      } else {
        this.height = height
      }
    },
    inputWidth(max, min, width) {
      if (width >= max) {
        this.width = max
      } else if (width <= min) {
        this.width = min
      } else {
        this.width = width
      }
    },
    onMouseMove(e) {
      const max = this.maxSize
      const min = this.minSize
      const downHeight = Number(this.downHeight)
      const downWidth = Number(this.downWidth)
      const moveX = this.downX - e.clientX
      const moveY = this.downY - e.clientY
      const moveHeight = downHeight + moveY
      const moveWidth = downWidth + moveX
      if (this.isY) this.inputHeight(max, min, moveHeight)
      else if (this.isX) this.inputWidth(max, min, moveWidth)
    }
  }
}
</script>

<style lang="scss">
  .yl-drawer-warp {
    .drawer-shade-box {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2001;
      background-color: rgba(255, 255, 255, .4);
    }
    .drawer-content {
      position: absolute;
      background-color: white;
      z-index: 2001;
      border: 1px solid $border;
      .title-area {
        height: 32px;
        background-color: $lightBackground;
        font-size: 14px;
        color: $mainFontColor;
        display: flex;
        align-items: center;
        padding: 0 15px;
        border-bottom: 1px solid $border;
        justify-content: space-between;
        cursor: ns-resize;
        user-select: none;
        box-shadow: 0 0 8px #C0C4CC;
        .el-icon-close {
          font-size: 18px;
          @include hover-color($info, $skyBlue);
        }
        .el-icon-more {
          transform: rotate(90deg);
          font-size: 16px;
          @include hover-color($info, $skyBlue);
          position: relative;
          top: -1px;
        }
      }
    }
  }
</style>
