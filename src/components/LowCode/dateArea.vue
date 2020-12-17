<template>
  <div v-if="data.parentType !== 'form'" class="native-field-warp">
    <div class="field-label">{{ data.field.name }}</div>
    <el-date-picker
      v-model="value"
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
      @change="onChange"
    />
  </div>
  <el-form-item v-else :label="data.field.name">
    <el-date-picker
      v-model="value"
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
      @change="onChange"
    />
  </el-form-item>
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
      value: []
    }
  },
  computed: {
    fieldProps() {
      return this.data.field.props
    }
  },
  methods: {
    setValue(value) {
      this.value = value
      this.onChange()
    },
    onChange() {
      this.$emit('input', { key: this.data.field.paramsKey, value: this.value })
    }
  }
}
</script>

<style lang="scss">

</style>
