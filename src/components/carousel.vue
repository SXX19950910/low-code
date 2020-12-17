<template>
  <el-carousel
    :height="data.field.props.height"
    :type="data.field.props.type"
    :interval="data.field.props.interval"
    :autoplay="data.field.props.autoplay"
    :indicator-position="data.field.props.indicatorPosition"
    :loop="data.field.props.loop"
    :direction="data.field.props.direction"
  >
    <el-carousel-item v-for="item in data.field.options" :key="item.value">
      <el-image fit="contain" :src="item.value" :alt="item.label" />
    </el-carousel-item>
  </el-carousel>
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
  }
}
</script>

<style lang="scss">

</style>
