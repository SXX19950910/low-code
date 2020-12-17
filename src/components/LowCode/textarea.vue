<template>
  <div v-if="data.parentType !== 'form'" class="native-field-warp" :style="styles">
    <div class="field-label">{{ data.field.name }}</div>
    <el-input
      v-model="value"
      type="textarea"
      :class="data.field.props.className"
      :placeholder="data.field.props.placeholder"
      :rows="data.field.props.rows"
      :maxlength="data.field.props.maxlength"
      :resize="data.field.props.resize"
      :show-word-limit="data.field.props.showWordLimit"
      :readonly="data.field.props.readonly"
      :autosize="data.field.props.autosize"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    />
  </div>
  <el-form-item v-else v-show="data.field.visible" :label="data.field.name" :class="data.elementId" :prop="data.field.paramsKey" :style="styles">
    <el-input
      v-model="value"
      type="textarea"
      :class="data.field.props.className"
      :placeholder="data.field.props.placeholder"
      :rows="data.field.props.rows"
      :maxlength="data.field.props.maxlength"
      :resize="data.field.props.resize"
      :show-word-limit="data.field.props.showWordLimit"
      :readonly="data.field.props.readonly"
      :autosize="data.field.props.autosize"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
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
    onInput() {
      this.$emit('input', { key: this.data.field.paramsKey, value: this.value })
    },
    onChange() {
      const onChange = this.events.onChange
      if (onChange) {
        transformFun(onChange.event, onChange.eventName, null, this.context)
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
