<template>
  <div class="scm-nav-warp" :style="styles">
    <draggable class="left-area" :data-parent="data.elementId" v-bind="dragOptions" :class="logoAreaClass" @add="onAdd">
      <drag-component v-for="item in data.field.children" :key="item.elementId" :field="item" :element-id="item.elementId" />
    </draggable>
    <div class="right-area">
      <div class="menu-list">
        <div v-for="item in data.field.options" :key="item.value" :class="item.label === current ? 'current' : ''" class="item" @click="handleClick(item.label)">
          <i :class="item.value" class="menu-icon" />
          <span class="menu-name">{{ item.label }}</span>
          <div class="line" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parseStyles } from '../../../utils/style'
import draggable from 'vuedraggable'
import { formatFormItem, removeAllNonItem } from '../../../utils/global'
import _ from 'loadsh'
import { mapGetters, mapMutations } from 'vuex'
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
      current: ''
    }
  },
  computed: {
    ...mapGetters(['collection']),
    styles() {
      return parseStyles(this.data.field.styles, this.data.field.props)
    },
    logoAreaClass() {
      return this.data.field.children.length === 0 ? 'no-field' : ''
    },
    dragOptions() {
      return {
        animation: 0,
        group: 'component',
        handle: '.move-bar'
      }
    }
  },
  methods: {
    ...mapMutations({
      addFormItemToForm: 'ADD_FORM_ITEM_TO_FORM'
    }),
    handleClick(item) {
      this.current = item
    },
    onAdd(data) {
      removeAllNonItem()
      const isSort = data.item.className.includes('container-drag-warp')
      if (isSort) return
      const id = data.item.getAttribute('field-id')
      const parentId = data.to.getAttribute('data-parent')
      const field = formatFormItem(_.cloneDeep(this.collection.find(item => item.id === id)))
      field.parentId = parentId
      field.parentType = 'container'
      const obj = {
        parentId,
        field,
        index: data.newIndex
      }
      console.log(obj)
      this.addFormItemToForm(obj)
    }
  }
}
</script>

<style lang="scss">
  .scm-nav-warp {
    display: flex;
    align-items: center;
    height: 68px;
    background-color: rgba(255, 255, 255, 0.6);
    box-shadow: rgba(0,0,0,0.1) 1px 2px 3px;
    position: relative;
    z-index: 1;
    justify-content: space-between;
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
