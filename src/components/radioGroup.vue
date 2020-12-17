<template>
  <div v-if="data.parentType !== 'form'" class="native-field-warp" :style="styles">
    <div class="field-label">{{ data.field.name }}</div>
    <el-radio-group v-model="data.field.value">
      <el-radio v-for="item in data.field.options" :key="item.label" :label="item.label">{{ item.label }}</el-radio>
    </el-radio-group>
  </div>
  <el-form-item v-else :label="data.field.name" :style="styles">
    <el-radio-group v-model="data.field.value">
      <el-radio v-for="item in data.field.options" :key="item.label" :label="item.label">{{ item.label }}</el-radio>
    </el-radio-group>
  </el-form-item>
</template>

<script>
import { parseStyles } from '../utils/style'

export default {
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
      radio: ''
    }
  },
  computed: {
    styles() {
      return parseStyles(this.data.field.styles, this.data.field.props)
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">

</style>
