<template>
  <el-row class="grid-warp" tag="el-row" v-bind="dragOptions" :style="styles" :justify="data.field.props.justify" :gutter="data.field.props.gutter" :align="data.field.props.align" type="flex" @click.native.stop="onClick">
    <draggable-box
        v-for="(component, index) in data.field.children"
        :key="index"
        :data="component"
        :component-data="getColComponentData(component)"
        tag="el-col"
    >
    </draggable-box>
  </el-row>
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
      return this.parseStyles(this.data.field.styles, this.data.field.props)
    }
  },
  methods: {
    getColComponentData(data) {
      return {
        props: {
          span: data.span
        }
      }
    },
    handleFieldClick(current) {
      this.setCurrentComponent(current)
    },
    onClick() {
      this.setCurrentComponent(this.data)
    }
  }
}
</script>

<style lang="scss">
.grid-warp {
  .filed-box {
    min-height: 60px;
    position: relative;
    border: 1px dashed $border;
    .form-drag-warp {
      margin-bottom: 0;
    }
  }
}
</style>
