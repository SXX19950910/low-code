<template>
  <div class="config-table-warp" :style="styles">
    <yl-table :table-key="data.field.props.tableKey" />
  </div>
</template>

<script>
import ylTable from '@/ylCommon/components/Table'
import { parseStyles } from '../../utils/style'
export default {
  components: {
    ylTable
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
    styles() {
      return parseStyles(this.data.field.styles, this.data.field.props)
    }
  }
}
</script>

<style lang="scss">

</style>
