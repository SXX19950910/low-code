<template>
  <draggable v-model="data.field.children" :animation="200" group="component" handle=".move-bar" :tag="tag" class="draggable-wrap" :component-data="componentData" :class="data.field.children.length < 1 ? 'no-field' : ''" :data-parent="data.elementId" @add="onAdd">
    <drag-component v-for="(component) in data.field.children" :key="component.elementId" :field="component" :element-id="component.elementId" />
  </draggable>
</template>

<script>
import { formatFormItem, removeAllNonItem } from '@/utils/global'
import _ from 'loadsh'
export default {
  components: {
  },
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    componentData: {
      type: Object,
      default() {
        return {}
      }
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    onAdd(data) {
      removeAllNonItem()
      const isSort = data.item.className.includes('form-drag-warp')
      if (isSort) return
      const id = data.item.getAttribute('field-id')
      const parentId = data.to.getAttribute('data-parent')
      const field = formatFormItem(_.cloneDeep(this.collection.find(item => item.id === id)))
      field.parentId = parentId
      field.parentType = this.data.type
      this.insertComponent(field)
    }
  }
}
</script>

<style lang="scss">
  .draggable-wrap {
    height: 100%;
  }
</style>
