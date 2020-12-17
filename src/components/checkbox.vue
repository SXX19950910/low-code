<template>
  <div v-if="data.parentType !== 'form'" class="native-field-warp" :style="styles">
    <div class="field-label" :class="data.field.props.className">{{ data.field.name }}</div>
    <el-checkbox-group v-model="data.field.arrValue">
      <el-checkbox v-for="item in data.field.options" :key="item.label" :label="item.label" />
    </el-checkbox-group>
  </div>
  <el-form-item v-else :label="data.field.name" :class="data.field.props.className" :style="styles">
    <el-checkbox-group v-model="data.field.arrValue">
      <el-checkbox v-for="item in data.field.options" :key="item.label" :label="item.label" />
    </el-checkbox-group>
  </el-form-item>
</template>

<script>
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
    }
  },
  computed: {
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
  }
}
</script>

<style lang="scss">

</style>
