<template>
  <div v-if="data.parentType !== 'form'" class="native-field-warp" :style="styles">
    <div class="field-label">{{ data.field.name }}</div>
    <el-time-picker
      v-model="value"
      :class="data.field.props.className"
      :readonly="data.field.props.readonly"
      :editable="data.field.props.editable"
      :clearable="data.field.props.clearable"
      :placeholder="data.field.props.placeholder"
      value-format="h:m:s"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
    />
  </div>
  <el-form-item v-else v-show="data.field.visible" :label="data.field.name" :class="data.elementId" :prop="data.field.paramsKey" :style="styles">
    <el-time-picker
      v-model="value"
      :class="data.field.props.className"
      :readonly="data.field.props.readonly"
      :editable="data.field.props.editable"
      :clearable="data.field.props.clearable"
      :placeholder="data.field.props.placeholder"
      value-format="h:m:s"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
    />
  </el-form-item>
</template>

<script>
import { parseStyles } from '../../../views/setting/design/form/utils/style'
import { generateEvents, transformFun } from '../../../views/setting/design/form/utils/event'

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
      value: '',
      events: {
        onChange: '',
        onBlur: '',
        onFocus: ''
      }
    }
  },
  computed: {
    styles() {
      return parseStyles(this.data.field.styles, this.data.field.props)
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.events = generateEvents(this.data.field.events)
    },
    onChange() {
      const onChange = this.events.onChange
      if (onChange) {
        transformFun(onChange.event, onChange.eventName, null, this.context, (result) => {
          result && this.$emit('input', { key: this.data.field.paramsKey, value: result || this.value })
        })
      }
    },
    onBlur() {
      const onBlur = this.events.onBlur
      if (onBlur) {
        transformFun(onBlur.event, onBlur.eventName, null, this.context)
      }
    },
    onFocus() {
      const onFocus = this.events.onFocus
      if (onFocus) {
        transformFun(onFocus.event, onFocus.eventName, null, this.context)
      }
    }
  }
}
</script>

<style lang="scss">

</style>
