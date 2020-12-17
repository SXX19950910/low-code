<template>
  <div class="form-drag-warp" :class="warpClass" @click.stop="onClick">
    <div class="right-tools">
      <div class="move-bar item">
        <i class="el-icon-rank" />
      </div>
      <div class="copy-bar item" @click.stop="handleCopyField">
        <i class="el-icon-copy-document" />
      </div>
      <div class="remove-bar item" @click.stop="handleDeleteField">
        <i class="el-icon-close" />
      </div>
    </div>
    <div class="bottom-tools">
      <div class="name item">{{ field.type }}</div>
    </div>
    <component :is="`${field.type}Item`" ref="item" :data="field" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import dateItem from './date'
import inputItem from './input'
import chooseItem from './choose'
import selectItem from './select'
import groupItem from './group'
import radioGroupItem from './radioGroup'
import checkboxItem from './checkbox'
import timeItem from './time'
import gridItem from './grid'
import textareaItem from './textarea'
import addressBookItem from './addressBook'
import dateAreaItem from './dateArea'
import buttonItem from './button'
import configTableItem from '../advanced/components/configTable'
import buttonDrawerItem from '../advanced/components/buttonDrawer'
import formLayoutItem from './formLayout'
import scmNavItem from '../scm/components/nav'
import containerItem from './container'
import carouselItem from './carousel'
import richTextItem from '../advanced/components/richText'
import slideDisplayItem from '../advanced/components/slideDisplay'
import _ from 'loadsh'
import { updateFormItemId } from '@/ylCommon/utils'
export default {
  components: {
    dateItem,
    containerItem,
    richTextItem,
    carouselItem,
    scmNavItem,
    inputItem,
    chooseItem,
    selectItem,
    groupItem,
    radioGroupItem,
    checkboxItem,
    timeItem,
    gridItem,
    textareaItem,
    addressBookItem,
    dateAreaItem,
    buttonItem,
    configTableItem,
    buttonDrawerItem,
    formLayoutItem,
    slideDisplayItem
  },
  props: {
    elementId: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: true
    },
    field: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['currentFormItem', 'collection']),
    warpClass() {
      const result = []
      if (this.currentFormItem.elementId === this.field.elementId) result.push('active')
      if (this.field.field.visible === false) result.push('hide-drag')
      result.push(`${this.field.type}`)
      return result
    }
  },
  methods: {
    ...mapMutations({
      deleteFormItem: 'DELETE_FORM_ITEM',
      setCurrentFormItem: 'SET_CURRENT_FORM_ITEM',
      copyFormItem: 'COPY_FORM_ITEM'
    }),
    onClick() {
      this.setCurrentFormItem(this.field)
    },
    handleDeleteField() {
      this.setCurrentFormItem('')
      this.deleteFormItem(this.field.elementId)
    },
    handleCopyField() {
      const field = updateFormItemId(_.cloneDeep(this.field))
      const data = {
        elementId: this.field.elementId,
        field
      }
      this.copyFormItem(data)
    },
    init() {
      this.$refs.item.init()
    },
    onAddGridField(id, elementId) {
      this.$emit('add-grid-field', id, elementId)
    }
  }
}
</script>

<style lang="scss">
  .form-drag-warp {
    padding: 4px;
    border-radius: 2px;
    border: 1px dashed $border;
    margin-bottom: 2px;
    position: relative;
    transition: background-color .2s ease;
    z-index: 1;
    &:hover {
      background-color: $light-blue;
    }
    &.active {
      &:after {
        content: '';
        position: absolute;
        width: calc(100% + 1px);
        height: calc(100% + 1px);
        top: 0;
        left: 0;
        border: 1px solid $skyBlue;
        border-radius: 2px;
      }
      & > .right-tools {
        display: block;
      }
      & > .bottom-tools {
        display: block;
      }
    }
    .right-tools {
      position: absolute;
      right: -1px;
      top: 0;
      display: none;
      z-index: 100;
      opacity: .8;
      .item {
        width: 24px;
        height: 24px;
        text-align: center;
        line-height: 24px;
        background-color: $skyBlue;
        color: white;
        float: left;
        font-size: 14px;
        position: relative;
        border-right: 1px solid #489DEA;
        cursor: pointer;
        .el-icon-rank {
          font-size: 14px;
        }
        &.move-bar {
          cursor: move;
          border-bottom-left-radius: 4px;
        }
        &.remove-bar {
        }
        &:last-of-type {
          border-right: none;
        }
        &:hover {
          background-color: #0086FF;
        }
      }
      &:hover {
        opacity: 1;
      }
    }
    .bottom-tools {
      position: absolute;
      left: 0;
      bottom: 0;
      display: none;
      z-index: 100;
      opacity: .8;
      .item {
        &.name {
          background-color: $skyBlue;
          padding: 4px;
          color: white;
          font-size: 12px;
          border-top-right-radius: 2px;
        }
      }
    }
    &.hide-drag {
      background-color: #FEF0F0 !important;
    }
    &.button {
      display: inline-block;
      min-width: 120px;
    }
  }
</style>
