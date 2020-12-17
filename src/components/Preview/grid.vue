<template>
  <el-row class="grid-warp" tag="el-row" v-bind="dragOptions" :style="styles" :justify="data.field.props.justify" :gutter="data.field.props.gutter" :align="data.field.props.align" type="flex" @click.native.stop="onClick">
    <draggable
      v-for="(item, index) in data.field.children"
      :key="index"
      v-model="item.children"
      class="filed-box"
      tag="el-col"
      v-bind="dragOptions"
      :component-data="getColComponentData(item)"
      :data-parent="item.parentId"
      :data-id="item.elementId"
      :class="item.children.length === 0 ? 'no-field' : ''"
      @add="onGridAddField"
    >
      <template v-if="item.children.length > 0">
        <drag-component v-for="tag in item.children" :key="tag.elementId" :field="tag" :element-id="item.elementId" @click.native.stop="handleFieldClick(tag)" />
      </template>
    </draggable>
  </el-row>
</template>

<script>
import draggable from 'vuedraggable'
import { mapGetters, mapMutations } from 'vuex'
import { formatFormItem, removeAllNonItem } from '@/utils/global'
import _ from 'loadsh'
import { parseStyles } from '@/utils/style'
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
    }
  },
  computed: {
    ...mapGetters(['collection']),
    dragOptions() {
      return {
        animation: 0,
        group: 'component',
        handle: '.move-bar'
      }
    },
    styles() {
      return parseStyles(this.data.field.styles, this.data.field.props)
    }
  },
  methods: {
    ...mapMutations({
      addFormItemToGrid: 'ADD_FORM_ITEM_TO_GRID',
      setCurrentFormItem: 'SET_CURRENT_FORM_ITEM'
    }),
    getColComponentData(data) {
      return {
        props: {
          span: data.span
        }
      }
    },
    onGridAddField(data) {
      removeAllNonItem()
      const isSort = data.item.className.includes('form-drag-warp')
      if (isSort) return
      const id = data.item.getAttribute('field-id')
      const gridId = data.to.getAttribute('data-id')
      const parentId = data.to.getAttribute('data-parent')
      const field = formatFormItem(_.cloneDeep(this.collection.find(item => item.id === id)))
      field.parentId = gridId
      field.parentType = 'grid'
      const obj = {
        parentId,
        gridId,
        field,
        index: data.newIndex
      }
      this.addFormItemToGrid(obj)
    },
    handleFieldClick(current) {
      this.setCurrentFormItem(current)
    },
    onClick() {
      this.setCurrentFormItem(this.data)
    }
  }
}
</script>

<style lang="scss">
  .grid-warp {
    .filed-box {
      min-height: 60px;
      position: relative;
      border: 1px dashed $border;
      .form-drag-warp {
        margin-bottom: 0;
      }
    }
  }
</style>
