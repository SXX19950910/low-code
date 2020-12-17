<template>
  <div v-if="data.parentType !== 'form'" class="native-field-warp" :style="styles">
    <div class="field-label">{{ data.field.name }}</div>
    <el-input
      v-model="value"
      :class="data.field.props.className"
      :type="data.field.props.type"
      :placeholder="data.field.props.placeholder"
      :readonly="data.field.props.readonly"
      :clearable="data.field.props.clearable"
      :size="data.field.props.size"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
      @clear="onClear"
      @input="onInput"
    />
  </div>
  <el-form-item v-else v-show="data.field.visible" :label="data.field.name" :class="data.elementId" :prop="data.field.paramsKey" :style="styles">
    <el-input
      v-model="value"
      :class="data.field.props.className"
      :type="data.field.props.type"
      :placeholder="data.field.props.placeholder"
      :readonly="data.field.props.readonly"
      :clearable="data.field.props.clearable"
      :size="data.field.props.size"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
      @clear="onClear"
      @input="onInput"
    />
  </el-form-item>
</template>

<script>
import { parseStyles } from '../../../views/setting/design/form/utils/style'
import { generateEvents, transformFun } from '../../../views/setting/design/form/utils/event'
export default {
  components: {
  },
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
      loading: true,
      events: {
        onChange: '',
        onBlur: '',
        onFocus: '',
        onClear: ''
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
    setValue(value) {
      this.value = value
      this.onInput()
    },
    onInput() {
      this.$emit('input', { key: this.data.field.paramsKey, value: this.value })
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
    },
    onClear() {
      const onClear = this.events.onClear
      if (onClear) {
        transformFun(onClear.event, onClear.eventName, null, this.context)
      }
    }
  }
}
</script>

<style lang="scss">

</style>
