<template>
  <draggable-box class="container-warp" tag="div" :extend-class="containerClass" :data-parent="data.elementId" :data="data" :style="styles">
  </draggable-box>
</template>

<script>
export default {
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
    styles() {
      // this.parseStyles(this.data.field.styles, this.data.field.props)
      return {}
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
  }
}
</script>

<style lang="scss">
.container-warp {
  min-height: 60px;
}
</style>
