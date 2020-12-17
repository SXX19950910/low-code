<template>
  <div class="ck-content" :class="data.field.paramsKey" :style="styles" v-html="data.field.value" />
</template>

<script>
import { parseStyles } from '../../utils/style'
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
      return parseStyles(this.data.field.styles, this.data.field.props)
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/ck-style";
</style>
