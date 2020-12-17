<template>
  <el-form
    :label-width="data.field.props.labelWidth"
    :label-position="data.field.props.labelPosition"
    :size="data.field.props.size"
    :status-icon="data.field.props.statusIcon"
  >
    <set-component v-for="child in data.field.children" :ref="child.field.paramsKey" :key="child.elementId" :data="child" />
  </el-form>
</template>

<script>
export default {
  components: {
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
  }
}
</script>

<style lang="scss">

</style>
