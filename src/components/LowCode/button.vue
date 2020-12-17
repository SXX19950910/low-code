<template>
  <el-button
    :circle="data.field.props.circle"
    :round="data.field.props.round"
    :plain="data.field.props.plain"
    :type="data.field.props.type"
    :size="data.field.props.size"
    :style="styles"
    :disabled="data.field.props.disabled"
    @click="handleClick"
  >
    {{ data.field.name }}</el-button>
</template>

<script>
import { parseStyles } from '../../../views/setting/design/form/utils/style'
import { transformFun, generateEvents } from '../../../views/setting/design/form/utils/event'
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
      events: {
      }
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
    init() {
      this.events = generateEvents(this.data.field.events)
    },
    handleClick() {
      const data = this.events.onClick
      if (data) transformFun(data.event, data.eventName, null, this.context)
    }
  }
}
</script>

<style lang="scss">

</style>
