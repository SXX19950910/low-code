<template>
  <draggable v-model="data.field.children" tag="el-form" class="form-layout-warp" :style="styles" :class="formClass" v-bind="dragOptions" :data-parent="data.elementId" :component-data="getColComponentData()" @add="onFormLayoutAdd">
    <drag-component v-for="item in data.field.children" :key="item.elementId" :field="item" :element-id="item.elementId" @click.native.stop="handleFieldClick(item)" />
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import { mapGetters, mapMutations } from 'vuex'
import { formatFormItem, removeAllNonItem } from '../utils/global'
import _ from 'loadsh'
import { parseStyles } from '../utils/style'
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
    return {}
  },
  computed: {
    ...mapGetters(['collection']),
    formClass() {
      return this.data.field.children.length === 0 ? 'no-field' : ''
    },
    styles() {
      return parseStyles(this.data.field.styles, this.data.field.props)
    },
    dragOptions() {
      return {
        group: {
          name: 'component'
        },
        animation: 250
      }
    }
  },
  methods: {
    ...mapMutations({
      addFormItemToForm: 'ADD_FORM_ITEM_TO_FORM'
    }),
    onFormLayoutAdd(data) {
      removeAllNonItem()
      const isSort = data.item.className.includes('form-drag-warp')
      if (isSort) return
      const id = data.item.getAttribute('field-id')
      const parentId = data.to.getAttribute('data-parent')
      const field = formatFormItem(_.cloneDeep(this.collection.find(item => item.id === id)))
      field.parentId = parentId
      field.parentType = 'form'
      const obj = {
        parentId,
        field,
        index: data.newIndex
      }
      this.addFormItemToForm(obj)
    },
    getColComponentData() {
      const { labelPosition, labelWidth, size, statusIcon } = this.data.field.props
      const model = {
      }
      return {
        props: {
          labelPosition,
          labelWidth,
          size,
          statusIcon,
          model
        }
      }
    },
    handleFieldClick() {
    }
  }
}
</script>

<style lang="scss">
  .form-layout-warp {
    min-height: 40px;
    position: relative;
  }
</style>
