<template>
  <draggable v-model="data.field.children" class="container-warp" tag="div" v-bind="dragOptions" :class="containerClass" :data-parent="data.elementId" :style="styles" @add="onAdd">
    <drag-component v-for="item in data.field.children" :key="item.elementId" :field="item" :element-id="item.elementId" @click.native.stop="handleFieldClick(item)" />
  </draggable>
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
      const { styles, props } = this.data.field
      return parseStyles(styles, props)
    },
    containerClass() {
      const { paramsKey, styles, children } = this.data.field
      const result = [paramsKey]
      const newClass = children.length === 0 && Boolean(styles.backgroundImage) === false ? 'no-field' : ''
      newClass && result.push(newClass)
      return result
    }
  },
  methods: {
    ...mapMutations({
      addFormItemToForm: 'ADD_FORM_ITEM_TO_FORM'
    }),
    onAdd(data) {
      removeAllNonItem()
      const isSort = data.item.className.includes('form-drag-warp')
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
      this.addFormItemToForm(obj)
    },
    handleFieldClick() {
    }
  }
}
</script>

<style lang="scss">
  .container-warp {
    min-height: 60px;
  }
</style>
