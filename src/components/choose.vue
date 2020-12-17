<template>
  <div v-if="data.parentType !== 'form'" class="native-field-warp" :class="fieldProps.className">
    <div class="field-label">{{ data.field.name }}</div>
    <yl-choose :options="data.field.options" :plain="fieldProps.plain" :more-visible="fieldProps.moreVisible" :more-slice-number="fieldProps.moreSliceNumber" />
  </div>
  <el-form-item v-else :label="data.field.name" :style="styles">
    <yl-choose :options="data.field.options" :plain="fieldProps.plain" :more-visible="fieldProps.moreVisible" :more-slice-number="fieldProps.moreSliceNumber" />
  </el-form-item>
</template>

<script>
import ylChoose from '@/ylCommon/components/Choose'
import { mapMutations } from 'vuex'
import request from '@/ylCommon/utils/request'
import { parseStyles } from '../utils/style'
export default {
  components: {
    ylChoose
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
    init() {
      this.getData()
    },
    ...mapMutations({
      setFormItemOption: 'SET_FORM_ITEM_OPTION'
    }),
    async getData() {
      const isApi = this.data.field.api.includes('.do')
      const params = this.data.field.params ? JSON.parse(this.data.field.params) : ''
      if (isApi && params) {
        const res = await request({ url: this.data.field.api, data: { parameter: params }})
        if (res.data && res.data.length > 0) {
          const data = res.data.map(item => {
            return {
              label: item.name,
              value: item.id
            }
          })
          this.setFormItemOption({ id: this.data.elementId, data })
        }
      }
    }
  }
}
</script>

<style lang="scss">

</style>
