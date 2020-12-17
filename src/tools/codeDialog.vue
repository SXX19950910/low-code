<template>
  <el-dialog class="code-dialog-warp" title="查看代码" width="800px" :visible.sync="dialogVisible" @opened="onOpened" @closed="onClosed">
    <el-tabs v-model="tab" type="border-card">
      <el-tab-pane label="JSON" name="json">
        <code-editor v-if="tab === 'json'" v-model="json" class="monaco-box" theme="vs-dark" language="javascript" readonly />
      </el-tab-pane>
      <el-tab-pane label="调用代码" name="useCode">
        <code-editor v-if="tab === 'useCode'" v-model="useCode" class="monaco-box" theme="vs-dark" language="css" :options="{readOnly: true}" />
      </el-tab-pane>
    </el-tabs>
    <div />
  </el-dialog>
</template>

<script>
import codeEditor from 'vue-monaco'
export default {
  components: {
    codeEditor
  },
  data() {
    return {
      dialogVisible: false,
      showEditor: false,
      tab: 'json',
      useCode: '<template>\n' +
        '  <yl-form form-key="表单关键Key" :context="that" />\n' +
        '</template>\n' +
        '\n' +
        '<script>\n' +
        'import ylForm from \'@/ylCommon/components/GenerateForm/index.vue\'\n' +
        'export default {\n' +
        '  components: {\n' +
        '    ylForm\n' +
        '  },\n' +
        '  data() {\n' +
        '    return {\n' +
        '      that: {}\n' +
        '    }\n' +
        '  },\n' +
        '  mounted() {\n' +
        '    this.that = this\n' +
        '  },\n' +
        '  methods: {}\n' +
        '}\n'
    }
  },
  computed: {
    json() {
      return JSON.stringify(this.$store.state.form.form, null, '\t')
    }
  },
  methods: {
    onOpened() {
      this.$nextTick(() => {
        this.showEditor = true
      })
    },
    onClosed() {
      this.showEditor = false
    },
    init() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss">
  .code-dialog-warp {
    .el-dialog__header {
      border: none;
      background-color: #1e1e1e;
      display: none;
    }
    .el-dialog__body {
      padding: 0;
      .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
        background-color: #1E1E1E;
        border-color: #1E1E1E;
        color: white;
      }
      .el-tabs {
        border: none;
        box-shadow: none;
        .el-tabs__nav-wrap {
          background: #1E1E1E;
        }
        .el-tabs__content {
          padding: 0;
          .monaco-box {
            background-color: #1e1e1e;
            height: 600px;
            padding: 10px 0;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
