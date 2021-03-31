<template>
  <div class="field-tree-warp">
    <el-tree
      ref="tree"
      :data="designFormTree"
      node-key="elementId"
      highlight-current
      default-expand-all
      :current-node-key="currentFormItem.elementId"
      check-strictly
      :expand-on-click-node="false"
      @node-click="handleNodeClick"
    >
      <span slot-scope="{ node, data }" class="custom-tree-node">
        <span :class="data.icon" />
        <span class="ml-20 fs-12 info-color">{{ node.label || data.parentId }}</span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      treeProps: {
        label: 'label'
      }
    }
  },
  computed: {
    ...mapGetters(['designFormTree'])
  },
  watch: {
    'currentFormItem'(value) {
      this.$refs.tree.setCurrentKey(value.elementId)
    }
  },
  mounted() {
  },
  methods: {
    handleNodeClick(data) {
      this.setCurrentComponent(data)
    }
  }
}
</script>

<style lang="scss">
  .field-tree-warp {
    padding-left: 15px;
    padding-top: 15px;
    .el-tree-node {
      &.is-current {
        & > .el-tree-node__content:first-child {
          background-color: $skyBlue;
          .el-tree-node__expand-icon.is-leaf {
            color: transparent;
          }
          span {
            color: white;
          }
        }
      }
    }
    .custom-tree-node {
      width: 100%;
      display: flex;
      align-items: center;
      padding-right: 15px;
    }
  }
</style>
