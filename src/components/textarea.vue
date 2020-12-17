<template>
  <div v-if="data.parentType !== 'form'" class="native-field-warp" :style="styles">
    <div class="field-label">{{ data.field.name }}</div>
    <el-input
      v-model="data.field.value"
      type="textarea"
      :maxlength="data.field.props.maxlength"
      :placeholder="data.field.props.placeholder"
      :resize="data.field.props.resize"
      :rows="data.field.props.rows"
      :autosize="data.field.props.autosize"
      :show-word-limit="data.field.props.showWordLimit"
      :readonly="data.field.props.readonly"
    />
  </div>
  <el-form-item v-else :label="data.field.name" :style="styles">
    <el-input
      v-model="data.field.value"
      type="textarea"
      :maxlength="data.field.props.maxlength"
      :placeholder="data.field.props.placeholder"
      :resize="data.field.props.resize"
      :rows="data.field.props.rows"
      :autosize="data.field.props.autosize"
      :show-word-limit="data.field.props.showWordLimit"
      :readonly="data.field.props.readonly"
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
