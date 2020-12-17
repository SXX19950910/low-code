<template>
  <div class="container-warp" :class="data.field.paramsKey" :style="styles">
    <set-component v-for="item in data.field.children" :key="item.elementId" :data="item" :element-id="item.elementId" />
  </div>
</template>

<script>
import { parseStyles } from '../../../views/setting/design/form/utils/style'
export default {
  components: {},
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
  },
  created() {},
  methods: {
  }
}
</script>

<style lang="scss">
  .container-warp {
    height: 100%;
  }
</style>
