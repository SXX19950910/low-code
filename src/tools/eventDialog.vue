<template>
  <el-dialog v-el-drag-dialog class="event-dialog-warp" :visible.sync="dialogVisible" width="800px" @opened="onOpened">
    <el-tabs v-if="showTabs" v-model="tab" type="border-card">
      <el-tab-pane label="Select事件" name="select">
        <code-editor v-if="tab === 'select'" v-model="data.field.select" class="code-editor" theme="vs-dark" language="javascript" />
      </el-tab-pane>
      <el-tab-pane label="Change事件" name="change">
        <code-editor v-if="tab === 'change'" v-model="data.field.change" class="code-editor" theme="vs-dark" language="javascript" />
      </el-tab-pane>
      <el-tab-pane label="Focus事件" name="focus">
        <code-editor v-if="tab === 'focus'" v-model="data.field.focus" class="code-editor" theme="vs-dark" language="javascript" />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import codeEditor from 'vue-monaco'
export default {
  components: {
    codeEditor
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
      tab: 'select',
      dialogVisible: false,
      showTabs: false
    }
  },
  methods: {
    onOpened() {
      this.showTabs = true
    },
    init() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss">
  .event-dialog-warp {
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 0;
      background-color: #1E1E1E;
      .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
        background-color: #1E1E1E;
        color: white;
        border-color: #1e1e1e;
      }
      .el-tabs {
        border: none;
        .el-tabs__content {
          background-color: #1E1E1E;
        }
        .el-tabs__header{
          background-color: #1E1E1E;
          border-color: #1E1E1E;
        }
      }
    }
    .code-editor {
      height: 600px;
      width: 100%;
    }
  }
</style>
