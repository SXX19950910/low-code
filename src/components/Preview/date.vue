<template>
  <div v-if="data.parentType !== 'form'" class="native-field-warp" :style="styles">
    <div class="field-label">
      {{ data.field.name }}
    </div>
    <el-date-picker
      v-model="data.field.value"
      :class="fieldProps.className"
      :readonly="fieldProps.readonly"
      :editable="fieldProps.editable"
      :clearable="fieldProps.clearable"
      :placeholder="fieldProps.placeholder"
      value-format="yyyy-MM-dd"
    />
  </div>
  <el-form-item v-else :label="data.field.name" :style="styles">
    <el-date-picker
      v-model="data.field.value"
      :class="fieldProps.className"
      :readonly="fieldProps.readonly"
      :editable="fieldProps.editable"
      :clearable="fieldProps.clearable"
      :placeholder="fieldProps.placeholder"
      value-format="yyyy-MM-dd"
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
