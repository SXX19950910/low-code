<template>
  <div v-if="data.parentType !== 'form'" class="native-field-warp" :style="styles">
    <div class="field-label">{{ data.field.name }}</div>
    <el-date-picker
      v-model="value"
      :class="data.field.props.className"
      :placeholder="data.field.props.placeholder"
      :picker-options="pickerOptions"
      :readonly="data.field.props.readonly"
      :editable="data.field.props.editable"
      :clearable="data.field.props.clearable"
      value-format="yyyy-MM-dd"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
    />
  </div>
  <el-form-item v-else v-show="data.field.visible" :label="data.field.name" :class="data.elementId" :prop="data.field.paramsKey" :style="styles">
    <el-date-picker
      v-model="value"
      :class="data.field.props.className"
      :placeholder="data.field.props.placeholder"
      :picker-options="pickerOptions"
      :readonly="data.field.props.readonly"
      :editable="data.field.props.editable"
      :clearable="data.field.props.clearable"
      value-format="yyyy-MM-dd"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
    />
  </el-form-item>
</template>

<script>
import { generateEvents, transformFun } from '../../../views/setting/design/form/utils/event'
import { parseStyles } from '../../../views/setting/design/form/utils/style'
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    context: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      value: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: []
      },
      quickOptions: [{
        prop: 'today',
        text: '今天',
        onClick(picker) {
          picker.$emit('pick', new Date())
        }
      }, {
        prop: 'yesterday',
        text: '昨天',
        onClick(picker) {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24)
          picker.$emit('pick', date)
        }
      }, {
        prop: 'aWeekAgo',
        text: '一周前',
        onClick(picker) {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', date)
        }
      }],
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
      this.data.field.quick.map(item => {
        const quick = this.quickOptions.find(data => data.prop === item)
        quick && this.pickerOptions.shortcuts.push(quick)
      })
      if (this.data.field.quick.length < 1) {
        this.pickerOptions = {}
      }
      this.events = generateEvents(this.data.field.events)
    },
    onChange(value) {
      const onChange = this.events.onChange
      if (onChange.event) {
        transformFun(onChange.event, onChange.eventName, value, this.context, result => {
          this.$emit('input', { key: this.data.field.paramsKey, value: result || value })
        })
      } else {
        this.$emit('input', { key: this.data.field.paramsKey, value: this.value })
      }
    },
    onBlur() {
      const onBlur = this.events.onBlur
      if (onBlur) {
        transformFun(onBlur.event, onBlur.eventName, this.value, this.context, result => {})
      }
    },
    onFocus() {
      const onFocus = this.events.onFocus
      if (onFocus) {
        transformFun(onFocus.event, onFocus.eventName, this.value, this.context, result => {})
      }
    }
  }
}
</script>

<style lang="scss">
</style>
