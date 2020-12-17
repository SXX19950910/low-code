<template>
  <div v-if="data.parentType !== 'form'" class="native-field-warp" :style="styles">
    <div class="field-label">
      {{ data.field.name }}
    </div>
    <el-select
      v-model="data.field.value"
      :class="data.field.props.className"
      :placeholder="data.field.props.placeholder"
      :clearable="data.field.props.clearable"
      :filterable="data.field.props.filterable"
    >
      <el-option v-for="item in data.field.options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
  <el-form-item v-else :label="data.field.name" :style="styles">
    <el-select
      v-model="data.field.value"
      :class="data.field.props.className"
      :placeholder="data.field.props.placeholder"
      :clearable="data.field.props.clearable"
      :filterable="data.field.props.filterable"
    >
      <el-option v-for="item in data.field.options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </el-form-item>
</template>

<script>
import request from '@/ylCommon/utils/request'
import { mapMutations } from 'vuex'
import { parseStyles } from '../utils/style'
export default {
  props: {
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
