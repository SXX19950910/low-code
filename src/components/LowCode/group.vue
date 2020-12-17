<template>
  <div v-if="data.parentType !== 'form'" class="native-field-warp" :style="styles">
    <div class="field-label">{{ data.field.name }}</div>
    <yl-skeleton v-if="loading" active :rows="1" height="32px" />
    <yl-choose
      v-else
      :options="data.field.options"
      multiple
      :plain="fieldProps.plain"
      :more-visible="data.field.moreBtnVisible"
      :more-slice-number="data.field.moreSliceNumber"
      @change="onChange"
    />
  </div>
  <el-form-item v-else v-show="data.field.visible" :label="data.field.name" :class="data.elementId" :prop="data.field.paramsKey" :style="styles">
    <yl-skeleton v-if="loading" active :rows="1" height="32px" />
    <yl-choose
      v-else
      :options="data.field.options"
      multiple
      :plain="fieldProps.plain"
      :more-visible="data.field.moreBtnVisible"
      :more-slice-number="data.field.moreSliceNumber"
      @change="onChange"
    />
  </el-form-item>
</template>

<script>
import ylChoose from '@/ylCommon/components/Choose/index.vue'
import request from '@/ylCommon/utils/request.js'
import ylSkeleton from '@/ylCommon/components/Skeleton/index.vue'
import _ from 'loadsh'
import { generateEvents, transformFun } from '../../../views/setting/design/form/utils/event'
import { parseStyles } from '../../../views/setting/design/form/utils/style'
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
      value: [],
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
    onChange(value) {
      const onChange = this.events.onChange
      if (onChange) {
        transformFun(onChange.event, onChange.eventName, null, this.context, () => {
          this.$emit('input', { key: this.data.field.paramsKey, value })
        })
      }
    }
  }
}
</script>

<style lang="scss">

</style>
