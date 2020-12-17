<template>
  <div v-if="data.parentType !== 'form'" class="native-field-warp" :style="styles">
    <div class="field-label">{{ data.field.name }}</div>
    <el-input
      v-model="text"
      :class="fieldProps.className"
      :placeholder="fieldProps.placeholder"
      :type="fieldProps.type"
      :clearable="fieldProps.clearable"
      :show-password="fieldProps.showPassword"
      :readonly="fieldProps.readonly"
    />
  </div>
  <el-form-item v-else :label="data.field.name" :style="styles">
    <el-input
      v-model="text"
      :class="fieldProps.className"
      :placeholder="fieldProps.placeholder"
      :type="fieldProps.type"
      :clearable="fieldProps.clearable"
      :show-password="fieldProps.showPassword"
      :readonly="fieldProps.readonly"
    />
  </el-form-item>
</template>

<script>
import { parseStyles } from '../utils/style'

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
      text: ''
    }
  },
  computed: {
    fieldProps() {
      return this.data.field.props
    },
    styles() {
      return parseStyles(this.data.field.styles, this.data.field.props)
    }
  },
  created() {}
}
</script>

<style lang="scss">
</style>
