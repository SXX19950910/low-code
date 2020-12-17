<template>
  <el-button
    :size="data.field.props.size"
    :type="data.field.props.type"
    :style="styles"
    :circle="data.field.props.circle"
    :plain="data.field.props.plain"
    :round="data.field.props.round"
    :disabled="data.field.props.disabled"
  >{{ data.field.name }}</el-button>
</template>

<script>
import { parseStyles } from '@/utils/style'
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
    return {}
  },
  computed: {
    styles() {
      return parseStyles(this.data.field.styles, this.data.field.props)
    }
  }
}
</script>

<style lang="scss">

</style>
