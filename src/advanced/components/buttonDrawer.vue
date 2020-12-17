<template>
  <div class="button-drawer-warp">
    <el-button
      class="toggle-btn"
      :size="data.field.props.size"
      :style="styles"
      :class="data.field.props.className"
      :plain="data.field.props.plain"
      :disabled="data.field.props.disabled"
      :round="data.field.props.round"
      :type="data.field.props.type"
      :circle="data.field.props.circle"
      @click="handleToggleDrawer"
    >
      {{ data.field.name }} <i class="el-icon-d-arrow-left fs-14" :class="iconClass" />
    </el-button>
    <el-collapse-transition>
      <div v-show="drawerVisible" class="drawer-area" :class="drawerClass">
        <div class="place-box" />
        <draggable v-model="data.field.children" v-bind="dragOptions" :style="drawerStyle" class="field-box" :data-parent="data.elementId" @add="onFieldAdd">
          <drag-component v-for="item in data.field.children" :key="item.elementId" :field="item" :element-id="item.elementId" />
        </draggable>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mapGetters, mapMutations } from 'vuex'
import { formatFormItem, removeAllNonItem } from '../../utils/global'
import _ from 'loadsh'
import { parseStyles } from '../../utils/style'
export default {
  components: {
    draggable
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
      drawerVisible: false
    }
  },
  computed: {
    ...mapGetters(['collection']),
    drawerClass() {
      return this.data.field.children.length === 0 ? 'no-field' : ''
    },
    styles() {
      return parseStyles(this.data.field.styles, this.data.field.props)
    },
    drawerStyle() {
      const style = {}
      if (this.drawerVisible) {
        style.height = 'auto'
      }
      return style
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
  methods: {
    ...mapMutations({
      addFormItemToDrawer: 'ADD_DRAWER_FORM_ITEM'
    }),
    handleToggleDrawer() {
      this.drawerVisible = !this.drawerVisible
    },
    onFieldAdd(data) {
      removeAllNonItem()
      const isSort = data.item.className.includes('form-drag-warp')
      if (isSort) return
      const id = data.item.getAttribute('field-id')
      const parentId = data.to.getAttribute('data-parent')
      const field = formatFormItem(_.cloneDeep(this.collection.find(item => item.id === id)))
      field.parentId = parentId
      field.parentType = 'buttonDrawer'
      const obj = {
        parentId,
        field,
        index: data.newIndex
      }
      this.addFormItemToDrawer(obj)
    }
  }
}
</script>

<style lang="scss">
  .button-drawer-warp {
    .el-icon-d-arrow-left {
      transform: rotate(270deg);
      font-weight: 500;
      &.active {
        transform: rotate(90deg);
      }
    }
    .toggle-btn {
      margin-bottom: 5px;
    }
    .drawer-area {
      border: 1px dashed $border;
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
      }
    }
  }
</style>
