<template>
  <div class="scm-nav-warp" :style="styles">
    <div class="left-area">
      <draggable-box :data="data"></draggable-box>
    </div>
    <div class="right-area">
      <div class="menu-list">
        <div v-for="item in data.field.options" :key="item.value" :class="item.label === active ? 'current' : ''" class="item" @click="handleClick(item.label)">
          <i :class="item.value" class="menu-icon" />
          <span class="menu-name">{{ item.label }}</span>
          <div class="line" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      active: ''
    }
  },
  computed: {
    styles() {
      return this.parseStyles(this.data.field.styles, this.data.field.props)
    }
  },
  methods: {
    handleClick(item) {
      this.active = item
    }
  }
}
</script>

<style lang="scss">
.scm-nav-warp {
  display: flex;
  background-color: rgba(255, 255, 255, 0.6);
  box-shadow: rgba(0,0,0,0.1) 1px 2px 3px;
  position: relative;
  z-index: 1;
  justify-content: space-between;
  height: 68px;
  .left-area {
    min-width: 36%;
    flex-shrink: 0;
    position: relative;
    height: 100%;
    .form-drag-warp {
      height: 100%;
    }
  }
  .right-area {
    display: flex;
    align-items: center;
    height: 100%;
    .menu-list {
      display: flex;
      align-items: center;
      height: 100%;
      color: $mainFontColor;
      .item {
        height: 100%;
        display: flex;
        align-items: center;
        margin-right: 20px;
        cursor: pointer;
        position: relative;
        .line {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background-color: #E90036;
          width: 0;
          transition: .4s ease all;
        }
        &.current {
          .line {
            width: 100%;
          }
        }
        &:hover {
          .line {
            width: 100%;
          }
        }
        .menu-icon {
          font-size: 20px;
          margin-right: 5px;
          color: $generalFontColor;
        }
        .menu-name {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
