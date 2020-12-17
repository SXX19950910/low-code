<template>
  <div v-if="data.parentType !== 'form'" class="native-field-warp">
    <div class="field-label">{{ data.field.name }}</div>
    <el-date-picker
      v-model="value"
      :style="styles"
      :class="fieldProps.className"
      :readonly="fieldProps.readonly"
      :editable="fieldProps.editable"
      :clearable="fieldProps.clearable"
      :start-placeholder="fieldProps.startPlaceholder"
      :end-placeholder="fieldProps.endPlaceholder"
      :range-separator="fieldProps.rangeSeparator"
      :unlink-panels="fieldProps.unlinkPanels"
      value-format="yyyy-MM-dd"
      type="daterange"
    />
  </div>
  <el-form-item v-else :label="data.field.name">
    <el-date-picker
      v-model="value"
      :style="styles"
      :class="fieldProps.className"
      :readonly="fieldProps.readonly"
      :editable="fieldProps.editable"
      :clearable="fieldProps.clearable"
      :start-placeholder="fieldProps.startPlaceholder"
      :end-placeholder="fieldProps.endPlaceholder"
      :range-separator="fieldProps.rangeSeparator"
      :unlink-panels="fieldProps.unlinkPanels"
      value-format="yyyy-MM-dd"
      type="daterange"
    />
  </el-form-item>
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
    return {
      value: []
    }
  },
  computed: {
    fieldProps() {
      return this.data.field.props
    },
    styles() {
      return parseStyles(this.data.field.styles, this.data.field.props)
    }
  }
}
</script>

<style lang="scss">

</style>
