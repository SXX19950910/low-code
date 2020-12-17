<template>
  <div v-if="data.parentType !== 'form'" class="native-field-warp">
    <div class="field-label">{{ data.field.name }}</div>
    <yl-choose :options="data.field.options" multiple :plain="fieldProps.plain" :more-visible="data.field.moreBtnVisible" :more-slice-number="data.field.moreSliceNumber" />
  </div>
  <el-form-item v-else :label="data.field.name" :style="styles">
    <yl-choose :options="data.field.options" multiple :plain="fieldProps.plain" :more-visible="data.field.moreBtnVisible" :more-slice-number="data.field.moreSliceNumber" />
  </el-form-item>
</template>

<script>
import ylChoose from '@/ylCommon/components/Choose'
import request from '@/ylCommon/utils/request'
import { mapMutations } from 'vuex'
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
      const { marginTop, marginBottom, marginLeft, marginRight, paddingTop, paddingBottom, paddingLeft, paddingRight, display, flexWrap, flexDirection, justifyContent, alignItems } = this.data.field.styles
      return {
        marginTop: `${marginTop}px`,
        marginBottom: `${marginBottom}px`,
        marginLeft: `${marginLeft}px`,
        marginRight: `${marginRight}px`,
        paddingTop: `${paddingTop}px`,
        paddingBottom: `${paddingBottom}px`,
        paddingLeft: `${paddingLeft}px`,
        paddingRight: `${paddingRight}px`,
        flexWrap,
        flexDirection,
        justifyContent,
        alignItems,
        display
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
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
    },
    async init() {
      await this.getData()
    }
  }
}
</script>

<style lang="scss">

</style>
