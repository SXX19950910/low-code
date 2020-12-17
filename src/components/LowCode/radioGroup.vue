<template>
  <div v-if="data.parentType !== 'form'" class="native-field-warp" :style="styles">
    <div class="field-label">{{ data.field.name }}</div>
    <yl-skeleton v-if="loading" active :rows="1" height="32px" />
    <el-radio-group
      v-else
      v-model="value"
      :class="data.field.props.className"
      @change="onChange"
    >
      <el-radio v-for="item in options" :key="item.label" :label="item.id">{{ item.name }}</el-radio>
    </el-radio-group>
  </div>
  <el-form-item v-else v-show="data.field.visible" :label="data.field.name" :class="data.elementId" :prop="data.field.paramsKey" :style="styles">
    <yl-skeleton v-if="loading" active :rows="1" height="32px" />
    <el-radio-group
      v-else
      v-model="value"
      :class="data.field.props.className"
      @change="onChange"
    >
      <el-radio v-for="item in options" :key="item.label" :label="item.id">{{ item.name }}</el-radio>
    </el-radio-group>
  </el-form-item>
</template>

<script>
import request from '@/ylCommon/utils/request'
import ylSkeleton from '@/ylCommon/components/Skeleton/index.vue'
import _ from 'loadsh'
import { parseStyles } from '../../../views/setting/design/form/utils/style'
import { generateEvents, transformFun } from '../../../views/setting/design/form/utils/event'
export default {
  components: {
    ylSkeleton
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
      options: [],
      events: {
        onChange: ''
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
        console.log(res.data)
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
    onChange() {
      const onChange = this.events.onChange
      if (onChange) {
        transformFun(onChange.event, onChange.eventName, null, this.context, (result) => {
          result && this.$emit('input', { key: this.data.field.paramsKey, value: result || this.value })
        })
      }
    }
  }
}
</script>

<style lang="scss">
</style>
