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
import { mapMutations } from 'vuex'
import { parseStyles } from '@/utils/style'
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
    },
    async init() {
      await this.getData()
    }
  }
}
</script>

<style lang="scss">

</style>
