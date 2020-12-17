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
import ylChoose from '@/components/Choose'
import { mapMutations } from 'vuex'
import { parseStyles } from '@/utils/style'
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
    },
    ...mapMutations({
      setFormItemOption: 'SET_FORM_ITEM_OPTION'
    }),
    async getData() {
    }
  }
}
</script>

<style lang="scss">

</style>
