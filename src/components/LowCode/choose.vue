<template>
  <div v-if="data.parentType !== 'form'" class="native-field-warp" :style="styles">
    <div class="field-label">{{ data.field.name }}</div>
    <yl-skeleton v-if="loading" :rows="1" height="32px" active />
    <yl-choose
      v-else
      ref="choose"
      :options="options"
      :plain="fieldProps.plain"
      :more-visible="fieldProps.moreVisible"
      :more-slice-number="fieldProps.moreSliceNumber"
      @change="onChange"
    />
  </div>
  <el-form-item v-else v-show="data.field.visible" :label="data.field.name" :class="data.elementId" :prop="data.field.paramsKey" :style="styles">
    <yl-skeleton v-if="loading" :rows="1" height="32px" active />
    <yl-choose
      v-else
      ref="choose"
      :options="options"
      :plain="fieldProps.plain"
      :more-visible="fieldProps.moreVisible"
      :more-slice-number="fieldProps.moreSliceNumber"
      @change="onChange"
    />
  </el-form-item>
</template>

<script>
import ylChoose from '@/components/Choose/index.vue'
import ylSkeleton from '@/components/Skeleton/index.vue'
import _ from 'loadsh'
import { generateEvents, transformFun } from '@/utils/event'
import { parseStyles } from '@/utils/style'
export default {
  components: {
    ylChoose,
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
      options: [],
      loading: true,
      events: {
        onChange: ''
      }
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
  async created() {
    await this.init()
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
        if (res.data) {
          this.options = res.data.map(item => {
            return {
              value: item.id,
              label: item.name
            }
          })
          this.loading = false
          this.$emit('request-after', { key: this.data.field.paramsKey, value: _.cloneDeep(this.options) })
        }
      } else {
        this.options = field.options
        this.$emit('static-after', _.cloneDeep(this.options))
        this.loading = false
      }
    },
    setOptions(options) {
      this.options = options
    },
    setValue(value) {
      this.$refs.choose.setValue(value)
    },
    onChange(value) {
      const onChange = this.events.onChange
      if (onChange) {
        transformFun(onChange.event, onChange.eventName, null, this.context, (result) => {
          this.$emit('input', { key: this.data.field.paramsKey, value })
        })
      }
    }
  }
}
</script>

<style lang="scss"></style>
