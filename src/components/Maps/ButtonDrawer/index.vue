<template>
  <div v-show="data.field.visible" class="button-drawer-warp">
    <el-button
        class="toggle-btn"
        :size="data.field.props.size"
        :class="data.field.props.className"
        :plain="data.field.props.plain"
        :disabled="data.field.props.disabled"
        :round="data.field.props.round"
        :circle="data.field.props.circle"
        :type="data.field.props.type"
        @click="handleToggleDrawer"
    >
      {{ data.field.name }} <i class="el-icon-d-arrow-left fs-14" :class="iconClass" />
    </el-button>
    <el-collapse-transition v-if="isDev">
      <div v-show="drawerVisible" class="drawer-area" :class="drawerClass">
        <div class="place-box" />
        <draggable v-model="data.field.children" v-bind="dragOptions" class="field-box" :data-parent="data.elementId">
          <drag-component v-for="item in data.field.children" :key="item.elementId" :field="item" :element-id="item.elementId" />
        </draggable>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    isDev: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      drawerVisible: false,
      props: {}
    }
  },
  computed: {
    drawerClass() {
      return this.data.field.children.length === 0 ? 'no-field' : ''
    },
    iconClass() {
      return this.drawerVisible ? 'active' : ''
    },
    dragOptions() {
      return {
        animation: 200,
        group: 'component',
        handle: '.move-bar'
      }
    }
  },
  created() {
    this.props.size = this.data.field.props.size
  },
  methods: {
    handleToggleDrawer() {
      this.drawerVisible = !this.drawerVisible
    }
  }
}
</script>

<style lang="scss">
.button-drawer-warp {
  .el-icon-d-arrow-left {
    transform: rotate(270deg);
    font-weight: 500;
    transition: all .2s;
    &.active {
      transform: rotate(90deg);
    }
  }
  .toggle-btn {
    margin-bottom: 5px;
  }
  .drawer-area {
    border: 1px dashed #e4e7ed;
    position: relative;
    box-sizing: content-box;
    .place-box {
      height: 40px;
      position: absolute;
      width: calc(100% - 10px);
      z-index: -1;
    }
    .field-box {
      min-height: 40px;
      height: auto;
    }
  }
}
</style>
