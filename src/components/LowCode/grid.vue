<template>
  <el-row class="form-grid-warp" :justify="data.field.props.justify" :gutter="data.field.props.gutter" :align="data.field.props.align" type="flex" :style="styles">
    <el-col v-for="item in data.field.children" :key="item.elementId" :span="item.span">
      <set-component :is="`${child.type}Item`" v-for="child in item.children" :ref="child.field.paramsKey" :key="child.elementId" :data="child" @input="onInput" @request-after="onRequestAfter" />
    </el-col>
  </el-row>
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
      gridList: []
    }
  },
  computed: {
    styles() {
      return parseStyles(this.data.field.styles, this.data.field.props)
    }
  },
  methods: {
    onInput(update) {
      this.$emit('input', update)
    },
    onRequestAfter(data) {
      this.$emit('request-after', data)
    }
  }
}
</script>

<style lang="scss">

</style>
