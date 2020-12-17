<template>
  <div v-if="data.parentType !== 'form'" class="native-field-warp" :style="styles">
    <div class="field-label">{{ data.field.name }}</div>
    <yl-skeleton v-if="loading" active height="32px" :rows="1" />
    <el-select
      v-else
      v-model="value"
      :class="data.field.props.className"
      :placeholder="data.field.props.placeholder"
      :clearable="data.field.props.clearable"
      :disabled="data.field.props.disabled"
      :filterable="data.field.props.filterable"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
      @visible-change="onVisibleChange"
      @clear="onClear"
    >
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
  </div>
  <el-form-item v-else v-show="data.field.visible" :label="data.field.name" :class="data.elementId" :prop="data.field.paramsKey" :style="styles">
    <yl-skeleton v-if="loading" active height="32px" :rows="1" />
    <el-select
      v-else
      v-model="value"
      :class="data.field.props.className"
      :placeholder="data.field.props.placeholder"
      :clearable="data.field.props.clearable"
      :disabled="data.field.props.disabled"
      :filterable="data.field.props.filterable"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
      @visible-change="onVisibleChange"
      @clear="onClear"
    >
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
  </el-form-item>
</template>

<script>
import request from '@/ylCommon/utils/request'
import ylSkeleton from '@/ylCommon/components/Skeleton/index.vue'
import _ from 'loadsh'
import { generateEvents, transformFun } from '../../../views/setting/design/form/utils/event'
import { parseStyles } from '../../../views/setting/design/form/utils/style'
export default {
  components: {
    ylSkeleton
  },
  props: {
    context: {
      type: Object,
      default() {
        return {}
      }
    },
    data: {
      type: Object,
      default() {
        return {
        }
      }
    }
  },
  data() {
    return {
      value: '',
      options: [],
      loading: true,
      events: {
        onChange: '',
        onBlur: '',
        onFocus: '',
        onVisibleChange: '',
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
    async init() {
      const field = _.cloneDeep(this.data.field)
      this.events = generateEvents(this.data.field.events)
      if (field.api) {
        const params = {
          parameter: JSON.parse(field.params)
        }
        const res = await request({ url: field.api, data: params })
        this.options = res.data
        this.loading = false
        this.$emit('request-after', { key: this.data.field.paramsKey, value: _.cloneDeep(this.options) })
      } else {
        this.options = field.options.map(item => {
          return {
            id: item.value,
            name: item.label
          }
        })
        this.loading = false
        this.$emit('static-after', { key: this.data.field.paramsKey, value: _.cloneDeep(this.options) })
      }
    },
    setOptions(options) {
      this.options = options
    },
    setValue(value) {
      this.value = value
      const update = { key: this.data.field.paramsKey, value: this.value }
      this.$emit('input', update)
    },
    onChange(value) {
      const update = { key: this.data.field.paramsKey, value }
      const onChange = this.events.onChange
      if (onChange) {
        transformFun(onChange.event, onChange.eventName, null, this.context, (result) => {
          this.$emit('input', result || update)
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
    onVisibleChange() {
      const onVisibleChange = this.events.onVisibleChange
      if (onVisibleChange) {
        transformFun(onVisibleChange.event, onVisibleChange.eventName, null, this.context)
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
